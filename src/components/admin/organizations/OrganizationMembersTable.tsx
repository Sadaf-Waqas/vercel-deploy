import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

import DataTable from '~/core/ui/DataTable';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import IconButton from '~/core/ui/IconButton';
import Badge from '~/core/ui/Badge';
import If from '~/core/ui/If';

import { MembershipRole } from '~/lib/organizations/types/membership-role';
import RoleBadge from '~/components/organizations/RoleBadge';

import ImpersonateUserModal from '~/components/admin/users/ImpersonateUserModal';
import DisableUserModal from '~/components/admin/users/DisableUserModal';
import ReactivateUserModal from '~/components/admin/users/ReactivateUserModal';

type Data = {
  role: MembershipRole;
  id: string;
  email: string | undefined;
  emailVerified: boolean;
  displayName: string | undefined;
  photoURL: string | undefined;
  phoneNumber: string | undefined;
  disabled: boolean;
};

const columns: ColumnDef<Data>[] = [
  {
    header: 'User ID',
    id: 'user-id',
    cell: ({ row }) => {
      const userId = row.original.id;

      return (
        <Link className={'hover:underline'} href={`/admin/users/${userId}`}>
          {userId}
        </Link>
      );
    },
  },
  {
    header: 'Email',
    id: 'email',
    accessorKey: 'email',
  },
  {
    header: 'Email Verified',
    id: 'email-verified',
    accessorKey: 'emailVerified',
  },
  {
    header: 'Phone Number',
    id: 'phone-number',
    accessorKey: 'phoneNumber',
  },
  {
    header: 'Name',
    id: 'name',
    accessorKey: 'displayName',
  },
  {
    header: 'Role',
    cell: ({ row }) => {
      return (
        <div className={'inline-flex'}>
          <RoleBadge role={row.original.role} />
        </div>
      );
    },
  },
  {
    header: 'Status',
    id: 'status',
    cell: ({ row }) => {
      const { disabled } = row.original;
      const color = disabled ? 'error' : 'success';
      const label = disabled ? 'Disabled' : 'Active';

      return (
        <div className={'inline-flex'}>
          <Badge size={'small'} color={color}>
            {label}
          </Badge>
        </div>
      );
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const membership = row.original;
      const userId = membership.id;
      const disabled = membership.disabled;

      const displayName =
        membership.displayName ||
        membership.email ||
        membership.phoneNumber ||
        membership.id;

      return (
        <div className={'flex'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/users/${userId}`}>View User</Link>
              </DropdownMenuItem>

              <If condition={!disabled}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ImpersonateUserModal
                    userId={userId}
                    displayName={displayName}
                  >
                    Impersonate
                  </ImpersonateUserModal>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DisableUserModal userId={userId} displayName={displayName}>
                    <span className={'text-red-500'}>Disable</span>
                  </DisableUserModal>
                </DropdownMenuItem>
              </If>

              <If condition={disabled}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ReactivateUserModal
                    userId={userId}
                    displayName={displayName}
                  >
                    Reactivate
                  </ReactivateUserModal>
                </DropdownMenuItem>
              </If>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function OrganizationsMembersTable({ members }: { members: Data[] }) {
  return (
    <DataTable
      columns={columns}
      data={members}
      tableProps={{
        'data-cy': 'admin-organization-members-table',
      }}
    />
  );
}

export default OrganizationsMembersTable;
