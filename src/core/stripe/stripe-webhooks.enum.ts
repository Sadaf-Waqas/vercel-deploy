/**
 * @name StripeWebhooks
 * @description A list of Stripe webhooks topics. Add new webhooks here.
 */
export enum StripeWebhooks {
  AsyncPaymentSuccess = 'checkout.session.async_payment_succeeded',
  Completed = 'checkout.session.completed',
  AsyncPaymentFailed = 'checkout.session.async_payment_failed',
  SubscriptionDeleted = 'customer.subscription.deleted',
  SubscriptionUpdated = 'customer.subscription.updated',
}
