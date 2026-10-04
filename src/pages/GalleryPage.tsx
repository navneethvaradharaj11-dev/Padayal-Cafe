import { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryImage } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: 'g-1',
    title: 'Traditional Plantain Leaf Feast',
    description: 'Authentic South Indian natural lunch spread served on fresh banana leaf with live sprouts, kootu, and raw coconut rasam.',
    image_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    category: 'Meals & Feasts',
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-2',
    title: 'Live Navadhanya Sprouted Pulses',
    description: 'Active sprouted green gram, cowpeas, and native pulses rich in living enzymes.',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    category: 'Sprouts & Salads',
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-3',
    title: 'Cold-Pressed Tender Coconut Elixirs',
    description: 'Harvested fresh from native groves and blended with wild herbs and palm nectar.',
    image_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    category: 'Herbal Elixirs',
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-4',
    title: 'Seasoned Red Aval Delicacy',
    description: 'Traditional flattened red rice tossed with fresh scraped coconut, curry leaves, and black pepper.',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    category: 'Traditional Tiffin',
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-5',
    title: 'Tender Coconut Pulp Payasam',
    description: 'Natural sweet pudding made with tender coconut meat, cardamom, and country palm jaggery.',
    image_url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    category: 'Natural Sweets',
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-6',
    title: 'Eco-Friendly Dining Ambience',
    description: 'Serene dining space celebrating natural bamboo textures and calm South Indian hospitality.',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    category: 'Ambiance',
    is_active: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
];

export function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error || !data || data.length === 0) {
          setImages(FALLBACK_GALLERY);
        } else {
          setImages(data);
        }
      } catch {
        setImages(FALLBACK_GALLERY);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const categories = ['all', ...new Set(images.map((img) => img.category).filter(Boolean))];
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[newIndex]);
    } else {
      const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-padayal-bg">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#183620] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <ImageIcon className="w-10 h-10 text-padayal-secondary mx-auto" />
          <h1 className="font-pranic text-3xl sm:text-5xl font-black text-white tracking-tight">
            Visual Gallery of Padayal
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 max-w-xl mx-auto leading-relaxed">
            Take a visual tour through our plantain leaf presentations, live sprouted creations, and serene dining environment in Coimbatore.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 sm:top-20 z-30 bg-padayal-surface/98 backdrop-blur-md border-b border-padayal-bg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat || 'all'}
                type="button"
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-padayal-primary text-white shadow-sm'
                    : 'bg-padayal-bg text-padayal-muted hover:text-padayal-text'
                }`}
              >
                {cat === 'all' ? 'All Visuals' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="bg-padayal-surface rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300 border border-padayal-bg flex flex-col justify-between cursor-pointer group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-forest-900 relative">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {image.category && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-padayal-primary text-[10px] font-bold shadow-sm">
                      {image.category}
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-pranic text-base font-bold text-padayal-text group-hover:text-padayal-primary transition-colors">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="text-xs text-padayal-muted line-clamp-2 leading-relaxed">
                      {image.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2.5 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            type="button"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-white text-center mt-4 space-y-1 max-w-lg">
              <h3 className="font-pranic text-xl font-bold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-xs sm:text-sm text-cream-300">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
