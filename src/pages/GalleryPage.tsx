import { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryImage } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { TiltCard3D } from '../components/3d/TiltCard3D';

const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: 'g-1',
    title: 'Traditional Plantain Leaf Feast',
    description: 'Authentic South Indian natural lunch spread served on fresh banana leaf with live sprouts, kootu, and raw coconut rasam.',
    image_url: '/images/food/raja-virundhu.jpg',
    category: 'Meals & Feasts',
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-2',
    title: 'Live Navadhanya Sprouted Pulses',
    description: 'Active sprouted green gram, cowpeas, and native pulses prepared using traditional soaking and sprouting methods.',
    image_url: '/images/food/sprouts-salad.jpg',
    category: 'Sprouts & Bowls',
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-3',
    title: 'Cold-Pressed Tender Coconut Elixirs',
    description: 'Harvested fresh from native groves and blended with wild herbs and palm nectar.',
    image_url: '/images/food/coconut-elixir.jpg',
    category: 'Herbal Elixirs',
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-4',
    title: 'Seasoned Red Aval Delicacy',
    description: 'Traditional flattened red rice tossed with fresh scraped coconut, curry leaves, and black pepper.',
    image_url: '/images/food/spiced-aval-tiffin.jpg',
    category: 'Heritage Tiffin',
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-5',
    title: 'Tender Coconut Pulp Payasam',
    description: 'Natural sweet pudding made with tender coconut meat, cardamom, and country palm jaggery.',
    image_url: '/images/food/tender-coconut-payasam.jpg',
    category: 'Natural Sweets',
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 'g-6',
    title: 'Eco-Friendly Dining Ambience',
    description: 'Serene dining space celebrating natural bamboo textures and calm South Indian hospitality.',
    image_url: '/images/hero-banner.jpg',
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
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Hero */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>VISUAL REFLECTIONS • புகைப்படக் கூடம்</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Gallery<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            a visual stroll through plantain leaf spreads
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Take a visual tour through our plantain leaf presentations, live sprouted creations, and serene dining environment in Coimbatore.
          </p>
        </div>
      </section>

      {/* Category Pills (Meadowlark Style) */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-black/[0.05] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat || 'all'}
                type="button"
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-padayal-cta text-white shadow-sm'
                    : 'bg-white text-padayal-text/75 hover:text-padayal-text border border-black/[0.04]'
                }`}
              >
                {cat === 'all' ? 'All Visuals' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid with 3D Tilt Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <TiltCard3D key={image.id} maxTilt={8} scale={1.03} className="h-full">
                <div
                  onClick={() => setSelectedImage(image)}
                  className="bg-white/95 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/[0.04] flex flex-col justify-between cursor-pointer group p-3.5 h-full"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {image.category && (
                      <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-white/95 text-padayal-primary text-[10px] font-bold shadow-sm">
                        {image.category}
                      </span>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="font-editorial text-base sm:text-lg font-normal text-padayal-text group-hover:text-padayal-primary transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-xs text-padayal-muted line-clamp-2 leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-padayal-text hover:bg-white shadow-md transition-colors"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 text-padayal-text hover:bg-white shadow-md transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 text-padayal-text hover:bg-white shadow-md transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] max-h-[70vh] bg-black/10 relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 bg-white space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#F2F5EB] text-padayal-primary text-xs font-semibold">
                {selectedImage.category}
              </span>
              <h2 className="font-editorial text-2xl font-normal text-padayal-text mt-1">{selectedImage.title}</h2>
              <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed font-sans">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
