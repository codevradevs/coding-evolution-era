import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, Code2, Palette, Shield, Gamepad2, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const playgrounds = [
  {
    id: '3d-lab',
    title: '3D Playground',
    description: 'Spawn shapes, control physics, create chaos',
    icon: Box,
    color: 'brand',
    href: '/fun-lab/3d',
    emoji: '🎮',
    status: 'live'
  },
  {
    id: 'code-arena',
    title: 'Code Battle',
    description: 'Fix bugs in 60 seconds, earn points',
    icon: Code2,
    color: 'accent',
    href: '/fun-lab/code',
    emoji: '⚡',
    status: 'live'
  },
  {
    id: 'animation-lab',
    title: 'Animation Lab',
    description: 'Tweak CSS, see instant chaos',
    icon: Palette,
    color: 'brand',
    href: '/fun-lab/animation',
    emoji: '🎨',
    status: 'live'
  },
  {
    id: 'cyber-play',
    title: 'Cyber Simulator',
    description: 'Spot vulnerabilities, hack safely',
    icon: Shield,
    color: 'accent',
    href: '/fun-lab/cyber',
    emoji: '🛡️',
    status: 'live'
  },
  {
    id: 'mini-games',
    title: 'Logic Puzzles',
    description: 'Binary speed test, regex challenges',
    icon: Gamepad2,
    color: 'brand',
    href: '/fun-lab/games',
    emoji: '🧩',
    status: 'live'
  },
  {
    id: 'chaos-mode',
    title: 'Break The Site',
    description: 'Glitch everything, then fix it',
    icon: Sparkles,
    color: 'accent',
    href: '/fun-lab/chaos',
    emoji: '💥',
    status: 'live'
  },
  {
    id: 'code-puzzle',
    title: 'Code Cleanup',
    description: 'Fix broken code before time runs out',
    icon: Code2,
    color: 'accent',
    href: '/fun-lab/code-puzzle',
    emoji: '🔧',
    status: 'live'
  },
  {
    id: 'image-puzzle',
    title: 'Code Puzzle',
    description: 'Drag code pieces into the right order',
    icon: Gamepad2,
    color: 'brand',
    href: '/fun-lab/image-puzzle',
    emoji: '🧩',
    status: 'live'
  }
];

export default function FunLabPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-brand text-brand-400 text-sm font-medium">
              <Zap className="w-3.5 h-3.5" />
              Interactive Developer Playground
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Fun Lab</span>
            <br />
            <span className="text-dark-100">Where Devs Play</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-dark-400 max-w-2xl mx-auto mb-12"
          >
            Not tutorials. Not docs. Just pure interactive chaos. Click stuff. Break stuff. Learn stuff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <div className="glass rounded-lg px-4 py-2">
              <span className="text-2xl font-bold gradient-text">8</span>
              <span className="text-sm text-dark-400 ml-2">Playgrounds</span>
            </div>
            <div className="glass rounded-lg px-4 py-2">
              <span className="text-2xl font-bold gradient-text-accent">100%</span>
              <span className="text-sm text-dark-400 ml-2">Live</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playgrounds.map((playground, i) => {
              const Icon = playground.icon;
              return (
                <motion.div
                  key={playground.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {playground.status === 'live' ? (
                    <Link to={playground.href} className="block group">
                      <div className={`glass rounded-xl p-6 h-full hover:scale-[1.02] transition-all ${
                        playground.color === 'brand' ? 'hover:border-brand-500/30' : 'hover:border-accent-500/30'
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${
                            playground.color === 'brand' ? 'bg-brand-500/10 text-brand-400' : 'bg-accent-500/10 text-accent-400'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-3xl">{playground.emoji}</span>
                        </div>
                        <h3 className="text-xl font-bold text-dark-100 mb-2">{playground.title}</h3>
                        <p className="text-sm text-dark-400 mb-4">{playground.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-400 group-hover:translate-x-1 transition-transform">
                          Launch
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="glass rounded-xl p-6 h-full opacity-60 cursor-not-allowed">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-lg bg-dark-700/30 text-dark-500">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl grayscale">{playground.emoji}</span>
                      </div>
                      <h3 className="text-xl font-bold text-dark-300 mb-2">{playground.title}</h3>
                      <p className="text-sm text-dark-500 mb-4">{playground.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800/50 text-xs text-dark-500">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Sparkles className="w-12 h-12 text-brand-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-dark-100 mb-4">No Rules. Just Play.</h2>
            <p className="text-dark-400 mb-8 max-w-lg mx-auto">
              Every playground is a sandbox. Break things. Learn things. Share your creations.
            </p>
            <Link to="/fun-lab/3d">
              <Button size="xl" className="group">
                Start Playing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
