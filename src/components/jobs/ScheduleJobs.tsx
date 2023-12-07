import React from 'react';
import {CalendarDaysIcon} from '@heroicons/react/24/outline';

const ScheduleJobs = () => {
  return (
    <div className={'mb-6'}>
      <span className={'font-medium'}>
        Schedule for
      </span>
      <div className={'flex'}>
        <CalendarDaysIcon className={'w-5 mr-4'}/>
        <span className={'underline text-gray-400'}>Oct. 10, 2023</span>
      </div>
    </div>
  )
};

export default ScheduleJobs;