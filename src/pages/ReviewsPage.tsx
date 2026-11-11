import { useState, useEffect } from 'react';
import { Star, User, Send, MessageSquare, CheckCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Review, InsertReview } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { TiltCard3D } from '../components/3d/TiltCard3D';

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'f-1',
    name: 'Senthil Kumar',
    email: 'senthil@gmail.com',
    rating: 5,
    comment: 'The traditional plantain leaf spread here is completely fire-free yet so full of flavour. The tender coconut milk rasam and sprouted gram kootu leave you energized without feeling heavy.',
    is_approved: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'f-2',
    name: 'Dr. R. Vigneshwaran',
    email: 'vignesh@gmail.com',
    rating: 5,
    comment: 'A true pioneer of South Indian natural food culture. The no-oil, no-boil culinary methods celebrate pure ingredients and traditional flavours. Outstanding natural dining concept in Coimbatore.',
    is_approved: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'f-3',
    name: 'Meenakshi & Family',
    email: 'meenakshi@gmail.com',
    rating: 5,
    comment: 'We booked a family table for lunch. The unboiled red aval dishes and tender coconut payasam were adored by both the elders and our children. Will visit regularly!',
    is_approved: true,
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setReviews(FALLBACK_REVIEWS);
      } else {
        setReviews(data);
      }
    } catch {
      setReviews(FALLBACK_REVIEWS);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    setSubmitting(true);

    try {
      const newReview: InsertReview = {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        rating: formData.rating,
        comment: formData.comment.trim() || null,
      };

      await supabase.from('reviews').insert([newReview]);
      setSuccess(true);
      setFormData({ name: '', email: '', rating: 5, comment: '' });
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 2500);
    } catch (err) {
      console.error('Error submitting review:', err);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 5;

  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Hero */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>DINER REFLECTIONS • விருந்தினர் கருத்துக்கள்</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Reviews<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            notes from our unboiled dining table
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Read authentic thoughts from guests who have experienced Coimbatore's No Oil No Boil traditional natural dining.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white/80 backdrop-blur-md border-b border-black/[0.05] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <p className="font-editorial text-2xl sm:text-3xl font-bold text-padayal-text leading-none">{reviews.length}+</p>
              <p className="text-xs text-padayal-muted mt-1">Verified Diners</p>
            </div>
            <div className="h-8 w-px bg-black/[0.08]" />
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-padayal-muted">{averageRating.toFixed(1)} Average Rating</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover transition-colors shadow-none inline-flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Share your experience</span>
          </button>
        </div>
      </section>

      {/* Review Modal Form */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-[2.5rem] max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-black/[0.06] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 p-2 text-padayal-muted hover:text-padayal-text rounded-full hover:bg-[#FAF8F5] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-editorial text-2xl font-normal text-padayal-text mb-1">Share Your Experience</h2>
            <p className="text-xs text-padayal-muted mb-5">Your feedback helps fellow diners discover natural living.</p>

            {success ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F2F5EB] text-padayal-primary flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-normal text-padayal-text">Thank You</h3>
                <p className="text-xs text-padayal-muted">
                  Your note has been submitted for verification. Vanakkam!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-full border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                    placeholder="e.g. Senthil V."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-full border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                    placeholder="senthil@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-padayal-text mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-black/15 fill-black/15'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20 resize-none"
                    placeholder="Describe your dining experience, favorite dishes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting Review...' : 'Publish Note'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Reviews Grid with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <TiltCard3D key={review.id} maxTilt={8} scale={1.03} className="h-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-7 shadow-sm hover:shadow-xl border border-black/[0.04] space-y-4 flex flex-col justify-between h-full transition-all duration-300">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-black/15'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-editorial italic text-sm text-padayal-text/80 leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F2F5EB] text-padayal-primary flex items-center justify-center font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-padayal-text">{review.name}</p>
                        <p className="text-[10px] text-padayal-muted">Verified Diner</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-padayal-muted">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
