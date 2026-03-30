import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ChevronLeft, ChevronRight, X, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';
import api from '../lib/api';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // index of open image
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    setImgIdx(0);
    setLightbox(null);
    api.get(`/projects/${slug}`)
      .then(({ data }) => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null || !project) return;
      const len = project.images?.length || 0;
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + len) % len);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % len);
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, project]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-dark-400 text-lg">Project not found.</p>
      <Link to="/projects"><Button variant="outline">← Back to Projects</Button></Link>
    </div>
  );

  const images = project.images || [];

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />

      <section className="relative py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-dark-500 hover:text-brand-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.featured && <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">Featured</span>}
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800 text-dark-400">{project.status}</span>
                  {project.industry && <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800/50 text-dark-500">{project.industry}</span>}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-dark-100">{project.title}</h1>
                {project.client && <p className="text-sm text-dark-500 mt-1">Client: {project.client}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass text-dark-300 hover:text-dark-100 text-sm transition">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 text-sm transition">
                    <ExternalLink className="w-4 h-4" /> Live Site
                  </a>
                )}
              </div>
            </div>

            <p className="text-dark-300 text-lg leading-relaxed mb-8">{project.description}</p>

            {/* Results */}
            {project.results?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {project.results.map((r, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">{r.metric}</div>
                    <div className="text-xs text-dark-500 mt-1">{r.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech stack */}
            {project.tech?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 rounded-md bg-dark-800/50 text-xs text-dark-300 font-mono border border-dark-700/50">{t}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-12">
              {/* Main image */}
              <div className="relative rounded-xl overflow-hidden glass mb-3 cursor-pointer aspect-video"
                onClick={() => setLightbox(imgIdx)}>
                <img src={images[imgIdx]} alt={`${project.title} screenshot ${imgIdx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent pointer-events-none" />
                {images.length > 1 && (
                  <>
                    <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + images.length) % images.length) }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-dark-900/70 text-white hover:bg-dark-900 transition">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % images.length) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-dark-900/70 text-white hover:bg-dark-900 transition">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="absolute bottom-3 right-3 text-xs bg-dark-900/70 text-dark-300 px-2 py-1 rounded-full">
                      {imgIdx + 1} / {images.length}
                    </span>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition ${i === imgIdx ? 'border-brand-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                      <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Case Study */}
          {(project.problem || project.solution || project.architecture) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="glass rounded-xl p-6 sm:p-8 mb-10">
              <h2 className="text-lg font-bold text-dark-100 mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" /> Case Study
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.problem && (
                  <div>
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">The Problem</span>
                    <p className="text-sm text-dark-300 mt-2 leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Our Solution</span>
                    <p className="text-sm text-dark-300 mt-2 leading-relaxed">{project.solution}</p>
                  </div>
                )}
                {project.architecture && (
                  <div>
                    <span className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Architecture</span>
                    <p className="text-sm text-dark-300 mt-2 leading-relaxed">{project.architecture}</p>
                    {project.lessons && (
                      <div className="mt-3 pt-3 border-t border-dark-700/30">
                        <span className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Key Lesson</span>
                        <p className="text-xs text-dark-400 mt-1 italic">{project.lessons}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="glass rounded-xl p-8 text-center border border-brand-500/20">
            <h3 className="text-xl font-bold text-dark-100 mb-2">Want a system like this?</h3>
            <p className="text-dark-400 text-sm mb-5">Tell us your problem. We'll scope it, price it, and build it.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact"><Button size="lg">Start Your Project</Button></Link>
              <Link to="/projects"><Button variant="outline" size="lg">View All Projects</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 p-2 rounded-full bg-dark-800 text-dark-300 hover:text-white transition z-10"
              onClick={() => setLightbox(null)}>
              <X className="w-5 h-5" />
            </button>
            {images.length > 1 && (
              <>
                <button onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + images.length) % images.length) }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-800/80 text-white hover:bg-dark-700 transition z-10">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % images.length) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-800/80 text-white hover:bg-dark-700 transition z-10">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[lightbox]}
              alt={`${project.title} ${lightbox + 1}`}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-dark-400">
              {lightbox + 1} / {images.length} · Press ← → to navigate, Esc to close
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
