import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, RotateCcw, Trophy, Timer } from 'lucide-react';
import { Button } from '../components/ui/Button';

const challenges = [
  {
    id: 1,
    title: 'Fix the Loop',
    description: 'This loop never stops. Fix it in 60 seconds.',
    brokenCode: `for (let i = 0; i < 10; i--) {
  console.log(i);
}`,
    solution: `for (let i = 0; i < 10; i++) {
  console.log(i);
}`,
    hint: 'Check the increment operator'
  },
  {
    id: 2,
    title: 'Array Bug',
    description: 'Find the sum of array elements',
    brokenCode: `const arr = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i <= arr.length; i++) {
  sum += arr[i];
}
console.log(sum);`,
    solution: `const arr = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);`,
    hint: 'Array index out of bounds'
  },
  {
    id: 3,
    title: 'Async Chaos',
    description: 'Make this async function work',
    brokenCode: `async function getData() {
  const data = fetch('/api/data');
  console.log(data);
}`,
    solution: `async function getData() {
  const data = await fetch('/api/data');
  console.log(data);
}`,
    hint: 'Missing await keyword'
  }
];

export default function CodeBattlePage() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0].brokenCode);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const challenge = challenges[currentChallenge];

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setResult('timeout');
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startChallenge = () => {
    setIsRunning(true);
    setTimeLeft(60);
    setResult(null);
  };

  const checkSolution = () => {
    const normalized = code.trim().replace(/\s+/g, ' ');
    const solutionNormalized = challenge.solution.trim().replace(/\s+/g, ' ');
    
    if (normalized === solutionNormalized) {
      setResult('success');
      setScore(prev => prev + Math.floor(timeLeft * 10));
      setIsRunning(false);
    } else {
      setResult('wrong');
    }
  };

  const nextChallenge = () => {
    const next = (currentChallenge + 1) % challenges.length;
    setCurrentChallenge(next);
    setCode(challenges[next].brokenCode);
    setTimeLeft(60);
    setIsRunning(false);
    setResult(null);
  };

  const reset = () => {
    setCode(challenge.brokenCode);
    setTimeLeft(60);
    setIsRunning(false);
    setResult(null);
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
              <span className="gradient-text">Code Battle</span>
            </h1>
            <p className="text-dark-400">Fix bugs. Beat the clock. Earn points.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-dark-100">{challenge.title}</h3>
                  <div className="flex items-center gap-2 text-brand-400">
                    <Timer className="w-4 h-4" />
                    <span className="font-mono text-xl">{timeLeft}s</span>
                  </div>
                </div>
                
                <p className="text-sm text-dark-400 mb-4">{challenge.description}</p>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 bg-dark-900 rounded-lg p-4 font-mono text-sm text-dark-200 border border-dark-700 focus:border-brand-500 focus:outline-none resize-none"
                  disabled={!isRunning}
                />

                {result === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                  >
                    ✓ Correct! +{Math.floor(timeLeft * 10)} points
                  </motion.div>
                )}

                {result === 'wrong' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                  >
                    ✗ Not quite. Try again!
                  </motion.div>
                )}

                {result === 'timeout' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                  >
                    ⏱ Time's up! Try the next challenge.
                  </motion.div>
                )}

                <div className="mt-4 flex gap-3">
                  {!isRunning && result !== 'success' && (
                    <Button onClick={startChallenge} className="group">
                      <Play className="w-4 h-4" />
                      Start Challenge
                    </Button>
                  )}
                  {isRunning && (
                    <Button onClick={checkSolution} className="group">
                      <Code2 className="w-4 h-4" />
                      Check Solution
                    </Button>
                  )}
                  {result === 'success' && (
                    <Button onClick={nextChallenge} className="group">
                      Next Challenge
                    </Button>
                  )}
                  <Button onClick={reset} variant="secondary">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-dark-100 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent-400" />
                  Your Score
                </h3>
                <div className="text-4xl font-bold gradient-text">{score}</div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-dark-300 mb-3">Hint</h3>
                <p className="text-sm text-dark-400">{challenge.hint}</p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-dark-300 mb-3">Progress</h3>
                <p className="text-sm text-dark-400">
                  Challenge {currentChallenge + 1} of {challenges.length}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
