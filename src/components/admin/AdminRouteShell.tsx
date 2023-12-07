import AdminProviders from '~/components/admin/AdminProviders';
import AdminSidebar from '~/components/admin/AdminSidebar';

function AdminRouteShell(props: React.PropsWithChildren) {
  return (
    <AdminProviders collapsed={false}>
      <div className={'flex flex-1'}>
        <AdminSidebar />

        <div className={'flex flex-col flex-1'}>{props.children}</div>
      </div>
    </AdminProviders>
  );
}

export default AdminRouteShell;
