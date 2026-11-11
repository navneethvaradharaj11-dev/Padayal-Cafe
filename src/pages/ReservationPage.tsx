import { TableBookingForm } from '../components/reservation/TableBookingForm';
import { Leaf, Clock, MapPin, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';
import { TiltCard3D } from '../components/3d/TiltCard3D';

export function ReservationPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Hero */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>PLANTAIN LEAF DINING • முன்பதிவு</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Book Table<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            reserve your traditional unboiled feast
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Join us for an authentic South Indian No Oil No Boil feast, served fresh on plantain leaves with zero waiting time.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Quick Highlights Row in 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs sm:text-sm">
          <TiltCard3D maxTilt={6} scale={1.02}>
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-[2rem] border border-black/[0.04] shadow-sm flex items-center gap-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#F2F5EB] text-padayal-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-editorial font-bold text-sm text-padayal-text">Meal Timings</p>
                <p className="text-padayal-muted text-xs">Lunch 12:00-3:30 PM | Dinner 6:30-9:30 PM</p>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} scale={1.02}>
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-[2rem] border border-black/[0.04] shadow-sm flex items-center gap-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#F2F5EB] text-padayal-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-editorial font-bold text-sm text-padayal-text">Location</p>
                <p className="text-padayal-muted text-xs">{RESTAURANT_INFO.location.area}, Coimbatore</p>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} scale={1.02}>
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-[2rem] border border-black/[0.04] shadow-sm flex items-center gap-3 h-full">
              <div className="w-10 h-10 rounded-2xl bg-[#F2F5EB] text-padayal-primary flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-editorial font-bold text-sm text-padayal-text">Instant Assistance</p>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-padayal-cta hover:underline font-semibold text-xs">
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Form Container */}
        <div>
          <TableBookingForm />
        </div>

      </div>
    </div>
  );
}
