import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next';

import configuration from '~/configuration';
import { withTranslationProps } from '~/lib/props/with-translation-props';

import { getDocs } from '~/core/docs/api';
import Layout from '~/core/ui/Layout';
import SiteHeader from '~/components/SiteHeader';
import Container from '~/core/ui/Container';
import Footer from '~/components/Footer';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';

import DocumentationNavigation from '~/components/docs/DocumentationNavigation';
import FloatingDocumentationNavigation from '~/components/docs/FloatingDocumentationNavigation';

export default function Docs({
  docs,
}: React.PropsWithChildren<{ docs: ReturnType<typeof getDocs> }>) {
  return (
    <>
      <Layout>
        <Head>
          <title key="title">
            {`Documentation - ${configuration.site.siteName}`}
          </title>
        </Head>

        <SiteHeader />

        <div className={'block md:hidden'}>
          <FloatingDocumentationNavigation data={docs} />
        </div>

        <Container>
          <div className={'flex flex-col items-center space-y-4 my-8'}>
            <Heading type={1}>Management</Heading>

            <SubHeading>
              Easily manage your clients, jobs, and teams.
            </SubHeading>
          </div>

          <div className={'block md:flex md:space-x-8 lg:space-x-16'}>
            <div className={'DocumentationSidebarContainer'}>
              <div className={'flex flex-col space-y-2'}>
                <DocumentationNavigation data={docs} />
              </div>
            </div>

            <div className="mt-8 flex flex-1 flex-col">
              <div
                className={
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' +
                  ' gap-4 md:gap-8'
                }
              >
                {docs.map((doc) => {
                  const { pages, directory } = doc;
                  const page = pages[0];
                  const href = `/docs/${page?.slug}`;

                  return (
                    <TopicLink key={href} href={href}>
                      <Heading type={4}>
                        <span className={'font-semibold'}>
                          {directory.title}
                        </span>
                      </Heading>

                      <span className={'block text-base dark:text-gray-300'}>
                        {directory.description}
                      </span>
                    </TopicLink>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Layout>

      <Footer />
    </>
  );
}

function TopicLink({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link
      className={`flex w-full flex-col space-y-2 border hover:border-gray-100 dark:hover:border-dark-700 rounded-xl bg-background px-6 py-6 transition-colors dark:border-dark-800`}
      href={href}
    >
      {children}
    </Link>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const docs = getDocs() ?? [];
  const { props } = await withTranslationProps({ locale });

  return {
    props: {
      ...props,
      docs,
    },
  };
}
