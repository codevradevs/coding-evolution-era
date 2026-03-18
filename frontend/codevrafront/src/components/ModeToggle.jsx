import { motion } from 'framer-motion';
import { Briefcase, Code2 } from 'lucide-react';

export default function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <button
        onClick={() => setMode('client')}
        className={`relative px-8 py-4 rounded-xl font-semibold transition-all ${
          mode === 'client'
            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
            : 'glass text-dark-400 hover:text-dark-200'
        }`}
      >
        <Briefcase className="w-5 h-5 inline mr-2" />
        I'm a Client
        {mode === 'client' && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-brand-500 rounded-xl -z-10"
            transition={{ type: 'spring', duration: 0.6 }}
          />
        )}
      </button>
      <button
        onClick={() => setMode('developer')}
        className={`relative px-8 py-4 rounded-xl font-semibold transition-all ${
          mode === 'developer'
            ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
            : 'glass text-dark-400 hover:text-dark-200'
        }`}
      >
        <Code2 className="w-5 h-5 inline mr-2" />
        I'm a Developer
        {mode === 'developer' && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-accent-500 rounded-xl -z-10"
            transition={{ type: 'spring', duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
}
