import { useForm } from "react-hook-form";

import { Trans, useTranslation } from 'next-i18next';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import { useState } from "react";
import RadioButton from "~/core/ui/RadioButton";

function InstallersApplyForm({ }) {
  const [hiringManager, setHiringManager] = useState('Alain');

  const currentInstallerName = '';
  const currentInstallerMaterial = '';
  const currentInstallerDailyCapacity = '';
  const currentInstallerDistancePreference = '';
  const currentInstallerFavoritedByProperties = '';

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      installerName: currentInstallerName,
      installerMaterial: currentInstallerMaterial,
      installerDailyCapacity: currentInstallerDailyCapacity,
      installerDistancePreference: currentInstallerDistancePreference,
      installerFavoritedByProperties: currentInstallerFavoritedByProperties,
    }
  });

  const nameControl = register('installerName', {
    value: currentInstallerName,
    required: true,
  });

  const materialControl = register('installerMaterial', {
    value: currentInstallerMaterial,
    required: true,
  });

  const dailyCapacityControl = register('installerDailyCapacity', {
    value: currentInstallerDailyCapacity,
    required: true,
  });

  const distancePreferenceControl = register('installerDistancePreference', {
    value: currentInstallerDistancePreference,
    required: true,
  });

  const favoritedByProperties = register('installerFavoritedByProperties', {
    value: currentInstallerFavoritedByProperties,
    required: true,
  });

  return (
    <>
      <form>
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:installerName'} />
              <TextField.Input
                {...nameControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:materials'} />
              <TextField.Input
                {...materialControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:dailyCapacity'} />
              <TextField.Input
                {...dailyCapacityControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:distancePreference'} />
              <TextField.Input
                {...distancePreferenceControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:hiringManager'} />
              <RadioButton
                label={'Alain'}
                checked={hiringManager === 'Alain'}
                handleChange={() => setHiringManager((prev) => prev === 'Alain' ? 'Edgar' : 'Alain')}
              />
              <RadioButton
                label={'Edgar'}
                checked={hiringManager === 'Edgar'}
                handleChange={() => setHiringManager((prev) => prev === 'Alain' ? 'Edgar' : 'Alain')}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:favoritedByProperties'} />
              <TextField.Input
                {...favoritedByProperties}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>
              <Trans i18nKey={'installers:createProfile'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default InstallersApplyForm;
