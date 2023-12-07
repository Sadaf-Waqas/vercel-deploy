import { GetServerSidePropsContext } from "next";
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import InstallerSchedulerPageContainer from "~/components/installer-scheduler/InstallerSchedulerPageContainer";
import EditJobTabs from "~/components/installer-scheduler/EditJobTabs";
import InstallerSchedulerContentContainer from "~/components/installer-scheduler/InstallerSchedulerContentContainer";
import InstallerSchedulerTile from "~/components/installer-scheduler/InstallerSchedulerTile";
import FirebaseStorageProvider from "~/core/firebase/components/FirebaseStorageProvider";
import CreatePropertyForm from "~/components/installer-scheduler/PropertyDetailForm";

const EditJob = () => {
  return (
    <InstallerSchedulerPageContainer title={'Installer Scheduler'}>
      <EditJobTabs />
      <InstallerSchedulerContentContainer>
        <InstallerSchedulerTile
          heading={<Trans i18nKey={'installerScheduler:propertyDetails'} />}
        >
          <FirebaseStorageProvider>
            <CreatePropertyForm />
          </FirebaseStorageProvider>
        </InstallerSchedulerTile>
      </InstallerSchedulerContentContainer>
    </InstallerSchedulerPageContainer>
  )
};

export default EditJob;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}