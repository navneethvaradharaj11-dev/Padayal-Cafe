import { PromoCode } from '../types/cart';

export const RESTAURANT_INFO = {
  name: 'Padayal',
  tagline: 'No Oil, No Boil Raw-Vegan Fine Dining',
  concept: '100% Live Enzymes, Pranic Energy, Fire-Free South Indian Gourmet',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'hello@padayal.org',
  address: '12 Organic Wellness Way, Race Course, Coimbatore, Tamil Nadu 641018',
  hours: 'Mon - Sun: 7:30 AM - 10:00 PM',
  currencySymbol: '₹',
  gstPercentage: 5, // 5% GST
  defaultDeliveryFee: 40,
  freeDeliveryThreshold: 500,
};

export const AVAILABLE_PROMO_CODES: Record<string, PromoCode> = {
  PADAYAL10: {
    code: 'PADAYAL10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 200,
    description: '10% OFF on orders above ₹200',
  },
  PRANIC20: {
    code: 'PRANIC20',
    discountType: 'percentage',
    value: 20,
    minOrderValue: 400,
    description: '20% OFF on orders above ₹400',
  },
  FIRSTRAW: {
    code: 'FIRSTRAW',
    discountType: 'fixed',
    value: 75,
    minOrderValue: 300,
    description: 'Flat ₹75 OFF on your first raw-vegan meal',
  },
};
