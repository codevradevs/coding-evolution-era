import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const challenges = [
  {
    id: 1,
    title: 'SQL Injection Vulnerability',
    type: 'code',
    code: `app.post('/login', (req, res) => {
  const query = "SELECT * FROM users WHERE 
    username='" + req.body.username + "' AND 
    password='" + req.body.password + "'";
  db.query(query);
});`,
    vulnerabilities: [
      { line: 2, issue: 'SQL Injection', severity: 'critical' },
      { line: 3, issue: 'Plain text password', severity: 'high' }
    ],
    explanation: 'User input is directly concatenated into SQL query. Use parameterized queries and hash passwords.',
    fix: `app.post('/login', async (req, res) => {
  const query = "SELECT * FROM users WHERE username=? AND password=?";
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  db.query(query, [req.body.username, hashedPassword]);
});`
  },
  {
    id: 2,
    title: 'XSS Vulnerability',
    type: 'code',
    code: `app.get('/profile', (req, res) => {
  const name = req.query.name;
  res.send('<h1>Welcome ' + name + '</h1>');
});`,
    vulnerabilities: [
      { line: 2, issue: 'XSS Attack', severity: 'high' }
    ],
    explanation: 'User input rendered without sanitization. Attacker can inject malicious scripts.',
    fix: `app.get('/profile', (req, res) => {
  const name = escapeHtml(req.query.name);
  res.send('<h1>Welcome ' + name + '</h1>');
});`
  },
  {
    id: 3,
    title: 'Weak Authentication',
    type: 'code',
    code: `const token = jwt.sign(
  { userId: user.id },
  'secret123',
  { expiresIn: '30d' }
);`,
    vulnerabilities: [
      { line: 2, issue: 'Hardcoded secret', severity: 'critical' },
      { line: 3, issue: 'Long expiration', severity: 'medium' }
    ],
    explanation: 'Hardcoded JWT secret and excessive token lifetime create security risks.',
    fix: `const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);`
  }
];

export default function CyberSimulatorPage() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedLines, setSelectedLines] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const challenge = challenges[currentChallenge];

  const toggleLine = (lineNum) => {
    if (showResult) return;
    setSelectedLines(prev =>
      prev.includes(lineNum)
        ? prev.filter(l => l !== lineNum)
        : [...prev, lineNum]
    );
  };

  const checkAnswer = () => {
    const correctLines = challenge.vulnerabilities.map(v => v.line);
    const correct = selectedLines.length === correctLines.length &&
      selectedLines.every(l => correctLines.includes(l));
    
    if (correct) {
      setScore(prev => prev + 100);
    }
    setShowResult(true);
  };

  const nextChallenge = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
    setSelectedLines([]);
    setShowResult(false);
  };

  const reset = () => {
    setSelectedLines([]);
    setShowResult(false);
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
              <span className="gradient-text">Cyber Simulator</span>
            </h1>
            <p className="text-dark-400">Spot vulnerabilities. Learn security.</p>
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
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span className="text-sm text-dark-400">Find vulnerabilities</span>
                  </div>
                </div>

                <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm mb-4">
                  {challenge.code.split('\n').map((line, i) => {
                    const lineNum = i + 1;
                    const isSelected = selectedLines.includes(lineNum);
                    const vulnerability = challenge.vulnerabilities.find(v => v.line === lineNum);
                    const isCorrect = showResult && vulnerability;
                    const isWrong = showResult && isSelected && !vulnerability;

                    return (
                      <div
                        key={i}
                        onClick={() => toggleLine(lineNum)}
                        className={`flex items-start gap-3 px-2 py-1 rounded cursor-pointer transition-all ${
                          isCorrect ? 'bg-green-500/10 border-l-2 border-green-500' :
                          isWrong ? 'bg-red-500/10 border-l-2 border-red-500' :
                          isSelected ? 'bg-yellow-500/10 border-l-2 border-yellow-500' :
                          'hover:bg-dark-800/50'
                        }`}
                      >
                        <span className="text-dark-500 select-none w-6">{lineNum}</span>
                        <span className="text-dark-200 flex-1">{line}</span>
                        {showResult && vulnerability && (
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
                      <h4 className="text-sm font-semibold text-dark-200 mb-2">Vulnerabilities Found:</h4>
                      <div className="space-y-2">
                        {challenge.vulnerabilities.map((vuln, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              vuln.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                              vuln.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {vuln.severity}
                            </span>
                            <span className="text-dark-400">Line {vuln.line}: {vuln.issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
                      <h4 className="text-sm font-semibold text-dark-200 mb-2">Explanation:</h4>
                      <p className="text-sm text-dark-400">{challenge.explanation}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Secure Code:</h4>
                      <pre className="text-xs text-dark-300 overflow-x-auto">{challenge.fix}</pre>
                    </div>
                  </motion.div>
                )}

                <div className="mt-4 flex gap-3">
                  {!showResult ? (
                    <>
                      <Button onClick={checkAnswer} disabled={selectedLines.length === 0}>
                        <Shield className="w-4 h-4" />
                        Check Answer
                      </Button>
                      <Button onClick={reset} variant="secondary">
                        Reset
                      </Button>
                    </>
                  ) : (
                    <Button onClick={nextChallenge}>
                      Next Challenge
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
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
                  <Shield className="w-5 h-5 text-accent-400" />
                  Security Score
                </h3>
                <div className="text-4xl font-bold gradient-text">{score}</div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-dark-300 mb-3">How to Play</h3>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    Click lines with vulnerabilities
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    Find all security issues
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    Learn secure coding
                  </li>
                </ul>
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
