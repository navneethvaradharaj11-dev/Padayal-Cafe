import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Leaf,
  Heart,
  Droplets,
  Sparkles,
  Calendar,
  UtensilsCrossed,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MenuItem, Review } from '../types/database';
import { MenuItemSkeleton } from '../components/ui/Skeleton';
import { RESTAURANT_INFO } from '../config/restaurant';
import { formatCurrency } from '../utils/formatCurrency';

const CONCEPT_PILLARS = [
  {
    icon: Leaf,
    title: 'Zero Cooking Oil',
    description: 'No refined oils, hydrogenated fats, or frying. Natural healthy fats come solely from fresh grated coconut and native seeds.',
  },
  {
    icon: Sparkles,
    title: 'Zero Boiling / Fire-Free',
    description: 'Food is prepared uncooked and unboiled, preserving 100% of delicate live vitamins, enzymes, and natural pranic energy.',
  },
  {
    icon: Droplets,
    title: 'Cold-Pressed Extracts',
    description: 'Fresh tender coconut milk, native herb cold-infusions, and unheated vegetable extracts blended immediately before serving.',
  },
  {
    icon: Heart,
    title: 'Light & Energizing',
    description: 'Leaves the body light, refreshed, and energized rather than fatigued. Gentle on cardiovascular health and digestion.',
  },
];

const SIGNATURE_CATEGORIES = [
  {
    title: 'Traditional Plantain Leaf Meals',
    tamil: 'இயற்கை இலை விருந்து',
    desc: 'Full South Indian feast with uncooked rice/aval, vegetable kootu, raw rasam, and chutneys.',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=600&q=80',
    link: '/menu',
  },
  {
    title: 'Raw Tiffin & Aval Delicacies',
    tamil: 'அவல் & இயற்கை சிற்றுண்டி',
    desc: 'Spiced flattened red rice, coconut-curry leaf tossed aval, and fresh herbal pachadi.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    link: '/menu',
  },
  {
    title: 'Live Sprouts & Native Salads',
    tamil: 'முளைகட்டிய பயறு & பச்சடி',
    desc: 'Sprouted green gram, native navadhanya, tender cucumber, and pomegranate relish.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    link: '/menu',
  },
  {
    title: 'Tender Coconut Herbal Elixirs',
    tamil: 'இளநீர் & மூலிகை சாறுகள்',
    desc: 'Mudakathan, mint, tulsi, and wild amla cold pressed with pure coconut water.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    link: '/menu',
  },
];

