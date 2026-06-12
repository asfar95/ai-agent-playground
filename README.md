# sample-app

A deliberately simple Node.js/Express app used as a **live demo target** for an autonomous AI agent pipeline. Whenever a bug is reported here, three AI agents automatically triage it, write a fix, open a PR, and address code review comments — end to end, with no human intervention.

---

## The AI Pipeline

```
You open an issue
       │
       ▼
┌─────────────────────┐
│  🤖 Triage Agent    │  Reads the issue, searches for duplicates,
│  (github-issue-     │  classifies it (bug / feature / question…),
│   triage-agent)     │  adds the right label, posts a comment.
└────────┬────────────┘
         │ adds "bug" label
         ▼
┌─────────────────────┐
│  🔧 Autofix Agent   │  Finds the root cause in the code, writes
│  (github-autofix-   │  a minimal fix on a new branch, and opens
│   agent)            │  a pull request with a full description.
└────────┬────────────┘
         │ PR opened
         ▼
┌─────────────────────┐
│  🔍 Code Review Bot │  Reviews every changed file, posts inline
│  (ai-code-review-   │  comments on logic errors, style issues,
│   bot)              │  and missing tests.
└────────┬────────────┘
         │ review comments posted
         ▼
┌─────────────────────┐
│  🔧 Autofix Agent   │  Reads each review comment, applies the
│  (review-fix mode)  │  valid fixes to the PR branch, and replies
│                     │  to each comment explaining what changed.
└─────────────────────┘
```

All four stages run automatically. The only thing a human needs to do is open the issue.

---

## Trigger the Pipeline Yourself

### 1. Open a bug issue

Go to [Issues → New Issue](../../issues/new) and describe a bug. Be specific — the agents read the title and body carefully.

**Example issue that works well:**

> **Title:** `calculateTax` returns wrong value — taxRate treated as whole number not percentage
>
> **Body:**
> ```
> The calculateTax function in src/utils.js multiplies price directly by taxRate,
> but taxRate is expected to be a percentage (e.g. 15 for 15%).
>
> Current behaviour:
>   calculateTax(100, 15) → 1500
>
> Expected behaviour:
>   calculateTax(100, 15) → 15
>
> The fix should divide taxRate by 100 before multiplying:
>   return price * (taxRate / 100);
> ```

### 2. Watch the agents work

Within seconds of opening the issue:

| Time | What happens |
|------|-------------|
| ~0s  | Triage agent receives the webhook, reads the issue |
| ~30s | Issue labeled `bug`, triage comment posted |
| ~90s | Autofix agent starts (intentional delay — lets triage finish first) |
| ~3min | Fix branch created, PR opened with full description |
| ~4min | Code review bot reviews the PR, posts inline comments |
| ~5min | Review-fix agent addresses comments, replies on the PR |

### 3. Check the results

- **Issue page** — triage comment explaining the classification
- **Pull Requests** — a `fix/issue-N-*` branch with the minimal fix
- **PR review thread** — inline comments from the review bot and replies from the fix agent

---

## App Structure

```
src/
├── index.js    — Express server, route definitions
├── utils.js    — Utility functions (calculateDiscount, calculateTax, …)
├── orders.js   — Order processing logic
└── auth.js     — Authentication helpers
```

## Local Setup

```bash
npm install
npm start      # runs on http://localhost:3000
```

---

## Agent Repos

| Agent | Repo | Purpose |
|-------|------|---------|
| Triage | [github-issue-triage-agent](https://github.com/asfar95/github-issue-triage-agent) | Classify and label issues |
| Autofix | [github-autofix-agent](https://github.com/asfar95/github-autofix-agent) | Write fixes and address reviews |
| Code Review | [ai-code-review-bot](https://github.com/asfar95/ai-code-review-bot) | Review PRs and leave inline comments |
