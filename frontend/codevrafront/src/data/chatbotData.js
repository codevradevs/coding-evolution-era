// Codevra HQ Chatbot Knowledge Base

export const SITE_KNOWLEDGE = {
  general: {
    name: 'Codevra',
    fullName: 'Codevra HQ',
    tagline: 'Secure, Scalable Digital Systems Built in Africa.',
    description: 'Codevra is a full developer ecosystem and digital agency built in Kenya. It offers SaaS platforms, developer tooling, security-first architecture, and African tech infrastructure.',
    location: 'Kenya 🇰🇪',
    mission: 'Building African Tech Futures — closing the gap in African tech infrastructure with secure, scalable systems.',
    stats: {
      platformModules: '310+',
      services: '110+',
      blogPosts: '160+',
      devTips: '140+',
    },
    techStack: {
      frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'MongoDB', 'REST APIs'],
      security: ['AES-256', 'JWT', 'bcrypt', 'OWASP', 'Penetration Testing', 'Cryptography'],
      devops: ['Docker', 'CI/CD', 'Vercel', 'Railway', 'Cloudflare'],
    },
    philosophy: [
      'Build Secure by Default — security is designed in from day one.',
      'Systems > Scripts — interconnected systems that scale.',
      'African-First Innovation — M-Pesa integrations, local-first solutions.',
      'Ship Fast, Refine Faster — launch MVPs quickly, iterate on real feedback.',
    ],
    methodology: [
      'Every feature begins with a threat model',
      'Every endpoint is rate-limited by default',
      'Every sensitive operation is validated twice',
      'Authentication flows use JWT + refresh token',
      'Database queries use parameterized statements',
      'Encryption is AES-256 with proper key management',
    ],
  },

  pages: {
    home: {
      path: '/',
      title: 'Home',
      description: 'Landing page with hero section, mode toggle (Client/Developer), and ecosystem overview.',
      features: ['Client Mode', 'Developer Mode', 'Mode Toggle', 'Hero CTA buttons'],
    },
    about: {
      path: '/about',
      title: 'About',
      description: 'Deep dive into Codevra\'s mission, origin story, skill stack, philosophy, and 10-year vision.',
      sections: ['Origin Story', 'Skill Stack', 'Core Philosophy', 'Differentiators', 'Methodology', '10-Year Vision', 'Who Should Work With Codevra'],
      skills: ['Frontend Systems (92%)', 'Backend Systems (88%)', 'Security Research (85%)', 'DevOps Foundations (78%)'],
    },
    products: {
      path: '/products',
      title: 'Products',
      description: 'Codevra\'s product and service offerings for clients and businesses.',
    },
    projects: {
      path: '/projects',
      title: 'Projects / Case Studies',
      description: 'Portfolio of real-world projects and case studies built by Codevra.',
    },
    blog: {
      path: '/blog',
      title: 'Blog',
      description: 'Technical articles, tutorials, and insights. 160+ posts covering security, systems, African tech, and more.',
    },
    contact: {
      path: '/contact',
      title: 'Contact',
      description: 'Get in touch with Codevra to start a project or collaboration.',
      email: 'codevradevs@gmail.com',
    },
  },

  ecosystem: {
    description: 'The Codevra Ecosystem is a suite of developer tools and platforms accessible under the /hub route.',
    tools: {
      path: '/hub/tools',
      title: 'Developer Tools Hub',
      description: '18+ professional developer tools. All client-side — no data leaves your browser.',
      tools: [
        { id: 'jwt', name: 'JWT Decoder', category: 'security', description: 'Decode and inspect JWT tokens — header, payload, and signature.' },
        { id: 'hash', name: 'Hash Generator', category: 'security', description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes.' },
        { id: 'base64', name: 'Base64 Encoder/Decoder', category: 'encoding', description: 'Encode or decode Base64 strings.' },
        { id: 'regex', name: 'Regex Tester', category: 'utility', description: 'Test regular expressions with live match highlighting.' },
        { id: 'json', name: 'JSON Formatter', category: 'data', description: 'Format or minify JSON data.' },
        { id: 'uuid', name: 'UUID Generator', category: 'security', description: 'Generate one or multiple UUIDs.' },
        { id: 'hmac', name: 'HMAC Generator', category: 'security', description: 'Generate HMAC-SHA256 signatures with a secret key.' },
        { id: 'password', name: 'Password Generator', category: 'security', description: 'Generate strong passwords with custom length and character sets.' },
        { id: 'url', name: 'URL Encoder/Decoder', category: 'encoding', description: 'Encode or decode URL components.' },
        { id: 'html', name: 'HTML Encoder/Decoder', category: 'encoding', description: 'Encode or decode HTML entities.' },
        { id: 'binary', name: 'Binary Converter', category: 'encoding', description: 'Convert text to binary and back.' },
        { id: 'hex', name: 'Hex Converter', category: 'encoding', description: 'Convert text to hexadecimal and back.' },
        { id: 'yaml', name: 'YAML ↔ JSON', category: 'data', description: 'Convert JSON to YAML format.' },
        { id: 'csv', name: 'CSV ↔ JSON', category: 'data', description: 'Convert CSV data to JSON.' },
        { id: 'timestamp', name: 'Timestamp Converter', category: 'utility', description: 'Convert Unix timestamps to human-readable dates.' },
        { id: 'diff', name: 'Diff Checker', category: 'utility', description: 'Compare two text blocks and highlight differences.' },
        { id: 'color', name: 'Color Converter', category: 'utility', description: 'Convert colors between HEX, RGB, and HSL.' },
        { id: 'cron', name: 'Cron Parser', category: 'utility', description: 'Parse and explain cron expressions in plain English.' },
      ],
    },
    vault: {
      path: '/hub/vault',
      title: 'Secure Vault',
      description: 'Encrypted note storage. Store credentials, code snippets, research, and sensitive notes securely.',
      features: ['AES-256 encryption', 'Folder organization', 'Tag support', 'Search', 'Markdown support', 'Code snippets'],
      folders: ['All Notes', 'Credentials', 'Security Research', 'Code Snippets', 'Research'],
      requiresAuth: true,
    },
    arena: {
      path: '/hub/arena',
      title: 'Coding Arena',
      description: 'Coding challenges and submission system. Practice and improve your programming skills.',
      features: ['Coding challenges', 'Submission system', 'User submissions history'],
      requiresAuth: true,
    },
    tracker: {
      path: '/hub/tracker',
      title: 'Learning Tracker',
      description: 'Track your learning progress — courses, certifications, and skills.',
      features: ['Course tracking', 'Certification tracking', 'Skill tracking', 'Progress management'],
      requiresAuth: true,
    },
    network: {
      path: '/hub/network',
      title: 'Startup Network',
      description: 'Connect with other developers and founders. Build and discover startup profiles.',
      features: ['Developer profiles', 'Startup profiles', 'Connections', 'Network discovery'],
      requiresAuth: true,
    },
    devIntel: {
      path: '/hub/tips',
      title: 'Dev Intel',
      description: 'Developer tips, insights, and intelligence. 140+ curated dev tips.',
    },
    funLab: {
      path: '/fun-lab',
      title: 'Fun Lab',
      description: 'Interactive experiments and fun developer experiences.',
      subPages: [
        { path: '/fun-lab/3d', title: '3D Lab', description: 'Three.js 3D experiments and visualizations.' },
        { path: '/fun-lab/animation', title: 'Animation Lab', description: 'Framer Motion animation experiments.' },
        { path: '/fun-lab/code', title: 'Code Battle', description: 'Competitive coding challenges.' },
        { path: '/fun-lab/cyber', title: 'Cyber Simulator', description: 'Cybersecurity simulation experiences.' },
        { path: '/fun-lab/games', title: 'Logic Puzzles', description: 'Logic and programming puzzles.' },
        { path: '/fun-lab/chaos', title: 'Chaos Mode', description: 'Experimental chaos mode features.' },
      ],
    },
  },

  auth: {
    description: 'Full authentication system with JWT + refresh tokens, OAuth (Google & GitHub), and secure session management.',
    routes: {
      login: '/auth/login',
      register: '/auth/register',
      callback: '/auth/callback',
    },
    features: [
      'Email/password registration and login',
      'Google OAuth login',
      'GitHub OAuth login',
      'JWT access tokens (15 min expiry)',
      'Refresh tokens (7 day expiry)',
      'Secure logout',
      'Password hashing with bcryptjs',
    ],
    protectedFeatures: ['Vault', 'Arena', 'Tracker', 'Network'],
  },

  api: {
    baseUrl: 'http://localhost:5000',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login', 'POST /api/auth/logout', 'GET /api/auth/me', 'POST /api/auth/refresh'],
      vault: ['GET /api/vault', 'POST /api/vault', 'PUT /api/vault/:id', 'DELETE /api/vault/:id'],
      challenges: ['GET /api/challenges', 'GET /api/challenges/:id', 'POST /api/challenges/:id/submit', 'GET /api/challenges/user/submissions'],
      tracker: ['GET /api/tracker', 'POST /api/tracker', 'PUT /api/tracker/:id', 'DELETE /api/tracker/:id'],
      network: ['GET /api/network/profiles', 'GET /api/network/profile', 'POST /api/network/profile'],
      contact: ['POST /api/contact'],
      blogs: ['GET /api/blogs', 'GET /api/blogs/:slug'],
      products: ['GET /api/products'],
      tips: ['GET /api/tips'],
    },
  },

  security: {
    description: 'Security is a first-class citizen at Codevra.',
    features: [
      'AES-256 encryption for vault notes',
      'JWT with short expiry (15 min) + refresh tokens',
      'bcryptjs password hashing',
      'Rate limiting on all endpoints',
      'OWASP standards implementation',
      'Parameterized database queries',
      'CORS protection',
      'Threat modeling for every feature',
    ],
  },

  audience: {
    startups: 'Need secure MVPs with M-Pesa integration and African payment rails.',
    founders: 'Need system architects who think in infrastructure, not freelancers who copy-paste.',
    developers: 'Want to level up from "framework user" to "system thinker".',
    investors: 'Looking for African SaaS infrastructure builders with technical depth.',
  },
};

