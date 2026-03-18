import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Star, Bookmark, CheckCircle, Filter, ChevronLeft, ChevronRight, Code, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import api from '../lib/api';

const categories = ['All', 'Git', 'Deployment', 'VS Code', 'JavaScript', 'Security', 'AI', 'DevOps'];

const difficultyColors = {
  Beginner: 'text-green-400 bg-green-500/10 border-green-500/20',
  Intermediate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Advanced: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function DevIntelPage() {
  const [allTips, setAllTips] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedTips, setSavedTips] = useState(new Set());
  const [viewedTips, setViewedTips] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);

  useEffect(() => {
    fetchAllTips();
  }, []);

  useEffect(() => {
    if (selectedTip) {
      setCode(selectedTip.codeSnippet || '');
      setOutput(null);
    }
  }, [selectedTip]);

  const fetchAllTips = async () => {
    try {
      const { data } = await api.get('/tips');
      setAllTips(data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTip = async (tipId) => {
    if (viewedTips.has(tipId)) return;
    
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    
    try {
      await api.post(`/tips/${tipId}/view`);
      setViewedTips(prev => new Set(prev).add(tipId));
    } catch (error) {
      console.error('Error marking tip as viewed:', error);
    }
  };

  const handleSaveTip = async (tipId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login to save tips and earn XP!');
      return;
    }
    
    try {
      const { data } = await api.post(`/tips/${tipId}/save`);
      if (data.saved) {
        setSavedTips(prev => new Set(prev).add(tipId));
      } else {
        setSavedTips(prev => {
          const newSet = new Set(prev);
          newSet.delete(tipId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error saving tip:', error);
    }
  };

  const handleCompleteTip = async (tipId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login to mark tips as learned and earn XP!');
      return;
    }
    
    try {
      await api.post(`/tips/${tipId}/complete`);
      alert('🎉 +3 XP! Tip marked as learned!');
    } catch (error) {
      console.error('Error completing tip:', error);
    }
  };

  const runCode = () => {
    try {
      const result = eval(code);
      setOutput({ success: true, message: `✅ Code executed successfully!`, result: String(result) });
    } catch (error) {
      setOutput({ success: false, message: `❌ Error: ${error.message}` });
    }
  };

  const filteredTips = selectedCategory === 'All' 
    ? allTips 
    : allTips.filter(tip => tip.category === selectedCategory);

  const tipsByCategory = categories.slice(1).map(cat => ({
    category: cat,
    tips: allTips.filter(t => t.category === cat).slice(0, 3)
  }));

  const totalPages = Math.ceil(filteredTips.length / 1);
  const currentTip = filteredTips[currentPage - 1];

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-dark-400">Loading Dev Intel...</div>
        </div>
      </div>
    );
  }

  if (selectedTip) {
    return (
      <div className="relative">
        <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <button onClick={() => setSelectedTip(null)} className="text-sm text-dark-500 hover:text-dark-300 mb-4">← Back to tips</button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${difficultyColors[selectedTip.difficulty]}`}>{selectedTip.difficulty}</span>
                  <span className="text-xs text-dark-500">{selectedTip.category}</span>
                  <button onClick={() => handleSaveTip(selectedTip._id)} className={`ml-auto ${savedTips.has(selectedTip._id) ? 'text-yellow-400' : 'text-dark-500'}`}>
                    <Bookmark className="w-4 h-4" fill={savedTips.has(selectedTip._id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-dark-100 mb-4">{selectedTip.title}</h2>
                <p className="text-sm text-dark-400 leading-relaxed mb-6">{selectedTip.content}</p>
                <Button onClick={() => handleCompleteTip(selectedTip._id)} className="w-full">
                  <CheckCircle className="w-4 h-4" />Mark as Learned (+3 XP)
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="glass rounded-xl overflow-hidden flex-1">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700/50">
                    <span className="text-xs text-dark-500 font-mono">Try it out</span>
                    <Code className="w-4 h-4 text-dark-500" />
                  </div>
                  <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="// Edit and run the code" className="w-full h-64 p-4 bg-transparent text-dark-200 text-sm font-mono focus:outline-none resize-none" spellCheck={false} />
                </div>
                <Button onClick={runCode} className="w-full"><Play className="w-4 h-4" />Run Code</Button>
                {output && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${output.success ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <p className={`text-sm ${output.success ? 'text-green-400' : 'text-red-400'}`}>{output.message}</p>
                    {output.result && <p className="text-xs text-dark-400 mt-2 font-mono">Result: {output.result}</p>}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-4">
              <Lightbulb className="w-3 h-3" />DEV INTEL
            </span>
            <h1 className="text-3xl font-bold mb-2">Daily <span className="gradient-text">Micro-Learning</span></h1>
            <p className="text-dark-400 text-sm">{allTips.length} tips • 7 categories • XP rewards</p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {currentTip && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-dark-500" />
                  {categories.map(cat => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-500 hover:text-dark-300'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-dark-500">{currentPage} / {totalPages}</span>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6" onMouseEnter={() => handleViewTip(currentTip._id)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${difficultyColors[currentTip.difficulty]}`}>{currentTip.difficulty}</span>
                    <span className="text-xs text-dark-500">{currentTip.category}</span>
                  </div>
                  <button onClick={() => handleSaveTip(currentTip._id)} className={`${savedTips.has(currentTip._id) ? 'text-yellow-400' : 'text-dark-500'} hover:text-yellow-400 transition-colors`}>
                    <Bookmark className="w-4 h-4" fill={savedTips.has(currentTip._id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold text-dark-100 mb-3">{currentTip.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed mb-4">{currentTip.content}</p>
                
                {currentTip.codeSnippet && (
                  <div className="glass rounded-lg overflow-hidden mb-4">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-dark-700/50">
                      <span className="text-xs text-dark-500 font-mono">Code</span>
                    </div>
                    <pre className="p-3 text-xs text-green-400 font-mono overflow-x-auto"><code>{currentTip.codeSnippet}</code></pre>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Button onClick={() => setSelectedTip(currentTip)} variant="outline"><Code className="w-4 h-4" />Try it out</Button>
                  <button onClick={() => handleCompleteTip(currentTip._id)} className="px-4 py-2 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg text-sm font-semibold transition-all border border-brand-500/20">
                    <CheckCircle className="w-4 h-4 inline mr-1" />Mark as Learned (+3 XP)
                  </button>
                  <span className="text-xs text-dark-500">View: +5 XP | Save: +2 XP</span>
                </div>
              </motion.div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg glass text-dark-400 hover:text-dark-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-dark-400">{currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg glass text-dark-400 hover:text-dark-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-dark-100 mb-6">Browse by Category</h2>
            <div className="space-y-6">
              {tipsByCategory.map(({ category, tips }) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-dark-200 mb-3">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tips.map((tip, i) => (
                      <motion.button key={tip._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setSelectedTip(tip)} className="text-left glass rounded-xl p-4 hover:border-brand-500/20 transition-all">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${difficultyColors[tip.difficulty]} mb-2 inline-block`}>{tip.difficulty}</span>
                        <h4 className="text-sm font-semibold text-dark-100 mb-1 line-clamp-1">{tip.title}</h4>
                        <p className="text-xs text-dark-500 line-clamp-2">{tip.content}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
