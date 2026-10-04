import { useState } from 'react';
import { BookOpen, ArrowRight, Calendar, User, Tag, X } from 'lucide-react';
import { Article } from '../types/database';

const AUTHENTIC_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Science of Live Enzymes: Why No Oil No Boil Keeps You Energized',
    slug: 'science-of-live-enzymes',
    excerpt: 'When foods are subjected to extreme heat or cooking oil above 48°C, delicate natural enzymes break down. Learn how uncooked South Indian dining preserves biological vitality.',
    content: `In ancient Siddha and traditional nature-cure philosophy, food is celebrated as living energy (Prana). 
    
When vegetables, coconut milk, and sprouted grains are eaten raw or uncooked, the active plant enzymes remain fully intact. These enzymes assist your stomach in digesting food smoothly, drastically lowering the metabolic load on your liver and pancreas.

Instead of experiencing post-meal tiredness, bloating, or acid reflux, diners at Padayal consistently report a surge of light, clean energy within 30 minutes of eating. Natural food is not just a diet—it is pure cellular rejuvenation.`,
    category: 'Nutrition Science',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
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
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
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
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
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
    <div className="min-h-screen pb-16 bg-padayal-bg">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#183620] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-padayal-secondary mx-auto" />
          <h1 className="font-pranic text-3xl sm:text-5xl font-black text-white tracking-tight">
            Wellness Hub & Food Wisdom
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 max-w-xl mx-auto leading-relaxed">
            Discover the healing principles of No Oil No Boil dining, live enzymes, native herbs, and South Indian natural living.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 sm:top-20 z-30 bg-padayal-surface/98 backdrop-blur-md border-b border-padayal-bg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Tag className="w-4 h-4 text-padayal-muted shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat || 'all'}
                type="button"
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-padayal-primary text-white shadow-sm'
                    : 'bg-padayal-bg text-padayal-muted hover:text-padayal-text'
                }`}
              >
                {cat === 'all' ? 'All Wisdom Articles' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-padayal-surface rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300 border border-padayal-bg flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="aspect-video overflow-hidden bg-forest-900 relative">
                  <img
                    src={article.image_url || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {article.category && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-padayal-primary text-[10px] font-bold shadow-sm">
                      {article.category}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-pranic text-lg font-bold text-padayal-text group-hover:text-padayal-primary transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-padayal-muted line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-padayal-bg/60 mt-3 flex items-center justify-between text-xs text-padayal-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-padayal-primary" /> {article.author}
                </span>
                <span className="font-bold text-padayal-cta inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-padayal-text/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-padayal-surface rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-padayal-bg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-padayal-muted hover:text-padayal-text rounded-full"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-padayal-secondary-light text-padayal-primary text-xs font-bold">
                {activeArticle.category}
              </span>
              <h2 className="font-pranic text-2xl sm:text-3xl font-extrabold text-padayal-text leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-padayal-muted pb-4 border-b border-padayal-bg">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-padayal-primary" /> {activeArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-padayal-primary" />
                  {activeArticle.published_at && new Date(activeArticle.published_at).toLocaleDateString()}
                </span>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-forest-900 my-4">
                <img
                  src={activeArticle.image_url || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs sm:text-sm text-padayal-text/80 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-padayal-bg text-center">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="btn-primary text-xs py-2.5 px-6"
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
