const generateBlogContent = (title, category) => {
  return `# ${title}

${category === 'Security' ? 'Security is not optional—it\'s the foundation of user trust.' : ''}
${category === 'African Tech' ? 'Building for Africa requires understanding unique challenges and opportunities.' : ''}
${category === 'Build Logs' ? 'Documenting the journey of building real systems in production.' : ''}

## Introduction

This comprehensive guide covers everything you need to know about ${title.toLowerCase()}. We'll explore practical implementations, common pitfalls, and best practices used in production systems.

## Key Concepts

Understanding the fundamentals is crucial. Here are the core concepts:

1. **Foundation** - Building on solid principles
2. **Implementation** - Practical code examples
3. **Optimization** - Performance and scalability
4. **Security** - Protecting your systems
5. **Monitoring** - Observability and debugging

## Practical Implementation

\`\`\`javascript
// Example implementation
const implementation = {
  setup: () => {
    // Initialize your system
    console.log('System initialized');
  },
  execute: async () => {
    // Core logic here
    return { success: true };
  }
};
\`\`\`

## Best Practices

- Always validate input
- Handle errors gracefully
- Log important events
- Test thoroughly
- Document your code

## Common Pitfalls

Avoid these mistakes:

1. **Over-engineering** - Keep it simple
2. **Ignoring edge cases** - Test boundaries
3. **Poor error handling** - Fail gracefully
4. **No monitoring** - You can't fix what you can't see
5. **Skipping documentation** - Future you will thank you

## Real-World Example

Here's how this works in production:

\`\`\`javascript
async function productionExample() {
  try {
    const result = await processData();
    logger.info('Success', { result });
    return result;
  } catch (error) {
    logger.error('Failed', { error });
    throw error;
  }
}
\`\`\`

## Performance Considerations

- Cache frequently accessed data
- Use database indexes
- Implement rate limiting
- Monitor resource usage
- Scale horizontally when needed

## Security Checklist

✅ Input validation
✅ Authentication
✅ Authorization
✅ Encryption
✅ Audit logging

## Conclusion

${title} is essential for modern development. By following these practices, you'll build more secure, scalable, and maintainable systems.

## Further Reading

- Official documentation
- Community best practices
- Security guidelines
- Performance optimization guides

---

*Have questions? Reach out on Twitter or join our developer community.*`;
};

