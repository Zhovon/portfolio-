# Agent instructions

Read CLAUDE.md — it is the single source of truth for this repo (commands, structure, conventions, gotchas). This file exists so non-Claude tools find the same instructions; do not duplicate content here.

Extra rules for all agents:
1. Read MEMORY.md before making decisions; append significant decisions to it.
2. Read ARCHITECTURE.md only when the task touches routing, APIs, data flow, or deployment.
3. Never commit `portfolio-/` (nested repo copy), zip files, logs, or CSV exports.
4. Run `npm run build` before declaring UI changes done.
