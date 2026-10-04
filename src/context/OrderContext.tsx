import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ActiveOrder, OrderStatus, CustomerDetails, PaymentMethod } from '../types/order';
import { CartItem, OrderType, BillBreakdown } from '../types/cart';
import { supabase } from '../lib/supabase';

interface OrderContextType {
  activeOrders: ActiveOrder[];
  latestOrder: ActiveOrder | null;
  placeOrder: (
    items: CartItem[],
    orderType: OrderType,
    bill: BillBreakdown,
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ) => Promise<ActiveOrder>;
  getOrderById: (orderId: string) => ActiveOrder | undefined;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'padayal_orders_state_v2';

export function OrderProvider({ children }: { children: ReactNode }) {
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) || [] : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activeOrders));
    } catch (err) {
      console.error('Failed saving orders to localStorage', err);
    }
  }, [activeOrders]);

  const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setActiveOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId || order.orderNumber === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  }, []);

  const placeOrder = async (
    items: CartItem[],
    orderType: OrderType,
    bill: BillBreakdown,
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ): Promise<ActiveOrder> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#PAD-${randomSuffix}`;
    const orderId = `ord_${Date.now()}_${randomSuffix}`;

    const newOrder: ActiveOrder = {
      orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      orderType,
      status: 'confirmed',
      items: [...items],
      bill: { ...bill },
      customer: { ...customer },
      paymentMethod,
      isPaid: true,
      estimatedTimeMinutes: orderType === 'delivery' ? 35 : orderType === 'takeaway' ? 20 : 15,
    };

    // Attempt to persist to Supabase orders table if configured, but never fail checkout if table doesn't exist
    try {
      await supabase.from('orders').insert([
        {
          id: orderId,
          order_number: orderNumber,
          order_type: orderType,
          status: 'confirmed',
          customer_name: customer.name,
          customer_phone: customer.phone,
          customer_email: customer.email || null,
          table_number: customer.tableNumber || null,
          delivery_address: customer.deliveryAddress || null,
          delivery_notes: customer.deliveryNotes || null,
          payment_method: paymentMethod,
          subtotal: bill.subtotal,
          discount_amount: bill.discountAmount,
          delivery_fee: bill.deliveryFee,
          gst_amount: bill.gstAmount,
          tip_amount: bill.tipAmount,
          grand_total: bill.grandTotal,
          items_json: items,
        },
      ]);
    } catch (dbError) {
      // Gracefully fall back to local state
      console.info('Order saved locally (Supabase orders table fallback):', dbError);
    }

    setActiveOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = useCallback((orderId: string) => {
    const cleaned = orderId.trim().toLowerCase();
    return activeOrders.find(
      (o) =>
        o.orderId.toLowerCase() === cleaned ||
        o.orderNumber.toLowerCase() === cleaned
    );
  }, [activeOrders]);

  const latestOrder = activeOrders.length > 0 ? activeOrders[0] : null;

  return (
    <OrderContext.Provider
      value={{
        activeOrders,
        latestOrder,
        placeOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
