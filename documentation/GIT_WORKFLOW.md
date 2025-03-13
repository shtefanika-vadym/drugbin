# Project Git Workflow

This document outlines a straightforward Git workflow for ensuring that each pull request (PR) contains a single commit.

Having a single commit in a PR ensures a cleaner and more organized Git history, making it easier to track changes, debug issues, and avoid merge conflicts. It also simplifies the code review process by presenting all related changes together in a cohesive manner.

---

## Workflow

### 1. Create a New Branch

Start by creating a branch for your task or feature:

```bash
git checkout -b <branch-name>
```

Replace `<branch-name>` with a descriptive name (e.g., `feature/login-screen`).

---

### 2. Implement Your Task

1. Make the required changes for your task.
2. Test your code locally to ensure it works as expected.

---

### 3. Stage and Commit Your Changes

Once your changes are ready:

1. Stage the changes:
   ```bash
   git add .
   ```
2. Commit the changes with a descriptive message:
   ```bash
   git commit -m "Brief description of the changes"
   ```

---

### 4. Amend If Additional Changes Are Needed

If you need to make further changes after your initial commit:

1. Make the changes and stage them again:
   ```bash
   git add .
   ```
2. Use the `git commit --amend` command to update the previous commit instead of creating a new one:
   ```bash
   git commit --amend
   ```
   This will allow you to modify the commit message or add new changes to the same commit.

---

### 5. Push Your Branch

Once your changes are finalized, push your branch to the remote repository:

```bash
git push origin feature/<branch-name>
```

If you've amended a commit, you may need to force push:

```bash
git push --force
```

---

### 6. Rebase If Multiple Commits Exist

If your branch ends up with multiple commits (e.g., due to accidental commits or merges), squash them into a single commit before opening a PR:

1. Check the number of commits in your branch using:
   ```bash
   git log --oneline
   ```
2. Rebase interactively to combine commits:
   ```bash
   git rebase -i HEAD~<number-of-commits>
   ```
   Replace `<number-of-commits>` with the total number of commits in your branch.
3. During the interactive rebase:

   - Mark the first commit as `pick`.
   - Change subsequent commits to `squash` or `s`.

4. Save and close the editor to complete the rebase.

---

### 7. Submit a Pull Request

Once your branch has a single clean commit:

1. Push the rebased branch:
   ```bash
   git push origin <branch-name>
   ```
2. Open a PR in the repository’s Git interface.
3. Ensure your PR description clearly explains the changes.

---

### 7. Use “Rebase and Merge” for Pull Requests

When merging a PR into the main branch, always use the Rebase and Merge option instead of a standard merge.

### Why is this beneficial?

    1. It keeps the Git history linear and easier to read, avoiding unnecessary merge commits.
    2. A linear history helps to trace changes and understand the evolution of the codebase.
    3. It prevents clutter, especially in repositories with multiple contributors, by eliminating merge bubbles.

---
