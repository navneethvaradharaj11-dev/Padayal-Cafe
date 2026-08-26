import { CartItem, OrderType, BillBreakdown } from './cart';

export type OrderStatus = 'confirmed' | 'cooking' | 'ready' | 'delivered';

export type PaymentMethod = 'upi' | 'apple_pay' | 'card' | 'cash';

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  tableNumber?: string;
  deliveryAddress?: string;
}

export interface ActiveOrder {
  orderId: string;
  orderNumber: string; // e.g. #PAD-8492
  createdAt: string;
  orderType: OrderType;
  status: OrderStatus;
  items: CartItem[];
  bill: BillBreakdown;
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  estimatedTimeMinutes: number;
}
