import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from '../common/BottomNav';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-padayal-bg text-padayal-text selection:bg-padayal-primary selection:text-white">
      <Header />
      <main className="flex-grow pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
