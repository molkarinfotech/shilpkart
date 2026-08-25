import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const MARKETPLACE_COMMISSION_RATE = 0.30;

export async function createPaymentIntent(amount: number, orderId: string) {
  const commissionAmount = Math.round(amount * MARKETPLACE_COMMISSION_RATE);
  const sellerAmount = amount - commissionAmount;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'inr',
    metadata: {
      orderId,
      commissionAmount: commissionAmount.toString(),
      sellerAmount: sellerAmount.toString(),
    },
    automatic_payment_methods: { enabled: true },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}
