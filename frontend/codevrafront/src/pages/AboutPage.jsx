import { motion } from 'framer-motion';
import { Shield, Code2, Server, Lock, Rocket, Globe, Cpu, Database, Cloud, Terminal, Layers, Zap, TrendingUp, Users, CheckCircle, Target } from 'lucide-react';

const skills = [
  { category: 'Frontend Systems', icon: Code2, color: 'brand', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], level: 92 },
  { category: 'Backend Systems', icon: Server, color: 'accent', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST APIs'], level: 88 },
  { category: 'Security Research', icon: Lock, color: 'brand', items: ['Penetration Testing', 'Cryptography', 'OWASP', 'JWT Security', 'Threat Modeling'], level: 85 },
  { category: 'DevOps Foundations', icon: Cloud, color: 'accent', items: ['Docker', 'CI/CD', 'Vercel', 'Railway', 'Cloudflare'], level: 78 },
];

const timeline = [
  { year: 'The Beginning', title: 'Curiosity Sparked', description: 'Started with HTML and CSS, building simple websites. The curiosity to understand how things work under the hood drove everything forward.' },
  { year: 'The Deep Dive', title: 'Systems Thinking', description: 'Moved beyond frontend into backend systems, databases, and APIs. Started thinking in architectures, not just pages.' },
  { year: 'The Security Turn', title: 'Breaking to Build Better', description: 'Discovered cybersecurity. Learning to break systems taught how to build them stronger. OWASP, penetration testing, cryptography became core skills.' },
  { year: 'The Mission', title: 'African Tech Futures', description: 'Realized the gap in African tech infrastructure. Started building tools and platforms specifically for the African developer ecosystem.' },
  { year: 'Now', title: 'Codevra HQ', description: 'Building a full developer ecosystem — tools, vault, arena, tracker, and network. Not just a portfolio. A platform for African innovation.' },
];

const principles = [
  { icon: Shield, title: 'Build Secure by Default', description: 'Security isn\'t an afterthought. Every system is designed with defense in depth from day one.' },
  { icon: Layers, title: 'Systems > Scripts', description: 'Building interconnected systems that scale, not throwaway scripts that break.' },
  { icon: Globe, title: 'African-First Innovation', description: 'Solving problems that matter to the continent. M-Pesa integrations, local-first solutions.' },
  { icon: Rocket, title: 'Ship Fast, Refine Faster', description: 'Launch MVPs quickly, iterate based on real feedback. Perfection is the enemy of progress.' },
];

const stats = [
  { value: '310+', label: 'Content Items', icon: Database },
  { value: '110', label: 'Services', icon: Rocket },
  { value: '160', label: 'Blog Posts', icon: Code2 },
  { value: '140', label: 'Dev Tips', icon: Zap }
];

const differentiators = [
  { icon: Shield, title: 'Security-First Architecture', description: 'OWASP standards as implementation, not theory. Every endpoint validated, rate-limited, and threat-modeled.' },
  { icon: Globe, title: 'African Infrastructure Focus', description: 'M-Pesa integrations. Low-bandwidth optimization. Payment reliability. Built for Africa, not just hosted in Africa.' },
  { icon: Layers, title: 'Real Systems, Not Tutorials', description: 'Secure vaults. XP engines. Role-based systems. Proposal generators. Actual production architecture.' },
  { icon: Cpu, title: 'Ecosystem Thinking', description: 'Codevra isn\'t a website. It\'s a stack of interconnected products designed to scale together.' }
];

const methodology = [
  'Every feature begins with a threat model',
  'Every endpoint is rate-limited by default',
  'Every sensitive operation is validated twice',
  'Authentication flows are JWT + refresh token',
  'Database queries use parameterized statements',
  'Encryption is AES-256 with proper key management'
];

const vision = [
  { title: 'African Dev Infrastructure Layer', description: 'Secure-by-default SaaS templates for African startups' },
  { title: 'Dev Education Platform', description: 'Certifications focused on system thinking, not framework tutorials' },
  { title: 'Startup Co-Building Network', description: 'Connect technical co-founders with validated ideas' },
  { title: 'AI-Assisted SaaS Builder', description: 'Generate production-ready backends with security baked in' }
];

const currentFocus = [
  'Threat modeling advanced JWT flows',
  'Scaling XP systems for gamification',
  'Distributed caching patterns with Redis',
  'Multi-tenant SaaS foundations',
  'Real-time systems architecture'
];

