import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MenuItem, MenuCategory, CATEGORY_LABELS, InsertMenuItem } from '../../types/database';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { MenuItemSkeleton } from '../../components/ui/Skeleton';

const CATEGORIES: MenuCategory[] = ['starters', 'mains', 'soups', 'salads', 'desserts', 'beverages', 'specials'];

export function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'starters' as MenuCategory,
    image_url: '',
    ingredients: '',
    health_benefits: '',
    is_available: true,
    is_featured: false,
    preparation_time: '',
    calories: '',
    protein: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category')
        .order('name');

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }

  function openModal(item?: MenuItem) {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description || '',
        price: item.price.toString(),
        category: item.category,
        image_url: item.image_url || '',
        ingredients: item.ingredients?.join(', ') || '',
        health_benefits: item.health_benefits?.join(', ') || '',
        is_available: item.is_available,
        is_featured: item.is_featured,
        preparation_time: item.preparation_time?.toString() || '',
        calories: item.calories?.toString() || '',
        protein: item.protein?.toString() || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'starters',
        image_url: '',
        ingredients: '',
        health_benefits: '',
        is_available: true,
        is_featured: false,
        preparation_time: '',
        calories: '',
        protein: '',
      });
    }
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const itemData: Partial<InsertMenuItem> = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url || null,
        ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()) : null,
        health_benefits: formData.health_benefits ? formData.health_benefits.split(',').map(h => h.trim()) : null,
        is_available: formData.is_available,
        is_featured: formData.is_featured,
        preparation_time: formData.preparation_time ? parseInt(formData.preparation_time) : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        protein: formData.protein ? parseFloat(formData.protein) : null,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(itemData)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([itemData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(item: MenuItem) {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', item.id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <MenuItemSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg text-earth-800">Menu Items</h1>
          <p className="text-earth-600 mt-1">Manage your restaurant menu</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-earth-100 shrink-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-earth-300">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-earth-800">{item.name}</h3>
                    <p className="text-sm text-earth-500">{CATEGORY_LABELS[item.category]}</p>
                  </div>
                  <p className="font-bold text-forest-700">₹{item.price}</p>
                </div>
                <p className="text-sm text-earth-400 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`badge ${item.is_available ? 'badge-success' : 'badge-error'}`}>
                    {item.is_available ? 'Available' : 'Unavailable'}
                  </span>
                  {item.is_featured && <span className="badge badge-info">Featured</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-earth-100">
              <button onClick={() => openModal(item)} className="btn-secondary flex-1 py-2">
                <Edit2 className="w-4 h-4 mr-1" /> Edit
              </button>
              <button onClick={() => deleteItem(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-earth-900/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8 relative animate-scale-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-earth-400 hover:text-earth-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="heading-md text-earth-800 mb-6">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                  className="select-field"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Ingredients (comma separated)</label>
                  <input
                    type="text"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Health Benefits (comma separated)</label>
                  <input
                    type="text"
                    value={formData.health_benefits}
                    onChange={(e) => setFormData({ ...formData, health_benefits: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Prep Time (mins)</label>
                  <input
                    type="number"
                    value={formData.preparation_time}
                    onChange={(e) => setFormData({ ...formData, preparation_time: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Calories</label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.protein}
                    onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    className="w-5 h-5 rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                  />
                  <span className="text-sm text-earth-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-5 h-5 rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                  />
                  <span className="text-sm text-earth-700">Featured</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" /> Saving...
                    </span>
                  ) : (
                    <><Save className="w-4 h-4 mr-1" /> Save</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function UtensilsCrossed({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2L6 12l4 4 10-10z" />
      <path d="M21 21L14 14" />
      <path d="M8 16l-4 4" />
      <path d="M3 21l5-5" />
      <path d="M10 10l4-4" />
    </svg>
  );
}
