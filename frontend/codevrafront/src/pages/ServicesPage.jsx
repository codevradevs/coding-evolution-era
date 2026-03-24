import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Globe, Smartphone, CheckCircle, Zap, Shield,
  TrendingUp, MessageCircle, Wrench, X, Sparkles, Send, Loader
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { servicesApi } from '../lib/api';

const packages = [
  {
    name: 'Starter',
    color: 'brand',
    icon: '🟢',
    desc: 'Perfect for getting online fast.',
    includes: ['Basic website', 'Domain + hosting setup', 'SEO basics', 'Contact form'],
    price: 'From KES 30,000',
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    color: 'accent',
    icon: '🔵',
    desc: 'For businesses ready to scale.',
    includes: ['Dynamic website or app', 'M-Pesa integration', 'Analytics setup', '3 months maintenance'],
    price: 'From KES 100,000',
    cta: 'Scale Up',
    popular: true,
  },
  {
    name: 'Premium',
    color: 'brand',
    icon: '🔴',
    desc: 'Full-stack digital product, end to end.',
    includes: ['Full web app or mobile app', 'AI features', 'Security audit', 'Ongoing support'],
    price: 'From KES 300,000',
    cta: 'Go Premium',
  },
];

const whyCodevra = [
  { icon: Zap, label: 'Fast Turnaround', desc: 'MVPs in days, not months' },
  { icon: Shield, label: 'Security First', desc: 'bcrypt, JWT, rate limiting by default' },
  { icon: TrendingUp, label: 'Built to Scale', desc: 'Architecture that grows with you' },
  { icon: MessageCircle, label: 'Local Support', desc: "WhatsApp, call, or email — we're here" },
];

