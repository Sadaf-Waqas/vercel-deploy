import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { join } from 'path';

import logger from '~/core/logger';
import { HttpStatusCode } from '~/core/generic/http-status-code.enum';

import { withAuthedUser } from '~/core/middleware/with-authed-user';
import { withPipe } from '~/core/middleware/with-pipe';
import { withMethodsGuard } from '~/core/middleware/with-methods-guard';
import { getApiRefererPath } from '~/core/generic/get-api-referer-path';

import { createStripeCheckout } from '~/lib/stripe/create-checkout';
import { canChangeBilling } from '~/lib/organizations/permissions';
import withCsrf from '~/core/middleware/with-csrf';
import { getUserRoleByOrganization } from '~/lib/server/organizations/memberships';
import { getOrganizationById } from '~/lib/server/queries';

import configuration from '~/configuration';

const SUPPORTED_METHODS: HttpMethod[] = ['POST'];

async function checkoutsSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { headers, firebaseUser } = req;

  const bodyResult = getBodySchema().safeParse(req.body);
  const userId = firebaseUser.uid;
  const currentOrganizationId = req.cookies.organizationId;

  const redirectToErrorPage = () => {
    const referer = getApiRefererPath(headers);
    const url = join(referer, `?error=true`);

    return res.redirect(url);
  };

  if (!bodyResult.success) {
    return redirectToErrorPage();
  }

  const { organizationId, priceId, returnUrl } = bodyResult.data;
  const matchesSessionOrganizationId = currentOrganizationId === organizationId;

  if (!matchesSessionOrganizationId) {
    logger.error(
      `Organization ID mismatch: the organziation ID in the session does not match the organization ID in the request.`,
    );

    return redirectToErrorPage();
  }

  // we retrieve the customer ID from the organization
  const organization = await getOrganizationById(organizationId).then((doc) =>
    doc.data(),
  );

  if (!organization) {
    logger.error(
      {
        organizationId,
      },
      `Organization not found`,
    );

    return redirectToErrorPage();
  }

  const customerId = organization.customerId;

  if (customerId) {
    logger.info(
      {
        customerId,
      },
      `Organization has a customer ID}`,
    );
  }

  const plan = getPlanByPriceId(priceId);

  // check if the plan exists in the configuration.
  if (!plan) {
    console.warn(
      `Plan not found for price ID "${priceId}". Did you forget to add it to the configuration? If the Price ID is incorrect, the checkout will be rejected. Please check the Stripe dashboard`,
    );
  }

  // check the user's role has access to the checkout
  const canChangeBilling = await getUserCanAccessCheckout({
    organizationId,
    userId,
  });

  // disallow if the user doesn't have permissions to change
  // billing settings based on its role. To change the logic, please update
  // {@link canChangeBilling}
  if (!canChangeBilling) {
    logger.debug(
      {
        userId,
        organizationId,
      },
      `User attempted to access checkout but lacked permissions`,
    );

    return redirectToErrorPage();
  }

  try {
    const trialPeriodDays =
      plan && 'trialPeriodDays' in plan
        ? (plan.trialPeriodDays as number)
        : undefined;

    const customerEmail = firebaseUser.email;
    const embedded = configuration.stripe.embedded;

    const session = await createStripeCheckout({
      returnUrl,
      organizationId,
      priceId,
      customerId,
      trialPeriodDays,
      customerEmail,
      embedded,
    });

    logger.info(
      {
        id: session.id,
        organizationId,
      },
      `Created Stripe Checkout session`,
    );

    // if the checkout is embedded, we need to render the checkout
    // therefore, we send the clientSecret back to the client
    if (embedded) {
      logger.info(
        { id: session.id },
        `Using embedded checkout mode. Sending client secret back to client.`,
      );

      return res.json({
        clientSecret: session.client_secret,
      });
    }

    logger.info(
      { id: session.id },
      `Using hosted checkout mode. Redirecting user to Stripe Checkout.`,
    );

    if (!session.url) {
      logger.error(
        { id: session.id },
        `Stripe Checkout session URL is undefined.`,
      );

      return redirectToErrorPage();
    }

    // redirect user back based on the response
    res.redirect(HttpStatusCode.SeeOther, session.url);
  } catch (e) {
    logger.error(e, `Stripe Checkout error`);

    return redirectToErrorPage();
  }
}

export default withPipe(
  withCsrf((req) => req.body.csrfToken || req.headers['x-csrf-token']),
  withMethodsGuard(SUPPORTED_METHODS),
  withAuthedUser,
  checkoutsSessionHandler,
);

async function getUserCanAccessCheckout(params: {
  organizationId: string;
  userId: string;
}) {
  try {
    const userRole = await getUserRoleByOrganization(params);

    if (userRole === undefined) {
      return false;
    }

    return canChangeBilling(userRole);
  } catch (e) {
    logger.error(e, `Could not retrieve user role`);

    return false;
  }
}

function getBodySchema() {
  return z.object({
    organizationId: z.string().min(1),
    priceId: z.string().min(1),
    returnUrl: z.string().min(1),
    csrfToken: z.string().min(1).optional(),
  });
}

function getPlanByPriceId(priceId: string) {
  const products = configuration.stripe.products;

  type Plan = (typeof products)[0]['plans'][0];

  return products.reduce<Maybe<Plan>>((acc, product) => {
    if (acc) {
      return acc;
    }

    return product.plans.find(({ stripePriceId }) => stripePriceId === priceId);
  }, undefined);
}
