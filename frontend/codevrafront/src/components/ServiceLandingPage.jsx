import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ServiceLandingPage({ service }) {
  const { tag, headline, subheadline, description, benefits, process, faqs, cta } = service;

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-brand text-brand-400 text-xs font-medium">
              {tag}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{headline}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-dark-300 font-medium mb-4">{subheadline}</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-lg text-dark-400 max-w-2xl mx-auto mb-10">{description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="xl" className="group">
                Start a Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://wa.me/254140710690" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="xl">
                <Phone className="w-4 h-4" /> Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-3">What You <span className="gradient-text">Get</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fadeUp(i * 0.07)} className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all">
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-dark-100 mb-2">{b.title}</h3>
                <p className="text-sm text-dark-400">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      {process && (
        <section className="relative py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-100 mb-3">How It <span className="gradient-text">Works</span></h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, i) => (
                <motion.div key={step.title} {...fadeUp(i * 0.08)} className="glass rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-4xl font-black text-dark-800/50 leading-none select-none">{String(i + 1).padStart(2, '0')}</div>
                  <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-bold text-dark-100 mb-1">{step.title}</h3>
                  <p className="text-xs text-dark-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs && (
        <section className="relative py-20 px-4 bg-dark-900/30">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-dark-100 mb-3">Common <span className="gradient-text">Questions</span></h2>
            </motion.div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} {...fadeUp(i * 0.05)} className="glass rounded-xl p-5">
                  <div className="font-semibold text-dark-100 mb-2 text-sm">{faq.q}</div>
                  <p className="text-sm text-dark-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="glass rounded-2xl p-12 text-center border border-brand-500/30">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">{cta.heading}</h2>
            <p className="text-dark-400 mb-8 max-w-lg mx-auto">{cta.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="group">
                  {cta.button} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="xl">View Our Work</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
