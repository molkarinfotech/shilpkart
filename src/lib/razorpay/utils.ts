import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const MARKETPLACE_COMMISSION_RATE = 0.30;

export async function createOrder(amount: number, orderId: string) {
  const commissionAmount = Math.round(amount * MARKETPLACE_COMMISSION_RATE);
  const sellerAmount = amount - commissionAmount;

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: orderId,
    notes: {
      orderId,
      commissionAmount: commissionAmount.toString(),
      sellerAmount: sellerAmount.toString(),
    },
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
}
