'use client';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import ApiKeyManager, {
  Consumer,
  DefaultApiKeyManagerProvider,
} from '@zuplo/react-api-key-manager';

import Spinner from '~/core/ui/Spinner';
import { useUserSession } from '~/core/hooks/use-user-session';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import Modal from '~/core/ui/Modal';

export type ZuploConfig = {
  API_URL?: string;
  BUCKET_URL?: string;
  ZUPLO_API_KEY?: string;
};

const KeyManager: React.FC<{
  env: ZuploConfig;
}> = ({ env }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [showIsLoading, setShowIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const apiUrl = env.API_URL ?? '';
  const session = useUserSession();
  const organization = useCurrentOrganization();
  const accessToken = organization?.id ?? '';

  const provider = useMemo(() => {
    return new DefaultApiKeyManagerProvider(apiUrl, accessToken);
  }, [apiUrl, accessToken]);

  const createConsumer = useCallback(
    async (description: string) => {
      try {
        setIsCreating(true);
        await provider.createConsumer(description);
        provider.refresh();
      } catch (error) {
        throw error;
      } finally {
        setIsCreating(false);
      }
    },
    [provider],
  );

  const deleteConsumer = useCallback(
    async (consumerName: string) => {
      try {
        setShowIsLoading(true);
        await provider.deleteConsumer(consumerName);
        provider.refresh();
      } catch (error) {
        throw error;
      } finally {
        setShowIsLoading(false);
      }
    },
    [provider],
  );

  const handleClick = () => {
    setIsOpen(true);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const target = event.currentTarget;
    const data = new FormData(target);
    const description = data.get('description') as string;

    if (description) {
      createConsumer(description);
    }

    setIsOpen(false);
  };

  const menuItems = useMemo(() => {
    return [
      {
        label: 'Delete',
        action: async (consumer: Consumer) => {
          await deleteConsumer(consumer.name);
        },
      },
    ];
  }, [deleteConsumer]);

  return (
    <div className="flex flex-col space-y-4">
      <ApiKeyManager
        provider={provider}
        menuItems={menuItems}
        showIsLoading={showIsLoading}
      />

      <Button className={'md:w-auto'} onClick={handleClick}>
        {isCreating && (
          <div className="mr-2 text-white">
            <Spinner />
          </div>
        )}
        Create new API Key
      </Button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        heading="Enter a description"
      >
        <form onSubmit={onSubmit}>
          <TextField>
            <TextField.Input
              data-cy={'description-input'}
              required
              type="text"
              placeholder="Enter a description"
              name="description"
            />
          </TextField>
          <Button className="my-3">Submit</Button>
        </form>
      </Modal>
    </div>
  );
};

export default KeyManager;
