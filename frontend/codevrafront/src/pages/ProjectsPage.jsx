import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, Filter, Globe, Shield, Smartphone, FlaskConical, Layers, Eye, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Web Apps', icon: Globe },
  { id: 'security', label: 'Security Tools', icon: Shield },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'experiment', label: 'Experiments', icon: FlaskConical },
];

const projects = [
  {
    id: 'tranzit',
    title: 'Tranzit — Logistics Platform',
    description: 'End-to-end logistics platform connecting transport providers with SMEs across Kenya. Real-time tracking, M-Pesa payments, and automated dispatch.',
    category: 'web',
    tech: ['React', 'Node.js', 'MongoDB', 'M-Pesa Daraja', 'Socket.io', 'Google Maps API'],
    liveUrl: '#',
    githubUrl: null,
    featured: true,
    status: 'Live',
    client: 'Kenyan Logistics SME',
    industry: 'Logistics & Transport',
    problem: 'A mid-sized logistics company was managing 200+ daily deliveries via WhatsApp and spreadsheets. Drivers had no route optimization, clients had zero visibility, and payment reconciliation took 3 days.',
    solution: 'Built a full logistics platform with a driver mobile app, client tracking portal, and admin dashboard. Integrated M-Pesa for instant payment on delivery and Socket.io for real-time GPS tracking.',
    results: [
      { metric: '30%', label: 'Reduction in delivery delays' },
      { metric: '3x', label: 'Faster payment reconciliation' },
      { metric: '200+', label: 'Daily deliveries managed' },
      { metric: '98%', label: 'Driver app adoption rate' },
    ],
    architecture: 'React frontend + Node.js/Express REST API + MongoDB Atlas + Socket.io for real-time events + M-Pesa Daraja STK Push + Google Maps Distance Matrix for route optimization.',
    lessons: 'Real-time systems in low-bandwidth environments require aggressive caching and graceful degradation. M-Pesa callbacks need idempotency keys to prevent double-processing.',
  },
  {
    id: 'schoolsync',
    title: 'SchoolSync — School Management System',
    description: 'Comprehensive school management platform for Kenyan secondary schools. Handles student records, fee collection via M-Pesa, exam results, and parent communication.',
    category: 'web',
    tech: ['React', 'Node.js', 'PostgreSQL', 'M-Pesa API', 'SendGrid', 'Redis'],
    liveUrl: '#',
    githubUrl: null,
    featured: true,
    status: 'Live',
    client: 'Private Secondary School, Nairobi',
    industry: 'Education Technology',
    problem: 'A 1,200-student school was running on paper registers, manual fee receipts, and phone calls to parents. Fee defaulters were tracked in Excel. Exam results took 2 weeks to reach parents.',
    solution: 'Built a multi-role platform: admin dashboard, teacher portal, parent app, and student portal. Automated fee reminders via SMS, M-Pesa fee collection with instant receipts, and digital result slips.',
    results: [
      { metric: '85%', label: 'Reduction in fee collection time' },
      { metric: '1,200+', label: 'Students on the platform' },
      { metric: '2 days', label: 'Results delivery (was 2 weeks)' },
      { metric: 'KES 0', label: 'Manual receipt printing cost' },
    ],
    architecture: 'React + Node.js/Express + PostgreSQL with role-based access control (RBAC) + Redis session caching + M-Pesa C2B for fee collection + SendGrid for automated parent notifications.',
    lessons: 'Multi-role systems need extremely careful permission design from day one. Adding roles later is expensive. PostgreSQL row-level security was the right call for student data isolation.',
  },
  {
    id: 'payflow',
    title: 'PayFlow — Payment Dashboard',
    description: 'Unified payment analytics dashboard for businesses running M-Pesa, card, and bank transfers. Single view of all transactions with reconciliation automation.',
    category: 'web',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'M-Pesa API', 'Stripe', 'Chart.js'],
    liveUrl: '#',
    githubUrl: null,
    featured: false,
    status: 'Live',
    client: 'E-Commerce Startup, Mombasa',
    industry: 'Fintech / E-Commerce',
    problem: 'An e-commerce business was reconciling M-Pesa, Stripe, and bank transfers manually every month. It took a full-time accountant 5 days per month and errors were common.',
    solution: 'Built a unified payment dashboard that pulls from all payment sources via webhooks, auto-reconciles transactions, flags discrepancies, and generates monthly reports in one click.',
    results: [
      { metric: '5 days → 2hrs', label: 'Monthly reconciliation time' },
      { metric: '99.2%', label: 'Reconciliation accuracy' },
      { metric: '3', label: 'Payment sources unified' },
      { metric: 'KES 80K/yr', label: 'Saved in manual accounting' },
    ],
    architecture: 'Next.js + TypeScript + PostgreSQL + webhook listeners for M-Pesa/Stripe/bank APIs + background jobs for reconciliation + Chart.js for analytics visualization.',
    lessons: 'Webhook reliability is everything in fintech. Implemented retry queues with exponential backoff and idempotency checks. Never trust payment status without a server-side verification call.',
  },
  {
    id: 'codevra-hq',
    title: 'Codevra HQ',
    description: 'Full-scale developer ecosystem with tools hub, secure vault, coding arena, learning tracker, and startup network.',
    category: 'web',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Redis'],
    liveUrl: 'https://codevra.vercel.app',
    githubUrl: 'https://github.com/codevradevs/coding-evolution-era',
    featured: false,
    status: 'In Development',
    client: 'Internal / Open Platform',
    industry: 'Developer Tools',
    problem: 'African developers lack a centralized platform for tools, learning, and community that understands local infrastructure needs.',
    solution: 'Building a full developer ecosystem with JWT tools, encrypted vault, coding challenges, learning tracker, and startup network — all in one platform.',
    results: [
      { metric: '310+', label: 'Platform modules' },
      { metric: '160+', label: 'Technical articles' },
      { metric: '140+', label: 'Developer tips' },
      { metric: 'AES-256', label: 'Vault encryption standard' },
    ],
    architecture: 'Monorepo with API-first microservices architecture',
    lessons: 'Building a platform vs a project requires fundamentally different thinking about user journeys and data flow.',
  },
  {
    id: 'secure-vault',
    title: 'Secure Note Vault',
    description: 'End-to-end encrypted note storage for developers. AES-256 encryption with client-side key derivation.',
    category: 'security',
    tech: ['React', 'Node.js', 'AES-256', 'bcrypt', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/codevradevs',
    featured: false,
    status: 'Beta',
    client: 'Internal Tool',
    industry: 'Security',
    problem: 'Developers store sensitive credentials and notes in plain text files or unencrypted apps.',
    solution: 'Zero-knowledge encrypted vault where the server never sees plaintext. Client-side AES-256 encryption with bcrypt-derived keys.',
    results: [
      { metric: 'AES-256', label: 'Encryption standard' },
      { metric: '0', label: 'Plaintext stored server-side' },
      { metric: 'Zero-knowledge', label: 'Architecture model' },
      { metric: 'OWASP', label: 'Security standard followed' },
    ],
    architecture: 'Zero-knowledge architecture — server never sees plaintext',
    lessons: 'Client-side encryption adds complexity but is non-negotiable for sensitive data.',
  },
  {
    id: 'mpesa-sdk',
    title: 'M-Pesa Integration SDK',
    description: 'Developer-friendly SDK for M-Pesa Daraja API. Simplifies STK push, B2C, and transaction queries.',
    category: 'experiment',
    tech: ['Node.js', 'TypeScript', 'M-Pesa API', 'Express'],
    liveUrl: 'https://npmjs.com/package/mpesa-sdk',
    githubUrl: 'https://github.com/codevradevs',
    featured: false,
    status: 'Published',
    client: 'Open Source',
    industry: 'Developer Tools / Fintech',
    problem: 'M-Pesa Daraja API has poor developer experience — verbose setup, confusing token management, and no TypeScript support.',
    solution: 'Built a clean, promise-based SDK with automatic token refresh, TypeScript types, and one-line STK push.',
    results: [
      { metric: '1 line', label: 'STK Push implementation' },
      { metric: 'Auto', label: 'Token refresh management' },
      { metric: 'TypeScript', label: 'Full type support' },
      { metric: 'npm', label: 'Published & installable' },
    ],
    architecture: 'Modular SDK with promise-based API and automatic token management',
    lessons: 'African fintech APIs need better developer experience. Documentation is a product.',
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);
  const filteredProjects = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

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
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Real Systems. <span className="gradient-text">Real Results.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-dark-400 max-w-2xl mx-auto mb-8">
            Not mockups. Not demos. Real systems built for real Kenyan businesses — with the problems, solutions, and measurable outcomes.
          </motion.p>
          {/* Social proof bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-6">
            {[
              { value: '10+', label: 'Systems Delivered' },
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

      {/* Projects */}
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass rounded-xl overflow-hidden transition-all duration-300 hover:border-brand-500/20"
                >
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {project.featured && <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">Featured</span>}
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800 text-dark-400">{project.status}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-dark-800/50 text-dark-500">{project.industry}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-dark-100">{project.title}</h3>
                        <p className="text-sm text-dark-500 mt-1">Client: {project.client}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-dark-800/50 text-dark-400 hover:text-dark-100 transition-colors"><Github className="w-4 h-4" /></a>}
                        {project.liveUrl && project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-dark-800/50 text-dark-400 hover:text-dark-100 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                      </div>
                    </div>

                    <p className="text-dark-400 leading-relaxed mb-6">{project.description}</p>

                    {/* Results metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      {project.results.map(r => (
                        <div key={r.label} className="bg-dark-800/30 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold gradient-text">{r.metric}</div>
                          <div className="text-xs text-dark-500 mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map(t => <span key={t} className="px-2.5 py-1 rounded-md bg-dark-800/50 text-xs text-dark-300 font-mono">{t}</span>)}
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="flex items-center gap-1 text-sm text-dark-500 hover:text-brand-400 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {expandedProject === project.id ? 'Hide Details' : 'View Problem, Solution & Architecture'}
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedProject === project.id ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-6 border-t border-dark-700/50 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">The Problem</span>
                              <p className="text-sm text-dark-300 mt-2 leading-relaxed">{project.problem}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Our Solution</span>
                              <p className="text-sm text-dark-300 mt-2 leading-relaxed">{project.solution}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Architecture</span>
                              <p className="text-sm text-dark-300 mt-2 leading-relaxed">{project.architecture}</p>
                              <div className="mt-3 pt-3 border-t border-dark-700/30">
                                <span className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Key Lesson</span>
                                <p className="text-xs text-dark-400 mt-1 italic">{project.lessons}</p>
                              </div>
                            </div>
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

      {/* CTA */}
      <section className="relative px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-10 text-center border border-brand-500/30">
            <h2 className="text-2xl font-bold text-dark-100 mb-3">Want Results Like These?</h2>
            <p className="text-dark-400 mb-6 max-w-md mx-auto">Tell us your problem. We'll scope it, price it, and build it — with the same rigour you see above.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="group">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">View Services & Pricing</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
