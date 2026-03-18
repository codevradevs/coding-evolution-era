import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Wrench, Lock, Puzzle, TrendingUp, Globe, ArrowRight, Trophy, Zap, BookOpen, Code2 } from 'lucide-react';

const tools = [
  { icon: Wrench, title: 'Developer Tools Hub', desc: 'JWT decoder, hash generator, Base64, regex tester', href: '/hub/tools', emoji: '🛠' },
  { icon: Lock, title: 'Secure Vault', desc: 'AES-256 encrypted note storage', href: '/hub/vault', emoji: '🔐' },
  { icon: Puzzle, title: 'Code Arena', desc: 'XP system + leaderboard challenges', href: '/hub/arena', emoji: '🧩' },
  { icon: TrendingUp, title: 'Learning Tracker', desc: 'Track courses, skills, streaks', href: '/hub/tracker', emoji: '📈' },
  { icon: Globe, title: 'Startup Network', desc: 'Connect with African founders', href: '/hub/network', emoji: '🌍' }
];

const badges = [
  { emoji: '🏆', name: 'Arena Champion', xp: '500 XP' },
  { emoji: '🔥', name: '30 Day Streak', xp: '300 XP' },
  { emoji: '⚡', name: 'Speed Coder', xp: '200 XP' },
  { emoji: '🛡️', name: 'Security Expert', xp: '400 XP' },
  { emoji: '🌟', name: 'Early Adopter', xp: '100 XP' },
  { emoji: '💎', name: 'Tool Master', xp: '250 XP' }
];

const philosophy = [
  'Systems > Scripts',
  'Security by Default',
  'African-First Infrastructure',
  'Ship Fast. Harden Faster.'
];

export default function DeveloperMode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div className="mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Welcome to <span className="gradient-text">Codevra HQ</span>
            </h2>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              You're not here to consume tutorials. You're here to build systems.
            </p>
          </motion.div>
          <motion.div className="glass rounded-xl p-8 max-w-2xl mx-auto">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-brand-400" />
                <span className="text-dark-300">Full-stack developer ecosystem</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-brand-400" />
                <span className="text-dark-300">140+ structured developer tips</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-brand-400" />
                <span className="text-dark-300">Gamified XP & badge system</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-brand-400" />
                <span className="text-dark-300">160+ technical articles</span>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/auth/register">
                <Button size="xl" className="w-full group">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              The Developer <span className="gradient-text-accent">Stack</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={tool.href} className="block group">
                    <div className="glass rounded-xl p-6 h-full hover:border-accent-500/30 hover:scale-[1.02] transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-accent-500/10 text-accent-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-dark-100 mb-1 flex items-center gap-2">
                            <span>{tool.emoji}</span>
                            {tool.title}
                          </h3>
                          <p className="text-sm text-dark-400">{tool.desc}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-accent-400 group-hover:translate-x-1 transition-transform">
                        Explore →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Gamified <span className="gradient-text">Growth System</span>
            </h2>
            <p className="text-dark-400">Earn XP, unlock badges, climb the leaderboard</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="glass rounded-xl p-4 text-center min-w-[120px]"
              >
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <div className="text-sm font-medium text-dark-200 mb-1">{badge.name}</div>
                <div className="text-xs text-accent-400">{badge.xp}</div>
              </motion.div>
            ))}
          </div>
          <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dark-100 mb-4 text-center">How You Earn XP</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30">
                <span className="text-dark-300">View Developer Tip</span>
                <span className="text-brand-400 font-bold">+5 XP</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30">
                <span className="text-dark-300">Complete Code Challenge</span>
                <span className="text-brand-400 font-bold">+50 XP</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30">
                <span className="text-dark-300">30-Day Learning Streak</span>
                <span className="text-brand-400 font-bold">+300 XP</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/hub/arena">
                <Button size="lg" className="group">
                  <Trophy className="w-5 h-5" />
                  Compete Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Real Technical <span className="gradient-text">Content</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-8 hover:border-brand-500/30 transition-all"
            >
              <BookOpen className="w-10 h-10 text-brand-400 mb-4" />
              <h3 className="text-2xl font-bold text-dark-100 mb-2">160 Blog Posts</h3>
              <ul className="space-y-2 text-dark-400 mb-6">
                <li>• 40 Security Deep Dives</li>
                <li>• 30 Build Logs</li>
                <li>• 35 African Tech Articles</li>
                <li>• 55 Productivity & Analysis</li>
              </ul>
              <Link to="/blog">
                <Button variant="secondary" className="group">
                  Read the Blog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-8 hover:border-accent-500/30 transition-all"
            >
              <Code2 className="w-10 h-10 text-accent-400 mb-4" />
              <h3 className="text-2xl font-bold text-dark-100 mb-2">140 Developer Tips</h3>
              <ul className="space-y-2 text-dark-400 mb-6">
                <li>• Git workflows & best practices</li>
                <li>• Deployment strategies</li>
                <li>• Security hardening</li>
                <li>• AI-assisted development</li>
              </ul>
              <Link to="/hub/tips">
                <Button variant="secondary" className="group">
                  Explore Tips
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-dark-100 mb-4">
              Developer <span className="gradient-text-accent">Philosophy</span>
            </h2>
          </motion.div>
          <div className="glass rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {philosophy.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-dark-800/30"
                >
                  <Zap className="w-5 h-5 text-accent-400 shrink-0" />
                  <span className="text-dark-200 font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="glass rounded-2xl p-12 text-center border-accent-500/30">
            <Trophy className="w-12 h-12 text-accent-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-dark-100 mb-4">Join the Ecosystem</h2>
            <p className="text-dark-400 mb-8 max-w-lg mx-auto">
              Level up your dev skills. Build real systems. Connect with African innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="xl" className="group">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
