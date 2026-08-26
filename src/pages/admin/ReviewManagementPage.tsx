import { useState, useEffect } from 'react';
import { Search, Star, Check, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Review } from '../../types/database';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function ReviewManagementPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateReview(id: string, updates: Partial<Review>) {
    try {
      const { error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  }

  async function deleteReview(id: string) {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'approved' && review.is_approved) ||
      (statusFilter === 'pending' && !review.is_approved);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg text-earth-800">Reviews</h1>
        <p className="text-earth-600 mt-1">Manage customer reviews and ratings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="select-field w-auto"
        >
          <option value="all">All Reviews</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending Approval</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredReviews.length === 0 ? (
          <div className="card p-8 text-center text-earth-500">
            No reviews found
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-earth-800">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-earth-200'
                          }`}
                        />
                      ))}
                    </div>
                    {review.is_featured && (
                      <span className="badge badge-info">Featured</span>
                    )}
                  </div>
                  {review.email && (
                    <p className="text-sm text-earth-500 mb-2">{review.email}</p>
                  )}
                  {review.comment && (
                    <p className="text-earth-600 italic">"{review.comment}"</p>
                  )}
                  <p className="text-sm text-earth-400 mt-2">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateReview(review.id, { is_approved: !review.is_approved })}
                    className={`p-2 rounded-lg transition-colors ${
                      review.is_approved
                        ? 'text-green-600 bg-green-50 hover:bg-green-100'
                        : 'text-earth-400 hover:bg-earth-100'
                    }`}
                    title={review.is_approved ? 'Unapprove' : 'Approve'}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => updateReview(review.id, { is_featured: !review.is_featured })}
                    className={`p-2 rounded-lg transition-colors ${
                      review.is_featured
                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                        : 'text-earth-400 hover:bg-earth-100'
                    }`}
                    title={review.is_featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-earth-100">
                <span className={`badge ${review.is_approved ? 'badge-success' : 'badge-warning'}`}>
                  {review.is_approved ? 'Approved' : 'Pending Approval'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
