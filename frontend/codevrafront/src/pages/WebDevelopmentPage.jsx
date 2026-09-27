import ServiceLandingPage from '../components/ServiceLandingPage';

const data = {
  tag: 'Web Development',
  headline: 'Custom Web Applications & SaaS Platforms',
  subheadline: 'We build web products that work — not just websites that look good.',
  description: 'From internal business tools to customer-facing SaaS platforms, we engineer web applications that are fast, secure, and built to scale.',
  benefits: [
    { icon: '⚡', title: 'Fast & Performant', desc: 'Sub-second load times, optimized APIs, and CDN-ready deployments.' },
    { icon: '🔐', title: 'Secure by Default', desc: 'JWT auth, rate limiting, input validation, and OWASP compliance built in.' },
    { icon: '📈', title: 'Built to Scale', desc: 'Architecture that handles 10 users or 10,000 without a rewrite.' },
    { icon: '🎨', title: 'Polished UI/UX', desc: 'Interfaces your users will actually enjoy using.' },
    { icon: '🔌', title: 'API Integrations', desc: 'Stripe, Twilio, OpenAI, Google Maps — whatever your product needs.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'MVPs in weeks, not months. Iterative delivery with real feedback.' },
  ],
  process: [
    { title: 'Discovery', desc: 'Understand your users, goals, and technical requirements.' },
    { title: 'Architecture', desc: 'Design the data model, API structure, and frontend architecture.' },
    { title: 'Build', desc: 'Full-stack development with weekly progress updates.' },
    { title: 'Launch', desc: 'Deployment, monitoring, and handover documentation.' },
  ],
  faqs: [
    { q: 'How long does a web app take to build?', a: 'A focused MVP typically takes 4–8 weeks. Larger platforms with complex workflows take 3–6 months.' },
    { q: 'What tech stack do you use?', a: 'React or Next.js on the frontend, Node.js/Express or Django on the backend, PostgreSQL or MongoDB for data. We recommend what fits your project.' },
    { q: 'Do you handle hosting and deployment?', a: 'Yes. We deploy to Vercel, Render, Railway, or AWS depending on your needs and budget.' },
  ],
  cta: { heading: 'Ready to build your web product?', sub: 'Tell us what you need. We\'ll scope it, price it, and build it.', button: 'Start Your Project' },
};

export default function WebDevelopmentPage() {
  return <ServiceLandingPage service={data} />;
}
