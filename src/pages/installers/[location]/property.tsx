import { GetServerSidePropsContext } from "next";
import { Trans } from 'next-i18next';

import InstallersContentContainer from "~/components/installers/InstallersContentContainer";
import InstallersPageContainer from "~/components/installers/InstallersPageContainer";
import InstallersTable from "~/components/installers/InstallersTable";
import InstallersTabs from "~/components/installers/InstallersTabs";
import InstallersTile from "~/components/installers/InstallersTile";

import { withAppProps } from "~/lib/props/with-app-props";

const InstallersPropertyPage = () => {
  return (
    <InstallersPageContainer title={'Installers'}>
      <InstallersTabs />
      <InstallersContentContainer>
        <InstallersTile
          heading={<Trans i18nKey={'installers:installerProfiles'} />}
        >
        </InstallersTile>
        <InstallersTable />
      </InstallersContentContainer>
    </InstallersPageContainer>
  )
}

export default InstallersPropertyPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
