import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Search, Shield, Wrench, Globe, Zap, Brain, ArrowRight } from 'lucide-react';

const blogCategories = [
  { id: 'all', label: 'All Posts', icon: BookOpen },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'build-logs', label: 'Build Logs', icon: Wrench },
  { id: 'african-tech', label: 'African Tech', icon: Globe },
  { id: 'productivity', label: 'Productivity', icon: Zap },
  { id: 'analysis', label: 'Tech Analysis', icon: Brain },
];

const blogPosts = [
  {
    id: 'secure-node-backend',
    title: 'How to Build a Secure Node.js Backend from Scratch',
    excerpt: 'A comprehensive guide to building production-ready Node.js backends with security best practices baked in from day one.',
    category: 'security',
    tags: ['Node.js', 'Security', 'Backend', 'Tutorial'],
    readTime: '12 min',
    date: '2025-02-15',
    featured: true,
    slug: 'secure-node-backend',
  },
  {
    id: 'mpesa-integration',
    title: 'Complete M-Pesa Integration Guide for Kenyan Developers',
    excerpt: 'Step-by-step guide to integrating M-Pesa Daraja API into your web application. STK Push, B2C, and transaction queries.',
    category: 'african-tech',
    tags: ['M-Pesa', 'Kenya', 'Fintech', 'API'],
    readTime: '15 min',
    date: '2025-02-10',
    featured: true,
    slug: 'mpesa-integration-guide',
  },
  {
    id: 'building-codevra',
    title: 'Building Codevra: From Portfolio to Platform',
    excerpt: 'The architecture decisions, tech stack choices, and lessons learned building a full developer ecosystem.',
    category: 'build-logs',
    tags: ['Next.js', 'Architecture', 'Build Log'],
    readTime: '10 min',
    date: '2025-02-08',
    featured: false,
    slug: 'building-codevra',
  },
  {
    id: 'jwt-vulnerabilities',
    title: '5 JWT Vulnerabilities Every Developer Should Know',
    excerpt: 'Common JWT security pitfalls and how to avoid them. Algorithm confusion, token leakage, and improper validation.',
    category: 'security',
    tags: ['JWT', 'Security', 'Authentication'],
    readTime: '8 min',
    date: '2025-02-05',
    featured: false,
    slug: 'jwt-vulnerabilities',
  },
  {
    id: 'dev-productivity',
    title: 'My Developer Productivity System (2025 Edition)',
    excerpt: 'Tools, workflows, and habits that keep me shipping consistently. From IDE setup to time management.',
    category: 'productivity',
    tags: ['Productivity', 'Tools', 'Workflow'],
    readTime: '7 min',
    date: '2025-01-28',
    featured: false,
    slug: 'dev-productivity-2025',
  },
  {
    id: 'african-startup-landscape',
    title: 'The African Startup Tech Landscape: What\'s Missing',
    excerpt: 'Analysis of gaps in the African tech ecosystem and opportunities for developer-focused solutions.',
    category: 'african-tech',
    tags: ['Africa', 'Startups', 'Analysis'],
    readTime: '11 min',
    date: '2025-01-20',
    featured: false,
    slug: 'african-startup-landscape',
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <BookOpen className="w-3 h-3" />
              THE BLOG
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Insights. Breakdowns. <span className="gradient-text">Build Logs.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-dark-400 max-w-2xl mx-auto mb-8">
            Security deep dives, African tech insights, and honest build logs. Written for developers who build real systems.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl glass text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {blogCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat.id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 border border-transparent'}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="relative px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="glass rounded-xl p-6 h-full transition-all duration-300 hover:border-brand-500/20 hover:glow-brand">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">Featured</span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800 text-dark-400 capitalize">{post.category.replace('-', ' ')}</span>
                      </div>
                      <h2 className="text-xl font-bold text-dark-100 mb-2 group-hover:text-brand-400 transition-colors">{post.title}</h2>
                      <p className="text-sm text-dark-400 leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-dark-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                          <span>{post.date}</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm text-dark-500 group-hover:text-brand-400 transition-colors">
                          Read
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {regularPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:border-dark-600/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800 text-dark-400 capitalize">{post.category.replace('-', ' ')}</span>
                          <span className="flex items-center gap-1 text-xs text-dark-500"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-dark-100 group-hover:text-brand-400 transition-colors mb-1">{post.title}</h3>
                        <p className="text-sm text-dark-400 line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded text-xs bg-dark-800/50 text-dark-500 font-mono">{tag}</span>
                          ))}
                        </div>
                        <ArrowRight className="w-4 h-4 text-dark-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-dark-500">No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
