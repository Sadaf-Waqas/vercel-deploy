import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Trans } from 'next-i18next';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { PropertyDetailForm } from '~/lib/jobs/types/jobs';
import { JobContext } from '~/lib/contexts/job';

function PropertyDetailForm({ }) {
  const router = useRouter();

  const currentPropertyName = '';
  const currentPropertyAddress = '';
  const currentSupervisorName = '';
  const currentEmailAddress = '';
  const currentPhoneNumber = '';
  const currentAccessProperty = '';
  const { jobDetail, setJobDetail } = useContext(JobContext);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      propertyName: currentPropertyName,
      propertyAddress: currentPropertyAddress,
      supervisorName: currentSupervisorName,
      emailAddress: currentEmailAddress,
      phoneNumber: currentPhoneNumber,
      accessProperty: currentAccessProperty,
    },
  });

  const onSubmit = useCallback(
    async (propertyDetailData: PropertyDetailForm) => {
      setJobDetail({
        ...jobDetail,
        id: '',
        property: { ...propertyDetailData },
      });
      router.push('/installer-scheduler/create-job/details');
    },
    [router, jobDetail, setJobDetail],
  );

  const propertyNameControl = register('propertyName', {
    value: currentPropertyName,
    required: true,
  });

  const propertyAddressControl = register('propertyAddress', {
    value: currentPropertyAddress,
    required: true,
  });

  const supervisorNameControl = register('supervisorName', {
    value: currentSupervisorName,
    required: true,
  });

  const emailAddressControl = register('emailAddress', {
    value: currentEmailAddress,
    required: true,
  });

  const phoneNumberControl = register('phoneNumber', {
    value: currentPhoneNumber,
    required: true,
  });

  const accessPropertyControl = register('accessProperty', {
    value: currentAccessProperty,
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
              <Trans i18nKey={'installerScheduler:propertyName'} />
              <TextField.Input
                {...propertyNameControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:propertyAddress'} />
              <TextField.Input
                {...propertyAddressControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:supervisorName'} />
              <TextField.Input
                {...supervisorNameControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:emailAddress'} />
              <TextField.Input
                {...emailAddressControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:phoneNumber'} />
              <TextField.Input
                {...phoneNumberControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:accessProperty'} />
              <TextField.Input
                {...accessPropertyControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>
              <Trans i18nKey={'installerScheduler:next'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  )
};

export default PropertyDetailForm;
