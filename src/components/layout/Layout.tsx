import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from '../common/BottomNav';

export function Layout() {
  return (
    <div className="min-h-screen bg-padayal-bg flex flex-col font-sans text-padayal-text selection:bg-padayal-primary selection:text-white">
      {/* Sticky Top Header (Responsive Desktop & Mobile) */}
      <Header />

      {/* Main Content Area: Full width, safe padding on mobile to clear bottom nav */}
      <main className="flex-1 w-full pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <Outlet />
      </main>

      {/* Full-width Responsive Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Navigation (Visible only on mobile/tablet screens < 768px) */}
      <BottomNav />
    </div>
  );
}
