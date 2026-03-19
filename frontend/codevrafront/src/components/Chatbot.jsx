import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, RotateCcw } from 'lucide-react';
import logo from '../logo.png';
import { generateResponse } from '../data/chatbotData';
import { Link } from 'react-router-dom';

const INITIAL_MESSAGE = {
  id: 0,
  role: 'bot',
  text: `Hey! 👋 I'm the **Codevra Assistant**.\n\nI know everything about this site — tools, vault, arena, tracker, network, blog, products, and more.\n\nWhat can I help you with?`,
  time: new Date(),
};

function renderText(text) {
  // Convert **bold**, links [text](url), and newlines
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = [];
    let remaining = line;
    let key = 0;

    // Process bold and links
    const regex = /(\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{remaining.slice(lastIndex, match.index)}</span>);
      }
      if (match[0].startsWith('**')) {
        parts.push(<strong key={key++} className="text-dark-100 font-semibold">{match[2]}</strong>);
      } else {
        parts.push(
          <Link key={key++} to={match[4]} className="text-brand-400 hover:text-brand-300 underline underline-offset-2">
            {match[3]}
          </Link>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < remaining.length) {
      parts.push(<span key={key++}>{remaining.slice(lastIndex)}</span>);
    }

    return (
      <span key={i} className="block">
        {parts.length > 0 ? parts : <span>&nbsp;</span>}
      </span>
    );
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), role: 'user', text: trimmed, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = generateResponse(trimmed);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: response, time: new Date() }]);
      setTyping(false);
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => setMessages([INITIAL_MESSAGE]);

  const sendQuick = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: response, time: new Date() }]);
      setTyping(false);
    }, 600);
  };

  const quickReplies = ['What is Codevra?', 'Show me the tools', 'How does the Vault work?', 'How do I login?'];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-500 text-dark-950 shadow-lg shadow-brand-500/30 flex items-center justify-center hover:bg-brand-400 transition-colors ${open ? 'hidden' : 'flex'}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <img src={logo} alt="Codevra" className="w-8 h-8 object-contain" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-400 text-[9px] font-bold text-dark-950 flex items-center justify-center">AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[580px] flex flex-col glass rounded-2xl shadow-2xl border border-dark-700/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700/50 bg-dark-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-100">Codevra Assistant</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-dark-500">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} className="p-1.5 rounded-lg text-dark-500 hover:text-dark-300 hover:bg-dark-800/50 transition-colors" title="Reset chat">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-dark-500 hover:text-dark-300 hover:bg-dark-800/50 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-0.5 ${msg.role === 'bot' ? 'bg-brand-500/20 border border-brand-500/30' : 'bg-accent-500/20 border border-accent-500/30'}`}>
                    {msg.role === 'bot' ? <Bot className="w-3 h-3 text-brand-400" /> : <User className="w-3 h-3 text-accent-400" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === 'bot' ? 'bg-dark-800/60 text-dark-200 rounded-tl-none' : 'bg-brand-500/15 text-dark-100 rounded-tr-none border border-brand-500/20'}`}>
                    {renderText(msg.text)}
                    <span className="block text-[10px] text-dark-600 mt-1">
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-brand-400" />
                  </div>
                  <div className="px-3 py-2.5 rounded-xl rounded-tl-none bg-dark-800/60">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-dark-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-dark-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-dark-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map(q => (
                  <button
                    key={q}
                    onClick={() => sendQuick(q)}
                    className="px-2.5 py-1 rounded-full text-xs bg-dark-800/60 text-dark-300 hover:text-brand-400 hover:bg-brand-500/10 border border-dark-700/50 hover:border-brand-500/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-dark-700/50 bg-dark-900/50">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything about Codevra..."
                  rows={1}
                  className="flex-1 px-3 py-2 rounded-xl bg-dark-800/60 border border-dark-700/50 text-dark-100 text-sm placeholder:text-dark-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none max-h-24 overflow-y-auto"
                  style={{ lineHeight: '1.5' }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-brand-500 text-dark-950 flex items-center justify-center hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-dark-700 mt-1.5 text-center">Press Enter to send • Shift+Enter for new line</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
