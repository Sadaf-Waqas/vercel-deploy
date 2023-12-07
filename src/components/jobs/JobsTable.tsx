'use client';

import React, { useState } from 'react';

import { useFetchJobs } from '~/lib/jobs/hooks/use-fetch-jobs';
import { useUserSession } from '~/core/hooks/use-user-session';

import Button from '~/core/ui/Button';
import Checkbox from '~/core/ui/Checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';


const JobsTable = () => {
  const [checkedArray, setCheckedArray] = useState<Array<String>>([]);
  const userSession = useUserSession();

  const userId = userSession?.auth?.uid;

  const { data } = useFetchJobs(userId || "");

  const handleCheckboxClick = (id: string) => {
    if (checkedArray.includes(id)) {
      setCheckedArray(checkedArray.filter((jobId) => jobId !== id));
    } else {
      setCheckedArray([...checkedArray, id]);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedArray(data.map(job => job.id));
    } else {
      setCheckedArray([]);
    }
  };

  return (
    <Table>
      <TableHeader className={'border-b-2 dark:border-white'}>
        <TableRow className={'dark:bg-[rgba(73,189,254,0.10)]'}>
          <TableHead><Checkbox
            checked={checkedArray.length === data.length}
            handleChange={handleSelectAllClick}
          /></TableHead>
          <TableHead className={'w-[500px]'}>Property Name</TableHead>
          <TableHead className={'w-[700px]'}>Property Address</TableHead>
          <TableHead className={'w-[700px]'}>Material & Capacity</TableHead>
          <TableHead className={'w-[500px]'}>Installer Name</TableHead>
          <TableHead className={'w-[200px]'}>Job Number</TableHead>
          <TableHead className={'w-[200px]'}></TableHead>
          <TableHead className={'w-[200px]'}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map((job) => (
            <TableRow key={job.id} className={'border-b dark:border-white'}>
              <TableCell><Checkbox
                checked={checkedArray.includes(job.id)}
                handleChange={(e) => handleCheckboxClick(job.id)}
              /></TableCell>
              <TableCell>{job.property_data?.name}</TableCell>
              <TableCell>{job.property_data?.address}</TableCell>
              <TableCell>
                {job.labour_data?.map((labor, index) =>
                  <div key={index}>{`${labor.catalog?.name} (${labor.amount} ${labor.catalog?.unit})`}</div>)}
              </TableCell>
              <TableCell>{job.installer_data?.name}</TableCell>
              <TableCell>{job.external_job_id}</TableCell>
              <TableCell>
                <Button
                  type={'button'}
                  size={'small'}
                  onClick={() => { }}
                >
                  <span className={'text-xs font-normal'}>Check In</span>
                </Button>
              </TableCell>
              <TableCell>
                <div className={'flex'}>
                  <Button
                    type={'button'}
                    variant={'ghost'}
                    size={'small'}
                    onClick={() => { }}
                  >
                    <span className={'text-xs font-normal'}>Reassign</span>
                  </Button>
                  <Button
                    type={'button'}
                    variant={'ghost'}
                    size={'small'}
                    onClick={() => { }}
                  >
                    <span className={'text-xs font-normal'}>Edit</span>
                  </Button>
                  <Button
                    type={'button'}
                    variant={'ghost'}
                    size={'small'}
                    onClick={() => { }}
                  >
                    <span className={'text-xs font-normal'}>View</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default JobsTable;