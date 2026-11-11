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
  BookOpen,
  Search,
  Check,
  Rotate3D,
  Image as ImageIcon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MenuItem, Review } from '../types/database';
import { MenuItemSkeleton } from '../components/ui/Skeleton';
import { RESTAURANT_INFO } from '../config/restaurant';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { TiltCard3D } from '../components/3d/TiltCard3D';
import { BotanicalViewer3D } from '../components/3d/BotanicalViewer3D';
import placeholderImage from '../assets/placeholder.svg';

const CONCEPT_PILLARS = [
  {
    icon: Leaf,
    title: 'Living plant log',
    subtitle: 'Zero refined cooking oil',
    description: 'Food is prepared without industrial cooking oils, hydrogenated fats, or frying. Natural fats are derived from fresh coconut and living seeds.',
  },
  {
    icon: Sparkles,
    title: 'Season-aware dishes',
    subtitle: 'No oil, no boil philosophy',
    description: 'Padayal explores alternative food preparation such as soaking, sprouting, and blending without conventional stove boiling or heat destruction.',
  },
  {
    icon: Droplets,
    title: 'Plantain leaf ritual',
    subtitle: 'Cold-pressed coconut extracts',
    description: 'Fresh Pollachi coconut milk, tender coconut elixirs, and native herbal infusions served on natural banana leaves in Coimbatore.',
  },
];

interface KitchenSpreadItem {
  id: string;
  name: string;
  tamil: string;
  category: 'virundhu' | 'sprouts' | 'elixirs' | 'desserts';
  tag: string;
  description: string;
  price: number;
  image: string;
  isPrepared: boolean;
}

const KITCHEN_SPREAD: KitchenSpreadItem[] = [
  {
    id: 'raja-virundhu',
    name: 'Padayal Traditional Raja Virundhu (Plantain Leaf Feast)',
    tamil: 'இயற்கை இலை விருந்து',
    category: 'virundhu',
    tag: 'Plantain Leaf • Lunch',
    description: 'Thooyamalli red aval sadham, sprouted moong kootu, raw coconut milk rasam, venpoosani pachadi, and curry leaf thuvaiyal.',
    price: 240,
    image: '/images/food/raja-virundhu.jpg',
    isPrepared: true,
  },
  {
    id: 'spiced-aval-tiffin',
    name: 'Heritage Aval & Unboiled Tiffin',
    tamil: 'அவல் & இயற்கை சிற்றுண்டி',
    category: 'virundhu',
    tag: 'Heritage Aval • Pollachi Coconut',
    description: 'Traditional flattened red rice tossed with Pollachi grated coconut, wild ginger, curry leaves, and black pepper.',
    price: 150,
    image: '/images/food/spiced-aval-tiffin.jpg',
    isPrepared: true,
  },
  {
    id: 'sprouted-navadhanya',
    name: 'Navadhanya Sprouted Pulses Live Protein Bowl',
    tamil: 'முளைகட்டிய பயறு பச்சடி',
    category: 'sprouts',
    tag: '9 Sprouted Grains • Living Enzymes',
    description: 'Nine sprouted native grains tossed with freshly scraped coconut, sweet pomegranate pearls, and lime-ginger dressing.',
    price: 180,
    image: '/images/food/sprouts-salad.jpg',
    isPrepared: true,
  },
  {
    id: 'cucumber-pachadi',
    name: 'Vellari (Cucumber) & Coconut Pachadi',
    tamil: 'வெள்ளரி தயிர் பச்சடி',
    category: 'sprouts',
    tag: 'Coimbatore Cucumbers • Cold-blended',
    description: 'Tender country cucumbers tossed with ground coconut-mustard relish and fresh curry leaves.',
    price: 120,
    image: '/images/food/cucumber-pachadi.jpg',
    isPrepared: true,
  },
  {
    id: 'coconut-elixir',
    name: 'Pollachi Tender Coconut & Lemongrass Elixir',
    tamil: 'இளநீர் & மூலிகை சாறு',
    category: 'elixirs',
    tag: 'Pollachi Elaneer • Raw Lemongrass',
    description: 'Naturally sweet water of fresh Pollachi tender coconut cold-infused with organic lemongrass, ginger, and palm nectar.',
    price: 130,
    image: '/images/food/coconut-elixir.jpg',
    isPrepared: true,
  },
  {
    id: 'mudakathan-soup',
    name: 'Cold-Extracted Mudakathan Herbal Soup',
    tamil: 'முடக்கத்தான் மூலிகை சாறு',
    category: 'elixirs',
    tag: 'Native Greens • Joint Care',
    description: 'Cold-pressed extract of wild mudakathan greens with black pepper, cumin, and Himalayan rock salt.',
    price: 110,
    image: '/images/food/mudakathan-soup.jpg',
    isPrepared: false,
  },
  {
    id: 'palm-nectar-payasam',
    name: 'Elaneer (Tender Coconut) & Palm Jaggery Payasam',
    tamil: 'இளநீர் & பனைவெல்ல பாயாசம்',
    category: 'desserts',
    tag: 'Zero Refined Sugar • Fresh Pulp',
    description: 'Velvety unboiled sweet prepared with young coconut pulp, cashew cream, cardamom, and unrefined palm jaggery.',
    price: 160,
    image: '/images/food/tender-coconut-payasam.jpg',
    isPrepared: true,
  },
  {
    id: 'tulsi-mint-shot',
    name: 'Wild Tulsi & Country Mint Prana Shot',
    tamil: 'துளசி & புதினா பானம்',
    category: 'desserts',
    tag: 'Immunity Shot • Native Herbs',
    description: 'Cold-extracted sacred tulsi, country spearmint, black pepper, and pure honey nectar.',
    price: 90,
    image: '/images/food/tulsi-mint-shot.jpg',
    isPrepared: false,
  },
];

