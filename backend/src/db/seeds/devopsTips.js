const devopsTips = [
  {
    title: "Automate Everything Possible",
    category: "DevOps",
    content: "If you do it more than twice, automate it. Manual processes are error-prone and waste time.",
    codeSnippet: "// Automate: testing, deployment, backups, monitoring alerts",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use CI/CD Pipelines",
    category: "DevOps",
    content: "Continuous Integration and Deployment pipelines catch bugs early and speed up releases.",
    codeSnippet: "# GitHub Actions, GitLab CI, Jenkins, CircleCI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Monitor CPU & Memory",
    category: "DevOps",
    content: "Set up monitoring for resource usage to catch performance issues before users do.",
    codeSnippet: "// Use: Prometheus, Grafana, DataDog, New Relic",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Docker Volumes Properly",
    category: "DevOps",
    content: "Persist data outside containers using volumes. Container data is lost when containers restart.",
    codeSnippet: "docker run -v /host/path:/container/path myapp\n# Or use named volumes\ndocker volume create mydata",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Keep Staging and Prod Separate",
    category: "DevOps",
    content: "Never test in production. Use separate environments that mirror production setup.",
    codeSnippet: "// Environments: dev, staging, production\n// Each with own database, API keys, configs",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Infrastructure as Code",
    category: "DevOps",
    content: "Define infrastructure in code (Terraform, CloudFormation) for reproducible, version-controlled setups.",
    codeSnippet: "# Terraform example\nresource \"aws_instance\" \"web\" {\n  ami = \"ami-12345\"\n  instance_type = \"t2.micro\"\n}",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Enable Auto-Scaling",
    category: "DevOps",
    content: "Automatically scale resources based on demand to handle traffic spikes and reduce costs.",
    codeSnippet: "// AWS Auto Scaling, Kubernetes HPA\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nspec:\n  minReplicas: 2\n  maxReplicas: 10",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Centralized Logging",
    category: "DevOps",
    content: "Aggregate logs from all services in one place for easier debugging and monitoring.",
    codeSnippet: "// Use: ELK Stack, Splunk, CloudWatch, Loki\n// Ship logs with: Fluentd, Logstash",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Set Up Alerts for Downtime",
    category: "DevOps",
    content: "Get notified immediately when services go down or performance degrades.",
    codeSnippet: "// Use: PagerDuty, Opsgenie, Prometheus Alertmanager\n// Alert on: downtime, high error rate, slow response",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Health Checks",
    category: "DevOps",
    content: "Implement health check endpoints that load balancers and orchestrators can ping.",
    codeSnippet: "app.get('/health', (req, res) => {\n  // Check DB connection, dependencies\n  res.json({ status: 'healthy' });\n});",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Rotate Secrets Regularly",
    category: "DevOps",
    content: "Change API keys, passwords, and certificates periodically to limit exposure from breaches.",
    codeSnippet: "// Use secret managers: AWS Secrets Manager, HashiCorp Vault\n// Automate rotation every 90 days",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Version Infrastructure Configs",
    category: "DevOps",
    content: "Keep infrastructure code in git to track changes and enable rollbacks.",
    codeSnippet: "// Store in git: Terraform files, Kubernetes manifests, Docker configs",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Container Orchestration",
    category: "DevOps",
    content: "Kubernetes or Docker Swarm manage containers at scale with auto-healing and load balancing.",
    codeSnippet: "# Kubernetes deployment\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 3",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Minimize Container Image Size",
    category: "DevOps",
    content: "Use Alpine Linux base images and multi-stage builds to reduce image size and attack surface.",
    codeSnippet: "FROM node:18-alpine\n# Multi-stage build\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm run build\n\nFROM node:18-alpine\nCOPY --from=builder /app/dist ./dist",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Blue-Green Deployments",
    category: "DevOps",
    content: "Deploy to a separate environment, test, then switch traffic for zero-downtime releases.",
    codeSnippet: "// Maintain two identical environments\n// Deploy to inactive, test, switch traffic, keep old as backup",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Automate Database Backups",
    category: "DevOps",
    content: "Schedule automatic backups and test restoration regularly. Backups are useless if you can't restore.",
    codeSnippet: "# Cron job for MongoDB backup\n0 2 * * * mongodump --uri=\"mongodb://localhost/mydb\" --out=/backups/$(date +\\%Y\\%m\\%d)",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Track Deployment Frequency",
    category: "DevOps",
    content: "Measure how often you deploy. High-performing teams deploy multiple times per day.",
    codeSnippet: "// Track: deployments per day, lead time, change failure rate",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Measure Mean Time to Recovery",
    category: "DevOps",
    content: "Track how quickly you recover from failures. Optimize incident response processes.",
    codeSnippet: "// MTTR = Total downtime / Number of incidents\n// Goal: < 1 hour for critical services",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Document Runbooks",
    category: "DevOps",
    content: "Create step-by-step guides for common operations and incident responses.",
    codeSnippet: "// Document: deployment process, rollback steps, incident response, troubleshooting",
    difficulty: "Beginner",
    track: ["backend", "fullstack"]
  },
  {
    title: "Conduct Post-Mortems After Failures",
    category: "DevOps",
    content: "Analyze incidents without blame to learn and prevent future occurrences.",
    codeSnippet: "// Post-mortem includes: timeline, root cause, impact, action items\n// Focus on systems, not people",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  }
];

module.exports = { devopsTips };
