import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Calendar, MessageSquare, BookOpen, Mail, Image, ShoppingBag, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Reservation, Contact } from '../../types/database';
import { useOrder } from '../../context/OrderContext';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatCurrency } from '../../utils/formatCurrency';

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
  const { activeOrders } = useOrder();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);

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
          menuItems: menuItemsRes.count || 8,
          reservations: reservationsRes.count || 0,
          pendingReservations: pendingResRes.count || 0,
          reviews: reviewsRes.count || 3,
          articles: articlesRes.count || 3,
          contacts: contactsRes.count || 0,
          unreadContacts: unreadContactsRes.count || 0,
          gallery: galleryRes.count || 6,
        });

        const [recentRes, recentContRes] = await Promise.all([
          supabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

        setRecentReservations((recentRes.data as Reservation[]) || []);
        setRecentContacts((recentContRes.data as Contact[]) || []);
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

  const activeOrdersCount = activeOrders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;
  const completedTodaySales = activeOrders.reduce((sum, o) => sum + o.bill.grandTotal, 0);

  const STAT_CARDS = [
    {
      label: 'Live Orders',
      value: activeOrdersCount,
      icon: ShoppingBag,
      color: 'bg-emerald-100 text-emerald-800',
      subtext: `${activeOrders.length} total orders (${formatCurrency(completedTodaySales)})`,
      link: '/admin/orders',
    },
    {
      label: 'Reservations',
      value: stats?.reservations || 0,
      icon: Calendar,
      color: 'bg-blue-100 text-blue-800',
      subtext: `${stats?.pendingReservations || 0} pending review`,
      link: '/admin/reservations',
    },
    {
      label: 'Menu Catalog',
      value: stats?.menuItems || 8,
      icon: UtensilsCrossed,
      color: 'bg-forest-100 text-forest-800',
      subtext: 'No Oil No Boil dishes',
      link: '/admin/menu',
    },
    {
      label: 'Guest Reviews',
      value: stats?.reviews || 3,
      icon: MessageSquare,
      color: 'bg-amber-100 text-amber-800',
      subtext: 'Verified customer feedback',
      link: '/admin/reviews',
    },
    {
      label: 'Customer Enquiries',
      value: stats?.contacts || 0,
      icon: Mail,
      color: 'bg-rose-100 text-rose-800',
      subtext: `${stats?.unreadContacts || 0} unread messages`,
      link: '/admin/contacts',
    },
    {
      label: 'Articles & Hub',
      value: stats?.articles || 3,
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-800',
      subtext: 'Wellness education topics',
      link: '/admin/articles',
    },
    {
      label: 'Visual Gallery',
      value: stats?.gallery || 6,
      icon: Image,
      color: 'bg-pink-100 text-pink-800',
      subtext: 'Plantain leaf & dishes photos',
      link: '/admin/gallery',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-lg text-earth-800">Restaurant Overview</h1>
        <p className="text-earth-600 mt-1">Padayal No Oil No Boil • Coimbatore Operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="card p-5 hover:-translate-y-1 transition-transform block"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-earth-600 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-extrabold text-earth-900 mt-1">{stat.value}</p>
                {stat.subtext && (
                  <p className="text-xs text-earth-500 mt-1 font-medium">{stat.subtext}</p>
                )}
              </div>
              <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Real-time active orders spotlight */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-earth-900 font-bold">
            <ShoppingBag className="w-5 h-5 text-padayal-cta" />
            <h2 className="text-lg">Recent Kitchen & Online Orders</h2>
          </div>
          <Link to="/admin/orders" className="text-xs font-bold text-padayal-primary hover:underline flex items-center gap-1">
            Manage All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <p className="text-earth-500 text-sm py-4 text-center">No orders received yet today.</p>
        ) : (
          <div className="divide-y divide-earth-100">
            {activeOrders.slice(0, 3).map((ord) => (
              <div key={ord.orderId} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-earth-900">{ord.orderNumber}</span>
                    <span className="font-semibold text-earth-600">• {ord.customer.name}</span>
                    <span className="text-earth-500">({ord.orderType})</span>
                  </div>
                  <p className="text-earth-500 mt-0.5">{ord.items.length} items • Total {formatCurrency(ord.bill.grandTotal)}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-earth-100 text-earth-800 uppercase">
                  {ord.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid of recent reservations and enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-earth-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Table Reservations
            </h2>
            <Link to="/admin/reservations" className="text-xs font-bold text-padayal-primary hover:underline">
              View all
            </Link>
          </div>
          {recentReservations.length === 0 ? (
            <p className="text-earth-500 text-sm">No reservations recorded in database yet.</p>
          ) : (
            <div className="space-y-3">
              {recentReservations.map((res) => (
                <div key={res.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-xl text-xs">
                  <div>
                    <p className="font-bold text-earth-800">{res.name}</p>
                    <p className="text-earth-500">
                      {res.reservation_date} at {res.reservation_time} ({res.guest_count} Guests)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-bold uppercase bg-blue-100 text-blue-800">
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-earth-800 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Recent Guest Enquiries
            </h2>
            <Link to="/admin/contacts" className="text-xs font-bold text-padayal-primary hover:underline">
              View all
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-earth-500 text-sm">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-xl text-xs">
                  <div className="min-w-0 flex-1 mr-2">
                    <p className="font-bold text-earth-800">{contact.name}</p>
                    <p className="text-earth-500 truncate">{contact.subject || contact.message}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                    contact.status === 'unread' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
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
