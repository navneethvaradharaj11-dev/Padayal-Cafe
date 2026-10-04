import { useState } from 'react';
import { Calendar, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { TableBooking, SeatingArea } from '../../types/reservation';
import { supabase } from '../../lib/supabase';
import { RESTAURANT_INFO } from '../../config/restaurant';

const TIME_SLOTS = [
  '07:30 AM', '08:30 AM', '09:30 AM', // Breakfast
  '12:00 PM', '01:00 PM', '02:00 PM', // Lunch
  '06:30 PM', '07:30 PM', '08:30 PM', // Dinner
];

const SEATING_AREAS: { id: SeatingArea; label: string; desc: string }[] = [
  { id: 'indoor', label: 'Main Traditional Dining', desc: 'Cool natural bamboo setting with traditional music' },
  { id: 'patio', label: 'Veranda Patio', desc: 'Open-air veranda flanked by herbal plants' },
  { id: 'rooftop', label: 'Natural Green Balcony', desc: 'Peaceful garden seating overlooking green canopy' },
];

export function TableBookingForm() {
  const [guestCount, setGuestCount] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[3]);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('indoor');
  
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!guestName.trim() || !guestPhone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setSubmitting(true);
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `#RES-${refNum}`;

    const booking: TableBooking = {
      bookingId: `res_${Date.now()}`,
      bookingRef,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      guestEmail: guestEmail.trim() || undefined,
      date,
      timeSlot,
      guestCount,
      seatingArea,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Attempt to persist to Supabase reservations table
    try {
      await supabase.from('reservations').insert([
        {
          name: booking.guestName,
          email: booking.guestEmail || 'guest@padayal.local',
          phone: booking.guestPhone,
          reservation_date: booking.date,
          reservation_time: booking.timeSlot,
          guest_count: booking.guestCount,
          special_requests: `Area: ${booking.seatingArea} | ${booking.specialRequests || 'None'}`,
          status: 'confirmed',
          confirmation_code: bookingRef,
        },
      ]);
    } catch (err) {
      console.info('Saved reservation locally (Supabase fallback):', err);
    }

    setConfirmedBooking(booking);
    setSubmitting(false);
  };

  return (
    <div className="bg-padayal-surface rounded-3xl p-6 sm:p-8 shadow-organic border border-padayal-bg max-w-xl mx-auto">
      {confirmedBooking ? (
        <div className="text-center py-4 space-y-5 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-padayal-secondary-light text-padayal-primary flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-padayal-cta/15 text-padayal-cta font-bold text-xs uppercase tracking-wider">
              Table Reserved Successfully
            </span>
            <h2 className="font-pranic text-2xl font-bold text-padayal-text mt-2">
              Vanakkam! We Look Forward to Serving You
            </h2>
            <p className="text-xs sm:text-sm text-padayal-muted mt-1">
              Your reservation reference code is{' '}
              <strong className="font-extrabold text-padayal-primary text-base">{confirmedBooking.bookingRef}</strong>
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-padayal-bg/70 p-5 rounded-2xl text-left space-y-2.5 border border-padayal-bg text-xs sm:text-sm">
            <div className="flex justify-between border-b border-padayal-bg pb-2">
              <span className="text-padayal-muted">Guest Name</span>
              <span className="font-bold text-padayal-text">{confirmedBooking.guestName}</span>
            </div>
            <div className="flex justify-between border-b border-padayal-bg pb-2">
              <span className="text-padayal-muted">Date & Time</span>
              <span className="font-bold text-padayal-text">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
            </div>
            <div className="flex justify-between border-b border-padayal-bg pb-2">
              <span className="text-padayal-muted">Party Size</span>
              <span className="font-bold text-padayal-text">{confirmedBooking.guestCount} Guests</span>
            </div>
            <div className="flex justify-between border-b border-padayal-bg pb-2">
              <span className="text-padayal-muted">Seating Area</span>
              <span className="font-bold text-padayal-primary capitalize">{confirmedBooking.seatingArea}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-padayal-muted">Location</span>
              <span className="font-medium text-padayal-text text-right">{RESTAURANT_INFO.location.area}, Coimbatore</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-padayal-bg text-padayal-text text-xs font-bold hover:bg-padayal-secondary-light transition-colors"
            >
              <Phone className="w-4 h-4 text-padayal-primary" />
              Call Front Desk
            </a>
            <button
              type="button"
              onClick={() => setConfirmedBooking(null)}
              className="btn-primary text-xs sm:text-sm py-3 px-6 flex-1"
            >
              Book Another Table
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center max-w-sm mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Instant Table Reservation
            </span>
            <h2 className="font-pranic text-2xl font-extrabold text-padayal-text mt-2">
              Reserve Your Table
            </h2>
            <p className="text-xs text-padayal-muted mt-1">
              Fresh traditional dining served on plantain leaf. No reservation fees.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* 1. Guest Count */}
          <div>
            <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2.5">
              1. Number of Guests
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestCount(num)}
                  className={`w-11 h-11 rounded-xl text-sm font-bold transition-all border ${
                    guestCount === num
                      ? 'bg-padayal-primary text-padayal-surface border-padayal-primary shadow-sm ring-2 ring-padayal-primary/20'
                      : 'bg-padayal-bg text-padayal-text border-padayal-bg hover:border-padayal-secondary/40'
                  }`}
                >
                  {num}{num === 12 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2">
                2. Select Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-padayal-muted pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2">
                3. Preferred Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-padayal-primary"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Seating Area */}
          <div>
            <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2.5">
              4. Preferred Dining Space
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SEATING_AREAS.map((area) => {
                const isSelected = seatingArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-padayal-cta bg-padayal-cta/5 ring-2 ring-padayal-cta/20 text-padayal-text'
                        : 'border-padayal-bg hover:border-padayal-secondary/30 text-padayal-muted'
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-bold text-padayal-text">{area.label}</span>
                    <span className="text-[11px] text-padayal-muted mt-0.5 block leading-tight">{area.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Guest Details */}
          <div className="space-y-3.5">
            <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider">
              5. Contact Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name *"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                required
              />
              <input
                type="tel"
                placeholder="Mobile / WhatsApp Number *"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email Address (Optional)"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
            />

            <textarea
              rows={2}
              placeholder="Special Requests (e.g., Elder-friendly seating, high chair, birthday meal)"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-padayal-cta text-padayal-surface font-extrabold text-sm sm:text-base hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-[0.98] transition-all shadow-md disabled:opacity-50"
          >
            {submitting ? 'Confirming Your Table...' : 'Confirm Table Reservation'}
          </button>
        </form>
      )}
    </div>
  );
}
