import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../../config/restaurant';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#112415] text-cream-100 border-t border-[#1b3d22]">
      {/* Top Banner / Philosophy Snippet */}
      <div className="bg-[#183620] border-b border-[#224b2d] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-padayal-primary/30 text-padayal-secondary flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <p className="font-pranic font-bold text-white text-base">
                {RESTAURANT_INFO.tamilTagline}
              </p>
              <p className="text-xs text-cream-300">
                100% Fire-Free, Zero-Oil, Raw South Indian Traditional Dining in Coimbatore
              </p>
            </div>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-padayal-cta text-white text-xs sm:text-sm font-bold hover:bg-padayal-cta-hover transition-colors"
          >
            <span>Explore Today’s Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Restaurant Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-padayal-primary text-white flex items-center justify-center shadow-md">
                <Leaf className="w-6 h-6 fill-current text-cream-100" />
              </div>
              <div>
                <span className="font-pranic text-2xl font-bold text-white tracking-tight leading-none block">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-xs text-cream-300 font-medium">
                  {RESTAURANT_INFO.tamilName} • {RESTAURANT_INFO.tagline}
                </span>
              </div>
            </Link>
            <p className="text-cream-300 text-sm leading-relaxed">
              {RESTAURANT_INFO.conceptShort}
            </p>
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-padayal-secondary hover:text-white transition-colors"
              >
                <span>Direct WhatsApp Enquiries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-padayal-primary pl-2.5">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/menu" className="text-cream-300 hover:text-white transition-colors">
                  Our Menu & Customization
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-cream-300 hover:text-white transition-colors">
                  Book a Table / Family Dining
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-cream-300 hover:text-white transition-colors">
                  Track Live Order
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-300 hover:text-white transition-colors">
                  About No Oil No Boil
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="text-cream-300 hover:text-white transition-colors">
                  Wellness Hub & Articles
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream-300 hover:text-white transition-colors">
                  Restaurant Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-cream-300 hover:text-white transition-colors">
                  Guest Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Real Coimbatore Address */}
          <div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-padayal-primary pl-2.5">
              Visit Coimbatore
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-padayal-secondary shrink-0 mt-0.5" />
                <span className="text-cream-300 leading-snug">
                  {RESTAURANT_INFO.location.addressLine}<br />
                  {RESTAURANT_INFO.location.area}<br />
                  {RESTAURANT_INFO.location.city}, {RESTAURANT_INFO.location.state} {RESTAURANT_INFO.location.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-padayal-secondary shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-cream-300 hover:text-white transition-colors font-medium"
                >
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-padayal-secondary shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-cream-300 hover:text-white transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Table Reservations */}
          <div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-padayal-primary pl-2.5">
              Opening Hours
            </h3>
            <div className="bg-[#183620] p-4 rounded-2xl border border-[#234c2e] space-y-3">
              <div className="flex items-start gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-padayal-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Daily Dining Hours</p>
                  <p className="text-xs text-cream-300 mt-0.5">{RESTAURANT_INFO.displayHours}</p>
                </div>
              </div>
              <div className="border-t border-[#234c2e] pt-2 text-xs text-cream-300">
                <p>Breakfast: 7:30 AM - 10:30 AM</p>
                <p>Traditional Meals: 12:00 PM - 3:30 PM</p>
                <p>Evening Tiffin & Dinner: 6:30 PM - 9:30 PM</p>
              </div>
              <Link
                to="/reservation"
                className="w-full py-2 bg-padayal-primary hover:bg-padayal-primary-hover text-white text-xs font-bold rounded-xl text-center block transition-colors"
              >
                Reserve a Table
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1b3d22] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p>&copy; {currentYear} {RESTAURANT_INFO.name} Restaurant, Coimbatore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About Our Food</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Location & Map</Link>
            <Link to="/admin/login" className="hover:text-white text-cream-400/80 transition-colors">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
