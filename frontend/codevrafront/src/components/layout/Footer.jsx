import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart, ExternalLink, Instagram, Facebook, Phone } from 'lucide-react';
import logo from '../../logo.png';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Developer Tools', href: '/hub/tools' },
      { label: 'Secure Vault', href: '/hub/vault' },
      { label: 'Coding Arena', href: '/hub/arena' },
      { label: 'Learning Tracker', href: '/hub/tracker' },
      { label: 'Startup Network', href: '/hub/network' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Security Blog', href: '/blog?category=security' },
      { label: 'Build Logs', href: '/blog?category=build-logs' },
      { label: 'API Docs', href: '/docs' },
      { label: 'Open Source', href: 'https://github.com/codevradevs', external: true },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/codevradevs', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/codevradevs', label: 'X' },
  { icon: Instagram, href: 'https://instagram.com/codevra_solutions', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/codevradevs', label: 'Facebook' },
  { icon: TikTokIcon, href: 'https://tiktok.com/@codevradevs', label: 'TikTok' },
  { icon: Mail, href: 'mailto:hello@codevra.co.ke', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center group mb-4">
              <img src={logo} alt="Codevra Logo" className="w-[200px] h-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-4 max-w-sm">
              Integrated Digital Solutions for Kenyan Businesses. We build intelligent and secure systems for Kenyan businesses.
            </p>
            <div className="space-y-2 mb-6">
              <a href="mailto:hello@codevra.co.ke" className="flex items-center gap-2 text-sm text-dark-400 hover:text-brand-400 transition-colors">
                <Mail className="w-4 h-4" />
                hello@codevra.co.ke
              </a>
              <a href="https://wa.me/254140710690" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-dark-400 hover:text-brand-400 transition-colors">
                <Phone className="w-4 h-4" />
                +254 140 710 690
              </a>
              <p className="text-sm text-dark-400">Nairobi, Kenya</p>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-dark-800/50 text-dark-400 hover:text-brand-400 hover:bg-dark-800 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-dark-400 hover:text-brand-400 transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-dark-400 hover:text-brand-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-dark-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-xs text-dark-500">
              © {new Date().getFullYear()} Codevra. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-xs text-dark-500 hover:text-brand-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-dark-500 hover:text-brand-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="flex items-center justify-center gap-1 text-xs text-dark-500">
            Built with <Heart className="w-3 h-3 text-red-500" /> in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
