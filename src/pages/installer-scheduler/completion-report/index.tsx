import { GetServerSidePropsContext } from "next";
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import InstallerSchedulerPageContainer from "~/components/installer-scheduler/InstallerSchedulerPageContainer";
import InstallerSchedulerContentContainer from "~/components/installer-scheduler/InstallerSchedulerContentContainer";
import InstallerSchedulerTile from "~/components/installer-scheduler/InstallerSchedulerTile";
import FirebaseStorageProvider from "~/core/firebase/components/FirebaseStorageProvider";
import CompletionReportForm from "~/components/installer-scheduler/CompletionReportForm";

const CompletionReport = () => {
  return (
    <InstallerSchedulerPageContainer title={'Installer Scheduler'}>
      <InstallerSchedulerContentContainer>
        <InstallerSchedulerTile
          heading={<Trans i18nKey={'installerScheduler:completionReport'} />}
        >
          <FirebaseStorageProvider>
            <CompletionReportForm />
          </FirebaseStorageProvider>
        </InstallerSchedulerTile>
      </InstallerSchedulerContentContainer>
    </InstallerSchedulerPageContainer>
  )
};

export default CompletionReport;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}