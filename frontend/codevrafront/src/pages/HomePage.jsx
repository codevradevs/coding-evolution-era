import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Globe, Smartphone, Shield, Brain, ShoppingCart, CheckCircle, MapPin, Mail, Phone, Image } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ModeToggle from '../components/ModeToggle';
import ClientMode from '../components/ClientMode';
import DeveloperMode from '../components/DeveloperMode';
import api from '../lib/api';

const outcomes = [
  {
    icon: Globe,
    title: 'Build your digital product',
    desc: 'Custom web applications, SaaS platforms and internal business systems.',
    href: '/services',
    tag: 'Web & SaaS',
  },
  {
    icon: Smartphone,
    title: 'Launch your mobile app',
    desc: 'Android/iOS applications designed around your customers and business workflows.',
    href: '/services',
    tag: 'Mobile',
  },
  {
    icon: Brain,
    title: 'Automate with AI',
    desc: 'AI assistants, document processing, intelligent search and workflow automation.',
    href: '/services',
    tag: 'AI Solutions',
  },
  {
    icon: ShoppingCart,
    title: 'Build your online presence',
    desc: 'High-performance websites and e-commerce stores designed to generate leads and sales.',
    href: '/services',
    tag: 'Web & E-Commerce',
  },
];

const process = [
  { step: '01', title: 'Discover', desc: 'Understand the business, goals, and requirements.' },
  { step: '02', title: 'Design', desc: 'UX/UI, architecture and technical planning.' },
  { step: '03', title: 'Build', desc: 'Development, integrations and AI where appropriate.' },
  { step: '04', title: 'Test', desc: 'Security, performance and cross-device testing.' },
  { step: '05', title: 'Launch', desc: 'Deployment, analytics and monitoring.' },
  { step: '06', title: 'Scale', desc: 'Maintenance, improvements and new features.' },
];

