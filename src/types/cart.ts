import { MenuItem, PortionOption, AddOnOption } from './menu';

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface SelectedCustomization {
  portion?: PortionOption;
  selectedAddOns: AddOnOption[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique ID incorporating item + customizations
  item: MenuItem;
  quantity: number;
  customization: SelectedCustomization;
  unitPrice: number; // base price + portion + add-ons
  itemTotal: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10% or 50 for ₹50
  minOrderValue?: number;
  description: string;
}

export interface BillBreakdown {
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  gstAmount: number;
  tipAmount: number;
  grandTotal: number;
}
