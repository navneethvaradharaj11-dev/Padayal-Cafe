import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InsertContact } from '../types/database';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const contact: InsertContact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message,
      };

      const { error } = await supabase
        .from('contacts')
        .insert([contact]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setLoading(false);
    }
  }

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
          <MessageCircle className="w-12 h-12 text-forest-400 mx-auto mb-6" />
          <h1 className="heading-xl text-white mb-4">Contact Us</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="heading-md text-earth-800 mb-6">Send Us a Message</h2>

              {success ? (
                <div className="bg-forest-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-forest-600" />
                  </div>
                  <h3 className="font-semibold text-earth-800 mb-2">Message Sent!</h3>
                  <p className="text-earth-600 mb-4">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input-field"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="textarea-field"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="heading-md text-earth-800 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-forest-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-800 mb-1">Address</h3>
                      <p className="text-earth-600">
                        123 Wellness Street, Green Valley<br />
                        Chennai, Tamil Nadu 600001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-forest-100 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-800 mb-1">Phone</h3>
                      <p className="text-earth-600">
                        <a href="tel:+919876543210" className="hover:text-forest-700 transition-colors">
                          +91 98765 43210
                        </a>
                      </p>
                      <p className="text-sm text-earth-500 mt-1">
                        WhatsApp available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-forest-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-800 mb-1">Email</h3>
                      <p className="text-earth-600">
                        <a href="mailto:hello@padayal.com" className="hover:text-forest-700 transition-colors">
                          hello@padayal.com
                        </a>
                      </p>
                      <p className="text-sm text-earth-500 mt-1">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-forest-100 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-800 mb-1">Hours</h3>
                      <p className="text-earth-600">
                        Mon - Fri: 11:00 AM - 10:00 PM<br />
                        Sat - Sun: 10:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 mt-6 w-full py-4 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BA5A] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.866 9.866 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.412-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.895c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.895a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-forest-50">
        <div className="container-custom">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-[21/9] bg-earth-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.872065454619!2d80.20964601482217!3d13.062556590781696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267a6e0c8e8c5%3A0x5f6f7f6f6f6f6f6f!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Padayal Restaurant Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
