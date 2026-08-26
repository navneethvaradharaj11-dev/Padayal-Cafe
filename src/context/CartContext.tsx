import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, PortionOption, AddOnOption } from '../types/menu';
import { CartItem, OrderType, PromoCode, SelectedCustomization, BillBreakdown } from '../types/cart';
import { calculateCartTotals } from '../utils/calculateCartTotals';
import { AVAILABLE_PROMO_CODES } from '../config/restaurant';

interface CartContextType {
  cartItems: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  deliveryAddress: string;
  promoCode: PromoCode | null;
  promoError: string | null;
  tipPercentage: number;
  isCartOpen: boolean;
  customizingItem: MenuItem | null;
  bill: BillBreakdown;
  itemCount: number;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCustomizer: (item: MenuItem) => void;
  closeCustomizer: () => void;
  
  addCustomizedItem: (item: MenuItem, quantity: number, customization: SelectedCustomization) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeItem: (cartItemId: string) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setTipPercentage: (pct: number) => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (num: string) => void;
  setDeliveryAddress: (addr: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'padayal_cart_state_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved).cartItems || [] : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState<string>('4');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ cartItems, orderType, tableNumber }));
    } catch (err) {
      console.error('Failed saving cart to localStorage', err);
    }
  }, [cartItems, orderType, tableNumber]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openCustomizer = (item: MenuItem) => setCustomizingItem(item);
  const closeCustomizer = () => setCustomizingItem(null);

  const addCustomizedItem = (item: MenuItem, quantity: number, customization: SelectedCustomization) => {
    const portionPrice = customization.portion?.priceModifier || 0;
    const addOnsPrice = customization.selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const unitPrice = item.price + portionPrice + addOnsPrice;

    // Generate unique ID based on item + customizations
    const customizationSig = `${item.id}-${customization.portion?.id || 'std'}-${customization.selectedAddOns.map(a => a.id).sort().join('-')}-${customization.specialInstructions || ''}`;
    
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === customizationSig);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: unitPrice * newQty,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: customizationSig,
          item,
          quantity,
          customization,
          unitPrice,
          itemTotal: unitPrice * quantity,
        },
      ];
    });

    closeCustomizer();
    openCart();
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.cartItemId === cartItemId
          ? { ...ci, quantity: newQuantity, itemTotal: ci.unitPrice * newQuantity }
          : ci
      )
    );
  };

  const removeItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const applyPromoCode = (codeInput: string): boolean => {
    const codeKey = codeInput.trim().toUpperCase();
    const found = AVAILABLE_PROMO_CODES[codeKey];
    const currentSubtotal = cartItems.reduce((acc, ci) => acc + ci.itemTotal, 0);

    if (!found) {
      setPromoError('Invalid promo code. Try PADAYAL10 or PRANIC20');
      return false;
    }
    if (found.minOrderValue && currentSubtotal < found.minOrderValue) {
      setPromoError(`Minimum order value ₹${found.minOrderValue} required for ${codeKey}`);
      return false;
    }

    setPromoCode(found);
    setPromoError(null);
    return true;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoError(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
    setPromoError(null);
  };

  const bill = calculateCartTotals(cartItems, orderType, promoCode, tipPercentage);
  const itemCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderType,
        tableNumber,
        deliveryAddress,
        promoCode,
        promoError,
        tipPercentage,
        isCartOpen,
        customizingItem,
        bill,
        itemCount,
        openCart,
        closeCart,
        toggleCart,
        openCustomizer,
        closeCustomizer,
        addCustomizedItem,
        updateQuantity,
        removeItem,
        applyPromoCode,
        removePromoCode,
        setTipPercentage,
        setOrderType,
        setTableNumber,
        setDeliveryAddress,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
