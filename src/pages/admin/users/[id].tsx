import { getAuth, UserRecord } from 'firebase-admin/auth';

import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import { withAdminProps } from '~/lib/admin/props/with-admin-props';
import { getOrganizationsForUser } from '~/lib/admin/queries';
import { Organization } from '~/lib/organizations/types/organization';
import { MembershipRole } from '~/lib/organizations/types/membership-role';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

import Heading from '~/core/ui/Heading';
import Tile from '~/core/ui/Tile';
import Label from '~/core/ui/Label';
import Badge from '~/core/ui/Badge';
import TextField from '~/core/ui/TextField';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

import AdminRouteShell from '~/components/admin/AdminRouteShell';
import AdminHeader from '~/components/admin/AdminHeader';
import DisableUserModal from '~/components/admin/users/DisableUserModal';
import ImpersonateUserModal from '~/components/admin/users/ImpersonateUserModal';
import ReactivateUserModal from '~/components/admin/users/ReactivateUserModal';
import RoleBadge from '~/components/organizations/RoleBadge';

function UserAdminPage({
  user,
  organizations,
}: React.PropsWithChildren<{
  user: UserRecord & {
    isDisabled: boolean;
  };
  organizations: Array<
    WithId<
      Organization & {
        role: MembershipRole;
      }
    >
  >;
}>) {
  const displayName =
    user.displayName || user.email || user.phoneNumber || user.uid || '';

  return (
    <AdminRouteShell>
      <Head>
        <title>{`Manage User | ${displayName}`}</title>
      </Head>

      <AdminHeader>Manage User</AdminHeader>

      <div className={'p-3 flex flex-col flex-1'}>
        <div className={'flex flex-col space-y-6'}>
          <div className={'flex justify-between'}>
            <Breadcrumbs displayName={displayName} />

            <div>
              <UserActionsDropdown
                uid={user.uid}
                isDisabled={user.disabled}
                displayName={displayName}
              />
            </div>
          </div>

          <Tile>
            <Heading type={4}>User Details</Heading>

            <div className={'flex space-x-2 items-center'}>
              <div>
                <Label>Status</Label>
              </div>

              <div className={'inline-flex'}>
                {user.disabled ? (
                  <Badge size={'small'} color={'error'}>
                    Disabled
                  </Badge>
                ) : (
                  <Badge size={'small'} color={'success'}>
                    Active
                  </Badge>
                )}
              </div>
            </div>

            <TextField.Label>
              Display name
              <TextField.Input
                className={'max-w-sm'}
                defaultValue={user.displayName ?? ''}
                disabled
              />
            </TextField.Label>

            <TextField.Label>
              Email
              <TextField.Input
                className={'max-w-sm'}
                defaultValue={user.email ?? ''}
                disabled
              />
            </TextField.Label>

            <TextField.Label>
              Phone number
              <TextField.Input
                className={'max-w-sm'}
                defaultValue={user.phoneNumber ?? ''}
                disabled
              />
            </TextField.Label>
          </Tile>

          <Tile>
            <Heading type={4}>Organizations</Heading>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization ID</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations.map((organization) => {
                  return (
                    <TableRow key={organization.id}>
                      <TableCell>{organization.id}</TableCell>
                      <TableCell>{organization.name}</TableCell>

                      <TableCell>
                        <div className={'inline-flex'}>
                          <RoleBadge role={organization.role} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Tile>
        </div>
      </div>
    </AdminRouteShell>
  );
}

export default UserAdminPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const adminProps = await withAdminProps(ctx);

  if ('redirect' in adminProps) {
    return adminProps;
  }

  const auth = getAuth();
  const user = await auth.getUser(ctx.query.id as string);

  const userProps = {
    uid: user.uid,
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    disabled: user.disabled,
  };

  const organizations = await getOrganizationsForUser(user.uid);

  return {
    props: {
      ...adminProps.props,
      organizations,
      user: userProps,
    },
  };
}

function Breadcrumbs({
  displayName,
}: React.PropsWithChildren<{
  displayName: string;
}>) {
  return (
    <div className={'flex space-x-1 items-center text-xs p-2'}>
      <Link href={'/admin'}>Admin</Link>
      <ChevronRightIcon className={'w-3'} />
      <Link href={'/admin/users'}>Users</Link>
      <ChevronRightIcon className={'w-3'} />
      <span>{displayName}</span>
    </div>
  );
}

function UserActionsDropdown({
  uid,
  displayName,
  isDisabled,
}: React.PropsWithChildren<{
  uid: string;
  isDisabled: boolean;
  displayName: string;
}>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <span className={'flex space-x-2.5 items-center'}>
            <span>Manage User</span>

            <EllipsisVerticalIcon className={'w-4'} />
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ImpersonateUserModal userId={uid} displayName={displayName}>
            Impersonate
          </ImpersonateUserModal>
        </DropdownMenuItem>

        <If condition={!isDisabled}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DisableUserModal userId={uid} displayName={displayName}>
              <span className={'text-red-500'}>Disable</span>
            </DisableUserModal>
          </DropdownMenuItem>
        </If>

        <If condition={isDisabled}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ReactivateUserModal userId={uid} displayName={displayName}>
              Reactivate
            </ReactivateUserModal>
          </DropdownMenuItem>
        </If>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
