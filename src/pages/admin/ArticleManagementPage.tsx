import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Save, Globe, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Article, InsertArticle } from '../../types/database';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function ArticleManagementPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: '',
    author: '',
    is_published: false,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function openModal(article?: Article) {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || '',
        content: article.content,
        category: article.category || '',
        image_url: article.image_url || '',
        author: article.author || '',
        is_published: article.is_published,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        image_url: '',
        author: '',
        is_published: false,
      });
    }
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const articleData: Partial<InsertArticle> = {
        title: formData.title,
        slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        category: formData.category || null,
        image_url: formData.image_url || null,
        author: formData.author || null,
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setSaving(false);
    }
  }

  async function deleteArticle(article: Article) {
    if (!confirm(`Are you sure you want to delete "${article.title}"?`)) return;
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', article.id);
      if (error) throw error;
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg text-earth-800">Articles</h1>
          <p className="text-earth-600 mt-1">Manage wellness hub articles</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      <div className="grid gap-4">
        {filteredArticles.length === 0 ? (
          <div className="card p-8 text-center text-earth-500">
            No articles found
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-earth-100 shrink-0">
                  {article.image_url ? (
                    <img src={article.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-earth-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-earth-800">{article.title}</h3>
                      <p className="text-sm text-earth-500">{article.category || 'Uncategorized'}</p>
                    </div>
                    <span className={`badge ${article.is_published ? 'badge-success' : 'badge-warning'}`}>
                      {article.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-earth-400 mt-2 line-clamp-2">{article.excerpt}</p>
                  <p className="text-xs text-earth-400 mt-2">
                    By {article.author || 'Unknown'} • {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openModal(article)} className="p-2 text-earth-600 hover:bg-earth-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteArticle(article)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-earth-900/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8 relative animate-scale-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-earth-400 hover:text-earth-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="heading-md text-earth-800 mb-6">
              {editingArticle ? 'Edit Article' : 'New Article'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({ ...formData, title, slug: formData.slug || generateSlug(title) });
                  }}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-field"
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Health Tips"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="textarea-field"
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Content *</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="textarea-field"
                  placeholder="Full article content..."
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-5 h-5 rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                />
                <span className="text-sm text-earth-700 flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  Publish immediately
                </span>
              </label>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" /> Saving...
                    </span>
                  ) : (
                    <><Save className="w-4 h-4 mr-1" /> Save</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
