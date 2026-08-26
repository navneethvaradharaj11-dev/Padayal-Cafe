import { useState, useEffect } from 'react';
import { CheckCircle2, ChefHat, Bike, Utensils, Phone, FileText, Clock } from 'lucide-react';
import { ActiveOrder, OrderStatus } from '../../types/order';
import { formatCurrency } from '../../utils/formatCurrency';

interface OrderStatusTimelineProps {
  order: ActiveOrder;
}

const STAGES: { status: OrderStatus; title: string; desc: string; icon: any }[] = [
  {
    status: 'confirmed',
    title: 'Order Confirmed',
    desc: 'Order received & sent to kitchen',
    icon: CheckCircle2,
  },
  {
    status: 'cooking',
    title: 'In the Kitchen',
    desc: 'Freshly prepping live sprouts & juices',
    icon: ChefHat,
  },
  {
    status: 'ready',
    title: 'Ready / On the Way',
    desc: 'Food is plated & ready for service',
    icon: Bike,
  },
  {
    status: 'delivered',
    title: 'Served / Delivered',
    desc: 'Enjoy your pranic raw meal!',
    icon: Utensils,
  },
];

export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(order.estimatedTimeMinutes * 60);

  useEffect(() => {
    if (order.status === 'delivered') return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [order.status]);

  const minutesLeft = Math.floor(secondsRemaining / 60);
  const secondsLeft = secondsRemaining % 60;

  const currentStageIndex = STAGES.findIndex((s) => s.status === order.status);

  return (
    <div className="bg-padayal-surface rounded-3xl p-6 shadow-organic border border-padayal-bg space-y-6">
      
      {/* Order Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-padayal-bg">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-padayal-text">{order.orderNumber}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold capitalize">
              {order.orderType} {order.customer.tableNumber ? `(Table ${order.customer.tableNumber})` : ''}
            </span>
          </div>
          <p className="text-xs text-padayal-muted mt-1">
            Placed on {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Live Countdown Timer */}
        {order.status !== 'delivered' ? (
          <div className="flex items-center gap-3 bg-padayal-bg/80 px-4 py-2 rounded-2xl border border-padayal-secondary/20">
            <Clock className="w-5 h-5 text-padayal-cta animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-bold text-padayal-muted tracking-wider block">Est. Prep Time</span>
              <span className="text-base font-extrabold text-padayal-text">
                {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft} mins
              </span>
            </div>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-100 text-green-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" /> Order Completed
          </span>
        )}
      </div>

      {/* 4-Stage Progress Timeline */}
      <div className="relative py-2">
        <div className="grid grid-cols-4 gap-2">
          {STAGES.map((stage, index) => {
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.status} className="flex flex-col items-center text-center group">
                <div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 mb-2 ${
                    isCurrent
                      ? 'bg-padayal-cta text-white ring-4 ring-padayal-cta/20 shadow-md scale-110'
                      : isCompleted
                      ? 'bg-padayal-primary text-white shadow-sm'
                      : 'bg-padayal-bg text-padayal-muted'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className={`text-xs font-bold line-clamp-1 ${
                  isCompleted ? 'text-padayal-text' : 'text-padayal-muted'
                }`}>
                  {stage.title}
                </span>
                <span className="hidden sm:block text-[10px] text-padayal-muted mt-0.5 line-clamp-1">
                  {stage.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="pt-4 border-t border-padayal-bg space-y-3">
        <h4 className="font-display text-xs font-bold text-padayal-muted uppercase tracking-wider">
          Ordered Items ({order.items.length})
        </h4>
        <div className="space-y-2">
          {order.items.map((ci) => (
            <div key={ci.cartItemId} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-padayal-primary text-xs bg-padayal-bg px-2 py-0.5 rounded">
                  {ci.quantity}x
                </span>
                <span className="font-medium text-padayal-text">{ci.item.name}</span>
              </div>
              <span className="font-semibold text-padayal-text">{formatCurrency(ci.itemTotal)}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-padayal-bg flex justify-between items-center text-sm font-extrabold text-padayal-text">
          <span>Total Paid</span>
          <span className="text-padayal-cta">{formatCurrency(order.bill.grandTotal)}</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="pt-2 flex flex-wrap gap-3">
        <a
          href="tel:+919876543210"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-padayal-bg text-padayal-text font-semibold text-xs hover:bg-padayal-secondary-light transition-colors"
        >
          <Phone className="w-4 h-4 text-padayal-primary" />
          Call Restaurant
        </a>
        <button
          type="button"
          onClick={() => alert(`Receipt #${order.orderNumber}\nTotal: ${formatCurrency(order.bill.grandTotal)}\nThank you for dining with Padayal!`)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-padayal-bg text-padayal-text font-semibold text-xs hover:bg-padayal-bg transition-colors"
        >
          <FileText className="w-4 h-4 text-padayal-cta" />
          Digital Receipt
        </button>
      </div>

    </div>
  );
}
