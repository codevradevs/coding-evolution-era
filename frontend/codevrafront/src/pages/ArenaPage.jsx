import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Star, Play, CheckCircle, XCircle, Flame, Zap, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

const generateChallenges = () => {
  const categories = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Hash Tables', 'Stacks', 'Queues', 'Recursion', 'Greedy', 'Backtracking', 'Math', 'Bit Manipulation'];
  
  const easyTasks = ['Find Maximum', 'Find Minimum', 'Sum Array', 'Count Elements', 'Reverse Array', 'Check Palindrome', 'Find Duplicate', 'Remove Duplicates', 'Merge Arrays', 'Find Index', 'Check Sorted', 'First Element', 'Last Element', 'Middle Element', 'Swap Elements', 'Rotate Array', 'Filter Even', 'Filter Odd', 'Count Vowels', 'Count Consonants', 'Uppercase String', 'Lowercase String', 'Trim Spaces', 'Split String', 'Join Array', 'Check Empty', 'Array Length', 'String Length', 'Compare Strings', 'Concat Arrays', 'Slice Array', 'Splice Array', 'Push Element', 'Pop Element', 'Shift Element', 'Unshift Element', 'Find Character', 'Replace Character', 'Repeat String', 'Pad String', 'Check Substring', 'Index Of', 'Last Index Of', 'Includes Element', 'Starts With', 'Ends With', 'Match Pattern', 'Search String', 'Convert Case', 'Parse Integer'];
  
  const mediumTasks = ['Two Sum', 'Three Sum', 'Valid Parentheses', 'Longest Substring', 'Container With Water', 'Rotate Image', 'Group Anagrams', 'Permutations', 'Combinations', 'Subsets', 'Word Search', 'Letter Combinations', 'Generate Parentheses', 'Decode Ways', 'Unique Paths', 'Jump Game', 'Coin Change', 'Longest Palindrome', 'Product Array', 'Spiral Matrix', 'Set Matrix Zeroes', 'Search 2D Matrix', 'Sort Colors', 'Merge Intervals', 'Insert Interval', 'Meeting Rooms', 'Valid Sudoku', 'Rotate List', 'Remove Nth Node', 'Swap Nodes', 'Reverse Linked List', 'Palindrome List', 'Cycle Detection', 'Intersection Node', 'Add Two Numbers', 'Flatten List', 'Copy Random List', 'LRU Cache', 'Min Stack', 'Valid BST', 'Symmetric Tree', 'Level Order', 'Zigzag Level', 'Max Depth', 'Min Depth', 'Path Sum', 'Binary Tree Paths', 'Lowest Ancestor', 'Serialize Tree'];
  
  const hardTasks = ['Median Two Arrays', 'Trapping Rain Water', 'Longest Valid Parens', 'Wildcard Matching', 'Regular Expression', 'Edit Distance', 'Distinct Subsequences', 'Interleaving String', 'Scramble String', 'Word Break II', 'Palindrome Partition', 'Word Ladder', 'Word Ladder II', 'Surrounded Regions', 'Clone Graph', 'Course Schedule', 'Alien Dictionary', 'Graph Valid Tree', 'Number of Islands', 'Max Rectangle', 'Largest Rectangle', 'Maximal Square', 'Dungeon Game', 'Cherry Pickup', 'Burst Balloons', 'Remove Boxes', 'Strange Printer', 'Minimum Window', 'Sliding Window Max', 'Max Sliding Window', 'Shortest Palindrome', 'Count Palindromes', 'Palindrome Pairs', 'Concatenated Words', 'Word Squares', 'N-Queens', 'N-Queens II', 'Sudoku Solver', 'Valid Number', 'Integer to English', 'Fraction to Decimal', 'Basic Calculator', 'Expression Add Ops', 'Different Ways', 'Unique BSTs', 'Recover BST', 'Max Path Sum', 'Binary Tree Cameras', 'Distribute Coins'];
  
  const testCases = {
    'Find Maximum': { input: '[3, 7, 2, 9, 1]', expected: '9', starter: 'function findMax(arr) {\n  // Your code here\n}' },
    'Reverse Array': { input: '[1, 2, 3, 4, 5]', expected: '[5,4,3,2,1]', starter: 'function reverseArray(arr) {\n  // Your code here\n}' },
    'Check Palindrome': { input: '"racecar"', expected: 'true', starter: 'function isPalindrome(str) {\n  // Your code here\n}' },
    'Sum Array': { input: '[1, 2, 3, 4, 5]', expected: '15', starter: 'function sumArray(arr) {\n  // Your code here\n}' },
    'Two Sum': { input: '[2, 7, 11, 15], target: 9', expected: '[0,1]', starter: 'function twoSum(nums, target) {\n  // Your code here\n}' },
    'Valid Parentheses': { input: '"()[]{}"', expected: 'true', starter: 'function isValid(s) {\n  // Your code here\n}' },
  };
  
  const challenges = [];
  let id = 1;
  
  for (let i = 0; i < 400; i++) {
    const task = easyTasks[i % easyTasks.length];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const test = testCases[task] || { input: 'arr', expected: 'result', starter: 'function solution() {\n  // Your code here\n}' };
    challenges.push({
      id: String(id++),
      title: `${task} ${Math.floor(i / easyTasks.length) > 0 ? 'V' + (Math.floor(i / easyTasks.length) + 1) : ''}`.trim(),
      difficulty: 'Easy',
      category,
      xp: 10,
      description: `Implement a function to ${task.toLowerCase()} in the given ${category.toLowerCase()} data structure.`,
      testInput: test.input,
      expectedOutput: test.expected,
      starterCode: test.starter,
      solved: false
    });
  }
  
  for (let i = 0; i < 400; i++) {
    const task = mediumTasks[i % mediumTasks.length];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const test = testCases[task] || { input: 'arr', expected: 'result', starter: 'function solution() {\n  // Your code here\n}' };
    challenges.push({
      id: String(id++),
      title: `${task} ${Math.floor(i / mediumTasks.length) > 0 ? 'V' + (Math.floor(i / mediumTasks.length) + 1) : ''}`.trim(),
      difficulty: 'Medium',
      category,
      xp: 25,
      description: `Solve the ${task.toLowerCase()} problem using efficient ${category.toLowerCase()} techniques.`,
      testInput: test.input,
      expectedOutput: test.expected,
      starterCode: test.starter,
      solved: false
    });
  }
  
  for (let i = 0; i < 200; i++) {
    const task = hardTasks[i % hardTasks.length];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const test = testCases[task] || { input: 'arr', expected: 'result', starter: 'function solution() {\n  // Your code here\n}' };
    challenges.push({
      id: String(id++),
      title: `${task} ${Math.floor(i / hardTasks.length) > 0 ? 'V' + (Math.floor(i / hardTasks.length) + 1) : ''}`.trim(),
      difficulty: 'Hard',
      category,
      xp: 50,
      description: `Master the ${task.toLowerCase()} challenge with advanced ${category.toLowerCase()} algorithms.`,
      testInput: test.input,
      expectedOutput: test.expected,
      starterCode: test.starter,
      solved: false
    });
  }
  
  return challenges;
};

