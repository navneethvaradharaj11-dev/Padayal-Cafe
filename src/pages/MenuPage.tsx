import { useState, useEffect, useMemo } from 'react';
import { Search, ChefHat, Flame, Clock, Plus, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { MenuItem as AppMenuItem, MenuCategory, DietaryPreference } from '../types/menu';
import placeholderImage from '../assets/placeholder.svg';
import { MenuItem as DbMenuItem } from '../types/database';
import { formatCurrency } from '../utils/formatCurrency';

import { MenuItemSkeleton } from '../components/ui/Skeleton';

const CATEGORY_TABS: { id: MenuCategory; label: string; tamil: string }[] = [
  { id: 'all', label: 'All Dishes', tamil: 'அனைத்தும்' },
  { id: 'mains', label: 'Natural Meals', tamil: 'இயற்கை விருந்து' },
  { id: 'specials', label: 'Traditional Tiffin', tamil: 'அவல் & சிற்றுண்டி' },
  { id: 'salads', label: 'Sprouts & Pachadi', tamil: 'முளைகட்டிய பயறு' },
  { id: 'soups', label: 'Herbal Soups & Rasam', tamil: 'மூலிகை சாறு' },
  { id: 'beverages', label: 'Cold Press & Elixirs', tamil: 'இளநீர் & பானங்கள்' },
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
    healthBenefits: ['Red Rice Aval', 'Fresh Coconut'],
    ingredients: ['Red Rice Aval', 'Grated Coconut', 'Native Ginger', 'Curry Leaves', 'Coriander'],
  },
  {
    id: 'navadhanya-protein-sprouts',
    name: 'Navadhanya Live Protein Sprouts Salad',
    category: 'salads',
    description: 'Nine sprouted native pulses tossed with tender cucumber slices, pomegranate gems, native carrot shreds, and cold-pressed lime-ginger dressing.',
    price: 180,
    calories: 210,
    preparationTime: 8,
    protein: 16,
    imageUrl: '/images/food/sprouts-salad.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Sprouted Pulses', 'Fresh Produce'],
    ingredients: ['Sprouted Green Gram', 'Cowpeas', 'Native Carrot', 'Pomegranate', 'Lemon'],
  },
  {
    id: 'coconut-elixir-lemongrass',
    name: 'Tender Coconut & Lemongrass Herbal Elixir',
    category: 'beverages',
    description: 'Cold extract of Pollachi tender coconut water, wild lemongrass, ginger root, and natural unrefined palm nectar. Pure refreshing nectar.',
    price: 130,
    calories: 85,
    preparationTime: 4,
    protein: 2,
    imageUrl: '/images/food/coconut-elixir.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'chef-special'],
    healthBenefits: ['Pollachi Coconut', 'No Refined Sugar'],
    ingredients: ['Tender Coconut Water', 'Lemongrass', 'Ginger Juice', 'Palm Nectar'],
  },
  {
    id: 'mudakathan-soup',
    name: 'Mudakathan & Sprouted Fenugreek Cold Soup',
    category: 'soups',
    description: 'Traditional native balloon vine (Mudakathan) extract blended with sprouted fenugreek, pepper essence, cumin, and coconut cream.',
    price: 140,
    calories: 95,
    preparationTime: 6,
    protein: 4,
    imageUrl: '/images/food/mudakathan-soup.jpg',
    isAvailable: true,
    isFeatured: false,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Native Herbs', 'Sprouted Fenugreek'],
    ingredients: ['Mudakathan Leaves', 'Fenugreek Sprouts', 'Cumin', 'Black Pepper', 'Coconut Cream'],
  },
  {
    id: 'tender-coconut-payasam',
    name: 'Tender Coconut Pulp & Palm Nectar Payasam',
    category: 'desserts',
    description: 'Velvety raw dessert of young coconut pulp, cardamom infusion, crushed almonds, and unrefined country palm jaggery. Absolutely no dairy or refined sugar.',
    price: 160,
    calories: 190,
    preparationTime: 5,
    protein: 4,
    imageUrl: '/images/food/tender-coconut-payasam.jpg',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Zero Refined Sugar', 'Plant Based Sweet'],
    ingredients: ['Tender Coconut Meat', 'Palm Jaggery', 'Green Cardamom', 'Crushed Almonds'],
  },
  {
    id: 'tulsi-mint-shot',
    name: 'Wild Amla, Holy Basil & Mint Cold Press',
    category: 'beverages',
    description: 'Handcrafted cold extraction of native wild gooseberry, garden holy basil (Tulsi), spearmint, and raw forest honey.',
    price: 120,
    calories: 65,
    preparationTime: 4,
    protein: 1,
    imageUrl: '/images/food/tulsi-mint-shot.jpg',
    isAvailable: true,
    isFeatured: false,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Wild Amla & Tulsi', 'Pure Herbs'],
    ingredients: ['Wild Amla', 'Tulsi', 'Fresh Mint', 'Forest Raw Honey'],
  },
  {
    id: 'cucumber-pomegranate-pachadi',
    name: 'Country Cucumber & Fresh Curd-Free Pachadi',
    category: 'salads',
    description: 'Crisp native country cucumbers diced with pomegranate arils, coconut milk dressing, curry leaves, and green chilli hint.',
    price: 140,
    calories: 110,
    preparationTime: 5,
    protein: 3,
    imageUrl: '/images/food/cucumber-pachadi.jpg',
    isAvailable: true,
    isFeatured: false,
    dietaryTags: ['no-oil', 'fire-free', 'plant-based', 'gluten-free'],
    healthBenefits: ['Hydrating & Refreshing', 'High Fibre'],
    ingredients: ['Country Cucumber', 'Pomegranate', 'Coconut Extract', 'Curry Leaves', 'Lemon'],
  },
];

