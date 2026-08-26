import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InsertReservation } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
];

export function ReservationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    special_requests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function generateConfirmationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PD-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.date) newErrors.date = 'Date is required';
    else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) newErrors.date = 'Date cannot be in the past';
    }
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.guests < 1 || formData.guests > 20) newErrors.guests = 'Guests must be between 1 and 20';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const code = generateConfirmationCode();
      const reservation: InsertReservation = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reservation_date: formData.date,
        reservation_time: formData.time,
        guest_count: formData.guests,
        special_requests: formData.special_requests || null,
      };

      const { error } = await supabase
        .from('reservations')
        .insert([{ ...reservation, confirmation_code: code }]);

      if (error) throw error;

      setConfirmationCode(code);
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting reservation:', error);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-forest-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Calendar className="w-12 h-12 text-forest-400 mx-auto mb-6" />
          <h1 className="heading-xl text-white mb-4">Reserve Your Table</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Book your dining experience at Padayal. We look forward to serving
            you a healthy, delicious meal.
          </p>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {success ? (
              <div className="card p-8 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-forest-600" />
                </div>
                <h2 className="heading-md text-earth-800 mb-4">
                  Reservation Confirmed!
                </h2>
                <div className="bg-forest-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-earth-600 mb-1">Confirmation Code</p>
                  <p className="text-2xl font-mono font-bold text-forest-700">
                    {confirmationCode}
                  </p>
                </div>
                <div className="space-y-3 text-left mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-forest-600" />
                    <span>
                      {new Date(formData.date + 'T' + formData.time).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-forest-600" />
                    <span>{formData.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-forest-600" />
                    <span>{formData.guests} Guest{formData.guests > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <p className="text-earth-600 mb-6">
                  A confirmation email has been sent to {formData.email}.
                  We'll see you soon!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/" className="btn-primary">
                    Return Home
                  </Link>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        date: '',
                        time: '',
                        guests: 2,
                        special_requests: '',
                      });
                    }}
                    className="btn-secondary"
                  >
                    Make Another Reservation
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-earth-600 hover:text-forest-700 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>

                <div className="card p-8">
                  <h2 className="heading-md text-earth-800 mb-6">
                    Book Your Table
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Number of Guests *
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                          className={`select-field ${errors.guests ? 'border-red-500' : ''}`}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                        {errors.guests && (
                          <p className="text-red-600 text-sm mt-1">{errors.guests}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Reservation Date *
                        </label>
                        <input
                          type="date"
                          min={today}
                          max={maxDateString}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={`input-field ${errors.date ? 'border-red-500' : ''}`}
                        />
                        {errors.date && (
                          <p className="text-red-600 text-sm mt-1">{errors.date}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Preferred Time *
                        </label>
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className={`select-field ${errors.time ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select a time</option>
                          {TIME_SLOTS.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="text-red-600 text-sm mt-1">{errors.time}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        rows={3}
                        value={formData.special_requests}
                        onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                        className="textarea-field"
                        placeholder="Any dietary restrictions, special occasions, seating preferences..."
                      />
                    </div>

                    <div className="bg-forest-50 rounded-xl p-4">
                      <p className="text-sm text-earth-600">
                        <strong>Note:</strong> Reservations are subject to
                        availability. For groups larger than 20, please{' '}
                        <Link to="/contact" className="text-forest-700 underline">
                          contact us directly
                        </Link>.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <LoadingSpinner size="sm" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          Confirm Reservation
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
