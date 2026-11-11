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
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-black/[0.04]'
          : 'bg-[#FAF8F5] border-b border-black/[0.04]'
      }`}
    >
      {/* Top micro bar for location & philosophy */}
      <div className="hidden lg:block bg-[#F2F5EB] text-padayal-text/80 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-padayal-primary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-padayal-muted font-medium">
              <MapPin className="w-3.5 h-3.5 text-padayal-primary" />
              <span>{RESTAURANT_INFO.location.area}, {RESTAURANT_INFO.location.city}</span>
            </span>
            <span className="text-black/20">•</span>
            <span className="text-padayal-primary font-medium">
              ✦ {RESTAURANT_INFO.tagline}
            </span>
            <span className="text-black/20">•</span>
            <span className="text-padayal-muted font-medium">
              எண்ணெய் இல்லா, அடுப்பில்லா உணவகம்
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-padayal-muted">{RESTAURANT_INFO.displayHours}</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1 text-padayal-primary hover:text-padayal-primary-hover font-semibold transition-colors"
            >
              <Phone className="w-3 h-3 text-padayal-cta" />
              <span>{RESTAURANT_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Slogan (Meadowlark editorial serif style) */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Padayal Home">
            {/* 4-petal floral emblem or logo icon */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white p-1 border border-black/[0.06] shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Padayal Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-editorial text-2xl sm:text-3xl font-normal text-padayal-text tracking-tight leading-none">
                  Padayal<span className="text-padayal-cta">.</span>
                </span>
                <span className="text-xs font-semibold text-padayal-primary font-sans hidden sm:inline ml-1">
                  படையல்
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-padayal-muted tracking-wider uppercase leading-none mt-1">
                No Oil • No Boil • Living Food
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean, spaced, unboxed text links like Meadowlark) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-padayal-primary font-semibold'
                      : 'text-padayal-text/75 hover:text-padayal-text'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Desktop Table Booking CTA (Meadowlark rounded pill button) */}
            <Link
              to="/reservation"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium shadow-none hover:bg-padayal-cta-hover active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </Link>

            {/* Cart Trigger (Meadowlark rounded pill/circle) */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2.5 rounded-full bg-white text-padayal-text hover:bg-padayal-secondary-light transition-colors border border-black/[0.06] shadow-sm"
              aria-label={`View Cart (${itemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 text-padayal-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-padayal-cta text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white text-padayal-text hover:bg-padayal-secondary-light transition-colors border border-black/[0.06] shadow-sm"
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
          <div className="lg:hidden py-4 border-t border-black/[0.05] mt-1 space-y-1 animate-slide-down bg-white rounded-2xl p-4 shadow-lg border border-black/[0.05]">
            <div className="px-3 pb-2 text-[11px] font-bold text-padayal-muted uppercase tracking-wider">
              {RESTAURANT_INFO.location.area}, {RESTAURANT_INFO.location.city}
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-padayal-secondary-light text-padayal-primary font-semibold'
                      : 'text-padayal-text hover:bg-padayal-bg'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 px-1 flex flex-col gap-2">
              <Link
                to="/reservation"
                className="text-center py-3 text-sm font-medium w-full rounded-full bg-padayal-cta text-white hover:bg-padayal-cta-hover transition-colors"
              >
                Book a Table
              </Link>
              <a
                href={RESTAURANT_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2.5 text-xs font-semibold w-full rounded-full border border-padayal-primary/30 text-padayal-primary hover:bg-padayal-secondary-light transition-colors"
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
