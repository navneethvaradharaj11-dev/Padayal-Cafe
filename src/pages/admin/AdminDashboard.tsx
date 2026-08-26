import { useState, useEffect } from 'react';
import { UtensilsCrossed, Calendar, MessageSquare, BookOpen, Mail, Image } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

interface Stats {
  menuItems: number;
  reservations: number;
  pendingReservations: number;
  reviews: number;
  articles: number;
  contacts: number;
  unreadContacts: number;
  gallery: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentReservations, setRecentReservations] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          menuItemsRes,
          reservationsRes,
          pendingResRes,
          reviewsRes,
          articlesRes,
          contactsRes,
          unreadContactsRes,
          galleryRes,
        ] = await Promise.all([
          supabase.from('menu_items').select('id', { count: 'exact', head: true }),
          supabase.from('reservations').select('id', { count: 'exact', head: true }),
          supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('reviews').select('id', { count: 'exact', head: true }),
          supabase.from('articles').select('id', { count: 'exact', head: true }),
          supabase.from('contacts').select('id', { count: 'exact', head: true }),
          supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
          supabase.from('gallery').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          menuItems: menuItemsRes.count || 0,
          reservations: reservationsRes.count || 0,
          pendingReservations: pendingResRes.count || 0,
          reviews: reviewsRes.count || 0,
          articles: articlesRes.count || 0,
          contacts: contactsRes.count || 0,
          unreadContacts: unreadContactsRes.count || 0,
          gallery: galleryRes.count || 0,
        });

        const [recentRes, recentContRes] = await Promise.all([
          supabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

        setRecentReservations(recentRes.data || []);
        setRecentContacts(recentContRes.data || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) return null;

  const STAT_CARDS = [
    { label: 'Menu Items', value: stats.menuItems, icon: UtensilsCrossed, color: 'bg-forest-100 text-forest-700' },
    { label: 'Reservations', value: stats.reservations, icon: Calendar, color: 'bg-blue-100 text-blue-700', subtext: `${stats.pendingReservations} pending` },
    { label: 'Reviews', value: stats.reviews, icon: MessageSquare, color: 'bg-amber-100 text-amber-700' },
    { label: 'Articles', value: stats.articles, icon: BookOpen, color: 'bg-purple-100 text-purple-700' },
    { label: 'Enquiries', value: stats.contacts, icon: Mail, color: 'bg-red-100 text-red-700', subtext: `${stats.unreadContacts} unread` },
    { label: 'Gallery', value: stats.gallery, icon: Image, color: 'bg-pink-100 text-pink-700' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-lg text-earth-800">Dashboard</h1>
        <p className="text-earth-600 mt-1">Welcome to Padayal Admin Dashboard</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-earth-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-earth-800 mt-1">{stat.value}</p>
                {stat.subtext && (
                  <p className="text-sm text-earth-500 mt-1">{stat.subtext}</p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold text-earth-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Reservations
          </h2>
          {recentReservations.length === 0 ? (
            <p className="text-earth-500 text-sm">No reservations yet</p>
          ) : (
            <div className="space-y-3">
              {recentReservations.map((res) => (
                <div key={res.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                  <div>
                    <p className="font-medium text-earth-800">{res.name}</p>
                    <p className="text-sm text-earth-500">
                      {new Date(res.reservation_date).toLocaleDateString()} at {res.reservation_time}
                    </p>
                  </div>
                  <span className={`badge ${
                    res.status === 'pending' ? 'badge-warning' :
                    res.status === 'confirmed' ? 'badge-success' :
                    res.status === 'completed' ? 'badge-info' : 'badge-error'
                  }`}>
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-earth-800 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Recent Enquiries
          </h2>
          {recentContacts.length === 0 ? (
            <p className="text-earth-500 text-sm">No enquiries yet</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                  <div>
                    <p className="font-medium text-earth-800">{contact.name}</p>
                    <p className="text-sm text-earth-500 truncate max-w-xs">{contact.subject || contact.message}</p>
                  </div>
                  <span className={`badge ${contact.status === 'unread' ? 'badge-error' : 'badge-success'}`}>
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
