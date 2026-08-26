import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/reservation', label: 'Book Table' },
  { path: '/tracking', label: 'Order Tracking' },
  { path: '/about', label: 'About Us' },
  { path: '/wellness', label: 'Wellness Hub' },
  { path: '/reviews', label: 'Customer Reviews' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-padayal-surface/98 backdrop-blur-md shadow-md border-b border-padayal-bg/80 py-2.5 px-4'
          : 'bg-padayal-surface border-b border-padayal-bg/50 py-3 px-4'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo & Slogan */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-padayal-primary text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-pranic text-xl font-bold text-padayal-text tracking-tight leading-none">
                Padayal
              </span>
              <span className="font-handwritten text-[11px] font-bold text-padayal-cta tracking-wider leading-none mt-0.5">
                No Oil No Boil
              </span>
            </div>
          </Link>

          {/* Right Action Icons: Cart & Mobile Menu Drawer */}
          <div className="flex items-center gap-2.5">
            
            {/* Cart Icon Button */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2 rounded-xl bg-padayal-bg text-padayal-text hover:bg-padayal-secondary-light transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-padayal-primary" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-padayal-cta text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm animate-scale-in">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Menu Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-padayal-bg text-padayal-text hover:bg-padayal-secondary-light transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-padayal-primary" />
              ) : (
                <Menu className="w-5 h-5 text-padayal-primary" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav Menu */}
        {isOpen && (
          <div className="pt-3 pb-2 border-t border-padayal-bg mt-3 space-y-1 animate-slide-down">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  location.pathname === link.path
                    ? 'bg-padayal-secondary-light text-padayal-primary'
                    : 'text-padayal-text hover:bg-padayal-bg'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/reservation"
                className="btn-primary text-xs w-full justify-center py-2.5 text-center shadow-sm"
              >
                Book a Table
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
