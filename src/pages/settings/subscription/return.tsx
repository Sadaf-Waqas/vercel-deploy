import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import type { Stripe } from 'stripe';

import SettingsPageContainer from '~/components/settings/SettingsPageContainer';
import { withAppProps } from '~/lib/props/with-app-props';
import { getStripeSession } from '~/lib/stripe/get-stripe-session';
import { StripeSessionStatus } from '~/components/subscriptions/StripeSessionStatus';

const EmbeddedStripeCheckout = dynamic(
  () => import('~/components/subscriptions/EmbeddedStripeCheckout'),
  {
    ssr: false,
  },
);

function ReturnStripeSessionPage({
  session,
}: React.PropsWithChildren<{
  session: {
    status: Stripe.Checkout.Session['status'];
    customerEmail: string;
    clientSecret: string | null;
  };
}>) {
  const router = useRouter();

  if (session.clientSecret) {
    return (
      <EmbeddedStripeCheckout
        clientSecret={session.clientSecret}
        onClose={() => {
          return router.replace('/settings/subscription');
        }}
      />
    );
  }

  return (
    <>
      <SettingsPageContainer title={'Settings'}>
        <Head>
          <title key="title">Checkout</title>
        </Head>

        <div className={'fixed left-0 top-48 w-full mx-auto z-50'}>
          <StripeSessionStatus
            status={session.status}
            customerEmail={session.customerEmail}
          />
        </div>
      </SettingsPageContainer>

      <div
        className={
          'bg-background/30 backdrop-blur-sm fixed top-0 left-0 w-full h-full'
        }
      />
    </>
  );
}

export default ReturnStripeSessionPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const appProps = await withAppProps(ctx);

  if ('redirect' in appProps) {
    return appProps;
  }

  const sessionId = ctx.query?.session_id as string;

  // if no ID is provided, we redirect to the subscription page
  if (!sessionId) {
    return {
      redirect: {
        destination: '/settings/subscription',
        permanent: false,
      },
    };
  }

  // now we fetch the session from Stripe
  // and check if it's still open
  const session = await getStripeSession(sessionId).catch(() => undefined);

  if (!session) {
    return {
      notFound: true,
    };
  }

  const isSessionOpen = session.status === 'open';
  const clientSecret = isSessionOpen ? session.client_secret : null;
  const isEmbeddedMode = session.ui_mode === 'embedded';

  // if the session is still open, we redirect the user to the checkout page
  // in Stripe self hosted mode
  if (isSessionOpen && !isEmbeddedMode) {
    return {
      redirect: {
        destination: session.url,
        permanent: false,
      },
    };
  }

  // otherwise - we show the user the return page
  // and display the details of the session
  return {
    props: {
      ...appProps.props,
      session: {
        status: session.status,
        customerEmail: session.customer_details?.email,
        clientSecret,
      },
    },
  };
}
