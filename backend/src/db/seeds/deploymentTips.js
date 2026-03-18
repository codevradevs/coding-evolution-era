const deploymentTips = [
  {
    title: "Never Hardcode Secrets",
    category: "Deployment",
    content: "Always use environment variables for API keys, database credentials, and secrets. Never commit them to version control.",
    codeSnippet: "// Use .env files\nconst apiKey = process.env.API_KEY;",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Free Static Hosting Options",
    category: "Deployment",
    content: "Deploy static sites for free on Vercel, Netlify, or GitHub Pages. Perfect for portfolios and frontend projects.",
    codeSnippet: "# Vercel: vercel deploy\n# Netlify: netlify deploy\n# GitHub Pages: Push to gh-pages branch",
    difficulty: "Beginner",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Docker for Consistency",
    category: "Deployment",
    content: "Docker ensures your app runs the same way in development, staging, and production environments.",
    codeSnippet: "FROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"npm\", \"start\"]",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Build Production Version First",
    category: "Deployment",
    content: "Always build and test your production bundle locally before deploying to catch build errors early.",
    codeSnippet: "npm run build\n# Test the build locally\nnpx serve -s build",
    difficulty: "Beginner",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Production Environment Files",
    category: "Deployment",
    content: "Separate environment variables for development and production using .env.production files.",
    codeSnippet: "# .env.production\nNODE_ENV=production\nAPI_URL=https://api.yoursite.com",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Enable HTTPS with Let's Encrypt",
    category: "Deployment",
    content: "Get free SSL certificates using Let's Encrypt. HTTPS is essential for security and SEO.",
    codeSnippet: "sudo certbot --nginx -d yourdomain.com",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Set Up CI/CD Pipelines Early",
    category: "Deployment",
    content: "Automate testing and deployment from day one. It saves hours of manual work later.",
    codeSnippet: "# GitHub Actions example\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm install && npm run build",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use PM2 for Node Production",
    category: "Deployment",
    content: "PM2 keeps your Node.js app running, restarts on crashes, and provides monitoring.",
    codeSnippet: "npm install -g pm2\npm2 start app.js\npm2 startup\npm2 save",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Enable Gzip Compression",
    category: "Deployment",
    content: "Compress responses to reduce bandwidth and improve load times significantly.",
    codeSnippet: "const compression = require('compression');\napp.use(compression());",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use CDN for Static Assets",
    category: "Deployment",
    content: "Serve images, CSS, and JS from a CDN to reduce server load and improve global performance.",
    codeSnippet: "// Use Cloudflare, AWS CloudFront, or Vercel CDN\n<img src=\"https://cdn.yoursite.com/image.jpg\" />",
    difficulty: "Intermediate",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Nginx as Reverse Proxy",
    category: "Deployment",
    content: "Nginx handles SSL, load balancing, and serves static files efficiently in front of your Node app.",
    codeSnippet: "location / {\n  proxy_pass http://localhost:3000;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n}",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Monitor Logs After Deployment",
    category: "Deployment",
    content: "Always check logs immediately after deploying to catch errors before users do.",
    codeSnippet: "pm2 logs\n# or\ntail -f /var/log/nginx/error.log",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Health Check Endpoints",
    category: "Deployment",
    content: "Create a /health endpoint that monitoring services can ping to verify your app is running.",
    codeSnippet: "app.get('/health', (req, res) => {\n  res.status(200).json({ status: 'ok' });\n});",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Separate Staging Environment",
    category: "Deployment",
    content: "Test changes in a staging environment that mirrors production before deploying to live users.",
    codeSnippet: "# Deploy to staging first\nvercel --prod --scope=staging\n# Then to production\nvercel --prod",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Backup Database Before Migrations",
    category: "Deployment",
    content: "Always create a database backup before running migrations in production. You can rollback if something breaks.",
    codeSnippet: "# MongoDB backup\nmongodump --uri=\"mongodb://localhost/mydb\" --out=/backup\n# Then run migrations",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Zero-Downtime Deployment",
    category: "Deployment",
    content: "Deploy new versions without taking your site offline using blue-green or rolling deployments.",
    codeSnippet: "pm2 reload app --update-env",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Enable Caching Headers",
    category: "Deployment",
    content: "Set proper cache headers to reduce server load and speed up repeat visits.",
    codeSnippet: "res.setHeader('Cache-Control', 'public, max-age=31536000');",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Limit Server Open Ports",
    category: "Deployment",
    content: "Only expose necessary ports (80, 443) and block all others using firewall rules.",
    codeSnippet: "sudo ufw allow 80\nsudo ufw allow 443\nsudo ufw enable",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Automatic Restart on Crash",
    category: "Deployment",
    content: "Configure your process manager to automatically restart your app if it crashes.",
    codeSnippet: "pm2 start app.js --max-restarts 10",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Test Deployment Locally with Docker",
    category: "Deployment",
    content: "Run your production Docker container locally to catch deployment issues before going live.",
    codeSnippet: "docker build -t myapp .\ndocker run -p 3000:3000 myapp",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  }
];

module.exports = { deploymentTips };
