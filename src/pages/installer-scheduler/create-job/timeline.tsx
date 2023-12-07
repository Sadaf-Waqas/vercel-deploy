import { GetServerSidePropsContext } from "next";
import { Trans } from 'next-i18next';
import CreateJobTabs from "~/components/installer-scheduler/CreateJobTabs";
import InstallerSchedulerPageContainer from "~/components/installer-scheduler/InstallerSchedulerPageContainer";
import InstallerSchedulerContentContainer from "~/components/installer-scheduler/InstallerSchedulerContentContainer";
import InstallerSchedulerTile from "~/components/installer-scheduler/InstallerSchedulerTile";
import FirebaseStorageProvider from "~/core/firebase/components/FirebaseStorageProvider";
import TimelineForm from "~/components/installer-scheduler/TimelineForm";
import { withAppProps } from '~/lib/props/with-app-props';

const Timeline = () => {
  return (
    <InstallerSchedulerPageContainer title={'Installer Scheduler'}>
      <CreateJobTabs />
      <InstallerSchedulerContentContainer>
        <InstallerSchedulerTile
          heading={<Trans i18nKey={'installerScheduler:timeline'} />}
          subHeading={<Trans i18nKey={'installerScheduler:manageTheTimeline'} />}
        >
          <FirebaseStorageProvider>
            <TimelineForm />
          </FirebaseStorageProvider>
        </InstallerSchedulerTile>
      </InstallerSchedulerContentContainer>
    </InstallerSchedulerPageContainer>
  )
};

export default Timeline;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}