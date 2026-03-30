import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Globe, Shield, Smartphone, FlaskConical, Layers, ArrowRight, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import api from '../lib/api';

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Web Apps', icon: Globe },
  { id: 'security', label: 'Security Tools', icon: Shield },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'experiment', label: 'Experiments', icon: FlaskConical },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    api.get('/projects')
      .then(({ data }) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />

      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <Layers className="w-3 h-3" />CASE STUDIES
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Real Systems. <span className="gradient-text">Real Results.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-dark-400 max-w-2xl mx-auto mb-8">
            Not mockups. Not demos. Real systems built for real businesses — with the problems, solutions, and measurable outcomes.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6">
            {[
              { value: loading ? '...' : `${projects.length}+`, label: 'Systems Delivered' },
              { value: 'KES 80K+', label: 'Saved for Clients' },
              { value: '3 Industries', label: 'Logistics · Education · Fintech' },
              { value: '100%', label: 'M-Pesa Integrated' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-dark-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="relative px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-dark-500 shrink-0" />
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat.id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 border border-transparent'}`}>
                  <Icon className="w-3.5 h-3.5" />{cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-dark-800/50" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-dark-800/50 rounded w-3/4" />
                    <div className="h-3 bg-dark-800/30 rounded w-full" />
                    <div className="h-3 bg-dark-800/30 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => (
                  <motion.div key={project._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass rounded-xl overflow-hidden hover:border-brand-500/20 transition-all duration-300 group flex flex-col">
                    {/* Cover image */}
                    <Link to={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden bg-dark-800/50">
                      {project.coverImage
                        ? <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center"><Image className="w-10 h-10 text-dark-700" /></div>
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {project.featured && <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-500/80 text-white backdrop-blur-sm">Featured</span>}
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-900/70 text-dark-300 backdrop-blur-sm">{project.status}</span>
                      </div>
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/projects/${project.slug}`} className="hover:text-brand-400 transition">
                          <h3 className="font-bold text-dark-100 leading-snug">{project.title}</h3>
                        </Link>
                        <div className="flex gap-1.5 shrink-0 ml-2">
                          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-dark-800/50 text-dark-400 hover:text-dark-100 transition"><Github className="w-3.5 h-3.5" /></a>}
                          {project.liveUrl && project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-dark-800/50 text-dark-400 hover:text-dark-100 transition"><ExternalLink className="w-3.5 h-3.5" /></a>}
                        </div>
                      </div>

                      {project.industry && <p className="text-xs text-dark-500 mb-2">{project.industry}</p>}
                      <p className="text-sm text-dark-400 leading-relaxed mb-4 flex-1 line-clamp-3">{project.description}</p>

                      {/* Tech */}
                      {project.tech?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.slice(0, 4).map(t => <span key={t} className="px-2 py-0.5 rounded bg-dark-800/50 text-xs text-dark-400 font-mono">{t}</span>)}
                          {project.tech.length > 4 && <span className="px-2 py-0.5 rounded bg-dark-800/50 text-xs text-dark-500">+{project.tech.length - 4}</span>}
                        </div>
                      )}

                      <Link to={`/projects/${project.slug}`}
                        className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition font-medium mt-auto">
                        View Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-dark-500">
              <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-10 text-center border border-brand-500/30">
            <h2 className="text-2xl font-bold text-dark-100 mb-3">Want Results Like These?</h2>
            <p className="text-dark-400 mb-6 max-w-md mx-auto">Tell us your problem. We'll scope it, price it, and build it — with the same rigour you see above.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg" className="group">Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
              <Link to="/services"><Button variant="outline" size="lg">View Services & Pricing</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
