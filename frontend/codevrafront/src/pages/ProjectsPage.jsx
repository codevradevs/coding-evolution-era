import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, Filter, Globe, Shield, Smartphone, FlaskConical, Layers, Eye } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Web Apps', icon: Globe },
  { id: 'security', label: 'Security Tools', icon: Shield },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'experiment', label: 'Experiments', icon: FlaskConical },
];

const projects = [
  { id: 'codevra-hq', title: 'Codevra HQ', description: 'Full-scale developer ecosystem with tools hub, secure vault, coding arena, learning tracker, and startup network.', category: 'web', tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Redis'], liveUrl: 'https://codevra.vercel.app', githubUrl: 'https://github.com/codevradevs/coding-evolution-era', featured: true, status: 'In Development', architecture: 'Monorepo with API-first microservices architecture', lessons: 'Building a platform vs a project requires fundamentally different thinking about user journeys and data flow.' },
  { id: 'secure-vault', title: 'Secure Note Vault', description: 'End-to-end encrypted note storage for developers. AES-256 encryption with client-side key derivation.', category: 'security', tech: ['React', 'Node.js', 'AES-256', 'bcrypt', 'PostgreSQL'], liveUrl: '#', githubUrl: 'https://github.com/codevradevs', featured: true, status: 'Beta', architecture: 'Zero-knowledge architecture — server never sees plaintext', lessons: 'Client-side encryption adds complexity but is non-negotiable for sensitive data.' },
  { id: 'mpesa-sdk', title: 'M-Pesa Integration SDK', description: 'Developer-friendly SDK for M-Pesa Daraja API. Simplifies STK push, B2C, and transaction queries.', category: 'web', tech: ['Node.js', 'TypeScript', 'M-Pesa API', 'Express'], liveUrl: 'https://npmjs.com/package/mpesa-sdk', githubUrl: 'https://github.com/codevradevs', featured: false, status: 'Published', architecture: 'Modular SDK with promise-based API and automatic token management', lessons: 'African fintech APIs need better developer experience. Documentation is a product.' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);
  const filteredProjects = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <Layers className="w-3 h-3" />PROJECT SHOWCASE
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Real Systems. <span className="gradient-text">Real Impact.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-dark-400 max-w-2xl mx-auto">
            Not static cards. Each project tells a story — architecture decisions, tech choices, lessons learned, and live demos.
          </motion.p>
        </div>
      </section>
      <section className="relative px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-dark-500 shrink-0" />
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat.id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 border border-transparent'}`}>
                  <Icon className="w-3.5 h-3.5" />{cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className={`glass rounded-xl overflow-hidden group transition-all duration-300 hover:border-brand-500/20 ${project.featured ? 'md:col-span-2' : ''}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {project.featured && <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">Featured</span>}
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800 text-dark-400">{project.status}</span>
                        </div>
                        <h3 className="text-xl font-bold text-dark-100">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-dark-800/50 text-dark-400 hover:text-dark-100 transition-colors"><Github className="w-4 h-4" /></a>}
                        {project.liveUrl && project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-dark-800/50 text-dark-400 hover:text-dark-100 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                      </div>
                    </div>
                    <p className="text-sm text-dark-400 leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(t => <span key={t} className="px-2.5 py-1 rounded-md bg-dark-800/50 text-xs text-dark-300 font-mono">{t}</span>)}
                    </div>
                    <button onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)} className="flex items-center gap-1 text-sm text-dark-500 hover:text-brand-400 transition-colors">
                      <Eye className="w-3.5 h-3.5" />{expandedProject === project.id ? 'Hide Details' : 'View Architecture & Lessons'}
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedProject === project.id ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="mt-4 pt-4 border-t border-dark-700/50 space-y-3">
                            <div><span className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Architecture</span><p className="text-sm text-dark-300 mt-1">{project.architecture}</p></div>
                            <div><span className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Lessons Learned</span><p className="text-sm text-dark-300 mt-1">{project.lessons}</p></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
