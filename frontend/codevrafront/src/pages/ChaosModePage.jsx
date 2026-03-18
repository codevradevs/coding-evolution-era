import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const glitchEffects = [
  { id: 'shake', name: 'Earthquake Mode', description: 'Everything shakes uncontrollably' },
  { id: 'rotate', name: 'Spin Cycle', description: 'Page rotates randomly' },
  { id: 'invert', name: 'Upside Down', description: 'Colors and orientation inverted' },
  { id: 'blur', name: 'Vision Blur', description: 'Everything becomes blurry' },
  { id: 'glitch', name: 'Matrix Glitch', description: 'Text scrambles randomly' }
];

export default function ChaosModePage() {
  const [isChaos, setIsChaos] = useState(false);
  const [activeEffects, setActiveEffects] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fixedCount, setFixedCount] = useState(0);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setIsChaos(false);
      setActiveEffects([]);
    }
  }, [isPlaying, timeLeft]);

  const activateChaos = () => {
    setIsChaos(true);
    setIsPlaying(true);
    setTimeLeft(60);
    setFixedCount(0);
    setScore(0);
    
    // Activate random effects
    const numEffects = 3;
    const shuffled = [...glitchEffects].sort(() => Math.random() - 0.5);
    setActiveEffects(shuffled.slice(0, numEffects).map(e => e.id));
  };

  const fixEffect = (effectId) => {
    if (!activeEffects.includes(effectId)) return;
    
    setActiveEffects(prev => prev.filter(id => id !== effectId));
    setFixedCount(prev => prev + 1);
    setScore(prev => prev + 100);

    if (activeEffects.length === 1) {
      setIsChaos(false);
      setIsPlaying(false);
    }
  };

  const reset = () => {
    setIsChaos(false);
    setActiveEffects([]);
    setIsPlaying(false);
    setTimeLeft(60);
    setFixedCount(0);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-dark-950" />
      
      <motion.div
        animate={{
          rotate: activeEffects.includes('rotate') ? [0, 5, -5, 0] : 0,
          x: activeEffects.includes('shake') ? [0, -10, 10, -10, 10, 0] : 0,
          y: activeEffects.includes('shake') ? [0, -10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          repeat: isChaos ? Infinity : 0,
          duration: 0.5,
        }}
        style={{
          filter: activeEffects.includes('blur') ? 'blur(3px)' : 'none',
          transform: activeEffects.includes('invert') ? 'scaleY(-1)' : 'none',
        }}
      >
        <section className="relative pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
              style={{
                filter: activeEffects.includes('invert') ? 'invert(1) hue-rotate(180deg)' : 'none',
              }}
            >
              <h1 className="text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {activeEffects.includes('glitch') ? '🅱️🆁🅴🅰️🅺 🆃🅷🅴 🆂🅸🆃🅴' : 'Break The Site'}
                </span>
              </h1>
              <p className="text-dark-400">
                {isChaos ? 'Fix it before time runs out!' : 'Unleash chaos, then fix it'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-xl p-8"
                >
                  {!isPlaying ? (
                    <div className="text-center py-12">
                      <Sparkles className="w-16 h-16 text-brand-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-dark-100 mb-4">
                        Ready for Chaos?
                      </h3>
                      <p className="text-dark-400 mb-8 max-w-md mx-auto">
                        Click the button to break everything. Then race against time to fix all the glitches!
                      </p>
                      <Button onClick={activateChaos} size="xl" className="group">
                        <Zap className="w-5 h-5" />
                        Activate Chaos Mode
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="font-semibold text-red-400">Active Glitches</span>
                        </div>
                        <div className="space-y-2">
                          {glitchEffects.map((effect) => {
                            const isActive = activeEffects.includes(effect.id);
                            const isFixed = !isActive && fixedCount > 0;
                            
                            return (
                              <motion.div
                                key={effect.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                  isFixed ? 'bg-green-500/10 border border-green-500/30' :
                                  isActive ? 'bg-dark-800/50 border border-dark-700' :
                                  'opacity-50'
                                }`}
                              >
                                <div>
                                  <div className="font-medium text-dark-200">{effect.name}</div>
                                  <div className="text-xs text-dark-500">{effect.description}</div>
                                </div>
                                {isActive ? (
                                  <Button
                                    onClick={() => fixEffect(effect.id)}
                                    size="sm"
                                    variant="secondary"
                                  >
                                    Fix
                                  </Button>
                                ) : isFixed ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : null}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {activeEffects.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-6 rounded-lg bg-green-500/10 border border-green-500/30 text-center"
                        >
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <h3 className="text-xl font-bold text-green-400 mb-2">All Fixed!</h3>
                          <p className="text-dark-400 mb-4">You earned {score} points</p>
                          <Button onClick={activateChaos}>
                            Play Again
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-bold text-dark-100 mb-4">Time Left</h3>
                  <div className={`text-4xl font-bold ${
                    timeLeft < 10 ? 'text-red-400' : 'gradient-text'
                  }`}>
                    {timeLeft}s
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-bold text-dark-100 mb-4">Score</h3>
                  <div className="text-4xl font-bold gradient-text-accent">{score}</div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-dark-300 mb-3">Fixed</h3>
                  <div className="text-2xl font-bold text-brand-400">
                    {fixedCount} / {glitchEffects.length}
                  </div>
                </div>

                {isPlaying && (
                  <Button onClick={reset} variant="secondary" className="w-full">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>

      <AnimatePresence>
        {activeEffects.includes('glitch') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="fixed inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(99, 102, 241, 0.1) 0px, transparent 2px, transparent 4px, rgba(99, 102, 241, 0.1) 6px)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
