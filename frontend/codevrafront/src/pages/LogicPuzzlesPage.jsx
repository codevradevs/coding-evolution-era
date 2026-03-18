import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Binary, Code2, Trophy, Timer, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const gameTypes = [
  { id: 'binary', name: 'Binary Converter', icon: Binary },
  { id: 'regex', name: 'Regex Master', icon: Code2 }
];

export default function LogicPuzzlesPage() {
  const [gameMode, setGameMode] = useState('binary');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Regex game state
  const [regexPattern, setRegexPattern] = useState('');
  const [testStrings, setTestStrings] = useState([]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(30);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    if (gameMode === 'binary') {
      generateBinaryChallenge();
    } else {
      generateRegexChallenge();
    }
  };

  const generateBinaryChallenge = () => {
    setCurrentNumber(Math.floor(Math.random() * 256));
    setUserAnswer('');
  };

  const generateRegexChallenge = () => {
    const patterns = [
      { pattern: '^[a-z]+$', desc: 'Match lowercase letters only' },
      { pattern: '\\d{3}-\\d{4}', desc: 'Match phone format XXX-XXXX' },
      { pattern: '^[A-Z]', desc: 'Start with uppercase letter' },
      { pattern: '@gmail\\.com$', desc: 'End with @gmail.com' }
    ];
    const challenge = patterns[Math.floor(Math.random() * patterns.length)];
    setRegexPattern(challenge.pattern);
    setTestStrings([
      'hello',
      'Hello123',
      'test@gmail.com',
      '123-4567',
      'WORLD'
    ]);
  };

  const checkBinaryAnswer = () => {
    const correct = parseInt(userAnswer, 2) === currentNumber;
    if (correct) {
      const points = 10 + streak * 5;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setFeedback({ type: 'success', message: `+${points} points!` });
      setTimeout(() => {
        generateBinaryChallenge();
        setFeedback(null);
      }, 500);
    } else {
      setStreak(0);
      setFeedback({ type: 'error', message: `Wrong! Answer: ${currentNumber.toString(2)}` });
      setTimeout(() => {
        generateBinaryChallenge();
        setFeedback(null);
      }, 1500);
    }
  };

  const checkRegexMatch = (str) => {
    try {
      const regex = new RegExp(regexPattern);
      return regex.test(str);
    } catch {
      return false;
    }
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
              <span className="gradient-text-accent">Logic Puzzles</span>
            </h1>
            <p className="text-dark-400">Speed challenges for sharp minds</p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-8">
            {gameTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setGameMode(type.id);
                    setIsPlaying(false);
                    setFeedback(null);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    gameMode === type.id
                      ? 'bg-brand-500 text-white shadow-lg'
                      : 'glass text-dark-400 hover:text-dark-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {type.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl p-8"
              >
                {!isPlaying ? (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-dark-100 mb-4">
                      {gameMode === 'binary' ? 'Binary Speed Test' : 'Regex Pattern Matching'}
                    </h3>
                    <p className="text-dark-400 mb-8">
                      {gameMode === 'binary' 
                        ? 'Convert decimal to binary as fast as you can!'
                        : 'Match strings using regex patterns!'}
                    </p>
                    <Button onClick={startGame} size="xl">
                      Start Challenge
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <>
                    {gameMode === 'binary' ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-6xl font-bold gradient-text mb-4">
                            {currentNumber}
                          </div>
                          <p className="text-dark-400">Convert to binary</p>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value.replace(/[^01]/g, ''))}
                            onKeyPress={(e) => e.key === 'Enter' && checkBinaryAnswer()}
                            placeholder="Enter binary (e.g., 10101010)"
                            className="w-full px-6 py-4 bg-dark-900 rounded-lg text-center text-2xl font-mono text-dark-200 border border-dark-700 focus:border-brand-500 focus:outline-none"
                            autoFocus
                          />
                        </div>

                        <Button onClick={checkBinaryAnswer} className="w-full" size="lg">
                          Submit Answer
                        </Button>

                        {feedback && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg text-center font-semibold ${
                              feedback.type === 'success'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {feedback.message}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-4 rounded-lg bg-dark-900 border border-dark-700">
                          <p className="text-sm text-dark-400 mb-2">Pattern:</p>
                          <code className="text-brand-400 font-mono text-lg">{regexPattern}</code>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-dark-400 mb-3">Which strings match?</p>
                          {testStrings.map((str, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg font-mono ${
                                checkRegexMatch(str)
                                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                  : 'bg-dark-800/50 border border-dark-700 text-dark-400'
                              }`}
                            >
                              {str}
                            </div>
                          ))}
                        </div>

                        <Button onClick={generateRegexChallenge} className="w-full">
                          Next Pattern
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-dark-100">Time Left</h3>
                  <Timer className="w-5 h-5 text-brand-400" />
                </div>
                <div className="text-4xl font-bold gradient-text">{timeLeft}s</div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-dark-100">Score</h3>
                  <Trophy className="w-5 h-5 text-accent-400" />
                </div>
                <div className="text-4xl font-bold gradient-text-accent">{score}</div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-dark-300 mb-3">Streak</h3>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-brand-400">{streak}</div>
                  <span className="text-sm text-dark-400">in a row</span>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-dark-300 mb-3">Tips</h3>
                <ul className="space-y-2 text-xs text-dark-400">
                  <li>• Streak bonus: +5 points per streak</li>
                  <li>• Press Enter to submit</li>
                  <li>• Speed matters!</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