const SAMPLE_DISHES: MenuItem[] = [
  {
    id: 'padayal-raja-virundhu',
    name: 'Padayal Traditional Raja Virundhu',
    category: 'mains',
    description: 'Complete South Indian plantain leaf feast featuring seasoned red aval, sprouted gram kootu, raw coconut milk rasam, cucumber pachadi, and palm jaggery payasam.',
    price: 240,
    calories: 360,
    preparation_time: 12,
    protein: 14.5,
    image_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Red Aval', 'Sprouted Green Gram', 'Fresh Coconut Milk', 'Curry Leaves', 'Ginger', 'Himalayan Salt'],
    health_benefits: ['100% Fire-Free', 'High Plant Protein', 'Live Enzymes'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sprouted-navadhanya-salad',
    name: 'Sprouted Navadhanya Live Protein Bowl',
    category: 'salads',
    description: 'Nine sprouted native pulses and grains tossed with fresh grated coconut, pomegranate pearls, native coriander, and cold-pressed lemon-ginger dressing.',
    price: 180,
    calories: 220,
    preparation_time: 8,
    protein: 16.0,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Sprouted Moong', 'Sprouted Cowpea', 'Grated Coconut', 'Pomegranate', 'Lemon Juice'],
    health_benefits: ['Zero Oil', 'Immunity Boost', 'Digestive Health'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'coconut-elixir-lemongrass',
    name: 'Tender Coconut & Lemongrass Herbal Elixir',
    category: 'beverages',
    description: 'Freshly harvested Pollachi tender coconut water blended with native lemongrass, crushed ginger, and natural palm honey.',
    price: 130,
    calories: 85,
    preparation_time: 5,
    protein: 1.5,
    image_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Tender Coconut Water', 'Native Lemongrass', 'Wild Ginger', 'Natural Palm Nectar'],
    health_benefits: ['Hydration & Electrolytes', 'Natural Detox', 'No Added Sugar'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'palm-nectar-payasam',
    name: 'Tender Coconut & Palm Nectar Payasam',
    category: 'desserts',
    description: 'Velvety raw pudding of tender coconut pulp, crushed dry fruits, cardamom powder, and unrefined palm jaggery syrup. 100% dairy-free.',
    price: 160,
    calories: 190,
    preparation_time: 6,
    protein: 4.2,
    image_url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Tender Coconut Pulp', 'Palm Jaggery', 'Green Cardamom', 'Crushed Almonds'],
    health_benefits: ['No Refined Sugar', 'Plant Based', 'Heart Healthy'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Senthil Kumar (RS Puram, Coimbatore)',
    email: 'senthil@gmail.com',
    rating: 5,
    comment: 'The plantain leaf meal here is unlike anything else. You eat a full traditional spread without feeling heavy or sluggish. The tender coconut rasam is unforgettable!',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'rev-2',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi@gmail.com',
    rating: 5,
    comment: 'A true pioneer of South Indian natural food culture. Dr. Sivakumar’s vision of zero oil and zero heat is executed with such authentic taste. Highly recommended for family dining.',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'rev-3',
    name: 'Dr. R. Vigneshwaran',
    email: 'vignesh@gmail.com',
    rating: 5,
    comment: 'As a physician, I admire the commitment to live enzyme nutrition. No frying, no artificial preservatives, and pure natural ingredients. Coimbatore’s proud culinary gem.',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
];

export function HomePage() {
  const [featuredDishes, setFeaturedDishes] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dishesRes, reviewsRes] = await Promise.all([
          supabase
            .from('menu_items')
            .select('*')
            .eq('is_featured', true)
            .eq('is_available', true)
            .limit(4),
          supabase
            .from('reviews')
            .select('*')
            .eq('is_featured', true)
            .eq('is_approved', true)
            .limit(3),
        ]);

        setFeaturedDishes(dishesRes.data && dishesRes.data.length > 0 ? dishesRes.data : SAMPLE_DISHES);
        setReviews(reviewsRes.data && reviewsRes.data.length > 0 ? reviewsRes.data : SAMPLE_REVIEWS);
      } catch {
        setFeaturedDishes(SAMPLE_DISHES);
        setReviews(SAMPLE_REVIEWS);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-16 md:space-y-24">
      
      {/* 1. HERO SECTION: Authentic South Indian Food Imagery & Clear Positioning */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#112415] via-[#1B4329] to-[#112415] text-white">
        {/* Background authentic textures */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=2000&q=80"
            alt="Traditional South Indian Meal background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Badges, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-cream-100">
                <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
                <span>Coimbatore’s Original Natural Dining</span>
                <span className="text-white/40">|</span>
                <span className="text-cream-200">எண்ணெய் இல்லா, அடுப்பில்லா உணவு</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-pranic text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                  Pure Natural Food.<br />
                  <span className="text-[#F5E6C8] font-serif italic">No Oil. No Boil.</span><br />
                  Traditional South Indian Flavours.
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-cream-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                  Experience South India’s pioneer in raw, live-enzyme culinary tradition. Wholesome meals served fresh on natural plantain leaves, prepared without cooking oil or artificial heat.
                </p>
              </div>

              {/* Verified Value Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-cream-100 flex items-center gap-1.5">
                  🌿 100% Plant Based
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-cream-100 flex items-center gap-1.5">
                  ✓ Zero Refined Oil
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-cream-100 flex items-center gap-1.5">
                  ⚡ Live Enzymes Intact
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-cream-100 flex items-center gap-1.5">
                  🍃 Plantain Leaf Dining
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-padayal-cta text-white font-extrabold text-sm sm:text-base hover:bg-padayal-cta-hover active:scale-95 transition-all shadow-lg shadow-padayal-cta/30 text-center inline-flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>View Our Menu</span>
                </Link>
                <Link
                  to="/reservation"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-padayal-text font-extrabold text-sm sm:text-base hover:bg-cream-100 active:scale-95 transition-all shadow-md text-center inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-padayal-primary" />
                  <span>Book a Table</span>
                </Link>
              </div>

              {/* Location micro indicator */}
              <div className="pt-2 text-xs text-cream-300 flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4 text-padayal-secondary" />
                <span>Open All Days 7:30 AM - 9:30 PM • Vadavalli Road, Coimbatore</span>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Food Photo */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-forest-900">
                  <img
                    src="https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1000&q=80"
                    alt="Traditional South Indian Meal on Plantain Leaf"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating highlight card */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-padayal-surface text-padayal-text p-4 sm:p-5 rounded-2xl shadow-2xl border border-padayal-bg max-w-xs space-y-1.5 animate-slide-up">
                  <div className="flex items-center gap-2 text-xs font-bold text-padayal-primary uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-padayal-primary" />
                    <span>Real Traditional Food</span>
                  </div>
                  <p className="font-pranic font-bold text-base text-padayal-text">
                    Served on Fresh Plantain Leaf
                  </p>
                  <p className="text-xs text-padayal-muted leading-tight">
                    Natural dining honouring Coimbatore’s native heritage and body wellness.
                  </p>
                </div>

                {/* Floating badge top right */}
                <div className="absolute -top-4 -right-4 bg-padayal-cta text-white px-4 py-2 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-1.5">
                  <span>100% Unboiled Prana</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE PADAYAL CONCEPT: Why No Oil No Boil? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold uppercase tracking-wider">
            Our Food Philosophy
          </span>
          <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
            Natural Living Through Traditional Food Culture
          </h2>
          <p className="text-sm sm:text-base text-padayal-muted leading-relaxed">
            In ancient Tamil culture, food was revered as natural medicine (உணவே மருந்து). Padayal honours this wisdom by removing all heating and industrial oils, allowing raw nature to nourish your body in its purest form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONCEPT_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-padayal-surface rounded-2xl p-6 shadow-organic border border-padayal-bg space-y-3 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-padayal-secondary-light text-padayal-primary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-pranic text-lg font-bold text-padayal-text">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SIGNATURE FOOD CATEGORIES */}
      <section className="bg-padayal-surface py-14 md:py-20 border-y border-padayal-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-padayal-cta uppercase tracking-wider">
                Crafted Daily
              </span>
              <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
                Explore Signature Offerings
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-padayal-primary hover:text-padayal-primary-hover transition-colors"
            >
              <span>See Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNATURE_CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="group relative rounded-2xl overflow-hidden bg-padayal-bg border border-padayal-bg shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-forest-900 relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-cream-200 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {cat.tamil}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-pranic text-base font-bold text-padayal-text group-hover:text-padayal-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-padayal-muted leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-padayal-cta pt-1">
                    Explore items <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. POPULAR DISHES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-padayal-primary uppercase tracking-wider">
              Guest Favourites
            </span>
            <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
              Popular Dishes at Padayal
            </h2>
          </div>
          <Link
            to="/menu"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-5 self-start sm:self-auto"
          >
            Browse All Menu
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <MenuItemSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-padayal-surface rounded-2xl overflow-hidden border border-padayal-bg shadow-organic hover:shadow-organic-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-padayal-bg relative">
                    <img
                      src={dish.image_url || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/90 text-padayal-primary text-[10px] font-bold shadow-sm">
                      🌿 No Oil
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-pranic text-base font-bold text-padayal-text group-hover:text-padayal-primary transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-padayal-muted line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {dish.health_benefits?.slice(0, 2).map((benefit, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-padayal-secondary-light text-padayal-primary font-medium">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-padayal-bg/60 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-padayal-muted block font-medium">Price</span>
                    <span className="font-extrabold text-base text-padayal-text">{formatCurrency(dish.price)}</span>
                  </div>
                  <Link
                    to="/menu"
                    className="px-3.5 py-2 rounded-xl bg-padayal-cta text-white text-xs font-bold hover:bg-padayal-cta-hover transition-colors shadow-sm"
                  >
                    View in Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. FEATURED EXPERIENCE: The Plantain Leaf Feast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B4329] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 rounded-full bg-white/15 text-cream-200 text-xs font-bold uppercase tracking-wider">
                Signature Coimbatore Experience
              </span>
              <h2 className="font-pranic text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Traditional Plantain Leaf Feast (இயற்கை விருந்து)
              </h2>
              <p className="text-cream-200 text-sm sm:text-base leading-relaxed">
                Sit down to a lavish traditional lunch spread served on fresh green banana leaves. Enjoy unboiled red aval, sprouted gram kootu, native coconut milk rasam, seasonal vegetable pachadi, cold-extracted herbal soup, and palm sugar payasam.
              </p>
              
              <ul className="space-y-2 text-xs sm:text-sm text-cream-100 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-padayal-secondary shrink-0" />
                  <span>Unlimited servings of fresh accompaniments during lunch hours (12:00 PM - 3:30 PM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-padayal-secondary shrink-0" />
                  <span>Prepared fresh on order using local produce from Coimbatore farms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-padayal-secondary shrink-0" />
                  <span>Zero cholesterol, zero refined sugar, 100% natural seasoning</span>
                </li>
              </ul>

              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  to="/reservation"
                  className="px-6 py-3.5 rounded-xl bg-padayal-cta hover:bg-padayal-cta-hover text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                >
                  Reserve Table for Lunch Feast
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-colors"
                >
                  Learn Our Story
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80"
                  alt="Padayal Plantain Leaf Dining"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. GUEST REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-padayal-primary uppercase tracking-wider">
            Guest Testimonials
          </span>
          <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
            What Our Diners Say
          </h2>
          <p className="text-xs sm:text-sm text-padayal-muted">
            Read authentic reviews from guests who made natural dining part of their lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-padayal-surface rounded-2xl p-6 shadow-organic border border-padayal-bg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-padayal-text/80 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-padayal-bg flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-padayal-text">{rev.name}</p>
                  <span className="text-padayal-muted">Verified Guest</span>
                </div>
                <span className="text-[10px] text-padayal-muted">
                  {new Date(rev.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/reviews" className="btn-secondary text-xs sm:text-sm py-2.5 px-6">
            Read More Reviews / Share Your Experience
          </Link>
        </div>
      </section>

      {/* 7. LOCATION & HOURS SPOTLIGHT */}
      <section className="bg-padayal-surface py-12 md:py-16 border-t border-padayal-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-padayal-primary uppercase tracking-wider">
                  Visit Us in Coimbatore
                </span>
                <h2 className="font-pranic text-3xl font-extrabold text-padayal-text mt-1">
                  Location & Operating Hours
                </h2>
                <p className="text-xs sm:text-sm text-padayal-muted mt-2 leading-relaxed">
                  Join us at our peaceful restaurant setting on Vadavalli Road. Experience warm South Indian hospitality in an eco-friendly setting.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-padayal-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-padayal-text">Address</p>
                    <p className="text-padayal-muted">{RESTAURANT_INFO.location.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-padayal-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-padayal-text">Operating Hours</p>
                    <p className="text-padayal-muted">{RESTAURANT_INFO.displayHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-padayal-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-padayal-text">Direct Contact</p>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-padayal-primary font-semibold hover:underline">
                      {RESTAURANT_INFO.displayPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/reservation" className="btn-primary text-xs sm:text-sm py-3 px-6">
                  Book Your Table
                </Link>
                <Link to="/contact" className="btn-secondary text-xs sm:text-sm py-3 px-6">
                  Get Driving Directions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-padayal-bg shadow-organic aspect-[16/10] bg-padayal-bg">
                <iframe
                  src={RESTAURANT_INFO.location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Padayal Restaurant Coimbatore Map"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FINAL TABLE RESERVATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-padayal-cta to-[#804B2D] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="font-pranic text-2xl sm:text-4xl font-black text-white">
            Ready to Taste South India’s Purest Natural Food?
          </h2>
          <p className="text-cream-200 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance to enjoy fresh plantain leaf service with zero waiting time.
          </p>
          <div className="pt-2">
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-padayal-cta font-black text-sm sm:text-base hover:bg-cream-100 active:scale-95 transition-all shadow-md"
            >
              <span>Reserve a Table Online</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
