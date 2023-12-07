import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCallback } from 'react';

import {
  EllipsisHorizontalIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';

import type { ColumnDef } from '@tanstack/react-table';

import DataTable from '~/core/ui/DataTable';
import { Avatar, AvatarFallback, AvatarImage } from '~/core/ui/Avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import If from '~/core/ui/If';
import IconButton from '~/core/ui/IconButton';
import Badge from '~/core/ui/Badge';
import Button from '~/core/ui/Button';

import ImpersonateUserModal from '~/components/admin/users/ImpersonateUserModal';
import DisableUserModal from '~/components/admin/users/DisableUserModal';
import ReactivateUserModal from '~/components/admin/users/ReactivateUserModal';

type UserRow = {
  uid: string;
  email?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  disabled: boolean;
};

const columns: Array<ColumnDef<UserRow>> = [
  {
    header: '',
    id: 'avatar',
    size: 10,
    cell: ({ row }) => {
      const user = row.original;

      const { photoURL, displayName, email, phoneNumber } = user;
      const displayText = displayName || email || phoneNumber || '';

      return (
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              {photoURL ? <AvatarImage src={photoURL} /> : null}
              <AvatarFallback>{displayText[0]}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>

          <TooltipContent>{displayText}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: 'ID',
    id: 'id',
    cell: ({ row }) => {
      const id = row.original.uid;
      const href = {
        pathname: `/admin/users/[id]`,
        query: {
          id,
        },
      };

      return (
        <Link className={'hover:underline'} href={href}>
          {id}
        </Link>
      );
    },
  },
  {
    header: 'Email',
    id: 'email',
    cell: ({ row }) => {
      const email = row.original.email ?? '-';

      return (
        <span title={email} className={'truncate max-w-full block'}>
          {email}
        </span>
      );
    },
  },
  {
    header: 'Name',
    size: 50,
    id: 'displayName',
    cell: ({ row }) => {
      return row.original.displayName ?? '';
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
    header: '',
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      const displayName =
        user.displayName || user.email || user.phoneNumber || user.uid;

      return (
        <div className={'flex justify-end'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.uid)}
              >
                Copy user ID
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/admin/users/${user.uid}`}>View user</Link>
              </DropdownMenuItem>

              <If condition={!user.disabled}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ImpersonateUserModal
                    userId={user.uid}
                    displayName={displayName}
                  >
                    Impersonate
                  </ImpersonateUserModal>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DisableUserModal userId={user.uid} displayName={displayName}>
                    <span className={'text-red-500'}>Disable</span>
                  </DisableUserModal>
                </DropdownMenuItem>
              </If>

              <If condition={user.disabled}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ReactivateUserModal
                    userId={user.uid}
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

function UsersTable({
  users,
  pageToken,
}: React.PropsWithChildren<{
  users: UserRow[];
  pageToken: Maybe<string>;
}>) {
  const router = useRouter();
  const canGoBack = router.query.pageToken;

  const onChange = useCallback(
    (queryParams: { pageToken?: Maybe<string> }) => {
      return router.replace({
        pathname: '/admin/users',
        query: queryParams,
      });
    },
    [router],
  );

  return (
    <div className={'flex flex-col space-y-4'}>
      <DataTable
        data={users}
        columns={columns}
        tableProps={{
          'data-cy': 'admin-users-table',
        }}
      />

      <div className={'flex justify-end space-x-2.5'}>
        <If condition={canGoBack}>
          <Button onClick={() => onChange({})} size={'small'} variant={'ghost'}>
            <span className={'flex space-x-2.5 items-center'}>
              <ChevronLeftIcon className={'h-3'} />
              <span>Back to first page</span>
            </span>
          </Button>
        </If>

        <If condition={pageToken}>
          <Button
            onClick={() => onChange({ pageToken })}
            size={'small'}
            variant={'link'}
          >
            <span className={'flex space-x-2.5 items-center'}>
              <span>Next page</span>
              <ChevronRightIcon className={'h-3'} />
            </span>
          </Button>
        </If>
      </div>
    </div>
  );
}

export default UsersTable;
