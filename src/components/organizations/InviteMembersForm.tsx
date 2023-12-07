import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import { Fragment, useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import { MembershipRole } from '~/lib/organizations/types/membership-role';
import { useInviteMembers } from '~/lib/organizations/hooks/use-invite-members';

import If from '~/core/ui/If';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import IconButton from '~/core/ui/IconButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

import MembershipRoleSelector from './MembershipRoleSelector';
import { useUserSession } from '~/core/hooks/use-user-session';

import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import { CheckIcon } from '@heroicons/react/24/outline';

type InviteModel = ReturnType<typeof memberFactory>;

const InviteMembersForm = () => {
  const { t } = useTranslation('organization');
  const router = useRouter();

  const user = useUserSession();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id ?? '';

  const { trigger, isMutating } = useInviteMembers(organizationId);

  const { register, handleSubmit, setValue, control, clearErrors, watch } =
    useInviteMembersForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
    shouldUnregister: true,
  });

  const watchFieldArray = watch('members');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const navigateToMembersPage = useCallback(() => {
    void router.push(`/settings/organization/members`);
  }, [router]);

  const onSubmit = useCallback(
    async ({ members }: { members: InviteModel[] }) => {
      const promise = trigger(members);

      await toast.promise(promise, {
        success: t(`inviteMembersSuccess`),
        error: t(`inviteMembersError`),
        loading: t(`inviteMembersLoading`),
      });

      navigateToMembersPage();
    },
    [navigateToMembersPage, trigger, t],
  );

  return (
    <form
      className={'flex flex-col space-y-4'}
      data-cy={'invite-members-form'}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <div className="flex flex-col space-y-2">
        {controlledFields.map((field, index) => {
          const emailInputName = `members.${index}.email` as const;
          const roleInputName = `members.${index}.role` as const;

          // register email control
          const emailControl = register(emailInputName, {
            required: true,
            validate: (value) => {
              const invalid = getFormValidator(watchFieldArray)(value, index);

              if (invalid) {
                return t(`duplicateInviteEmailError`);
              }

              const isSameAsCurrentUserEmail = user?.auth?.email === value;

              if (isSameAsCurrentUserEmail) {
                return t(`invitingOwnAccountError`);
              }

              return true;
            },
          });

          // register role control
          register(roleInputName, {
            value: field.role,
          });

          return (
            <Fragment key={field.id}>
              <div className={'flex items-center space-x-0.5 md:space-x-2'}>
                <div className={'w-7/12'}>
                  <TextField.Input
                    {...emailControl}
                    data-cy={'invite-email-input'}
                    placeholder="member@email.com"
                    type="email"
                    required
                  />
                </div>

                <div className={'w-4/12'}>
                  <MembershipRoleSelector
                    value={field.role}
                    onChange={(role) => {
                      setValue(roleInputName, role);
                    }}
                  />
                </div>

                <div className={'w-[60px] flex justify-end'}>
                  <Tooltip className={'flex justify-center'}>
                    <TooltipTrigger asChild>
                      <IconButton
                        type={'button'}
                        disabled={fields.length <= 1}
                        data-cy={'remove-invite-button'}
                        label={t('removeInviteButtonLabel')}
                        onClick={() => {
                          remove(index);
                          clearErrors(emailInputName);
                        }}
                      >
                        <XMarkIcon className={'h-4 lg:h-5'} />
                      </IconButton>
                    </TooltipTrigger>

                    <TooltipContent>
                      {t('removeInviteButtonLabel')}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </Fragment>
          );
        })}

        <div>
          <Button
            data-cy={'append-new-invite-button'}
            type={'button'}
            variant={'ghost'}
            size={'small'}
            loading={isMutating}
            onClick={() => append(memberFactory())}
          >
            <span className={'flex items-center space-x-2'}>
              <PlusCircleIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'organization:addAnotherMemberButtonLabel'} />
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className={'flex justify-end'}>
        <Button
          className={'w-full lg:w-auto'}
          data-cy={'send-invites-button'}
          type={'submit'}
          loading={isMutating}
        >
          <span className={'flex space-x-2 items-center'}>
            <CheckIcon className={'h-4'} />

            <span>
              <If condition={!isMutating}>
                <Trans i18nKey={'organization:inviteMembersSubmitLabel'} />
              </If>

              <If condition={isMutating}>
                <Trans i18nKey={'organization:inviteMembersLoading'} />
              </If>
            </span>
          </span>
        </Button>
      </div>
    </form>
  );
};

function memberFactory() {
  return {
    email: '',
    role: MembershipRole.Member,
  };
}

function getFormValidator(members: InviteModel[]) {
  return function isValueInvalid(value: string, index: number) {
    const emails = members.map((member) => member.email);
    const valueIndex = emails.indexOf(value);

    return valueIndex >= 0 && valueIndex !== index;
  };
}

function useInviteMembersForm() {
  return useForm({
    defaultValues: {
      members: [memberFactory()],
    },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    shouldUnregister: true,
  });
}

export default InviteMembersForm;
