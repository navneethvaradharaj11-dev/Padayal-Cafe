import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/layout/Layout';
import { AdminGuard } from './components/admin/AdminGuard';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { WellnessPage } from './pages/WellnessPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { ReservationPage } from './pages/ReservationPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MenuManagementPage } from './pages/admin/MenuManagementPage';
import { ReservationManagementPage } from './pages/admin/ReservationManagementPage';
import { ReviewManagementPage } from './pages/admin/ReviewManagementPage';
import { ArticleManagementPage } from './pages/admin/ArticleManagementPage';
import { ContactManagementPage } from './pages/admin/ContactManagementPage';
import { GalleryManagementPage } from './pages/admin/GalleryManagementPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="wellness" element={<WellnessPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="reservation" element={<ReservationPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<MenuManagementPage />} />
          <Route path="reservations" element={<ReservationManagementPage />} />
          <Route path="reviews" element={<ReviewManagementPage />} />
          <Route path="articles" element={<ArticleManagementPage />} />
          <Route path="contacts" element={<ContactManagementPage />} />
          <Route path="gallery" element={<GalleryManagementPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
