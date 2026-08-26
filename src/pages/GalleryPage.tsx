import { useState, useEffect } from 'react';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryImage } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

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

        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))];
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[newIndex]);
    } else {
      const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-forest-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Image className="w-12 h-12 text-forest-400 mx-auto mb-6" />
          <h1 className="heading-xl text-white mb-4">Our Gallery</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Take a visual journey through Padayal. See our dishes, ambiance,
            and the passion that goes into every meal.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat || 'all'}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-forest-800 text-white'
                    : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <Image className="w-16 h-16 mx-auto mb-4 text-earth-300" />
              <h3 className="heading-sm text-earth-600 mb-2">No photos found</h3>
              <p className="text-earth-500">Check back soon for new gallery updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                    index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                >
                  <div className={`aspect-square ${index % 5 === 0 ? 'aspect-auto h-full' : ''}`}>
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white text-left">
                      <h3 className="font-medium">{image.title}</h3>
                      {image.category && (
                        <span className="text-sm text-cream-300">{image.category}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-earth-900/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-cream-200 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-cream-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-cream-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-cream-300 mt-1">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
