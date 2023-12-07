import { GetServerSidePropsContext } from "next";

import { withAppProps } from '~/lib/props/with-app-props';
import InstallerSchedulerPageContainer from "~/components/installer-scheduler/InstallerSchedulerPageContainer";
import EditJobTabs from "~/components/installer-scheduler/EditJobTabs";

const EditJobDetail = () => {
  return (
    <InstallerSchedulerPageContainer title={'Installer Scheduler'}>
      <EditJobTabs />
    </InstallerSchedulerPageContainer>
  )
};

export default EditJobDetail;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}