const initialChallenges = generateChallenges();

const leaderboard = [
  { rank: 1, name: 'KenyanCoder', xp: 2450, streak: 15, badge: '🏆' },
  { rank: 2, name: 'NairobiDev', xp: 2100, streak: 12, badge: '🥈' },
  { rank: 3, name: 'AfriHacker', xp: 1850, streak: 10, badge: '🥉' },
];

const difficultyColors = {
  Easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const ITEMS_PER_PAGE = 12;

export default function ArenaPage() {
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('arena_challenges');
    return saved ? JSON.parse(saved) : initialChallenges;
  });
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeTab, setActiveTab] = useState('challenges');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [userXP, setUserXP] = useState(() => {
    const saved = localStorage.getItem('arena_xp');
    return saved ? parseInt(saved) : 0;
  });
  
  useEffect(() => {
    localStorage.setItem('arena_challenges', JSON.stringify(challenges));
  }, [challenges]);
  
  useEffect(() => {
    localStorage.setItem('arena_xp', userXP.toString());
  }, [userXP]);
  
  useEffect(() => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode || '');
    }
  }, [selectedChallenge]);
  
  const filteredChallenges = useMemo(() => {
    if (difficultyFilter === 'All') return challenges;
    return challenges.filter(c => c.difficulty === difficultyFilter);
  }, [difficultyFilter, challenges]);
  
  const totalPages = Math.ceil(filteredChallenges.length / ITEMS_PER_PAGE);
  const paginatedChallenges = filteredChallenges.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
  const solvedCount = challenges.filter(c => c.solved).length;

  const runCode = () => {
    try {
      const userFunc = eval(`(${code})`);
      const testInput = selectedChallenge.testInput;
      let result;
      
      if (testInput.includes('target:')) {
        const [arr, target] = testInput.split(', target: ');
        result = JSON.stringify(userFunc(JSON.parse(arr), parseInt(target)));
      } else if (testInput.startsWith('[')) {
        result = JSON.stringify(userFunc(JSON.parse(testInput)));
      } else {
        result = String(userFunc(testInput.replace(/"/g, '')));
      }
      
      if (result === selectedChallenge.expectedOutput) {
        setOutput({ success: true, message: `✅ All test cases passed! +${selectedChallenge.xp} XP earned!` });
        setChallenges(prev => prev.map(c => c.id === selectedChallenge.id ? { ...c, solved: true } : c));
        setUserXP(prev => prev + selectedChallenge.xp);
      } else {
        setOutput({ success: false, message: `❌ Test failed. Expected ${selectedChallenge.expectedOutput} but got ${result}. Try again!` });
      }
    } catch (error) {
      setOutput({ success: false, message: `❌ Error: ${error.message}. Check your code and try again!` });
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-4">
              <Gamepad2 className="w-3 h-3" />CODING ARENA
            </span>
            <h1 className="text-3xl font-bold mb-2">Challenge Your <span className="gradient-text">Skills</span></h1>
            <p className="text-dark-400 text-sm">1000 challenges • XP system • Leaderboard • Badges</p>
          </motion.div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-brand-400" /><span className="text-dark-300">{userXP} XP</span></div>
            <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-400" /><span className="text-dark-300">{solvedCount}/{challenges.length} Solved</span></div>
            <div className="flex items-center gap-2 text-sm"><Flame className="w-4 h-4 text-orange-400" /><span className="text-dark-300">3 Day Streak</span></div>
          </div>
        </div>
      </section>
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {selectedChallenge ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => { setSelectedChallenge(null); setOutput(null); setCode(''); }} className="text-sm text-dark-500 hover:text-dark-300 flex items-center gap-1">← Back to challenges</button>
                {selectedChallenge.solved && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle className="w-4 h-4" />Completed</span>}
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/2 glass rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${difficultyColors[selectedChallenge.difficulty]}`}>{selectedChallenge.difficulty}</span>
                    <span className="text-xs text-dark-500">{selectedChallenge.category}</span>
                    <span className="ml-auto flex items-center gap-1 text-xs text-brand-400"><Star className="w-3 h-3" />{selectedChallenge.xp} XP</span>
                  </div>
                  <h2 className="text-xl font-bold text-dark-100 mb-3">{selectedChallenge.title}</h2>
                  <p className="text-sm text-dark-400 leading-relaxed">{selectedChallenge.description}</p>
                </div>
                <div className="lg:w-1/2 flex flex-col gap-4">
                  <div className="glass rounded-xl overflow-hidden flex-1">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700/50">
                      <span className="text-xs text-dark-500 font-mono">JavaScript</span>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                    </div>
                    <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="function solution() {\n  // Your code here\n}" className="w-full h-64 p-4 bg-transparent text-dark-200 text-sm font-mono focus:outline-none resize-none" spellCheck={false} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={runCode} className="flex-1" disabled={selectedChallenge.solved}><Play className="w-4 h-4" />{selectedChallenge.solved ? 'Completed' : 'Run Tests'}</Button>
                  </div>
                  {output && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${output.success ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                      <div className="flex items-center gap-2">
                        {output.success ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                        <span className={`text-sm font-medium ${output.success ? 'text-green-400' : 'text-red-400'}`}>{output.message}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ) : (
          <div>
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setActiveTab('challenges')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'challenges' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Gamepad2 className="w-4 h-4" />Challenges
            </button>
            <button onClick={() => setActiveTab('leaderboard')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'leaderboard' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Trophy className="w-4 h-4" />Leaderboard
            </button>
          </div>
          {activeTab === 'challenges' ? (
            <div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-4">
                <Filter className="w-4 h-4 text-dark-500 shrink-0" />
                {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                  <button key={diff} onClick={() => { setDifficultyFilter(diff); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${difficultyFilter === diff ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-500 hover:text-dark-300'}`}>
                    {diff} {diff !== 'All' && `(${challenges.filter(c => c.difficulty === diff).length})`}
                  </button>
                ))}
                <span className="ml-auto text-xs text-dark-500 shrink-0">{filteredChallenges.length} challenges</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {paginatedChallenges.map((challenge, i) => (
                  <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                    <button onClick={() => setSelectedChallenge(challenge)} className="w-full text-left glass rounded-xl p-4 group hover:border-brand-500/20 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${difficultyColors[challenge.difficulty]}`}>{challenge.difficulty}</span>
                        {challenge.solved && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                      <h3 className="text-sm font-semibold text-dark-100 mb-1 group-hover:text-brand-400 transition-colors line-clamp-1">{challenge.title}</h3>
                      <p className="text-xs text-dark-500 mb-2">{challenge.category}</p>
                      <span className="flex items-center gap-1 text-xs text-brand-400"><Star className="w-3 h-3" />{challenge.xp} XP</span>
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg glass text-dark-400 hover:text-dark-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    return (
                      <button key={i} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${currentPage === pageNum ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'glass text-dark-400 hover:text-dark-200'}`}>
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg glass text-dark-400 hover:text-dark-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-4 border-b border-dark-700/50 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h2 className="font-semibold text-dark-100">Top Developers</h2>
                <span className="ml-auto text-xs text-dark-500">This Month</span>
              </div>
              <div className="divide-y divide-dark-700/30">
                {leaderboard.map(entry => (
                  <div key={entry.rank} className="flex items-center gap-4 px-4 py-3 hover:bg-dark-800/30 transition-colors">
                    <span className="text-lg w-8 text-center">{entry.badge}</span>
                    <div className="flex-1">
                      <div className="font-medium text-dark-200">{entry.name}</div>
                      <div className="flex items-center gap-3 text-xs text-dark-500">
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-brand-400" />{entry.xp} XP</span>
                        <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" />{entry.streak} day streak</span>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-dark-500">#{entry.rank}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
