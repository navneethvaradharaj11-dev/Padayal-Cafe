import { Link } from 'react-router-dom';
import { Leaf, Heart, Target, Eye, Sparkles, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';
import { TiltCard3D } from '../components/3d/TiltCard3D';

const CORE_VALUES = [
  {
    icon: Leaf,
    title: '100% Unboiled & Raw Prana',
    description: 'We honour the natural vitality in fresh produce by serving it uncooked and unboiled, preserving living enzymes and whole natural nourishment.',
  },
  {
    icon: Heart,
    title: 'Zero Cooking Oils',
    description: 'Zero refined cooking oils, zero hydrogenated fats, zero frying. Natural healthy fats are derived solely from fresh Pollachi coconut and native seeds.',
  },
  {
    icon: Sparkles,
    title: 'Traditional Tamil Heritage',
    description: 'Our culinary preparations celebrate native South Indian wisdom — plantain leaf dining, Thooyamalli red aval, and cold-extracted herbal elixirs.',
  },
];

const PHILOSOPHY_PILLARS = [
  {
    step: '01',
    title: 'Natural Food Philosophy (உணவே மருந்து)',
    desc: 'Inspired by Tamil culinary wisdom, Padayal explores a No Oil, No Boil approach to food, celebrating natural ingredients in their unadulterated state without reliance on conventional cooking oils.',
  },
  {
    step: '02',
    title: 'Sprouting & Whole Grains',
    desc: 'Sprouting native pulses and soaking heritage grains are central to Padayal recipes, creating crisp textures and wholesome traditional preparations.',
  },
  {
    step: '03',
    title: 'Cold-Pressed Fresh Extracts',
    desc: 'Pure tender coconut water, freshly scraped coconut milk, and cold-extracted native herbs replace processed sauces and animal fats with clean, cooling nutrition.',
  },
  {
    step: '04',
    title: 'Eco-Friendly Plantain Leaf Dining',
    desc: 'We serve meals on freshly cut green plantain leaves, avoiding single-use plastics and honouring our cultural connection to mother nature.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Hero */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>OUR COIMBATORE HERITAGE</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Our Story<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            a quiet revolution in South Indian food culture
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Discover the philosophy behind "No Oil, No Boil" — authentic South Indian culinary tradition served fresh in its live, natural state on fresh plantain leaves.
          </p>
        </div>
      </section>

      {/* Movement & Origin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold text-padayal-cta uppercase tracking-widest">
              ✦ OUR ROOTS IN COIMBATORE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-padayal-text tracking-tight leading-tight">
              A gentle sanctuary for natural living.
            </h2>
            <p className="text-sm sm:text-base text-padayal-muted leading-relaxed font-sans">
              Padayal was founded in Coimbatore to explore alternative ways of preparing food without reliance on conventional cooking oils, deep frying, or refined additives.
            </p>
            <p className="text-sm sm:text-base text-padayal-muted leading-relaxed font-sans">
              Developed through Chef Padayal Sivakumar's culinary journey and association with natural-farming practitioners at Vanagam Ecological Foundation, our kitchen prepares traditional South Indian recipes using soaking, sprouting, and fresh stone-ground emulsions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-padayal-text">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-padayal-primary" />
                <span>Zero Refined Sugar</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-padayal-primary" />
                <span>Zero Cooking Oil</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-padayal-primary" />
                <span>Fresh Plantain Leaf</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <TiltCard3D maxTilt={8} scale={1.03}>
              <div className="w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-36 h-36 rounded-2xl bg-[#FAF8F5] p-3 flex items-center justify-center border border-black/[0.04]">
                  <img
                    src="/logo.png"
                    alt="Padayal No Oil No Boil Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="border-t border-black/[0.05] pt-4 w-full space-y-1">
                  <span className="font-editorial text-2xl font-normal text-padayal-text block">
                    படையல்
                  </span>
                  <span className="text-[11px] font-bold text-padayal-cta uppercase tracking-wider block">
                    அடுப்பில்லா எண்ணெயில்லா உணவகம்
                  </span>
                  <span className="text-xs text-padayal-muted block mt-1">
                    Singanallur, Coimbatore, Tamil Nadu
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </div>

        </div>
      </section>

      {/* Core Values in 3D Tilt Cards */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold text-padayal-cta uppercase tracking-widest">
            ✦ GUIDING PRINCIPLES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-padayal-text tracking-tight">
            What sets Padayal apart.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <TiltCard3D key={val.title} maxTilt={9} scale={1.03} className="h-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 border border-black/[0.04] shadow-sm hover:shadow-xl space-y-4 flex flex-col justify-between h-full transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F2F5EB] text-padayal-primary flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-normal text-padayal-text">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed mt-2">
                      {val.description}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </section>

      {/* The 4 Pillars of No Oil No Boil */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-bold text-padayal-primary uppercase tracking-widest">
            ✦ CULINARY HARVEST
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-padayal-text tracking-tight">
            The principles of unboiled dining.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHILOSOPHY_PILLARS.map((pil) => (
            <TiltCard3D key={pil.step} maxTilt={6} scale={1.02} className="h-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 border border-black/[0.04] shadow-sm hover:shadow-lg space-y-3 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-padayal-cta tracking-wider">
                    PILLAR {pil.step}
                  </span>
                  <h3 className="font-editorial text-xl font-normal text-padayal-text mt-1">{pil.title}</h3>
                  <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed mt-2">{pil.desc}</p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TiltCard3D maxTilt={6} scale={1.02} className="h-full">
            <div className="bg-[#F2F5EB] p-8 sm:p-10 rounded-[2.5rem] border border-padayal-primary/10 shadow-sm space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-padayal-primary shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-normal text-padayal-text">Our Mission</h3>
              <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
                To present authentic South Indian culinary heritage prepared through the No Oil, No Boil philosophy, offering a natural and wholesome dining choice in Coimbatore.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} scale={1.02} className="h-full">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-black/[0.04] shadow-sm space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-padayal-cta shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-normal text-padayal-text">Our Vision</h3>
              <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
                To encourage appreciation for natural ingredients, regional grains, and traditional food preparation methods while maintaining the rich flavours of South Indian dining.
              </p>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* Visit Coimbatore CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.04] text-center space-y-4 shadow-sm">
          <MapPin className="w-8 h-8 text-padayal-cta mx-auto" />
          <h2 className="font-editorial text-2xl sm:text-4xl font-normal text-padayal-text">
            Experience Padayal at Singanallur
          </h2>
          <p className="text-xs sm:text-sm text-padayal-muted max-w-xl mx-auto">
            {RESTAURANT_INFO.location.fullAddress}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="px-6 py-3 rounded-full bg-padayal-cta text-white text-xs sm:text-sm font-medium hover:bg-padayal-cta-hover transition-colors inline-flex items-center gap-2"
            >
              <span>View our menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/reservation"
              className="px-6 py-3 rounded-full bg-white text-padayal-text text-xs sm:text-sm font-medium border border-black/[0.12] hover:bg-black/[0.02] transition-colors"
            >
              Book a table
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
