import { useState, useEffect, useMemo } from 'react';
import { Search, ChefHat, Flame, Clock, Plus, Sparkles, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { MenuItem as AppMenuItem, MenuCategory, DietaryPreference } from '../types/menu';
import placeholderImage from '../assets/placeholder.svg';
import { MenuItem as DbMenuItem } from '../types/database';
import { formatCurrency } from '../utils/formatCurrency';
import { MenuItemSkeleton } from '../components/ui/Skeleton';
import { TiltCard3D } from '../components/3d/TiltCard3D';

const CATEGORY_TABS: { id: MenuCategory; label: string; tamil: string }[] = [
  { id: 'all', label: 'All Dishes', tamil: 'அனைத்தும்' },
  { id: 'mains', label: 'Plantain Leaf Feasts', tamil: 'இயற்கை விருந்து' },
  { id: 'specials', label: 'Heritage Tiffin', tamil: 'அவல் & சிற்றுண்டி' },
  { id: 'salads', label: 'Sprouts & Bowls', tamil: 'முளைகட்டிய பயறு' },
  { id: 'soups', label: 'Herbal Soups', tamil: 'மூலிகை சாறு' },
  { id: 'beverages', label: 'Native Elixirs', tamil: 'இளநீர் & பானங்கள்' },
  { id: 'desserts', label: 'Natural Sweets', tamil: 'இயற்கை இனிப்பு' },
];

const DIETARY_PILLS: { id: DietaryPreference | 'all'; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'no-oil', label: '🌿 No Oil' },
  { id: 'fire-free', label: '🔥 Fire-Free' },
  { id: 'plant-based', label: '🥥 Plant Based' },
  { id: 'gluten-free', label: '🌾 Gluten-Free' },
  { id: 'chef-special', label: '⭐ Signature' },
];

