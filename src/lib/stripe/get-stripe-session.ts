import { getStripeInstance } from '~/core/stripe/get-stripe';

export async function getStripeSession(sessionId: string) {
  const stripe = await getStripeInstance();

  return stripe.checkout.sessions.retrieve(sessionId);
}
