import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Search } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { OrderStatusTimeline } from '../components/tracking/OrderStatusTimeline';

export function OrderStatusPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { activeOrders, getOrderById, latestOrder } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOrder = orderId ? getOrderById(orderId) : latestOrder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ orderId: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-padayal-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold uppercase tracking-wider">
            Live Order Tracking
          </span>
          <h1 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
            Track Your Fresh Meal
          </h1>
          <p className="text-xs sm:text-sm text-padayal-muted">
            Follow your No Oil No Boil South Indian meal from our Coimbatore kitchen to your table or doorstep.
          </p>
        </div>

        {/* Lookup Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-padayal-muted" />
            <input
              type="text"
              placeholder="Search by Order # (e.g. #PAD-1234)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-padayal-bg bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-padayal-primary text-white text-xs sm:text-sm font-bold hover:bg-padayal-primary-hover transition-colors"
          >
            Track
          </button>
        </form>

        {selectedOrder ? (
          <div className="space-y-8">
            <OrderStatusTimeline order={selectedOrder} />

            {/* Previous Order History List */}
            {activeOrders.length > 1 && (
              <div className="bg-padayal-surface rounded-3xl p-6 sm:p-8 shadow-organic border border-padayal-bg space-y-4 max-w-2xl mx-auto">
                <h3 className="font-display text-sm font-bold text-padayal-text uppercase tracking-wider">
                  Your Recent Orders
                </h3>
                <div className="space-y-3">
                  {activeOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        selectedOrder.orderId === ord.orderId
                          ? 'bg-padayal-secondary-light/40 border-padayal-primary shadow-sm'
                          : 'bg-padayal-bg/50 border-padayal-bg hover:bg-padayal-surface'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-padayal-text">{ord.orderNumber}</span>
                          <span className="text-xs text-padayal-muted capitalize">
                            • {ord.orderType}
                          </span>
                        </div>
                        <p className="text-xs text-padayal-muted mt-0.5">
                          {ord.items.length} items • Status:{' '}
                          <strong className="text-padayal-primary uppercase font-bold">{ord.status}</strong>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSearchParams({ orderId: ord.orderId })}
                        className="px-3.5 py-1.5 rounded-xl bg-padayal-bg text-padayal-primary text-xs font-bold hover:bg-padayal-secondary-light transition-colors inline-flex items-center gap-1 shrink-0"
                      >
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-padayal-surface rounded-3xl p-10 sm:p-14 text-center shadow-organic border border-padayal-bg space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-padayal-bg text-padayal-muted flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-pranic text-xl font-bold text-padayal-text">No Active Orders Found</h3>
            <p className="text-xs sm:text-sm text-padayal-muted">
              You don't have any pending orders under this reference. Browse our fresh South Indian menu to place your first order!
            </p>
            <Link to="/menu" className="btn-primary text-sm inline-flex items-center gap-2">
              Explore Live Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
