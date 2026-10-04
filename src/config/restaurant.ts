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
    title: 'Chef & Natural Food Innovator',
    bio: 'Chef Padayal Sivakumar developed the "No Oil, No Boil" culinary approach in Coimbatore. His journey was influenced by his experiences with natural-farming practitioners and his association with the Vanagam Ecological Foundation. Over several years, he has developed a repertoire of more than 2,500 recipes exploring traditional South Indian flavours through methods such as soaking, sprouting, stone grinding, and coconut-milk emulsions.',
    inspiration: 'Association with Vanagam Ecological Foundation & Natural Farming Practices',
    recipesCount: '2,500+ Recipes Developed',
    image: '/images/founder.png',
  },
  founderCredit: 'Concept by Chef Padayal Sivakumar, Coimbatore',
  conceptShort: 'Padayal explores a No Oil, No Boil approach to food preparation, celebrating traditional South Indian flavours and natural ingredients.',
  conceptFull: 'Padayal is a unique restaurant in Coimbatore exploring the "No Oil, No Boil" culinary philosophy. Our kitchen prepares South Indian meals, tiffin, puttu, pachadi, and traditional refreshments using alternative food preparation methods such as soaking, cold-pressing, sprouting, and blending without conventional cooking oils.',
  location: {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    area: 'Singanallur',
    addressLine: 'Kamaraj Road, Backside of Thiyagi NGR School',
    fullAddress: 'Padayal No Oil No Boil Restaurant, Kamaraj Road, Singanallur, Coimbatore, Tamil Nadu 641005',
    landmark: 'Behind Thiyagi NGR School, Near Kamaraj Road',
    pincode: '641005',
    coordinates: {
      lat: 11.0028,
      lng: 77.0189,
    },
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Padayal+No+Oil+No+Boil+Restaurant+Singanallur+Coimbatore&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  phone: '+918220226662',
  displayPhone: '+91 82202 26662',
  whatsappNumber: '+918220226662',
  displayWhatsapp: '+91 82202 26662',
  whatsappChatUrl: 'https://wa.me/918220226662?text=Vanakkam%20Padayal!%20I%20would%20like%20to%20enquire%20about%20your%20No%20Oil%20No%20Boil%20menu',
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
    whatsapp: 'https://wa.me/918220226662',
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
