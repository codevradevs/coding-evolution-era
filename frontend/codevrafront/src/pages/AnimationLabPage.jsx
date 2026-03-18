import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, RotateCcw, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function AnimationLabPage() {
  const [borderRadius, setBorderRadius] = useState(8);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [blur, setBlur] = useState(0);
  const [hue, setHue] = useState(220);

  const randomize = () => {
    setBorderRadius(Math.random() * 100);
    setRotation(Math.random() * 360);
    setScale(0.5 + Math.random() * 1.5);
    setBlur(Math.random() * 20);
    setHue(Math.random() * 360);
  };

  const reset = () => {
    setBorderRadius(8);
    setRotation(0);
    setScale(1);
    setBlur(0);
    setHue(220);
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
              <span className="gradient-text-accent">Animation Lab</span>
            </h1>
            <p className="text-dark-400">Tweak CSS. See instant chaos.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl p-12 flex items-center justify-center"
                style={{ minHeight: '500px' }}
              >
                <motion.div
                  animate={{
                    rotate: rotation,
                    scale: scale,
                  }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: `${borderRadius}px`,
                    background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 60}, 70%, 60%))`,
                    filter: `blur(${blur}px)`,
                    boxShadow: `0 20px 60px hsl(${hue}, 70%, 40%, 0.4)`,
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-dark-100 mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-accent-400" />
                CSS Controls
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Border Radius: {borderRadius.toFixed(0)}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Rotation: {rotation.toFixed(0)}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotation}
                    onChange={(e) => setRotation(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Scale: {scale.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Blur: {blur.toFixed(0)}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={blur}
                    onChange={(e) => setBlur(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-dark-400 mb-2 block">
                    Hue: {hue.toFixed(0)}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="pt-4 space-y-3">
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
                <p className="text-xs text-dark-500 font-mono">
                  transform: rotate({rotation.toFixed(0)}deg) scale({scale.toFixed(2)})
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
