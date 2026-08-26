import { useState, useEffect } from 'react';
import { Search, Mail, CheckCircle, Reply, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Contact } from '../../types/database';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function ContactManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: Contact['status']) {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function deleteContact(id: string) {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      unread: 'badge-error',
      read: 'badge-warning',
      replied: 'badge-success',
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
        <h1 className="heading-lg text-earth-800">Customer Enquiries</h1>
        <p className="text-earth-600 mt-1">Manage contact form submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="select-field w-auto"
        >
          <option value="all">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredContacts.length === 0 ? (
          <div className="card p-8 text-center text-earth-500">
            No enquiries found
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className={`card p-6 ${contact.status === 'unread' ? 'border-l-4 border-l-forest-600' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-earth-800">{contact.name}</h3>
                    <span className={`badge ${getStatusBadge(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-earth-500 mb-3">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-forest-600">
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                    {contact.phone && <span>{contact.phone}</span>}
                  </div>
                  {contact.subject && (
                    <p className="font-medium text-earth-700 mb-2">{contact.subject}</p>
                  )}
                  <p className="text-earth-600">{contact.message}</p>
                  <p className="text-xs text-earth-400 mt-3">
                    {new Date(contact.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {contact.status === 'unread' && (
                    <button
                      onClick={() => updateStatus(contact.id, 'read')}
                      className="p-2 text-earth-600 hover:bg-earth-50 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <a
                    href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your enquiry'}&body=Dear ${contact.name},%0D%0A%0D%0A`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Reply via email"
                  >
                    <Reply className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
