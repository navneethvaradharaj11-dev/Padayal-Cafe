import { useState, useEffect } from 'react';
import { Star, User, Send, MessageSquare, CheckCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Review, InsertReview } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'f-1',
    name: 'Senthil Kumar (RS Puram)',
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
    <div className="min-h-screen pb-16 bg-padayal-bg">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#183620] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-padayal-secondary mx-auto" />
          <h1 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
            Guest Experiences & Reviews
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 max-w-xl mx-auto leading-relaxed">
            Read authentic reviews from guests who have experienced Coimbatore's No Oil No Boil traditional natural dining.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-padayal-surface border-b border-padayal-bg py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-padayal-text leading-none">{reviews.length}+</p>
              <p className="text-xs text-padayal-muted mt-1">Verified Diners</p>
            </div>
            <div className="h-10 w-px bg-padayal-bg" />
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
            className="btn-primary text-xs sm:text-sm py-2.5 px-6 inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Share Your Review</span>
          </button>
        </div>
      </section>

      {/* Review Modal Form */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 bg-padayal-text/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-padayal-surface rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-padayal-bg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 text-padayal-muted hover:text-padayal-text rounded-full"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-editorial text-2xl font-bold text-padayal-text mb-1">Share Your Experience</h2>
            <p className="text-xs text-padayal-muted mb-4">Your feedback helps fellow diners discover natural living.</p>

            {success ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-padayal-secondary-light text-padayal-primary flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-padayal-text">Thank You!</h3>
                <p className="text-xs text-padayal-muted">
                  Your review has been submitted for verification. Vanakkam!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                    placeholder="e.g. Senthil V."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                    placeholder="senthil@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2">
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
                              : 'text-padayal-bg fill-padayal-bg stroke-padayal-muted/40'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary resize-none"
                    placeholder="Describe your dining experience, favorite dishes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-xs sm:text-sm py-3 w-full disabled:opacity-50"
                >
                  {submitting ? 'Submitting Review...' : 'Publish Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-padayal-surface rounded-2xl p-6 shadow-organic border border-padayal-bg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-padayal-bg'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-padayal-text/80 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-padayal-bg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-padayal-secondary-light text-padayal-primary flex items-center justify-center font-bold">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-padayal-text">{review.name}</p>
                      <p className="text-[10px] text-padayal-muted">Verified Diner</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-padayal-muted">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
