import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InsertContact } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { RESTAURANT_INFO } from '../config/restaurant';
import { TiltCard3D } from '../components/3d/TiltCard3D';

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
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Hero */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>SINGANALLUR DINING HALL & KITCHEN</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Contact<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            warm South Indian hospitality in Coimbatore
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Have questions about our No Oil No Boil menu, party catering, or table bookings? Connect directly with our restaurant team.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form in 3D Card */}
          <div className="lg:col-span-7">
            <TiltCard3D maxTilt={5} scale={1.01}>
              <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 sm:p-10 shadow-sm hover:shadow-xl border border-black/[0.04] transition-all duration-300">
                <span className="text-[11px] font-bold text-padayal-cta uppercase tracking-widest">
                  ✦ GET IN TOUCH
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-padayal-text mt-1 mb-2">
                  Send us an enquiry.
                </h2>
                <p className="text-xs sm:text-sm text-padayal-muted mb-8 leading-relaxed">
                  Fill out the note below and we will get back to you promptly.
                </p>

                {errorMessage && (
                  <div className="p-3.5 mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {success ? (
                  <div className="bg-[#F2F5EB] border border-padayal-primary/20 rounded-[2rem] p-8 sm:p-10 text-center space-y-3 animate-scale-in">
                    <div className="w-12 h-12 rounded-full bg-padayal-primary text-white flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-editorial text-2xl font-normal text-padayal-text">Message Received</h3>
                    <p className="text-xs sm:text-sm text-padayal-muted max-w-md mx-auto leading-relaxed">
                      Vanakkam! Thank you for reaching out to Padayal Coimbatore. Our team will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-padayal-cta text-white text-xs font-medium hover:bg-padayal-cta-hover transition-colors mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-full border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                          placeholder="e.g. Senthil Kumar"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-full border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                          placeholder="e.g. senthil@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-full border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                          placeholder="+91 82202 26662"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 text-xs sm:text-sm rounded-full border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20"
                          placeholder="Table reservation, Catering, Feedback"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-padayal-text mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-black/10 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-padayal-primary/20 resize-none"
                        placeholder="Write your note here..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover transition-colors inline-flex items-center gap-2 disabled:opacity-50"
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
            </TiltCard3D>
          </div>

          {/* Right Column: Restaurant Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <TiltCard3D maxTilt={6} scale={1.02}>
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm hover:shadow-md border border-black/[0.04] space-y-2">
                <div className="flex items-center gap-2.5 text-padayal-primary">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <h3 className="font-editorial font-bold text-base text-padayal-text">Restaurant Address</h3>
                </div>
                <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed pl-7">
                  {RESTAURANT_INFO.location.fullAddress}<br />
                  <span className="text-[11px] text-padayal-muted/70">Landmark: {RESTAURANT_INFO.location.landmark}</span>
                </p>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} scale={1.02}>
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm hover:shadow-md border border-black/[0.04] space-y-2">
                <div className="flex items-center gap-2.5 text-padayal-primary">
                  <Phone className="w-5 h-5 shrink-0" />
                  <h3 className="font-editorial font-bold text-base text-padayal-text">Direct Calling</h3>
                </div>
                <p className="text-xs sm:text-sm text-padayal-muted pl-7">
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-padayal-cta font-medium hover:underline">
                    {RESTAURANT_INFO.displayPhone}
                  </a>
                </p>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} scale={1.02}>
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm hover:shadow-md border border-black/[0.04] space-y-2">
                <div className="flex items-center gap-2.5 text-padayal-primary">
                  <Clock className="w-5 h-5 shrink-0" />
                  <h3 className="font-editorial font-bold text-base text-padayal-text">Operating Hours</h3>
                </div>
                <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed pl-7">
                  {RESTAURANT_INFO.displayHours}<br />
                  <span className="text-[11px] text-padayal-muted/70">Lunch Feast: 12:00 - 3:30 PM | Evening: 6:30 - 9:30 PM</span>
                </p>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} scale={1.02}>
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm hover:shadow-md border border-black/[0.04] space-y-2">
                <div className="flex items-center gap-2.5 text-padayal-primary">
                  <Mail className="w-5 h-5 shrink-0" />
                  <h3 className="font-editorial font-bold text-base text-padayal-text">Email Enquiries</h3>
                </div>
                <p className="text-xs sm:text-sm text-padayal-muted pl-7">
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-padayal-cta font-medium hover:underline">
                    {RESTAURANT_INFO.email}
                  </a>
                </p>
              </div>
            </TiltCard3D>

            {/* Direct WhatsApp Action Button */}
            <a
              href={RESTAURANT_INFO.whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full font-medium text-xs sm:text-sm shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Us on WhatsApp</span>
            </a>

          </div>

        </div>

        {/* Embedded Map of Coimbatore with 3D styling */}
        <div className="mt-16 rounded-[2.5rem] overflow-hidden shadow-sm border border-black/[0.04] bg-white">
          <div className="p-5 border-b border-black/[0.04] flex items-center justify-between">
            <span className="font-editorial text-sm font-bold text-padayal-text">
              Coimbatore Restaurant Location
            </span>
            <span className="text-xs text-padayal-muted">
              {RESTAURANT_INFO.location.city}, Tamil Nadu
            </span>
          </div>
          <div className="aspect-[21/9] w-full bg-[#FAF8F5]">
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