const AUTHENTIC_MENU_ITEMS: AppMenuItem[] = [
  {
    id: 'padayal-raja-virundhu',
    name: 'Padayal Traditional Raja Virundhu (Plantain Leaf Meal)',
    category: 'mains',
    description: 'The complete South Indian unboiled feast: Seasoned red aval, sprouted moong kootu, raw coconut milk rasam, cucumber pachadi, live salad, and palm jaggery payasam.',
    price: 240,
    calories: 360,
    preparationTime: 10,
    protein: 14,
    imageUrl: '/images/food/raja-virundhu.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'chef-special'],
    healthBenefits: ['No Cooking Oil', 'Whole Grains', 'Traditional Thali'],
    ingredients: ['Red Aval', 'Sprouted Moong', 'Tender Coconut Milk', 'Curry Leaves', 'Lemon', 'Himalayan Salt'],
  },
  {
    id: 'seasoned-aval-tiffin',
    name: 'Coconut & Spiced Aval Tiffin Plate',
    category: 'specials',
    description: 'Traditional flattened red rice tossed with fresh scraped Pollachi coconut, finely minced ginger, curry leaves, crushed black pepper, and coriander relish.',
    price: 150,
    calories: 220,
    preparationTime: 6,
    protein: 6,
    imageUrl: '/images/food/spiced-aval-tiffin.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based'],
    healthBenefits: ['Zero Oil', 'Easy Digest', 'Whole Grain Aval'],
    ingredients: ['Red Aval', 'Fresh Coconut', 'Curry Leaves', 'Ginger', 'Green Chilli', 'Coriander'],
  },
  {
    id: 'sprouted-navadhanya-bowl',
    name: 'Navadhanya Sprouted Pulses Live Protein Bowl',
    category: 'salads',
    description: 'Nine sprouted native pulses tossed with freshly scraped coconut, sweet pomegranate pearls, country coriander, and fresh lime-ginger dressing.',
    price: 180,
    calories: 210,
    preparationTime: 5,
    protein: 16,
    imageUrl: '/images/food/sprouts-salad.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Live Enzymes', 'Zero Cooking Oil', 'High Plant Protein'],
    ingredients: ['Green Gram Sprouts', 'Cowpeas', 'Fresh Coconut', 'Pomegranate', 'Lemon Juice', 'Mint'],
  },
  {
    id: 'cucumber-coconut-pachadi',
    name: 'Vellari (Cucumber) & Coconut Pachadi Bowl',
    category: 'salads',
    description: 'Crisp country cucumbers tossed with ground coconut-mustard relish, curry leaves, green chillies, and pink rock salt.',
    price: 120,
    calories: 110,
    preparationTime: 5,
    protein: 3,
    imageUrl: '/images/food/cucumber-pachadi.jpg',
    isAvailable: true,
    isFeatured: false,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Hydrating', 'Alkaline', 'Cooling Digestion'],
    ingredients: ['Coimbatore Country Cucumber', 'Fresh Coconut', 'Mustard Seed Paste', 'Curry Leaves'],
  },
  {
    id: 'pollachi-tender-coconut-elixir',
    name: 'Pollachi Tender Coconut & Lemongrass Elixir',
    category: 'beverages',
    description: 'Naturally sweet Pollachi tender coconut water cold-infused with fresh lemongrass stalks, ginger root extract, and pure palm nectar.',
    price: 130,
    calories: 85,
    preparationTime: 4,
    protein: 1,
    imageUrl: '/images/food/coconut-elixir.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Pollachi Elaneer', 'Natural Electrolytes', 'Zero Sugar'],
    ingredients: ['Tender Coconut Water', 'Lemongrass', 'Ginger Extract', 'Palm Nectar'],
  },
  {
    id: 'mudakathan-herbal-soup',
    name: 'Cold-Extracted Mudakathan Joint-Care Soup',
    category: 'soups',
    description: 'Cold-pressed wild balloon vine (mudakathan) greens blended with country black pepper, roasted cumin powder, and Himalayan rock salt.',
    price: 110,
    calories: 45,
    preparationTime: 5,
    protein: 2,
    imageUrl: '/images/food/mudakathan-soup.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Joint Care Herb', 'Zero Stove Heat', 'Traditional Remedy'],
    ingredients: ['Mudakathan Keerai', 'Black Pepper', 'Cumin', 'Himalayan Salt'],
  },
  {
    id: 'tulsi-mint-prana-shot',
    name: 'Wild Sacred Tulsi & Mint Prana Shot',
    category: 'beverages',
    description: 'Cold-extracted sacred holy basil (tulsi), country mint, black pepper, and pure unheated forest honey nectar.',
    price: 90,
    calories: 55,
    preparationTime: 3,
    protein: 1,
    imageUrl: '/images/food/tulsi-mint-shot.jpg',
    isAvailable: true,
    isFeatured: false,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Immunity Booster', 'Throat Soother', 'Fresh Herbs'],
    ingredients: ['Krishna Tulsi', 'Spearmint', 'Pepper', 'Raw Forest Honey'],
  },
  {
    id: 'tender-coconut-payasam',
    name: 'Elaneer & Palm Jaggery Payasam',
    category: 'desserts',
    description: 'Velvety unboiled traditional dessert made with fresh young coconut pulp, ground cashew milk, crushed cardamom, and unrefined palm jaggery.',
    price: 160,
    calories: 190,
    preparationTime: 5,
    protein: 4,
    imageUrl: '/images/food/tender-coconut-payasam.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free', 'chef-special'],
    healthBenefits: ['Zero Refined Sugar', 'Tender Coconut Pulp', 'Raw Vegan Sweet'],
    ingredients: ['Young Coconut Pulp', 'Palm Jaggery', 'Ground Cashew Milk', 'Cardamom', 'Almond Slivers'],
  },
];