const blogPosts = [
  // Security (40 posts)
  { title: 'How to Build a Secure Node.js Backend from Scratch', category: 'Security', readTime: 12, tags: ['Node.js', 'Security', 'Backend'], featured: true },
  { title: '5 JWT Vulnerabilities Every Developer Should Know', category: 'Security', readTime: 8, tags: ['JWT', 'Security', 'Authentication'], featured: false },
  { title: 'Rate Limiting Strategies That Actually Work', category: 'Security', readTime: 10, tags: ['Security', 'API', 'Rate Limiting'], featured: false },
  { title: 'Building a Secure Authentication Flow', category: 'Security', readTime: 15, tags: ['Authentication', 'Security'], featured: false },
  { title: 'How to Prevent IDOR Vulnerabilities', category: 'Security', readTime: 9, tags: ['Security', 'IDOR', 'Vulnerabilities'], featured: false },
  { title: 'Securing REST APIs vs GraphQL APIs', category: 'Security', readTime: 11, tags: ['API', 'Security', 'GraphQL'], featured: false },
  { title: 'Proper Password Hashing in 2025', category: 'Security', readTime: 7, tags: ['Security', 'Passwords', 'Hashing'], featured: false },
  { title: 'API Key Management Best Practices', category: 'Security', readTime: 8, tags: ['API', 'Security', 'Keys'], featured: false },
  { title: 'Building a Secure Multi-Tenant SaaS', category: 'Security', readTime: 14, tags: ['SaaS', 'Security', 'Multi-Tenant'], featured: false },
  { title: 'Preventing Mass Assignment Vulnerabilities', category: 'Security', readTime: 6, tags: ['Security', 'Vulnerabilities'], featured: false },
  { title: 'Designing Secure File Upload Systems', category: 'Security', readTime: 10, tags: ['Security', 'File Upload'], featured: false },
  { title: 'XSS Explained for Backend Developers', category: 'Security', readTime: 9, tags: ['XSS', 'Security', 'Frontend'], featured: false },
  { title: 'How CSP Protects Your Application', category: 'Security', readTime: 8, tags: ['CSP', 'Security'], featured: false },
  { title: 'Secure Cookie Configuration Deep Dive', category: 'Security', readTime: 7, tags: ['Cookies', 'Security'], featured: false },
  { title: 'Protecting Against CSRF in SPAs', category: 'Security', readTime: 9, tags: ['CSRF', 'Security', 'SPA'], featured: false },
  { title: 'Why LocalStorage Can Ruin Your App', category: 'Security', readTime: 6, tags: ['LocalStorage', 'Security'], featured: false },
  { title: 'CI/CD Pipeline Security Checklist', category: 'Security', readTime: 11, tags: ['CI/CD', 'Security', 'DevOps'], featured: false },
  { title: 'Securing Docker Containers for Production', category: 'Security', readTime: 13, tags: ['Docker', 'Security'], featured: false },
  { title: 'GitHub Secrets Management Guide', category: 'Security', readTime: 8, tags: ['GitHub', 'Security', 'Secrets'], featured: false },
  { title: 'Infrastructure as Code Security Mistakes', category: 'Security', readTime: 10, tags: ['IaC', 'Security'], featured: false },
  { title: 'Automated Security Scanning Tools Compared', category: 'Security', readTime: 12, tags: ['Security', 'Tools', 'Scanning'], featured: false },
  { title: 'Breaking Down a Real Data Breach', category: 'Security', readTime: 15, tags: ['Security', 'Case Study'], featured: false },
  { title: 'How Attackers Exploit Misconfigured S3 Buckets', category: 'Security', readTime: 9, tags: ['AWS', 'Security', 'S3'], featured: false },
  { title: 'OAuth Misconfigurations Explained', category: 'Security', readTime: 11, tags: ['OAuth', 'Security'], featured: false },
  { title: 'JWT Exploits in the Wild', category: 'Security', readTime: 10, tags: ['JWT', 'Security', 'Exploits'], featured: false },
  { title: 'Anatomy of a Ransomware Attack', category: 'Security', readTime: 14, tags: ['Security', 'Ransomware'], featured: false },
  { title: 'Secure Microservices Architecture', category: 'Security', readTime: 16, tags: ['Microservices', 'Security'], featured: false },
  { title: 'OAuth 2.0 Deep Dive for Backend Engineers', category: 'Security', readTime: 18, tags: ['OAuth', 'Backend'], featured: false },
  { title: 'How to Build a Role-Based Access Control System', category: 'Security', readTime: 13, tags: ['RBAC', 'Security'], featured: false },
  { title: 'Secure Logging Without Leaking Secrets', category: 'Security', readTime: 8, tags: ['Logging', 'Security'], featured: false },
  { title: 'Designing an Audit Trail System', category: 'Security', readTime: 11, tags: ['Audit', 'Security'], featured: false },
  { title: 'Common Security Gaps in African Fintech Startups', category: 'Security', readTime: 12, tags: ['Fintech', 'Africa', 'Security'], featured: false },
  { title: 'How to Secure M-Pesa Integrations Properly', category: 'Security', readTime: 10, tags: ['M-Pesa', 'Security', 'Kenya'], featured: false },
  { title: 'Cybercrime Trends in East Africa', category: 'Security', readTime: 13, tags: ['Cybercrime', 'Africa'], featured: false },
  { title: 'SIM Swap Attacks Explained', category: 'Security', readTime: 9, tags: ['SIM Swap', 'Security'], featured: false },
  { title: 'Digital Fraud Patterns in Kenyan E-commerce', category: 'Security', readTime: 11, tags: ['Fraud', 'Kenya', 'E-commerce'], featured: false },
  { title: 'Best Open-Source Security Tools for Developers', category: 'Security', readTime: 10, tags: ['Tools', 'Security', 'Open Source'], featured: false },
  { title: 'Comparing WAF Providers', category: 'Security', readTime: 12, tags: ['WAF', 'Security'], featured: false },
  { title: 'Open Source Vulnerability Scanners Compared', category: 'Security', readTime: 11, tags: ['Security', 'Scanners'], featured: false },
  { title: 'Pen Testing Tools for Backend Developers', category: 'Security', readTime: 13, tags: ['Pentesting', 'Security'], featured: false },

  // African Tech (35 posts)
  { title: 'Complete M-Pesa Integration Guide for Kenyan Developers', category: 'African Tech', readTime: 15, tags: ['M-Pesa', 'Kenya', 'Integration'], featured: true },
  { title: 'Why African Devs Should Build Infrastructure Tools', category: 'African Tech', readTime: 10, tags: ['Africa', 'Infrastructure'], featured: false },
  { title: 'The Future of Fintech in Kenya', category: 'African Tech', readTime: 12, tags: ['Fintech', 'Kenya'], featured: false },
  { title: 'M-Pesa vs Stripe for African Startups', category: 'African Tech', readTime: 11, tags: ['M-Pesa', 'Stripe', 'Comparison'], featured: false },
  { title: 'The Real Challenge of Startup Funding in Africa', category: 'African Tech', readTime: 13, tags: ['Funding', 'Startups', 'Africa'], featured: false },
  { title: 'Building for Low-Bandwidth Environments', category: 'African Tech', readTime: 10, tags: ['Performance', 'Africa'], featured: false },
  { title: 'Mobile-First Development in Africa', category: 'African Tech', readTime: 9, tags: ['Mobile', 'Africa'], featured: false },
  { title: 'The Rise of Developer Communities in Nairobi', category: 'African Tech', readTime: 8, tags: ['Community', 'Nairobi'], featured: false },
  { title: 'African SaaS Opportunities Nobody Is Building', category: 'African Tech', readTime: 14, tags: ['SaaS', 'Africa', 'Opportunities'], featured: false },
  { title: 'Why EdTech Is Underserved in Africa', category: 'African Tech', readTime: 11, tags: ['EdTech', 'Africa'], featured: false },
  { title: 'Digital Identity Challenges in Africa', category: 'African Tech', readTime: 12, tags: ['Identity', 'Africa'], featured: false },
  { title: 'Building Offline-First Applications', category: 'African Tech', readTime: 13, tags: ['Offline', 'Mobile'], featured: false },
  { title: 'Rural Tech Infrastructure Problems', category: 'African Tech', readTime: 10, tags: ['Infrastructure', 'Rural'], featured: false },
  { title: 'Why Most African Startups Fail', category: 'African Tech', readTime: 15, tags: ['Startups', 'Africa', 'Analysis'], featured: false },
  { title: 'Government APIs in Kenya: What Works', category: 'African Tech', readTime: 9, tags: ['APIs', 'Kenya', 'Government'], featured: false },
  { title: 'Startup Legal Compliance in Kenya', category: 'African Tech', readTime: 11, tags: ['Legal', 'Kenya', 'Startups'], featured: false },
  { title: 'African Cloud Hosting Options Compared', category: 'African Tech', readTime: 10, tags: ['Cloud', 'Hosting', 'Africa'], featured: false },
  { title: 'Internet Costs and Developer Growth', category: 'African Tech', readTime: 8, tags: ['Internet', 'Africa'], featured: false },
  { title: 'Fintech Fraud Patterns in Africa', category: 'African Tech', readTime: 12, tags: ['Fintech', 'Fraud', 'Africa'], featured: false },
  { title: 'The Developer Talent Gap in Africa', category: 'African Tech', readTime: 10, tags: ['Talent', 'Africa'], featured: false },
  { title: 'Why We Need More Dev Tool Startups', category: 'African Tech', readTime: 9, tags: ['Dev Tools', 'Startups'], featured: false },
  { title: 'E-commerce Logistics Problems in East Africa', category: 'African Tech', readTime: 11, tags: ['E-commerce', 'Logistics'], featured: false },
  { title: 'Scaling Tech Teams in Nairobi', category: 'African Tech', readTime: 13, tags: ['Teams', 'Nairobi'], featured: false },
  { title: 'Building for Informal Economies', category: 'African Tech', readTime: 12, tags: ['Economy', 'Africa'], featured: false },
  { title: 'Tech Brain Drain in Africa', category: 'African Tech', readTime: 10, tags: ['Talent', 'Africa'], featured: false },
  { title: 'How to Price SaaS for African Markets', category: 'African Tech', readTime: 11, tags: ['SaaS', 'Pricing', 'Africa'], featured: false },
  { title: 'Local Payment Integrations Compared', category: 'African Tech', readTime: 14, tags: ['Payments', 'Africa'], featured: false },
  { title: 'The API Economy in Africa', category: 'African Tech', readTime: 9, tags: ['APIs', 'Africa'], featured: false },
  { title: 'AI Adoption in African SMEs', category: 'African Tech', readTime: 10, tags: ['AI', 'SMEs', 'Africa'], featured: false },
  { title: 'The Rise of African Cybersecurity Firms', category: 'African Tech', readTime: 12, tags: ['Cybersecurity', 'Africa'], featured: false },
  { title: 'Developer Freelancing in Africa', category: 'African Tech', readTime: 8, tags: ['Freelancing', 'Africa'], featured: false },
  { title: 'African Open Source Projects to Watch', category: 'African Tech', readTime: 11, tags: ['Open Source', 'Africa'], featured: false },
  { title: 'VC Trends in African Tech', category: 'African Tech', readTime: 13, tags: ['VC', 'Funding', 'Africa'], featured: false },
  { title: 'Startup Accelerators in Kenya', category: 'African Tech', readTime: 9, tags: ['Accelerators', 'Kenya'], featured: false },
  { title: 'Cross-Border Payments in East Africa', category: 'African Tech', readTime: 12, tags: ['Payments', 'Africa'], featured: false },

  // Build Logs (30 posts)
  { title: 'Building Codevra: From Portfolio to Platform', category: 'Build Logs', readTime: 10, tags: ['Build Log', 'Architecture'], featured: true },
  { title: 'Building a Multi-Tenant SaaS from Scratch', category: 'Build Logs', readTime: 16, tags: ['SaaS', 'Multi-Tenant'], featured: false },
  { title: 'Scaling to 10,000 Users', category: 'Build Logs', readTime: 14, tags: ['Scaling', 'Performance'], featured: false },
  { title: 'Designing a Payment-First Architecture', category: 'Build Logs', readTime: 12, tags: ['Payments', 'Architecture'], featured: false },
  { title: 'Building an Internal Dev Dashboard', category: 'Build Logs', readTime: 11, tags: ['Dashboard', 'Internal Tools'], featured: false },
  { title: 'Refactoring a Monolith to Microservices', category: 'Build Logs', readTime: 15, tags: ['Refactoring', 'Microservices'], featured: false },
  { title: 'Migrating from REST to GraphQL', category: 'Build Logs', readTime: 13, tags: ['GraphQL', 'Migration'], featured: false },
  { title: 'Implementing Real-Time Notifications', category: 'Build Logs', readTime: 10, tags: ['Real-Time', 'Notifications'], featured: false },
  { title: 'Integrating M-Pesa STK Push', category: 'Build Logs', readTime: 12, tags: ['M-Pesa', 'Integration'], featured: false },
  { title: 'Designing a Secure Admin Panel', category: 'Build Logs', readTime: 11, tags: ['Admin', 'Security'], featured: false },
  { title: 'Building a Feature Flag System', category: 'Build Logs', readTime: 9, tags: ['Feature Flags'], featured: false },
  { title: 'Creating a Logging Infrastructure', category: 'Build Logs', readTime: 10, tags: ['Logging', 'Infrastructure'], featured: false },
  { title: 'Implementing Rate Limiting at Scale', category: 'Build Logs', readTime: 12, tags: ['Rate Limiting', 'Scaling'], featured: false },
  { title: 'Designing a SaaS Pricing Engine', category: 'Build Logs', readTime: 14, tags: ['SaaS', 'Pricing'], featured: false },
  { title: 'Building an AI Content Generator', category: 'Build Logs', readTime: 13, tags: ['AI', 'Content'], featured: false },
  { title: 'Creating a Dev Tool Marketplace', category: 'Build Logs', readTime: 11, tags: ['Marketplace', 'Dev Tools'], featured: false },
  { title: 'Launching a Developer Newsletter System', category: 'Build Logs', readTime: 9, tags: ['Newsletter', 'Email'], featured: false },
  { title: 'Designing a Secure File Storage System', category: 'Build Logs', readTime: 12, tags: ['Storage', 'Security'], featured: false },
  { title: 'Building a Custom CMS', category: 'Build Logs', readTime: 15, tags: ['CMS', 'Content'], featured: false },
  { title: 'Handling Background Jobs with Redis', category: 'Build Logs', readTime: 10, tags: ['Redis', 'Jobs'], featured: false },
  { title: 'Designing a Scalable Chat System', category: 'Build Logs', readTime: 14, tags: ['Chat', 'Real-Time'], featured: false },
  { title: 'Lessons Learned Deploying to AWS', category: 'Build Logs', readTime: 11, tags: ['AWS', 'Deployment'], featured: false },
  { title: 'Scaling on a Budget in Africa', category: 'Build Logs', readTime: 13, tags: ['Scaling', 'Budget', 'Africa'], featured: false },
  { title: 'Optimizing PostgreSQL for High Traffic', category: 'Build Logs', readTime: 12, tags: ['PostgreSQL', 'Performance'], featured: false },
  { title: 'Designing a Subscription Billing System', category: 'Build Logs', readTime: 14, tags: ['Billing', 'Subscriptions'], featured: false },
  { title: 'Creating a Bug Reporting System', category: 'Build Logs', readTime: 9, tags: ['Bug Tracking'], featured: false },
  { title: 'Building a Secure OAuth Flow', category: 'Build Logs', readTime: 11, tags: ['OAuth', 'Security'], featured: false },
  { title: 'CI/CD Setup for Indie Developers', category: 'Build Logs', readTime: 10, tags: ['CI/CD', 'DevOps'], featured: false },
  { title: 'How I Reduced Server Costs by 40%', category: 'Build Logs', readTime: 12, tags: ['Cost', 'Optimization'], featured: false },
  { title: 'Launch Day Mistakes I Made', category: 'Build Logs', readTime: 8, tags: ['Launch', 'Lessons'], featured: false },

  // Productivity (25 posts)
  { title: 'My Developer Productivity System', category: 'Productivity', readTime: 7, tags: ['Productivity', 'Workflow'], featured: false },
  { title: 'Deep Work for Developers', category: 'Productivity', readTime: 9, tags: ['Deep Work', 'Focus'], featured: false },
  { title: 'My Terminal Setup Explained', category: 'Productivity', readTime: 8, tags: ['Terminal', 'Setup'], featured: false },
  { title: 'Automating My Dev Workflow', category: 'Productivity', readTime: 10, tags: ['Automation', 'Workflow'], featured: false },
  { title: 'Task Management Systems Compared', category: 'Productivity', readTime: 11, tags: ['Task Management'], featured: false },
  { title: 'Avoiding Burnout as a Solo Founder', category: 'Productivity', readTime: 12, tags: ['Burnout', 'Mental Health'], featured: false },
  { title: 'Shipping Fast Without Breaking Everything', category: 'Productivity', readTime: 9, tags: ['Shipping', 'Speed'], featured: false },
  { title: 'Developer Morning Routine', category: 'Productivity', readTime: 6, tags: ['Routine', 'Habits'], featured: false },
  { title: 'Time Blocking for Engineers', category: 'Productivity', readTime: 8, tags: ['Time Management'], featured: false },
  { title: 'Reducing Context Switching', category: 'Productivity', readTime: 7, tags: ['Focus', 'Productivity'], featured: false },
  { title: 'Keyboard Shortcuts That Save Hours', category: 'Productivity', readTime: 6, tags: ['Shortcuts', 'Efficiency'], featured: false },
  { title: 'Git Workflow That Scales', category: 'Productivity', readTime: 10, tags: ['Git', 'Workflow'], featured: false },
  { title: 'Code Review Checklist Template', category: 'Productivity', readTime: 8, tags: ['Code Review'], featured: false },
  { title: 'Using AI Without Getting Lazy', category: 'Productivity', readTime: 9, tags: ['AI', 'Productivity'], featured: false },
  { title: 'Focus Tools for Developers', category: 'Productivity', readTime: 7, tags: ['Tools', 'Focus'], featured: false },
  { title: 'Personal Knowledge Management for Devs', category: 'Productivity', readTime: 11, tags: ['Knowledge', 'PKM'], featured: false },
  { title: 'Designing a Dev Second Brain', category: 'Productivity', readTime: 10, tags: ['Second Brain', 'Notes'], featured: false },
  { title: 'Debugging Faster', category: 'Productivity', readTime: 8, tags: ['Debugging', 'Speed'], featured: false },
  { title: 'Avoiding Over-Engineering', category: 'Productivity', readTime: 9, tags: ['Engineering', 'Simplicity'], featured: false },
  { title: 'Reading Code Efficiently', category: 'Productivity', readTime: 7, tags: ['Code Reading'], featured: false },
  { title: 'How I Plan Product Roadmaps', category: 'Productivity', readTime: 12, tags: ['Planning', 'Product'], featured: false },
  { title: 'Staying Consistent for 5 Years', category: 'Productivity', readTime: 10, tags: ['Consistency', 'Habits'], featured: false },
  { title: 'Remote Work Discipline', category: 'Productivity', readTime: 8, tags: ['Remote', 'Discipline'], featured: false },
  { title: 'Building in Public Strategy', category: 'Productivity', readTime: 9, tags: ['Building in Public'], featured: false },
  { title: 'How to Learn New Tech Fast', category: 'Productivity', readTime: 11, tags: ['Learning', 'Skills'], featured: false },

  // Tech Analysis (30 posts)
  { title: 'Next.js vs Remix in 2025', category: 'Tech Analysis', readTime: 13, tags: ['Next.js', 'Remix', 'Comparison'], featured: false },
  { title: 'Node.js vs Bun Performance Analysis', category: 'Tech Analysis', readTime: 12, tags: ['Node.js', 'Bun', 'Performance'], featured: false },
  { title: 'PostgreSQL vs MongoDB for SaaS', category: 'Tech Analysis', readTime: 14, tags: ['PostgreSQL', 'MongoDB'], featured: false },
  { title: 'REST vs GraphQL at Scale', category: 'Tech Analysis', readTime: 11, tags: ['REST', 'GraphQL'], featured: false },
  { title: 'Monolith vs Microservices Debate', category: 'Tech Analysis', readTime: 15, tags: ['Architecture', 'Microservices'], featured: false },
  { title: 'Is Serverless Overhyped?', category: 'Tech Analysis', readTime: 10, tags: ['Serverless', 'Opinion'], featured: false },
  { title: 'Will AI Replace Junior Developers?', category: 'Tech Analysis', readTime: 12, tags: ['AI', 'Career'], featured: false },
  { title: 'Open Source vs Closed Source Business Models', category: 'Tech Analysis', readTime: 13, tags: ['Open Source', 'Business'], featured: false },
  { title: 'SaaS Pricing Models Compared', category: 'Tech Analysis', readTime: 11, tags: ['SaaS', 'Pricing'], featured: false },
  { title: 'Supabase vs Firebase', category: 'Tech Analysis', readTime: 10, tags: ['Supabase', 'Firebase'], featured: false },
  { title: 'Stripe vs M-Pesa Developer Experience', category: 'Tech Analysis', readTime: 12, tags: ['Stripe', 'M-Pesa'], featured: false },
  { title: 'React Server Components Explained', category: 'Tech Analysis', readTime: 14, tags: ['React', 'RSC'], featured: false },
  { title: 'WebSockets vs Server-Sent Events', category: 'Tech Analysis', readTime: 9, tags: ['WebSockets', 'SSE'], featured: false },
  { title: 'Redis vs Memcached', category: 'Tech Analysis', readTime: 8, tags: ['Redis', 'Memcached'], featured: false },
  { title: 'Is Kubernetes Worth It for Startups?', category: 'Tech Analysis', readTime: 11, tags: ['Kubernetes', 'Startups'], featured: false },
  { title: 'Is Web3 Still Relevant?', category: 'Tech Analysis', readTime: 10, tags: ['Web3', 'Blockchain'], featured: false },
  { title: 'Edge Computing Explained', category: 'Tech Analysis', readTime: 12, tags: ['Edge Computing'], featured: false },
  { title: 'API-First Architecture Deep Dive', category: 'Tech Analysis', readTime: 13, tags: ['API', 'Architecture'], featured: false },
  { title: 'Static vs Dynamic Rendering', category: 'Tech Analysis', readTime: 9, tags: ['Rendering', 'Performance'], featured: false },
  { title: 'Dev Tool Market Trends 2025', category: 'Tech Analysis', readTime: 11, tags: ['Dev Tools', 'Trends'], featured: false },
  { title: 'Headless CMS vs Traditional CMS', category: 'Tech Analysis', readTime: 10, tags: ['CMS', 'Headless'], featured: false },
  { title: 'Graph Databases Explained', category: 'Tech Analysis', readTime: 12, tags: ['Databases', 'Graph'], featured: false },
  { title: 'Should You Use Rust for Backend?', category: 'Tech Analysis', readTime: 13, tags: ['Rust', 'Backend'], featured: false },
  { title: 'TypeScript Strict Mode Benefits', category: 'Tech Analysis', readTime: 8, tags: ['TypeScript', 'Strict Mode'], featured: false },
  { title: 'OpenAI vs Open-Source LLMs', category: 'Tech Analysis', readTime: 14, tags: ['AI', 'LLMs'], featured: false },
  { title: 'Data Privacy Laws in Africa', category: 'Tech Analysis', readTime: 11, tags: ['Privacy', 'Legal', 'Africa'], featured: false },
  { title: 'AI Regulation Trends', category: 'Tech Analysis', readTime: 10, tags: ['AI', 'Regulation'], featured: false },
  { title: 'Developer Market Trends 2025', category: 'Tech Analysis', readTime: 12, tags: ['Trends', 'Market'], featured: false },
  { title: 'Cloud Cost Optimization Strategies', category: 'Tech Analysis', readTime: 13, tags: ['Cloud', 'Cost'], featured: false },
  { title: 'Software Architecture Patterns Compared', category: 'Tech Analysis', readTime: 15, tags: ['Architecture', 'Patterns'], featured: false }
];

const allBlogs = blogPosts.map((post, index) => ({
  ...post,
  slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  excerpt: `${post.title} - A comprehensive guide covering everything you need to know. Practical examples, best practices, and real-world implementations.`,
  content: generateBlogContent(post.title, post.category),
  publishedAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000))
}));

module.exports = { allBlogs };
