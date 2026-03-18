const gitTips = [
  {
    title: "Undo Last Commit Without Losing Changes",
    category: "Git",
    content: "Use git reset --soft HEAD~1 to undo your last commit while keeping all changes staged. This is perfect when you committed too early or want to modify the commit message.",
    codeSnippet: "git reset --soft HEAD~1",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Stash Untracked Files",
    category: "Git",
    content: "By default, git stash only saves tracked files. Use the -u flag to include untracked files in your stash.",
    codeSnippet: "git stash -u",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Visualize Git History",
    category: "Git",
    content: "Get a beautiful visual representation of your git history with branches and merges using this one-liner command.",
    codeSnippet: "git log --oneline --graph --all",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Create Git Aliases",
    category: "Git",
    content: "Save time by creating shortcuts for commonly used git commands. For example, use 'git co' instead of 'git checkout'.",
    codeSnippet: "git config --global alias.co checkout",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Interactive Rebase for Clean History",
    category: "Git",
    content: "Clean up your commit history before pushing by squashing, reordering, or editing commits interactively.",
    codeSnippet: "git rebase -i HEAD~3",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Recover Deleted Branch",
    category: "Git",
    content: "Accidentally deleted a branch? Use git reflog to find the commit hash and restore it.",
    codeSnippet: "git reflog\ngit checkout -b recovered-branch <commit-hash>",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use .gitignore Generators",
    category: "Git",
    content: "Don't write .gitignore files from scratch. Use gitignore.io to generate templates for your tech stack instantly.",
    codeSnippet: "# Visit gitignore.io or use:\ncurl -L https://www.gitignore.io/api/node,react > .gitignore",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Sign Commits with GPG",
    category: "Git",
    content: "Add verified badges to your commits by signing them with GPG keys. This proves you're the real author.",
    codeSnippet: "git config --global commit.gpgsign true",
    difficulty: "Advanced",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Preview Staged Changes",
    category: "Git",
    content: "Before committing, review exactly what you've staged to avoid committing unwanted changes.",
    codeSnippet: "git diff --staged",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Squash Commits Before PR",
    category: "Git",
    content: "Keep your repository history clean by squashing multiple commits into one before creating a pull request.",
    codeSnippet: "git rebase -i HEAD~5\n# Change 'pick' to 'squash' for commits to merge",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Cherry-Pick Specific Commits",
    category: "Git",
    content: "Copy a specific commit from one branch to another without merging the entire branch.",
    codeSnippet: "git cherry-pick <commit-hash>",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Protect Main Branch",
    category: "Git",
    content: "In GitHub settings, enable branch protection rules to prevent direct pushes to main and require PR reviews.",
    codeSnippet: "Settings → Branches → Add rule → Require pull request reviews",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Trace Code Ownership",
    category: "Git",
    content: "Find out who wrote each line of code and when using git blame. Useful for understanding code history.",
    codeSnippet: "git blame filename.js",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Shallow Clone for Speed",
    category: "Git",
    content: "Clone only the latest commit instead of entire history to save time and bandwidth on large repositories.",
    codeSnippet: "git clone --depth=1 <repository-url>",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Remove Untracked Files",
    category: "Git",
    content: "Clean up untracked files and directories from your working directory safely.",
    codeSnippet: "git clean -fd",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Feature Branches",
    category: "Git",
    content: "Always create a new branch for each feature or bug fix. Never work directly on main branch.",
    codeSnippet: "git checkout -b feature/user-authentication",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Write Meaningful Commit Messages",
    category: "Git",
    content: "Avoid vague messages like 'fixed stuff'. Write clear, descriptive messages that explain what and why.",
    codeSnippet: "git commit -m \"Fix login validation to prevent SQL injection\"",
    difficulty: "Beginner",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Use Conventional Commits",
    category: "Git",
    content: "Follow the conventional commits format for consistent, parseable commit messages that can generate changelogs.",
    codeSnippet: "git commit -m \"feat: add user profile page\"\ngit commit -m \"fix: resolve memory leak in API\"",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Find Breaking Commits with Bisect",
    category: "Git",
    content: "Use binary search to quickly find which commit introduced a bug in your codebase.",
    codeSnippet: "git bisect start\ngit bisect bad\ngit bisect good <commit-hash>",
    difficulty: "Advanced",
    track: ["frontend", "backend", "fullstack"]
  },
  {
    title: "Automate Checks with GitHub Actions",
    category: "Git",
    content: "Set up automated testing, linting, and deployment using GitHub Actions on every push or PR.",
    codeSnippet: "name: Test\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm test",
    difficulty: "Intermediate",
    track: ["frontend", "backend", "fullstack"]
  }
];

module.exports = { gitTips };