// Vocabulary map: user words → intent categories
export const VOCABULARY = {
  greetings: ['hi', 'hello', 'hey', 'howdy', 'sup', 'what\'s up', 'good morning', 'good afternoon', 'good evening', 'hola', 'yo', 'greetings'],
  farewells: ['bye', 'goodbye', 'see you', 'later', 'cya', 'take care', 'farewell', 'peace', 'ttyl'],
  thanks: ['thanks', 'thank you', 'thx', 'ty', 'appreciate', 'cheers', 'great', 'awesome', 'perfect', 'nice'],
  about: ['about', 'who', 'what is codevra', 'tell me about', 'explain', 'describe', 'overview', 'what does', 'codevra', 'company', 'team', 'mission', 'vision', 'story', 'origin', 'history', 'background', 'founded', 'kenya', 'africa', 'african'],
  tools: ['tools', 'tool', 'hub', 'developer tools', 'dev tools', 'toolkit', 'utilities', 'utility', 'jwt', 'hash', 'base64', 'regex', 'json', 'uuid', 'hmac', 'password', 'url', 'html', 'binary', 'hex', 'yaml', 'csv', 'timestamp', 'diff', 'color', 'cron', 'encode', 'decode', 'convert', 'generate', 'formatter', 'parser', 'checker'],
  vault: ['vault', 'notes', 'note', 'encrypted', 'encryption', 'secure notes', 'store', 'storage', 'credentials', 'secrets', 'snippets', 'code snippets', 'research', 'private', 'secure', 'aes', 'aes-256'],
  arena: ['arena', 'coding', 'challenges', 'challenge', 'code', 'practice', 'submit', 'submission', 'compete', 'programming', 'exercises', 'problems', 'solve'],
  tracker: ['tracker', 'track', 'learning', 'courses', 'course', 'certifications', 'certification', 'skills', 'skill', 'progress', 'study', 'education', 'learn'],
  network: ['network', 'startup', 'startups', 'connect', 'connections', 'profiles', 'profile', 'founders', 'developers', 'community', 'people', 'collaborate'],
  devIntel: ['tips', 'intel', 'dev intel', 'developer tips', 'insights', 'advice', 'best practices', 'knowledge'],
  funLab: ['fun', 'fun lab', 'lab', '3d', 'animation', 'games', 'puzzles', 'cyber', 'simulator', 'chaos', 'experiments', 'interactive', 'play'],
  auth: ['login', 'sign in', 'register', 'sign up', 'account', 'auth', 'authentication', 'logout', 'password', 'google', 'github', 'oauth', 'token', 'jwt token', 'session', 'user'],
  contact: ['contact', 'reach', 'email', 'message', 'get in touch', 'hire', 'work with', 'collaborate', 'project', 'quote', 'build'],
  blog: ['blog', 'articles', 'posts', 'read', 'writing', 'tutorials', 'guides', 'content'],
  products: ['products', 'services', 'offerings', 'saas', 'platform', 'buy', 'pricing', 'plans', 'packages'],
  projects: ['projects', 'portfolio', 'case studies', 'work', 'examples', 'showcase', 'built'],
  security: ['security', 'secure', 'safe', 'protection', 'encrypt', 'decrypt', 'hack', 'vulnerability', 'owasp', 'penetration', 'pentest', 'threat', 'rate limit', 'bcrypt'],
  navigation: ['where', 'how to', 'navigate', 'find', 'go to', 'page', 'link', 'url', 'route', 'path', 'access'],
  help: ['help', 'support', 'assist', 'guide', 'how', 'what can', 'what do', 'confused', 'lost', 'stuck', 'issue', 'problem'],
  mpesa: ['mpesa', 'm-pesa', 'payment', 'payments', 'mobile money', 'kenya payments', 'african payments', 'fintech', 'pay', 'how to pay', 'how do i pay', 'billing', 'invoice', 'cost', 'pricing', 'price', 'rates', 'charge', 'fee', 'fees'],
  workingHours: ['working hours', 'hours', 'open', 'available', 'availability', 'schedule', 'office hours', 'business hours', 'timezone', 'response time', 'reply time', 'when are you'],
  location: ['location', 'where are you', 'where is codevra', 'address', 'office', 'based', 'situated', 'nairobi', 'kenya', 'country', 'city'],
  techStack: ['stack', 'tech stack', 'technology', 'react', 'node', 'nodejs', 'express', 'mongodb', 'tailwind', 'vite', 'framer', 'motion', 'typescript', 'docker', 'vercel', 'railway'],
};

