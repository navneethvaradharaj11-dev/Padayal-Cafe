import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingBag, Clock, Calendar } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export function BottomNav() {
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const { latestOrder } = useOrder();

  const isTrackingActive = latestOrder && latestOrder.status !== 'delivered';

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: UtensilsCrossed },
    { path: '/tracking', label: 'Tracking', icon: Clock, badge: isTrackingActive ? 'Live' : null },
    { path: '/reservation', label: 'Book Table', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-padayal-surface/95 backdrop-blur-md border-t border-padayal-bg shadow-organic-lg px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive ? 'text-padayal-primary font-bold' : 'text-padayal-muted hover:text-padayal-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium tracking-tight">{item.label}</span>

              {item.badge && (
                <span className="absolute -top-1 right-1 w-2.5 h-2.5 rounded-full bg-padayal-cta animate-ping" />
              )}
            </Link>
          );
        })}

        {/* Mobile Cart Trigger Button */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-padayal-cta hover:text-padayal-cta-hover transition-colors"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-bold tracking-tight">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-padayal-cta text-padayal-surface text-[10px] font-extrabold flex items-center justify-center border-2 border-padayal-surface">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
