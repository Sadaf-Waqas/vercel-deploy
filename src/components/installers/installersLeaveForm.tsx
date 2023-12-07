import { useForm } from "react-hook-form";

import { Trans } from 'next-i18next';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';

function InstallersLeaveForm({ }) {
  const currentLeaveName = '';
  const currentTypeOfLeave = '';
  const currentStartDate = '';
  const currentEndDate = '';
  const currentTimes = '';
  const currentReasonForLeave = '';

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      leaveName: currentLeaveName,
      typeOfLeave: currentTypeOfLeave,
      startDate: currentStartDate,
      endDate: currentEndDate,
      times: currentTimes,
      reasonForLeave: currentReasonForLeave,
    }
  });

  const leaveNameControl = register('leaveName', {
    value: currentLeaveName,
    required: true,
  });

  const typeOfLeaveControl = register('typeOfLeave', {
    value: currentTypeOfLeave,
    required: true,
  });

  const startDateControl = register('startDate', {
    value: currentStartDate,
    required: true,
  });

  const endDateControl = register('endDate', {
    value: currentEndDate,
    required: true,
  });

  const timesControl = register('times', {
    value: currentTimes,
    required: true,
  });

  const reasonForLeaveControl = register('reasonForLeave', {
    value: currentReasonForLeave,
    required: true,
  });

  return (
    <>
      <form>
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:leaveName'} />
              <TextField.Input
                {...leaveNameControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:typeOfLeave'} />
              <TextField.Input
                {...typeOfLeaveControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:startDate'} />
              <TextField.Input
                {...startDateControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:endDate'} />
              <TextField.Input
                {...endDateControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:times'} />
              <TextField.Input
                {...timesControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'installers:reasonForLeave'} />
              <TextField.Input
                {...reasonForLeaveControl}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>
              <Trans i18nKey={'installers:submit'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default InstallersLeaveForm;