const techGroups = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST / GraphQL'] },
  { label: 'Infrastructure', items: ['Docker', 'CI/CD', 'Vercel', 'Render', 'Cloudflare'] },
  { label: 'AI', items: ['OpenAI API', 'RAG', 'LLM Agents', 'Vector DBs', 'Workflow Automation'] },
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

      {/* Hero — answers "Why Codevra?" in 5 seconds */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-brand text-brand-400 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              Based in Kenya · Building for the World
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="text-dark-100">We build software that helps</span>
            <br />
            <span className="gradient-text">businesses operate, sell, and scale.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto mb-4">
            Websites · Mobile Apps · Custom Software · AI Solutions
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base text-dark-500 max-w-xl mx-auto mb-10">
            Security-first engineering. Transparent pricing. Real results — not mockups.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link to="/contact">
              <Button size="xl" className="group">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="secondary" size="xl">View Our Work</Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '10+', label: 'Systems Delivered' },
              { value: '3', label: 'Industries Served' },
              { value: '100%', label: 'Payment Integrated' },
              { value: 'Global', label: 'Client Reach' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-dark-100">{s.value}</div>
                <div className="text-xs text-dark-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services as outcomes — item 3 */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              What We <span className="gradient-text">Build For You</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              We don't sell technology. We deliver outcomes.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {outcomes.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-6 hover:border-brand-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-brand-400 font-medium uppercase tracking-wider">{item.tag}</span>
                      <h3 className="text-lg font-bold text-dark-100 mt-1 mb-2">{item.title}</h3>
                      <p className="text-sm text-dark-400 leading-relaxed mb-4">{item.desc}</p>
                      <Link to={item.href} className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition font-medium">
                        Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center mt-8 gap-4">
            <Link to="/services"><Button size="lg" className="group">View All Services & Pricing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Get a Free Quote</Button></Link>
          </div>
        </div>
      </section>

      {/* Selected Work — item 2 */}
      <section className="relative py-20 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Selected <span className="gradient-text">Work</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Real systems built for real businesses — problem, solution, technology, result.
            </p>
          </motion.div>

          {featuredProjects.length > 0 ? (
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
          ) : (
            /* Static fallback case studies when no DB projects */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { emoji: '🚚', title: 'Tranzit Logistics', industry: 'Logistics', problem: 'Manual dispatch, no tracking', result: '30% fewer delivery delays', tech: ['React', 'Node.js', 'MongoDB'] },
                { emoji: '🏫', title: 'SchoolSync', industry: 'Education', problem: 'Paper-based school management', result: '1,200 students moved off paper', tech: ['React', 'Express', 'PostgreSQL'] },
                { emoji: '💳', title: 'PayFlow Dashboard', industry: 'Fintech', problem: 'Manual accounting every month', result: '5 days saved per month', tech: ['Next.js', 'Stripe', 'Redis'] },
              ].map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-6 flex flex-col hover:border-brand-500/20 transition-all">
                  <div className="text-3xl mb-3">{p.emoji}</div>
                  <span className="text-xs text-dark-500 mb-1">{p.industry}</span>
                  <h3 className="font-bold text-dark-100 mb-3">{p.title}</h3>
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="text-xs text-dark-500"><span className="text-dark-400 font-medium">Problem:</span> {p.problem}</div>
                    <div className="text-xs text-brand-400 font-medium">Result: {p.result}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map(t => <span key={t} className="px-2 py-0.5 rounded bg-dark-800/50 text-xs text-dark-400 font-mono">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Link to="/projects"><Button size="lg" className="group">View All Case Studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Start Your Project</Button></Link>
          </div>
        </div>
      </section>

      {/* How We Work — item 4 */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              How We <span className="gradient-text">Work</span>
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              A clear process so you always know what happens next.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all relative overflow-hidden">
                <div className="absolute top-4 right-4 text-5xl font-black text-dark-800/60 select-none leading-none">{step.step}</div>
                <div className="relative">
                  <div className="text-brand-400 font-mono text-xs font-bold mb-2 uppercase tracking-widest">{step.step}</div>
                  <h3 className="text-lg font-bold text-dark-100 mb-2">{step.title}</h3>
                  <p className="text-sm text-dark-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode toggle — client / developer */}
      <section className="relative py-16 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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

      {/* Tech stack — item 7 */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Built With <span className="gradient-text">Production-Grade Tech</span>
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              The technology supports the story — it doesn't become the story.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techGroups.map((group, i) => (
              <motion.div key={group.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5">
                <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-3">{group.label}</div>
                <div className="space-y-2">
                  {group.items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-dark-300">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-400/60 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-dark-500 mt-6">
            Tech-agnostic. We recommend what fits your project — not what's trendy. <Link to="/services" className="text-brand-400 hover:text-brand-300">See full stack →</Link>
          </motion.p>
        </div>
      </section>

      {/* Trust signals — item 5 */}
      <section className="relative py-20 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              What Clients <span className="gradient-text">Say</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { quote: "Codevra built our entire logistics platform in under 6 weeks. Payment integration worked flawlessly from day one. Delivery delays dropped by 30% in the first month.", name: "James M.", role: "CEO, Tranzit Logistics", emoji: "🚚" },
              { quote: "Our school was drowning in paper. SchoolSync changed everything — fee collection, results, parent communication. The team understood exactly what we needed.", name: "Principal Sarah W.", role: "Private Secondary School", emoji: "🏫" },
              { quote: "Finally a dev team that speaks our language. They didn't just build what we asked — they told us what we actually needed. PayFlow saved us 5 days of accounting every month.", name: "Amina K.", role: "Founder, E-Commerce Startup", emoji: "💳" },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 flex flex-col gap-4">
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

          {/* Trust bar — location, contact, security */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-400" />
              <div className="text-sm font-semibold text-dark-100">Based in Kenya</div>
              <div className="text-xs text-dark-500">Building for the world</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-5 h-5 text-brand-400" />
              <div className="text-sm font-semibold text-dark-100">hello@codevra.co.ke</div>
              <div className="text-xs text-dark-500">Reply within 24 hours</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-5 h-5 text-brand-400" />
              <a href="https://wa.me/254140710690" className="text-sm font-semibold text-dark-100 hover:text-brand-400 transition">WhatsApp Us</a>
              <div className="text-xs text-dark-500">+254 140 710 690</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center border-brand-500/30">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Ready to Build?</h2>
            <p className="text-dark-400 mb-8 max-w-lg mx-auto">
              Have an idea, a business problem, or an existing system that needs improvement? Tell us what you're trying to accomplish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="group">
                  Tell Us What You're Building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="secondary" size="xl">Join the Ecosystem</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
