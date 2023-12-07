import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import { useApiRequest } from '~/core/hooks/use-api';

function DisableUserModal({
  userId,
  displayName,
  children,
}: React.PropsWithChildren<{
  userId: string;
  displayName: string;
}>) {
  const { trigger, isMutating } = useDisableUser(userId);

  return (
    <Modal heading={'Disable User'} Trigger={children}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            You are about to disable <b>{displayName}</b>.
          </p>

          <p>
            You can reactivate them later, but they will not be able to log in
            or use their account until you do.
          </p>

          <p>Are you sure you want to do this?</p>
        </div>

        <div className={'flex space-x-2.5 justify-end'}>
          <Button
            type={'button'}
            onClick={() => trigger()}
            loading={isMutating}
            variant={'default'}
          >
            Yes, disable user
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DisableUserModal;

function useDisableUser(userId: string) {
  const key = `/api/admin/users/${userId}/disable`;
  const fetcher = useApiRequest();
  const router = useRouter();

  return useSWRMutation(
    key,
    (path) => {
      return fetcher({
        path,
        method: 'POST',
      });
    },
    {
      onSuccess: () => {
        router.reload();
      },
    },
  );
}
