import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Terminal, Globe, Smartphone, Shield, TrendingUp, Image } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ModeToggle from '../components/ModeToggle';
import ClientMode from '../components/ClientMode';
import DeveloperMode from '../components/DeveloperMode';
import api from '../lib/api';

const webHighlights = [
  { icon: '🪶', title: 'Basic Website', range: 'KES 10K – 50K' },
  { icon: '🛒', title: 'E-Commerce Store', range: 'KES 60K – 500K' },
  { icon: '🧠', title: 'Custom Web App', range: 'KES 150K – 1.5M+' },
];

const appHighlights = [
  { icon: '🪶', title: 'MVP App', range: 'KES 80K – 250K' },
  { icon: '🚚', title: 'On-Demand App', range: 'KES 300K – 1M+' },
  { icon: '💳', title: 'Fintech App', range: 'KES 120K – 2M+' },
];

export default function HomePage() {
  const [mode, setMode] = useState('client');
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    api.get('/projects?featured=true')
      .then(({ data }) => setFeaturedProjects(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-brand text-brand-400 text-xs font-medium text-center">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              M-Pesa Integration · Bank-Level Security · African Innovation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Secure, Scalable Digital Systems</span>
            <br />
            <span className="text-dark-100">Built in Africa.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-dark-400 max-w-3xl mx-auto mb-8"
          >
            From production-ready SaaS platforms to developer tooling ecosystems — Codevra engineers systems that perform, scale, and stay secure.
          </motion.p>

          {/* Social proof — above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-12"
          >
            {[
              { value: '10+', label: 'Systems Delivered' },
              { value: '3', label: 'Industries Served' },
              { value: '100%', label: 'M-Pesa Integrated' },
              { value: 'KES 80K+', label: 'Saved for Clients' },
              { value: 'Built in Kenya 🇰🇪', label: 'African-First' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold text-dark-100">{s.value}</div>
                <div className="text-xs text-dark-500">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link to="/products">
                <Button size="xl" className="group">
                  Build My System
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/hub/tools">
                <Button variant="secondary" size="xl">
                  Explore Developer Hub
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="xl">
                  View Case Studies
                </Button>
              </Link>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="glass rounded-xl overflow-hidden max-w-2xl mx-auto mb-16">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-dark-500 font-mono ml-2">
                  <Terminal className="w-3 h-3 inline mr-1" />
                  codevra@hq ~ $
                </span>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="text-dark-400">
                  <span className="text-brand-400">$</span> codevra init --ecosystem
                </div>
                <div className="text-dark-500 mt-1">✓ Developer Tools Hub initialized</div>
                <div className="text-dark-500">✓ Secure Vault encrypted (AES-256)</div>
                <div className="text-dark-500">✓ Coding Arena ready (12 challenges loaded)</div>
                <div className="text-dark-500">✓ Learning Tracker synced</div>
                <div className="text-dark-500">✓ Startup Network connected</div>
                <div className="text-brand-400 mt-2">→ Ecosystem ready. Welcome to Codevra HQ. 🚀</div>
                <div className="text-dark-600 animate-pulse-glow mt-1">█</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Choose Your <span className="gradient-text">Path</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Whether you're building a business or leveling up as a developer — Codevra has your infrastructure.
            </p>
          </motion.div>

          <ModeToggle mode={mode} setMode={setMode} />
        </div>
      </section>

      <AnimatePresence mode="wait">
        {mode === 'client' && <ClientMode key="client" />}
        {mode === 'developer' && <DeveloperMode key="developer" />}
      </AnimatePresence>

      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              What We <span className="gradient-text">Build</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              From simple websites to full-scale mobile apps — Kenyan market pricing, no hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <Globe className="w-6 h-6 text-brand-400" />
                <h3 className="text-xl font-bold text-dark-100">Web Development</h3>
              </div>
              <div className="space-y-3">
                {webHighlights.map((s) => (
                  <div key={s.title} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-all">
                    <span className="flex items-center gap-2 text-dark-200 font-medium">
                      <span>{s.icon}</span>{s.title}
                    </span>
                    <span className="text-brand-400 text-sm font-semibold">{s.range}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <Smartphone className="w-6 h-6 text-brand-400" />
                <h3 className="text-xl font-bold text-dark-100">Mobile Apps</h3>
              </div>
              <div className="space-y-3">
                {appHighlights.map((s) => (
                  <div key={s.title} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-all">
                    <span className="flex items-center gap-2 text-dark-200 font-medium">
                      <span>{s.icon}</span>{s.title}
                    </span>
                    <span className="text-brand-400 text-sm font-semibold">{s.range}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Shield, label: 'Security First', desc: 'bcrypt, JWT, rate limiting by default' },
              { icon: TrendingUp, label: 'Built to Scale', desc: 'Architecture that grows with you' },
              { icon: Zap, label: 'Fast Delivery', desc: 'MVPs in days, not months' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-5 flex items-center gap-4 hover:border-brand-500/30 transition-all"
                >
                  <Icon className="w-8 h-8 text-brand-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-dark-100 text-sm">{item.label}</div>
                    <div className="text-xs text-dark-400">{item.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg" className="group">
                View All Services & Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Get a Free Quote</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      {featuredProjects.length > 0 && (
        <section className="relative py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-dark-400 max-w-2xl mx-auto">Real systems we've built for real businesses.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featuredProjects.map((project, i) => (
                <motion.div key={project._id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl overflow-hidden hover:border-brand-500/20 transition-all duration-300 group flex flex-col">
                  <Link to={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden bg-dark-800/50">
                    {project.coverImage
                      ? <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Image className="w-8 h-8 text-dark-700" /></div>
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-medium bg-brand-500/80 text-white backdrop-blur-sm">Featured</span>
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <Link to={`/projects/${project.slug}`} className="font-bold text-dark-100 hover:text-brand-400 transition mb-1">{project.title}</Link>
                    <p className="text-xs text-dark-500 mb-2">{project.industry}</p>
                    <p className="text-sm text-dark-400 line-clamp-2 flex-1">{project.description}</p>
                    <Link to={`/projects/${project.slug}`} className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition mt-3 font-medium">
                      View Case Study <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/projects"><Button variant="outline" size="lg">View All Projects <ArrowRight className="w-4 h-4" /></Button></Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              What Clients <span className="gradient-text">Say</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Codevra built our entire logistics platform in under 6 weeks. M-Pesa integration worked flawlessly from day one. Delivery delays dropped by 30% in the first month.",
                name: "James M.",
                role: "CEO, Tranzit Logistics",
                emoji: "🚚",
              },
              {
                quote: "Our school was drowning in paper. SchoolSync changed everything — fee collection, results, parent communication. The team understood exactly what we needed.",
                name: "Principal Wanjiku",
                role: "Nairobi Private Secondary School",
                emoji: "🏫",
              },
              {
                quote: "Finally a dev team that speaks our language. They didn't just build what we asked — they told us what we actually needed. PayFlow saved us 5 days of accounting every month.",
                name: "Amina K.",
                role: "Founder, E-Commerce Startup",
                emoji: "💳",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 flex flex-col gap-4"
              >
                <p className="text-dark-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-dark-700/30">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-xl">{t.emoji}</div>
                  <div>
                    <div className="text-sm font-semibold text-dark-100">{t.name}</div>
                    <div className="text-xs text-dark-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-12 text-center border-brand-500/30"
            >
              <h2 className="text-3xl font-bold text-dark-100 mb-4">Ready to Build?</h2>
              <p className="text-dark-400 mb-8 max-w-lg mx-auto">
                Whether you're launching a startup or leveling up your dev skills — Codevra is your infrastructure layer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="xl" className="group">
                    Build With Codevra
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="secondary" size="xl">
                    Join the Ecosystem
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
    </div>
  );
}