const tabs = [
  { id: 'web', label: 'Web Services', icon: Globe },
  { id: 'app', label: 'Mobile Apps', icon: Smartphone },
  { id: 'growth', label: 'Growth & Support', icon: Wrench },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function ServiceCard({ service, i, onQuote }) {
  return (
    <motion.div
      {...fadeUp(i * 0.06)}
      className="glass rounded-xl p-6 flex flex-col hover:border-brand-500/40 transition-all relative"
    >
      {service.tag && (
        <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full glass-brand text-brand-400 font-medium">
          {service.tag}
        </span>
      )}
      <div className="text-3xl mb-3">{service.icon}</div>
      <h3 className="text-lg font-bold text-dark-100 mb-1">{service.title}</h3>
      <p className="text-sm text-dark-400 mb-4">{service.desc}</p>
      <ul className="space-y-1.5 mb-6 flex-1">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-dark-300">
            <CheckCircle className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <div className="border-t border-dark-700/50 pt-4">
        <div className="text-xs text-dark-500 mb-0.5">Starting from</div>
        <div className="text-brand-400 font-bold text-lg mb-3">{service.price}</div>
        <div className="text-xs text-dark-500 mb-3">Range: KES {service.range}</div>
        <Button size="sm" className="w-full" onClick={() => onQuote(service)}>Get Quote</Button>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [tab, setTab] = useState('web');
  const [services, setServices] = useState({ web: [], app: [], growth: [] });
  const [loadingServices, setLoadingServices] = useState(true);
  const [selected, setSelected] = useState(null);
  const [proposalData, setProposalData] = useState({ name: '', email: '', company: '', requirements: '' });
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    servicesApi.getServices()
      .then(({ data }) => setServices(data.services))
      .catch(() => {})
      .finally(() => setLoadingServices(false));
  }, []);

  const openModal = (service) => {
    setSelected(service);
    setProposalData({ name: user?.name || '', email: user?.email || '', company: '', requirements: '' });
    setGeneratedProposal('');
    setSubmitError('');
    setSubmitSuccess(false);
  };

  const closeModal = () => { setSelected(null); setGeneratedProposal(''); setSubmitSuccess(false); setSubmitError(''); };

  const generateProposal = () => {
    setGeneratedProposal(`PROJECT PROPOSAL\n\nClient: ${proposalData.name}\nCompany: ${proposalData.company || 'N/A'}\nEmail: ${proposalData.email}\n\nSERVICE REQUESTED\n${selected.title}\n\nOVERVIEW\n${selected.desc}\n\nKEY DELIVERABLES\n${selected.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\nCLIENT REQUIREMENTS\n${proposalData.requirements}\n\nPRICING\nStarting from: ${selected.price}\nRange: KES ${selected.range}\n\nNEXT STEPS\n1. Review and approve this proposal\n2. Sign service agreement\n3. Initial payment (50% deposit)\n4. Project kickoff meeting\n5. Development & delivery\n\nThis proposal is valid for 30 days.`);
  };

  const sendProposal = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      await servicesApi.submitQuote({
        name: proposalData.name,
        email: proposalData.email,
        company: proposalData.company,
        serviceTitle: selected.title,
        serviceCategory: selected.category,
        requirements: proposalData.requirements,
        proposal: generatedProposal,
      });
      setSubmitSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to submit. Please try again.';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const serviceMap = { web: services.web, app: services.app, growth: services.growth };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp(0)} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-brand text-brand-400 text-xs font-medium">
              <Zap className="w-3.5 h-3.5" />
              Kenyan Market Pricing · No Hidden Fees · Built in Africa 🇰🇪
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Digital Services</span>
            <br />
            <span className="text-dark-100">Built for Africa.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg text-dark-400 max-w-2xl mx-auto mb-8">
            We design, build, secure, and scale digital products — from simple websites to full enterprise platforms.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="xl" className="group">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="xl">WhatsApp Us 💬</Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tabs + Services */}
      <section className="relative py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="glass rounded-xl p-1 flex gap-1 flex-wrap justify-center">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    tab === id ? 'bg-brand-500 text-dark-950' : 'text-dark-400 hover:text-dark-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loadingServices ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-20">
                <Loader className="w-8 h-8 text-brand-400 animate-spin" />
              </motion.div>
            ) : (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {(serviceMap[tab] || []).map((s, i) => (
                <ServiceCard key={s.id || s.title} service={s} i={i} onQuote={openModal} />
              ))}
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-4">
            <h2 className="text-3xl font-bold text-dark-100 mb-3">
              We Build With <span className="gradient-text">Your Stack</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              We are tech-agnostic. We recommend and use whatever fits your project best — not what's trendy.
            </p>
          </motion.div>

          {[
            {
              category: '🌐 Frontend',
              techs: ['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'Svelte', 'HTML / CSS', 'Tailwind CSS', 'Bootstrap', 'TypeScript'],
            },
            {
              category: '⚙️ Backend',
              techs: ['Node.js + Express', 'Django', 'Laravel (PHP)', 'FastAPI', 'Flask', 'Ruby on Rails', 'Spring Boot (Java)', 'ASP.NET (C#)', 'Go (Golang)', 'Nest.js'],
            },
            {
              category: '🗄️ Databases',
              techs: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Firebase', 'Supabase', 'Redis', 'DynamoDB', 'PlanetScale', 'CockroachDB'],
            },
            {
              category: '📱 Mobile',
              techs: ['React Native', 'Flutter', 'Expo', 'Swift (iOS)', 'Kotlin (Android)', 'Ionic', 'Capacitor', 'Xamarin', 'PWA', 'Android Studio'],
            },
            {
              category: '☁️ Cloud & DevOps',
              techs: ['Vercel', 'Render', 'AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Heroku', 'Railway', 'Docker', 'Nginx'],
            },
            {
              category: '🔌 Integrations & APIs',
              techs: ['M-Pesa (Daraja)', 'Stripe', 'PayPal', 'Twilio (SMS)', 'SendGrid', 'Firebase Auth', 'Google Maps', 'OpenAI API', 'Cloudinary', 'Pusher (Realtime)'],
            },
            {
              category: '🔐 Auth & Security',
              techs: ['JWT', 'OAuth 2.0', 'Passport.js', 'Auth0', 'Clerk', 'NextAuth', 'bcrypt', 'SSL/TLS', 'OWASP standards', '2FA / MFA'],
            },
            {
              category: '🧠 CMS & No-Code',
              techs: ['WordPress', 'Strapi', 'Sanity', 'Contentful', 'Ghost', 'Webflow', 'Shopify', 'WooCommerce', 'Directus', 'Payload CMS'],
            },
          ].map((group, gi) => (
            <motion.div
              key={group.category}
              {...fadeUp(gi * 0.07)}
              className="mb-6"
            >
              <div className="text-sm font-semibold text-dark-400 mb-3 mt-8">{group.category}</div>
              <div className="flex flex-wrap gap-2">
                {group.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg glass text-sm text-dark-300 hover:text-brand-400 hover:border-brand-500/30 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.p {...fadeUp(0.3)} className="text-center text-sm text-dark-500 mt-8">
            Don't see your stack? We'll work with it. <Link to="/contact" className="text-brand-400 hover:text-brand-300">Tell us what you need →</Link>
          </motion.p>
        </div>
      </section>

      {/* Packages */}
      <section className="relative py-20 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-3">
              Smart <span className="gradient-text">Packages</span>
            </h2>
            <p className="text-dark-400">Bundled services for better value — no piecing things together yourself.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                {...fadeUp(i * 0.1)}
                className={`glass rounded-xl p-8 flex flex-col relative hover:border-brand-500/40 transition-all ${
                  pkg.popular ? 'border-brand-500/40 ring-1 ring-brand-500/30' : ''
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full bg-brand-500 text-dark-950 font-bold">
                    Most Popular
                  </span>
                )}
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-dark-100 mb-1">{pkg.name} Package</h3>
                <p className="text-sm text-dark-400 mb-5">{pkg.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-dark-300">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-dark-700/50 pt-5">
                  <div className="text-brand-400 font-bold text-xl mb-4">{pkg.price}</div>
                  <Link to="/contact">
                    <Button variant={pkg.popular ? 'default' : 'secondary'} className="w-full group">
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Codevra */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-3">
              Why <span className="gradient-text">Codevra</span>?
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyCodevra.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.label}
                  {...fadeUp(i * 0.1)}
                  className="glass rounded-xl p-6 text-center hover:border-brand-500/30 transition-all"
                >
                  <Icon className="w-8 h-8 text-brand-400 mx-auto mb-3" />
                  <div className="font-bold text-dark-100 mb-1 text-sm">{w.label}</div>
                  <div className="text-xs text-dark-400">{w.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 bg-dark-900/30">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="glass rounded-2xl p-12 text-center border-brand-500/30">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Got an Idea? Let's Build It.</h2>
            <p className="text-dark-400 mb-8 max-w-lg mx-auto">
              Whether you're launching your first product or scaling an existing one — Codevra is your tech partner in Kenya 🇰🇪
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="group">
                  Request a Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="xl">View Our Work</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !generatedProposal && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-2xl mb-1">{selected.icon}</div>
                  <h2 className="text-xl font-bold text-dark-100">{selected.title}</h2>
                  <p className="text-sm text-dark-500">Starting from {selected.price}</p>
                </div>
                <button onClick={closeModal} className="text-dark-400 hover:text-dark-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!generatedProposal ? (
                <div className="space-y-4">
                  <div className="glass-brand rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-brand-400" />
                      <span className="text-sm font-medium text-brand-400">AI Proposal Generator</span>
                    </div>
                    <p className="text-xs text-dark-400">Fill in your details and we'll generate a custom proposal</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Your Name *</label>
                      <input
                        type="text"
                        value={proposalData.name}
                        onChange={e => !user && setProposalData({ ...proposalData, name: e.target.value })}
                        readOnly={!!user}
                        className={`w-full px-3 py-2 rounded-lg border text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                          user ? 'bg-dark-800/20 border-dark-700/30 cursor-not-allowed text-dark-400' : 'bg-dark-800/50 border-dark-700/50'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Email *</label>
                      <input
                        type="email"
                        value={proposalData.email}
                        onChange={e => !user && setProposalData({ ...proposalData, email: e.target.value })}
                        readOnly={!!user}
                        className={`w-full px-3 py-2 rounded-lg border text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                          user ? 'bg-dark-800/20 border-dark-700/30 cursor-not-allowed text-dark-400' : 'bg-dark-800/50 border-dark-700/50'
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      value={proposalData.company}
                      onChange={e => setProposalData({ ...proposalData, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Specific Requirements *</label>
                    <textarea
                      rows={4}
                      value={proposalData.requirements}
                      onChange={e => setProposalData({ ...proposalData, requirements: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none"
                      placeholder="Describe your specific needs..."
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={generateProposal}
                    disabled={!proposalData.name || !proposalData.email || !proposalData.requirements}
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Proposal
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="glass-brand rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Proposal Generated</span>
                    </div>
                    <p className="text-xs text-dark-400">Review your proposal below and send it to us</p>
                  </div>

                  <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50 max-h-80 overflow-y-auto">
                    <pre className="text-xs text-dark-300 whitespace-pre-wrap font-mono">{generatedProposal}</pre>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setGeneratedProposal('')} className="flex-1" disabled={submitting}>
                      Edit Details
                    </Button>
                    {submitSuccess ? (
                      <div className="flex-1 flex items-center justify-center gap-2 text-sm text-green-400 font-medium">
                        <CheckCircle className="w-4 h-4" /> Sent! Check your email.
                      </div>
                    ) : (
                      <Button onClick={sendProposal} className="flex-1" disabled={submitting}>
                        {submitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {submitting ? 'Sending...' : 'Submit Quote'}
                      </Button>
                    )}
                  </div>
                  {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
