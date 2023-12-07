import Head from 'next/head';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { GetStaticPropsContext } from 'next';

import { withTranslationProps } from '~/lib/props/with-translation-props';
import configuration from '~/configuration';

import Layout from '~/core/ui/Layout';
import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';

import Footer from '~/components/Footer';
import SiteHeader from '../components/SiteHeader';
import Heading from '~/core/ui/Heading';

const DATA = [
  {
    question: `Do you offer a free trial?`,
    answer: `Yes, we offer a 14-day free trial. You can cancel at any time during the trial period and you won't be charged.`,
  },
  {
    question: `Can I cancel my subscription?`,
    answer: `You can cancel your subscription at any time. You can do this from your account settings.`,
  },
  {
    question: `Where can I find my invoices?`,
    answer: `You can find your invoices in your account settings.`,
  },
  {
    question: `What payment methods do you accept?`,
    answer: `We accept all major credit cards and PayPal.`,
  },
  {
    question: `Can I upgrade or downgrade my plan?`,
    answer: `Yes, you can upgrade or downgrade your plan at any time. You can do this from your account settings.`,
  },
];

const Faq = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DATA.map((item) => {
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      };
    }),
  };

  return (
    <Layout>
      <Head>
        <title key="title">{`FAQ - ${configuration.site.siteName}`}</title>

        <script
          key={'ld:json'}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <SiteHeader />

      <Container>
        <div className={'flex flex-col space-y-8 my-8'}>
          <div className={'flex flex-col items-center space-y-4'}>
            <Heading type={1}>FAQ</Heading>

            <SubHeading>Frequently Asked Questions</SubHeading>
          </div>

          <div
            className={
              'm-auto flex w-full max-w-xl items-center justify-center'
            }
          >
            <div className="flex w-full flex-col">
              {DATA.map((item, index) => {
                return <FaqItem key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
};

function FaqItem({
  item,
}: React.PropsWithChildren<{
  item: {
    question: string;
    answer: string;
  };
}>) {
  return (
    <details
      className={
        'group border-b border-gray-100 px-2 py-4 dark:border-dark-800'
      }
    >
      <summary
        className={'flex items-center justify-between hover:cursor-pointer'}
      >
        <h2
          className={
            'font-sans text-lg font-medium text-gray-600 hover:text-gray-700' +
            ' cursor-pointer dark:text-gray-300 dark:hover:text-white'
          }
        >
          {item.question}
        </h2>

        <div>
          <ChevronDownIcon
            className={'h-5 transition duration-300 group-open:-rotate-180'}
          />
        </div>
      </summary>

      <div
        className={
          'flex flex-col space-y-2 py-1 text-gray-500 dark:text-gray-400'
        }
        dangerouslySetInnerHTML={{ __html: item.answer }}
      />
    </details>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });

  return {
    props,
  };
}

export default Faq;
