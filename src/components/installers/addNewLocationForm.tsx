import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';

import { Trans, useTranslation } from 'next-i18next';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import { useCreateLocation } from "~/lib/locations/hooks/use-create-location";
import { LocationFormData } from "~/lib/locations/types/location";

function AddNewLocationFrom({ }) {
  const currentOfficeAddress = '';
  const currentInstallerManagerName = '';

  const [createLocation, { loading, data: createdLocation }] = useCreateLocation();
  const { t } = useTranslation('installers');

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      officeAddress: currentOfficeAddress,
      installerManagerName: currentInstallerManagerName,
    }
  });

  const onSubmit = useCallback(
    async (locationData: LocationFormData) => {
      const promise = createLocation(locationData);
      await toast.promise(promise, {
        loading: t(`createLocationLoadingMessage`),
        success: t(`createLocationSuccessMessage`),
        error: t(`createLocationErrorMessage`),
      });
    }, [t, createLocation],
  );

  const officeAddressControl = register('officeAddress', {
    value: currentOfficeAddress,
    required: true,
  });

  const installationManagerNameControl = register('installerManagerName', {
    value: currentInstallerManagerName,
    required: true,
  });

  return (
    <>
      <form onSubmit={handleSubmit((value) => {
        return onSubmit(value);
      })}>
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:officeAddress'} />
              <TextField.Input
                {...officeAddressControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
            <TextField.Label>
              <Trans i18nKey={'installers:installationManagerName'} />
              <TextField.Input
                {...installationManagerNameControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>
              <Trans i18nKey={'installers:add'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddNewLocationFrom;