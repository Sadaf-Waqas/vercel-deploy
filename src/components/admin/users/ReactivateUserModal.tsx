import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/router';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import { useApiRequest } from '~/core/hooks/use-api';

function ReactivateUserModal({
  userId,
  displayName,
  children,
}: React.PropsWithChildren<{
  userId: string;
  displayName: string;
}>) {
  const { trigger, isMutating } = useReactivateUser(userId);

  return (
    <Modal heading={'Reactivate User'} Trigger={children}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            You are about to reactivate the account belonging to{' '}
            <b>{displayName}</b>.
          </p>

          <p>Are you sure you want to do this?</p>
        </div>

        <div className={'flex space-x-2.5 justify-end'}>
          <Button
            type={'button'}
            onClick={() => trigger()}
            loading={isMutating}
          >
            Yes, reactivate user
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ReactivateUserModal;

function useReactivateUser(userId: string) {
  const key = `/api/admin/users/${userId}/reactivate`;
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