const audience = [
  { icon: Rocket, title: 'Startups', description: 'Need secure MVPs with M-Pesa integration and African payment rails.' },
  { icon: Users, title: 'Founders', description: 'Need system architects who think in infrastructure, not freelancers who copy-paste.' },
  { icon: Code2, title: 'Developers', description: 'Want to level up from "framework user" to "system thinker".' },
  { icon: TrendingUp, title: 'Investors', description: 'Looking for African SaaS infrastructure builders with technical depth.' }
];

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-dots pointer-events-none opacity-30" />

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <Cpu className="w-3 h-3" />ABOUT CODEVRA
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Not Just a Developer.
            <br />
            <span className="gradient-text">A Systems Builder.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-dark-400 max-w-2xl mx-auto">
            Building secure, scalable systems that solve real problems. Focused on African tech innovation and developer empowerment.
          </motion.p>
        </div>
      </section>

      <section className="relative py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6 text-center">
                  <Icon className="w-6 h-6 text-brand-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-100 mb-1">{stat.value}</div>
                  <div className="text-xs text-dark-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Why Codevra <span className="gradient-text">Had to Exist</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8 space-y-6">
            <p className="text-dark-300 text-lg leading-relaxed">
              Too many developers are taught <span className="text-brand-400 font-semibold">how to build features</span>.
              <br />Not enough are taught <span className="text-brand-400 font-semibold">how to build systems</span>.
            </p>
            <p className="text-dark-400 leading-relaxed">
              Copy-paste culture dominates. Tutorials teach syntax, not architecture. Security is an afterthought. Payments are "someone else's problem."
            </p>
            <p className="text-dark-400 leading-relaxed">
              In African tech ecosystems, this gap is even wider. M-Pesa integrations break. Infrastructure is fragile. Mentorship is scarce. Developers ship features but ignore threat models.
            </p>
            <p className="text-brand-300 font-semibold text-lg">
              Codevra exists to close that gap — especially where infrastructure, payments, and security demand a different level of thinking.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">The <span className="gradient-text">Origin Story</span></h2>
            <p className="text-dark-400">How curiosity became a mission.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-accent-500/50 to-dark-700/50" />
            {timeline.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-400 border-2 border-dark-950 z-10" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-xs font-mono text-brand-400 uppercase tracking-wider">{item.year}</span>
                  <h3 className="text-xl font-bold text-dark-100 mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-dark-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">What Makes Codevra <span className="gradient-text-accent">Different</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-100 mb-2">{item.title}</h3>
                      <p className="text-sm text-dark-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Skill <span className="gradient-text-accent">Stack</span></h2>
            <p className="text-dark-400">Not just listing skills. Showing depth.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div key={skill.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 group hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-lg ${skill.color === 'brand' ? 'bg-brand-500/10 text-brand-400' : 'bg-accent-500/10 text-accent-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-100">{skill.category}</h3>
                      <span className="text-xs text-dark-500">{skill.level}% proficiency</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-dark-800 rounded-full mb-4 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className={`h-full rounded-full ${skill.color === 'brand' ? 'bg-gradient-to-r from-brand-500 to-brand-400' : 'bg-gradient-to-r from-accent-500 to-accent-400'}`} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-md bg-dark-800/50 text-xs text-dark-300 font-mono">{item}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">How I Think About <span className="gradient-text">Systems</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8">
            <div className="space-y-3">
              {methodology.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-dark-300">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-dark-700/30">
              <p className="text-dark-400 italic">
                "JWT without proper rotation is a liability. Encryption without key management is theater. Rate limiting isn't optional — it's survival."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Core <span className="gradient-text">Philosophy</span></h2>
            <p className="text-dark-400">The principles that drive every line of code.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <motion.div key={principle.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 flex items-start gap-4 group hover:border-brand-500/20 transition-all duration-300">
                  <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-100 mb-1">{principle.title}</h3>
                    <p className="text-sm text-dark-400 leading-relaxed">{principle.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">The <span className="gradient-text">10-Year Vision</span></h2>
            <p className="text-dark-400">Building infrastructure for African builders</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vision.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6 border-l-4 border-brand-500/50">
                <h3 className="font-bold text-dark-100 mb-2">{item.title}</h3>
                <p className="text-sm text-dark-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Currently <span className="gradient-text-accent">Building</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFocus.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/30">
                  <Zap className="w-4 h-4 text-accent-400 shrink-0" />
                  <span className="text-sm text-dark-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Who Should Work <span className="gradient-text">With Codevra</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audience.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent-500/10 text-accent-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-100 mb-2">{item.title}</h3>
                      <p className="text-sm text-dark-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-12 text-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold text-dark-100">Code is leverage.</p>
              <p className="text-2xl font-bold text-brand-400">Security is responsibility.</p>
              <p className="text-2xl font-bold text-accent-400">Systems are legacy.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 border border-brand-500/30">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-5 h-5 text-brand-400" />
              <span className="font-mono text-sm text-dark-400">codevra.stack</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div><span className="text-accent-400">const</span> <span className="text-brand-300">codevra</span> <span className="text-dark-400">=</span> <span className="text-dark-400">{'{'}</span></div>
              <div className="pl-4"><span className="text-dark-300">frontend:</span> <span className="text-brand-400">["Next.js", "React", "TypeScript", "Tailwind"]</span>,</div>
              <div className="pl-4"><span className="text-dark-300">backend:</span> <span className="text-accent-400">["Node.js", "Express", "PostgreSQL", "Redis"]</span>,</div>
              <div className="pl-4"><span className="text-dark-300">security:</span> <span className="text-red-400">["AES-256", "JWT", "bcrypt", "OWASP"]</span>,</div>
              <div className="pl-4"><span className="text-dark-300">deploy:</span> <span className="text-yellow-400">["Vercel", "Railway", "Docker", "Cloudflare"]</span>,</div>
              <div className="pl-4"><span className="text-dark-300">mission:</span> <span className="text-brand-300">"Building African Tech Futures"</span></div>
              <div><span className="text-dark-400">{'}'}</span>;</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
