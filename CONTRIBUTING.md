# Contribution Guidelines

Welcome to the project! To maintain high code quality and smooth collaboration, please follow these guidelines.

---

## 1. Branching & Pull Requests

- **No Direct Pushes:** Pushing directly to `main` is strictly prohibited.
- **Force-Push Restrictions:**
  - `force-push` (and `push --force-with-lease`) is **strictly banned** on the `main` branch.
  - `force-push` is **strictly banned** on any shared feature branches where multiple developers are working together.
  - You may only use `force-push` on your own isolated, personal feature branches (e.g., during a rebase).
- **Semantic Branch Naming:** Always use descriptive prefixes for your branches:
  - `feat/short-description` (e.g., `feat/auth`)
  - `fix/short-description` (e.g., `fix/api`)
  - `chore/short-description` (e.g., `chore/deps`)
- **Project Linking:** Every Pull Request **must** be linked to its corresponding issue in GitHub Projects.
- **PR Description:** Every PR must include a clear summary of changes. For UI-related changes, screenshots or screen recordings are **mandatory**.
- **Branch Deletion & Commit History:** To allow course organizers to review your development process, your full commit history must remain accessible. Follow these rules after merging:
  - **If you merge without squashing:** You **can** delete the feature branch. The full history is preserved in the `main` branch, allowing reviewers to see every step of your work.
  - **If you choose to squash commits:** You **must not** delete the feature branch. Squashing collapses your history into a single commit in `main`, making the original branch the only place where your detailed commit history remains.
- **PR Size Limit:** Keep PRs focused. Aim to stay under **1000–1500 lines of code**. The only exception is a major feature branch combined from multiple sub-branches.
- **Draft PRs for WIP:** Use **Draft PRs** if your work is in progress but you want early feedback, architecture validation, or need help from teammates before a formal review.

## 2. Git History & Commits

- **Conventional Commits:** Follow the semantic commit format:
  - `feat: add login page`
  - `fix: resolve token expiration bug`
  - `chore: update packages`
- **Clear Commit Messages:** Ensure commit descriptions are meaningful and clear.
- **Keep It Updated:** Before merging, make sure your branch is up to date with `main`. Prefer `rebase` over standard merge commits to keep history clean.
- **Squash on Merge:** Squash multiple minor or "work-in-progress" commits into a single clean commit before merging. **Do not delete** the feature branch (see above)

## 3. Pre-Review Checklist

Before requesting a review, you **must** ensure:

1. The CI pipeline passes successfully (linting, tests, build).
2. The application runs locally and works as expected.

## 4. Code Review Etiquette

### Reviewer Assignment

- Assign **@mummick** (Mentor) AND at least **one other team member**.
- If your PR does not receive a review within **24 hours**, feel free to ping the reviewers.

### For Authors (When your code is reviewed)

- **Thread Ownership:** Do not close discussion threads yourself. Only the reviewer who opened the thread should resolve it.
- **Use Emoji Statuses:**
  - 👀 (Eyes) – I have seen the comment and I am looking into it.
  - 👍 (Thumbs Up) – Fix applied / Done.
- **Healthy Communication:** If you disagree with a comment or want to provide extra context, explain your reasoning calmly and professionally. Be polite and constructive at all times. If a discussion becomes prolonged or reaches a standstill, invite a third team member to mediate and help resolve the issue.
- **Merging:** You can merge the PR only after all discussion threads are resolved/closed.

### For Reviewers

Use prefixes to categorize your comments. If a comment **does not** have a prefix, it is considered a **blocker** and must be fixed.

- `[praise]` – Highlighting something well-written or elegant.
- `[nit]` – A minor stylistic suggestion. Non-blocking; the author decides whether to implement it.
- `[question]` – Seeking clarification or context on why a specific approach was taken.
