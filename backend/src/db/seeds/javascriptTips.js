const javascriptTips = [
  {
    title: "Use Optional Chaining",
    category: "JavaScript",
    content: "Safely access nested properties without checking each level. Prevents 'Cannot read property of undefined' errors.",
    codeSnippet: "const name = user?.profile?.name;\n// Instead of: user && user.profile && user.profile.name",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Nullish Coalescing",
    category: "JavaScript",
    content: "Use ?? to provide default values only for null or undefined, not for falsy values like 0 or empty string.",
    codeSnippet: "const count = value ?? 10;\n// Different from: value || 10",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Always Handle Async Errors",
    category: "JavaScript",
    content: "Wrap async/await code in try/catch blocks to prevent unhandled promise rejections.",
    codeSnippet: "try {\n  const data = await fetchData();\n} catch (error) {\n  console.error('Failed:', error);\n}",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Debounce Expensive Functions",
    category: "JavaScript",
    content: "Limit how often a function runs, perfect for search inputs or resize handlers.",
    codeSnippet: "const debounce = (fn, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};",
    difficulty: "Intermediate",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Array.map() Over Loops",
    category: "JavaScript",
    content: "Transform arrays functionally with map() for cleaner, more readable code.",
    codeSnippet: "const doubled = numbers.map(n => n * 2);\n// Instead of for loops",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Avoid var, Use let/const",
    category: "JavaScript",
    content: "var has function scope and hoisting issues. Always use const by default, let when reassignment is needed.",
    codeSnippet: "const API_KEY = 'abc123'; // Won't change\nlet count = 0; // Will change",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Destructuring for Cleaner Code",
    category: "JavaScript",
    content: "Extract values from objects and arrays in one line instead of multiple assignments.",
    codeSnippet: "const { name, age } = user;\nconst [first, second] = array;",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Default Function Parameters",
    category: "JavaScript",
    content: "Set default values directly in function parameters instead of checking inside the function.",
    codeSnippet: "function greet(name = 'Guest') {\n  return `Hello, ${name}`;\n}",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Promise.all for Parallel Calls",
    category: "JavaScript",
    content: "Run multiple async operations simultaneously instead of sequentially to save time.",
    codeSnippet: "const [users, posts] = await Promise.all([\n  fetchUsers(),\n  fetchPosts()\n]);",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Memoize Heavy Computations",
    category: "JavaScript",
    content: "Cache expensive function results to avoid recalculating the same values.",
    codeSnippet: "const memo = {};\nfunction expensive(n) {\n  if (memo[n]) return memo[n];\n  memo[n] = /* calculation */;\n  return memo[n];\n}",
    difficulty: "Advanced",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Strict Equality",
    category: "JavaScript",
    content: "Always use === instead of == to avoid type coercion bugs.",
    codeSnippet: "if (value === 5) // Good\nif (value == 5) // Bad - type coercion",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Avoid Blocking UI with Long Loops",
    category: "JavaScript",
    content: "Break up long-running operations or use Web Workers to keep the UI responsive.",
    codeSnippet: "// Use setTimeout to yield to browser\nfor (let i = 0; i < 1000; i++) {\n  if (i % 100 === 0) await new Promise(r => setTimeout(r, 0));\n}",
    difficulty: "Advanced",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Object.entries() for Iteration",
    category: "JavaScript",
    content: "Iterate over object keys and values simultaneously with Object.entries().",
    codeSnippet: "for (const [key, value] of Object.entries(obj)) {\n  console.log(key, value);\n}",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Avoid Deep Nested Callbacks",
    category: "JavaScript",
    content: "Use async/await or promises to flatten callback hell and improve readability.",
    codeSnippet: "// Bad: callback hell\n// Good: async/await\nconst data = await step1();\nconst result = await step2(data);",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Modules Instead of Global Scripts",
    category: "JavaScript",
    content: "Organize code with ES6 modules for better maintainability and avoid global namespace pollution.",
    codeSnippet: "// utils.js\nexport const helper = () => {};\n// main.js\nimport { helper } from './utils.js';",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Understand Event Loop Basics",
    category: "JavaScript",
    content: "Know how JavaScript handles async code with the call stack, task queue, and microtask queue.",
    codeSnippet: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output: 1, 4, 3, 2",
    difficulty: "Advanced",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Array.filter() Smartly",
    category: "JavaScript",
    content: "Filter arrays based on conditions to create new arrays without mutating the original.",
    codeSnippet: "const adults = users.filter(user => user.age >= 18);",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Clean Up Event Listeners",
    category: "JavaScript",
    content: "Remove event listeners when components unmount to prevent memory leaks.",
    codeSnippet: "useEffect(() => {\n  window.addEventListener('resize', handler);\n  return () => window.removeEventListener('resize', handler);\n}, []);",
    difficulty: "Intermediate",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Intl for Date Formatting",
    category: "JavaScript",
    content: "Format dates and numbers properly for different locales using the built-in Intl API.",
    codeSnippet: "const date = new Intl.DateTimeFormat('en-US').format(new Date());\nconst price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(99.99);",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Avoid Mutating State Directly",
    category: "JavaScript",
    content: "Create new objects/arrays instead of modifying existing ones, especially in React.",
    codeSnippet: "// Bad: state.push(item)\n// Good:\nsetState([...state, item]);",
    difficulty: "Beginner",
    track: ["frontend", "fullstack"]
  }
];

module.exports = { javascriptTips };
