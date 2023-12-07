import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'next-i18next';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { useCreateJob } from '~/lib/jobs/hooks/use-create-job';
import { TimelineForm } from '~/lib/jobs/types/jobs';
import { JobContext } from '~/lib/contexts/job';

function TimelineForm({ }) {
  const router = useRouter();

  const currentPriority = '';
  const currentPlannedStartDate = '';
  const currentDueDate = '';
  const { jobDetail, setJobDetail } = useContext(JobContext);
  const [createJob, { loading, data: craetedJobDetail }] = useCreateJob();
  const { t } = useTranslation('createJob');

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      priority: currentPriority,
      plannedStartDate: currentPlannedStartDate,
      dueDate: currentDueDate,
    },
  });

  const onSubmit = useCallback(
    async (timelineData: TimelineForm) => {
      setJobDetail({
        ...jobDetail,
        id: '',
        timeline: { ...timelineData },
      });

      if (!jobDetail) {
        return toast.error(t(`createJobErrorMessage`));
      }

      if (!jobDetail.property) {
        router.push('/installer-scheduler/create-job');
        return toast.error(t(`Property Detail is required`));
      }

      if (!jobDetail.detail) {
        router.push('/installer-scheduler/create-job/details');
        return toast.error(t(`Job Detail is required`));
      }

      const promise = createJob({
        ...jobDetail,
        timeline: { ...timelineData }
      }).then((res) => {
        setJobDetail({
          id: '',
          ...timelineData,
          ...craetedJobDetail,
        });
      });

      await toast.promise(promise, {
        loading: t(`createJobLoadingMessage`),
        success: t(`createJobSuccessMessage`),
        error: t(`createJobErrorMessage`),
      });
    },
    [
      t,
      router,
      jobDetail,
      setJobDetail,
      createJob,
      craetedJobDetail,
    ],
  );

  const priorityControl = register('priority', {
    value: currentPriority,
    required: true,
  });

  const plannedStartDateControl = register('plannedStartDate', {
    value: currentPlannedStartDate,
    required: true,
  });

  const dueDate = register('dueDate', {
    value: currentDueDate,
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
              <Trans i18nKey={'installerScheduler:priority'} />
              <TextField.Input
                {...priorityControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:plannedStartDate'} />
              <TextField.Input
                {...plannedStartDateControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:dueDate'} />
              <TextField.Input
                {...dueDate}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>
              <Trans i18nKey={'installerScheduler:createJob'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TimelineForm;