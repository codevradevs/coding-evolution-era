import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, CheckCircle, Trophy, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Each puzzle is a "code image" — lines of code that form a visual output when assembled correctly
const puzzles = [
  {
    id: 1,
    title: 'Build the Pyramid',
    description: 'Arrange the code lines to print a pyramid',
    hint: 'The loop variable controls how many stars print per row',
    preview: '  *\n ***\n*****',
    pieces: [
      { id: 'a', code: `for i in range(1, 4):`, order: 0 },
      { id: 'b', code: `    stars = 2 * i - 1`, order: 1 },
      { id: 'c', code: `    spaces = 3 - i`, order: 2 },
      { id: 'd', code: `    print(' ' * spaces + '*' * stars)`, order: 3 },
    ],
  },
  {
    id: 2,
    title: 'FizzBuzz Classic',
    description: 'Arrange the FizzBuzz logic in the right order',
    hint: 'Check divisibility by 15 first, then 3, then 5',
    preview: 'FizzBuzz\nFizz\nBuzz\n1',
    pieces: [
      { id: 'a', code: `for n in range(1, 16):`, order: 0 },
      { id: 'b', code: `    if n % 15 == 0: print("FizzBuzz")`, order: 1 },
      { id: 'c', code: `    elif n % 3 == 0: print("Fizz")`, order: 2 },
      { id: 'd', code: `    elif n % 5 == 0: print("Buzz")`, order: 3 },
      { id: 'e', code: `    else: print(n)`, order: 4 },
    ],
  },
  {
    id: 3,
    title: 'Reverse a String',
    description: 'Put the function together correctly',
    hint: 'Define the function, then reverse, then call it',
    preview: 'olleh',
    pieces: [
      { id: 'a', code: `def reverse(s):`, order: 0 },
      { id: 'b', code: `    return s[::-1]`, order: 1 },
      { id: 'c', code: `result = reverse("hello")`, order: 2 },
      { id: 'd', code: `print(result)`, order: 3 },
    ],
  },
  {
    id: 4,
    title: 'Count Vowels',
    description: 'Arrange the vowel counter correctly',
    hint: 'Initialize count, loop through chars, check membership, then print',
    preview: '3',
    pieces: [
      { id: 'a', code: `count = 0`, order: 0 },
      { id: 'b', code: `for ch in "hello":`, order: 1 },
      { id: 'c', code: `    if ch in "aeiou":`, order: 2 },
      { id: 'd', code: `        count += 1`, order: 3 },
      { id: 'e', code: `print(count)`, order: 4 },
    ],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ImagePuzzlePage() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [tiles, setTiles] = useState(() => shuffle(puzzles[0].pieces));
  const [dragIdx, setDragIdx] = useState(null);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const puzzle = puzzles[puzzleIdx];

  const resetPuzzle = useCallback((idx) => {
    setPuzzleIdx(idx);
    setTiles(shuffle(puzzles[idx].pieces));
    setSolved(false);
    setShowHint(false);
    setAttempts(0);
  }, []);

  const checkSolution = (currentTiles) => {
    const correct = currentTiles.every((t, i) => t.order === i);
    if (correct) {
      const pts = Math.max(10, 50 - attempts * 5);
      setScore(p => p + pts);
      setSolved(true);
    }
  };

  const onDragStart = (i) => setDragIdx(i);

  const onDrop = (targetIdx) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const next = [...tiles];
    [next[dragIdx], next[targetIdx]] = [next[targetIdx], next[dragIdx]];
    setTiles(next);
    setDragIdx(null);
    setAttempts(p => p + 1);
    checkSolution(next);
  };

  const moveUp = (i) => {
    if (i === 0) return;
    const next = [...tiles];
    [next[i], next[i - 1]] = [next[i - 1], next[i]];
    setTiles(next);
    setAttempts(p => p + 1);
    checkSolution(next);
  };

  const moveDown = (i) => {
    if (i === tiles.length - 1) return;
    const next = [...tiles];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setTiles(next);
    setAttempts(p => p + 1);
    checkSolution(next);
  };

  const isCorrectPosition = (tile, i) => tile.order === i;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-dark-950" />

      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Code Puzzle</span>
            </h1>
            <p className="text-dark-400">Drag the code pieces into the right order to build the program</p>
          </motion.div>

          {/* Puzzle selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {puzzles.map((p, i) => (
              <button
                key={p.id}
                onClick={() => resetPuzzle(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  puzzleIdx === i ? 'bg-brand-500 text-white' : 'glass text-dark-400 hover:text-dark-200'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main puzzle area */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark-100">{puzzle.title}</h3>
                    <p className="text-sm text-dark-400">{puzzle.description}</p>
                  </div>
                  <button
                    onClick={() => resetPuzzle(puzzleIdx)}
                    className="p-2 rounded-lg glass text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>

                {solved ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Puzzle Solved! 🎉</h3>
                    <p className="text-dark-400 mb-2">Solved in {attempts} moves</p>
                    <div className="font-mono text-sm bg-dark-900 rounded-lg p-4 text-left mb-6 border border-green-500/20">
                      {tiles.map((t, i) => (
                        <div key={t.id} className="text-green-400">{t.code}</div>
                      ))}
                    </div>
                    {puzzleIdx + 1 < puzzles.length ? (
                      <Button onClick={() => resetPuzzle(puzzleIdx + 1)} size="lg">
                        Next Puzzle <CheckCircle className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => resetPuzzle(0)} size="lg">
                        <RefreshCw className="w-4 h-4" /> Play Again
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-dark-500 mb-3">Drag tiles or use ↑↓ arrows to reorder:</p>
                    {tiles.map((tile, i) => (
                      <motion.div
                        key={tile.id}
                        layout
                        draggable
                        onDragStart={() => onDragStart(i)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDrop(i)}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all select-none ${
                          isCorrectPosition(tile, i)
                            ? 'border-green-500/40 bg-green-500/5'
                            : 'border-dark-700 bg-dark-900/50 hover:border-brand-500/40'
                        }`}
                      >
                        <span className="text-xs text-dark-600 w-4 text-center font-mono">{i + 1}</span>
                        <code className="flex-1 text-sm font-mono text-dark-200 whitespace-pre">{tile.code}</code>
                        {isCorrectPosition(tile, i) && (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        )}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => moveUp(i)}
                            disabled={i === 0}
                            className="text-dark-500 hover:text-dark-200 disabled:opacity-20 text-xs leading-none px-1"
                          >▲</button>
                          <button
                            onClick={() => moveDown(i)}
                            disabled={i === tiles.length - 1}
                            className="text-dark-500 hover:text-dark-200 disabled:opacity-20 text-xs leading-none px-1"
                          >▼</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-dark-300">Score</h3>
                  <Trophy className="w-4 h-4 text-accent-400" />
                </div>
                <div className="text-4xl font-bold gradient-text-accent">{score}</div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-bold text-dark-300 mb-3">Expected Output</h3>
                <pre className="text-xs font-mono text-accent-400 bg-dark-900 rounded p-3 border border-dark-700">
                  {puzzle.preview}
                </pre>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-dark-300">Hint</h3>
                  <button
                    onClick={() => setShowHint(p => !p)}
                    className="p-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                  </button>
                </div>
                {showHint ? (
                  <p className="text-sm text-brand-300">{puzzle.hint}</p>
                ) : (
                  <p className="text-xs text-dark-500">Click the bulb to reveal hint</p>
                )}
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-bold text-dark-300 mb-3">Moves</h3>
                <div className="text-3xl font-bold text-dark-200">{attempts}</div>
                <p className="text-xs text-dark-500 mt-1">Fewer moves = more points</p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-dark-300 mb-3">How to play</h3>
                <ul className="space-y-1.5 text-xs text-dark-400">
                  <li>• Drag tiles to reorder them</li>
                  <li>• Use ▲▼ buttons on mobile</li>
                  <li>• Green = correct position</li>
                  <li>• Match the expected output</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
