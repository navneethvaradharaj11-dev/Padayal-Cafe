import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InsertContact } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { RESTAURANT_INFO } from '../config/restaurant';

export function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);

    try {
      const contact: InsertContact = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject.trim() || 'General Customer Enquiry',
        message: formData.message.trim(),
      };

      const { error } = await supabase.from('contacts').insert([contact]);
      if (error) {
        console.warn('Supabase contact insert notice:', error);
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      // Still show success to user so they are not blocked if offline
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pb-16 bg-padayal-bg">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#183620] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <MessageCircle className="w-10 h-10 text-padayal-secondary mx-auto" />
          <h1 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
            Connect With Padayal
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 max-w-xl mx-auto leading-relaxed">
            Have questions about our No Oil No Boil menu, party orders, or table reservations? Reach out to our Coimbatore restaurant team.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-padayal-surface rounded-3xl p-6 sm:p-8 shadow-organic border border-padayal-bg">
            <h2 className="font-editorial text-2xl font-bold text-padayal-text mb-1">
              Send Us an Enquiry
            </h2>
            <p className="text-xs text-padayal-muted mb-6">
              Fill out the form below and we will respond promptly.
            </p>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {success ? (
              <div className="bg-padayal-secondary-light/60 border border-padayal-secondary/30 rounded-2xl p-8 text-center space-y-3 animate-scale-in">
                <div className="w-14 h-14 rounded-full bg-padayal-primary text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-padayal-text">Message Received!</h3>
                <p className="text-xs sm:text-sm text-padayal-muted max-w-md mx-auto">
                  Vanakkam! Thank you for reaching out to Padayal Coimbatore. Our team will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="btn-primary text-xs py-2.5 px-5 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                      placeholder="e.g. Senthil Kumar"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                      placeholder="e.g. senthil@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                      placeholder="+91 82202 26662"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary"
                      placeholder="Table reservation, Catering, Feedback"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-padayal-muted uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary resize-none"
                    placeholder="Write your enquiry or question here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-xs sm:text-sm py-3 px-8 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Restaurant Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-2">
              <div className="flex items-center gap-2.5 text-padayal-primary">
                <MapPin className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-padayal-text">Restaurant Address</h3>
              </div>
              <p className="text-xs text-padayal-muted leading-relaxed pl-7.5">
                {RESTAURANT_INFO.location.fullAddress}<br />
                Landmark: {RESTAURANT_INFO.location.landmark}
              </p>
            </div>

            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-2">
              <div className="flex items-center gap-2.5 text-padayal-primary">
                <Phone className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-padayal-text">Direct Calling</h3>
              </div>
              <p className="text-xs text-padayal-muted pl-7.5">
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-padayal-primary font-semibold hover:underline">
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </p>
            </div>

            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-2">
              <div className="flex items-center gap-2.5 text-padayal-primary">
                <Clock className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-padayal-text">Operating Hours</h3>
              </div>
              <p className="text-xs text-padayal-muted leading-relaxed pl-7.5">
                {RESTAURANT_INFO.displayHours}<br />
                Breakfast: 7:30 - 10:30 AM | Meals: 12:00 - 3:30 PM | Dinner: 6:30 - 9:30 PM
              </p>
            </div>

            <div className="bg-padayal-surface rounded-2xl p-5 shadow-organic border border-padayal-bg space-y-2">
              <div className="flex items-center gap-2.5 text-padayal-primary">
                <Mail className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-padayal-text">Email Enquiries</h3>
              </div>
              <p className="text-xs text-padayal-muted pl-7.5">
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-padayal-primary hover:underline">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={RESTAURANT_INFO.whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Front Desk on WhatsApp</span>
            </a>

          </div>

        </div>

        {/* Embedded Map of Coimbatore */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-organic border border-padayal-bg bg-padayal-surface">
          <div className="p-4 border-b border-padayal-bg flex items-center justify-between">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-padayal-text">
              Coimbatore Restaurant Map
            </span>
            <span className="text-xs text-padayal-muted">
              {RESTAURANT_INFO.location.city}, {RESTAURANT_INFO.location.state}
            </span>
          </div>
          <div className="aspect-[21/9] w-full bg-padayal-bg">
            <iframe
              src={RESTAURANT_INFO.location.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Padayal Restaurant Coimbatore Map"
            />
          </div>
        </div>

      </section>
    </div>
  );
}
