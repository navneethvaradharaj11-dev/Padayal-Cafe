import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Calendar, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_INFO } from '../../config/restaurant';

// Curated primary links for a clean, spacious Meadowlark header
const PRIMARY_NAV_LINKS = [
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'Our Story' },
  { path: '/wellness', label: 'Wellness' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/contact', label: 'Contact' },
];

// Secondary links available via 'More' on desktop & included in mobile menu
const MORE_NAV_LINKS = [
  { path: '/tracking', label: 'Track Order' },
  { path: '/gallery', label: 'Gallery' },
];

const ALL_MOBILE_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu & Dishes' },
  { path: '/about', label: 'About No Oil No Boil' },
  { path: '/wellness', label: 'Wellness Hub' },
  { path: '/reservation', label: 'Book a Table' },
  { path: '/tracking', label: 'Track Order' },
  { path: '/reviews', label: 'Guest Reviews' },
  { path: '/gallery', label: 'Photo Gallery' },
  { path: '/contact', label: 'Location & Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-black/[0.06]'
          : 'bg-[#FAF8F5]/85 backdrop-blur-md border-b border-black/[0.05]'
      }`}
    >
      {/* Top micro bar: Singanallur location & Hours */}
      <div className="hidden lg:block bg-[#F2F5EB] text-padayal-text/80 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-padayal-primary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-medium text-padayal-muted">
            <span className="flex items-center gap-1.5 text-padayal-text">
              <MapPin className="w-3.5 h-3.5 text-padayal-primary" />
              <span>{RESTAURANT_INFO.location.area}, {RESTAURANT_INFO.location.city}</span>
            </span>
            <span className="text-black/15">•</span>
            <span className="text-padayal-primary font-semibold">
              ✦ {RESTAURANT_INFO.tagline}
            </span>
            <span className="text-black/15">•</span>
            <span className="text-padayal-muted">
              எண்ணெய் இல்லா, அடுப்பில்லா உணவகம்
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
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
          
          {/* Brand Logo (Left Side) */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 select-none py-1"
            aria-label="Padayal Home"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white p-1 border border-black/[0.06] shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img src="/logo.png" alt="Padayal Logo" className="w-full h-full object-contain" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-editorial text-2xl sm:text-3xl font-normal text-padayal-text tracking-tight leading-none">
                  Padayal<span className="text-padayal-cta">.</span>
                </span>
                <span className="text-xs font-semibold text-padayal-primary font-sans hidden sm:inline">
                  படையல்
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-padayal-muted tracking-wider uppercase leading-none mt-1 whitespace-nowrap">
                No Oil • No Boil • Living Food
              </span>
            </div>
          </Link>

          {/* Right Navigation & Action Group (Aligned like Meadowlark Image 2) */}
          <div className="flex items-center gap-6 sm:gap-8">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {PRIMARY_NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 relative py-1 ${
                      isActive
                        ? 'text-padayal-primary font-semibold'
                        : 'text-padayal-text/75 hover:text-padayal-text'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-padayal-cta rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* 'More' dropdown for secondary links */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                  className="flex items-center gap-1 text-sm font-medium whitespace-nowrap text-padayal-text/75 hover:text-padayal-text py-1 transition-colors"
                >
                  <span>More</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-lg border border-black/[0.06] p-2 space-y-1 z-50 animate-scale-in">
                    {MORE_NAV_LINKS.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                          location.pathname === item.path
                            ? 'bg-[#F2F5EB] text-padayal-primary font-semibold'
                            : 'text-padayal-text hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Table Booking CTA (Meadowlark pill button) */}
            <Link
              to="/reservation"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-padayal-cta-hover active:scale-95 transition-all shadow-none shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </Link>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2.5 rounded-full bg-white text-padayal-text hover:bg-padayal-secondary-light transition-colors border border-black/[0.06] shadow-sm shrink-0"
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
              className="lg:hidden p-2.5 rounded-full bg-white text-padayal-text hover:bg-padayal-secondary-light transition-colors border border-black/[0.06] shadow-sm shrink-0"
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
          <div className="lg:hidden py-4 border-t border-black/[0.05] mt-1 space-y-1 animate-slide-down bg-white rounded-3xl p-5 shadow-xl border border-black/[0.06]">
            <div className="px-3 pb-2 text-[11px] font-bold text-padayal-muted uppercase tracking-wider">
              {RESTAURANT_INFO.location.area}, {RESTAURANT_INFO.location.city}
            </div>
            
            <div className="grid grid-cols-1 gap-1">
              {ALL_MOBILE_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F2F5EB] text-padayal-primary font-semibold'
                        : 'text-padayal-text hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-black/[0.05] flex flex-col gap-2.5">
              <Link
                to="/reservation"
                className="text-center py-3 text-sm font-medium w-full rounded-full bg-padayal-cta text-white hover:bg-padayal-cta-hover transition-colors"
              >
                Book a Table Online
              </Link>
              <a
                href={RESTAURANT_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2.5 text-xs font-semibold w-full rounded-full border border-padayal-primary/30 text-padayal-primary hover:bg-[#F2F5EB] transition-colors"
              >
                WhatsApp Enquiries
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
