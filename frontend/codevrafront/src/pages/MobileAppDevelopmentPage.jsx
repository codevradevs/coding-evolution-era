import ServiceLandingPage from '../components/ServiceLandingPage';

const data = {
  tag: 'Mobile App Development',
  headline: 'Android & iOS Apps Built Around Your Business',
  subheadline: 'Native and cross-platform mobile apps that your customers will actually use.',
  description: 'We build mobile applications designed around real user workflows — not just ported websites. From MVPs to full-scale consumer apps.',
  benefits: [
    { icon: '📱', title: 'Native Performance', desc: 'React Native and Flutter apps that feel native on both iOS and Android.' },
    { icon: '🔐', title: 'Secure Auth', desc: 'Biometric login, JWT sessions, and encrypted local storage.' },
    { icon: '🔔', title: 'Push Notifications', desc: 'Real-time alerts that keep users engaged and informed.' },
    { icon: '💳', title: 'Payment Ready', desc: 'Stripe, PayPal, and local payment integrations built in.' },
    { icon: '📊', title: 'Analytics Built In', desc: 'Track user behaviour, crashes, and performance from day one.' },
    { icon: '🏪', title: 'App Store Ready', desc: 'We handle the submission process for both Google Play and Apple App Store.' },
  ],
  process: [
    { title: 'UX Design', desc: 'Wireframes and user flows before a single line of code.' },
    { title: 'Development', desc: 'Cross-platform build with platform-specific polish.' },
    { title: 'Testing', desc: 'Device testing, performance profiling, and security review.' },
    { title: 'Launch', desc: 'App store submission, monitoring, and post-launch support.' },
  ],
  faqs: [
    { q: 'React Native or Flutter?', a: 'Both are excellent. We recommend React Native for teams with existing JS knowledge, Flutter for pixel-perfect UI requirements.' },
    { q: 'How much does a mobile app cost?', a: 'A focused MVP starts from $620. Full-featured consumer apps range from $2,300 to $15,000+ depending on complexity.' },
    { q: 'Do you build for both iOS and Android?', a: 'Yes. Our cross-platform approach means one codebase, both platforms, at a fraction of the cost of two native apps.' },
  ],
  cta: { heading: 'Ready to launch your mobile app?', sub: 'Tell us your idea. We\'ll help you figure out the right scope and budget.', button: 'Start Your App' },
};

export default function MobileAppDevelopmentPage() {
  return <ServiceLandingPage service={data} />;
}
