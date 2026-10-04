import { CartItem, OrderType, BillBreakdown } from './cart';

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'cash';

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  tableNumber?: string;
  deliveryAddress?: string;
  landmark?: string;
  deliveryNotes?: string;
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
