import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Calendar, Phone, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_INFO } from '../../config/restaurant';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/reservation', label: 'Book Table' },
  { path: '/tracking', label: 'Order Tracking' },
  { path: '/about', label: 'About Padayal' },
  { path: '/wellness', label: 'Wellness Hub' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-padayal-surface/98 backdrop-blur-md shadow-md border-b border-padayal-bg/80'
          : 'bg-padayal-surface border-b border-padayal-bg'
      }`}
    >
      {/* Top micro bar for contact & location on desktop */}
      <div className="hidden lg:block bg-[#1B4329] text-cream-100 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-forest-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cream-200">
              <MapPin className="w-3.5 h-3.5 text-padayal-secondary" />
              <span>{RESTAURANT_INFO.location.area}, {RESTAURANT_INFO.location.city}</span>
            </span>
            <span className="text-cream-400">|</span>
            <span className="text-cream-200 font-medium">
              🌿 {RESTAURANT_INFO.tagline}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-cream-300">{RESTAURANT_INFO.displayHours}</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1 text-cream-100 hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-3 h-3 text-padayal-secondary" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Slogan */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Padayal Home">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-1 border border-padayal-bg shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Padayal Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-pranic text-2xl sm:text-3xl font-extrabold text-padayal-text tracking-tight leading-none">
                  Padayal
                </span>
                <span className="text-xs font-bold text-padayal-primary font-sans hidden sm:inline">
                  படையல்
                </span>
              </div>
              <span className="text-[11px] font-bold text-padayal-cta tracking-wider uppercase leading-none mt-1">
                No Oil No Boil Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'bg-padayal-secondary-light text-padayal-primary font-bold'
                      : 'text-padayal-text/80 hover:text-padayal-primary hover:bg-padayal-bg'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Desktop Table Booking CTA */}
            <Link
              to="/reservation"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-padayal-primary text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-padayal-primary-hover active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Table</span>
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl bg-padayal-bg text-padayal-text hover:bg-padayal-secondary-light transition-colors border border-padayal-bg"
              aria-label={`View Cart (${itemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 text-padayal-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-padayal-cta text-white text-[11px] font-extrabold flex items-center justify-center shadow-md animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-padayal-bg text-padayal-text hover:bg-padayal-secondary-light transition-colors border border-padayal-bg"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-padayal-primary" />
              ) : (
                <Menu className="w-5 h-5 text-padayal-primary" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-padayal-bg mt-1 space-y-1 animate-slide-down">
            <div className="px-3 pb-2 text-[11px] font-bold text-padayal-muted uppercase tracking-wider">
              {RESTAURANT_INFO.location.area}, {RESTAURANT_INFO.location.city}
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-padayal-secondary-light text-padayal-primary font-bold'
                      : 'text-padayal-text hover:bg-padayal-bg'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 px-2 flex flex-col gap-2">
              <Link
                to="/reservation"
                className="btn-primary text-center py-3 text-sm font-bold w-full"
              >
                Book a Table
              </Link>
              <a
                href={RESTAURANT_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center py-2.5 text-xs font-semibold w-full text-padayal-text"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
