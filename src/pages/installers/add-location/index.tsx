import { GetServerSidePropsContext } from "next";
import { Trans } from "next-i18next";
import InstallersFormTile from "~/components/installers/InstallersFormTile";
import InstallersPageContainer from "~/components/installers/InstallersPageContainer";
import AddNewLocationFrom from "~/components/installers/addNewLocationForm";
import { withAppProps } from "~/lib/props/with-app-props";

const AddLocationPage = () => {
  return (
    <InstallersPageContainer title={'Installers'}
    >
      <InstallersFormTile
        heading={<Trans i18nKey={'installers:addNewLocation'} />}
      >
        <AddNewLocationFrom />
      </InstallersFormTile>
    </InstallersPageContainer>
  )
}

export default AddLocationPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
