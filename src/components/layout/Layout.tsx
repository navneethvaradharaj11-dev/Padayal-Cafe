import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from '../common/BottomNav';
import { Wifi, Battery, Signal } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#EFECE6] flex items-center justify-center sm:py-6 sm:px-4 font-sans text-padayal-text selection:bg-padayal-primary selection:text-white">
      
      {/* Phone App Frame Container */}
      <div className="w-full max-w-[440px] h-screen sm:h-[92vh] sm:max-h-[900px] bg-padayal-bg sm:rounded-[48px] sm:border-[10px] sm:border-[#1A2E20] shadow-[0_25px_60px_-15px_rgba(17,36,21,0.25)] flex flex-col overflow-hidden relative border-box">
        
        {/* Top Status Bar (Desktop Mock) */}
        <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-bold text-padayal-text/70 bg-padayal-primary text-white select-none shrink-0 z-50">
          <span>09:41</span>
          {/* Dynamic Island Notch */}
          <div className="w-24 h-4 bg-[#1A2E20] rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-black/40 border border-white/10" />
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            <Signal className="w-3.5 h-3.5 fill-current" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Sticky Header inside Phone Frame */}
        <Header />

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar pt-16 pb-20">
          <Outlet />
        </main>

        {/* Fixed Bottom Navigation Bar inside Phone Frame */}
        <BottomNav />

      </div>
    </div>
  );
}
