import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Image } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { GalleryImage, InsertGalleryImage } from '../../types/database';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  }

  function openModal(image?: GalleryImage) {
    if (image) {
      setEditingImage(image);
      setFormData({
        title: image.title,
        description: image.description || '',
        image_url: image.image_url,
        category: image.category || '',
        is_active: image.is_active,
        sort_order: image.sort_order,
      });
    } else {
      setEditingImage(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        category: '',
        is_active: true,
        sort_order: images.length,
      });
    }
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const imageData: Partial<InsertGalleryImage> = {
        title: formData.title,
        description: formData.description || null,
        image_url: formData.image_url,
        category: formData.category || null,
        is_active: formData.is_active,
        sort_order: formData.sort_order,
      };

      if (editingImage) {
        const { error } = await supabase
          .from('gallery')
          .update(imageData)
          .eq('id', editingImage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([imageData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      setSaving(false);
    }
  }

  async function deleteImage(image: GalleryImage) {
    if (!confirm(`Are you sure you want to delete "${image.title}"?`)) return;
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', image.id);
      if (error) throw error;
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  async function toggleActive(image: GalleryImage) {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ is_active: !image.is_active })
        .eq('id', image.id);
      if (error) throw error;
      fetchImages();
    } catch (error) {
      console.error('Error toggling image:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg text-earth-800">Gallery</h1>
          <p className="text-earth-600 mt-1">Manage gallery images</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((image) => (
          <div key={image.id} className="card overflow-hidden group">
            <div className="aspect-square relative">
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {!image.is_active && (
                <div className="absolute inset-0 bg-earth-900/60 flex items-center justify-center">
                  <span className="badge badge-warning">Hidden</span>
                </div>
              )}
              <div className="absolute inset-0 bg-earth-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => openModal(image)}
                  className="p-2 bg-white rounded-lg text-earth-800 hover:bg-cream-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleActive(image)}
                  className={`p-2 rounded-lg ${
                    image.is_active
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <Image className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteImage(image)}
                  className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="font-medium text-earth-800 truncate">{image.title}</p>
              {image.category && (
                <p className="text-xs text-earth-500">{image.category}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="card p-8 text-center text-earth-500">
          No images in gallery. Add some!
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-earth-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-scale-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-earth-400 hover:text-earth-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="heading-md text-earth-800 mb-6">
              {editingImage ? 'Edit Image' : 'Add Image'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://..."
                />
                {formData.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden aspect-video bg-earth-100">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                  placeholder="e.g., food, restaurant, events"
                />
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
                <label className="block text-sm font-medium text-earth-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  className="input-field"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                />
                <span className="text-sm text-earth-700">Active (visible on website)</span>
              </label>

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
