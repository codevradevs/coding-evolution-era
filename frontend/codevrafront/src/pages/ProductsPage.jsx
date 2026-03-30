import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Shield, Zap, BookOpen, Rocket, Check, Globe, Smartphone, Database, TrendingUp, MessageSquare, Cpu, Layers, Lock, BarChart, Video, Truck, Palette, Search, Target, X, Sparkles, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const iconMap = {
  'Web Solutions': Globe,
  'Mobile Apps': Smartphone,
  'Cyber Defense': Shield,
  'Data Intelligence': Database,
  'Branding': Palette,
  'Marketing': Target,
  'Automation': Zap,
  'Business Systems': Layers,
  'Integration': Cpu,
  'Education': BookOpen,
  'Events': Video,
  'Logistics': Truck,
  'Engagement': MessageSquare,
  'Infrastructure': Database,
  'Customer Support': MessageSquare,
  'Payment': Database,
  'Analytics & BI': BarChart,
  'AI & Intelligent Systems': Cpu,
  'Security & Risk': Lock,
  'Creative & UX': Palette,
  'Mobile Tech': Smartphone,
  'Business Platforms': Layers,
  'Integration Services': Cpu,
  'Location Tech': Globe,
  'E-Commerce': Truck,
  'Enterprise': Layers,
  'Platform Extensions': Code,
  'Smart Workflow': Zap,
  'Emerging Tech': Rocket
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuth();
  const [proposalData, setProposalData] = useState({ name: user?.name || '', email: user?.email || '', company: '', requirements: '' });
  const [generatedProposal, setGeneratedProposal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [selectedCategory, currentPage, searchQuery]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products/categories`);
      setCategories(['All', ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products`, {
        params: { category: selectedCategory, page: currentPage, limit: 12, search: searchQuery }
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateProposal = () => {
    const proposal = `PROJECT PROPOSAL

Client: ${proposalData.name}
Company: ${proposalData.company || 'N/A'}
Email: ${proposalData.email}

SERVICE REQUESTED
${selectedProduct.name} - ${selectedProduct.category}

OVERVIEW
${selectedProduct.description}

KEY DELIVERABLES
${selectedProduct.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

CLIENT REQUIREMENTS
${proposalData.requirements}

PRICING & TIMELINE
Estimated Cost: ${selectedProduct.price}
Estimated Timeline: ${selectedProduct.timeline}

NEXT STEPS
1. Review and approve this proposal
2. Sign service agreement
3. Initial payment (50% deposit)
4. Project kickoff meeting
5. Development & delivery

This proposal is valid for 30 days from the date of generation.`;
    setGeneratedProposal(proposal);
  };

  const sendProposal = () => {
    navigate('/contact', { state: { proposalData: { ...proposalData, message: generatedProposal, productName: selectedProduct.name } } });
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-4">
              <Rocket className="w-3 h-3" />OUR PRODUCTS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Digital <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-8">
              120+ high-impact systems engineered for performance, automation, and long-term ROI.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass border border-dark-700/50 text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'glass text-dark-400 hover:text-dark-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-dark-400">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-400">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product, i) => {
                  const Icon = iconMap[product.category] || Code;
                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-brand-500/10">
                            <Icon className="w-5 h-5 text-brand-400" />
                          </div>
                          <div>
                            <span className="text-xs text-dark-500">{product.category}</span>
                            <h3 className="font-bold text-dark-100 text-sm">{product.name}</h3>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-brand-400 mb-2">{product.tagline}</p>
                      <p className="text-sm text-dark-400 mb-4">{product.description}</p>
                      
                      <ul className="space-y-1.5 mb-4">
                        {product.features.slice(0, 3).map(feature => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-dark-400">
                            <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-dark-700/30">
                        <div>
                          <div className="text-sm font-bold text-brand-400">{product.price}</div>
                          <div className="text-xs text-dark-500">{product.timeline}</div>
                        </div>
                        <Button size="sm" onClick={() => setSelectedProduct(product)}>
                          Get Quote
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-dark-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !generatedProposal && setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-500/10">
                    {(() => { const Icon = iconMap[selectedProduct.category] || Code; return <Icon className="w-6 h-6 text-brand-400" />; })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-dark-100">{selectedProduct.name}</h2>
                    <p className="text-sm text-dark-500">{selectedProduct.category}</p>
                  </div>
                </div>
                <button onClick={() => { setSelectedProduct(null); setGeneratedProposal(''); setProposalData({ name: '', email: '', company: '', requirements: '' }); }} className="text-dark-400 hover:text-dark-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!generatedProposal ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-dark-300 mb-4">{selectedProduct.description}</p>
                    <div className="glass-brand rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span className="text-sm font-medium text-brand-400">AI Proposal Generator</span>
                      </div>
                      <p className="text-xs text-dark-400">Fill in your details and we'll generate a custom proposal</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={proposalData.name}
                        onChange={e => !user && setProposalData({ ...proposalData, name: e.target.value })}
                        readOnly={!!user}
                        className={`w-full px-3 py-2 rounded-lg border text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${user ? 'bg-dark-800/20 border-dark-700/30 cursor-not-allowed text-dark-400' : 'bg-dark-800/50 border-dark-700/50'}`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={proposalData.email}
                        onChange={e => !user && setProposalData({ ...proposalData, email: e.target.value })}
                        readOnly={!!user}
                        className={`w-full px-3 py-2 rounded-lg border text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${user ? 'bg-dark-800/20 border-dark-700/30 cursor-not-allowed text-dark-400' : 'bg-dark-800/50 border-dark-700/50'}`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      value={proposalData.company}
                      onChange={e => setProposalData({ ...proposalData, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Specific Requirements *</label>
                    <textarea
                      required
                      rows={4}
                      value={proposalData.requirements}
                      onChange={e => setProposalData({ ...proposalData, requirements: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none"
                      placeholder="Describe your specific needs..."
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={generateProposal}
                    disabled={!proposalData.name || !proposalData.email || !proposalData.requirements}
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Proposal
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="glass-brand rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Proposal Generated</span>
                    </div>
                    <p className="text-xs text-dark-400">Review your proposal below and send it to us</p>
                  </div>

                  <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50 max-h-96 overflow-y-auto">
                    <pre className="text-xs text-dark-300 whitespace-pre-wrap font-mono">{generatedProposal}</pre>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setGeneratedProposal('')} className="flex-1">
                      Edit Details
                    </Button>
                    <Button onClick={sendProposal} className="flex-1">
                      <Send className="w-4 h-4" />
                      Send to Contact
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
