import Image from 'next/image';
import { GetStaticPropsContext } from 'next';

import {
  BuildingLibraryIcon,
  CubeIcon,
  DocumentIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import Heading from '~/core/ui/Heading';
import Layout from '~/core/ui/Layout';
import SiteHeader from '~/components/SiteHeader';
import { withTranslationProps } from '~/lib/props/with-translation-props';
import Footer from '~/components/Footer';
import PricingTable from '~/components/PricingTable';

function Index() {
  return (
    <Layout>
      <SiteHeader />

      <Container>
        <div
          className={
            'my-12 flex flex-col items-center md:flex-row lg:my-16' +
            ' mx-auto flex-1 justify-center animate-in fade-in ' +
            ' duration-1000 slide-in-from-top-12'
          }
        >
          <div className={'flex w-full flex-1 flex-col items-center space-y-8'}>
            <Pill>
              <span>The leader in contractor scheduling</span>
            </Pill>

            <HeroTitle>
              <span>One-Stop solution for</span>
              <span
                className={
                  'bg-gradient-to-br bg-clip-text text-transparent' +
                  ' from-primary-400 to-primary-700 leading-[1.2]'
                }
              >
                contractor scheduling
              </span>
            </HeroTitle>

            <SubHeading className={'text-center'}>
              <span>Unleash the power of your business</span>
              <span>Start scheduling now!</span>
            </SubHeading>

            <div className={'flex flex-col items-center space-y-4'}>
              <MainCallToActionButton />

              <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                Free plan. No credit card required.
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            'flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in ' +
            ' duration-1000 slide-in-from-top-16 fill-mode-both delay-300'
          }
        >
          <Image
            priority
            className={
              'shadow-[0_0_1000px_0] rounded-2xl' +
              ' shadow-primary/40 animate-in fade-in' +
              ' zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both'
            }
            width={2688}
            height={1824}
            src={`/assets/images/dashboard_main.png`}
            alt={`App Image`}
          />
        </div>
      </Container>

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center space-y-24 py-16'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-6 text-center'
            }
          >
            <Pill>A modern, scalable, and secure interface</Pill>

            <div className={'flex flex-col space-y-2.5'}>
              <Heading type={1}>The best tool in the space</Heading>

              <SubHeading>
                Unbeatable Features and Benefits for Scheduling Contractors
              </SubHeading>
            </div>
          </div>

          <div>
            <div className={'grid gap-12 lg:grid-cols-3'}>
              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <UserIcon className={'h-5'} />
                </FeatureIcon>

                <Heading type={4}>Authentication</Heading>

                <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                  Secure and Easy-to-Use interface
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <BuildingLibraryIcon className={'h-5'} />
                </FeatureIcon>

                <Heading type={4}>Multi-Tenancy</Heading>

                <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                  Powerful Multi-Tenancy Features for Maximum Flexibility and
                  Efficiency
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <UserGroupIcon className={'h-5'} />
                </FeatureIcon>

                <Heading type={4}>Team-Management</Heading>

                <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                  Effortlessly Manage and Organize Your Team Members
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <PaintBrushIcon className={'h-5'} />
                </FeatureIcon>

                <Heading type={4}>Job Management</Heading>

                <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                  Manage and Overlook all of your jobs
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <CubeIcon className={'h-5'} />
                </FeatureIcon>

                <Heading type={4}>Client Management</Heading>

                <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                  manage and Organize Your Clients
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <DocumentIcon className={'h-5'} />
                </FeatureIcon>

                <Heading type={4}>Schedule</Heading>

                <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                  Effortlessly overlook your jobs
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className={'flex flex-col space-y-4'}>
          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={1}>Authentication</Heading>

                <SubHeading>
                  Secure and Easy-to-Use Authentication for Your Scheduling
                </SubHeading>
              </div>

              <div>
                Our authentication system is industry-leading. It is
                secure, easy-to-use, and fully customizable. It supports
                email/password, social logins, and more.
              </div>

              <div>
                <Button round variant={'outline'} href={'/auth/sign-up'}>
                  <span className={'flex space-x-2 items-center'}>
                    <span>Get Started</span>
                    <ChevronRightIcon className={'h-3'} />
                  </span>
                </Button>
              </div>
            </LeftFeatureContainer>

            <RightFeatureContainer>
              <Image
                className="rounded-2xl"
                src={'/assets/images/sign-in.webp'}
                width={'626'}
                height={'683'}
                alt={'Sign In'}
              />
            </RightFeatureContainer>
          </FeatureShowcaseContainer>

          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <Image
                className="rounded-2xl"
                src={'/assets/images/dashboard_small.png'}
                width={'887'}
                height={'743'}
                alt={'Dashboard'}
              />
            </LeftFeatureContainer>

            <RightFeatureContainer>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={1}>Dashboard</Heading>

                <SubHeading>
                  A fantastic dashboard to manage your business
                </SubHeading>

                <div>
                  Our dashboard offers an overview of your installations. It
                  shows at a glance all you need to know about your business. It
                  is fully customizable and extendable.
                </div>

                <div>
                  <Button round variant={'outline'} href={'/auth/sign-up'}>
                    <span className={'flex space-x-2 items-center'}>
                      <span>Get Started</span>
                      <ChevronRightIcon className={'h-3'} />
                    </span>
                  </Button>
                </div>
              </div>
            </RightFeatureContainer>
          </FeatureShowcaseContainer>
        </div>
      </Container>

      <Divider />

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center py-16 space-y-16'
          }
        >
          <div className={'flex flex-col items-center space-y-8 text-center'}>
            <Pill>
              Get started for free. No credit card required. Cancel anytime.
            </Pill>

            <div className={'flex flex-col space-y-2.5'}>
              <Heading type={1}>
                Ready to take your business to the next level?
              </Heading>

              <SubHeading>
                Get started on our free plan and upgrade when you are ready.
              </SubHeading>
            </div>
          </div>

          <div className={'w-full'}>
            <PricingTable />
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
}

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });

  return {
    props,
  };
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-4xl text-gray-600 dark:text-white md:text-5xl' +
        ' flex flex-col font-heading font-medium xl:text-7xl 2xl:text-[5.2rem]'
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex'}>
      <div className={'rounded-xl bg-primary/10 p-4 dark:bg-primary/30'}>
        {props.children}
      </div>
    </div>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto items-center space-x-2' +
        ' rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400' +
        ' dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-gray-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