export function detectIntent(message) {
  const lower = message.toLowerCase();
  const matched = [];

  for (const [intent, words] of Object.entries(VOCABULARY)) {
    if (words.some(w => lower.includes(w))) {
      matched.push(intent);
    }
  }

  return matched.length > 0 ? matched : ['help'];
}

export function generateResponse(message) {
  const intents = detectIntent(message);
  const lower = message.toLowerCase();

  // Greetings
  if (intents.includes('greetings')) {
    return `Hey there! 👋 Welcome to **Codevra HQ** — your African-built developer ecosystem.\n\nI can help you with:\n- 🛠️ **Developer Tools Hub** — 18+ tools (JWT, hash, Base64, regex, and more)\n- 🔒 **Secure Vault** — encrypted note storage\n- ⚔️ **Coding Arena** — challenges and practice\n- 📈 **Learning Tracker** — track courses and skills\n- 🌐 **Startup Network** — connect with founders\n- 📖 **Blog** — 160+ technical articles\n- 📦 **Products & Services**\n\nWhat would you like to explore?`;
  }

  // Farewells
  if (intents.includes('farewells')) {
    return `Goodbye! 👋 Come back anytime — Codevra HQ is always here. Keep building! 🚀`;
  }

  // Thanks
  if (intents.includes('thanks')) {
    return `You're welcome! 😊 Is there anything else I can help you with on Codevra HQ?`;
  }

  // Location
  if (intents.includes('location')) {
    return `**Codevra Location** \ud83d\udccd\n\n\ud83c\uddf0\ud83c\uddea Based in **Nairobi, Kenya**\n\nWe operate **fully remotely** and work with clients across Africa and globally.\n\n\ud83c\udf0d **Timezone:** East Africa Time (EAT) \u2014 UTC+3\n\ud83d\udce7 **Email:** codevradevs@gmail.com\n\ud83d\udc49 [Contact us](/contact) for any inquiries.`;
  }

  // Working Hours
  if (intents.includes('workingHours')) {
    return `**Codevra Working Hours** \ud83d\udd50\n\n\ud83d\udcc5 **Monday \u2013 Friday:** 8:00 AM \u2013 6:00 PM (EAT, UTC+3)\n\ud83d\udcc5 **Saturday:** 9:00 AM \u2013 2:00 PM (EAT)\n\ud83d\udcc5 **Sunday:** Closed\n\n\u26a1 We typically respond within **24 hours** on business days.\n\n\ud83d\udce7 Email us anytime at **codevradevs@gmail.com**\n\ud83d\udc49 [Contact us](/contact) to start a conversation.`;
  }

  // About Codevra
  if (intents.includes('about') && !intents.includes('tools')) {
    return `**Codevra HQ** is a full developer ecosystem and digital agency built in **Kenya 🇰🇪**.\n\n**Mission:** Building African Tech Futures — closing the gap in African tech infrastructure.\n\n**What makes Codevra different:**\n- 🛡️ Security-First Architecture (OWASP standards)\n- 🌍 African Infrastructure Focus (M-Pesa, local-first)\n- 🏗️ Real Systems, Not Tutorials\n- 🔗 Ecosystem Thinking — interconnected products\n\n**Stats:**\n- 310+ Platform Modules\n- 110+ Services\n- 160+ Blog Posts\n- 140+ Dev Tips\n\nWant to know about a specific section? Try asking about the **Tools Hub**, **Vault**, **Arena**, or **Products**.`;
  }

  // Developer Tools Hub
  if (intents.includes('tools')) {
    const toolNames = SITE_KNOWLEDGE.ecosystem.tools.tools.map(t => `• **${t.name}** — ${t.description}`).join('\n');
    // Check if asking about a specific tool
    const specificTool = SITE_KNOWLEDGE.ecosystem.tools.tools.find(t =>
      lower.includes(t.id) || lower.includes(t.name.toLowerCase())
    );
    if (specificTool) {
      return `**${specificTool.name}**\n\n${specificTool.description}\n\nCategory: ${specificTool.category}\n\n👉 Find it at [/hub/tools](/hub/tools) — click "${specificTool.name}" in the toolbar.`;
    }
    return `**Developer Tools Hub** — [/hub/tools](/hub/tools)\n\nAll tools run **client-side** — no data ever leaves your browser.\n\n${toolNames}\n\n👉 Visit [/hub/tools](/hub/tools) to start using them!`;
  }

  // Vault
  if (intents.includes('vault')) {
    return `**Secure Vault** — [/hub/vault](/hub/vault)\n\nYour personal encrypted note storage.\n\n**Features:**\n- 🔐 AES-256 encryption\n- 📁 Folder organization (Credentials, Security Research, Code Snippets, Research)\n- 🏷️ Tag support\n- 🔍 Search notes\n- 📝 Markdown support\n- 💻 Code snippet storage\n\n⚠️ **Requires login** — [Sign in here](/auth/login) or [Register](/auth/register) to access your vault.`;
  }

  // Arena
  if (intents.includes('arena')) {
    return `**Coding Arena** — [/hub/arena](/hub/arena)\n\nPractice your coding skills with real challenges.\n\n**Features:**\n- ⚔️ Coding challenges\n- 📤 Submission system\n- 📊 Submission history\n\n⚠️ **Requires login** — [Sign in](/auth/login) to start competing!`;
  }

  // Tracker
  if (intents.includes('tracker')) {
    return `**Learning Tracker** — [/hub/tracker](/hub/tracker)\n\nTrack your developer growth journey.\n\n**Features:**\n- 📚 Course tracking\n- 🏆 Certification tracking\n- 🧠 Skill tracking\n- 📈 Progress management\n\n⚠️ **Requires login** — [Sign in](/auth/login) to track your learning.`;
  }

  // Network
  if (intents.includes('network')) {
    return `**Startup Network** — [/hub/network](/hub/network)\n\nConnect with developers and founders in the Codevra ecosystem.\n\n**Features:**\n- 👤 Developer & startup profiles\n- 🤝 Connections\n- 🔍 Network discovery\n\n⚠️ **Requires login** — [Sign in](/auth/login) to join the network.`;
  }

  // Dev Intel / Tips
  if (intents.includes('devIntel')) {
    return `**Dev Intel** — [/hub/tips](/hub/tips)\n\n140+ curated developer tips, insights, and best practices.\n\nTopics include security, systems architecture, African tech, and more. No login required!`;
  }

  // Fun Lab
  if (intents.includes('funLab')) {
    const labs = SITE_KNOWLEDGE.ecosystem.funLab.subPages.map(p => `• **${p.title}** ([${p.path}](${p.path})) — ${p.description}`).join('\n');
    return `**Fun Lab** — [/fun-lab](/fun-lab)\n\nInteractive experiments and developer experiences.\n\n${labs}`;
  }

  // Auth / Login / Register
  if (intents.includes('auth')) {
    return `**Authentication on Codevra HQ**\n\n**Login:** [/auth/login](/auth/login)\n**Register:** [/auth/register](/auth/register)\n\n**Supported methods:**\n- 📧 Email & password\n- 🔵 Google OAuth\n- ⚫ GitHub OAuth\n\n**Security:**\n- JWT access tokens (15 min expiry)\n- Refresh tokens (7 day expiry)\n- Passwords hashed with bcryptjs\n\n**Protected features** (require login): Vault, Arena, Tracker, Network.`;
  }

  // Contact
  if (intents.includes('contact')) {
    return `**Contact Codevra** — [/contact](/contact)\n\n📧 Email: **codevradevs@gmail.com**\n\nUse the contact form to:\n- Start a project\n- Request a quote\n- Collaborate\n- Ask about services\n\nOr visit the [Products page](/products) to see available services.`;
  }

  // Blog
  if (intents.includes('blog')) {
    return `**Codevra Blog** — [/blog](/blog)\n\n160+ technical articles covering:\n- Security & cryptography\n- Systems architecture\n- African tech & M-Pesa\n- Developer tools & tips\n- Backend & frontend development\n\nVisit [/blog](/blog) to browse all posts.`;
  }

  // Products
  if (intents.includes('products')) {
    return `**Codevra Products & Services** — [/products](/products)\n\nCodevra builds secure, scalable digital systems for:\n- 🚀 **Startups** — secure MVPs with M-Pesa integration\n- 🏢 **Founders** — full system architecture\n- 👨‍💻 **Developers** — tooling and education\n\nVisit [/products](/products) for the full catalog, or [contact us](/contact) to discuss your project.`;
  }

  // Projects / Portfolio
  if (intents.includes('projects')) {
    return `**Projects & Case Studies** — [/projects](/projects)\n\nReal-world systems built by Codevra. Browse the portfolio to see production-grade architectures, security implementations, and African tech solutions.\n\n👉 Visit [/projects](/projects)`;
  }

  // Security
  if (intents.includes('security')) {
    return `**Security at Codevra**\n\nSecurity is a first-class citizen — not an afterthought.\n\n**Practices:**\n${SITE_KNOWLEDGE.security.features.map(f => `• ${f}`).join('\n')}\n\n**Methodology:**\n${SITE_KNOWLEDGE.general.methodology.map(m => `• ${m}`).join('\n')}`;
  }

  // M-Pesa / Payments
  if (intents.includes('mpesa')) {
    return `**Payments & Billing** 💳\n\n**Accepted payment methods:**\n- 📱 **M-Pesa** (preferred for Kenyan clients)\n- 🏦 Bank Transfer\n- 💻 PayPal / international transfers\n\n**How it works:**\n1. Discuss your project via [contact form](/contact)\n2. Receive a custom quote\n3. Agree on milestones & payment schedule\n4. Pay per milestone or upfront (project-dependent)\n\nWe also **build** M-Pesa integrations for your products — STK Push, M-Pesa API, and African payment rails.\n\n📧 Questions? Email **codevradevs@gmail.com** or [contact us](/contact).`;
  }

  // Tech Stack
  if (intents.includes('techStack')) {
    const { frontend, backend, security, devops } = SITE_KNOWLEDGE.general.techStack;
    return `**Codevra Tech Stack**\n\n🎨 **Frontend:** ${frontend.join(', ')}\n⚙️ **Backend:** ${backend.join(', ')}\n🔐 **Security:** ${security.join(', ')}\n🚀 **DevOps:** ${devops.join(', ')}`;
  }

  // Navigation help
  if (intents.includes('navigation')) {
    return `**Navigating Codevra HQ**\n\n**Main Pages:**\n- [Home](/)\n- [About](/about)\n- [Products](/products)\n- [Projects](/projects)\n- [Blog](/blog)\n- [Contact](/contact)\n\n**Ecosystem (Dropdown):**\n- [Dev Tools](/hub/tools)\n- [Vault](/hub/vault) 🔒\n- [Arena](/hub/arena) 🔒\n- [Tracker](/hub/tracker) 🔒\n- [Network](/hub/network) 🔒\n- [Dev Intel](/hub/tips)\n- [Fun Lab](/fun-lab)\n\n🔒 = Requires login`;
  }

  // General help
  return `I'm the **Codevra HQ Assistant** 🤖\n\nHere's what I can help you with:\n\n- 🏠 **Site overview** — ask "what is Codevra?"\n- 🛠️ **Tools** — ask "what tools are available?"\n- 🔒 **Vault** — ask "how does the vault work?"\n- ⚔️ **Arena** — ask "what is the coding arena?"\n- 📈 **Tracker** — ask "how do I track my learning?"\n- 🌐 **Network** — ask "how do I join the network?"\n- 🔐 **Auth** — ask "how do I login?"\n- 📞 **Contact** — ask "how do I contact Codevra?"\n- 🛡️ **Security** — ask "how is security handled?"\n- 💳 **M-Pesa** — ask "does Codevra support M-Pesa?"\n\nWhat would you like to know?`;
}
