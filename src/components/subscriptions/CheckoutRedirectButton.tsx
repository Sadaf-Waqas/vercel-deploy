import dynamic from 'next/dynamic';
import React, { FormEventHandler } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import classNames from 'clsx';
import useSWRMutation from 'swr/mutation';

import Button from '~/core/ui/Button';
import configuration from '~/configuration';
import { isBrowser } from '~/core/generic/is-browser';
import { useApiRequest } from '~/core/hooks/use-api';

const CHECKOUT_SESSION_API_ENDPOINT = configuration.paths.api.checkout;

const CSRFTokenInput = dynamic(() => import('./CsrfTokenInput'), {
  ssr: false,
});

const CheckoutRedirectButton: React.FCC<{
  stripePriceId?: string;
  recommended?: boolean;
  disabled?: boolean;
  organizationId: Maybe<string>;
  onCheckoutCreated?: (clientSecret: string) => void;
}> = ({ children, ...props }) => {
  const isEmbedded = configuration.stripe.embedded;
  const createCheckout = useCreateCheckout();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    if (isEmbedded) {
      e.preventDefault();
    }

    const data = new FormData(e.currentTarget);
    const body = Object.fromEntries(data.entries());
    const { clientSecret } = await createCheckout.trigger(body);

    if (props.onCheckoutCreated) {
      props.onCheckoutCreated(clientSecret);
    }
  };

  return (
    <form
      className={'w-full'}
      data-cy={'checkout-form'}
      action={CHECKOUT_SESSION_API_ENDPOINT}
      method="POST"
      onSubmit={isEmbedded ? onSubmit : undefined}
    >
      <CheckoutFormData
        organizationId={props.organizationId}
        priceId={props.stripePriceId}
      />

      <Button
        block
        className={classNames({
          'text-primary-foreground bg-primary': props.recommended,
        })}
        variant={props.recommended ? 'custom' : 'outline'}
        type="submit"
        disabled={props.disabled}
        loading={createCheckout.isMutating}
      >
        <span className={'flex items-center space-x-2'}>
          <span>{children}</span>

          <ArrowRightIcon className={'h-4'} />
        </span>
      </Button>
    </form>
  );
};

export default CheckoutRedirectButton;

function CheckoutFormData(
  props: React.PropsWithChildren<{
    organizationId: Maybe<string>;
    priceId: Maybe<string>;
  }>,
) {
  return (
    <>
      <CSRFTokenInput />

      <input
        type="hidden"
        name={'organizationId'}
        defaultValue={props.organizationId}
      />

      <input type="hidden" name={'returnUrl'} defaultValue={getReturnUrl()} />
      <input type="hidden" name={'priceId'} defaultValue={props.priceId} />
    </>
  );
}

function getReturnUrl() {
  return isBrowser()
    ? [window.location.origin, window.location.pathname].join('')
    : undefined;
}

function useCreateCheckout() {
  type CreateCheckoutResponse = {
    clientSecret: string;
  };

  const fetcher = useApiRequest<CreateCheckoutResponse, unknown>();

  return useSWRMutation(
    CHECKOUT_SESSION_API_ENDPOINT,
    (_, data: { arg: unknown }) => {
      return fetcher({
        method: 'POST',
        path: CHECKOUT_SESSION_API_ENDPOINT,
        body: data.arg,
      });
    },
  );
}
