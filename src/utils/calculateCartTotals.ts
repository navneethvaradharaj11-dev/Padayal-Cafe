import { CartItem, OrderType, PromoCode, BillBreakdown } from '../types/cart';
import { RESTAURANT_INFO } from '../config/restaurant';

export function calculateCartTotals(
  items: CartItem[],
  orderType: OrderType,
  promoCode?: PromoCode | null,
  tipPercentage: number = 0
): BillBreakdown {
  const subtotal = items.reduce((acc, item) => acc + item.itemTotal, 0);

  let discountAmount = 0;
  if (promoCode && subtotal >= (promoCode.minOrderValue || 0)) {
    if (promoCode.discountType === 'percentage') {
      discountAmount = (subtotal * promoCode.value) / 100;
    } else {
      discountAmount = promoCode.value;
    }
  }
  discountAmount = Math.min(discountAmount, subtotal);

  const discountedSubtotal = subtotal - discountAmount;

  // Delivery fee rules
  let deliveryFee = 0;
  if (orderType === 'delivery' && items.length > 0) {
    deliveryFee = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold ? 0 : RESTAURANT_INFO.defaultDeliveryFee;
  }

  // 5% GST
  const gstAmount = (discountedSubtotal * RESTAURANT_INFO.gstPercentage) / 100;

  // Tip amount
  const tipAmount = (discountedSubtotal * tipPercentage) / 100;

  const grandTotal = Math.max(0, discountedSubtotal + deliveryFee + gstAmount + tipAmount);

  return {
    subtotal,
    discountAmount,
    deliveryFee,
    gstAmount,
    tipAmount,
    grandTotal,
  };
}
