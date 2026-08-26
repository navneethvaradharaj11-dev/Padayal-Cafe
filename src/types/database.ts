export type MenuCategory = 'starters' | 'mains' | 'soups' | 'salads' | 'desserts' | 'beverages' | 'specials';

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: MenuCategory;
  image_url: string | null;
  ingredients: string[] | null;
  health_benefits: string[] | null;
  is_available: boolean;
  is_featured: boolean;
  preparation_time: number | null;
  calories: number | null;
  protein: number | null;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  confirmation_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  image_url: string | null;
  author: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  role: 'admin' | 'user';
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export type InsertMenuItem = Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>;
export type UpdateMenuItem = Partial<InsertMenuItem>;

export type InsertReservation = Omit<Reservation, 'id' | 'status' | 'confirmation_code' | 'created_at' | 'updated_at'>;
export type UpdateReservation = Partial<InsertReservation> & { status?: Reservation['status'] };

export type InsertReview = Omit<Review, 'id' | 'is_approved' | 'is_featured' | 'created_at'>;
export type UpdateReview = Partial<InsertReview>;

export type InsertArticle = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type UpdateArticle = Partial<InsertArticle>;

export type InsertContact = Omit<Contact, 'id' | 'status' | 'created_at'>;

export type InsertGalleryImage = Omit<GalleryImage, 'id' | 'created_at'>;
export type UpdateGalleryImage = Partial<InsertGalleryImage>;

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  starters: 'Starters',
  mains: 'Main Course',
  soups: 'Soups',
  salads: 'Salads',
  desserts: 'Desserts',
  beverages: 'Beverages',
  specials: 'Chef\'s Specials',
};
