import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { OrderStatusTimeline } from '../components/tracking/OrderStatusTimeline';

export function OrderStatusPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { activeOrders, getOrderById, latestOrder } = useOrder();

  const selectedOrder = orderId ? getOrderById(orderId) : latestOrder;

  return (
    <div className="min-h-screen py-12 bg-padayal-bg">
      <div className="container-custom max-w-3xl space-y-8">
        
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold uppercase tracking-wider">
            Live Kitchen Tracking
          </span>
          <h1 className="font-pranic text-3xl sm:text-4xl font-bold text-padayal-text">
            Track Your Pranic Meal
          </h1>
        </div>

        {selectedOrder ? (
          <div className="space-y-8">
            <OrderStatusTimeline order={selectedOrder} />

            {/* Previous Order History List */}
            {activeOrders.length > 1 && (
              <div className="space-y-4 pt-6">
                <h3 className="font-display text-base font-bold text-padayal-text uppercase tracking-wider">
                  Your Recent Orders
                </h3>
                <div className="space-y-3">
                  {activeOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        selectedOrder.orderId === ord.orderId
                          ? 'bg-padayal-surface border-padayal-primary shadow-sm'
                          : 'bg-padayal-surface/60 border-padayal-bg hover:bg-padayal-surface'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm text-padayal-text">{ord.orderNumber}</span>
                        <span className="text-xs text-padayal-muted ml-2 font-medium capitalize">
                          • {ord.orderType}
                        </span>
                        <p className="text-xs text-padayal-muted mt-0.5">
                          {ord.items.length} items • Status: <strong className="text-padayal-primary uppercase">{ord.status}</strong>
                        </p>
                      </div>

                      <Link
                        to={`/tracking?orderId=${ord.orderId}`}
                        className="px-3 py-1.5 rounded-xl bg-padayal-bg text-padayal-primary text-xs font-bold hover:bg-padayal-secondary-light transition-colors inline-flex items-center gap-1"
                      >
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-padayal-surface rounded-3xl p-12 text-center shadow-organic border border-padayal-bg space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-padayal-bg text-padayal-muted flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-pranic text-xl font-bold text-padayal-text">No Active Orders Yet</h3>
            <p className="text-sm text-padayal-muted">
              Place an order from our raw-vegan menu to track your live preparation status!
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
