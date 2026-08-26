import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Reservation } from '../../types/database';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export function ReservationManagementPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: false })
        .order('reservation_time', { ascending: true });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: Reservation['status']) {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      fetchReservations();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const filteredReservations = reservations.filter((res) => {
    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.phone.includes(searchQuery) ||
      res.confirmation_code?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'badge-warning',
      confirmed: 'badge-info',
      completed: 'badge-success',
      cancelled: 'badge-error',
    };
    return styles[status] || 'badge';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg text-earth-800">Reservations</h1>
        <p className="text-earth-600 mt-1">Manage table reservations</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="select-field w-auto"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="card-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-earth-50 border-b border-earth-200">
              <tr>
                <th className="text-left p-4 font-medium text-earth-700">Guest</th>
                <th className="text-left p-4 font-medium text-earth-700">Date & Time</th>
                <th className="text-left p-4 font-medium text-earth-700">Guests</th>
                <th className="text-left p-4 font-medium text-earth-700">Status</th>
                <th className="text-left p-4 font-medium text-earth-700">Code</th>
                <th className="text-left p-4 font-medium text-earth-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-100">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-earth-500">
                    No reservations found
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-earth-50 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-earth-800">{res.name}</p>
                      <p className="text-sm text-earth-500">{res.email}</p>
                      <p className="text-sm text-earth-500">{res.phone}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-earth-800">
                        {new Date(res.reservation_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-earth-500">{res.reservation_time}</p>
                    </td>
                    <td className="p-4 text-earth-800">{res.guest_count}</td>
                    <td className="p-4">
                      <span className={`badge ${getStatusBadge(res.status)}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm text-earth-600">
                      {res.confirmation_code || '-'}
                    </td>
                    <td className="p-4">
                      {res.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(res.id, 'confirmed')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateStatus(res.id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                      {res.status === 'confirmed' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(res.id, 'completed')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Complete"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateStatus(res.id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
