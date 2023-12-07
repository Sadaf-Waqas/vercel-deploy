import { useCallback } from 'react';
import { toast } from 'sonner';
import type { User } from 'firebase/auth';
import { Trans, useTranslation } from 'next-i18next';

import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import { useApiRequest } from '~/core/hooks/use-api';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import useSWRMutation from 'swr/mutation';

const RemoveOrganizationMemberModal: React.FCC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: User;
}> = ({ isOpen, setIsOpen, member }) => {
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as string;
  const { t } = useTranslation('organization');

  const { isMutating, trigger } = useRemoveMemberRequest(
    organizationId,
    member.uid,
  );

  const onUserRemoved = useCallback(() => {
    void (async () => {
      const promise = trigger().then(() => {
        setIsOpen(false);
      });

      return toast.promise(promise, {
        success: t(`removeMemberSuccessMessage`),
        error: t(`removeMemberErrorMessage`),
        loading: t(`removeMemberLoadingMessage`),
      });
    })();
  }, [trigger, setIsOpen, t]);

  const heading = <Trans i18nKey="organization:removeMemberModalHeading" />;

  return (
    <Modal heading={heading} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-6'}>
        <div>
          <p>
            <Trans i18nKey={'common:modalConfirmationQuestion'} />
          </p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)} />

          <Button
            type={'button'}
            data-cy={'confirm-remove-member'}
            variant={'ghost'}
            onClick={onUserRemoved}
            loading={isMutating}
          >
            <Trans i18nKey={'organization:removeMemberSubmitLabel'} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

function useRemoveMemberRequest(organizationId: string, targetMember: string) {
  const fetcher = useApiRequest();
  const endpoint = `/api/organizations/${organizationId}/members/${targetMember}`;

  return useSWRMutation(endpoint, (path) => {
    return fetcher({
      path,
      method: 'DELETE',
    });
  });
}

export default RemoveOrganizationMemberModal;
