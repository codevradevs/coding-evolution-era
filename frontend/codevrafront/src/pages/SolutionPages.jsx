import ServiceLandingPage from '../components/ServiceLandingPage';

const solutions = {
  education: {
    tag: 'Solutions · Education',
    headline: 'Software Built for Schools, Colleges & EdTech',
    subheadline: 'Move your institution off spreadsheets and paper.',
    description: 'Student management, fee collection, results portals, e-learning platforms, and parent communication systems — built for how schools actually work.',
    benefits: [
      { icon: '🏫', title: 'Student Management', desc: 'Enrolment, attendance, results, and parent portals in one system.' },
      { icon: '💳', title: 'Fee Collection', desc: 'Online fee payment with automated receipts and arrears tracking.' },
      { icon: '📚', title: 'E-Learning', desc: 'Course builder, quizzes, certificates, and progress tracking.' },
      { icon: '📊', title: 'Admin Dashboard', desc: 'Real-time visibility into enrolment, finances, and performance.' },
      { icon: '📱', title: 'Mobile App', desc: 'Parent and student apps for results, notices, and communication.' },
      { icon: '🔐', title: 'Secure & Compliant', desc: 'Student data protected with role-based access and audit logs.' },
    ],
    faqs: [
      { q: 'Can you build a system for our specific school structure?', a: 'Yes. We build custom — not off-the-shelf. Your system will match your actual workflows.' },
      { q: 'How long does a school management system take?', a: 'A core system (students, fees, results) takes 6–10 weeks. Full platforms with e-learning take 3–5 months.' },
    ],
    cta: { heading: 'Ready to modernise your institution?', sub: 'Tell us your current pain points. We\'ll design a system around them.', button: 'Start the Conversation' },
  },
  healthcare: {
    tag: 'Solutions · Healthcare',
    headline: 'Digital Systems for Clinics, Hospitals & Health Startups',
    subheadline: 'Patient management, appointments, and records — done right.',
    description: 'We build healthcare software that improves patient experience and reduces administrative burden — from appointment booking to queue management.',
    benefits: [
      { icon: '🏥', title: 'Patient Records', desc: 'Secure electronic health records with role-based access.' },
      { icon: '📅', title: 'Appointment Booking', desc: 'Online booking with automated reminders and queue management.' },
      { icon: '💊', title: 'Pharmacy Module', desc: 'Inventory, dispensing, and billing in one system.' },
      { icon: '📊', title: 'Analytics', desc: 'Patient flow, revenue, and clinical outcome dashboards.' },
      { icon: '🔐', title: 'HIPAA-Aware', desc: 'Data encryption, audit trails, and access controls.' },
      { icon: '📱', title: 'Patient App', desc: 'Mobile app for bookings, results, and communication.' },
    ],
    faqs: [
      { q: 'Is patient data secure?', a: 'Yes. We implement encryption at rest and in transit, role-based access, and full audit logging.' },
      { q: 'Can you integrate with existing lab or billing systems?', a: 'Yes. We build custom API integrations with most existing healthcare systems.' },
    ],
    cta: { heading: 'Ready to digitise your healthcare facility?', sub: 'Let\'s talk about your patient management challenges.', button: 'Book a Consultation' },
  },
  retail: {
    tag: 'Solutions · Retail & E-Commerce',
    headline: 'E-Commerce & Retail Management Systems',
    subheadline: 'Sell online. Manage inventory. Grow revenue.',
    description: 'Custom e-commerce platforms, POS systems, inventory management, and multi-channel retail solutions built for how your business actually operates.',
    benefits: [
      { icon: '🛒', title: 'E-Commerce Store', desc: 'Custom online store with product management, cart, and checkout.' },
      { icon: '💳', title: 'Payment Integration', desc: 'Stripe, PayPal, and local payment methods.' },
      { icon: '📦', title: 'Inventory Management', desc: 'Real-time stock tracking across locations.' },
      { icon: '📊', title: 'Sales Analytics', desc: 'Revenue, top products, and customer behaviour dashboards.' },
      { icon: '🚚', title: 'Order Management', desc: 'Order tracking, fulfilment, and delivery integration.' },
      { icon: '📱', title: 'Mobile Commerce', desc: 'iOS and Android shopping apps for your customers.' },
    ],
    faqs: [
      { q: 'Should I use Shopify or a custom build?', a: 'Shopify is great for standard retail. Custom builds make sense when you have unique workflows, complex inventory, or need deep integrations.' },
      { q: 'Can you integrate with my existing POS?', a: 'Yes. We build API integrations with most POS and ERP systems.' },
    ],
    cta: { heading: 'Ready to grow your retail business online?', sub: 'Tell us about your products and how you currently sell.', button: 'Start Your Store' },
  },
  finance: {
    tag: 'Solutions · Finance & Fintech',
    headline: 'Fintech Products & Financial Management Systems',
    subheadline: 'Payment platforms, dashboards, and financial automation.',
    description: 'We build fintech products and financial management tools — from payment dashboards to lending platforms — with security and compliance at the core.',
    benefits: [
      { icon: '💳', title: 'Payment Systems', desc: 'Custom payment processing with Stripe, PayPal, and local rails.' },
      { icon: '📊', title: 'Financial Dashboards', desc: 'Real-time revenue, expense, and cash flow visibility.' },
      { icon: '🔐', title: 'Security First', desc: 'PCI-aware architecture, encryption, and fraud detection.' },
      { icon: '🤖', title: 'Automation', desc: 'Automated invoicing, reconciliation, and reporting.' },
      { icon: '📱', title: 'Mobile Wallet', desc: 'Mobile payment and wallet features for consumer apps.' },
      { icon: '📋', title: 'Compliance Ready', desc: 'Audit logs, access controls, and data retention policies.' },
    ],
    faqs: [
      { q: 'Can you build a lending or SACCO platform?', a: 'Yes. We have experience building loan management, repayment tracking, and member management systems.' },
      { q: 'How do you handle payment security?', a: 'We use tokenisation, never store raw card data, and follow PCI DSS guidelines for all payment integrations.' },
    ],
    cta: { heading: 'Building a fintech product?', sub: 'Security and compliance are non-negotiable. Let\'s build it right.', button: 'Start Your Fintech Project' },
  },
  logistics: {
    tag: 'Solutions · Logistics & Transport',
    headline: 'Logistics & Fleet Management Software',
    subheadline: 'Real-time tracking, dispatch, and delivery management.',
    description: 'We build logistics platforms that reduce delays, improve driver management, and give operations teams real-time visibility into every delivery.',
    benefits: [
      { icon: '🚚', title: 'Real-Time Tracking', desc: 'Live GPS tracking for drivers and deliveries.' },
      { icon: '📋', title: 'Dispatch Management', desc: 'Assign, track, and manage orders from a central dashboard.' },
      { icon: '🗺️', title: 'Route Optimisation', desc: 'Reduce fuel costs and delivery times with smart routing.' },
      { icon: '📱', title: 'Driver App', desc: 'Mobile app for drivers with navigation, status updates, and earnings.' },
      { icon: '📊', title: 'Analytics', desc: 'Delivery performance, driver efficiency, and cost dashboards.' },
      { icon: '💳', title: 'Payment Integration', desc: 'Cash on delivery, card, and mobile payment support.' },
    ],
    faqs: [
      { q: 'Can you build something like Uber for logistics?', a: 'Yes. We\'ve built on-demand delivery platforms with real-time tracking, driver management, and customer apps.' },
      { q: 'How long does a logistics platform take?', a: 'A core dispatch and tracking system takes 8–12 weeks. Full on-demand platforms with driver and customer apps take 4–6 months.' },
    ],
    cta: { heading: 'Ready to modernise your logistics operations?', sub: 'Tell us your current dispatch and tracking challenges.', button: 'Start Your Logistics Project' },
  },
  startups: {
    tag: 'Solutions · Startups',
    headline: 'Technical Co-Founder for Your Startup',
    subheadline: 'We build your MVP. You focus on the business.',
    description: 'We work with early-stage founders to scope, design, and build their first product — fast, secure, and at a price that makes sense for a startup.',
    benefits: [
      { icon: '🚀', title: 'Fast MVP', desc: 'Working product in 4–8 weeks, not 6 months.' },
      { icon: '💰', title: 'Startup Pricing', desc: 'Transparent, milestone-based pricing that fits early-stage budgets.' },
      { icon: '🔐', title: 'Production-Ready', desc: 'Not a prototype — a real system you can show investors and users.' },
      { icon: '📈', title: 'Built to Scale', desc: 'Architecture that won\'t need a full rewrite when you grow.' },
      { icon: '🤝', title: 'Strategic Input', desc: 'We\'ll tell you what to build first — and what to skip.' },
      { icon: '🔌', title: 'Full Stack', desc: 'Web, mobile, API, payments, auth — everything your MVP needs.' },
    ],
    faqs: [
      { q: 'I have an idea but no technical background. Can you help?', a: 'Yes. We work with non-technical founders regularly. We\'ll help you scope the MVP, choose the right tech, and build it.' },
      { q: 'What\'s the minimum budget for a startup MVP?', a: 'A focused web MVP starts from $800. Mobile apps start from $1,500. We\'ll be honest about what\'s achievable at your budget.' },
      { q: 'Can you help us raise investment?', a: 'We can build the product that helps you raise. We also help with technical due diligence documentation.' },
    ],
    cta: { heading: 'Ready to build your startup?', sub: 'Tell us your idea. We\'ll help you figure out what to build first.', button: 'Let\'s Build Your MVP' },
  },
};

export function EducationSolutionPage() { return <ServiceLandingPage service={solutions.education} />; }
export function HealthcareSolutionPage() { return <ServiceLandingPage service={solutions.healthcare} />; }
export function RetailSolutionPage() { return <ServiceLandingPage service={solutions.retail} />; }
export function FinanceSolutionPage() { return <ServiceLandingPage service={solutions.finance} />; }
export function LogisticsSolutionPage() { return <ServiceLandingPage service={solutions.logistics} />; }
export function StartupsSolutionPage() { return <ServiceLandingPage service={solutions.startups} />; }