export function MenuPage() {
  const [items, setItems] = useState<AppMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference | 'all'>('all');
  const { openCustomizer } = useCart();

  useEffect(() => {
    async function fetchDishes() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true);

        if (error || !data || data.length === 0) {
          setItems(AUTHENTIC_MENU_ITEMS);
        } else {
          const mapped: AppMenuItem[] = (data as DbMenuItem[]).map((d) => ({
            id: d.id,
            name: d.name,
            category: d.category as MenuCategory,
            description: d.description,
            price: d.price,
            calories: d.calories,
            preparationTime: d.preparation_time,
            protein: d.protein,
            imageUrl: d.image_url || placeholderImage,
            isAvailable: d.is_available,
            isFeatured: d.is_featured,
            dietaryTags: ['no-oil', 'fire-free', 'plant-based'],
            healthBenefits: d.health_benefits || ['No Cooking Oil', 'Freshly Prepared'],
            ingredients: d.ingredients || [],
          }));
          setItems(mapped);
        }
      } catch {
        setItems(AUTHENTIC_MENU_ITEMS);
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients?.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      const matchesDietary =
        selectedDietary === 'all' || item.dietaryTags.includes(selectedDietary);

      return matchesSearch && matchesCategory && matchesDietary;
    });
  }, [items, searchQuery, selectedCategory, selectedDietary]);

  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Header */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>NO OIL • NO BOIL • LIVING FOOD</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Menu<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            a light, unboiled dining tradition
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Wholesome dishes handcrafted fresh daily in Coimbatore using cold-pressed coconut extracts, sprouted grains, native herbs, and natural palm nectar.
          </p>
        </div>
      </section>

      {/* Sticky Search & Filter Controls (Meadowlark Style) */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-black/[0.05] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
          
          {/* Meadowlark Search Pill Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-padayal-muted" />
            <input
              type="text"
              placeholder="Search dishes, aval tiffin, elixirs, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-black/[0.08] text-xs sm:text-sm text-padayal-text placeholder:text-padayal-muted/70 focus:outline-none focus:ring-2 focus:ring-padayal-primary/20 shadow-sm"
            />
          </div>

          {/* Categories Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 justify-start sm:justify-center">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-padayal-cta text-white shadow-sm'
                      : 'bg-white text-padayal-text/75 hover:text-padayal-text hover:bg-black/[0.03] border border-black/[0.04]'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 justify-start sm:justify-center">
            {DIETARY_PILLS.map((pill) => {
              const isSelected = selectedDietary === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedDietary(pill.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#F2F5EB] text-padayal-primary border-padayal-primary font-bold'
                      : 'bg-transparent text-padayal-muted border-black/[0.06] hover:border-black/20'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Menu Grid Container with 3D Tilt Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <MenuItemSkeleton key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-black/[0.04] max-w-md mx-auto my-12 space-y-3">
            <ChefHat className="w-12 h-12 mx-auto text-padayal-muted opacity-40" />
            <h3 className="font-editorial text-2xl font-normal text-padayal-text">No dishes found</h3>
            <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
              We couldn't find any items matching "{searchQuery}". Try searching for aval, sprouts, coconut elixir, or payasam.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="px-6 py-2.5 rounded-full bg-padayal-cta text-white text-xs font-medium hover:bg-padayal-cta-hover transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <TiltCard3D key={item.id} maxTilt={8} scale={1.03} className="h-full">
                <article
                  onClick={() => openCustomizer(item)}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/[0.04] flex flex-col justify-between cursor-pointer p-4 h-full"
                >
                  <div>
                    {/* Photo & Badges (4:3 aspect ratio) */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-padayal-primary shadow-sm">
                        🌿 No Oil
                      </span>

                      <span className="absolute bottom-2.5 right-2.5 bg-padayal-cta text-white text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                        Customize
                      </span>
                    </div>

                    <div className="pt-4 space-y-2">
                      {/* Health Tags */}
                      <div className="flex flex-wrap gap-1">
                        {item.healthBenefits?.slice(0, 2).map((benefit, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-[#F2F5EB] text-padayal-primary text-[10px] font-semibold">
                            {benefit}
                          </span>
                        ))}
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-editorial text-base sm:text-lg font-normal text-padayal-text group-hover:text-padayal-primary transition-colors line-clamp-1 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-padayal-muted line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Prep Info */}
                      <div className="flex items-center gap-3 text-[11px] text-padayal-muted pt-1">
                        {item.calories && (
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-padayal-cta" /> {item.calories} cal
                          </span>
                        )}
                        {item.preparationTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {item.preparationTime} mins
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Add Button */}
                  <div className="pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-padayal-muted block font-medium">Price</span>
                      <span className="font-editorial text-base sm:text-lg font-bold text-padayal-text">
                        {formatCurrency(item.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCustomizer(item);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-padayal-cta text-white font-medium text-xs hover:bg-padayal-cta-hover transition-all shadow-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                </article>
              </TiltCard3D>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
