import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from '../common/BottomNav';
import { LiveBackground3D } from '../3d/LiveBackground3D';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] relative flex flex-col font-sans text-padayal-text selection:bg-padayal-primary selection:text-white overflow-x-hidden">
      {/* 3D Live Botanical WebGL Background (Waves, Floating Leaves, Pollen, Parallax) */}
      <LiveBackground3D />

      {/* Foreground Content Stack */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Top Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 w-full pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          <Outlet />
        </main>

        {/* Responsive Footer */}
        <Footer />

        {/* Sticky Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
