import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { withAdminProps } from '~/lib/admin/props/with-admin-props';
import AdminRouteShell from '~/components/admin/AdminRouteShell';
import AdminHeader from '~/components/admin/AdminHeader';
import AdminDashboard from '~/components/admin/AdminDashboard';
import getRestFirestore from '~/core/firebase/admin/get-rest-firestore';
import { withAdmin as withFirebaseAdmin } from '~/core/middleware/with-admin';

import {
  ORGANIZATIONS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

import configuration from '~/configuration';

function AdminPage(
  props: React.PropsWithChildren<{
    data: {
      usersCount: number;
      organizationsCount: number;
      activeSubscriptions: number;
      trialSubscriptions: number;
    };
  }>,
) {
  return (
    <AdminRouteShell>
      <Head>
        <title>{`Admin | ${configuration.site.siteName}`}</title>
      </Head>

      <AdminHeader>Admin</AdminHeader>

      <div className={'p-3'}>
        <AdminDashboard data={props.data} />
      </div>
    </AdminRouteShell>
  );
}

export default AdminPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const adminProps = await withAdminProps(context);

  if ('redirect' in adminProps) {
    return adminProps;
  }

  const data = await loadData();

  return {
    props: {
      ...adminProps.props,
      data,
    },
  };
}

async function loadData() {
  await withFirebaseAdmin();

  const firestore = getRestFirestore();

  const organizationsResponse = await firestore
    .collection(ORGANIZATIONS_COLLECTION)
    .count()
    .get();

  const activeSubscriptionsResponse = await firestore
    .collection(ORGANIZATIONS_COLLECTION)
    .where('subscription.status', '==', 'active')
    .count()
    .get();

  const trialSubscriptionsResponse = await firestore
    .collection(ORGANIZATIONS_COLLECTION)
    .where('subscription.status', '==', 'trial')
    .count()
    .get();

  const usersResponse = await firestore
    .collection(USERS_COLLECTION)
    .count()
    .get();

  const { count: organizationsCount } = organizationsResponse.data();
  const { count: activeSubscriptions } = activeSubscriptionsResponse.data();
  const { count: trialSubscriptions } = trialSubscriptionsResponse.data();
  const { count: usersCount } = usersResponse.data();

  return {
    usersCount,
    organizationsCount,
    activeSubscriptions,
    trialSubscriptions,
  };
}
