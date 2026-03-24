const express = require('express');
const { ServiceQuote } = require('../models');
const { sendServiceQuoteEmail, sendWhatsAppNotification } = require('../utils/mailer');
const { quoteLimiter, sanitizeString, isValidEmail } = require('../middleware/security');

const router = express.Router();

// GET /api/services
router.get('/', (req, res) => {
  res.json({ services: serviceData });
});

// POST /api/services/quote
router.post('/quote', quoteLimiter, async (req, res) => {
  try {
    const { name, email, company, serviceTitle, serviceCategory, requirements, proposal } = req.body;

    if (!name || !email || !serviceTitle || !serviceCategory || !requirements || !proposal) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }
    if (typeof name !== 'string' || typeof email !== 'string' || typeof requirements !== 'string') {
      return res.status(400).json({ error: 'Invalid field types.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const cleanName = sanitizeString(name, 100);
    const cleanEmail = sanitizeString(email, 200).toLowerCase();
    const cleanCompany = sanitizeString(company || '', 100);
    const cleanTitle = sanitizeString(serviceTitle, 200);
    const cleanCategory = sanitizeString(serviceCategory, 100);
    const cleanRequirements = sanitizeString(requirements, 5000);
    const cleanProposal = sanitizeString(proposal, 10000);

    if (!cleanName || !cleanRequirements) return res.status(400).json({ error: 'Invalid input.' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
    const userAgent = (req.headers['user-agent'] || '').substring(0, 300);

    const quote = await ServiceQuote.create({
      name: cleanName, email: cleanEmail, company: cleanCompany,
      serviceTitle: cleanTitle, serviceCategory: cleanCategory,
      requirements: cleanRequirements, proposal: cleanProposal,
      ip, userAgent,
    });

    sendServiceQuoteEmail({
      name: quote.name, email: quote.email, company: quote.company,
      serviceTitle: quote.serviceTitle, requirements: quote.requirements, proposal: quote.proposal,
    }).catch(err => console.error('[mailer] Service quote email failed:', err.message));

    sendWhatsAppNotification(
      `💼 *New Quote — Codevra*\n\n` +
      `*Service:* ${quote.serviceTitle}\n` +
      `*Name:* ${quote.name}\n` +
      `*Email:* ${quote.email}\n` +
      `*Company:* ${quote.company || 'N/A'}\n\n` +
      `*Requirements:*\n${quote.requirements.substring(0, 300)}${quote.requirements.length > 300 ? '...' : ''}`
    ).catch(err => console.error('[whatsapp] Service quote WhatsApp failed:', err.message));

    res.status(201).json({ message: 'Quote submitted successfully.', id: quote._id });
  } catch (error) {
    console.error('[services/quote]', error.message);
    res.status(500).json({ error: 'Failed to submit quote.' });
  }
});

// ─── Static service data (single source of truth) ────────────────────────────

const serviceData = {
  web: [
    {
      id: 'web-basic',
      icon: '🪶', title: 'Basic Website', tag: 'Most Popular', category: 'Web',
      desc: 'Landing pages, portfolios, and small business sites.',
      features: ['Responsive design', 'Contact form', 'SEO ready', 'Fast loading'],
      price: 'KES 10,000', range: '10K – 50K',
    },
    {
      id: 'web-dynamic',
      icon: '⚙️', title: 'Dynamic Website', tag: null, category: 'Web',
      desc: 'CMS-powered sites you can manage yourself.',
      features: ['Blog / CMS', 'Admin dashboard', 'Content updates', 'SEO optimized'],
      price: 'KES 30,000', range: '30K – 120K',
    },
    {
      id: 'web-corporate',
      icon: '🏢', title: 'Corporate Website', tag: null, category: 'Web',
      desc: 'Professional multi-page sites for serious businesses.',
      features: ['Multi-page layout', 'Booking system', 'Brand-focused UI', 'Analytics'],
      price: 'KES 50,000', range: '50K – 200K',
    },
    {
      id: 'web-ecommerce',
      icon: '🛒', title: 'E-Commerce Website', tag: 'High Demand', category: 'Web',
      desc: 'Full online store with M-Pesa & card payments.',
      features: ['Product catalog', 'Cart & checkout', 'M-Pesa integration', 'Order management'],
      price: 'KES 60,000', range: '60K – 500K',
    },
    {
      id: 'web-app',
      icon: '🧠', title: 'Custom Web App', tag: 'Enterprise', category: 'Web',
      desc: 'SaaS platforms, dashboards, and complex systems.',
      features: ['Custom backend', 'User auth', 'API integrations', 'Scalable architecture'],
      price: 'KES 150,000', range: '150K – 1.5M+',
    },
    {
      id: 'web-uiux',
      icon: '🎨', title: 'UI/UX Design', tag: null, category: 'Web',
      desc: 'Figma wireframes, prototypes, and UX audits.',
      features: ['Wireframing', 'Prototype design', 'UX audit', 'Design system'],
      price: 'KES 10,000', range: '10K – 150K',
    },
    {
      id: 'web-hosting',
      icon: '🚀', title: 'Hosting & Deployment', tag: null, category: 'Web',
      desc: 'Domain, hosting, SSL, and cloud deployment setup.',
      features: ['Domain setup', 'VPS / cloud hosting', 'SSL certificate', 'Backup config'],
      price: 'KES 5,000', range: '5K – 50K',
    },
    {
      id: 'web-seo',
      icon: '📊', title: 'SEO & Analytics', tag: 'Recurring', category: 'Web',
      desc: 'Get found on Google and track your traffic.',
      features: ['Keyword optimization', 'Technical SEO', 'Google Analytics', 'Conversion tracking'],
      price: 'KES 10,000', range: '10K – 80K/mo',
    },
    {
      id: 'web-security',
      icon: '🔐', title: 'Website Security', tag: null, category: 'Web',
      desc: 'Vulnerability testing and hardening for your site.',
      features: ['Vulnerability scan', 'Admin protection', 'API security', 'Security report'],
      price: 'KES 15,000', range: '15K – 150K',
    },
    {
      id: 'web-redesign',
      icon: '🔁', title: 'Website Redesign', tag: null, category: 'Web',
      desc: 'Overhaul outdated or underperforming websites.',
      features: ['UI overhaul', 'Speed optimization', 'UX improvements', 'Mobile-first'],
      price: 'KES 30,000', range: '30K – 200K',
    },
    {
      id: 'web-ai',
      icon: '🤖', title: 'AI & Automation', tag: 'Trending', category: 'Web',
      desc: 'Chatbots, AI integrations, and workflow automation.',
      features: ['AI chatbot', 'Smart recommendations', 'Zapier / Make', 'CRM automation'],
      price: 'KES 20,000', range: '20K – 500K',
    },
    {
      id: 'web-maintenance',
      icon: '🛠', title: 'Web Maintenance', tag: 'Recurring', category: 'Web',
      desc: 'Keep your site fast, secure, and up to date.',
      features: ['Bug fixes', 'Content updates', 'Performance monitoring', 'Security patches'],
      price: 'KES 3,000/mo', range: '3K – 30K/mo',
    },
  ],
  app: [
    {
      id: 'app-mvp',
      icon: '🪶', title: 'Basic App (MVP)', tag: 'Best for Startups', category: 'Mobile',
      desc: 'Test your idea fast with a minimal viable product.',
      features: ['Simple UI', 'Core functionality', 'Android & iOS', 'Fast delivery'],
      price: 'KES 80,000', range: '80K – 250K',
    },
    {
      id: 'app-business',
      icon: '🧾', title: 'Business App', tag: null, category: 'Mobile',
      desc: 'Full-featured apps for real operations.',
      features: ['Auth system', 'User dashboard', 'API integrations', 'Admin panel'],
      price: 'KES 150,000', range: '150K – 750K',
    },
    {
      id: 'app-ecommerce',
      icon: '🛒', title: 'E-Commerce App', tag: 'High Demand', category: 'Mobile',
      desc: 'Sell directly from mobile with M-Pesa.',
      features: ['Product browsing', 'M-Pesa payments', 'Push notifications', 'Order tracking'],
      price: 'KES 250,000', range: '250K – 1.5M',
    },
    {
      id: 'app-ondemand',
      icon: '🚚', title: 'On-Demand App', tag: null, category: 'Mobile',
      desc: 'Real-time delivery and service platforms.',
      features: ['GPS tracking', 'Multi-user roles', 'Live updates', 'Payment processing'],
      price: 'KES 300,000', range: '300K – 1M+',
    },
    {
      id: 'app-fintech',
      icon: '💳', title: 'Fintech App', tag: 'Enterprise', category: 'Mobile',
      desc: 'Secure wallets, payments, and financial tools.',
      features: ['Wallet system', 'M-Pesa API', 'Transaction history', 'Bank-level security'],
      price: 'KES 120,000', range: '120K – 2M+',
    },
    {
      id: 'app-marketplace',
      icon: '🌐', title: 'Marketplace / Social', tag: null, category: 'Mobile',
      desc: 'Platforms built for engagement and scale.',
      features: ['User profiles', 'Messaging', 'Content feeds', 'Scalable backend'],
      price: 'KES 300,000', range: '300K – 2M+',
    },
    {
      id: 'app-uiux',
      icon: '🎨', title: 'Mobile UI/UX Design', tag: null, category: 'Mobile',
      desc: 'App interface design and user journey mapping.',
      features: ['App UI design', 'User journey map', 'Figma prototype', 'Interaction design'],
      price: 'KES 15,000', range: '15K – 100K',
    },
    {
      id: 'app-backend',
      icon: '📡', title: 'Backend & API Dev', tag: null, category: 'Mobile',
      desc: 'Robust backends powering your mobile app.',
      features: ['REST APIs', 'Auth systems', 'Real-time features', 'Cloud backend'],
      price: 'KES 50,000', range: '50K – 400K',
    },
    {
      id: 'app-publish',
      icon: '🚀', title: 'App Store Publishing', tag: null, category: 'Mobile',
      desc: 'Get your app live on Play Store and App Store.',
      features: ['Play Store setup', 'App Store (iOS)', 'ASO optimization', 'Compliance review'],
      price: 'KES 5,000', range: '5K – 30K',
    },
    {
      id: 'app-security',
      icon: '🔐', title: 'Mobile App Security', tag: null, category: 'Mobile',
      desc: 'Secure auth, encrypted data, and API protection.',
      features: ['Secure auth', 'Data encryption', 'API protection', 'Security audit'],
      price: 'KES 20,000', range: '20K – 150K',
    },
    {
      id: 'app-ai',
      icon: '🤖', title: 'AI in Mobile Apps', tag: 'Trending', category: 'Mobile',
      desc: 'Smart features that make your app stand out.',
      features: ['AI chatbot', 'Smart recommendations', 'Automation', 'Personalization'],
      price: 'KES 30,000', range: '30K – 500K',
    },
    {
      id: 'app-maintenance',
      icon: '🛠', title: 'App Maintenance', tag: 'Recurring', category: 'Mobile',
      desc: 'Keep your app running smoothly post-launch.',
      features: ['Bug fixes', 'Version updates', 'Performance monitoring', 'OS compatibility'],
      price: 'KES 5,000/mo', range: '5K – 30K/mo',
    },
  ],
  growth: [
    {
      id: 'growth-mpesa',
      icon: '🔌', title: 'M-Pesa Integration', tag: 'Most Requested', category: 'Growth',
      desc: 'STK Push, C2B, B2C — full Daraja API setup.',
      features: ['STK Push', 'C2B / B2C', 'Transaction callbacks', 'Testing sandbox'],
      price: 'KES 15,000', range: '15K – 60K',
    },
    {
      id: 'growth-analytics',
      icon: '📊', title: 'Analytics Dashboard', tag: null, category: 'Growth',
      desc: 'Custom dashboards with real business insights.',
      features: ['Custom charts', 'KPI tracking', 'Export reports', 'Admin access'],
      price: 'KES 20,000', range: '20K – 150K',
    },
    {
      id: 'growth-pentest',
      icon: '🔐', title: 'Penetration Testing', tag: 'High Value', category: 'Growth',
      desc: 'Find vulnerabilities before hackers do.',
      features: ['API pen testing', 'Auth bypass testing', 'Injection testing', 'Full report'],
      price: 'KES 30,000', range: '30K – 300K',
    },
    {
      id: 'growth-architecture',
      icon: '🧠', title: 'System Architecture', tag: null, category: 'Growth',
      desc: 'Tech stack consulting and scalability planning.',
      features: ['Stack selection', 'DB design', 'Scaling strategy', 'Architecture docs'],
      price: 'KES 20,000', range: '20K – 200K',
    },
    {
      id: 'growth-marketing',
      icon: '📣', title: 'Digital Marketing Setup', tag: null, category: 'Growth',
      desc: 'Analytics, pixels, and conversion tracking.',
      features: ['Google Analytics', 'Facebook Pixel', 'Conversion tracking', 'Tag Manager'],
      price: 'KES 5,000', range: '5K – 30K',
    },
    {
      id: 'growth-api',
      icon: '🔗', title: 'API Integrations', tag: null, category: 'Growth',
      desc: 'Connect your system to any third-party service.',
      features: ['Payment gateways', 'SMS / email APIs', 'CRM integrations', 'Webhooks'],
      price: 'KES 10,000', range: '10K – 200K',
    },
    {
      id: 'growth-performance',
      icon: '⚡', title: 'Performance Optimization', tag: null, category: 'Growth',
      desc: 'Speed up slow websites and apps.',
      features: ['Load time audit', 'Code optimization', 'CDN setup', 'Caching strategy'],
      price: 'KES 10,000', range: '10K – 80K',
    },
    {
      id: 'growth-saas',
      icon: '📦', title: 'SaaS Product Dev', tag: 'Enterprise', category: 'Growth',
      desc: 'Build subscription-based platforms from scratch.',
      features: ['Multi-tenant system', 'Billing & subscriptions', 'Admin dashboard', 'User roles'],
      price: 'KES 200,000', range: '200K – 2M+',
    },
  ],
};

module.exports = router;
