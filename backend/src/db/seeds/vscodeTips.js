const vscodeTips = [
  {
    title: "Multi-Cursor Editing",
    category: "VS Code",
    content: "Place multiple cursors by holding Alt and clicking. Edit multiple lines simultaneously for massive productivity gains.",
    codeSnippet: "Alt + Click (Windows/Linux)\nOption + Click (Mac)",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Rename Variable Globally",
    category: "VS Code",
    content: "Press F2 on any variable to rename it everywhere in your project safely and instantly.",
    codeSnippet: "// Place cursor on variable, press F2, type new name",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Emmet Abbreviations",
    category: "VS Code",
    content: "Write HTML faster with Emmet shortcuts. Type abbreviations and press Tab to expand.",
    codeSnippet: "div.container>ul>li*5\n// Expands to full HTML structure",
    difficulty: "Beginner",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Install ESLint Extension",
    category: "VS Code",
    content: "Catch errors and enforce code style automatically with ESLint integration in VS Code.",
    codeSnippet: "// Install ESLint extension\n// Add .eslintrc.json to project",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Prettier Auto-Format",
    category: "VS Code",
    content: "Format code automatically on save. Never worry about spacing or indentation again.",
    codeSnippet: "// Settings.json\n\"editor.formatOnSave\": true,\n\"editor.defaultFormatter\": \"esbenp.prettier-vscode\"",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Go to Definition",
    category: "VS Code",
    content: "Press F12 on any function or variable to jump to where it's defined. Ctrl+Click also works.",
    codeSnippet: "// F12 or Ctrl+Click on function name",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Workspace-Specific Settings",
    category: "VS Code",
    content: "Create .vscode/settings.json in your project for team-wide editor configurations.",
    codeSnippet: "{\n  \"editor.tabSize\": 2,\n  \"files.exclude\": {\n    \"node_modules\": true\n  }\n}",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Integrated Terminal",
    category: "VS Code",
    content: "Open terminal inside VS Code with Ctrl+` to run commands without switching windows.",
    codeSnippet: "Ctrl + ` (backtick)",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use GitLens Extension",
    category: "VS Code",
    content: "See git blame, commit history, and authorship inline in your code with GitLens.",
    codeSnippet: "// Install GitLens extension\n// Hover over any line to see git info",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Create Custom Snippets",
    category: "VS Code",
    content: "Save time by creating snippets for repetitive code patterns you use frequently.",
    codeSnippet: "// File > Preferences > User Snippets\n\"Console Log\": {\n  \"prefix\": \"cl\",\n  \"body\": \"console.log($1);\"\n}",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Split Editor View",
    category: "VS Code",
    content: "View multiple files side-by-side by dragging tabs or using Ctrl+\\.",
    codeSnippet: "Ctrl + \\ (split editor)\nCtrl + 1/2/3 (focus editor group)",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Enable Autosave Wisely",
    category: "VS Code",
    content: "Enable autosave to never lose work, but use 'onFocusChange' to avoid constant rebuilds.",
    codeSnippet: "\"files.autoSave\": \"onFocusChange\"",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Search Across Project",
    category: "VS Code",
    content: "Find text across all files in your project instantly with Ctrl+Shift+F.",
    codeSnippet: "Ctrl + Shift + F\n// Use regex for advanced searches",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Bracket Pair Colorization",
    category: "VS Code",
    content: "Enable bracket colorization to easily match opening and closing brackets in nested code.",
    codeSnippet: "\"editor.bracketPairColorization.enabled\": true",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Debugger Instead of Console.log",
    category: "VS Code",
    content: "Set breakpoints and use the built-in debugger to inspect variables and step through code.",
    codeSnippet: "// Click left of line number to set breakpoint\n// Press F5 to start debugging",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Install REST Client Extension",
    category: "VS Code",
    content: "Test APIs directly in VS Code without leaving your editor using REST Client extension.",
    codeSnippet: "### Get Users\nGET https://api.example.com/users\nContent-Type: application/json",
    difficulty: "Intermediate",
    track: ["backend", "fullstack"]
  },
  {
    title: "Use Command Palette",
    category: "VS Code",
    content: "Access any VS Code command quickly with Ctrl+Shift+P. No need to remember shortcuts.",
    codeSnippet: "Ctrl + Shift + P\n// Type command name",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Customize Keybindings",
    category: "VS Code",
    content: "Change keyboard shortcuts to match your workflow. File > Preferences > Keyboard Shortcuts.",
    codeSnippet: "// keybindings.json\n{\n  \"key\": \"ctrl+shift+d\",\n  \"command\": \"editor.action.duplicateSelection\"\n}",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Live Server for Frontend",
    category: "VS Code",
    content: "Install Live Server extension to auto-reload your browser when you save HTML/CSS/JS files.",
    codeSnippet: "// Install Live Server extension\n// Right-click HTML file > Open with Live Server",
    difficulty: "Beginner",
    track: ["frontend", "fullstack"]
  },
  {
    title: "Use Profiles to Switch Setups",
    category: "VS Code",
    content: "Create different profiles for different projects or languages with custom extensions and settings.",
    codeSnippet: "// File > Preferences > Profiles\n// Create profiles for React, Node, Python, etc.",
    difficulty: "Advanced",
    track: ["frontend", "backend", "fullstack"]
  }
];

module.exports = { vscodeTips };
