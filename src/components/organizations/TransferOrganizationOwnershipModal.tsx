import { useCallback } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import type { User } from 'firebase/auth';
import { toast } from 'sonner';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import If from '~/core/ui/If';

import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import useTransferOrganizationOwnership from '~/lib/organizations/hooks/use-transfer-organization-ownership';

const TransferOrganizationOwnershipModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: User;
}> = ({ isOpen, setIsOpen, member }) => {
  const targetMemberDisplayName = member.displayName ?? member.email;
  const targetMemberId = member.uid;
  const { t } = useTranslation();
  const heading = <Trans i18nKey="organization:transferOwnership" />;

  const organization = useCurrentOrganization();
  const organizationId = organization?.id ?? '';

  const { trigger, isMutating } =
    useTransferOrganizationOwnership(organizationId);

  const onConfirmTransferOwnership = useCallback(async () => {
    const promise = trigger({ userId: targetMemberId }).then(() => {
      setIsOpen(false);
    });

    return toast.promise(promise, {
      loading: t('organization:transferringOwnership'),
      success: t('organization:transferOwnershipSuccess'),
      error: t('organization:transferOwnershipError'),
    });
  }, [setIsOpen, t, targetMemberId, trigger]);

  return (
    <Modal heading={heading} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-6'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            <Trans
              i18nKey={'organization:transferOwnershipDisclaimer'}
              values={{
                member: targetMemberDisplayName,
              }}
              components={{ b: <b /> }}
            />
          </p>

          <p>
            <Trans i18nKey={'common:modalConfirmationQuestion'} />
          </p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)} />

          <Button
            type={'button'}
            data-cy={'confirm-transfer-ownership-button'}
            variant={'destructive'}
            onClick={onConfirmTransferOwnership}
            loading={isMutating}
          >
            <If
              condition={isMutating}
              fallback={<Trans i18nKey={'organization:transferOwnership'} />}
            >
              <Trans i18nKey={'organization:transferringOwnership'} />
            </If>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransferOrganizationOwnershipModal;
