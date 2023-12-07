import useSWRMutation from 'swr/mutation';
import { signInWithCustomToken } from 'firebase/auth';
import { useAuth } from 'reactfire';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import { useApiRequest } from '~/core/hooks/use-api';
import { useCreateSession } from '~/core/hooks/use-create-session';

function ImpersonateUserModal({
  userId,
  displayName,
  children,
}: React.PropsWithChildren<{
  userId: string;
  displayName: string;
}>) {
  const { isMutating, trigger } = useImpersonateUser(userId);

  return (
    <Modal heading={'Impersonate User'} Trigger={children}>
      <div className={'flex flex-col space-y-6'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            You are about to impersonate the account belonging to{' '}
            <b>{displayName}</b> with ID <b>{userId}</b>.
          </p>

          <p>
            You will be able to log in as them, see and do everything they can.
            To return to your own account, simply log out.
          </p>

          <p>
            Like Uncle Ben said, with great power comes great responsibility.
            Use this power wisely.
          </p>
        </div>

        <div className={'flex space-x-2.5 justify-end'}>
          <Button
            onClick={() => trigger()}
            loading={isMutating}
            variant={'default'}
          >
            Yes, let&apos;s do it
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ImpersonateUserModal;

function useImpersonateUser(userId: string) {
  const key = `/api/admin/users/${userId}/impersonate`;

  const fetcher = useApiRequest<{
    customToken: string;
  }>();

  const auth = useAuth();
  const { trigger: createSession } = useCreateSession();

  return useSWRMutation(
    key,
    async (path) => {
      const { customToken } = await fetcher({
        path,
        method: 'POST',
      });

      const session = await signInWithCustomToken(auth, customToken);
      const idToken = await session.user.getIdToken();

      return createSession({ idToken });
    },
    {
      onSuccess: async () => {
        window.location.assign('/dashboard');
      },
    },
  );
}
