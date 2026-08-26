import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  MessageSquare,
  BookOpen,
  Mail,
  Image,
  Menu,
  X,
  Leaf,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/menu', label: 'Menu Items', icon: UtensilsCrossed },
  { path: '/admin/reservations', label: 'Reservations', icon: Calendar },
  { path: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { path: '/admin/articles', label: 'Articles', icon: BookOpen },
  { path: '/admin/contacts', label: 'Enquiries', icon: Mail },
  { path: '/admin/gallery', label: 'Gallery', icon: Image },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-earth-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="relative">
              <Leaf className="w-6 h-6 text-forest-800" />
            </div>
            <span className="font-display text-lg font-bold text-forest-800">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-earth-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-earth-200 hidden lg:block">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="relative">
                <Leaf className="w-7 h-7 text-forest-800" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-forest-800">Padayal</span>
                <span className="block text-xs text-earth-500">Admin Dashboard</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-14 lg:mt-0">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-forest-800 text-white'
                      : 'text-earth-600 hover:bg-earth-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-earth-200">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-earth-600 hover:text-forest-700 mb-2"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">View Public Site</span>
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
