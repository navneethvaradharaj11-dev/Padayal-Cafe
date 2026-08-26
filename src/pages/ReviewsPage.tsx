import { useState, useEffect } from 'react';
import { Star, User, Send, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Review, InsertReview } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

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

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newReview: InsertReview = {
        name: formData.name,
        email: formData.email || null,
        rating: formData.rating,
        comment: formData.comment || null,
      };

      const { error } = await supabase
        .from('reviews')
        .insert([newReview]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', rating: 5, comment: '' });
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

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
          <MessageSquare className="w-12 h-12 text-forest-400 mx-auto mb-6" />
          <h1 className="heading-xl text-white mb-4">Guest Reviews</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            See what our guests have to say about their Padayal experience.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white shadow-md">
        <div className="container-custom py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-forest-700">{reviews.length}</p>
              <p className="text-earth-600">Reviews</p>
            </div>
            <div className="h-12 w-px bg-earth-200 hidden sm:block" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(averageRating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-earth-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-earth-600">{averageRating.toFixed(1)} Average</p>
            </div>
            <div className="h-12 w-px bg-earth-200 hidden sm:block" />
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <Send className="w-4 h-4 mr-2" />
              Write a Review
            </button>
          </div>
        </div>
      </section>

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-earth-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-scale-in">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-earth-400 hover:text-earth-600"
            >
              &times;
            </button>

            <h2 className="heading-md text-earth-800 mb-6">Share Your Experience</h2>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-forest-600 fill-forest-600" />
                </div>
                <h3 className="font-semibold text-earth-800 mb-2">Thank You!</h3>
                <p className="text-earth-600">
                  Your review has been submitted and will be visible after approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= formData.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-earth-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="textarea-field"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-earth-300" />
              <h3 className="heading-sm text-earth-600 mb-2">No reviews yet</h3>
              <p className="text-earth-500">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="card p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-earth-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-earth-600 mb-4 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-earth-100">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="font-medium text-earth-800">{review.name}</p>
                      <p className="text-sm text-earth-500">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
