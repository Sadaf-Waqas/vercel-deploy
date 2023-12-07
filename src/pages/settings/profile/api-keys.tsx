import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import ProfileSettingsTabs from '~/components/profile/ProfileSettingsTabs';
import SettingsPageContainer from '~/components/settings/SettingsPageContainer';
import SettingsContentContainer from '~/components/settings/SettingsContentContainer';
import SettingsTile from '~/components/settings/SettingsTile';
import KeyManager from '~/components/profile/KeyManager';
import { ZuploConfig } from '~/components/profile/KeyManager';

const APIKeys = () => {
  const zuplo_env: ZuploConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL,
    ZUPLO_API_KEY: process.env.NEXT_PUBLIC_ZUPLO_API_KEY,
  };

  return (
    <SettingsPageContainer title={'Settings'}>
      <Head>
        <title key={'title'}>API Keys</title>
      </Head>
      <ProfileSettingsTabs />
      <SettingsContentContainer>
        <SettingsTile
          heading={<Trans i18nKey={'profile:apiKeysTab'} />}
          subHeading={<Trans i18nKey={'profile:apiKeysTabSubheading'} />}
        >
          <KeyManager env={zuplo_env} />
        </SettingsTile>
      </SettingsContentContainer>
    </SettingsPageContainer>
  )
}

export default APIKeys;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