const SAMPLE_DISHES: MenuItem[] = [
  {
    id: 'padayal-raja-virundhu',
    name: 'Padayal Traditional Raja Virundhu (Plantain Leaf Feast)',
    category: 'mains',
    description: 'Authentic fire-free South Indian thali: Thooyamalli red aval sadham, sprouted moong kootu, raw coconut milk rasam, venpoosani pachadi, curry leaf thuvaiyal, and palm jaggery payasam.',
    price: 240,
    calories: 360,
    preparation_time: 12,
    protein: 14.5,
    image_url: '/images/food/raja-virundhu.jpg',
    ingredients: ['Thooyamalli Red Aval', 'Sprouted Moong', 'Fresh Coconut Milk', 'Curry Leaves', 'Ginger', 'Himalayan Rock Salt'],
    health_benefits: ['No Cooking Oil', 'Regional Grains', 'Plantain Leaf Thali'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sprouted-navadhanya-salad',
    name: 'Navadhanya Sprouted Pulses Live Protein Bowl',
    category: 'salads',
    description: 'Nine sprouted native grains and pulses tossed with freshly grated coconut, sweet pomegranate pearls, country coriander, and lime-ginger dressing.',
    price: 180,
    calories: 220,
    preparation_time: 8,
    protein: 16.0,
    image_url: '/images/food/sprouts-salad.jpg',
    ingredients: ['Sprouted Green Gram', 'Cowpeas', 'Fresh Scraped Coconut', 'Pomegranate', 'Lemon Juice'],
    health_benefits: ['Zero Cooking Oil', 'Sprouted Pulses', 'Natural Produce'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'coconut-elixir-lemongrass',
    name: 'Pollachi Tender Coconut & Lemongrass Elixir',
    category: 'beverages',
    description: 'Naturally sweet water of fresh Pollachi tender coconut cold-infused with organic native lemongrass, wild ginger extract, and unrefined palm nectar.',
    price: 130,
    calories: 85,
    preparation_time: 5,
    protein: 1.5,
    image_url: '/images/food/coconut-elixir.jpg',
    ingredients: ['Tender Coconut Water', 'Native Lemongrass', 'Wild Ginger', 'Natural Palm Nectar'],
    health_benefits: ['Pollachi Coconut', 'Pure Hydration', 'No Refined Sugar'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'palm-nectar-payasam',
    name: 'Elaneer (Tender Coconut) & Palm Jaggery Payasam',
    category: 'desserts',
    description: 'Velvety unboiled traditional sweet prepared with young coconut pulp, ground cashew cream, crushed cardamom, and unrefined palm jaggery syrup.',
    price: 160,
    calories: 190,
    preparation_time: 6,
    protein: 4.2,
    image_url: '/images/food/tender-coconut-payasam.jpg',
    ingredients: ['Young Coconut Pulp', 'Palm Jaggery', 'Green Cardamom', 'Crushed Almonds'],
    health_benefits: ['Zero Refined Sugar', 'Plant Based Sweet', 'Fresh Coconut'],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Senthil K.',
    email: 'senthil@padayal.feedback',
    rating: 5,
    comment: 'The plantain leaf lunch spread is very unique. The combination of red aval, sprouted gram, and fresh tender coconut rasam is distinctively South Indian and very refreshing.',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'rev-2',
    name: 'Meenakshi S.',
    email: 'meenakshi@padayal.feedback',
    rating: 5,
    comment: 'Chef Sivakumar’s concept of zero oil cooking is executed with traditional flavours. A thoughtful place for family lunch in Coimbatore.',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'rev-3',
    name: 'Vigneshwaran R.',
    email: 'vignesh@padayal.feedback',
    rating: 5,
    comment: 'A genuinely different dining experience. No heavy frying or cooking oil, just natural ingredients and warm traditional service.',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
];

export function HomePage() {
  const [featuredDishes, setFeaturedDishes] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'virundhu' | 'sprouts' | 'elixirs' | 'desserts'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpreadItem, setSelectedSpreadItem] = useState<KitchenSpreadItem>(KITCHEN_SPREAD[0]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [hero3DMode, setHero3DMode] = useState(false);
  const { addItem } = useCart();

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

  const filteredSpread = KITCHEN_SPREAD.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tamil.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="bg-transparent text-padayal-text selection:bg-padayal-primary selection:text-white">

      {/* 1. HERO SECTION: MEADOWLARK EDITORIAL SYSTEM (Image 1 Style) */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        {/* Subtle warm organic ambient background wash */}
        <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#F2F5EB]/60 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[26rem] h-[26rem] bg-[#F8EFE4]/70 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Meadowlark Hero Typography & Palette Pill */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Meadowlark Large Title with colored period */}
              <div className="space-y-2">
                <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-padayal-text leading-[1.05]">
                  Padayal<span className="text-padayal-cta">.</span>
                </h1>
                
                {/* Meadowlark Italicized Botanical Subtitle */}
                <p className="font-editorial italic text-xl sm:text-2xl lg:text-3xl text-padayal-primary/90 font-normal">
                  a light, fire-free botanical dining tradition
                </p>
              </div>

              {/* Meadowlark Descriptive Paragraph */}
              <p className="text-padayal-muted text-base sm:text-lg max-w-xl font-sans leading-relaxed">
                Imagery leads. An elegant culinary tradition breathes inside the calm center of Coimbatore's dining culture, while fresh Pollachi coconut, sprouted grains, and living herbs spill in from the edges.
              </p>

              {/* Meadowlark Color Palette Swatch Pill */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-3 p-2 px-3.5 rounded-full bg-white shadow-sm border border-black/[0.05]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#FAF8F5] border border-black/10" title="Raw Coconut Milk Canvas (#FAF8F5)" />
                    <span className="w-4 h-4 rounded-full bg-[#F2F5EB]" title="Sage Tint (#F2F5EB)" />
                    <span className="w-4 h-4 rounded-full bg-[#965A38]" title="Terracotta Brown (#965A38)" />
                    <span className="w-4 h-4 rounded-full bg-[#8A9A5B]" title="Lemongrass (#8A9A5B)" />
                    <span className="w-4 h-4 rounded-full bg-[#2B7A4B]" title="Banana Leaf Green (#2B7A4B)" />
                    <span className="w-4 h-4 rounded-full bg-[#112415]" title="Forest Dark (#112415)" />
                  </div>
                  <span className="text-black/15">|</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-padayal-muted uppercase tracking-wider">
                    <span className="text-padayal-cta">✦</span>
                    <span>BOTANICAL • NO OIL NO BOIL</span>
                  </div>
                </div>
              </div>

              {/* Meadowlark Pill Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <Link
                  to="/menu"
                  className="px-7 py-3.5 rounded-full bg-padayal-cta text-white font-medium text-sm sm:text-base hover:bg-padayal-cta-hover active:scale-95 transition-all shadow-none inline-flex items-center gap-2"
                >
                  <span>Explore our feast</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/reservation"
                  className="px-7 py-3.5 rounded-full bg-white text-padayal-text font-medium text-sm sm:text-base border border-black/[0.12] hover:bg-black/[0.02] active:scale-95 transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-padayal-primary" />
                  <span>Reserve a table</span>
                </Link>
              </div>

            </div>

            {/* Right Column: 3D Interactive Card & Showcase with Tilt & Glare */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                
                {/* 2D/3D Mode Switcher Pill */}
                <div className="flex items-center justify-end mb-3 gap-2">
                  <div className="inline-flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-black/[0.06] text-xs">
                    <button
                      type="button"
                      onClick={() => setHero3DMode(false)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        !hero3DMode
                          ? 'bg-padayal-cta text-white shadow-sm'
                          : 'text-padayal-muted hover:text-padayal-text'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Feast Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHero3DMode(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        hero3DMode
                          ? 'bg-padayal-primary text-white shadow-sm'
                          : 'text-padayal-muted hover:text-padayal-text'
                      }`}
                    >
                      <Rotate3D className="w-3.5 h-3.5" />
                      <span>3D Prana Mandala</span>
                    </button>
                  </div>
                </div>

                <TiltCard3D maxTilt={10} scale={1.02} glare={!hero3DMode}>
                  {/* Rounded 3D card */}
                  <div className="aspect-[4/3] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white relative group">
                    {hero3DMode ? (
                      <BotanicalViewer3D />
                    ) : (
                      <>
                        <img
                          src="/images/food/raja-virundhu.jpg"
                          alt="Padayal Traditional Plantain Leaf Feast"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Subtle vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                        {/* Bottom pill label */}
                        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-medium text-padayal-text">
                            <span className="w-2 h-2 rounded-full bg-padayal-primary animate-pulse" />
                            <span>East Singanallur, lunch spread</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TiltCard3D>

                {/* Micro floating badge on top right */}
                <div className="absolute -top-1 -right-3 bg-white p-2 rounded-full shadow-md border border-black/[0.05] flex items-center justify-center z-20 pointer-events-none">
                  <span className="text-padayal-cta text-sm">✦</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CENTERED EDITORIAL CALLOUT (Image 2 Style) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="space-y-5">
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-padayal-text font-normal tracking-tight leading-[1.15]">
            Every meal keeps a memory.
          </h2>
          <p className="text-padayal-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Padayal tracks the quiet rituals of traditional South Indian unboiled dining — what sprouted at dawn, what fresh coconut was pressed, and how natural prana sustains everyday wellness.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              to="/reservation"
              className="px-7 py-3 rounded-full bg-padayal-cta text-white font-medium text-sm hover:bg-padayal-cta-hover transition-all inline-flex items-center gap-2"
            >
              <span>Start your table reservation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/menu"
              className="px-6 py-3 rounded-full bg-white text-padayal-text font-medium text-sm border border-black/[0.12] hover:bg-black/[0.02] transition-all shadow-sm"
            >
              See a sample menu
            </Link>
          </div>
        </div>
      </section>

      {/* 3. THREE FLOATING CARDS & BOTANICAL DIVIDER (Image 3 Style) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Headline */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-padayal-text tracking-tight">
            A calm place for everything tradition remembers.
          </h2>
          <p className="text-padayal-muted text-sm sm:text-base leading-relaxed">
            No frying pans to tend. Padayal keeps three simple principles in order and lets the season set the pace.
          </p>
        </div>

        {/* 3 Floating 3D Cards with generous rounded corners and tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CONCEPT_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <TiltCard3D key={pillar.title} maxTilt={9} scale={1.03} className="h-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm hover:shadow-xl border border-black/[0.04] transition-all duration-300 space-y-4 flex flex-col justify-between h-full">
                  <div>
                    {/* Tinted rounded square icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F2F5EB] text-padayal-primary flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Editorial Serif Card Title */}
                    <h3 className="font-editorial text-xl sm:text-2xl font-normal text-padayal-text tracking-tight">
                      {pillar.title}
                    </h3>
                    
                    {/* Card Description */}
                    <p className="text-padayal-muted text-xs sm:text-sm leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.04]">
                    <span className="text-[11px] font-semibold text-padayal-primary uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Meadowlark Botanical Divider (Image 3) */}
        <div className="flex items-center justify-center my-16 sm:my-24 gap-4">
          <div className="h-px bg-padayal-text/10 w-24 sm:w-40" />
          <span className="text-padayal-cta text-sm">✦</span>
          <div className="h-px bg-padayal-text/10 w-24 sm:w-40" />
        </div>

      </section>

      {/* 4. "THIS WEEK IN THE KITCHEN" / INTERACTIVE SPREAD (Image 4 Style) */}
      <section className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Headline */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-padayal-text tracking-tight">
            This week in the kitchen.
          </h2>
          <p className="text-padayal-muted text-sm sm:text-base leading-relaxed">
            The same view you open every morning: what is gathered, what is prepared, and one quiet moment to savour it.
          </p>
        </div>

        {/* Two-column layout: Left image card + Right interactive card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Rounded 3D photo card — matches 4:3 landscape food images */}
          <div className="lg:col-span-5">
            <TiltCard3D maxTilt={7} scale={1.02}>
              <div className="relative aspect-[4/3] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-md border-4 border-white bg-forest-900 group">
                <img
                  src={selectedSpreadItem.image}
                  alt={selectedSpreadItem.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm text-xs font-medium text-padayal-text">
                    <span className="w-2 h-2 rounded-full bg-padayal-primary" />
                    <span>{selectedSpreadItem.tag}</span>
                  </div>
                  <p className="text-white font-editorial text-lg font-bold drop-shadow-sm">
                    {selectedSpreadItem.name}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Right Column: Meadowlark white card with tabs and checklist */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-9 shadow-sm border border-black/[0.04] space-y-6">
            
            {/* Header: Week title and tended indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.05]">
              <div className="space-y-0.5">
                <h3 className="font-editorial text-2xl font-normal text-padayal-text tracking-tight">
                  Spring harvest, week 9
                </h3>
                <span className="text-xs text-padayal-muted">Singanallur Dining Spread</span>
              </div>
              <span className="text-xs font-semibold text-padayal-muted bg-padayal-bg px-3 py-1 rounded-full border border-black/[0.04]">
                6 of 8 prepared
              </span>
            </div>

            {/* Meadowlark clean tabs */}
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-1 text-sm text-padayal-muted border-b border-black/[0.05]">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`pb-2 relative font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'text-padayal-text font-semibold'
                    : 'hover:text-padayal-text'
                }`}
              >
                All items
                {activeCategory === 'all' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('virundhu')}
                className={`pb-2 relative font-medium transition-colors ${
                  activeCategory === 'virundhu'
                    ? 'text-padayal-text font-semibold'
                    : 'hover:text-padayal-text'
                }`}
              >
                Virundhu feasts
                {activeCategory === 'virundhu' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('sprouts')}
                className={`pb-2 relative font-medium transition-colors ${
                  activeCategory === 'sprouts'
                    ? 'text-padayal-text font-semibold'
                    : 'hover:text-padayal-text'
                }`}
              >
                Sprouts & bowls
                {activeCategory === 'sprouts' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('elixirs')}
                className={`pb-2 relative font-medium transition-colors ${
                  activeCategory === 'elixirs'
                    ? 'text-padayal-text font-semibold'
                    : 'hover:text-padayal-text'
                }`}
              >
                Native elixirs
                {activeCategory === 'elixirs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('desserts')}
                className={`pb-2 relative font-medium transition-colors ${
                  activeCategory === 'desserts'
                    ? 'text-padayal-text font-semibold'
                    : 'hover:text-padayal-text'
                }`}
              >
                Sweets
                {activeCategory === 'desserts' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                )}
              </button>
            </div>

            {/* Checklist items like Meadowlark Image 4 */}
            <div className="space-y-3">
              {filteredSpread.slice(0, 5).map((item) => {
                const isSelected = selectedSpreadItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSpreadItem(item)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-4 border ${
                      isSelected
                        ? 'bg-[#F2F5EB]/60 border-padayal-primary/30 shadow-sm'
                        : 'bg-white hover:bg-black/[0.015] border-black/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                          item.isPrepared
                            ? 'bg-padayal-cta border-padayal-cta text-white'
                            : 'border-black/20 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <p className="font-editorial text-sm sm:text-base font-medium text-padayal-text leading-tight">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-padayal-muted mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-padayal-text block">
                        {formatCurrency(item.price)}
                      </span>
                      <span className="text-[10px] text-padayal-muted block font-medium">
                        {item.tag.split('•')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Search Pill Input (Meadowlark style) */}
            <div className="relative pt-2">
              <Search className="w-4 h-4 text-padayal-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, beds, or blooms..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FAF8F5] border border-black/[0.08] text-xs sm:text-sm text-padayal-text placeholder:text-padayal-muted/70 focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
              />
            </div>

            {/* Bottom Row: Checkbox + Action Pill button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/[0.05]">
              <label className="flex items-center gap-2.5 text-xs text-padayal-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-padayal-cta focus:ring-padayal-cta/30"
                />
                <span>Remind me before lunch feast ends (3:30 PM)</span>
              </label>

              <Link
                to="/reservation"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover active:scale-95 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                <span>✎ Log today's visit</span>
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* 5. POPULAR DISHES IN MEADOWLARK CARDS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-padayal-text tracking-tight">
              Guest favourites from the beds.
            </h2>
            <p className="text-padayal-muted text-sm sm:text-base max-w-xl">
              Authentic unboiled South Indian recipes created fresh daily in Coimbatore.
            </p>
          </div>
          <Link
            to="/menu"
            className="text-sm font-medium text-padayal-primary hover:text-padayal-primary-hover inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Browse all dishes</span>
            <ArrowRight className="w-4 h-4" />
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
              <TiltCard3D key={dish.id} maxTilt={8} scale={1.03} className="h-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group p-4 h-full">
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] relative">
                      <img
                        src={dish.image_url || placeholderImage}
                        alt={dish.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-white/95 text-padayal-primary text-[10px] font-bold shadow-sm">
                        🌿 No Oil
                      </span>
                    </div>

                    <div className="pt-4 space-y-2">
                      <h3 className="font-editorial text-base sm:text-lg font-normal text-padayal-text line-clamp-1 group-hover:text-padayal-primary transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-padayal-muted line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between">
                    <span className="font-editorial text-base font-bold text-padayal-text">
                      {formatCurrency(dish.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addItem(dish)}
                      className="px-4 py-2 rounded-full bg-padayal-cta text-white text-xs font-medium hover:bg-padayal-cta-hover transition-colors shadow-none"
                    >
                      Add to plate
                    </button>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        )}

      </section>

      {/* 6. FOUNDER & PHILOSOPHY (Meadowlark 3D Card Format) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <TiltCard3D maxTilt={4} scale={1.01}>
          <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-black/[0.04] shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left: Founder portrait */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="w-48 sm:w-60 aspect-square rounded-[2rem] overflow-hidden shadow-lg border-4 border-[#FAF8F5] relative">
                  <img
                    src="/images/founder.png"
                    alt={RESTAURANT_INFO.founder.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-editorial text-2xl font-normal text-padayal-text">
                    {RESTAURANT_INFO.founder.name}
                  </h4>
                  <p className="text-xs text-padayal-primary font-medium mt-0.5">
                    {RESTAURANT_INFO.founder.tamilName} • {RESTAURANT_INFO.founder.title}
                  </p>
                </div>
              </div>

              {/* Right: Editorial Narrative */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-[11px] font-bold text-padayal-cta uppercase tracking-widest">
                  ✦ THE STORY BEHIND PADAYAL
                </span>
                
                <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-padayal-text tracking-tight leading-tight">
                  "More than food. A quiet way of living."
                </h3>

                <p className="text-sm sm:text-base text-padayal-muted leading-relaxed font-sans">
                  {RESTAURANT_INFO.founder.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.04] space-y-1">
                    <span className="text-xs font-bold text-padayal-primary block">Mentorship</span>
                    <p className="text-xs text-padayal-muted">{RESTAURANT_INFO.founder.inspiration}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.04] space-y-1">
                    <span className="text-xs font-bold text-padayal-primary block">Culinary Innovation</span>
                    <p className="text-xs text-padayal-muted">{RESTAURANT_INFO.founder.recipesCount}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="px-6 py-3 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover transition-colors inline-flex items-center gap-2"
                  >
                    <span>Read our complete philosophy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </TiltCard3D>
      </section>

      {/* 7. GUEST REFLECTIONS (Meadowlark 3D Review Cards) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-padayal-text tracking-tight">
            Notes from diners.
          </h2>
          <p className="text-xs sm:text-sm text-padayal-muted">
            Quiet reflections from guests who made unboiled dining part of their living ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <TiltCard3D key={rev.id} maxTilt={7} scale={1.02} className="h-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-7 shadow-sm hover:shadow-xl border border-black/[0.04] space-y-4 flex flex-col justify-between h-full transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="font-editorial italic text-sm text-padayal-text/80 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-padayal-text">{rev.name}</p>
                    <span className="text-[11px] text-padayal-muted">Coimbatore</span>
                  </div>
                  <span className="text-[10px] text-padayal-muted">
                    {new Date(rev.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER BANNER (Meadowlark Image 5 Style) */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-[2.5rem] bg-[#F2F5EB] p-8 sm:p-12 lg:p-14 border border-padayal-primary/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Meadowlark Newsletter Headline */}
            <div className="lg:col-span-6 space-y-3">
              <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-padayal-text tracking-tight leading-tight">
                Bring the meadow to your inbox.
              </h3>
              <p className="text-padayal-muted text-sm sm:text-base leading-relaxed font-sans">
                One letter each season with harvest windows, unboiled South Indian recipes, and a single story from our Coimbatore kitchen. No streaks, no badges.
              </p>
            </div>

            {/* Right: Form with rounded-full input and terracotta subscribe button */}
            <div className="lg:col-span-6">
              {newsletterSubscribed ? (
                <div className="p-6 rounded-2xl bg-white border border-padayal-primary/20 text-center space-y-2">
                  <span className="text-padayal-cta text-2xl">✦</span>
                  <h4 className="font-editorial text-lg font-bold text-padayal-text">Welcome to the table</h4>
                  <p className="text-xs text-padayal-muted">We have sent a gentle confirmation to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <label htmlFor="newsletter-email" className="block text-xs font-semibold text-padayal-text mb-2">
                      Email address
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="you@nature.co"
                        className="w-full px-5 py-3.5 rounded-full bg-white border border-black/10 text-sm text-padayal-text focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-padayal-cta text-white font-medium text-sm hover:bg-padayal-cta-hover transition-colors shrink-0 shadow-none"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="flex items-center gap-2 text-xs text-padayal-muted cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-padayal-cta focus:ring-padayal-cta/30" />
                      <span>Also send the weekly seasonal digest</span>
                    </label>
                    <p className="text-[11px] text-padayal-muted/80 leading-relaxed pt-1">
                      We keep your address in one place and never trade it. Unsubscribe at any time.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 9. LOCATION & HOURS IN SINGANALLUR */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.04] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-padayal-cta uppercase tracking-widest">
                  ✦ VISIT US IN COIMBATORE
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-padayal-text tracking-tight">
                  Singanallur kitchen & dining hall
                </h3>
                <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
                  Join us on Kamaraj Road for unhurried South Indian dining on fresh plantain leaves.
                </p>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-padayal-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-padayal-primary shrink-0 mt-0.5" />
                  <span>{RESTAURANT_INFO.location.fullAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-padayal-primary shrink-0" />
                  <span>Daily: {RESTAURANT_INFO.displayHours} (Feast lunch: 12:00 - 3:30 PM)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-padayal-cta shrink-0" />
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-padayal-cta font-medium hover:underline">
                    {RESTAURANT_INFO.displayPhone}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/reservation"
                  className="px-6 py-3 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover transition-colors shadow-none"
                >
                  Book your table
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-[#FAF8F5] text-padayal-text text-xs sm:text-sm font-medium border border-black/[0.08] hover:bg-black/[0.02] transition-colors"
                >
                  Get driving directions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-sm aspect-[16/10] bg-padayal-bg">
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

    </div>
  );
}
