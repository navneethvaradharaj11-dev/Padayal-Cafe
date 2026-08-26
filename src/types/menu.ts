export type MenuCategory = 'all' | 'starters' | 'mains' | 'soups' | 'salads' | 'desserts' | 'beverages' | 'specials';

export type DietaryPreference = 'no-oil' | 'fire-free' | 'raw-vegan' | 'gluten-free' | 'chef-special';

export interface PortionOption {
  id: string;
  name: string; // e.g. 'Regular', 'Large'
  priceModifier: number; // e.g. 0, 60
}

export interface AddOnOption {
  id: string;
  name: string; // e.g. 'Extra Raw Coconut Dip', 'Organic Microgreens'
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  calories?: number;
  preparationTime?: number;
  protein?: number;
  imageUrl: string;
  isAvailable: boolean;
  isFeatured: boolean;
  dietaryTags: DietaryPreference[];
  healthBenefits?: string[];
  ingredients?: string[];
  portions?: PortionOption[];
  availableAddOns?: AddOnOption[];
}
