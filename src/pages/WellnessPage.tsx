import { useState } from 'react';
import placeholderImage from '../assets/placeholder.svg';
import { BookOpen, ArrowRight, Calendar, User, Tag, X, Sparkles } from 'lucide-react';
import { Article } from '../types/database';
import { TiltCard3D } from '../components/3d/TiltCard3D';

const AUTHENTIC_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Principles of No Oil No Boil: Celebrating South Indian Natural Dining',
    slug: 'principles-of-no-oil-no-boil',
    excerpt: 'Explore how traditional unboiled food preparation methods honour the natural flavour, texture, and wholesome vitality of fresh native ingredients.',
    content: `In traditional nature-cure and South Indian food philosophy, wholesome nutrition begins with respecting ingredients in their natural state.
    
When fresh vegetables, cold-extracted coconut milk, and native sprouted pulses are prepared without high-heat boiling or refined cooking oils, their natural moisture, essential nutrients, and subtle flavours remain intact. Traditional techniques such as soaking, hand-pounding, and stone grinding gently prepare the ingredients while honouring time-tested kitchen wisdom.

Rather than the heavy feeling that often follows oil-rich cooking, unboiled natural meals leave you feeling refreshed and sustained. Padayal celebrates this traditional food philosophy through daily handcrafted feasts served on fresh plantain leaves.`,
    category: 'Food Philosophy',
    image_url: '/images/wellness/food-philosophy.jpg',
    author: 'Padayal Natural Health Research',
    is_published: true,
    published_at: '2026-08-15T09:00:00Z',
    created_at: '2026-08-15T09:00:00Z',
    updated_at: '2026-08-15T09:00:00Z',
  },
  {
    id: 'art-2',
    title: 'Mudakathan & Native Greens: Natural Healing for Joints & Digestion',
    slug: 'mudakathan-native-greens',
    excerpt: 'The balloon vine (Mudakathan Keerai) has been celebrated for centuries in Kongu Nadu for natural joint lubrication and soothing systemic inflammation.',
    content: `Mudakathan (Cardiospermum halicacabum) is a wild climbing herb revered across Tamil Nadu. Traditional kitchens traditionally prepared it in rasams or dosais. 
    
At Padayal, we extract its pure juice through cold-pressing and blend it with fresh sprouted fenugreek, cumin, and tender coconut water. This keeps its potent anti-inflammatory bio-flavonoids undamaged by flame heat, delivering rapid relief for stiff joints and sluggish digestion.`,
    category: 'Native Herbs',
    image_url: '/images/wellness/mudakathan-greens.jpg',
    author: 'Traditional Food Circle',
    is_published: true,
    published_at: '2026-08-20T09:00:00Z',
    created_at: '2026-08-20T09:00:00Z',
    updated_at: '2026-08-20T09:00:00Z',
  },
  {
    id: 'art-3',
    title: 'The Miracle of Red Aval (Flattened Rice) in Traditional South Indian Diet',
    slug: 'miracle-of-red-aval',
    excerpt: 'Why unboiled red rice aval seasoned with fresh grated coconut provides steady sustained energy without spiking insulin.',
    content: `Red aval is made by traditionally flattening whole native red paddy. Because it does not require intense cooking to be easily digestible, it serves as the cornerstone of our traditional meal and tiffin preparations.

Rich in dietary fibre, natural iron, and complex carbohydrates, red aval digests gradually, preventing the mid-day blood sugar spikes associated with white polished rice. Combined with healthy plant fats from fresh grated coconut, it forms the perfect nourishing staple.`,
    category: 'Traditional Staples',
    image_url: '/images/wellness/red-aval-heritage.jpg',
    author: 'Padayal Culinary Team',
    is_published: true,
    published_at: '2026-08-28T09:00:00Z',
    created_at: '2026-08-28T09:00:00Z',
    updated_at: '2026-08-28T09:00:00Z',
  },
];

export function WellnessPage() {
  const [articles] = useState<Article[]>(AUTHENTIC_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = ['all', ...new Set(articles.map((a) => a.category).filter(Boolean))];
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen pb-24 bg-[#FAF8F5] text-padayal-text">
      
      {/* Meadowlark Editorial Hero */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/[0.04]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-black/[0.05] text-xs font-semibold text-padayal-primary">
            <span className="text-padayal-cta">✦</span>
            <span>FOOD AS MEDICINE • உணவே மருந்து</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-padayal-text">
            Wellness<span className="text-padayal-cta">.</span>
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-padayal-primary/90 font-normal">
            living food wisdom & botanical guides
          </p>

          <p className="text-padayal-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Discover the traditional principles of No Oil No Boil dining, living enzymes, native herbs, and natural wellness from our Coimbatore kitchen.
          </p>
        </div>
      </section>

      {/* Category Filter Pills (Meadowlark Style) */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-black/[0.05] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat || 'all'}
                type="button"
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-padayal-cta text-white shadow-sm'
                    : 'bg-white text-padayal-text/75 hover:text-padayal-text border border-black/[0.04]'
                }`}
              >
                {cat === 'all' ? 'All Wisdom Notes' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Cards Grid with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <TiltCard3D key={article.id} maxTilt={8} scale={1.03} className="h-full">
              <article
                onClick={() => setActiveArticle(article)}
                className="bg-white/95 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/[0.04] flex flex-col justify-between cursor-pointer group p-4 h-full"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] relative">
                    <img
                      src={article.image_url || placeholderImage}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.category && (
                      <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-white/95 text-padayal-primary text-[10px] font-bold shadow-sm">
                        {article.category}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 space-y-2">
                    <h3 className="font-editorial text-lg font-normal text-padayal-text group-hover:text-padayal-primary transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-padayal-muted line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between text-xs text-padayal-muted">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-padayal-primary" /> {article.author}
                  </span>
                  <span className="font-medium text-padayal-cta inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Note <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl border border-black/[0.06] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 text-padayal-muted hover:text-padayal-text rounded-full hover:bg-[#FAF8F5] transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-[#F2F5EB] text-padayal-primary text-xs font-semibold">
                {activeArticle.category}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-padayal-text leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-padayal-muted pb-4 border-b border-black/[0.05]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-padayal-primary" /> {activeArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-padayal-primary" />
                  {activeArticle.published_at && new Date(activeArticle.published_at).toLocaleDateString()}
                </span>
              </div>

              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] my-4 relative">
                <img
                  src={activeArticle.image_url || placeholderImage}
                  alt={activeArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="text-sm text-padayal-text/80 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-black/[0.05] text-center">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-padayal-cta text-white text-xs font-medium hover:bg-padayal-cta-hover transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
