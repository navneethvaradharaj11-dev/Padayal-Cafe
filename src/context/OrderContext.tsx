import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActiveOrder, OrderStatus, CustomerDetails, PaymentMethod } from '../types/order';
import { CartItem, OrderType, BillBreakdown } from '../types/cart';

interface OrderContextType {
  activeOrders: ActiveOrder[];
  latestOrder: ActiveOrder | null;
  placeOrder: (
    items: CartItem[],
    orderType: OrderType,
    bill: BillBreakdown,
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ) => ActiveOrder;
  getOrderById: (orderId: string) => ActiveOrder | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'padayal_orders_state_v1';

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

  // Simulate real-time kitchen order progression
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === 'delivered') return order;

          const now = Date.now();
          const created = new Date(order.createdAt).getTime();
          const elapsedSeconds = (now - created) / 1000;

          let newStatus: OrderStatus = order.status;
          if (elapsedSeconds > 45) {
            newStatus = 'delivered';
          } else if (elapsedSeconds > 30) {
            newStatus = 'ready';
          } else if (elapsedSeconds > 10) {
            newStatus = 'cooking';
          }

          return newStatus !== order.status ? { ...order, status: newStatus } : order;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const placeOrder = (
    items: CartItem[],
    orderType: OrderType,
    bill: BillBreakdown,
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ): ActiveOrder => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: ActiveOrder = {
      orderId: `ord_${Date.now()}_${orderNum}`,
      orderNumber: `#PAD-${orderNum}`,
      createdAt: new Date().toISOString(),
      orderType,
      status: 'confirmed',
      items: [...items],
      bill: { ...bill },
      customer: { ...customer },
      paymentMethod,
      isPaid: true,
      estimatedTimeMinutes: orderType === 'delivery' ? 30 : 15,
    };

    setActiveOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return activeOrders.find((o) => o.orderId === orderId);
  };

  const latestOrder = activeOrders.length > 0 ? activeOrders[0] : null;

  return (
    <OrderContext.Provider
      value={{
        activeOrders,
        latestOrder,
        placeOrder,
        getOrderById,
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
