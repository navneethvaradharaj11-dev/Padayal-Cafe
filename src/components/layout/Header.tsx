import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Utensils } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/wellness', label: 'Wellness Hub' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-earth-900/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Leaf className="w-8 h-8 text-padayal-primary group-hover:scale-110 transition-transform" />
              <Utensils className="w-4 h-4 text-padayal-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <span className="font-pranic text-2xl font-bold text-padayal-primary tracking-tight">
                Padayal
              </span>
              <span className={`block font-handwritten text-sm font-semibold tracking-wider ${
                isScrolled ? 'text-padayal-cta' : 'text-padayal-cta'
              }`}>
                No Oil No Boil
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-padayal-primary font-bold border-b-2 border-padayal-primary pb-0.5' 
                    : 'text-padayal-text hover:text-padayal-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/reservation"
              className="btn-primary shadow-md hover:shadow-lg"
            >
              Book a Table
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-earth-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-earth-800" />
            ) : (
              <Menu className="w-6 h-6 text-earth-800" />
            )}
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-earth-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-forest-50 text-forest-800 font-semibold'
                    : 'text-earth-700 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/reservation"
              className="btn-primary text-center mt-2"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
