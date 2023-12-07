'use client';

import { useRouter } from 'next/router';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans } from 'next-i18next';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "~/core/ui/Select";
import { JobDetailForm } from '~/lib/jobs/types/jobs';
import { JobContext } from '~/lib/contexts/job';
import { useFetchCatalogues } from '~/lib/catalogues/hooks/use-fetch-catalogues';
import Alert from '~/core/ui/Alert';

function JobDetailForm({ }) {
  const router = useRouter();
  const { data: catalogueData } = useFetchCatalogues();

  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  const currentJobSize = '';
  const { jobDetail, setJobDetail } = useContext(JobContext);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      jobSize: currentJobSize,
    },
  });

  const onSubmit = useCallback(
    async (jobDetailData: JobDetailForm, categoryData: string) => {
      console.log('Hello', jobDetailData, categoryData);
      if (!categoryData) {
        setCategoryError(true);
        return;
      }
      setJobDetail({
        ...jobDetail,
        id: '',
        detail: {
          ...jobDetailData,
          category: categoryData,
        },
      });

      router.push('/installer-scheduler/create-job/timeline');
    },
    [router, jobDetail, setJobDetail],
  );

  const jobSizeControl = register('jobSize', {
    value: currentJobSize,
    required: true,
  });

  return (
    <>
      <form onSubmit={handleSubmit((value) => {
        return onSubmit(value, category);
      })}>
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:typeOfFloor'} />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={'Select flooring(s)'} />
                </SelectTrigger>
                {categoryError && (
                  <Alert type={'error'}>Category is required!</Alert>
                )}

                <SelectContent>
                  {catalogueData.map((item) =>
                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installerScheduler:jobSize'} />
              <TextField.Input
                {...jobSizeControl}
                minLength={2}
                placeholder={'Enter sq yds'}
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
  );
};

export default JobDetailForm;
