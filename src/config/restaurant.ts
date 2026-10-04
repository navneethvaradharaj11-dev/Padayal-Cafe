import { PromoCode } from '../types/cart';

/**
 * Single Central Configuration Source for Padayal (No Oil No Boil)
 * Coimbatore, Tamil Nadu.
 * 
 * All restaurant metadata, contact info, operating hours, delivery rules,
 * social channels, and brand identifiers are defined here.
 * No hardcoding across individual pages.
 */

export interface RestaurantLocation {
  city: string;
  state: string;
  country: string;
  area: string;
  addressLine: string;
  fullAddress: string;
  landmark: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsEmbedUrl: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
  whatsapp: string;
}

export interface OperatingHours {
  days: string;
  breakfast?: string;
  lunch: string;
  dinner: string;
  allDay: string;
}

export interface FounderInfo {
  name: string;
  tamilName: string;
  title: string;
  bio: string;
  inspiration: string;
  recipesCount: string;
  image: string;
}

export interface RestaurantConfig {
  name: string;
  tamilName: string;
  tagline: string;
  tamilTagline: string;
  founder: FounderInfo;
  founderCredit: string;
  conceptShort: string;
  conceptFull: string;
  location: RestaurantLocation;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  displayWhatsapp: string;
  whatsappChatUrl: string;
  email: string;
  hours: OperatingHours[];
  displayHours: string;
  currencySymbol: string;
  currencyCode: string;
  gstPercentage: number;
  defaultDeliveryFee: number;
  freeDeliveryThreshold: number;
  social: SocialLinks;
  orderTypes: {
    dineIn: { enabled: boolean; label: string; description: string };
    takeaway: { enabled: boolean; label: string; description: string };
    delivery: { enabled: boolean; label: string; description: string };
  };
  tableCount: number;
}

export const RESTAURANT_INFO: RestaurantConfig = {
  name: 'Padayal',
  tamilName: 'படையல்',
  tagline: 'No Oil, No Boil — South Indian Natural Food',
  tamilTagline: 'எண்ணெய் இல்லா, அடுப்பில்லா இயற்கை உணவு',
  founder: {
    name: 'Padayal Sivakumar (R. Sivakumar)',
    tamilName: 'படையல் சிவகுமார்',
    title: 'Pioneer & Natural Food Innovator',
    bio: 'Guided by the wisdom of organic farming mentor G. Nammalvar and traditional nature-cure principles, Chef Padayal Sivakumar spent years developing the "No Oil, No Boil" culinary method. He reimagined over 2,500 authentic South Indian recipes using soaking, sprouted grains, stone-ground nut pastes, and fresh coconut milk — proving that traditional taste flourishes purely without fire or cooking oil.',
    inspiration: 'Nammalvar Ecological Movement & Traditional Tamil Food Heritage',
    recipesCount: '2,500+ Unboiled Recipes Created',
    image: '/logo.png',
  },
  founderCredit: 'Founded by Chef Padayal Sivakumar in Coimbatore',
  conceptShort: 'Uncooked, unboiled South Indian traditional dining celebrating live enzymes, cold-pressed coconut extracts, native herbs, and natural vitality.',
  conceptFull: 'Padayal is Coimbatore’s renowned pioneer of natural dining. We serve authentic South Indian meals, tiffin, soups, and traditional sweets made completely without cooking oil, refined sugar, or artificial heat — preserving nature’s vital prana and pure flavours as intended.',
  location: {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    area: 'Vadavalli / RS Puram',
    addressLine: 'Near Mullai Nagar, Vadavalli Road',
    fullAddress: 'Padayal No Oil No Boil Restaurant, Vadavalli Road, Coimbatore, Tamil Nadu 641041',
    landmark: 'Near Mullai Nagar Bus Stop',
    pincode: '641041',
    coordinates: {
      lat: 11.0168,
      lng: 76.9558,
    },
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62657.42441951599!2d76.9200!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  phone: '+919488200000',
  displayPhone: '+91 94882 00000 (Confirm with Front Desk)',
  whatsappNumber: '+919488200000',
  displayWhatsapp: '+91 94882 00000',
  whatsappChatUrl: 'https://wa.me/919488200000?text=Vanakkam%20Padayal!%20I%20would%20like%20to%20enquire%20about%20your%20No%20Oil%20No%20Boil%20menu',
  email: 'contact@padayalnatural.com',
  hours: [
    {
      days: 'Monday - Sunday',
      breakfast: '7:30 AM - 10:30 AM',
      lunch: '12:00 PM - 3:30 PM',
      dinner: '6:30 PM - 9:30 PM',
      allDay: '7:30 AM - 9:30 PM',
    },
  ],
  displayHours: 'All Days: 7:30 AM - 9:30 PM',
  currencySymbol: '₹',
  currencyCode: 'INR',
  gstPercentage: 5,
  defaultDeliveryFee: 40,
  freeDeliveryThreshold: 500,
  social: {
    instagram: 'https://instagram.com/padayalnooilnoboil',
    facebook: 'https://facebook.com/padayalnooilnoboil',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/919488200000',
  },
  orderTypes: {
    dineIn: {
      enabled: true,
      label: 'Dine-In',
      description: 'Served fresh on traditional plantain leaf at your table',
    },
    takeaway: {
      enabled: true,
      label: 'Takeaway',
      description: 'Eco-friendly natural leaf & earthen packaging for pickup',
    },
    delivery: {
      enabled: true,
      label: 'Door Delivery',
      description: 'Delivered fresh within Coimbatore city limits',
    },
  },
  tableCount: 16,
};

export const AVAILABLE_PROMO_CODES: Record<string, PromoCode> = {
  PADAYAL10: {
    code: 'PADAYAL10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 200,
    description: '10% OFF on natural meal orders above ₹200',
  },
  NATURAL20: {
    code: 'NATURAL20',
    discountType: 'percentage',
    value: 20,
    minOrderValue: 400,
    description: '20% OFF on family feast orders above ₹400',
  },
  WELCOME50: {
    code: 'WELCOME50',
    discountType: 'fixed',
    value: 50,
    minOrderValue: 250,
    description: 'Flat ₹50 OFF on your first natural dining order',
  },
};
