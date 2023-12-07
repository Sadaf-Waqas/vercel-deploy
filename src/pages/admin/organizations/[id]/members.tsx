import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { withAdminProps } from '~/lib/admin/props/with-admin-props';
import { getOrganizationMembersByOrganizationId } from '~/lib/admin/queries';

import OrganizationMembersTable from '~/components/admin/organizations/OrganizationMembersTable';
import AdminHeader from '~/components/admin/AdminHeader';
import AdminRouteShell from '~/components/admin/AdminRouteShell';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import configuration from '~/configuration';

type Props = React.PropsWithChildren<{
  members: Awaited<ReturnType<typeof getOrganizationMembersByOrganizationId>>;
}>;

function AdminOrganizationMembersPage({ members }: Props) {
  return (
    <AdminRouteShell>
      <Head>
        <title>{`Manage Members | ${configuration.site.siteName}`}</title>
      </Head>

      <AdminHeader>Manage Members</AdminHeader>

      <div className={'p-3 flex flex-col flex-1 space-y-4'}>
        <Breadcrumbs />

        <OrganizationMembersTable members={members} />
      </div>
    </AdminRouteShell>
  );
}

export default AdminOrganizationMembersPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const adminProps = await withAdminProps(ctx);

  if ('redirect' in adminProps) {
    return adminProps;
  }

  const organizationId = ctx.params?.id as string;
  const members = await getOrganizationMembersByOrganizationId(organizationId);

  return {
    props: {
      ...adminProps.props,
      members,
    },
  };
}

function Breadcrumbs() {
  return (
    <div className={'flex space-x-2 items-center p-2 text-xs'}>
      <div className={'flex space-x-1.5 items-center'}>
        <Link href={'/admin'}>Admin</Link>
      </div>

      <ChevronRightIcon className={'w-3'} />

      <Link href={'/admin/organizations'}>Organizations</Link>

      <ChevronRightIcon className={'w-3'} />

      <span>Members</span>
    </div>
  );
}
