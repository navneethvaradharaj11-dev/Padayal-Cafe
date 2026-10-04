import { TableBookingForm } from '../components/reservation/TableBookingForm';
import { Leaf, Clock, MapPin, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

export function ReservationPage() {
  return (
    <div className="min-h-screen py-8 sm:py-14 bg-padayal-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Hero Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" /> Padayal Coimbatore
          </span>
          <h1 className="font-pranic text-3xl sm:text-5xl font-extrabold text-padayal-text tracking-tight">
            Reserve Your Traditional Dining Experience
          </h1>
          <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
            Join us for an authentic South Indian No Oil No Boil feast, served fresh on plantain leaf with cold-pressed elixirs and live sprouts.
          </p>
        </div>

        {/* Quick Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs sm:text-sm">
          <div className="bg-padayal-surface p-4 rounded-2xl border border-padayal-bg flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-padayal-secondary-light text-padayal-primary flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-padayal-text">Meal Timings</p>
              <p className="text-padayal-muted text-xs">Lunch 12:00-3:30 PM | Dinner 6:30-9:30 PM</p>
            </div>
          </div>

          <div className="bg-padayal-surface p-4 rounded-2xl border border-padayal-bg flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-padayal-secondary-light text-padayal-primary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-padayal-text">Location</p>
              <p className="text-padayal-muted text-xs">{RESTAURANT_INFO.location.area}, Coimbatore</p>
            </div>
          </div>

          <div className="bg-padayal-surface p-4 rounded-2xl border border-padayal-bg flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-padayal-secondary-light text-padayal-primary flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-padayal-text">Instant Assistance</p>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-padayal-primary hover:underline font-semibold text-xs">
                {RESTAURANT_INFO.displayPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div>
          <TableBookingForm />
        </div>

      </div>
    </div>
  );
}
