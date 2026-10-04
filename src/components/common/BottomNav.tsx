import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingBag, Clock, Calendar } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export function BottomNav() {
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const { latestOrder } = useOrder();

  const isTrackingActive = latestOrder && latestOrder.status !== 'completed';

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: UtensilsCrossed },
    { path: '/reservation', label: 'Book Table', icon: Calendar },
    { path: '/tracking', label: 'Tracking', icon: Clock, badge: isTrackingActive ? 'Live' : null },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-padayal-surface/98 backdrop-blur-lg border-t border-padayal-bg shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? 'text-padayal-primary font-bold'
                  : 'text-padayal-muted hover:text-padayal-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-semibold tracking-tight">{item.label}</span>

              {item.badge && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-padayal-cta animate-ping" />
              )}
            </Link>
          );
        })}

        {/* Mobile Cart Trigger Button */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-padayal-cta hover:text-padayal-cta-hover transition-colors min-w-[56px]"
          aria-label={`Cart (${itemCount} items)`}
        >
          <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-bold tracking-tight">Cart</span>
          {itemCount > 0 && (
            <span className="absolute top-0.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-padayal-cta text-white text-[10px] font-black flex items-center justify-center border-2 border-padayal-surface">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
