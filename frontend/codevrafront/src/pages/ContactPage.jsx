import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Mail, Calendar, Briefcase, Users, Github, Twitter, Linkedin, Send, MessageSquare, Clock, DollarSign, FileText, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { contactApi } from '../lib/api';

const contactMethods = [
  { icon: Calendar, title: 'Book Consultation', description: 'Schedule a 30-min strategy call to discuss your project.', action: 'Book Now', href: 'https://calendly.com/codevra', color: 'brand' },
  { icon: Briefcase, title: 'Hire Me', description: 'Looking for a developer who builds secure, scalable systems?', action: 'View Rates', href: '#intake', color: 'accent' },
  { icon: Users, title: 'Collaborate', description: 'Open to partnerships, open source, and African tech initiatives.', action: 'Reach Out', href: '#form', color: 'brand' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/codevra', handle: '@codevra' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/codevra', handle: '@codevra' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/codevra', handle: 'Codevra' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@codevra.dev', handle: 'hello@codevra.dev' },
];

const budgetRanges = ['Under KES 30,000', 'KES 30,000 - 100,000', 'KES 100,000 - 300,000', 'KES 300,000 - 600,000', 'KES 600,000+', "Let's discuss"];
const projectTypes = ['Web Application', 'Mobile App', 'API / Backend', 'Security Audit', 'DevOps Setup', 'Consultation', 'Other'];
const timelines = ['ASAP', '1-2 weeks', '1 month', '2-3 months', 'Flexible'];

export default function ContactPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [intakeData, setIntakeData] = useState({ name: '', email: '', projectType: '', budget: '', timeline: '', description: '' });
  const [activeTab, setActiveTab] = useState('contact');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    try {
      await contactApi.sendMessage({ ...formData, subject: 'Quick Message' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    }
  };

  const handleIntakeSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await contactApi.sendMessage({
        name: intakeData.name,
        email: intakeData.email,
        subject: `Project Intake: ${intakeData.projectType || 'General'}`,
        message: `Budget: ${intakeData.budget}\nTimeline: ${intakeData.timeline}\n\n${intakeData.description}`,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <MessageSquare className="w-3 h-3" />
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Let's Build <span className="gradient-text">Something Great.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-dark-400 max-w-2xl mx-auto">
            Whether it's a consultation, a project, or a collaboration — I'm ready to talk systems, security, and African tech.
          </motion.p>
        </div>
      </section>

      <section className="relative px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.a key={method.title} href={method.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }} className={`glass rounded-xl p-6 text-center group transition-all duration-300 hover:scale-[1.02] ${method.color === 'brand' ? 'hover:border-brand-500/20 hover:glow-brand' : 'hover:border-accent-500/20 hover:glow-accent'}`}>
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${method.color === 'brand' ? 'bg-brand-500/10 text-brand-400' : 'bg-accent-500/10 text-accent-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-dark-100 mb-1">{method.title}</h3>
                  <p className="text-sm text-dark-400 mb-3">{method.description}</p>
                  <span className={`text-sm font-medium ${method.color === 'brand' ? 'text-brand-400' : 'text-accent-400'}`}>{method.action} →</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map(social => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 flex items-center gap-3 group hover:border-dark-600/50 transition-all duration-200">
                  <Icon className="w-5 h-5 text-dark-400 group-hover:text-brand-400 transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-dark-200">{social.label}</div>
                    <div className="text-xs text-dark-500">{social.handle}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="form" className="relative px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <button onClick={() => setActiveTab('contact')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'contact' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200 border border-transparent'}`}>
              <Send className="w-4 h-4" />
              Quick Message
            </button>
            <button id="intake" onClick={() => setActiveTab('intake')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'intake' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400 hover:text-dark-200 border border-transparent'}`}>
              <FileText className="w-4 h-4" />
              Project Intake Form
            </button>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-12 text-center">
              <CheckCircle className="w-16 h-16 text-brand-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-dark-100 mb-2">Message Sent!</h3>
              <p className="text-dark-400">I'll get back to you within 24 hours.</p>
            </motion.div>
          ) : activeTab === 'contact' ? (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleContactSubmit} className="glass rounded-xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/30" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/30" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Message</label>
                <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/30 resize-none" placeholder="Tell me about your project or idea..." />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </motion.form>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleIntakeSubmit} className="glass rounded-xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                  <input type="text" required value={intakeData.name} onChange={e => setIntakeData({ ...intakeData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500/30" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                  <input type="email" required value={intakeData.email} onChange={e => setIntakeData({ ...intakeData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500/30" placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map(type => (
                    <button key={type} type="button" onClick={() => setIntakeData({ ...intakeData, projectType: type })} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${intakeData.projectType === type ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-dark-200'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  <DollarSign className="w-3.5 h-3.5 inline mr-1" />
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetRanges.map(range => (
                    <button key={range} type="button" onClick={() => setIntakeData({ ...intakeData, budget: range })} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${intakeData.budget === range ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-dark-200'}`}>
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  Timeline
                </label>
                <div className="flex flex-wrap gap-2">
                  {timelines.map(tl => (
                    <button key={tl} type="button" onClick={() => setIntakeData({ ...intakeData, timeline: tl })} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${intakeData.timeline === tl ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-dark-200'}`}>
                      {tl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Project Description</label>
                <textarea required rows={5} value={intakeData.description} onChange={e => setIntakeData({ ...intakeData, description: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500/30 resize-none" placeholder="Describe your project, goals, and any specific requirements..." />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
                <FileText className="w-4 h-4" />
                Submit Project Intake
              </Button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
