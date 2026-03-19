import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Shield, CheckCircle, ArrowRight, Zap, TrendingUp, Target, Users } from 'lucide-react';

const services = [
  { name: 'Business Website', price: 'KES 28,000' },
  { name: 'E-Commerce Store', price: 'KES 135,000' },
  { name: 'SaaS Platform', price: 'KES 250,000' },
  { name: 'M-Pesa Integration', price: 'KES 15,000' },
  { name: 'Security Audit', price: 'KES 10,000' }
];

const metrics = [
  { value: '120ms', label: 'API Response', icon: Zap },
  { value: '99.9%', label: 'Uptime', icon: TrendingUp },
  { value: 'A+', label: 'Security Score', icon: Shield },
  { value: '98%', label: 'Client Satisfaction', icon: Users }
];

const whoWeHelp = [
  { icon: '🚀', title: 'Startups', desc: 'Secure MVPs with payment integrations' },
  { icon: '🏢', title: 'Growing Businesses', desc: 'Scalable backend systems & security' },
  { icon: '🛡', title: 'Security-Focused Founders', desc: 'Launch without vulnerabilities' }
];

export default function ClientMode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Who <span className="gradient-text">Codevra</span> Is For
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoWeHelp.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:border-brand-500/30 transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-dark-100 mb-2">{item.title}</h3>
                <p className="text-sm text-dark-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-dark-400">Kenyan market pricing. No hidden fees.</p>
          </motion.div>
          <div className="glass rounded-xl p-8">
            <div className="space-y-4">
              {services.map((service, i) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-all"
                >
                  <span className="text-dark-200 font-medium">{service.name}</span>
                  <span className="text-brand-400 font-bold">From {service.price}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="group">
                  View All Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  Get Custom Proposal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Security <span className="gradient-text">Differentiator</span>
            </h2>
            <p className="text-dark-400">Most systems vs. How Codevra builds</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6 border-red-500/30"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-dark-400 font-mono">Vulnerable Code</span>
              </div>
              <div className="font-mono text-xs sm:text-sm bg-dark-900/50 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                <div className="text-red-400">// Plain text passwords</div>
                <div className="text-red-400">// No input validation</div>
                <div className="text-red-400">// SQL injection risk</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <span>⚠</span>
                  <span>No rate limiting</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <span>⚠</span>
                  <span>Weak authentication</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <span>⚠</span>
                  <span>No input validation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6 border-brand-500/30"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-brand-500"></div>
                <span className="text-sm text-dark-400 font-mono">Codevra Standard</span>
              </div>
              <div className="font-mono text-xs sm:text-sm bg-dark-900/50 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                <div className="text-brand-400">// bcrypt hashing</div>
                <div className="text-brand-400">// Rate limiting</div>
                <div className="text-brand-400">// Parameterized queries</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-brand-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>JWT with expiration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>bcrypt password hashing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Rate limiting & validation</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-8">
            <p className="text-dark-300 font-semibold">Security isn't an add-on. It's default.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Performance <span className="gradient-text-accent">Metrics</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-6 text-center hover:border-brand-500/30 transition-all"
                >
                  <Icon className="w-8 h-8 text-brand-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                  <div className="text-sm text-dark-400">{metric.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="glass rounded-2xl p-12 text-center border-brand-500/30">
            <Target className="w-12 h-12 text-brand-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Ready to Build Your System?</h2>
            <p className="text-dark-400 mb-8 max-w-lg mx-auto">
              Get a free consultation and see how we build secure, scalable systems for African businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="group">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" size="xl">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
