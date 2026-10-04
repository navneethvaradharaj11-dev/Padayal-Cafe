import { useState } from 'react';
import { Search, ShoppingBag, Utensils, CheckCircle, MapPin } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { OrderStatus } from '../../types/order';
import { formatCurrency } from '../../utils/formatCurrency';

export function OrderManagementPage() {
  const { activeOrders, updateOrderStatus } = useOrder();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = activeOrders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.orderType === typeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.orderNumber.toLowerCase().includes(q) ||
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.phone.includes(q);

    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ready':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg text-earth-800">Kitchen & Customer Orders</h1>
          <p className="text-earth-600 mt-1">
            Real-time orders management for Coimbatore kitchen, dining tables, and doorstep deliveries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-forest-100 text-forest-800 text-xs font-bold">
            {activeOrders.length} Total Orders Recorded
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400" />
          <input
            type="text"
            placeholder="Search by Order #, Customer name, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 text-sm py-2.5"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select-field w-auto text-sm py-2.5"
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="select-field w-auto text-sm py-2.5"
        >
          <option value="all">All Types</option>
          <option value="dine-in">Dine-In</option>
          <option value="takeaway">Takeaway</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      {/* Orders List / Table */}
      <div className="card-static overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <ShoppingBag className="w-12 h-12 text-earth-300 mx-auto opacity-50" />
            <h3 className="font-semibold text-earth-700 text-base">No orders matching filters</h3>
            <p className="text-xs text-earth-500">Orders placed by customers will appear here in real-time.</p>
          </div>
        ) : (
          <div className="divide-y divide-earth-100">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="p-5 hover:bg-earth-50/50 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-extrabold text-base text-earth-900">{order.orderNumber}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(order.status)} uppercase`}>
                      {order.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-earth-100 text-earth-700 text-xs font-semibold capitalize flex items-center gap-1">
                      <Utensils className="w-3 h-3" />
                      {order.orderType} {order.customer.tableNumber ? `(Table ${order.customer.tableNumber})` : ''}
                    </span>
                    <span className="text-xs text-earth-500">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Status Advancement Quick Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {order.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.orderId, 'preparing')}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.orderId, 'ready')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.orderId, 'completed')}
                        className="px-3 py-1.5 rounded-lg bg-forest-800 text-white text-xs font-bold hover:bg-forest-900 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Complete Order
                      </button>
                    )}
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.orderId, 'cancelled')}
                        className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Customer and Order items row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs pt-1">
                  <div className="md:col-span-4 space-y-1">
                    <p className="font-semibold text-earth-800">{order.customer.name}</p>
                    <p className="text-earth-600">{order.customer.phone}</p>
                    {order.customer.deliveryAddress && (
                      <p className="text-earth-500 flex items-start gap-1">
                        <MapPin className="w-3 h-3 text-padayal-cta shrink-0 mt-0.5" />
                        <span>{order.customer.deliveryAddress}</span>
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5 space-y-1">
                    <p className="font-semibold text-earth-700">Dishes Ordered:</p>
                    <div className="space-y-0.5">
                      {order.items.map((ci) => (
                        <p key={ci.cartItemId} className="text-earth-600">
                          <strong className="text-earth-800">{ci.quantity}x</strong> {ci.item.name}{' '}
                          {ci.customization.portion ? `(${ci.customization.portion.name})` : ''}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-3 text-right space-y-1">
                    <p className="text-earth-500">
                      Payment: <strong className="uppercase text-earth-800">{order.paymentMethod}</strong>
                    </p>
                    <p className="text-base font-extrabold text-forest-800">
                      {formatCurrency(order.bill.grandTotal)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
