import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Utensils } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-900 text-cream-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="relative">
                <Leaf className="w-8 h-8 text-forest-400" />
                <Utensils className="w-4 h-4 text-earth-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-cream-100">
                  Padayal
                </span>
                <span className="block text-xs tracking-wider text-cream-400">
                  No Oil No Boil
                </span>
              </div>
            </Link>
            <p className="text-cream-400 text-sm leading-relaxed">
              Experience the natural way of cooking. Our unique no-oil, no-boil
              preservation method keeps nutrition intact while delivering
              extraordinary taste.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/menu" className="text-cream-400 hover:text-cream-100 transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-cream-400 hover:text-cream-100 transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-400 hover:text-cream-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="text-cream-400 hover:text-cream-100 transition-colors">
                  Wellness Hub
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream-400 hover:text-cream-100 transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-forest-400 flex-shrink-0 mt-0.5" />
                <span className="text-cream-400 text-sm">
                  123 Wellness Street, Green Valley<br />
                  Chennai, Tamil Nadu 600001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-forest-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-forest-400 flex-shrink-0" />
                <a href="mailto:hello@padayal.com" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                  hello@padayal.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-forest-400 flex-shrink-0 mt-0.5" />
                <div className="text-cream-400 text-sm">
                  <p className="font-medium text-cream-200">Mon - Fri</p>
                  <p>11:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-forest-400 flex-shrink-0 mt-0.5" />
                <div className="text-cream-400 text-sm">
                  <p className="font-medium text-cream-200">Sat - Sun</p>
                  <p>10:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-forest-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-forest-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-forest-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-earth-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream-500">
            <p>&copy; {currentYear} Padayal Restaurant. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-cream-100 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-cream-100 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
