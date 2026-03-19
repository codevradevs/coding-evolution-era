import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Timer, Trophy, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

const challenges = [
  {
    id: 1,
    title: 'Fix the Loop',
    hint: 'The loop should print numbers 1 to 5',
    expectedOutput: '1\n2\n3\n4\n5',
    brokenCode: `for i in range(0, 4):\n  print(i)`,
    fixedCode: `for i in range(1, 6):\n  print(i)`,
    timeLimit: 45,
  },
  {
    id: 2,
    title: 'Broken Function',
    hint: 'Function should return the sum of two numbers',
    expectedOutput: '7',
    brokenCode: `function add(a, b) {\n  return a - b;\n}\nconsole.log(add(3, 4));`,
    fixedCode: `function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 4));`,
    timeLimit: 40,
  },
  {
    id: 3,
    title: 'Array Filter',
    hint: 'Filter out numbers greater than 3 from [1,2,3,4,5]',
    expectedOutput: '[4, 5]',
    brokenCode: `const nums = [1,2,3,4,5];\nconst result = nums.filter(n => n < 3);\nconsole.log(result);`,
    fixedCode: `const nums = [1,2,3,4,5];\nconst result = nums.filter(n => n > 3);\nconsole.log(result);`,
    timeLimit: 40,
  },
  {
    id: 4,
    title: 'String Reverse',
    hint: 'Function should reverse a string',
    expectedOutput: 'olleh',
    brokenCode: `function reverse(str) {\n  return str.split('').join('');\n}\nconsole.log(reverse('hello'));`,
    fixedCode: `function reverse(str) {\n  return str.split('').reverse().join('');\n}\nconsole.log(reverse('hello'));`,
    timeLimit: 50,
  },
  {
    id: 5,
    title: 'Missing Return',
    hint: 'Function should return true if number is even',
    expectedOutput: 'true',
    brokenCode: `function isEven(n) {\n  n % 2 === 0;\n}\nconsole.log(isEven(4));`,
    fixedCode: `function isEven(n) {\n  return n % 2 === 0;\n}\nconsole.log(isEven(4));`,
    timeLimit: 35,
  },
];

export default function CodePuzzlePage() {
  const [idx, setIdx] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | 'timeout'
  const [gameOver, setGameOver] = useState(false);
  const [solved, setSolved] = useState(0);
  const timerRef = useRef(null);

  const challenge = challenges[idx];

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(p => p - 1), 1000);
      return () => clearInterval(timerRef.current);
    } else if (isPlaying && timeLeft === 0) {
      clearInterval(timerRef.current);
      setFeedback('timeout');
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const start = () => {
    setUserCode(challenge.brokenCode);
    setTimeLeft(challenge.timeLimit);
    setIsPlaying(true);
    setFeedback(null);
    setGameOver(false);
  };

  const submit = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    const clean = (s) => s.replace(/\s+/g, ' ').trim();
    if (clean(userCode) === clean(challenge.fixedCode)) {
      const pts = Math.max(10, timeLeft * 2);
      setScore(p => p + pts);
      setSolved(p => p + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const next = () => {
    if (idx + 1 >= challenges.length) {
      setGameOver(true);
    } else {
      setIdx(p => p + 1);
      setFeedback(null);
      setIsPlaying(false);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setSolved(0);
    setFeedback(null);
    setGameOver(false);
    setIsPlaying(false);
  };

  const timerColor = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-yellow-400' : 'gradient-text';

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-dark-950" />

      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Code Cleanup</span>
            </h1>
            <p className="text-dark-400">Fix the broken code before time runs out</p>
          </motion.div>

          {gameOver ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-12 text-center max-w-lg mx-auto">
              <Trophy className="w-16 h-16 text-accent-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-dark-100 mb-2">Game Over!</h2>
              <p className="text-dark-400 mb-6">You solved {solved}/{challenges.length} puzzles</p>
              <div className="text-5xl font-bold gradient-text-accent mb-8">{score} pts</div>
              <Button onClick={reset} size="xl">
                <RefreshCw className="w-5 h-5" /> Play Again
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-6">
                  {!isPlaying && !feedback ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🔧</div>
                      <h3 className="text-2xl font-bold text-dark-100 mb-2">{challenge.title}</h3>
                      <p className="text-dark-400 mb-2">Hint: <span className="text-brand-400">{challenge.hint}</span></p>
                      <p className="text-sm text-dark-500 mb-8">Expected output: <code className="text-accent-400">{challenge.expectedOutput}</code></p>
                      <Button onClick={start} size="xl">
                        Start Puzzle <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-dark-100">{challenge.title}</h3>
                          <p className="text-sm text-dark-400">Hint: <span className="text-brand-400">{challenge.hint}</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-dark-500">Expected output</p>
                          <code className="text-accent-400 text-sm">{challenge.expectedOutput}</code>
                        </div>
                      </div>

                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        disabled={!isPlaying}
                        rows={8}
                        className="w-full px-4 py-3 bg-dark-900 rounded-lg font-mono text-sm text-dark-200 border border-dark-700 focus:border-brand-500 focus:outline-none resize-none"
                        spellCheck={false}
                      />

                      {isPlaying && (
                        <Button onClick={submit} className="w-full" size="lg">
                          Submit Fix
                        </Button>
                      )}

                      {feedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg flex items-center justify-between ${
                            feedback === 'correct'
                              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                              : 'bg-red-500/10 border border-red-500/30 text-red-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {feedback === 'correct' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                            <span className="font-semibold">
                              {feedback === 'correct' && `Correct! +${Math.max(10, timeLeft * 2)} pts`}
                              {feedback === 'wrong' && 'Not quite right. Try the next one!'}
                              {feedback === 'timeout' && "Time's up!"}
                            </span>
                          </div>
                          <Button onClick={next} size="sm">
                            {idx + 1 >= challenges.length ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}

                      {feedback && feedback !== 'correct' && (
                        <div className="p-3 rounded-lg bg-dark-900 border border-dark-700">
                          <p className="text-xs text-dark-500 mb-1">Correct solution:</p>
                          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">{challenge.fixedCode}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-dark-300">Time Left</h3>
                    <Timer className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className={`text-4xl font-bold ${timerColor}`}>{timeLeft}s</div>
                  {isPlaying && (
                    <div className="mt-2 h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 transition-all duration-1000"
                        style={{ width: `${(timeLeft / challenge.timeLimit) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-dark-300">Score</h3>
                    <Trophy className="w-4 h-4 text-accent-400" />
                  </div>
                  <div className="text-4xl font-bold gradient-text-accent">{score}</div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-bold text-dark-300 mb-3">Progress</h3>
                  <div className="flex gap-2">
                    {challenges.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-full ${
                          i < idx ? 'bg-green-500' : i === idx ? 'bg-brand-500' : 'bg-dark-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-dark-500 mt-2">{idx + 1} / {challenges.length}</p>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-dark-300 mb-3">How it works</h3>
                  <ul className="space-y-1.5 text-xs text-dark-400">
                    <li>• Read the hint & expected output</li>
                    <li>• Fix the broken code in the editor</li>
                    <li>• Faster = more points</li>
                    <li>• Wrong answer shows the solution</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
