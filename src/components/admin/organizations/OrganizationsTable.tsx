import { useRouter } from 'next/router';
import Link from 'next/link';

import { useCallback } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

import DataTable from '~/core/ui/DataTable';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import IconButton from '~/core/ui/IconButton';
import SubscriptionStatusBadge from '~/components/subscriptions/SubscriptionStatusBadge';
import { Organization } from '~/lib/organizations/types/organization';
import { useFirestoreSnapshotPagination } from '~/core/hooks/use-firestore-snapshot-pagination';

import configuration from '~/configuration';

const EMPTY_ROW = <span>-</span>;

const columns: Array<ColumnDef<WithId<Organization>>> = [
  {
    header: 'ID',
    accessorKey: 'id',
    id: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
  },
  {
    header: 'Subscription',
    id: 'subscription',
    cell: ({ row }) => {
      const priceId = row.original.subscription?.priceId;

      const plan = configuration.stripe.products.find((product) => {
        return product.plans.some((plan) => plan.stripePriceId === priceId);
      });

      if (plan) {
        const price = plan.plans.find((plan) => plan.stripePriceId === priceId);

        if (!price) {
          return 'Unknown Price';
        }

        return `${plan.name} - ${price.name}`;
      }

      return EMPTY_ROW;
    },
  },
  {
    header: 'Subscription Status',
    id: 'subscription-status',
    cell: ({ row }) => {
      const subscription = row.original.subscription;

      if (!subscription) {
        return EMPTY_ROW;
      }

      return <SubscriptionStatusBadge subscription={subscription} />;
    },
  },
  {
    header: 'Subscription Period',
    id: 'subscription-period',
    cell: ({ row }) => {
      const subscription = row.original?.subscription;

      if (!subscription) {
        return EMPTY_ROW;
      }

      const canceled = subscription.cancelAtPeriodEnd;
      const date = subscription.periodEndsAt;
      const formattedDate = new Date(date * 1000).toLocaleDateString();

      return canceled ? (
        <span className={'text-orange-500'}>Stops on {formattedDate}</span>
      ) : (
        <span className={'text-green-500'}>Renews on {formattedDate}</span>
      );
    },
  },
  {
    header: 'Members',
    id: 'members',
    cell: ({ row }) => {
      const memberships = Object.keys(row.original.members).length;
      const id = row.original.id;

      return (
        <Link
          data-cy={'organization-members-link'}
          prefetch={false}
          href={`/admin/organizations/${id}/members`}
          className={'hover:underline cursor-pointer'}
        >
          {memberships} member{memberships === 1 ? '' : 's'}
        </Link>
      );
    },
  },
  {
    header: '',
    id: 'actions',
    cell: ({ row }) => {
      const organization = row.original;

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
                onClick={() => navigator.clipboard.writeText(organization.id)}
              >
                Copy ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function OrganizationsTable({
  organizations,
  pageIndex: currentPageIndex,
  pageSize,
  pageCount,
}: React.PropsWithChildren<{
  organizations: WithId<Organization>[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
}>) {
  const router = useRouter();

  const onChange = useCallback(
    (queryParams: {
      page: number;
      beforeSnapshot?: string;
      afterSnapshot?: string;
    }) => {
      return router.replace({
        pathname: '/admin/organizations',
        query: queryParams,
      });
    },
    [router],
  );

  const { onPaginationChange } = useFirestoreSnapshotPagination({
    pageIndex: currentPageIndex,
    onChange,
  });

  return (
    <DataTable
      onPaginationChange={({ pageIndex }) => {
        const index =
          currentPageIndex < pageIndex ? 0 : organizations.length - 1;

        const value = organizations[index].id;

        onPaginationChange({
          pageIndex,
          value,
        });
      }}
      pageIndex={currentPageIndex}
      pageCount={pageCount}
      pageSize={pageSize}
      data={organizations}
      columns={columns}
      tableProps={{
        'data-cy': 'admin-organizations-table',
      }}
    />
  );
}

export default OrganizationsTable;
