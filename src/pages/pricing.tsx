import Head from 'next/head';
import { GetStaticPropsContext } from 'next';

import { withTranslationProps } from '~/lib/props/with-translation-props';

import configuration from '~/configuration';
import SiteHeader from '~/components/SiteHeader';

import Layout from '~/core/ui/Layout';
import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Footer from '~/components/Footer';
import PricingTable from '~/components/PricingTable';
import Heading from '~/core/ui/Heading';

const Pricing = () => {
  return (
    <>
      <Layout>
        <Head>
          <title key="title">
            {`Pricing - ${configuration.site.siteName}`}
          </title>
        </Head>

        <SiteHeader />

        <Container>
          <div className={'flex flex-col space-y-8 my-8'}>
            <div className={'flex flex-col items-center space-y-4'}>
              <Heading type={1}>Pricing</Heading>
              <SubHeading>Fair pricing for your customers</SubHeading>
            </div>

            <PricingTable />
          </div>
        </Container>

        <Footer />
      </Layout>
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });

  return {
    props,
  };
}

export default Pricing;
