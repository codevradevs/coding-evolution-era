const securityTips = [
  {
    title: "Never Commit .env Files",
    category: "Security",
    content: "Add .env to .gitignore immediately. Exposed API keys can lead to account compromise and huge bills.",
    codeSnippet: "# .gitignore\n.env\n.env.local\n.env.production",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Hash Passwords with bcrypt",
    category: "Security",
    content: "Never store plain text passwords. Use bcrypt with proper salt rounds (10-12) for secure hashing.",
    codeSnippet: "const bcrypt = require('bcrypt');\nconst hash = await bcrypt.hash(password, 10);\nconst match = await bcrypt.compare(password, hash);",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Validate Input Server-Side",
    category: "Security",
    content: "Never trust client-side validation alone. Always validate and sanitize input on the server.",
    codeSnippet: "const { body, validationResult } = require('express-validator');\napp.post('/user', body('email').isEmail(), (req, res) => {\n  const errors = validationResult(req);\n  if (!errors.isEmpty()) return res.status(400).json({ errors });\n});",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Escape Output to Prevent XSS",
    category: "Security",
    content: "Sanitize user input before rendering to prevent cross-site scripting attacks.",
    codeSnippet: "// Use libraries like DOMPurify\nimport DOMPurify from 'dompurify';\nconst clean = DOMPurify.sanitize(userInput);",
    difficulty: "Intermediate",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use HTTPS Always",
    category: "Security",
    content: "Never send sensitive data over HTTP. HTTPS encrypts data in transit and is required for modern web features.",
    codeSnippet: "// Redirect HTTP to HTTPS\nif (req.protocol !== 'https') {\n  res.redirect('https://' + req.headers.host + req.url);\n}",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Enable Rate Limiting",
    category: "Security",
    content: "Prevent brute force attacks and API abuse by limiting requests per IP address.",
    codeSnippet: "const rateLimit = require('express-rate-limit');\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100\n});\napp.use(limiter);",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use JWT Expiration",
    category: "Security",
    content: "Always set expiration times on JWTs. Short-lived tokens reduce the impact of token theft.",
    codeSnippet: "const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Store Tokens Securely",
    category: "Security",
    content: "Store JWTs in httpOnly cookies, not localStorage. This prevents XSS attacks from stealing tokens.",
    codeSnippet: "res.cookie('token', jwt, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'strict'\n});",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use CSRF Protection Middleware",
    category: "Security",
    content: "Protect against cross-site request forgery attacks with CSRF tokens on state-changing operations.",
    codeSnippet: "const csrf = require('csurf');\napp.use(csrf({ cookie: true }));",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Sanitize File Uploads",
    category: "Security",
    content: "Validate file types, limit file sizes, and scan uploads for malware. Never trust user-uploaded files.",
    codeSnippet: "const multer = require('multer');\nconst upload = multer({\n  limits: { fileSize: 5 * 1024 * 1024 },\n  fileFilter: (req, file, cb) => {\n    if (!file.mimetype.startsWith('image/')) {\n      return cb(new Error('Only images allowed'));\n    }\n    cb(null, true);\n  }\n});",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Avoid Revealing Error Stack Traces",
    category: "Security",
    content: "In production, send generic error messages to users. Log detailed errors server-side only.",
    codeSnippet: "app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: 'Something went wrong' });\n});",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Security Headers with Helmet",
    category: "Security",
    content: "Helmet sets various HTTP headers to protect against common web vulnerabilities.",
    codeSnippet: "const helmet = require('helmet');\napp.use(helmet());",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Keep Dependencies Updated",
    category: "Security",
    content: "Regularly update packages to patch security vulnerabilities. Use npm audit to find issues.",
    codeSnippet: "npm audit\nnpm audit fix\n# Or use automated tools like Dependabot",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Least Privilege Principle",
    category: "Security",
    content: "Give users and services only the minimum permissions they need. Don't use admin accounts for everything.",
    codeSnippet: "// Database user with read-only access\nGRANT SELECT ON database.* TO 'readonly'@'localhost';",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Protect Admin Routes",
    category: "Security",
    content: "Add authentication and role-based access control to admin endpoints.",
    codeSnippet: "const requireAdmin = (req, res, next) => {\n  if (req.user.role !== 'admin') {\n    return res.status(403).json({ error: 'Forbidden' });\n  }\n  next();\n};\napp.delete('/users/:id', authenticateToken, requireAdmin, handler);",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Log Suspicious Activity",
    category: "Security",
    content: "Track failed login attempts, unusual access patterns, and security events for monitoring.",
    codeSnippet: "if (failedAttempts > 5) {\n  logger.warn(`Multiple failed logins for ${email} from ${ip}`);\n  // Consider temporary account lock\n}",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Disable Directory Listing",
    category: "Security",
    content: "Prevent attackers from browsing your server directories by disabling directory listing.",
    codeSnippet: "// Nginx\nautoindex off;\n// Apache\nOptions -Indexes",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Avoid eval()",
    category: "Security",
    content: "Never use eval() with user input. It can execute arbitrary code and is a major security risk.",
    codeSnippet: "// Bad: eval(userInput)\n// Good: Use JSON.parse() or safer alternatives",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use 2FA When Possible",
    category: "Security",
    content: "Implement two-factor authentication for sensitive operations and admin accounts.",
    codeSnippet: "// Use libraries like speakeasy for TOTP\nconst speakeasy = require('speakeasy');\nconst verified = speakeasy.totp.verify({\n  secret: user.secret,\n  encoding: 'base32',\n  token: userToken\n});",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Review OWASP Top 10 Yearly",
    category: "Security",
    content: "Stay updated on the most critical web security risks by reviewing the OWASP Top 10 annually.",
    codeSnippet: "// Visit: https://owasp.org/www-project-top-ten/\n// Current top risks: Injection, Broken Auth, XSS, etc.",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  }
];

module.exports = { securityTips };
