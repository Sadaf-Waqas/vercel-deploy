import { GetServerSidePropsContext } from "next";
import { Trans } from 'next-i18next';

import InstallersContentContainer from "~/components/installers/InstallersContentContainer"
import InstallersFormTile from "~/components/installers/InstallersFormTile";
import InstallersPageContainer from "~/components/installers/InstallersPageContainer"
import InstallersTabs from "~/components/installers/InstallersTabs"
import InstallersApplyForm from "~/components/installers/installersApplyForm";
import { withAppProps } from "~/lib/props/with-app-props";

const InstallersApplyPage = () => {
  return (
    <InstallersPageContainer title={'Installers'}>
      <InstallersTabs />
      <InstallersContentContainer>
        <InstallersFormTile
          heading={<Trans i18nKey={'installers:installerApplication'} />}
        >
          <InstallersApplyForm />
        </InstallersFormTile>
      </InstallersContentContainer>
    </InstallersPageContainer>
  )
}

export default InstallersApplyPage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