export function MenuPage() {
  const { openCustomizer } = useCart();
  const [items, setItems] = useState<AppMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference | 'all'>('all');

  useEffect(() => {
    async function loadMenu() {
      try {
        const { data, error } = await supabase.from('menu_items').select('*');
        if (error || !data || data.length === 0) {
          setItems(AUTHENTIC_MENU_ITEMS);
        } else {
          const mapped: AppMenuItem[] = (data as DbMenuItem[]).map((d) => ({
            id: d.id,
            name: d.name,
            category: (d.category as MenuCategory) || 'mains',
            description: d.description || '',
            price: d.price,
            calories: d.calories ?? undefined,
            preparationTime: d.preparation_time ?? undefined,
            protein: d.protein ?? undefined,
            imageUrl: d.image_url || placeholderImage,
            isAvailable: d.is_available ?? true,
            isFeatured: d.is_featured ?? false,
            dietaryTags: ['no-oil', 'fire-free', 'plant-based'],
            healthBenefits: d.health_benefits || ['No Cooking Oil', 'Natural Ingredients'],
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

    loadMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients?.some((ing) => ing.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      const matchesDietary =
        selectedDietary === 'all' || item.dietaryTags.includes(selectedDietary);

      return matchesSearch && matchesCategory && matchesDietary;
    });
  }, [items, searchQuery, selectedCategory, selectedDietary]);

  return (
    <div className="min-h-screen pb-20 bg-padayal-bg">
      
      {/* Hero Header */}
      <section className="relative py-12 sm:py-16 bg-[#183620] text-white overflow-hidden border-b border-[#234c2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cream-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> 100% Unboiled & Zero-Oil South Indian Menu
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-white">
            Natural Food Dining Menu
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 max-w-xl mx-auto leading-relaxed">
            Wholesome dishes handcrafted fresh to order using tender coconut extracts, sprouted grains, native herbs, and natural palm sweeteners.
          </p>
        </div>
      </section>

      {/* Sticky Search & Filter Controls */}
      <section className="sticky top-16 sm:top-20 z-30 bg-padayal-surface/98 backdrop-blur-md border-b border-padayal-bg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
          
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-padayal-muted" />
            <input
              type="text"
              placeholder="Search natural meals, aval tiffin, elixirs, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary font-medium"
            />
          </div>

          {/* Categories Tab Bar (Scrollable on mobile, flex on desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-padayal-primary text-white shadow-sm ring-2 ring-padayal-primary/20'
                      : 'bg-padayal-bg text-padayal-text/80 hover:text-padayal-primary hover:bg-padayal-secondary-light/60'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-padayal-bg/60">
            {DIETARY_PILLS.map((pill) => {
              const isSelected = selectedDietary === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedDietary(pill.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-padayal-cta/15 text-padayal-cta border-padayal-cta font-bold'
                      : 'bg-transparent text-padayal-muted border-padayal-bg hover:border-padayal-secondary/40'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Menu Grid Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <MenuItemSkeleton key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-padayal-surface rounded-3xl p-12 text-center shadow-organic border border-padayal-bg max-w-md mx-auto my-12 space-y-3">
            <ChefHat className="w-12 h-12 mx-auto text-padayal-muted opacity-40" />
            <h3 className="font-editorial text-xl font-bold text-padayal-text">No dishes found</h3>
            <p className="text-xs sm:text-sm text-padayal-muted">
              We couldn't find any items matching "{searchQuery}". Try searching for aval, sprouts, coconut elixir, or payasam.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="btn-secondary text-xs py-2 px-5 mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => openCustomizer(item)}
                className="group relative bg-padayal-surface rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300 border border-padayal-bg flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-padayal-bg">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-padayal-text/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-padayal-primary shadow-sm border border-padayal-secondary/20">
                      🌿 No Oil
                    </span>

                    <span className="absolute bottom-2.5 right-2.5 bg-padayal-cta text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                      Customize
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.healthBenefits?.slice(0, 2).map((benefit, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-padayal-secondary-light text-padayal-primary text-[10px] font-semibold">
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-padayal-text group-hover:text-padayal-primary transition-colors line-clamp-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-padayal-muted line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Calories & prep info */}
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
                <div className="p-4 pt-2 border-t border-padayal-bg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-padayal-muted block font-medium">Price</span>
                    <span className="text-base sm:text-lg font-extrabold text-padayal-text">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCustomizer(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-padayal-cta text-white font-bold text-xs hover:bg-padayal-cta-hover active:scale-95 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Customize</span>
                  </button>
                </div>

              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
