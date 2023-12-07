import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { withAppProps } from '~/lib/props/with-app-props';
import JobsPageContainer from '~/components/jobs/JobsPageContainer';
import JobsContentContainer from '~/components/jobs/JobsContentContainer';
import JobsTable from '~/components/jobs/JobsTable';
import ScheduleJobs from '~/components/jobs/ScheduleJobs';

const JobsPage = () => {
  return (
    <JobsPageContainer title={'Jobs'}>
      <JobsContentContainer>
        <ScheduleJobs />
        <JobsTable />
      </JobsContentContainer>
    </JobsPageContainer>
  )
};

export default JobsPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
