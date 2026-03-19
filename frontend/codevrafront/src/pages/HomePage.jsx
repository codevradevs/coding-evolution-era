import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Terminal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ModeToggle from '../components/ModeToggle';
import ClientMode from '../components/ClientMode';
import DeveloperMode from '../components/DeveloperMode';

export default function HomePage() {
  const [mode, setMode] = useState('client');

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-dark-300">
              <div className="w-2 h-2 rounded-full bg-brand-400"></div>
              <span className="text-sm font-medium">310+ Platform Modules</span>
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <div className="w-2 h-2 rounded-full bg-accent-400"></div>
              <span className="text-sm font-medium">110+ Services Available</span>
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <div className="w-2 h-2 rounded-full bg-brand-400"></div>
              <span className="text-sm font-medium">160+ Technical Articles</span>
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <div className="w-2 h-2 rounded-full bg-accent-400"></div>
              <span className="text-sm font-medium">Built in Kenya 🇰🇪</span>
            </div>
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
