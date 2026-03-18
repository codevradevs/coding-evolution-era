import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Mail, Briefcase, Send, MessageSquare, Clock, DollarSign, FileText, CheckCircle, Phone, Instagram, Facebook, Github, Shield, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { contactApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const CALENDLY_URL = 'https://calendly.com/codevradevs/codevra-devs-project-consultation';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/codevradevs', handle: '@codevradevs' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/codevra_solutions', handle: '@codevra_solutions' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/codevradevs', handle: 'Codevra Devs' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@codevradevs', handle: '@codevradevs' },
  { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/254140710690', handle: '+254 140 710 690' },
  { icon: Mail, label: 'Email', href: 'mailto:codevradevs@gmail.com', handle: 'codevradevs@gmail.com' },
];

const projectTypes = ['SaaS Platform', 'E-Commerce', 'Web Application', 'Mobile App', 'API / Backend', 'Security Audit', 'M-Pesa Integration', 'Other'];
const budgetRanges = ['Under KES 30,000', 'KES 30,000 - 100,000', 'KES 100,000 - 300,000', 'KES 300,000 - 600,000', 'KES 600,000+', "Let's discuss"];
const timelines = ['ASAP', '1-2 weeks', '1 month', '2-3 months', 'Flexible'];

const faqs = [
  { q: 'How fast can you start?', a: 'Most projects kick off within 3-5 business days after the initial consultation and deposit.' },
  { q: 'Do you work with international clients?', a: 'Yes. We work with clients across Africa and internationally. Payments via M-Pesa, bank transfer, or Wise.' },
  { q: 'What tech stack do you use?', a: 'React / Next.js on the frontend, Node.js + Express on the backend, MongoDB or PostgreSQL, deployed on Vercel + Render.' },
  { q: 'How do payments work?', a: '50% deposit to start, 50% on delivery. M-Pesa, bank transfer, or Wise accepted.' },
];

