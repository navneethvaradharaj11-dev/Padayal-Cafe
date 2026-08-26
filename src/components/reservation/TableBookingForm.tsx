import { useState } from 'react';
import { Calendar, Users, Clock, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { TableBooking, SeatingArea } from '../../types/reservation';

const TIME_SLOTS = [
  '12:00 PM', '01:00 PM', '02:00 PM',
  '07:00 PM', '08:00 PM', '09:00 PM'
];

const SEATING_AREAS: { id: SeatingArea; label: string; desc: string }[] = [
  { id: 'indoor', label: 'Pranic Hall (Indoor)', desc: 'Air-conditioned natural bamboo aesthetic' },
  { id: 'patio', label: 'Garden Patio', desc: 'Open air surrounded by herbal gardens' },
  { id: 'rooftop', label: 'Sky Rooftop', desc: 'Panoramic sunset wellness dining' },
];

export function TableBookingForm() {
  const [guestCount, setGuestCount] = useState(2);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('indoor');
  
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const refNum = Math.floor(1000 + Math.random() * 9000);
    const booking: TableBooking = {
      bookingId: `res_${Date.now()}`,
      bookingRef: `#RES-${refNum}`,
      guestName,
      guestPhone,
      guestEmail,
      date,
      timeSlot,
      guestCount,
      seatingArea,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(booking);
  };

  return (
    <div className="bg-padayal-surface rounded-3xl p-6 sm:p-8 shadow-organic border border-padayal-bg max-w-2xl mx-auto">
      {confirmedBooking ? (
        <div className="text-center py-8 space-y-6 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-padayal-secondary-light text-padayal-primary flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-padayal-cta/15 text-padayal-cta font-bold text-xs">
              Booking Confirmed
            </span>
            <h2 className="font-pranic text-3xl font-bold text-padayal-text mt-2">
              We Can't Wait to Host You!
            </h2>
            <p className="text-sm text-padayal-muted mt-1">
              Your table reference code is <span className="font-extrabold text-padayal-primary">{confirmedBooking.bookingRef}</span>
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-padayal-bg/60 p-5 rounded-2xl text-left space-y-3 border border-padayal-bg max-w-md mx-auto text-sm">
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
            <div className="flex justify-between">
              <span className="text-padayal-muted">Seating Area</span>
              <span className="font-bold text-padayal-primary capitalize">{confirmedBooking.seatingArea}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setConfirmedBooking(null)}
            className="btn-primary text-sm px-6 py-3"
          >
            Book Another Table
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center max-w-md mx-auto mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Instant Table Reservation
            </span>
            <h2 className="font-pranic text-2xl sm:text-3xl font-bold text-padayal-text mt-2">
              Reserve Your Pranic Dining Experience
            </h2>
          </div>

          {/* 1. Guest Count */}
          <div>
            <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2">
              1. Number of Guests
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
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
                  {num}{num === 10 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date & Time */}
          <div className="grid sm:grid-cols-2 gap-4">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2">
                3. Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-padayal-primary"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Seating Area */}
          <div>
            <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-2">
              4. Preferred Seating Environment
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {SEATING_AREAS.map((area) => {
                const isSelected = seatingArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-padayal-cta bg-padayal-cta/5 ring-2 ring-padayal-cta/20 text-padayal-text'
                        : 'border-padayal-bg hover:border-padayal-secondary/30 text-padayal-muted'
                    }`}
                  >
                    <span className="block text-sm font-bold text-padayal-text">{area.label}</span>
                    <span className="text-[11px] text-padayal-muted mt-0.5 block leading-tight">{area.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Guest Details */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider">
              5. Contact Details
            </label>

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Full Name *"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                required
              />
            </div>

            <textarea
              rows={2}
              placeholder="Special Requests (e.g. Birthday celebration, High chair needed)"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-padayal-cta text-padayal-surface font-bold text-sm hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-[0.98] transition-all shadow-md"
          >
            Confirm Reservation
          </button>
        </form>
      )}
    </div>
  );
}
