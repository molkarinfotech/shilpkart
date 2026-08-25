export const MARKETPLACE_COMMISSION_RATE = 0.30;

export function calculateCommission(amount: number) {
  return {
    commission: Math.round(amount * MARKETPLACE_COMMISSION_RATE * 100),
    sellerAmount: Math.round(amount * (1 - MARKETPLACE_COMMISSION_RATE) * 100),
  };
}
