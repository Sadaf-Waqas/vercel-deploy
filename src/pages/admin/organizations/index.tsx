import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { withAdminProps } from '~/lib/admin/props/with-admin-props';
import { getOrganizations } from '~/lib/admin/queries';

import AdminRouteShell from '~/components/admin/AdminRouteShell';
import AdminHeader from '~/components/admin/AdminHeader';
import OrganizationsTable from '~/components/admin/organizations/OrganizationsTable';
import { Organization } from '~/lib/organizations/types/organization';

import getPageFromQueryParam from '~/core/generic/get-page-query-param';
import configuration from '~/configuration';

function OrganizationsAdminPage({
  organizations,
  page,
  perPage,
  count,
}: React.PropsWithChildren<{
  organizations: Array<WithId<Organization>>;
  page: number;
  perPage: number;
  count: number;
}>) {
  const pageCount = Math.ceil(count / perPage);

  return (
    <AdminRouteShell>
      <Head>
        <title>{`Manage Organizations | ${configuration.site.siteName}`}</title>
      </Head>

      <AdminHeader>Organizations</AdminHeader>

      <div className={'p-3 flex flex-col flex-1'}>
        <OrganizationsTable
          organizations={organizations}
          pageIndex={page - 1}
          pageSize={perPage}
          pageCount={pageCount}
        />
      </div>
    </AdminRouteShell>
  );
}

export default OrganizationsAdminPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const adminProps = await withAdminProps(ctx);

  if ('redirect' in adminProps) {
    return adminProps;
  }

  const perPage = 10;

  const query = ctx.query;
  const beforeSnapshot = query.beforeSnapshot as string;
  const afterSnapshot = query.afterSnapshot as string;
  const page = getPageFromQueryParam(query.page as string);

  const { organizations, count } = await getOrganizations({
    beforeSnapshot,
    afterSnapshot,
    perPage,
  });

  return {
    props: {
      ...adminProps.props,
      page,
      organizations,
      perPage,
      count,
    },
  };
}
