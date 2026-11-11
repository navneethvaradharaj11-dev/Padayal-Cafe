import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../../config/restaurant';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF8F5] text-padayal-text border-t border-black/[0.06] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Columns (Meadowlark Image 5 style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-black/[0.06]">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              {/* Botanical 4-petal flower icon */}
              <div className="w-10 h-10 rounded-2xl bg-white p-1.5 shadow-sm border border-black/[0.06] flex items-center justify-center">
                <img src="/logo.png" alt="Padayal Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-2xl font-normal text-padayal-text tracking-tight leading-none">
                  Padayal<span className="text-padayal-cta">.</span>
                </span>
                <span className="text-xs text-padayal-muted font-sans mt-1">
                  {RESTAURANT_INFO.tamilName} • {RESTAURANT_INFO.tagline}
                </span>
              </div>
            </Link>

            <p className="text-padayal-muted text-sm sm:text-base leading-relaxed max-w-sm font-sans">
              A gentle sanctuary for traditional South Indian unboiled dining. Wholesome meals crafted with zero refined oils, sprouted grains, and living prana in Coimbatore.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-padayal-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-padayal-primary shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-padayal-primary shrink-0" />
                <span>{RESTAURANT_INFO.displayHours} (Daily)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-padayal-cta shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-padayal-cta transition-colors font-medium">
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Columns (Grow / Learn / Care style) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: TASTE */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-padayal-text uppercase tracking-widest font-sans">
                TASTE
              </h4>
              <ul className="space-y-2.5 text-sm text-padayal-muted">
                <li>
                  <Link to="/menu" className="hover:text-padayal-text transition-colors">
                    Today's Menu
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="hover:text-padayal-text transition-colors">
                    Plantain Leaf Feast
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="hover:text-padayal-text transition-colors">
                    Sprouted Bowls
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="hover:text-padayal-text transition-colors">
                    Tender Coconut Elixirs
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="hover:text-padayal-text transition-colors">
                    Live Order Tracker
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: LEARN */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-padayal-text uppercase tracking-widest font-sans">
                LEARN
              </h4>
              <ul className="space-y-2.5 text-sm text-padayal-muted">
                <li>
                  <Link to="/about" className="hover:text-padayal-text transition-colors">
                    No Oil No Boil
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-padayal-text transition-colors">
                    Chef Sivakumar's Story
                  </Link>
                </li>
                <li>
                  <Link to="/wellness" className="hover:text-padayal-text transition-colors">
                    Wellness Guides
                  </Link>
                </li>
                <li>
                  <Link to="/wellness" className="hover:text-padayal-text transition-colors">
                    Living Prana Culture
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-padayal-text transition-colors">
                    Kitchen Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: VISIT */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-padayal-text uppercase tracking-widest font-sans">
                VISIT
              </h4>
              <ul className="space-y-2.5 text-sm text-padayal-muted">
                <li>
                  <Link to="/reservation" className="hover:text-padayal-text transition-colors">
                    Book a Table
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-padayal-text transition-colors">
                    Singanallur Map
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="hover:text-padayal-text transition-colors">
                    Guest Notes
                  </Link>
                </li>
                <li>
                  <a
                    href={RESTAURANT_INFO.whatsappChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-padayal-cta hover:text-padayal-cta-hover font-medium transition-colors"
                  >
                    <span>WhatsApp Us</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar (Meadowlark subtle text line) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-padayal-muted">
          <p className="font-editorial italic text-padayal-text/70 text-sm">
            A gentle haven for natural South Indian dining.
          </p>
          <div className="flex items-center gap-6">
            <span>&copy; {currentYear} Padayal Cafe, Coimbatore</span>
            <Link to="/admin/login" className="text-padayal-muted/70 hover:text-padayal-text transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