function FeatureShowcaseContainer(props: React.PropsWithChildren) {
  return (
    <div
      className={
        'flex flex-col lg:flex-row items-center justify-between' +
        ' lg:space-x-24'
      }
    >
      {props.children}
    </div>
  );
}

function LeftFeatureContainer(props: React.PropsWithChildren) {
  return (
    <div className={'flex flex-col space-y-8 w-full lg:w-6/12'}>
      {props.children}
    </div>
  );
}

function RightFeatureContainer(props: React.PropsWithChildren) {
  return <div className={'flex w-full lg:w-6/12'}>{props.children}</div>;
}

function MainCallToActionButton() {
  return (
    <Button
      className={
        'bg-transparent bg-gradient-to-r shadow-2xl' +
        ' hover:shadow-primary/60 from-primary' +
        ' to-primary-600 hover:to-indigo-600 text-white'
      }
      variant={'custom'}
      size={'lg'}
      round
      href={'/auth/sign-up'}
    >
      <span className={'flex items-center space-x-2'}>
        <span>Get Started</span>
        <ChevronRightIcon
          className={
            'h-4 animate-in fade-in slide-in-from-left-8' +
            ' delay-1000 fill-mode-both duration-1000 zoom-in'
          }
        />
      </span>
    </Button>
  );
}
