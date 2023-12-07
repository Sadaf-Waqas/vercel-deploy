import { useAuth } from 'reactfire';
import { useCallback, useEffect, useState } from 'react';

import {
  EmailAuthProvider,
  linkWithCredential,
  MultiFactorError,
  signInWithCredential,
} from 'firebase/auth';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Trans, useTranslation } from 'next-i18next';

import { isMultiFactorError } from '~/core/firebase/utils/is-multi-factor-error';
import useCreateServerSideSession from '~/core/hooks/use-create-server-side-session';
import { useRequestState } from '~/core/hooks/use-request-state';

import AuthErrorMessage from '~/components/auth/AuthErrorMessage';
import { getFirebaseErrorCode } from '~/core/firebase/utils/get-firebase-error-code';
import MultiFactorAuthChallengeModal from '~/components/auth/MultiFactorAuthChallengeModal';

import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';

function LinkEmailPasswordModal({
  isOpen,
  setIsOpen,
}: React.PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>) {
  const auth = useAuth();
  const { t } = useTranslation();
  const { state, setLoading, setError, resetState } = useRequestState<void>();
  const [sessionRequest] = useCreateServerSideSession();

  const [multiFactorAuthError, setMultiFactorAuthError] =
    useState<Maybe<MultiFactorError>>();

  const user = auth.currentUser;

  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    shouldUseNativeValidation: true,
  });

  const emailControl = register('email', { required: true });

  const passwordControl = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
  });

  const repeatPasswordControl = register('repeatPassword', {
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
    validate: (value) => {
      if (value !== getValues('password')) {
        return t(`auth:passwordsDoNotMatch`);
      }

      return true;
    },
  });

  const onSubmit = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (state.loading || !user) {
        return;
      }

      setLoading(true);

      const promise = new Promise<void>(async (resolve) => {
        const authCredential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, authCredential);

        const newCredential = await signInWithCredential(auth, authCredential);

        // we need to re-create the server-side session, because for
        // some reason Firebase expires the session cookie after linking
        // a password
        await sessionRequest(newCredential.user);

        resolve();
      })
        .catch((error) => {
          if (isMultiFactorError(error)) {
            setMultiFactorAuthError(error);
            setIsOpen(false);
            toast.dismiss();
          } else {
            setError(error);

            return Promise.reject(error);
          }
        })
        .finally(() => {
          resetState();
          setIsOpen(false);
          reset();
        });

      return toast.promise(promise, {
        success: t(`profile:linkActionSuccess`),
        error: t(`profile:linkActionError`),
        loading: t(`profile:linkActionLoading`),
      });
    },
    [
      state.loading,
      setLoading,
      t,
      resetState,
      setIsOpen,
      reset,
      user,
      auth,
      sessionRequest,
      setError,
    ],
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset, isOpen]);

  return (
    <>
      <Modal heading={`Link Password`} isOpen={isOpen} setIsOpen={setIsOpen}>
        <form
          className={'w-full flex-col space-y-4'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField.Label>
            <Trans i18nKey={'common:emailAddress'} />

            <TextField.Input
              {...emailControl}
              required
              data-cy={'email-input'}
              type="email"
              placeholder={'your@email.com'}
            />
          </TextField.Label>

          <TextField.Label>
            <Trans i18nKey={'common:password'} />

            <TextField.Input
              {...passwordControl}
              required
              data-cy={'password-input'}
              type="password"
            />

            <TextField.Hint>
              <Trans i18nKey={'auth:passwordHint'} />
            </TextField.Hint>
          </TextField.Label>

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'auth:repeatPassword'} />

              <TextField.Input
                {...repeatPasswordControl}
                required
                data-cy={'repeat-password-input'}
                type="password"
              />
            </TextField.Label>
          </TextField>

          <If condition={state.error}>
            {(error) => (
              <AuthErrorMessage error={getFirebaseErrorCode(error)} />
            )}
          </If>

          <Button
            block
            data-cy={'auth-submit-button'}
            className={'w-full'}
            type="submit"
            loading={state.loading}
          >
            <If
              condition={state.loading}
              fallback={<Trans i18nKey={'profile:linkAccount'} />}
            >
              <Trans i18nKey={'profile:linkActionLoading'} />
            </If>
          </Button>
        </form>
      </Modal>

      <If condition={multiFactorAuthError}>
        {(error) => (
          <MultiFactorAuthChallengeModal
            error={error}
            isOpen={true}
            setIsOpen={() => setMultiFactorAuthError(undefined)}
            onSuccess={async (credential) => {
              await sessionRequest(credential.user);

              setMultiFactorAuthError(undefined);
              reset();
              resetState();
            }}
          />
        )}
      </If>
    </>
  );
}

export default LinkEmailPasswordModal;
