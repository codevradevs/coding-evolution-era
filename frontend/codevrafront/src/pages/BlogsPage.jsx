import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, currentPage, searchQuery]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/blogs/categories');
      setCategories(['All Posts', ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/blogs', {
        params: { category: selectedCategory, page: currentPage, limit: 12, search: searchQuery }
      });
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-4">
              <BookOpen className="w-3 h-3" />THE BLOG
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insights. Breakdowns. <span className="gradient-text">Build Logs.</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-8">
              Security deep dives, African tech insights, and honest build logs. Written for developers who build real systems.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass border border-dark-700/50 text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'glass text-dark-400 hover:text-dark-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-dark-400">Loading articles...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-400">No articles found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {blogs.map((blog, i) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all cursor-pointer group"
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  >
                    {blog.featured && (
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-brand-500/10 text-brand-400 mb-3">
                        Featured
                      </span>
                    )}
                    
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium glass-brand text-brand-400 mb-3">
                      {blog.category}
                    </span>
                    
                    <h2 className="text-xl font-bold text-dark-100 mb-3 group-hover:text-brand-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-dark-500 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(blog.publishedAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-brand-400 group-hover:gap-3 transition-all">
                      Read <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-dark-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
