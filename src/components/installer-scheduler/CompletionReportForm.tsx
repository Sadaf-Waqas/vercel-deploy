import { useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { Trans } from 'next-i18next';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { CompletionReportForm } from '~/lib/jobs/types/jobs';

function CompletionReportForm({ }) {
  const currentRemainingTime = '';
  const currentRemainingCapacity = '';
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      remainingTime: currentRemainingTime,
      remainingCapacity: currentRemainingCapacity,
    }
  });

  const onSubmit = useCallback(
    async (propertyDetailData: CompletionReportForm) => {
    }, []
  );

  const remainingTimeControl = register('remainingTime', {
    value: currentRemainingTime,
    required: true,
  });

  const remainingCapacityControl = register('remainingCapacity', {
    value: currentRemainingCapacity,
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
              <Trans i18nKey={'installerScheduler:installersFinished'} />
              <TextField.Input
                {...remainingTimeControl}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:remainingTime'} />
              <TextField.Input
                {...remainingTimeControl}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:remainingCapacity'} />
              <TextField.Input
                {...remainingCapacityControl}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>
              <Trans i18nKey={'installerScheduler:save'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CompletionReportForm;