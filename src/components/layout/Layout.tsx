import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from '../common/BottomNav';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#EDF2EE] flex items-center justify-center sm:py-6 font-sans text-padayal-text selection:bg-padayal-primary selection:text-white">
      
      {/* Mobile App Container (Centered, rounded card without phone border/notch) */}
      <div className="w-full max-w-[440px] h-screen sm:h-[92vh] sm:max-h-[880px] bg-padayal-bg sm:rounded-[36px] shadow-[0_20px_50px_rgba(17,36,21,0.14)] flex flex-col overflow-hidden relative border border-padayal-bg/80">
        
        {/* Sticky App Header */}
        <Header />

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav />

      </div>
    </div>
  );
}
