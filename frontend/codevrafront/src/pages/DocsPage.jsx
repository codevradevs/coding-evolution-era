import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Shield, Sword, TrendingUp, Wrench, Users, Key, ChevronRight, Terminal, Lock, Zap, Globe } from 'lucide-react';

const sections = [
  { id: 'getting-started', label: 'Getting Started', icon: Zap },
  { id: 'tools-hub', label: 'Tools Hub', icon: Wrench },
  { id: 'vault', label: 'Secure Vault', icon: Shield },
  { id: 'arena', label: 'Coding Arena', icon: Sword },
  { id: 'tracker', label: 'Learning Tracker', icon: TrendingUp },
  { id: 'network', label: 'Startup Network', icon: Users },
  { id: 'auth-api', label: 'Auth API', icon: Key },
  { id: 'vault-api', label: 'Vault API', icon: Lock },
  { id: 'challenges-api', label: 'Challenges API', icon: Code2 },
  { id: 'tracker-api', label: 'Tracker API', icon: TrendingUp },
  { id: 'network-api', label: 'Network API', icon: Globe },
];

const Method = ({ m }) => {
  const colors = { GET: 'text-green-400 bg-green-400/10', POST: 'text-blue-400 bg-blue-400/10', PUT: 'text-yellow-400 bg-yellow-400/10', DELETE: 'text-red-400 bg-red-400/10' };
  return <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${colors[m]}`}>{m}</span>;
};

const Endpoint = ({ method, path, desc, auth, body }) => (
  <div className="border border-dark-700/40 rounded-lg p-4 space-y-2">
    <div className="flex items-center gap-3 flex-wrap">
      <Method m={method} />
      <code className="text-brand-300 font-mono text-sm">{path}</code>
      {auth && <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400">🔒 Auth required</span>}
    </div>
    <p className="text-sm text-dark-400">{desc}</p>
    {body && (
      <pre className="text-xs bg-dark-900/60 rounded p-3 text-dark-300 overflow-x-auto font-mono">{body}</pre>
    )}
  </div>
);

const Section = ({ id, title, badge, children }) => (
  <motion.div id={id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 scroll-mt-24">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-2xl font-bold text-dark-100">{title}</h2>
      {badge && <span className="text-xs px-2 py-1 rounded-full glass-brand text-brand-400 font-mono">{badge}</span>}
    </div>
    {children}
  </motion.div>
);

export default function DocsPage() {
  const [active, setActive] = useState('getting-started');

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-dots pointer-events-none opacity-30" />

      <section className="relative py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
            <BookOpen className="w-3 h-3" />DOCUMENTATION
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Platform <span className="gradient-text">Docs</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-dark-400 max-w-xl mx-auto">
          Everything you need — from using the platform to integrating the API.
        </motion.p>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 pb-20">
        {/* Mobile section nav */}
        <div className="lg:hidden overflow-x-auto pb-2 mb-6">
          <div className="flex gap-2 whitespace-nowrap">
            {sections.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} onClick={() => setActive(id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${active === id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'glass text-dark-400'}`}>
                <Icon className="w-3 h-3 shrink-0" />{label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 glass rounded-xl p-4 space-y-1">
            <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3 px-2">Platform Guide</p>
            {sections.slice(0, 6).map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${active === id ? 'bg-brand-500/10 text-brand-400' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/40'}`}>
                <Icon className="w-4 h-4 shrink-0" />{label}
              </a>
            ))}
            <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mt-4 mb-3 px-2">API Reference</p>
            {sections.slice(6).map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${active === id ? 'bg-brand-500/10 text-brand-400' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/40'}`}>
                <Icon className="w-4 h-4 shrink-0" />{label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">

          {/* ── PLATFORM GUIDE ── */}
          <div className="flex items-center gap-3 mb-10 mt-2">
            <BookOpen className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-bold text-dark-100">Platform Guide</h2>
            <div className="flex-1 h-px bg-dark-700/40" />
          </div>

          <Section id="getting-started" title="Getting Started" badge="START HERE">
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-dark-300">Codevra is a full developer ecosystem. Here's how to get up and running:</p>
              {[
                { step: '01', title: 'Create an Account', desc: 'Register at /auth/register with your email and password. You can also sign in with Google or GitHub via OAuth.' },
                { step: '02', title: 'Explore the Hubs', desc: 'Navigate to any hub from the top menu — Tools, Vault, Arena, Tracker, or Network. Each hub is independent.' },
                { step: '03', title: 'Use the API', desc: 'All hubs are backed by a REST API. Authenticate with JWT and start integrating. See the API Reference below.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 p-4 rounded-lg bg-dark-800/30">
                  <span className="text-2xl font-bold text-brand-500/40 font-mono shrink-0">{step}</span>
                  <div>
                    <h4 className="font-semibold text-dark-100 mb-1">{title}</h4>
                    <p className="text-sm text-dark-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="tools-hub" title="Tools Hub" badge="/hub/tools">
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-dark-400 text-sm">A collection of developer utilities — all client-side, no data stored.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'JWT Decoder', desc: 'Paste any JWT to decode header, payload, and verify expiry.' },
                  { name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly.' },
                  { name: 'Base64 Encoder/Decoder', desc: 'Encode or decode Base64 strings and files.' },
                  { name: 'Regex Tester', desc: 'Test regular expressions with live match highlighting.' },
                  { name: 'JSON Formatter', desc: 'Prettify, minify, and validate JSON with syntax highlighting.' },
                ].map(({ name, desc }) => (
                  <div key={name} className="p-4 rounded-lg border border-dark-700/40">
                    <div className="flex items-center gap-2 mb-1">
                      <ChevronRight className="w-3 h-3 text-brand-400" />
                      <span className="font-semibold text-dark-200 text-sm">{name}</span>
                    </div>
                    <p className="text-xs text-dark-500 pl-5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="vault" title="Secure Vault" badge="/hub/vault">
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-dark-400 text-sm">Encrypted note storage. All notes are encrypted with AES-256 before being stored in the database.</p>
              <div className="space-y-3">
                {[
                  { action: 'Create a note', desc: 'Click "New Note", enter a title and content, then save. The note is encrypted server-side before storage.' },
                  { action: 'Edit a note', desc: 'Click any note to open it. Make changes and save — the updated content is re-encrypted.' },
                  { action: 'Delete a note', desc: 'Open a note and click the delete icon. Deletion is permanent and cannot be undone.' },
                  { action: 'Security model', desc: 'Notes are encrypted with AES-256-GCM using a per-environment key. Even database admins cannot read your notes in plaintext.' },
                ].map(({ action, desc }) => (
                  <div key={action} className="flex gap-3 p-3 rounded-lg bg-dark-800/30">
                    <Shield className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-dark-200">{action} — </span>
                      <span className="text-sm text-dark-400">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="arena" title="Coding Arena" badge="/hub/arena">
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-dark-400 text-sm">Solve coding challenges, submit solutions, and track your progress.</p>
              <div className="space-y-3">
                {[
                  { action: 'Browse challenges', desc: 'Challenges are listed by difficulty (Easy, Medium, Hard). Filter by tag or difficulty level.' },
                  { action: 'Submit a solution', desc: 'Write your solution in the code editor and click Submit. Solutions are evaluated server-side.' },
                  { action: 'View submissions', desc: 'Your submission history is saved. Review past attempts and track improvement over time.' },
                  { action: 'XP system', desc: 'Each accepted submission awards XP based on difficulty. XP contributes to your developer rank.' },
                ].map(({ action, desc }) => (
                  <div key={action} className="flex gap-3 p-3 rounded-lg bg-dark-800/30">
                    <Sword className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-dark-200">{action} — </span>
                      <span className="text-sm text-dark-400">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="tracker" title="Learning Tracker" badge="/hub/tracker">
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-dark-400 text-sm">Track courses, certifications, and skills in one place.</p>
              <div className="space-y-3">
                {[
                  { action: 'Add a course', desc: 'Click "Add Item", select type (Course, Certification, or Skill), fill in details, and save.' },
                  { action: 'Update progress', desc: 'Edit any item to update completion percentage, status, or notes.' },
                  { action: 'Track certifications', desc: 'Store certification names, issuing bodies, and expiry dates. Get reminded before they expire.' },
                  { action: 'Skill map', desc: 'Tag items with skill categories to build a visual map of your expertise.' },
                ].map(({ action, desc }) => (
                  <div key={action} className="flex gap-3 p-3 rounded-lg bg-dark-800/30">
                    <TrendingUp className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-dark-200">{action} — </span>
                      <span className="text-sm text-dark-400">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="network" title="Startup Network" badge="/hub/network">
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-dark-400 text-sm">Connect with other builders, founders, and developers in the Codevra ecosystem.</p>
              <div className="space-y-3">
                {[
                  { action: 'Create your profile', desc: 'Set up your developer profile with skills, bio, and links. This is your public presence in the network.' },
                  { action: 'Browse profiles', desc: 'Discover other developers and founders. Filter by skills, location, or focus area.' },
                  { action: 'Connect', desc: 'Send connection requests to collaborate on projects or co-found startups.' },
                ].map(({ action, desc }) => (
                  <div key={action} className="flex gap-3 p-3 rounded-lg bg-dark-800/30">
                    <Users className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-dark-200">{action} — </span>
                      <span className="text-sm text-dark-400">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── API REFERENCE ── */}
          <div className="flex items-center gap-3 mb-10 mt-4">
            <Terminal className="w-5 h-5 text-accent-400" />
            <h2 className="text-xl font-bold text-dark-100">API Reference</h2>
            <div className="flex-1 h-px bg-dark-700/40" />
          </div>

          <div className="glass rounded-xl p-4 sm:p-5 mb-10 space-y-3">
            <p className="text-sm font-semibold text-dark-200">Base URL</p>
            <code className="block text-brand-300 font-mono text-sm bg-dark-900/60 rounded p-3">http://localhost:5000/api</code>
            <p className="text-sm text-dark-400">Protected endpoints require a Bearer token in the Authorization header:</p>
            <pre className="text-xs bg-dark-900/60 rounded p-3 text-dark-300 font-mono overflow-x-auto">{`Authorization: Bearer <your_jwt_token>`}</pre>
            <p className="text-xs text-dark-500">Tokens expire in 15 minutes. Use <code className="text-brand-400">POST /auth/refresh</code> with your refresh token to get a new access token.</p>
          </div>

          <Section id="auth-api" title="Authentication" badge="PUBLIC + PROTECTED">
            <div className="space-y-3">
              <Endpoint method="POST" path="/auth/register" desc="Create a new account." body={`{ "email": "user@example.com", "password": "yourpassword", "name": "Your Name" }`} />
              <Endpoint method="POST" path="/auth/login" desc="Login and receive access + refresh tokens." body={`{ "email": "user@example.com", "password": "yourpassword" }`} />
              <Endpoint method="POST" path="/auth/logout" desc="Invalidate the current session." auth />
              <Endpoint method="GET" path="/auth/me" desc="Get the currently authenticated user's profile." auth />
              <Endpoint method="POST" path="/auth/refresh" desc="Exchange a refresh token for a new access token." body={`{ "refreshToken": "<token>" }`} />
            </div>
          </Section>

          <Section id="vault-api" title="Vault API" badge="PROTECTED">
            <div className="space-y-3">
              <Endpoint method="GET" path="/vault" desc="Retrieve all encrypted notes for the authenticated user." auth />
              <Endpoint method="POST" path="/vault" desc="Create a new encrypted note." auth body={`{ "title": "My Note", "content": "Sensitive content here" }`} />
              <Endpoint method="PUT" path="/vault/:id" desc="Update an existing note by ID." auth body={`{ "title": "Updated Title", "content": "Updated content" }`} />
              <Endpoint method="DELETE" path="/vault/:id" desc="Permanently delete a note by ID." auth />
            </div>
          </Section>

          <Section id="challenges-api" title="Challenges API" badge="MIXED">
            <div className="space-y-3">
              <Endpoint method="GET" path="/challenges" desc="List all available coding challenges. Public." />
              <Endpoint method="GET" path="/challenges/:id" desc="Get a single challenge by ID. Public." />
              <Endpoint method="POST" path="/challenges/:id/submit" desc="Submit a solution for a challenge." auth body={`{ "code": "function solution() { ... }", "language": "javascript" }`} />
              <Endpoint method="GET" path="/challenges/user/submissions" desc="Get all submissions by the authenticated user." auth />
            </div>
          </Section>

          <Section id="tracker-api" title="Tracker API" badge="PROTECTED">
            <div className="space-y-3">
              <Endpoint method="GET" path="/tracker" desc="Get all learning items for the authenticated user." auth />
              <Endpoint method="POST" path="/tracker" desc="Add a new learning item." auth body={`{ "type": "course", "title": "System Design", "progress": 40, "tags": ["backend"] }`} />
              <Endpoint method="PUT" path="/tracker/:id" desc="Update a learning item by ID." auth body={`{ "progress": 80, "status": "in-progress" }`} />
              <Endpoint method="DELETE" path="/tracker/:id" desc="Delete a learning item by ID." auth />
            </div>
          </Section>

          <Section id="network-api" title="Network API" badge="MIXED">
            <div className="space-y-3">
              <Endpoint method="GET" path="/network/profiles" desc="Browse all public developer profiles." />
              <Endpoint method="GET" path="/network/profile" desc="Get the authenticated user's own profile." auth />
              <Endpoint method="POST" path="/network/profile" desc="Create or update your developer profile." auth body={`{ "bio": "Systems builder", "skills": ["Node.js", "React"], "links": { "github": "https://github.com/..." } }`} />
            </div>
          </Section>

        </main>
        </div>
      </div>
    </div>
  );
}
