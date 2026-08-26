import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, DollarSign, ShieldCheck, CheckCircle2, MapPin, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { PaymentMethod } from '../types/order';
import { formatCurrency } from '../utils/formatCurrency';

export function CartCheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, orderType, tableNumber, deliveryAddress, bill, clearCart } = useCart();
  const { placeOrder } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-pranic text-2xl font-bold text-padayal-text mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-padayal-muted mb-6">Add delicious raw-vegan dishes before proceeding to checkout.</p>
        <Link to="/menu" className="btn-primary">Return to Menu</Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const created = placeOrder(
        cartItems,
        orderType,
        bill,
        { name, phone, tableNumber, deliveryAddress },
        paymentMethod
      );
      clearCart();
      setIsSubmitting(false);
      navigate(`/tracking?orderId=${created.orderId}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen py-12 bg-padayal-bg">
      <div className="container-custom max-w-4xl">
        <Link to="/menu" className="inline-flex items-center gap-1.5 text-xs font-bold text-padayal-primary mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>

        <h1 className="font-pranic text-3xl sm:text-4xl font-bold text-padayal-text mb-8">
          Checkout & Order Confirmation
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8">
          
          {/* Left 7 cols: Customer info & Payment method */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer Details Card */}
            <div className="bg-padayal-surface rounded-3xl p-6 shadow-organic border border-padayal-bg space-y-4">
              <h3 className="font-display text-sm font-bold text-padayal-text uppercase tracking-wider">
                1. Customer Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-padayal-muted mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navneeth V"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-padayal-muted mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                  />
                </div>
              </div>

              {orderType === 'dine-in' && (
                <div className="bg-padayal-secondary-light/60 p-3 rounded-xl border border-padayal-secondary/30 flex items-center gap-2 text-xs font-semibold text-padayal-primary">
                  <Utensils className="w-4 h-4 shrink-0" />
                  <span>Dine-In Table Number: <strong className="text-padayal-text text-sm">#{tableNumber}</strong></span>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="bg-padayal-bg p-3 rounded-xl border border-padayal-bg flex items-center gap-2 text-xs text-padayal-text">
                  <MapPin className="w-4 h-4 text-padayal-cta shrink-0" />
                  <span>Delivery Address: {deliveryAddress || 'Coimbatore Central'}</span>
                </div>
              )}
            </div>

            {/* Payment Method Card */}
            <div className="bg-padayal-surface rounded-3xl p-6 shadow-organic border border-padayal-bg space-y-4">
              <h3 className="font-display text-sm font-bold text-padayal-text uppercase tracking-wider">
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'upi', name: 'Google Pay / PhonePe / UPI', icon: Smartphone },
                  { id: 'apple_pay', name: 'Apple Pay / GPay', icon: Smartphone },
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'cash', name: 'Cash on Delivery / Service', icon: DollarSign },
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'border-padayal-cta bg-padayal-cta/5 ring-2 ring-padayal-cta/20 text-padayal-text'
                          : 'border-padayal-bg hover:border-padayal-secondary/30 text-padayal-muted'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-padayal-cta' : 'text-padayal-muted'}`} />
                      <span className="text-xs font-bold leading-tight">{pm.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs text-padayal-muted pt-2">
                <ShieldCheck className="w-4 h-4 text-padayal-primary" />
                <span>256-bit Encrypted Safe Checkout Simulation</span>
              </div>
            </div>

          </div>

          {/* Right 5 cols: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-padayal-surface rounded-3xl p-6 shadow-organic border border-padayal-bg space-y-4 sticky top-24">
              <h3 className="font-display text-sm font-bold text-padayal-text uppercase tracking-wider border-b border-padayal-bg pb-3">
                Order Summary ({cartItems.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((ci) => (
                  <div key={ci.cartItemId} className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-padayal-text">{ci.quantity}x {ci.item.name}</span>
                      {ci.customization.portion && (
                        <p className="text-[10px] text-padayal-muted">{ci.customization.portion.name}</p>
                      )}
                    </div>
                    <span className="font-bold text-padayal-text">{formatCurrency(ci.itemTotal)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-padayal-muted pt-4 border-t border-padayal-bg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-padayal-text">{formatCurrency(bill.subtotal)}</span>
                </div>
                {bill.discountAmount > 0 && (
                  <div className="flex justify-between text-padayal-primary font-semibold">
                    <span>Promo Discount</span>
                    <span>-{formatCurrency(bill.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>{formatCurrency(bill.gstAmount)}</span>
                </div>
                {bill.tipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Staff Tip</span>
                    <span>{formatCurrency(bill.tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-extrabold text-padayal-text pt-3 border-t border-padayal-bg">
                  <span>Grand Total</span>
                  <span className="text-padayal-cta">{formatCurrency(bill.grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-padayal-cta text-padayal-surface font-extrabold text-sm hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Pay {formatCurrency(bill.grandTotal)} & Place Order</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
