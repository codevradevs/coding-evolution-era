import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Zap, Box as BoxIcon, Play, Pause } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function ThreeDLabPage() {
  const [color, setColor] = useState('#6366f1');
  const [speed, setSpeed] = useState(1);
  const [size, setSize] = useState(150);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setRotateX(prev => prev + speed);
      setRotateY(prev => prev + speed * 0.5);
    }, 16);
    return () => clearInterval(interval);
  }, [isAnimating, speed]);

  const randomize = () => {
    setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    setSpeed(0.5 + Math.random() * 3);
    setSize(100 + Math.random() * 150);
  };

  const reset = () => {
    setColor('#6366f1');
    setSpeed(1);
    setSize(150);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-dark-950" />
      
      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">3D Playground</span>
            </h1>
            <p className="text-dark-400">Control the cube. Change reality.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl flex items-center justify-center"
                style={{ height: '500px', perspective: '1000px' }}
              >
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transition: 'width 0.3s, height 0.3s',
                  }}
                >
                  {/* Front */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: color,
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: `translateZ(${size/2}px)`,
                    boxShadow: `0 0 30px ${color}40`,
                  }} />
                  {/* Back */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: color,
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: `translateZ(-${size/2}px) rotateY(180deg)`,
                  }} />
                  {/* Right */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: color,
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: `rotateY(90deg) translateZ(${size/2}px)`,
                  }} />
                  {/* Left */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: color,
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: `rotateY(-90deg) translateZ(${size/2}px)`,
                  }} />
                  {/* Top */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: color,
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: `rotateX(90deg) translateZ(${size/2}px)`,
                  }} />
                  {/* Bottom */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: color,
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: `rotateX(-90deg) translateZ(${size/2}px)`,
                  }} />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-dark-100 mb-6 flex items-center gap-2">
                <BoxIcon className="w-5 h-5 text-brand-400" />
                Controls
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-dark-400 mb-2 block">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Speed: {speed.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Size: {size.toFixed(0)}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="10"
                    value={size}
                    onChange={(e) => setSize(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <Button onClick={() => setIsAnimating(!isAnimating)} variant="secondary" className="w-full">
                    {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isAnimating ? 'Pause' : 'Play'}
                  </Button>
                  <Button onClick={randomize} className="w-full group">
                    <Zap className="w-4 h-4" />
                    Randomize Everything
                  </Button>
                  <Button onClick={reset} variant="secondary" className="w-full">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-dark-700/30">
                <p className="text-xs text-dark-500">
                  💡 Pure CSS 3D transforms • No WebGL
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
