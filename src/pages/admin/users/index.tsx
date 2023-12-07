import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import AdminRouteShell from '~/components/admin/AdminRouteShell';
import AdminHeader from '~/components/admin/AdminHeader';
import { withAdminProps } from '~/lib/admin/props/with-admin-props';
import { getUsers } from '~/lib/admin/queries';
import UsersTable from '~/components/admin/users/UsersTable';

import configuration from '~/configuration';

function UsersAdminPage({
  users,
  pageToken,
}: React.PropsWithChildren<{
  users: Awaited<ReturnType<typeof getUsers>>['users'];
  pageToken?: string;
}>) {
  return (
    <AdminRouteShell>
      <Head>
        <title>{`Manage Users | ${configuration.site.siteName}`}</title>
      </Head>

      <AdminHeader>Users</AdminHeader>

      <div className={'p-3 flex flex-col flex-1'}>
        <UsersTable pageToken={pageToken} users={users} />
      </div>
    </AdminRouteShell>
  );
}

export default UsersAdminPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const adminProps = await withAdminProps(ctx);

  if ('redirect' in adminProps) {
    return adminProps;
  }

  const perPage = 100;
  const query = ctx.query;
  const nextPageToken = query.pageToken as string;

  const { users, pageToken } = await loadUsers({
    nextPageToken,
    perPage,
  });

  return {
    props: {
      ...adminProps.props,
      users,
      pageToken: pageToken || null,
    },
  };
}

async function loadUsers(params: {
  nextPageToken: Maybe<string>;
  perPage: number;
}) {
  const { users: result, pageToken } = await getUsers(params);

  const users = result.map((user) => {
    return {
      uid: user.uid,
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      disabled: user.disabled,
    };
  });

  return {
    users,
    pageToken,
  };
}
