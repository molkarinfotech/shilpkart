/**
 * Marketplace policy constants.
 *
 * Keep business rules in one place so the cart, checkout, and order API
 * stay in sync. Do not hardcode shipping thresholds or commission rates in
 * page components.
 */

/** INR amount above which shipping is free. */
export const FREE_SHIPPING_THRESHOLD_INR = 2500;

/** INR shipping cost for orders below the free threshold. */
export const STANDARD_SHIPPING_INR = 180;

/**
 * Marketplace commission rate applied to sales.
 *
 * This is the target rate; the current checkout records COD/pending demo
 * orders and does not yet apply commission at payment time.
 */
export const MARKETPLACE_COMMISSION_RATE = 0.3;

export function calculateShippingInRupees(subtotalInRupees: number) {
  return subtotalInRupees >= FREE_SHIPPING_THRESHOLD_INR
    ? 0
    : STANDARD_SHIPPING_INR;
}

export function calculateTotalInRupees(subtotalInRupees: number) {
  return subtotalInRupees + calculateShippingInRupees(subtotalInRupees);
}
