import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Users, Award, ChefHat, Droplets, Wind } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MenuItem, Review } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { MenuItemSkeleton } from '../components/ui/Skeleton';

const FEATURES = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'No artificial ingredients, preservatives, or additives. Just pure, natural food.',
  },
  {
    icon: Heart,
    title: 'Heart Healthy',
    description: 'Oil-free cooking that supports cardiovascular health and overall wellness.',
  },
  {
    icon: Droplets,
    title: 'Nutrient Rich',
    description: 'Steaming and pressure cooking preserve maximum vitamins and minerals.',
  },
  {
    icon: Wind,
    title: 'Easy Digestion',
    description: 'Light on the stomach, perfect for all age groups and health conditions.',
  },
];

const SAMPLE_DISHES: MenuItem[] = [
  {
    id: '1',
    name: 'Pranic Sprouted Mung Salad',
    category: 'salads',
    description: 'Fresh sprouted green gram infused with raw coconut milk dressing, curry leaves, and sun-dried Himalayan pink salt. 100% Fire-Free.',
    price: 240,
    calories: 180,
    preparation_time: 10,
    protein: 12,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Raw Coconut & Lemongrass Elixir',
    category: 'beverages',
    description: 'Pressed tender coconut water blended with organic lemongrass, ginger juice, and natural palm nectar.',
    price: 160,
    calories: 90,
    preparation_time: 5,
    protein: 2,
    image_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Harvest Cucumber & Microgreen Bowl',
    category: 'salads',
    description: 'Crisp native cucumbers, organic microgreens, pomegranate seeds, and lemon-coriander raw dressing.',
    price: 220,
    calories: 140,
    preparation_time: 10,
    protein: 6,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Raw Dates & Nut Energy Delights',
    category: 'desserts',
    description: 'Handcrafted raw truffles made of crushed Medjool dates, almonds, cardamom, and coconut flakes. No added sugar.',
    price: 190,
    calories: 210,
    preparation_time: 5,
    protein: 8,
    image_url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Dr. Anand Raman',
    rating: 5,
    comment: 'Padayal is a revolution in healthy dining. The live enzyme foods leave you energized rather than bloated. Absolutely mind-blowing raw South Indian flavors!',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Priya Sundaram',
    rating: 5,
    comment: 'I never imagined oil-free and fire-free food could taste so vibrant and rich! The coconut sprout salad and lemongrass elixir are daily essentials now.',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Karthik V.',
    rating: 5,
    comment: 'Cleanest food experience in Tamil Nadu. The pranic raw concept is executed with top-tier culinary finesse. Highly recommended!',
    is_featured: true,
    is_approved: true,
    created_at: new Date().toISOString(),
  },
];

export function HomePage() {
  const [featuredDishes, setFeaturedDishes] = useState<MenuItem[]>([]);
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
        setTestimonials(reviewsRes.data && reviewsRes.data.length > 0 ? reviewsRes.data : SAMPLE_REVIEWS);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFeaturedDishes(SAMPLE_DISHES);
        setTestimonials(SAMPLE_REVIEWS);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-padayal-primary text-white py-12 sm:py-20 rounded-b-[40px] shadow-md overflow-hidden">
        {/* Decorative background radial overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-2xl space-y-6">
            
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                🌱 100% Raw-Vegan
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                ✓ Zero Oil & Fire-Free
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                ⚡ Live Enzymes
              </span>
            </div>

            <h1 className="font-pranic text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Taste Natural Pranic Energy in Every Bite.
            </h1>

            <p className="font-sans text-sm sm:text-base text-white/90 max-w-xl leading-relaxed">
              Padayal is South India's pioneer in "No Oil, No Boil" live food dining. Experience live enzymes, rich organic flavors, and raw vitality crafted without fire or artificial heat.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/menu"
                className="btn-cta text-sm py-3 px-6 shadow-lg inline-flex items-center justify-center gap-2"
              >
                Explore Gourmet Menu <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/reservation"
                className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 transition-colors inline-flex items-center justify-center"
              >
                Book a Table
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
                Our Philosophy
              </span>
              <h2 className="heading-lg text-earth-800 mb-6">
                The Science of Natural Cooking
              </h2>
              <p className="text-body-lg mb-6">
                At Padayal, we believe food should heal, not harm. Our
                innovative cooking techniques—steaming, pressure cooking, and
                natural roasting—preserve nutrients that are often lost in
                traditional oil-based cooking.
              </p>
              <p className="text-body-lg mb-8">
                Founded on ancient wisdom and backed by modern science, our
                approach ensures every dish is a perfect balance of taste and
                health. No compromise. No shortcuts.
              </p>
              <Link to="/about" className="btn-primary inline-flex">
                Learn Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-earth-900/20">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Healthy cooking"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-forest-800 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <span className="text-4xl font-bold font-display">100%</span>
                  <p className="text-forest-200 text-sm mt-1">Oil Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Benefits Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
              Health Benefits
            </span>
            <h2 className="heading-lg text-earth-800 mb-4">
              Why No Oil, No Boil?
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Our cooking philosophy isn't just a trend—it's a scientifically
              backed approach to nutrition that maximizes health benefits.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className={`card p-6 text-center animate-fade-in animate-delay-${(index + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-xl bg-forest-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-forest-700" />
                </div>
                <h3 className="heading-sm text-earth-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-body text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
                Featured Dishes
              </span>
              <h2 className="heading-lg text-earth-800">
                Our Signature Selection
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-forest-800 font-medium hover:text-forest-600 transition-colors inline-flex items-center gap-2"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <MenuItemSkeleton key={i} />
              ))}
            </div>
          ) : featuredDishes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDishes.map((dish) => (
                <div key={dish.id} className="card overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={dish.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-forest-600 uppercase tracking-wide">
                      {dish.category}
                    </span>
                    <h3 className="font-semibold text-earth-800 mt-1 mb-2">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-earth-500 line-clamp-2 mb-3">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-forest-700 text-lg">
                        ₹{dish.price}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-earth-500">
                        {dish.calories && <span>{dish.calories} cal</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-earth-500">
              <ChefHat className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No featured dishes available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="heading-lg text-earth-800 mb-4">
              What Our Guests Say
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Don't just take our word for it—hear from our happy guests who have
              experienced the Padayal difference.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((review, index) => (
                <div
                  key={review.id}
                  className={`card p-6 animate-fade-in animate-delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-earth-200'
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-earth-600 mb-4 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="font-medium text-earth-800">{review.name}</p>
                      <p className="text-sm text-earth-500">Verified Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-earth-500">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No testimonials available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/reviews" className="btn-outline">
              Read More Reviews
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Padayal dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-earth-900/70" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h2 className="heading-lg text-white mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-xl text-cream-200 mb-8 max-w-2xl mx-auto">
            Book your table today and experience healthy dining like never
            before. Your wellness journey starts at Padayal.
          </p>
          <Link to="/reservation" className="btn-primary text-lg">
            Reserve Your Table Now
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Link>
        </div>
      </section>
    </div>
  );
}
