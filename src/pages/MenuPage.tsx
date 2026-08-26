import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChefHat, Flame, Clock, Plus, Sparkles, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { MenuItem as AppMenuItem, MenuCategory, DietaryPreference } from '../types/menu';
import { formatCurrency } from '../utils/formatCurrency';
import { MenuItemSkeleton } from '../components/ui/Skeleton';

const CATEGORY_TABS: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Catalog' },
  { id: 'salads', label: 'Raw Salads' },
  { id: 'mains', label: 'Pranic Mains' },
  { id: 'beverages', label: 'Cold Press & Elixirs' },
  { id: 'desserts', label: 'Raw Desserts' },
  { id: 'soups', label: 'Herbal Soups' },
  { id: 'specials', label: 'Chef Specials' },
];

const DIETARY_PILLS: { id: DietaryPreference | 'all'; label: string }[] = [
  { id: 'all', label: 'All Preferences' },
  { id: 'no-oil', label: '🌿 No Oil' },
  { id: 'fire-free', label: '🔥 Fire-Free' },
  { id: 'raw-vegan', label: '🥑 Raw Vegan' },
  { id: 'gluten-free', label: '🌾 Gluten-Free' },
  { id: 'chef-special', label: '⭐ Chef Special' },
];

const MOCK_ITEMS: AppMenuItem[] = [
  {
    id: 'm1',
    name: 'Pranic Sprouted Mung Salad',
    category: 'salads',
    description: 'Fresh sprouted green gram infused with raw coconut milk dressing, curry leaves, and sun-dried Himalayan pink salt. 100% Fire-Free.',
    price: 240,
    calories: 180,
    preparationTime: 10,
    protein: 12,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'raw-vegan', 'gluten-free'],
    healthBenefits: ['High Enzyme', 'Zero Oil', 'Easy Digestion'],
    ingredients: ['Sprouted Green Gram', 'Raw Coconut Milk', 'Curry Leaves', 'Lemon', 'Himalayan Salt'],
  },
  {
    id: 'm2',
    name: 'Harvest Cucumber & Microgreen Bowl',
    category: 'salads',
    description: 'Crisp native cucumbers, organic microgreens, pomegranate seeds, and lemon-coriander raw dressing.',
    price: 220,
    calories: 140,
    preparationTime: 10,
    protein: 6,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'raw-vegan', 'gluten-free'],
    healthBenefits: ['Hydrating', 'Detoxifying'],
    ingredients: ['Native Cucumber', 'Microgreens', 'Pomegranate', 'Lemon Juice'],
  },
  {
    id: 'm3',
    name: 'Raw Coconut & Lemongrass Elixir',
    category: 'beverages',
    description: 'Pressed tender coconut water blended with organic lemongrass, ginger juice, and natural palm nectar.',
    price: 160,
    calories: 90,
    preparationTime: 5,
    protein: 2,
    imageUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'raw-vegan', 'chef-special'],
    healthBenefits: ['Electrolyte Balance', 'Immunity Boost'],
    ingredients: ['Tender Coconut Water', 'Lemongrass', 'Fresh Ginger', 'Palm Nectar'],
  },
  {
    id: 'm4',
    name: 'Raw Dates & Nut Energy Delights',
    category: 'desserts',
    description: 'Handcrafted raw truffles made of crushed Medjool dates, almonds, cardamom, and coconut flakes. No added sugar.',
    price: 190,
    calories: 210,
    preparationTime: 5,
    protein: 8,
    imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'raw-vegan', 'gluten-free'],
    healthBenefits: ['Natural Energy', 'Zero Sugar'],
    ingredients: ['Medjool Dates', 'Almonds', 'Cardamom', 'Raw Coconut Flakes'],
  },
  {
    id: 'm5',
    name: 'Herbal Mint & Basil Cold Press',
    category: 'beverages',
    description: 'Fresh holy basil (Tulsi), mint leaves, raw honey, and green apple cold pressed to perfection.',
    price: 150,
    calories: 85,
    preparationTime: 5,
    protein: 1,
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    dietaryTags: ['no-oil', 'fire-free', 'raw-vegan', 'gluten-free'],
    healthBenefits: ['Respiratory Care', 'Anti-inflammatory'],
    ingredients: ['Tulsi', 'Mint', 'Green Apple', 'Raw Honey'],
  },
  {
    id: 'm6',
    name: 'Pranic Banana & Flaxseed Smoothie Bowl',
    category: 'specials',
    description: 'Creamy raw banana puree topped with soaked chia seeds, golden flaxseeds, and sun-dried figs.',
    price: 260,
    calories: 230,
    preparationTime: 8,
    protein: 9,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    dietaryTags: ['no-oil', 'fire-free', 'raw-vegan', 'chef-special'],
    healthBenefits: ['Omega-3 Rich', 'Gut Health'],
    ingredients: ['Hill Banana', 'Chia Seeds', 'Flaxseeds', 'Dried Figs'],
  }
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
          setItems(MOCK_ITEMS);
        } else {
          // Map DB items to AppMenuItem structure
          const mapped: AppMenuItem[] = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            category: d.category || 'mains',
            description: d.description || '',
            price: d.price,
            calories: d.calories,
            preparationTime: d.preparation_time,
            protein: d.protein,
            imageUrl: d.image_url || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
            isAvailable: d.is_available ?? true,
            isFeatured: d.is_featured ?? false,
            dietaryTags: ['no-oil', 'fire-free', 'raw-vegan'],
            healthBenefits: d.health_benefits || ['Live Enzymes', 'Pranic Energy'],
            ingredients: d.ingredients || [],
          }));
          setItems(mapped);
        }
      } catch {
        setItems(MOCK_ITEMS);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
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
    <div className="min-h-screen pb-24">
      
      {/* Hero Banner */}
      <section className="relative py-8 sm:py-14 bg-padayal-text text-padayal-surface overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1920&q=80"
            alt="Padayal Raw Menu"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4 relative z-10 text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-padayal-primary/80 backdrop-blur-md text-padayal-surface text-[11px] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 100% Fire-Free Experience
          </span>
          <h1 className="font-pranic text-2xl sm:text-4xl font-bold tracking-tight mb-1.5">
            Gourmet Pranic Catalog
          </h1>
          <p className="font-sans text-xs sm:text-sm text-padayal-bg/90 max-w-md mx-auto leading-relaxed">
            Handcrafted raw dishes prepared without oil, boiling, or artificial heat to preserve live enzymes.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar & Controls */}
      <section className="sticky top-[53px] z-30 bg-padayal-surface/98 backdrop-blur-md border-b border-padayal-bg shadow-sm">
        <div className="px-4 py-2.5 space-y-2.5">
          
          {/* Search Input */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-padayal-muted" />
              <input
                type="text"
                placeholder="Search raw salads, elixirs, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-padayal-primary font-medium"
              />
            </div>
          </div>

          {/* Category Horizontal Scroll Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-padayal-primary text-padayal-surface shadow-sm'
                      : 'bg-padayal-bg text-padayal-muted hover:text-padayal-text'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dietary Preference Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-padayal-bg/60">
            {DIETARY_PILLS.map((pill) => {
              const isSelected = selectedDietary === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedDietary(pill.id)}
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-padayal-cta/15 text-padayal-cta border-padayal-cta'
                      : 'bg-transparent text-padayal-muted border-padayal-bg'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Menu Grid */}
      <section className="px-4 py-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <MenuItemSkeleton key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-padayal-surface rounded-2xl p-8 text-center shadow-organic border border-padayal-bg max-w-xs mx-auto my-8">
            <ChefHat className="w-10 h-10 mx-auto text-padayal-muted mb-2 opacity-40" />
            <h3 className="font-pranic text-base font-bold text-padayal-text">No dishes found</h3>
            <p className="text-xs text-padayal-muted mt-1">Try clearing your search query or dietary filters.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDietary('all'); }}
              className="btn-secondary text-xs mt-3 py-1.5 px-3"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => openCustomizer(item)}
                className="group relative bg-padayal-surface rounded-2xl p-4 shadow-organic hover:shadow-organic-lg transition-all duration-300 border border-padayal-bg flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-padayal-bg mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-padayal-text/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-padayal-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-padayal-primary shadow-sm border border-padayal-secondary/20">
                      🌿 No Oil
                    </span>

                    <span className="absolute bottom-2.5 right-2.5 bg-padayal-cta text-padayal-surface text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                      Tap to Customize
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.healthBenefits?.slice(0, 2).map((benefit, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-padayal-secondary-light text-padayal-primary text-[10px] font-semibold">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Name & Description */}
                  <h3 className="font-pranic text-lg font-bold text-padayal-text group-hover:text-padayal-primary transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-padayal-muted mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Prep info */}
                  <div className="flex items-center gap-3 text-[11px] text-padayal-muted mt-3">
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

                {/* Footer: Price & Add Button */}
                <div className="mt-4 pt-3 border-t border-padayal-bg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-padayal-muted block font-semibold">Price</span>
                    <span className="text-lg font-extrabold text-padayal-text">{formatCurrency(item.price)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCustomizer(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-padayal-cta text-padayal-surface font-semibold text-xs hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-95 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Customize
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
