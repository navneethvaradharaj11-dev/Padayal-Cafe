import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChefHat, Flame, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MenuItem, MenuCategory, CATEGORY_LABELS } from '../types/database';
import { MenuItemSkeleton } from '../components/ui/Skeleton';

const CATEGORIES: MenuCategory[] = ['starters', 'mains', 'soups', 'salads', 'desserts', 'beverages', 'specials'];

export function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category')
          .order('name');

        if (error) throw error;
        setMenuItems(data || []);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients?.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesAvailability = !showOnlyAvailable || item.is_available;
      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [menuItems, searchQuery, selectedCategory, showOnlyAvailable]);

  const groupedItems = useMemo(() => {
    const groups: Record<MenuCategory, MenuItem[]> = {} as Record<MenuCategory, MenuItem[]>;
    CATEGORIES.forEach(cat => {
      groups[cat] = [];
    });
    filteredItems.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    return groups;
  }, [filteredItems]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-forest-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="heading-xl text-white mb-4">Our Menu</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each prepared without oil to
            preserve maximum nutrition and natural flavors.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-grow max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-end">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-earth-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as MenuCategory | 'all')}
                  className="select-field"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyAvailable}
                  onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                  className="w-5 h-5 rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                />
                <span className="text-sm text-earth-700">Available only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <MenuItemSkeleton key={i} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="w-16 h-16 mx-auto mb-4 text-earth-300" />
              <h3 className="heading-sm text-earth-600 mb-2">No dishes found</h3>
              <p className="text-earth-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-12">
              {CATEGORIES.map((category) => {
                const items = groupedItems[category];
                if (items.length === 0) return null;

                return (
                  <div key={category} id={category}>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="heading-md text-earth-800">
                        {CATEGORY_LABELS[category]}
                      </h2>
                      <div className="flex-grow h-px bg-earth-200" />
                      <span className="text-sm text-earth-500">
                        {items.length} item{items.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((item) => (
                        <div key={item.id} className="card overflow-hidden group">
                          <div className="aspect-video overflow-hidden bg-cream-100">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ChefHat className="w-16 h-16 text-earth-300" />
                              </div>
                            )}
                            {!item.is_available && (
                              <div className="absolute inset-0 bg-earth-900/60 flex items-center justify-center">
                                <span className="badge badge-error">Currently Unavailable</span>
                              </div>
                            )}
                          </div>

                          <div className="p-5">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-semibold text-lg text-earth-800">
                                {item.name}
                              </h3>
                              <span className="text-xl font-bold text-forest-700 shrink-0">
                                ₹{item.price}
                              </span>
                            </div>

                            <p className="text-sm text-earth-500 mb-4 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-xs text-earth-400 mb-4">
                              {item.calories && (
                                <div className="flex items-center gap-1">
                                  <Flame className="w-4 h-4" />
                                  <span>{item.calories} cal</span>
                                </div>
                              )}
                              {item.preparation_time && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{item.preparation_time} mins</span>
                                </div>
                              )}
                              {item.protein && (
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">P:</span>
                                  <span>{item.protein}g protein</span>
                                </div>
                              )}
                            </div>

                            {item.health_benefits && item.health_benefits.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.health_benefits.slice(0, 2).map((benefit, i) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 bg-forest-50 text-forest-700 rounded-full"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            )}

                            {item.ingredients && item.ingredients.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-earth-100">
                                <p className="text-xs text-earth-400">
                                  <span className="font-medium">Ingredients:</span>{' '}
                                  {item.ingredients.join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
