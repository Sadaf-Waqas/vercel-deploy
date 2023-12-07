import { GetServerSidePropsContext } from "next";
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import InstallerSchedulerPageContainer from "~/components/installer-scheduler/InstallerSchedulerPageContainer";
import CreateJobTabs from "~/components/installer-scheduler/CreateJobTabs";
import InstallerSchedulerContentContainer from "~/components/installer-scheduler/InstallerSchedulerContentContainer";
import InstallerSchedulerTile from "~/components/installer-scheduler/InstallerSchedulerTile";
import FirebaseStorageProvider from "~/core/firebase/components/FirebaseStorageProvider";
import JobDetailForm from "~/components/installer-scheduler/JobDetailForm";

const JobDetail = () => {
  return (
    <InstallerSchedulerPageContainer title={'Installer Scheduler'}>
      <CreateJobTabs />
      <InstallerSchedulerContentContainer>
        <InstallerSchedulerTile
          heading={<Trans i18nKey={'installerScheduler:jobDetails'} />}
          subHeading={<Trans i18nKey={'installerScheduler:manageJobDetails'} />}
        >
          <FirebaseStorageProvider>
            <JobDetailForm />
          </FirebaseStorageProvider>
        </InstallerSchedulerTile>
      </InstallerSchedulerContentContainer>
    </InstallerSchedulerPageContainer>
  )
};

export default JobDetail;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}