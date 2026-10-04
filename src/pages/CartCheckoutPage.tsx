import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, DollarSign, ShieldCheck, CheckCircle2, Utensils, ShoppingBag, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { PaymentMethod } from '../types/order';
import { OrderType } from '../types/cart';
import { formatCurrency } from '../utils/formatCurrency';
import { RESTAURANT_INFO } from '../config/restaurant';

export function CartCheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    deliveryAddress,
    setDeliveryAddress,
    bill,
    clearCart,
  } = useCart();
  const { placeOrder } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [pickupTime, setPickupTime] = useState('Standard (15-20 mins)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-padayal-bg flex items-center justify-center mb-4 text-padayal-muted">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h2 className="font-pranic text-2xl font-bold text-padayal-text mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-padayal-muted mb-6">
          Add fresh No Oil No Boil meals, soups, or herbal elixirs before proceeding to checkout.
        </p>
        <Link to="/menu" className="btn-primary">
          Return to Menu
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      setFormError('Please specify your table number.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your full delivery address in Coimbatore.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await placeOrder(
        cartItems,
        orderType,
        bill,
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
          deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
          landmark: landmark.trim() || undefined,
          deliveryNotes: orderType === 'delivery' ? deliveryNotes : `Pickup: ${pickupTime}`,
        },
        paymentMethod
      );

      clearCart();
      navigate(`/tracking?orderId=${created.orderId}`);
    } catch (err) {
      console.error('Order creation error:', err);
      setFormError('Unable to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-padayal-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-padayal-primary hover:text-padayal-primary-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Link>
          <span className="text-xs font-semibold text-padayal-muted">
            {RESTAURANT_INFO.location.city} Kitchen
          </span>
        </div>

        <div className="mb-8">
          <h1 className="font-pranic text-2xl sm:text-4xl font-extrabold text-padayal-text">
            Complete Your Order
          </h1>
          <p className="text-xs sm:text-sm text-padayal-muted mt-1">
            Handcrafted natural dining prepared with care and fresh ingredients.
          </p>
        </div>

        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2">
            <span>⚠️ {formError}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Order details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Order Type Selector */}
            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xs sm:text-sm font-bold text-padayal-text uppercase tracking-wider">
                  1. Fulfillment Type
                </h2>
                <span className="text-xs text-padayal-muted font-medium">Select how you'd like your order</span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-padayal-bg p-1.5 rounded-xl">
                {(['dine-in', 'takeaway', 'delivery'] as OrderType[]).map((type) => {
                  const isSelected = orderType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold capitalize transition-all ${
                        isSelected
                          ? 'bg-padayal-primary text-padayal-surface shadow-sm'
                          : 'text-padayal-muted hover:text-padayal-text'
                      }`}
                    >
                      {type.replace('-', ' ')}
                    </button>
                  );
                })}
              </div>

              {/* Dine-In specific options */}
              {orderType === 'dine-in' && (
                <div className="p-3.5 rounded-xl bg-padayal-secondary-light/70 border border-padayal-secondary/30 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-padayal-primary font-semibold">
                    <Utensils className="w-4 h-4 shrink-0" />
                    <span>Dine-In Table Number:</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Table #"
                    className="w-20 px-3 py-1.5 rounded-lg bg-white text-center font-bold border border-padayal-primary/30 focus:outline-none focus:ring-2 focus:ring-padayal-primary text-sm"
                  />
                </div>
              )}

              {/* Takeaway specific options */}
              {orderType === 'takeaway' && (
                <div className="p-3.5 rounded-xl bg-padayal-bg border border-padayal-bg text-xs space-y-2">
                  <div className="flex items-center gap-2 text-padayal-text font-semibold">
                    <Clock className="w-4 h-4 text-padayal-cta shrink-0" />
                    <span>Pickup Preference at {RESTAURANT_INFO.location.area}</span>
                  </div>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-padayal-bg font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-padayal-primary"
                  >
                    <option value="Standard (15-20 mins)">As soon as ready (15-20 mins)</option>
                    <option value="30 mins">In 30 minutes</option>
                    <option value="45 mins">In 45 minutes</option>
                    <option value="1 hour">In 1 hour</option>
                  </select>
                </div>
              )}

              {/* Delivery specific fields */}
              {orderType === 'delivery' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-padayal-muted mb-1">
                      Complete Street Address in Coimbatore *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Door No., Apartment/Street, Area (e.g. Vadavalli, RS Puram, Gandhipuram)"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-padayal-muted mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Near Temple / School / Signal"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-padayal-muted mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ring bell / Leave at door / Call on arrival"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Customer Contact Info */}
            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-4">
              <h2 className="font-display text-xs sm:text-sm font-bold text-padayal-text uppercase tracking-wider">
                2. Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-padayal-muted mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-padayal-muted mb-1">
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-padayal-muted mb-1">
                  Email Address (For digital bill)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-4">
              <h2 className="font-display text-xs sm:text-sm font-bold text-padayal-text uppercase tracking-wider">
                3. Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'upi', name: 'UPI (GPay / PhonePe / Paytm)', icon: Smartphone, desc: 'Instant UPI QR' },
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa / Mastercard / RuPay' },
                  { id: 'cash', name: 'Pay at Counter / Cash', icon: DollarSign, desc: 'Cash on delivery / dining' },
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'border-padayal-cta bg-padayal-cta/5 ring-2 ring-padayal-cta/20 text-padayal-text'
                          : 'border-padayal-bg hover:border-padayal-secondary/30 text-padayal-muted'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-padayal-cta' : 'text-padayal-muted'}`} />
                      <div>
                        <span className="text-xs font-bold block leading-tight text-padayal-text">{pm.name}</span>
                        <span className="text-[10px] text-padayal-muted">{pm.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs text-padayal-muted pt-2 border-t border-padayal-bg">
                <ShieldCheck className="w-4 h-4 text-padayal-primary shrink-0" />
                <span>Zero convenience fee. Secure order confirmation directly with Padayal Coimbatore.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-4">
              <div className="flex items-center justify-between border-b border-padayal-bg pb-3">
                <h3 className="font-display text-xs sm:text-sm font-bold text-padayal-text uppercase tracking-wider">
                  Order Summary
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-padayal-bg text-padayal-primary">
                  {cartItems.length} items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((ci) => (
                  <div key={ci.cartItemId} className="flex justify-between items-start text-xs border-b border-padayal-bg/40 pb-2">
                    <div>
                      <span className="font-bold text-padayal-text">
                        {ci.quantity}x {ci.item.name}
                      </span>
                      {ci.customization.portion && (
                        <p className="text-[10px] text-padayal-muted">Portion: {ci.customization.portion.name}</p>
                      )}
                      {ci.customization.selectedAddOns.length > 0 && (
                        <p className="text-[10px] text-padayal-muted">
                          +{ci.customization.selectedAddOns.map((a) => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-padayal-text shrink-0">{formatCurrency(ci.itemTotal)}</span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-xs text-padayal-muted pt-2 border-t border-padayal-bg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-padayal-text">{formatCurrency(bill.subtotal)}</span>
                </div>
                {bill.discountAmount > 0 && (
                  <div className="flex justify-between text-padayal-primary font-semibold">
                    <span>Discount</span>
                    <span>-{formatCurrency(bill.discountAmount)}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{bill.deliveryFee === 0 ? 'FREE' : formatCurrency(bill.deliveryFee)}</span>
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
                  <span>Total Amount</span>
                  <span className="text-padayal-cta">{formatCurrency(bill.grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-padayal-cta text-padayal-surface font-extrabold text-sm sm:text-base hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm & Pay {formatCurrency(bill.grandTotal)}</span>
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
