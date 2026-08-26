import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Article } from '../types/database';
import { ArticleSkeleton } from '../components/ui/Skeleton';

export function WellnessPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const categories = ['all', ...new Set(articles.map(a => a.category).filter(Boolean))];
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const featuredArticle = articles[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-forest-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <BookOpen className="w-12 h-12 text-forest-400 mx-auto mb-6" />
          <h1 className="heading-xl text-white mb-4">Wellness Hub</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Explore articles about health, nutrition, and the science behind
            natural cooking. Your journey to wellness starts with knowledge.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Tag className="w-5 h-5 text-earth-500 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat || 'all'}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-forest-800 text-white'
                    : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ArticleSkeleton key={i} />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-earth-300" />
              <h3 className="heading-sm text-earth-600 mb-2">No articles found</h3>
              <p className="text-earth-500">Check back soon for new wellness content!</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && selectedCategory === 'all' && (
                <div className="mb-12">
                  <Link
                    to={`/wellness/${featuredArticle.slug}`}
                    className="card overflow-hidden group block"
                  >
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="aspect-video lg:aspect-auto overflow-hidden">
                        <img
                          src={featuredArticle.image_url || 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 lg:p-8 flex flex-col justify-center">
                        <span className="badge badge-success w-fit mb-4">
                          Featured Article
                        </span>
                        <h2 className="heading-md text-earth-800 mb-3 group-hover:text-forest-700 transition-colors">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-body mb-4">{featuredArticle.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-earth-500">
                          {featuredArticle.author && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{featuredArticle.author}</span>
                            </div>
                          )}
                          {featuredArticle.published_at && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(featuredArticle.published_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-forest-700 font-medium mt-4 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          Read Full Article
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Article Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === 'all' ? articles.slice(1) : filteredArticles).map((article) => (
                  <Link
                    key={article.id}
                    to={`/wellness/${article.slug}`}
                    className="card overflow-hidden group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image_url || 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=600'}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      {article.category && (
                        <span className="text-xs font-medium text-forest-600 uppercase tracking-wide">
                          {article.category}
                        </span>
                      )}
                      <h3 className="font-semibold text-earth-800 mt-1 mb-2 group-hover:text-forest-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-earth-500 line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-earth-400">
                        {article.author && (
                          <span>{article.author}</span>
                        )}
                        {article.published_at && (
                          <span>
                            {new Date(article.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Box */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <div className="card-static p-8 text-center max-w-2xl mx-auto">
            <h3 className="heading-sm text-earth-800 mb-4">
              Want to Learn More?
            </h3>
            <p className="text-body mb-6">
              Visit us and speak with our nutritionists. We offer free
              consultations on how our cooking methods can support your
              health goals.
            </p>
            <Link to="/contact" className="btn-primary">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
