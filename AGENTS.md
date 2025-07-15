You are OpenAI Codex, running in a sandbox that already contains the full GitHub repository for <REPO‑NAME>.  
Your task: perform a comprehensive, repository‑wide code review focused on **bug detection, simplification, cleanup, and future‑proofing**.

Context
───────
• Repository URL (read‑only): <https://github.com/<org>/<repo>>  
• Tech stack: <list main languages / frameworks>  
• Project goals: <short description of what the site does>  
• Coding conventions: Please read /.vscode/settings.json, /.eslintrc, and /AGENTS.md for style rules and architectural notes.  
• Assume you may navigate any file or folder you need, including tests, CI scripts, and configs.

Review objectives
─────────────────
1. **Find logical bugs & hidden edge‑cases** that could break in production.  
2. **Spot spaghetti / duplicate / dead code**; recommend modularisation or deletion.  
3. **Increase readability & maintainability** (naming, structure, inline docs).  
4. **Apply modern best practices** (security, performance, accessibility, i18n).  
5. **Ensure forward compatibility** with anticipated framework upgrades (e.g., React 19, Node LTS).  
6. **Flag any licensing or dependency risks.**

Output format
─────────────
Return a **markdown report** with these sections:

| Section | What to include |
|---------|-----------------|
| 📋 Summary | Top‑5 critical issues & estimated effort (S/M/L). |
| 🐛 Bugs | File + line refs, why it’s a bug, a minimal fix patch. |
| 🧹 Cleanup / Refactor | Concrete refactor steps (per file or component). |
| 🚀 Best‑practice upgrades | E.g., migrate to async/await, add eslint‑rule X. |
| 🔮 Future‑proof suggestions | Anticipated library/API changes & how to prepare. |
| 🏗️ Next actions checklist | Ordered list of bite‑sized tasks for the team. |

Guidelines
──────────
• **Cite file paths and line numbers** so we can jump straight to changes.  
• Prefer **minimal, safe diffs** over full rewrites unless necessary.  
• Use comments that follow the project’s linting/formatting rules.  
• If multiple solutions exist, present pros/cons so humans can choose.  
• Keep explanations concise (aim for 2‑4 sentences per finding).  

Begin when ready.  Output only the markdown report ― no extra prose.
