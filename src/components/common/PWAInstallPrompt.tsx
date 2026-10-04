import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('padayal_pwa_dismissed') === 'true';
  });

  useEffect(() => {
    // Check if app is already installed in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    
    if (isStandalone) {
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [isDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Install prompt error:', err);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('padayal_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Install Padayal App"
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 animate-slide-up"
    >
      <div className="bg-[#183620] text-cream-100 p-4 rounded-2xl shadow-2xl border border-padayal-secondary/30 flex items-start gap-3 relative">
        <div className="w-12 h-12 rounded-xl bg-padayal-primary/40 border border-padayal-secondary/40 flex items-center justify-center shrink-0 text-padayal-secondary">
          <Smartphone className="w-6 h-6" />
        </div>

        <div className="flex-1 pr-6">
          <div className="flex items-center gap-1.5 text-xs text-padayal-secondary font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Install Web App</span>
          </div>
          <h4 className="text-sm font-bold text-white mt-0.5">
            Add Padayal to Home Screen
          </h4>
          <p className="text-xs text-cream-300 mt-1 leading-relaxed">
            Fast ordering, instant table booking, and offline menu browsing directly from your phone.
          </p>

          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-padayal-cta text-white text-xs font-bold shadow-md hover:bg-padayal-cta-hover active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-lg text-cream-400 hover:text-white text-xs font-semibold transition-colors"
            >
              Not now
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-cream-400 hover:text-white p-1 rounded-lg"
          aria-label="Dismiss install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
