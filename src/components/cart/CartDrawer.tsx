import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, Tag, Utensils, ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { TipSelector } from './TipSelector';
import { formatCurrency } from '../../utils/formatCurrency';
import { OrderType } from '../../types/cart';

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    closeCart,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    deliveryAddress,
    setDeliveryAddress,
    updateQuantity,
    removeItem,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    bill,
    clearCart,
  } = useCart();

  const [codeInput, setCodeInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeInput.trim()) {
      applyPromoCode(codeInput);
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-padayal-text/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-padayal-surface shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-padayal-bg flex items-center justify-between bg-padayal-bg/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-padayal-cta" />
              <h2 className="font-pranic text-xl font-bold text-padayal-text">Your Organic Cart</h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-padayal-bg text-padayal-muted hover:text-padayal-text transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Type Selector */}
          <div className="p-4 border-b border-padayal-bg bg-padayal-surface space-y-3">
            <div className="grid grid-cols-3 gap-1 bg-padayal-bg p-1 rounded-xl">
              {(['dine-in', 'takeaway', 'delivery'] as OrderType[]).map((type) => {
                const isSelected = orderType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold capitalize transition-all ${
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

            {/* Contextual input based on order type */}
            {orderType === 'dine-in' && (
              <div className="flex items-center gap-2 bg-padayal-secondary-light/60 p-2.5 rounded-xl border border-padayal-secondary/30 text-xs">
                <Utensils className="w-4 h-4 text-padayal-primary shrink-0" />
                <span className="font-semibold text-padayal-primary">Table Number:</span>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-16 px-2 py-1 rounded bg-white text-center font-bold border border-padayal-primary/30 focus:outline-none focus:ring-1 focus:ring-padayal-primary"
                />
              </div>
            )}

            {orderType === 'delivery' && (
              <div className="space-y-1">
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter full delivery address..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                />
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-padayal-bg flex items-center justify-center mx-auto text-padayal-muted">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-pranic text-lg font-bold text-padayal-text">Your cart is empty</h3>
                <p className="text-xs text-padayal-muted max-w-xs mx-auto">
                  Explore our live enzyme dishes prepared without oil or fire.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cartItems.map((ci) => (
                <div key={ci.cartItemId} className="flex gap-3 p-3 rounded-2xl bg-padayal-bg/40 border border-padayal-bg">
                  <img
                    src={ci.item.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'}
                    alt={ci.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-semibold text-sm text-padayal-text truncate">{ci.item.name}</h4>
                      <button
                        type="button"
                        onClick={() => removeItem(ci.cartItemId)}
                        className="text-padayal-muted hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customizations detail */}
                    <div className="text-[11px] text-padayal-muted space-y-0.5 mt-0.5">
                      {ci.customization.portion && (
                        <span>Portion: {ci.customization.portion.name}</span>
                      )}
                      {ci.customization.selectedAddOns.length > 0 && (
                        <div className="truncate">
                          Add-ons: {ci.customization.selectedAddOns.map((a) => a.name).join(', ')}
                        </div>
                      )}
                      {ci.customization.specialInstructions && (
                        <p className="italic text-[10px] text-padayal-primary truncate">
                          "{ci.customization.specialInstructions}"
                        </p>
                      )}
                    </div>

                    {/* Quantity & Price row */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-padayal-surface rounded-lg px-2 py-1 border border-padayal-bg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.cartItemId, ci.quantity - 1)}
                          className="text-padayal-text hover:text-padayal-primary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-padayal-text w-4 text-center">{ci.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.cartItemId, ci.quantity + 1)}
                          className="text-padayal-text hover:text-padayal-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-padayal-text">
                        {formatCurrency(ci.itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Controls & Summary Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-padayal-bg bg-padayal-surface space-y-3">
              
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-padayal-secondary-light p-2.5 rounded-xl border border-padayal-secondary/30 text-xs">
                    <div className="flex items-center gap-1.5 text-padayal-primary font-bold">
                      <Tag className="w-4 h-4" />
                      <span>{promoCode.code} Applied</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. PADAYAL10)"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-padayal-bg bg-padayal-bg/50 uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-padayal-primary"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-padayal-primary text-padayal-surface rounded-xl text-xs font-bold hover:bg-padayal-primary-hover transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{promoError}</p>
                )}
              </div>

              {/* Tip Selector */}
              <TipSelector />

              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-padayal-muted pt-2 border-t border-padayal-bg">
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
                <div className="flex justify-between text-base font-extrabold text-padayal-text pt-2 border-t border-padayal-bg">
                  <span>Grand Total</span>
                  <span className="text-padayal-cta">{formatCurrency(bill.grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-padayal-cta text-padayal-surface font-bold text-sm hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span>•</span>
                <span>{formatCurrency(bill.grandTotal)}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
