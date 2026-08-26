import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Utensils, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/wellness', label: 'Wellness Hub' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/reservation', label: 'Book Table' },
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
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-padayal-surface/98 backdrop-blur-md shadow-md border-b border-padayal-bg/80 py-2.5'
          : 'bg-padayal-surface border-b border-padayal-bg/50 py-3'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          
          {/* Logo & Slogan */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-padayal-primary text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-pranic text-xl sm:text-2xl font-bold text-padayal-text tracking-tight leading-none">
                Padayal
              </span>
              <span className="font-handwritten text-xs font-bold text-padayal-cta tracking-wider leading-none mt-0.5">
                No Oil No Boil
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-padayal-primary font-bold'
                      : 'text-padayal-text/80 hover:text-padayal-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs & Mobile Cart + Menu Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Cart Icon Button (Mobile & Desktop) */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl bg-padayal-bg text-padayal-text hover:bg-padayal-secondary-light transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-padayal-primary" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-padayal-cta text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-scale-in">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Desktop Book Table CTA */}
            <Link
              to="/reservation"
              className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-4 shadow-sm"
            >
              Book a Table
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-padayal-bg text-padayal-text hover:bg-padayal-secondary-light transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-padayal-primary" />
              ) : (
                <Menu className="w-6 h-6 text-padayal-primary" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav Menu */}
        {isOpen && (
          <div className="lg:hidden pt-3 pb-2 border-t border-padayal-bg mt-3 space-y-1 animate-slide-down">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'bg-padayal-secondary-light text-padayal-primary font-bold'
                    : 'text-padayal-text hover:bg-padayal-bg'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/reservation"
                className="btn-primary text-xs w-full justify-center py-3 text-center"
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
