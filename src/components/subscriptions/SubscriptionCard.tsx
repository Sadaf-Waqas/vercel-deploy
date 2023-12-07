import React, { useMemo } from 'react';
import { Trans } from 'next-i18next';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';

import Heading from '~/core/ui/Heading';
import PricingTable from '~/components/PricingTable';
import SubscriptionStatusBadge from '~/components/subscriptions/SubscriptionStatusBadge';
import SubscriptionStatusAlert from '~/components/subscriptions/SubscriptionStatusAlert';

import configuration from '~/configuration';
import If from '~/core/ui/If';

const SubscriptionCard: React.FC<{
  subscription: OrganizationSubscription;
}> = ({ subscription }) => {
  const details = useSubscriptionDetails(subscription.priceId);
  const cancelAtPeriodEnd = subscription.cancelAtPeriodEnd;
  const isActive = subscription.status === 'active';

  const dates = useMemo(() => {
    return {
      endDate: getDateFromSeconds(subscription.periodEndsAt),
      trialEndDate: getDateFromSeconds(subscription.trialEndsAt),
    };
  }, [subscription]);

  if (!details) {
    return null;
  }

  return (
    <div
      className={'flex flex-col space-y-6'}
      data-cy={'subscription-card'}
      data-cy-status={subscription.status}
    >
      <div className={'flex flex-col space-y-2'}>
        <div className={'flex items-center space-x-4'}>
          <Heading type={3}>
            <span data-cy={'subscription-name'}>{details.product.name}</span>
          </Heading>

          <SubscriptionStatusBadge subscription={subscription} />
        </div>

        <Heading type={6}>
          <span className={'text-gray-500 dark:text-gray-400'}>
            {details.product.description}
          </span>
        </Heading>
      </div>

      <div>
        <span className={'flex items-end'}>
          <PricingTable.Price>{details.plan.price}</PricingTable.Price>

          <span className={'lowercase text-gray-500 dark:text-gray-400'}>
            /{details.plan.name}
          </span>
        </span>
      </div>

      <SubscriptionStatusAlert subscription={subscription} values={dates} />

      <If condition={isActive}>
        <RenewStatusDescription
          dates={dates}
          cancelAtPeriodEnd={cancelAtPeriodEnd}
        />
      </If>
    </div>
  );
};

function RenewStatusDescription(
  props: React.PropsWithChildren<{
    cancelAtPeriodEnd: boolean;
    dates: {
      endDate: string;
      trialEndDate: string | null;
    };
  }>,
) {
  return (
    <span className={'flex items-center space-x-1.5 text-sm'}>
      <If condition={props.cancelAtPeriodEnd}>
        <XCircleIcon className={'h-5 text-yellow-500'} />

        <span>
          <Trans
            i18nKey={'subscription:cancelAtPeriodEndDescription'}
            values={props.dates}
          />
        </span>
      </If>

      <If condition={!props.cancelAtPeriodEnd}>
        <CheckCircleIcon className={'h-5 text-green-700'} />

        <span>
          <Trans
            i18nKey={'subscription:renewAtPeriodEndDescription'}
            values={props.dates}
          />
        </span>
      </If>
    </span>
  );
}

/**
 * @name getTestingProducts
 * @description These plans are added for testing-purposes only
 */
function getTestingProducts() {
  return [
    {
      name: 'Testing Plan',
      description: 'Description of your Testing plan',
      features: [],
      plans: [
        {
          price: '$999/year',
          name: 'Yearly',
          stripePriceId: 'price_1LFibmKr5l4rxPx3wWcSO8UY',
        },
      ],
    },
  ];
}

function useSubscriptionDetails(priceId: string) {
  for (const product of configuration.stripe.products) {
    for (const plan of product.plans) {
      if (plan.stripePriceId === priceId) {
        return { plan, product };
      }
    }
  }
}

function getDateFromSeconds(seconds: Maybe<number> | null) {
  if (!seconds) {
    return '';
  }

  const endDateMs = seconds * 1000;

  return new Date(endDateMs).toDateString();
}

export default SubscriptionCard;