export default function ContactPage() {
  const location = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('intake');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [intakeData, setIntakeData] = useState({ name: user?.name || '', email: user?.email || '', projectType: '', budget: '', timeline: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (location.state?.proposalData) {
      const { name, email, message } = location.state.proposalData;
      setFormData({ name, email, message });
      setActiveTab('contact');
    }
  }, [location]);

  const handleContactSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await contactApi.sendMessage({ ...formData, subject: 'Quick Message' });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIntakeSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await contactApi.sendMessage({
        name: intakeData.name,
        email: intakeData.email,
        subject: `Project Intake: ${intakeData.projectType || 'General'}`,
        message: `Project Type: ${intakeData.projectType}\nBudget: ${intakeData.budget}\nTimeline: ${intakeData.timeline}\n\n${intakeData.description}`,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      {/* Floating WhatsApp button on mobile */}
      <a
        href="https://wa.me/254140710690"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white text-sm font-semibold shadow-lg hover:bg-green-400 transition-all md:hidden"
      >
        <Phone className="w-4 h-4" />
        Chat on WhatsApp
      </a>

      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <MessageSquare className="w-3 h-3" />
              GET IN TOUCH
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Let's Build <span className="gradient-text">Something Great.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-dark-400 max-w-2xl mx-auto mb-4">
            Secure, scalable systems for African businesses. Book a free 30-min consultation or send us your project details.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm text-dark-500 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            We reply within 24 hours · Trusted by African startups
          </motion.p>
        </div>
      </section>

      {/* Primary CTA — Book Consultation */}
      <section className="relative px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-8 border border-brand-500/30 text-center">
            <div className="w-14 h-14 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-dark-100 mb-2">Book a Free Consultation</h2>
            <p className="text-dark-400 mb-2 max-w-lg mx-auto">30-minute strategy call. We'll scope your project, discuss tech stack, timeline, and pricing — no commitment required.</p>
            <p className="text-xs text-dark-500 mb-6 flex items-center justify-center gap-1"><Shield className="w-3 h-3 text-brand-400" /> Your project details are confidential and never shared.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Button size="xl" className="group w-full sm:w-auto">
                  <FileText className="w-5 h-5" />
                  Book Free Consultation
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
              <a href="https://wa.me/254140710690" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 text-green-400" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social links */}
      <section className="relative px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-dark-500 uppercase tracking-wider font-semibold mb-4 text-center">Find us on</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {socialLinks.map(social => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 group hover:border-brand-500/30 transition-all">
                  <Icon className="w-5 h-5 text-dark-400 group-hover:text-brand-400 transition-colors" />
                  <span className="text-xs text-dark-500 group-hover:text-dark-300 transition-colors">{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section id="form" className="relative px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <button onClick={() => { setActiveTab('intake'); setSubmitted(false); setError(''); }} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'intake' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200 border border-transparent'}`}>
              <Briefcase className="w-4 h-4" />
              Project Intake
            </button>
            <button onClick={() => { setActiveTab('contact'); setSubmitted(false); setError(''); }} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'contact' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400 hover:text-dark-200 border border-transparent'}`}>
              <Send className="w-4 h-4" />
              Quick Message
            </button>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass rounded-xl p-12 text-center">
                <CheckCircle className="w-16 h-16 text-brand-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-dark-100 mb-2">Message Sent!</h3>
                <p className="text-dark-400 mb-2">We'll get back to you within 24 hours.</p>
                <p className="text-sm text-dark-500">Check your email for a confirmation. Or book a call directly:</p>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-brand-400 text-sm font-medium hover:text-brand-300">
                  Book a consultation <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ) : activeTab === 'intake' ? (
              <motion.form key="intake" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onSubmit={handleIntakeSubmit} className="glass rounded-xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-dark-100 mb-1">Tell us about your project</h3>
                  <p className="text-sm text-dark-500">We'll review and get back to you within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Your Name *</label>
                    <input type="text" required value={intakeData.name} onChange={e => setIntakeData({ ...intakeData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Email Address *</label>
                    <input type="email" required value={intakeData.email} onChange={e => setIntakeData({ ...intakeData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">What are you building? *</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map(type => (
                      <button key={type} type="button" onClick={() => setIntakeData({ ...intakeData, projectType: type })} className={`px-3 py-2 rounded-lg text-sm transition-all ${intakeData.projectType === type ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-dark-200'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2"><DollarSign className="w-3.5 h-3.5 inline mr-1" />Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map(range => (
                      <button key={range} type="button" onClick={() => setIntakeData({ ...intakeData, budget: range })} className={`px-3 py-2 rounded-lg text-sm transition-all ${intakeData.budget === range ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-dark-200'}`}>
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2"><Clock className="w-3.5 h-3.5 inline mr-1" />Timeline</label>
                  <div className="flex flex-wrap gap-2">
                    {timelines.map(tl => (
                      <button key={tl} type="button" onClick={() => setIntakeData({ ...intakeData, timeline: tl })} className={`px-3 py-2 rounded-lg text-sm transition-all ${intakeData.timeline === tl ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-dark-200'}`}>
                        {tl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Project Description *</label>
                  <textarea required rows={4} value={intakeData.description} onChange={e => setIntakeData({ ...intakeData, description: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" placeholder="Describe your project, goals, and any specific requirements..." />
                </div>

                <div className="flex items-center gap-2 text-xs text-dark-500 bg-dark-800/30 rounded-lg p-3">
                  <Shield className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  Your project details are confidential and will never be shared with third parties.
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Submit Project Intake'}
                </Button>
              </motion.form>
            ) : (
              <motion.form key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onSubmit={handleContactSubmit} className="glass rounded-xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-dark-100 mb-1">Send a quick message</h3>
                  <p className="text-sm text-dark-500">For general enquiries, partnerships, or collaborations.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Your Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Message *</label>
                  <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" placeholder="Tell us about your project or idea..." />
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-500 bg-dark-800/30 rounded-lg p-3">
                  <Shield className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  Your data is secure and will never be shared with third parties.
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-dark-100 mb-6 text-center">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-semibold text-dark-100">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-dark-500 shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-dark-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
