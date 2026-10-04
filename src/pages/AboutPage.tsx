import { Link } from 'react-router-dom';
import { Leaf, Heart, Target, Eye, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

const CORE_VALUES = [
  {
    icon: Leaf,
    title: '100% Raw & Unboiled',
    description: 'We honour the vital prana in natural produce by serving it uncooked and unboiled, preserving all vitamins and live enzymes intact.',
  },
  {
    icon: Heart,
    title: 'Zero Cooking Oils',
    description: 'We use zero refined oils or trans-fats. Natural healthy fats are derived solely from fresh coconut, native seeds, and unheated pulses.',
  },
  {
    icon: Sparkles,
    title: 'Traditional Tamil Heritage',
    description: 'Our preparations celebrate native South Indian wisdom — plantain leaf presentation, red aval, native greens, and earthen vessels.',
  },
];

const PHILOSOPHY_PILLARS = [
  {
    step: '01',
    title: 'Food as Natural Medicine (உணவே மருந்து)',
    desc: 'Ancient Tamil Siddha and nature-cure traditions taught that natural, unheated food has innate healing intelligence. When food is not destroyed by high heat or rancid oils, it nourishes and rejuvenates every cell.',
  },
  {
    step: '02',
    title: 'Sprouting & Bio-Availability',
    desc: 'Sprouting pulses and grains multiplies their enzymatic activity, Vitamin C, and bio-available plant protein while breaking down anti-nutrients for easy, light digestion.',
  },
  {
    step: '03',
    title: 'Cold-Pressed Fresh Extracts',
    desc: 'Pure tender coconut water, freshly scraped coconut milk, and cold-extracted native herbs replace processed sauces and animal fats with clean, cooling nutrition.',
  },
  {
    step: '04',
    title: 'Eco-Friendly Traditional Dining',
    desc: 'We serve meals on freshly cut green plantain leaves, avoiding single-use plastics and honouring our cultural connection to mother nature.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen pb-16 bg-padayal-bg">
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#183620] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cream-200 text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5 text-padayal-secondary" /> Padayal Coimbatore Story
          </span>
          <h1 className="font-pranic text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            The South Indian Natural Food Movement
          </h1>
          <p className="text-sm sm:text-lg text-cream-300 max-w-2xl mx-auto leading-relaxed">
            Discover the philosophy behind "No Oil, No Boil" — authentic South Indian traditional food served fresh in its live, natural state.
          </p>
        </div>
      </section>

      {/* Movement & Origin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-padayal-primary uppercase tracking-wider">
              Our Roots in Coimbatore
            </span>
            <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text leading-tight">
              A Revolution in South Indian Dining
            </h2>
            <p className="text-sm sm:text-base text-padayal-muted leading-relaxed">
              Padayal was born out of a profound realisation: modern cooking has become overly reliant on deep-frying, extreme boiling, and refined additives that strip away the healing essence of food.
            </p>
            <p className="text-sm sm:text-base text-padayal-muted leading-relaxed">
              Inspired by the pioneering No Oil No Boil movement in Tamil Nadu, our kitchen in Coimbatore prepares complete traditional South Indian spreads — from spicy rasam to hearty meals and tiffin — entirely without turning on a fire or pouring a drop of cooking oil.
            </p>
            <p className="text-sm sm:text-base text-padayal-muted leading-relaxed">
              Our guests do not just eat; they experience a noticeable surge in physical vitality, mental clarity, and comfortable digestion that only live enzymes can provide.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-padayal-text">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-padayal-primary" />
                <span>Zero Refined Sugar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-padayal-primary" />
                <span>Zero Frying</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-padayal-primary" />
                <span>100% Unboiled</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white p-6 flex flex-col items-center text-center space-y-4">
              <img
                src="/logo.png"
                alt="Padayal No Oil No Boil Logo"
                className="w-48 h-auto object-contain"
              />
              <div className="border-t border-padayal-bg pt-3 w-full">
                <span className="font-pranic text-lg font-bold text-padayal-text block">
                  அடுப்பில்லா எண்ணெயில்லா உணவகம்
                </span>
                <span className="text-xs text-padayal-muted block mt-1">
                  Founded on authentic natural living principles in Coimbatore, Tamil Nadu
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="bg-padayal-surface py-14 sm:py-20 border-y border-padayal-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-padayal-cta uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
              What Sets Padayal Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-padayal-bg rounded-2xl p-6 border border-padayal-bg space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-padayal-secondary-light text-padayal-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-pranic text-lg font-bold text-padayal-text">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* The 4 Science Pillars of No Oil No Boil */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-padayal-primary uppercase tracking-wider">
            Ancient Wisdom & Modern Biology
          </span>
          <h2 className="font-pranic text-3xl sm:text-4xl font-extrabold text-padayal-text">
            The Science of Uncooked South Indian Food
          </h2>
          <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">
            Why removing fire and oil transforms your dining experience from fatigue to vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHILOSOPHY_PILLARS.map((pil) => (
            <div
              key={pil.step}
              className="bg-padayal-surface rounded-2xl p-6 sm:p-8 shadow-organic border border-padayal-bg space-y-3"
            >
              <span className="font-mono text-xs font-extrabold text-padayal-cta tracking-wider">
                PILLAR {pil.step}
              </span>
              <h3 className="font-pranic text-xl font-bold text-padayal-text">{pil.title}</h3>
              <p className="text-xs sm:text-sm text-padayal-muted leading-relaxed">{pil.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#183620] text-white p-8 sm:p-10 rounded-3xl shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cream-200">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-pranic text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              To make authentic, unheated South Indian food accessible, deeply delicious, and celebrated as an everyday healthy dining habit across Tamil Nadu and beyond.
            </p>
          </div>

          <div className="bg-[#965A38] text-white p-8 sm:p-10 rounded-3xl shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cream-200">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-pranic text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              A dining culture that respects the living intelligence of food — proving that you never have to sacrifice traditional South Indian taste to achieve radiant well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Visit Coimbatore CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-padayal-surface p-8 sm:p-12 rounded-3xl border border-padayal-bg text-center space-y-4 shadow-organic">
          <MapPin className="w-10 h-10 text-padayal-primary mx-auto" />
          <h2 className="font-pranic text-2xl sm:text-3xl font-bold text-padayal-text">
            Experience Padayal at Coimbatore
          </h2>
          <p className="text-xs sm:text-sm text-padayal-muted max-w-xl mx-auto">
            {RESTAURANT_INFO.location.fullAddress}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="btn-primary text-xs sm:text-sm py-3 px-6">
              View Our Menu
            </Link>
            <Link to="/reservation" className="btn-secondary text-xs sm:text-sm py-3 px-6">
              Book a Table
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
