import React from 'react';
import { CheckCircle2, Clock, Utensils, ShoppingBag, Phone, Sparkles } from 'lucide-react';
import { ActiveOrder, OrderStatus } from '../../types/order';
import { formatCurrency } from '../../utils/formatCurrency';
import { RESTAURANT_INFO } from '../../config/restaurant';

interface OrderStatusTimelineProps {
  order: ActiveOrder;
}

interface StageConfig {
  status: OrderStatus;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: StageConfig[] = [
  {
    status: 'placed',
    title: 'Order Placed',
    desc: 'Order received by restaurant',
    icon: ShoppingBag,
  },
  {
    status: 'confirmed',
    title: 'Confirmed',
    desc: 'Accepted by kitchen',
    icon: CheckCircle2,
  },
  {
    status: 'preparing',
    title: 'Preparing',
    desc: 'Handcrafted fresh without heat',
    icon: Sparkles,
  },
  {
    status: 'ready',
    title: 'Ready',
    desc: 'Plated or packaged for pickup',
    icon: Utensils,
  },
  {
    status: 'completed',
    title: 'Completed',
    desc: 'Served or delivered',
    icon: CheckCircle2,
  },
];

export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const currentStageIndex = STAGES.findIndex((s) => s.status === order.status);
  const activeIndex = currentStageIndex >= 0 ? currentStageIndex : 1; // default confirmed

  return (
    <div className="bg-padayal-surface rounded-3xl p-6 sm:p-8 shadow-organic border border-padayal-bg space-y-6 max-w-2xl mx-auto">
      
      {/* Order Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-padayal-bg">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-extrabold text-xl text-padayal-text">{order.orderNumber}</span>
            <span className="px-3 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold capitalize">
              {order.orderType} {order.customer.tableNumber ? `(Table ${order.customer.tableNumber})` : ''}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-padayal-bg text-padayal-muted text-xs font-medium">
              {order.paymentMethod.toUpperCase()} Paid
            </span>
          </div>
          <p className="text-xs text-padayal-muted mt-1.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-padayal-bg border border-padayal-secondary/20">
          <Clock className="w-4 h-4 text-padayal-cta" />
          <span className="text-xs font-bold text-padayal-text capitalize">
            Status: {order.status}
          </span>
        </div>
      </div>

      {/* 5-Stage Timeline */}
      <div className="py-2">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {STAGES.map((stage, index) => {
            const isCompleted = index <= activeIndex;
            const isCurrent = index === activeIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.status} className="flex flex-col items-center text-center">
                <div 
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 mb-2 ${
                    isCurrent
                      ? 'bg-padayal-cta text-white ring-4 ring-padayal-cta/20 shadow-md scale-105'
                      : isCompleted
                      ? 'bg-padayal-primary text-white shadow-sm'
                      : 'bg-padayal-bg text-padayal-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className={`text-[11px] sm:text-xs font-bold line-clamp-1 ${
                  isCompleted ? 'text-padayal-text' : 'text-padayal-muted'
                }`}>
                  {stage.title}
                </span>
                <span className="hidden md:block text-[10px] text-padayal-muted mt-0.5 leading-tight">
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
          Ordered Dishes ({order.items.length})
        </h4>
        <div className="space-y-2">
          {order.items.map((ci) => (
            <div key={ci.cartItemId} className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-padayal-primary text-xs bg-padayal-bg px-2 py-0.5 rounded">
                  {ci.quantity}x
                </span>
                <span className="font-medium text-padayal-text">{ci.item.name}</span>
                {ci.customization.portion && (
                  <span className="text-[11px] text-padayal-muted">({ci.customization.portion.name})</span>
                )}
              </div>
              <span className="font-semibold text-padayal-text">{formatCurrency(ci.itemTotal)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-padayal-bg flex justify-between items-center text-sm sm:text-base font-extrabold text-padayal-text">
          <span>Amount Paid</span>
          <span className="text-padayal-cta">{formatCurrency(order.bill.grandTotal)}</span>
        </div>
      </div>

      {/* Delivery / Table summary details */}
      {order.customer.deliveryAddress && (
        <div className="p-3.5 rounded-xl bg-padayal-bg text-xs space-y-1">
          <p className="font-semibold text-padayal-text">Delivery Destination:</p>
          <p className="text-padayal-muted">{order.customer.deliveryAddress}</p>
          {order.customer.landmark && (
            <p className="text-padayal-muted text-[11px]">Landmark: {order.customer.landmark}</p>
          )}
        </div>
      )}

      {/* Contact actions */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-padayal-bg text-padayal-text font-bold text-xs hover:bg-padayal-secondary-light transition-colors border border-padayal-bg"
        >
          <Phone className="w-4 h-4 text-padayal-primary" />
          Call Kitchen Front Desk
        </a>
        <a
          href={RESTAURANT_INFO.whatsappChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-bold text-xs hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/30"
        >
          WhatsApp Updates
        </a>
      </div>

    </div>
  );
}
