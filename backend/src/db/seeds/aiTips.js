const aiTips = [
  {
    title: "Use Clear Prompts",
    category: "AI",
    content: "Be specific and clear in your prompts. Vague questions get vague answers. Include context and desired format.",
    codeSnippet: "// Bad: 'fix this code'\n// Good: 'Refactor this React component to use hooks instead of class components'",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Give Context Before Asking",
    category: "AI",
    content: "Provide relevant background information about your project, tech stack, and constraints for better AI responses.",
    codeSnippet: "// Include: language, framework, what you've tried, error messages",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Ask AI to Explain Step-by-Step",
    category: "AI",
    content: "Request explanations with reasoning to understand the solution, not just copy code blindly.",
    codeSnippet: "// Prompt: 'Explain how this algorithm works step by step'",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use AI for Test Case Generation",
    category: "AI",
    content: "AI excels at generating comprehensive test cases including edge cases you might miss.",
    codeSnippet: "// Prompt: 'Generate unit tests for this function including edge cases'",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use AI for Documentation Drafts",
    category: "AI",
    content: "Generate initial documentation and README files quickly, then refine them manually.",
    codeSnippet: "// Prompt: 'Create a README for this project with installation, usage, and API docs'",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Don't Blindly Trust AI Output",
    category: "AI",
    content: "Always review, test, and validate AI-generated code. AI can make mistakes or suggest outdated patterns.",
    codeSnippet: "// Review for: security issues, performance, best practices, compatibility",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Validate AI-Generated SQL Queries",
    category: "AI",
    content: "AI-generated SQL can have injection vulnerabilities or inefficient queries. Always review and test.",
    codeSnippet: "// Check for: SQL injection risks, proper indexing, query optimization",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use AI for Refactoring Suggestions",
    category: "AI",
    content: "Ask AI to suggest improvements for code quality, readability, and performance.",
    codeSnippet: "// Prompt: 'Suggest refactoring improvements for this code focusing on readability'",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Break Large Tasks into Smaller Prompts",
    category: "AI",
    content: "Instead of asking AI to build entire features, break down into smaller, manageable pieces.",
    codeSnippet: "// Instead of: 'Build a user authentication system'\n// Try: 'Create a login form component', then 'Add form validation', etc.",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use AI to Generate Edge Case Tests",
    category: "AI",
    content: "AI is great at thinking of unusual inputs and edge cases you might not consider.",
    codeSnippet: "// Prompt: 'What edge cases should I test for this email validation function?'",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Embeddings for Search Features",
    category: "AI",
    content: "Implement semantic search using embeddings for better search results than keyword matching.",
    codeSnippet: "// Use OpenAI embeddings or similar\nconst embedding = await openai.embeddings.create({\n  model: 'text-embedding-ada-002',\n  input: searchQuery\n});",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Monitor AI API Costs",
    category: "AI",
    content: "AI API calls can get expensive quickly. Set up billing alerts and monitor usage closely.",
    codeSnippet: "// Track: tokens used, API calls per day, cost per feature",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Cache Frequent AI Responses",
    category: "AI",
    content: "Cache common AI responses to reduce API calls and costs for repeated queries.",
    codeSnippet: "const cache = new Map();\nif (cache.has(prompt)) return cache.get(prompt);\nconst response = await ai.complete(prompt);\ncache.set(prompt, response);",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Temperature Parameter Wisely",
    category: "AI",
    content: "Lower temperature (0-0.3) for factual tasks, higher (0.7-1.0) for creative tasks.",
    codeSnippet: "// Factual: temperature: 0.2\n// Creative: temperature: 0.8",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Avoid Exposing Sensitive Data to AI",
    category: "AI",
    content: "Never send passwords, API keys, or personal data to AI services. Sanitize inputs first.",
    codeSnippet: "// Replace sensitive data with placeholders before sending to AI",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Fine-Tune Only When Necessary",
    category: "AI",
    content: "Fine-tuning is expensive and time-consuming. Try prompt engineering and few-shot learning first.",
    codeSnippet: "// Try: better prompts, examples in prompt, RAG before fine-tuning",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Log Prompts for Debugging",
    category: "AI",
    content: "Save prompts and responses to debug issues and improve prompt quality over time.",
    codeSnippet: "logger.info({ prompt, response, timestamp, userId });",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use AI to Summarize Logs",
    category: "AI",
    content: "Feed error logs to AI for quick summaries and potential solutions to issues.",
    codeSnippet: "// Prompt: 'Analyze these error logs and suggest the root cause'",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Combine AI with Rule-Based Validation",
    category: "AI",
    content: "Use AI for flexibility but add rule-based checks for critical validations and safety.",
    codeSnippet: "const aiResult = await ai.classify(input);\nif (!passesRules(aiResult)) return fallback;",
    difficulty: "Advanced",
    track: ["backend", "fullstack"]
  },
  {
    title: "Treat AI as Assistant, Not Authority",
    category: "AI",
    content: "AI is a tool to augment your skills, not replace your judgment. You're still responsible for the code.",
    codeSnippet: "// Review, understand, and own all AI-generated code",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  }
];

module.exports = { aiTips };
