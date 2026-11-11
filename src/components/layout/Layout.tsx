import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from '../common/BottomNav';
import { LiveWallpaperBackground } from '../3d/LiveWallpaperBackground';

export function Layout() {
  const [isZenMode, setIsZenMode] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-padayal-text selection:bg-padayal-primary selection:text-white overflow-x-hidden">
      {/* Authentic South Indian Botanical 3D Live Wallpaper (Banana leaves, Tulsi foliage, God-rays, Prana particles, Interactive wind) */}
      <LiveWallpaperBackground onZenModeChange={setIsZenMode} />

      {/* Foreground Content Stack with Zen Mode Smooth Dissolve */}
      <div
        className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-700 ease-out ${
          isZenMode ? 'opacity-10 pointer-events-none' : 'opacity-100'
        }`}
      >
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
