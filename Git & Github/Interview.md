# 🌿 The Complete Git & GitHub Handbook
### From Absolute Beginner to Interview Expert — MERN Stack Edition


## 📖 How to Use This Handbook

Same structure as the Authentication & Authorization Handbook: read once top-to-bottom, then use the Cheat Sheet, Flashcards, and Revision Notes for spaced repetition.

| Level | Meaning |
|---|---|
| 🟢 L1 | Absolute Beginner |
| 🟢 L2 | Beginner |
| 🟡 L3 | Intermediate |
| 🟠 L4 | Advanced |
| 🔴 L5 | Production Level |
| 🟣 L6 | Interview Expert |

---

# Chapter 1 — Introduction to Git & GitHub

## 1.1 What Is Git? 🟢 L1

**Git** is a **distributed version control system (DVCS)** — software that tracks changes to files over time so you can recall specific versions later, work in parallel with others, and merge everyone's changes back together safely.

"Distributed" is the key word: **every developer has a full copy of the entire project history** on their own machine, not just the latest snapshot. There's no single point of failure, and most operations (viewing history, committing, branching, diffing) work completely offline.

## 1.2 What Is GitHub? 🟢 L1

**GitHub** is a **cloud hosting platform for Git repositories**, adding a web UI and collaboration features on top of Git: pull requests, code review, issues, project boards, CI/CD (GitHub Actions), and social/discovery features (stars, forks).

**Critical distinction for interviews:** Git is the *tool* (version control). GitHub is a *company/product* that *hosts* Git repositories and adds collaboration workflow on top. You could use Git your entire career without ever touching GitHub (GitLab, Bitbucket, or a private server are alternatives). **Git ≠ GitHub.**

## 1.3 Why Was Git Created? 🟢 L1

Git was created in **2005 by Linus Torvalds** (creator of Linux) in about 10 days, after the Linux kernel project lost free access to the proprietary version control system it had been using (BitKeeper). Linus needed something:
- **Fast** — the Linux kernel has tens of thousands of files and a massive change history.
- **Distributed** — thousands of contributors worldwide, no reliable single central server dependency.
- **Non-linear-friendly** — must handle thousands of parallel branches merging constantly.
- **Data-integrity-guaranteed** — every single change is checksummed (SHA-1, now transitioning toward SHA-256), so corruption or tampering is detectable.

## 1.4 Why Do Companies Use Git & GitHub? 🟢 L1

- **Collaboration at scale** — hundreds of engineers can work on the same codebase simultaneously without overwriting each other's work.
- **History & accountability** — every change is attributed (`git blame`), timestamped, and reversible.
- **Code review workflow** — pull requests are the industry-standard way to review code before it merges.
- **CI/CD integration** — GitHub Actions (or similar) automatically test/build/deploy on every push.
- **Disaster recovery** — since every clone is a full backup of history, losing the central server doesn't lose the project.
- **Open-source ecosystem** — GitHub hosts the majority of the world's open-source code, making it a discovery and portfolio platform too.

## 1.5 Real-World Analogy — The Save-Game System 🟢 L1

Think of Git like a video game's save system, but smarter:

| Real World / Gaming | Git Equivalent |
|---|---|
| Manually saving your game progress | `git commit` |
| Multiple save slots to try different strategies | Branches |
| Loading an old save to undo a bad decision | `git checkout` / `git revert` |
| Combining progress from two different playthroughs | Merge |
| A friend's save file conflicting with yours when you compare notes | Merge conflict |
| A cloud backup of all your save files | GitHub (remote repository) |
| Multiple friends' save files, all derived from the same original game | Distributed repositories (clones) |

## 1.6 History Timeline 🟢 L2

```
1972 ─── SCCS - first version control system (single-file, centralized)
1982 ─── RCS - Revision Control System
1990 ─── CVS - Concurrent Versions System (multi-file, centralized)
2000 ─── Subversion (SVN) - improved centralized VCS, industry standard for years
2000 ─── BitKeeper adopted by Linux kernel (proprietary, distributed)
2005 ─── BitKeeper free license revoked → Linus Torvalds writes Git in ~10 days
2005 ─── Git 0.1 released; Linux kernel switches to it immediately
2008 ─── GitHub launches (founded by Chris Wanstrath, PJ Hyett, Tom Preston-Werner)
2010 ─── GitLab launches (self-hosted competitor)
2011 ─── Bitbucket adds Git support (was Mercurial-only)
2018 ─── Microsoft acquires GitHub (~$7.5B)
2019 ─── GitHub Actions launched (CI/CD built-in)
2021 ─── GitHub Copilot launched (AI pair programming)
2020s ── Git ecosystem shifts default branch naming from "master" to "main"
```

## 1.7 Advantages 🟢 L2

- Full offline capability (commit, branch, view history without internet).
- Extremely fast for most operations (local operations, no network round-trip).
- Powerful branching/merging model — cheap, instant branch creation.
- Complete, tamper-evident history via SHA hashing.
- Massive ecosystem (GitHub, GitLab, CI/CD tools, IDE integrations).

## 1.8 Disadvantages / Trade-offs ⚖️ 🟢 L2

- **Steep learning curve** — the underlying model (DAG of commits) is genuinely more complex than "save/load."
- **Large binary files handled poorly** — Git is optimized for text diffs; large binaries (videos, design files) bloat repo size (mitigated with Git LFS).
- **History rewriting is dangerous** — commands like `rebase -i`, `push --force`, `filter-branch` can permanently lose work if misused, especially on shared branches.
- **Merge conflicts** can be genuinely confusing for beginners, especially with complex histories.

---

# Chapter 2 — Core Concepts (Explained Completely)

## 2.1 The Three Trees / Areas 🟢 L2

Git manages your files across **three areas** (plus the actual files on disk):

```
┌────────────────┐     git add      ┌────────────────┐    git commit    ┌────────────────┐
│ Working         │ ───────────────▶│ Staging Area    │ ───────────────▶│ Repository       │
│ Directory        │                 │ (Index)         │                  │ (.git history)   │
│ (your actual     │                 │ "what will go   │                  │ "permanently      │
│  files, editable)│                 │  into the next  │                  │  saved snapshots" │
│                  │◀───────────────│  commit"        │◀───────────────│                    │
└────────────────┘   git checkout    └────────────────┘   git reset       └────────────────┘
```

- **Working Directory** — the actual files you see and edit on disk.
- **Staging Area (Index)** — a "waiting room" where you assemble exactly what should go into the *next* commit. This is the concept beginners find most confusing, and it's a favorite interview topic.
- **Repository (.git folder)** — the permanent, committed history — a database of snapshots.

**Why does the staging area exist?** It lets you **craft precise, logical commits** — e.g., you changed 5 files but only want 2 of them in this commit, or even only certain *lines* within a file (`git add -p`). Without staging, every commit would be forced to include literally everything currently changed.

## 2.2 What a Commit Actually Is 🟡 L3

A common beginner misconception: a commit is **not** a diff. A commit is a **complete, compressed snapshot** of the entire project at that point in time (Git is smart enough to internally store unchanged files as pointers to existing objects rather than duplicating them — so it's efficient despite being "full snapshots" conceptually).

Every commit object contains:
- A pointer to a **tree** object (the snapshot of the directory structure/files).
- A pointer to its **parent commit(s)** (none for the first commit; two for a merge commit).
- **Author** (who wrote the code) and **committer** (who applied the commit — often the same, but not always, e.g., after a rebase).
- A **commit message**.
- A **SHA-1 hash** — a unique 40-character identifier computed from all of the above, meaning the hash changes if *anything* changes (even the message), making history tamper-evident.

## 2.3 Git's Object Model — The Four Object Types 🟠 L4

Git's entire history is just a **content-addressable key-value store** of four object types, all identified by SHA hash of their content:

| Object | Contains | Analogy |
|---|---|---|
| **Blob** | Raw file content (no filename!) | A file's *content only* |
| **Tree** | List of blobs/trees + filenames + modes | A directory listing |
| **Commit** | Pointer to a tree + parent(s) + metadata | A snapshot + its story |
| **Tag** | Pointer to a specific commit + metadata | A named bookmark (usually for releases) |

**Interview-critical fact:** A blob stores content **without** a filename — if two files anywhere in history have identical content, Git stores that content **once** and both files' tree entries point to the same blob. This is why renaming a file with unchanged content is essentially "free" for Git — it's detected by content similarity, not tracked as an explicit operation like in some other VCS.

```
COMMIT ──▶ TREE (root) ──▶ TREE (src/) ──▶ BLOB (index.js content)
   │                   └──▶ BLOB (README.md content)
   └──▶ parent COMMIT ──▶ TREE ──▶ ...
```

## 2.4 Branches Are Just Pointers 🟡 L3

A **branch** in Git is nothing more than a **movable pointer (a 40-character file containing a commit SHA)** to a specific commit. This is radically different from how some older VCS (like SVN) implement branches as expensive full directory copies.

```
main:    A ─── B ─── C
                       ▲
                     (main pointer)

feature: A ─── B ─── C ─── D ─── E
                                    ▲
                                (feature pointer)
```

Creating a branch (`git branch feature`) is **instant** — it just writes a new small file pointing at the current commit. This is why Git branching is described as "cheap" — it's O(1), not proportional to project size.

**HEAD** is a special pointer that tracks **which branch (or commit) you currently have checked out** — literally a pointer to a pointer (usually).

```
HEAD ──▶ main ──▶ C (latest commit on main)
```

When you commit, Git: creates a new commit object pointing at the old commit as parent → moves the **current branch pointer** to the new commit → HEAD (still pointing at the branch) now resolves to the new commit automatically.

## 2.5 Merging vs. Rebasing 🟠 L4

Both integrate changes from one branch into another, but they produce fundamentally different history shapes.

### Merge (`git merge`)
Creates a new **merge commit** with **two parents**, preserving the exact history of both branches as it happened.
```
Before:
main:     A ─── B ─────────── E (merge commit)
                    \        /
feature:              C ─── D

git checkout main
git merge feature
```

### Rebase (`git rebase`)
**Replays** your branch's commits one-by-one on top of the target branch's latest commit, creating **brand new commits** (different SHAs) with a **linear** history — no merge commit.
```
Before:
main:     A ─── B
                    \
feature:              C ─── D

git checkout feature
git rebase main

After:
main:     A ─── B
                    \
feature:              C' ─── D'   (new commits, same changes, different SHAs)
```

| | Merge | Rebase |
|---|---|---|
| History shape | Preserves branching (non-linear) | Linear, cleaner-looking |
| Creates new commits? | One new merge commit | Yes — every rebased commit gets a new SHA |
| Safe on shared/public branches? | Yes, always | **No** — rewriting shared history breaks collaborators' clones |
| Preserves "what actually happened"? | Yes, exact record | No — rewrites the story to look like it happened in a different order |

**The golden rule of rebasing (guaranteed interview question):** *Never rebase a branch that others have already pulled/based work on.* Rebase changes commit SHAs — anyone with the old commits will get confusing duplicate/conflicting history when they next pull.

## 2.6 Merge Conflicts — What They Actually Are 🟡 L3

A merge conflict happens when Git **cannot automatically decide** how to combine changes — most commonly, when the **same lines** of the same file were changed differently on both branches (Git *can* auto-merge changes to different files or different lines of the same file just fine).

```
<<<<<<< HEAD (your current branch)
const greeting = "Hello, World!";
=======
const greeting = "Hi there, World!";
>>>>>>> feature-branch (branch being merged in)
```
Git inserts these markers directly into the file; a human must edit the file to the correct final content, remove the markers, then `git add` the resolved file and complete the commit/merge.

## 2.7 Remote Repositories & the Push/Pull/Fetch Model 🟢 L2

A **remote** is simply a Git repository hosted elsewhere (GitHub, GitLab, a colleague's machine) that your local repo knows how to talk to, referenced by a short name (conventionally `origin`).

| Command | What it does |
|---|---|
| `git fetch` | Downloads new commits/branches from the remote **without** merging them into your working branches — safe, "look but don't touch" |
| `git pull` | `git fetch` + `git merge` (or `--rebase`) in one step — actually integrates remote changes into your current branch |
| `git push` | Uploads your local commits to the remote, updating the remote branch pointer |

**Interview-critical fact:** `git pull` is really just a **shortcut** for `fetch` + `merge`. Many teams prefer `git pull --rebase` to avoid unnecessary merge commits from routine "sync with remote" pulls.

## 2.8 Forking vs. Cloning (GitHub-Specific) 🟢 L2

| | Clone | Fork |
|---|---|---|
| What it is | Local copy of a repo on your machine | A **full server-side copy** of someone else's repo, under your own GitHub account |
| Purpose | Get the code onto your machine to work on it | Contribute to a project you don't have write access to (typical open-source workflow) |
| Relationship to original | Linked via `origin` remote | Independent repo, but retains a link for Pull Requests back to the original ("upstream") |

**Typical open-source contribution flow:** Fork on GitHub → clone your fork locally → create a branch → commit changes → push to your fork → open a Pull Request from your fork's branch to the original repo's `main`.

## 2.9 Pull Requests (PRs) — GitHub's Core Collaboration Unit 🟡 L3

A **Pull Request** is a GitHub feature (not a native Git concept) that says: *"Here are the changes on my branch — please review them, and if approved, merge them into your branch."* It provides:
- A diff view of every changed file.
- A place for line-by-line comments and discussion (code review).
- Status checks (CI results — did the tests pass?).
- Approval requirements before merge is even allowed (branch protection rules).
- Merge options: **Merge commit**, **Squash and merge** (all commits become one), **Rebase and merge** (linear history, no merge commit).

## 2.10 .gitignore, Git Config, and Hooks 🟡 L3

- **`.gitignore`** — a file listing patterns Git should never track (e.g., `node_modules/`, `.env`, build output) — prevents committing secrets, dependencies, or generated files.
- **Git config** — three levels of settings: `--system` (whole machine), `--global` (your user, `~/.gitconfig`), `--local` (this repo only, `.git/config`) — local overrides global overrides system.
- **Git hooks** — scripts in `.git/hooks/` that run automatically at specific points (`pre-commit`, `pre-push`, `commit-msg`) — commonly used to run linters/tests before allowing a commit, often managed via tools like **Husky** in Node projects.

---

# Chapter 3 — Internal Working (Behind the Scenes)

## 3.1 What Happens Internally on `git commit` 🟠 L4

```
1. `git add file.js`
        │
        ▼
2. Git computes SHA-1 hash of file.js's content → creates a BLOB object
   Stores it compressed in .git/objects/xx/xxxxx... (first 2 chars = folder)
        │
        ▼
3. Staging area (index) is updated: records "file.js → this blob hash"
        │
        ▼
4. `git commit -m "message"`
        │
        ▼
5. Git builds TREE object(s) representing the current staged directory structure
   (reusing existing blob/tree objects for anything unchanged)
        │
        ▼
6. Git creates a COMMIT object:
   - points to the root tree
   - points to current HEAD commit as parent
   - includes author, committer, timestamp, message
        │
        ▼
7. Git computes the SHA-1 hash of this commit object → this IS the commit ID
        │
        ▼
8. The current branch pointer (e.g., refs/heads/main) is updated to this new SHA
        │
        ▼
9. HEAD (pointing at the branch) now resolves to the new commit automatically
```

## 3.2 The `.git` Folder — What's Actually Inside 🟠 L4

```
.git/
├── HEAD              # points to current branch, e.g. "ref: refs/heads/main"
├── config             # repo-local settings (remotes, user overrides)
├── objects/           # the actual database: blobs, trees, commits, tags (compressed)
│   ├── 4a/
│   │   └── b3c9...    # object named by SHA-1 (first 2 chars = folder, rest = filename)
│   └── pack/          # packed objects (compressed bundles, created by `git gc`)
├── refs/
│   ├── heads/          # local branches — each file contains a commit SHA
│   │   └── main
│   └── remotes/
│       └── origin/     # remote-tracking branches (your last-known state of origin's branches)
│           └── main
├── index              # the staging area (binary file)
└── logs/               # reflog — history of where HEAD/branches have pointed (local safety net)
```

## 3.3 How `git status` and `git diff` Work Internally 🟠 L4

`git status` compares **three snapshots**: the last commit (HEAD's tree), the staging area (index), and the working directory — and reports the differences between each pair (e.g., "modified, not staged" = working directory differs from index; "changes to be committed" = index differs from HEAD).

`git diff` (no args) shows working directory vs. staging area. `git diff --staged` (or `--cached`) shows staging area vs. last commit. This three-way comparison model is exactly why the staging area exists as a distinct, inspectable state.

## 3.4 How Merging Works Internally — The Three-Way Merge 🔴 L5

Git doesn't just compare the two branch tips — it finds the **common ancestor commit** (the "merge base") and performs a **three-way comparison**:

```
        A (common ancestor / merge base)
       / \
      B   C
      │   │
   main  feature

For each line/file:
  - Changed in B but not C → take B's version
  - Changed in C but not B → take C's version
  - Changed identically in both → take either (no conflict)
  - Changed DIFFERENTLY in both → CONFLICT, human must resolve
  - Unchanged in both → take A's original version
```
Git finds the merge base automatically via `git merge-base main feature`, using the commit graph structure (walking backward through parent pointers until a common commit is found).

## 3.5 How Rebase Works Internally 🔴 L5

```
1. Git identifies commits unique to your branch (not on the target branch)
   → C, D (in the earlier example)
        │
        ▼
2. Git temporarily "detaches" and checks out the target branch's tip (B)
        │
        ▼
3. For each of your unique commits, in order:
   - Apply that commit's DIFF as a patch on top of the current state
   - Create a brand-new commit object (new parent, so new SHA)
   - If the patch doesn't apply cleanly → CONFLICT, pause for resolution
        │
        ▼
4. Once all commits are replayed → move your branch pointer to the last new commit
```
This is exactly why rebased commits get new SHAs — they are, internally, entirely new commit objects, even though the resulting file content is (usually) equivalent to before.

## 3.6 Garbage Collection & Dangling Commits 🔴 L5

Git never immediately deletes objects when you "lose" a commit (e.g., via `reset --hard`, deleting a branch, or a rebase leaving old commits behind). These become **dangling/unreachable commits** — still physically present in `.git/objects` but not pointed to by any branch/tag. They're recoverable via `git reflog` (which logs every place HEAD has been, even for discarded commits) until Git's periodic **garbage collection** (`git gc`, run automatically sometimes, or manually) eventually prunes truly unreachable objects after a grace period (default 30/90 days depending on object type).

**This is why `git reflog` is often called "Git's undo history"** — it can rescue you from almost any local mistake, as long as garbage collection hasn't run yet.

---

# Chapter 4 — Code Examples (Simple → Intermediate → Production)

## 4.1 Simple Example — Basic Local Workflow 🟢 L1

```bash
# Initialize a new repo
git init

# Check what's changed
git status

# Stage a specific file
git add index.js

# Stage everything
git add .

# Commit staged changes
git commit -m "Add initial index.js"

# View history
git log --oneline
```
**Explanation:** `git init` creates the `.git` folder (empty repository object database + HEAD pointing to an unborn branch). `git status` is your constant "what state am I in" check — run it obsessively as a beginner. `git add` moves changes into the staging area; `git commit` snapshots the staging area permanently.

## 4.2 Intermediate Example — Feature Branch Workflow with a Team 🟡 L3

```bash
# Start a new feature from the latest main
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# Work, then stage and commit incrementally
git add src/controllers/auth.controller.js
git commit -m "feat: add login controller"

git add src/middleware/authenticate.js
git commit -m "feat: add authenticate middleware"

# Keep your branch up to date with main while you work (avoids a huge conflict later)
git fetch origin
git rebase origin/main
# (resolve any conflicts, then: git rebase --continue)

# Push your branch to GitHub
git push -u origin feature/user-authentication
# (-u sets the upstream so future `git push`/`git pull` need no arguments)

# Open a Pull Request on GitHub, get it reviewed, then merge (usually via GitHub UI)

# After merge, clean up locally
git checkout main
git pull origin main
git branch -d feature/user-authentication      # delete local branch
git push origin --delete feature/user-authentication  # delete remote branch
```
**Explanation:** This is the standard **feature-branch workflow** used at most companies. Rebasing your feature branch onto `origin/main` *before* opening/updating a PR (not after others have pulled your branch) keeps history clean without violating the "never rebase shared history" rule — since your feature branch isn't shared/depended-upon by others yet.

## 4.3 Production Example — Resolving a Real Merge Conflict, Interactive Rebase, and Cherry-Pick 🔴 L5

```bash
# --- Resolving a merge conflict ---
git checkout feature/payments
git merge main
# CONFLICT (content): Merge conflict in src/services/payment.service.js

# Open the file, see:
# <<<<<<< HEAD
# const TAX_RATE = 0.08;
# =======
# const TAX_RATE = 0.075;
# >>>>>>> main

# Manually edit to the correct final value, remove markers:
# const TAX_RATE = 0.075;

git add src/services/payment.service.js
git commit    # completes the merge (Git pre-fills a merge commit message)
```

```bash
# --- Interactive rebase: cleaning up messy commit history before opening a PR ---
git rebase -i HEAD~4
```
```
pick a1b2c3d feat: add payment form
squash e4f5g6h fix typo
squash i7j8k9l fix another typo
pick m1n2o3p feat: add payment validation
```
**Explanation:** `squash` folds a commit into the one above it, combining their changes and letting you write one clean combined message — used to turn "fix typo / fix typo again / oops" commits into a single polished commit before review, without altering the final code state.

```bash
# --- Cherry-pick: apply one specific commit from another branch ---
git checkout main
git cherry-pick a1b2c3d
# Applies ONLY that commit's changes onto main as a new commit — 
# useful for backporting a critical bugfix from a feature branch without merging the whole branch
```

```bash
# --- Recovering "lost" work with reflog (a real production lifesaver) ---
git reflog
# a1b2c3d HEAD@{0}: commit: feat: add refund logic
# e4f5g6h HEAD@{1}: reset: moving to HEAD~1     <- accidentally hard-reset, "lost" the commit above

git reset --hard a1b2c3d   # restores the "lost" commit — reflog remembered it even though no branch pointed to it
```

**Why this is "production-grade":** Real engineers rarely have clean, conflict-free histories — the actual skill being tested is composure and correct procedure under a conflict/mistake, not avoiding them entirely. `cherry-pick` and `reflog` in particular separate candidates who've only used Git via a GUI from those who understand it as a graph they can manipulate directly.

---

# Chapter 5 — Real World Usage in MERN Applications

| Company / Product | How they use Git/GitHub | Why |
|---|---|---|
| **Google** | Historically a single massive monorepo (Piper, not Git) for most code, but uses Git heavily for Android, Chromium, and countless public projects | Different scale problems; Git for anything not needing Google-scale monorepo tooling |
| **Microsoft** | Migrated the entire Windows codebase to Git (built **VFS for Git**, now Scalar, to handle a repo with millions of files) | Proved Git can scale to the largest codebases with the right tooling |
| **Meta** | Uses Mercurial internally for its monorepo but is a massive GitHub user for open-source (React, PyTorch, etc.) | Open-source projects benefit from GitHub's community/PR tooling |
| **Netflix** | Heavy GitHub Actions usage for CI/CD across hundreds of microservices | Independent deploy pipelines per service |
| **Typical MERN startup** | GitHub with a feature-branch + Pull Request workflow, branch protection on `main`, GitHub Actions running tests/lint on every PR, auto-deploy on merge | Fast to set up, tightly integrates code review with CI/CD, minimal ops overhead |

**Where it appears in a typical MERN project:**
```
project/
├── .git/                        # local Git repository (auto-managed)
├── .gitignore                   # node_modules/, .env, dist/, .DS_Store
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # runs lint + tests on every push/PR
│   │   └── deploy.yml           # deploys on merge to main
│   └── PULL_REQUEST_TEMPLATE.md # standardized PR description checklist
├── CONTRIBUTING.md              # branch naming, commit message conventions
└── README.md
```

---

# Chapter 6 — Best Practices 🔴 L5

### Branching Strategy
- **Trunk-based / feature-branch workflow** — short-lived feature branches off `main`, merged via PR — is the dominant modern approach (favored over the older, heavier "Git Flow" with `develop`/`release`/`hotfix` branches for most teams shipping continuously).
- Keep branches **short-lived** (days, not weeks) — the longer a branch lives, the more painful the eventual merge/rebase.
- Name branches consistently: `feature/short-description`, `fix/bug-description`, `chore/task-description`.

### Commit Messages
- Follow **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` prefixes — enables automated changelog generation and semantic versioning tooling.
- Write in **imperative mood**: "Add login validation" not "Added login validation" or "Adds login validation" (matches Git's own auto-generated messages, like merge commits).
- Keep the subject line under ~50 characters; use the body for the "why," not just the "what."

### Security
- **Never commit secrets** (`.env`, API keys, credentials) — always in `.gitignore` from day one of a repo.
- If a secret IS accidentally committed, **rotating the secret** is mandatory — removing it from history (`git filter-repo`/BFG) alone is not sufficient, since it may already be cached/scraped/cloned elsewhere.
- Enable **branch protection rules** on `main`: require PR review, require passing CI checks, disallow force-push.
- Use **signed commits** (GPG/SSH signing) for high-security projects to verify commit authorship cryptographically.

### Maintainability
- Squash noisy "WIP"/"fix typo" commits before merging (via interactive rebase or GitHub's "Squash and merge" button) to keep `main`'s history meaningful.
- Write descriptive PR descriptions: what changed, why, how to test — future-you and teammates will thank you.
- Use `.gitattributes` to normalize line endings across OSes (`* text=auto`) to avoid noisy whitespace-only diffs.

### Scalability (Large Teams/Repos)
- Use **CODEOWNERS** files to auto-request the right reviewers for specific paths.
- Consider **Git LFS** for large binary assets (images, videos) instead of committing them raw.
- For very large monorepos, consider **sparse-checkout** / **partial clone** so developers don't need the entire history/tree locally.

---

# Chapter 7 — Common Beginner Mistakes 🟡 L3

| Mistake | Why beginners make it | The fix |
|---|---|---|
| Committing directly to `main` | Doesn't know about branch workflows yet | Always branch off `main` for any change; enable branch protection to enforce this |
| Committing `node_modules/` | Forgot/didn't set up `.gitignore` before first commit | Add `.gitignore` **before** the first `git add .`; if already committed, `git rm -r --cached node_modules` |
| Vague commit messages ("fix", "update", "asdf") | Doesn't see the long-term value yet | Write messages for your future self / teammates six months from now |
| Using `git add .` blindly | Doesn't realize it stages EVERYTHING, including accidental files | Review with `git status` / `git diff --staged` before committing |
| Force-pushing to a shared branch (`git push -f`) | Doesn't understand history rewriting consequences | Never force-push to `main`/shared branches; use `--force-with-lease` if you must force-push your own branch |
| Confusing `git fetch` and `git pull` | Both "get stuff from remote" sounds the same | `fetch` = download only; `pull` = download + merge into current branch |
| Panicking and deleting the repo after a mistake | Doesn't know Git rarely truly deletes anything immediately | Learn `git reflog` — it's Git's safety net for almost every local mistake |
| Merging without pulling latest `main` first | Doesn't realize their branch is now stale | Regularly `git fetch`/`rebase origin/main` while working on long branches |
| Not understanding detached HEAD state | Checked out a commit SHA directly instead of a branch | Understand HEAD can point directly at a commit (detached) vs. at a branch; create a branch (`git checkout -b new-branch`) before committing if you want to keep the work |
| Resolving conflicts by blindly accepting "theirs" or "mine" everywhere | Wants the conflict to just go away | Actually read both versions and understand the intended final logic before resolving |

---

# Chapter 8 — Advanced Topics 🟠 L4 / 🔴 L5

## 8.1 Rebase vs. Merge — Team Policy Considerations
Some teams enforce "rebase and merge" or "squash and merge" only (no merge commits) to keep `main` perfectly linear, which simplifies `git bisect` and makes history easier to scan. Others prefer preserving true merge history for traceability. Neither is objectively "correct" — it's a team convention, but you should be able to argue both sides in an interview.

## 8.2 `git bisect` — Binary Search Through History 🟠 L4
When a bug was introduced somewhere in the last N commits but you don't know which one:
```bash
git bisect start
git bisect bad                 # current commit is broken
git bisect good v1.2.0         # this old tag/commit was known-good
# Git checks out the midpoint commit automatically
# You test it, then tell Git:
git bisect good   # or
git bisect bad
# Git repeats, binary-searching until it identifies the exact breaking commit
git bisect reset  # done, return to original HEAD
```
This turns an O(n) manual search into an O(log n) search — genuinely valuable at scale, and a strong signal of Git mastery when mentioned unprompted.

## 8.3 Submodules vs. Monorepos 🔴 L5
- **Submodules** — a Git repo embedded inside another Git repo at a specific pinned commit, useful for sharing a library across multiple independent projects while keeping its history separate. Notoriously fiddly (`git submodule update --init --recursive` is a rite of passage).
- **Monorepo** — all projects/packages live in one single repository. Simplifies cross-project refactors and dependency management (especially with tools like Nx, Turborepo, Lerna in the JS ecosystem) but requires more sophisticated tooling to keep CI fast at scale.

## 8.4 `git worktree` 🔴 L5
Lets you check out **multiple branches simultaneously into separate directories**, all backed by the same `.git` repository — useful for working on a hotfix without stashing/losing context on your current feature branch.
```bash
git worktree add ../hotfix-dir hotfix/critical-bug
```

## 8.5 Signed Commits & Supply Chain Security 🔴 L5
```bash
git config --global commit.gpgsign true
git commit -S -m "feat: add payment gateway integration"
```
Cryptographically proves a commit really came from the claimed author's key — increasingly required in security-sensitive open-source projects and enterprise environments to prevent commit spoofing/supply-chain attacks.

## 8.6 GitHub Actions — CI/CD Fundamentals 🔴 L5
```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run lint
```
Runs automatically on every PR targeting `main`; combined with a branch protection rule requiring this check to pass, it's structurally impossible to merge code that fails tests — a core piece of "shift-left" quality culture.


# Chapter 9 — Interview Questions (Deep, with Full Answers)

> Format for each: **Question → Ideal Answer → Why It's Correct → Common Wrong Answer → What the Interviewer Is Testing → Likely Follow-ups**

---

### 🟢 Beginner Q1: What is the difference between Git and GitHub?

**Ideal Answer:** Git is a distributed version control system — a command-line tool that tracks file changes locally and manages branching/merging/history. GitHub is a cloud platform that hosts Git repositories and adds collaboration features on top: pull requests, code review, issues, and CI/CD via GitHub Actions. You can use Git entirely without ever using GitHub.

**Why It's Correct:** Clearly separates the *tool* from the *hosted product built on top of it*.

**Common Wrong Answer:** "GitHub is where you store your Git code online." — Not wrong exactly, but incomplete; misses that GitHub is one of several competing hosts (GitLab, Bitbucket) and misses the collaboration-layer distinction.

**What's Being Tested:** Basic vocabulary precision — a very common warm-up question.

**Follow-ups:** *"Name an alternative to GitHub."* (GitLab, Bitbucket, self-hosted Gitea.)

---

### 🟢 Beginner Q2: What is the staging area and why does it exist?

**Ideal Answer:** The staging area (index) sits between the working directory and the repository. It lets you choose precisely what will go into the next commit — you can stage only some of your changed files, or even only some lines within a file — instead of being forced to commit every current change at once. This enables clean, logical, atomic commits.

**Why It's Correct:** Explains both the mechanism and the *purpose* (crafting intentional commits).

**Common Wrong Answer:** "It's just an extra step before committing." — True but shows no understanding of *why* it's valuable.

**What's Being Tested:** Whether the candidate understands Git's model, not just the commands.

**Follow-ups:** *"How would you stage only part of a file?"* (`git add -p` — interactive patch staging.)

---

### 🟢 Beginner Q3: What does `git clone` do internally?

**Ideal Answer:** Downloads the entire repository — every commit, branch, and tag in its full history — from the remote to your local machine, sets up a remote called `origin` pointing back to the source, and checks out the default branch into your working directory.

**Why It's Correct:** Correctly emphasizes "entire history," a key distinguishing feature vs. centralized VCS which often only fetch the latest snapshot.

**Common Wrong Answer:** "It downloads the current version of the code." — Misses that the *entire history* comes down too, which is central to Git being distributed.

**What's Being Tested:** Understanding of Git's distributed nature at a fundamental level.

**Follow-ups:** *"What if you only want the latest commit, not the full history?"* (`git clone --depth 1` — a shallow clone.)

---

### 🟢 Beginner Q4: What's the difference between `git fetch` and `git pull`?

**Ideal Answer:** `git fetch` downloads new commits/branches from the remote into your local remote-tracking branches (e.g., `origin/main`) without touching your current working branch. `git pull` does a `fetch` followed immediately by a `merge` (or `rebase`, if configured) into your current branch — it actually changes your working branch's content.

**Why It's Correct:** Correctly frames `pull` as `fetch` + an integration step, the standard framing interviewers expect.

**Common Wrong Answer:** "They both update your code from GitHub." — Technically not wrong but dangerously imprecise; fails to distinguish the safety difference (fetch never changes your working files, pull does).

**What's Being Tested:** Precision about remote operations — a real source of production incidents when misunderstood.

**Follow-ups:** *"When would you prefer fetch over pull?"* (When you want to inspect incoming changes with `git log origin/main` or `git diff main origin/main` before deciding how to integrate them.)

---

### 🟢 Beginner Q5: What is a merge conflict and when does it happen?

**Ideal Answer:** A merge conflict happens when Git can't automatically reconcile changes between two branches — typically when the same lines of the same file were modified differently on each branch. Git pauses the merge, inserts conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) into the affected file(s), and requires a human to manually resolve them before the merge can complete.

**Why It's Correct:** Correctly identifies the *same-lines-changed-differently* trigger, not just "when two people change the same file."

**Common Wrong Answer:** "It happens whenever two people edit the same file." — Overly broad; Git auto-merges non-overlapping changes to the same file constantly without conflict.

**What's Being Tested:** Whether the candidate has actually resolved conflicts, not just heard the term.

**Follow-ups:** *"How do you know a merge conflict has occurred?"* (`git status` shows "Unmerged paths"; conflict markers appear directly in the file.)

---

### 🟡 Intermediate Q6: Explain the difference between merge and rebase, and when you'd use each.

**Ideal Answer:** Merge creates a new commit with two parents, preserving the exact history of both branches, including *when* divergence and reunification happened. Rebase replays your branch's commits on top of the target branch, producing new commits with new SHAs and a linear history, but discarding the record of when the branches actually diverged. Use merge for integrating into shared/protected branches (like merging a feature branch into `main` via PR) since it's always safe and preserves true history. Use rebase to keep your own, not-yet-shared feature branch up to date with `main` as you work, producing a cleaner history before you open/finalize a PR — but never rebase a branch others have already pulled.

**Why It's Correct:** Covers the mechanical difference AND the safety rule AND the appropriate use case for each — the complete picture.

**Common Wrong Answer:** "Rebase is just a cleaner version of merge." — Misses the fundamental danger (rewriting shared history) and the fact they solve genuinely different problems.

**What's Being Tested:** Whether the candidate understands not just the commands but the collaboration implications — a classic mid-level filter question.

**Follow-ups:** *"What's `--force-with-lease` and why is it safer than `--force`?"* (`--force-with-lease` refuses to overwrite the remote branch if it has commits you haven't seen — protects against accidentally clobbering a teammate's just-pushed work; plain `--force` has no such check.)

---

### 🟡 Intermediate Q7: What is `git reflog` and how does it differ from `git log`?

**Ideal Answer:** `git log` shows the commit history reachable from the current branch/HEAD — it's about the *project's* history. `git reflog` shows the history of everywhere **HEAD itself has pointed** locally — including commits you've since reset away from, rebased over, or otherwise "lost" — making it Git's local safety net for recovering from mistakes, since Git doesn't immediately delete unreachable commits.

**Why It's Correct:** Correctly frames reflog as tracking HEAD's *movement* (a local, machine-specific log), not the project's canonical history.

**Common Wrong Answer:** "It's the same as `git log` but shorter." — Misses the entire point: reflog can show commits `git log` can no longer find at all.

**What's Being Tested:** Whether the candidate knows Git's recovery mechanisms — highly practical, frequently asked because it correlates with real production incident-handling ability.

**Follow-ups:** *"Is reflog shared when you push to GitHub?"* (No — reflog is entirely local, machine-specific, never pushed/pulled.)

---

### 🟡 Intermediate Q8: How would you undo a commit that's already been pushed to a shared branch?

**Ideal Answer:** Use `git revert <commit-sha>`, which creates a **new commit** that applies the inverse of the target commit's changes, leaving history intact and safe for everyone who's already pulled. Avoid `git reset --hard` + force-push on a shared branch — that rewrites history and breaks everyone else's clone.

**Why It's Correct:** Correctly distinguishes the safe, additive undo (`revert`) from the destructive, history-rewriting undo (`reset`), and explicitly why the latter is dangerous on shared branches.

**Common Wrong Answer:** "`git reset --hard HEAD~1` then force-push." — Works locally but is a serious anti-pattern on any branch others depend on.

**What's Being Tested:** Judgment about safe vs. unsafe operations in a team context — this is a very common "gotcha" question.

**Follow-ups:** *"When IS `git reset --hard` + force-push acceptable?"* (Only on your own, not-yet-shared branch, or by explicit team agreement with everyone re-cloning/rebasing.)

---

### 🟡 Intermediate Q9: What's the difference between `git reset --soft`, `--mixed`, and `--hard`?

**Ideal Answer:** All three move the current branch pointer to a different commit; they differ in what happens to the staging area and working directory. `--soft` moves only the branch pointer — staging area and working directory are untouched (your changes are still staged, ready to re-commit differently). `--mixed` (the default) also resets the staging area to match the target commit, but leaves working directory files unchanged (changes become unstaged). `--hard` resets both the staging area AND the working directory to match the target commit — **any uncommitted changes are permanently discarded**.

**Why It's Correct:** Correctly maps each flag to its effect on all three areas (branch pointer, staging, working directory) — this is exactly the kind of precise, layered understanding that distinguishes real expertise.

**Common Wrong Answer:** "`--hard` just resets harder." — Vague and doesn't demonstrate actual understanding of the three Git areas.

**What's Being Tested:** Deep, structural understanding of Git's three-tree model applied to a real command.

**Follow-ups:** *"Which one would you use to 'undo' a commit but keep the changes to re-commit differently?"* (`git reset --soft HEAD~1`.)

---

### 🟠 Advanced Q10: Design a Git branching strategy and PR workflow for a team of 40 engineers shipping continuously to production multiple times a day.

**Ideal Answer:** Use a **trunk-based development** model: short-lived feature branches (ideally living less than a day or two) branched directly off `main`, merged via Pull Request after passing CI (automated tests, lint, type-checks) and at least one code review approval, enforced via branch protection rules. Prefer "squash and merge" to keep `main`'s history clean and linear (simplifies `git bisect` and rollback). Use feature flags for anything not ready to be fully live yet, rather than long-lived feature branches, so `main` is *always* deployable. Pair this with GitHub Actions (or similar) auto-deploying `main` on every merge (continuous deployment) — the entire workflow exists to keep the feedback loop between "commit" and "production" as short and safe as possible.

**Why It's Correct:** Directly connects the branching strategy to the *business constraint* (multiple daily deploys) rather than reciting a generic Git Flow diagram that's actually a poor fit for this scenario.

**Common Wrong Answer:** Describing full Git Flow (`develop`, `release/*`, `hotfix/*` branches) — this heavier model is generally a poor fit for continuous deployment; a candidate reciting it without questioning fit signals memorized knowledge over judgment.

**What's Being Tested:** System/process design judgment — can the candidate connect Git mechanics to real engineering-org constraints, a senior/staff-level differentiator.

**Follow-ups:** *"How do you handle a broken `main` after a bad merge, given continuous deployment?"* (Revert immediately via a new commit — never force-push/rewrite — and re-deploy; investigate root cause after service is restored, not before.)

---

### 🟠 Advanced Q11: A teammate accidentally committed a `.env` file with production API keys and pushed it to GitHub. Walk me through your full response.

**Ideal Answer:** First and most urgently: **rotate/revoke every exposed credential immediately** — removing the file from Git history doesn't undo the fact it may already be cloned, cached by GitHub, scraped by bots, or indexed. Only after rotation is handled, clean the Git history using `git filter-repo` (modern recommended tool) or the BFG Repo-Cleaner to strip the file from every commit, force-push the cleaned history to the remote, and have every collaborator re-clone (not just pull/rebase, since history SHAs have all changed). Add `.env` to `.gitignore` going forward and consider a pre-commit hook (e.g., `git-secrets`, `gitleaks`) to prevent recurrence.

**Why It's Correct:** Correctly orders the priority — credential rotation is time-critical and independent of the Git cleanup, which is a common thing candidates get backward (trying to "fix Git" before securing the actual leaked secret).

**Common Wrong Answer:** "Just remove the file and commit again." — This leaves the secret fully exposed in history (and in anyone else's existing clone) — a serious security miss if this were a real incident.

**What's Being Tested:** Security-first incident-response thinking under a realistic, high-stakes scenario — a strong senior-level filter question.

**Follow-ups:** *"Why isn't rewriting history alone sufficient?"* (Anyone who already cloned/fetched has the secret in their local reflog/objects regardless of what happens to the remote; GitHub may also have cached it briefly.)

---

### 🟠 Advanced Q12: How would you set up Git for a monorepo containing 5 independently deployable Node.js microservices, ensuring CI only runs tests for the services that actually changed?

**Ideal Answer:** Structure the monorepo with clear top-level service directories (`services/auth`, `services/payments`, etc.), then configure the CI pipeline (GitHub Actions) to use `paths:` filters or a change-detection action (e.g., `dorny/paths-filter`) that inspects the diff of the PR/push and conditionally triggers only the jobs for services whose files changed — avoiding wasting CI minutes and time running every service's full test suite on every single commit. For build/dependency management across services, a tool like Turborepo or Nx adds caching and dependency-graph-aware task running on top of this.

**Why It's Correct:** Shows awareness of a real, common monorepo scaling pain point and a concrete, implementable solution, not just "use a monorepo."

**Common Wrong Answer:** "Just run all tests on every push." — Technically works but doesn't scale; interviewers specifically probe for awareness of this cost.

**What's Being Tested:** Practical CI/CD + monorepo architecture experience at production scale.

**Follow-ups:** *"What's the trade-off of a monorepo vs. multiple separate repos here?"* (Monorepo simplifies cross-service refactors and shared tooling/versioning, but requires more sophisticated CI tooling to avoid wasted builds; multi-repo isolates blast radius and CI cost per-service but complicates cross-service atomic changes.)

---

## Scenario-Based Questions

### Scenario Q13: "You rebased your feature branch locally, then realized a teammate had already pulled your branch before you rebased. What now?"

**Ideal Answer:** Communicate immediately — don't force-push silently. Either (a) abandon the rebase and go back to the pre-rebase state (`git reflog` to find the old tip, reset back to it) if the teammate's work depends on the original commits, or (b) if force-pushing the rebased version is truly necessary, coordinate so the teammate resets their local branch to match (`git fetch && git reset --hard origin/feature-branch`) rather than trying to merge the two diverged histories, which creates a confusing duplicate-commit mess.

**What's Being Tested:** Real collaborative Git hygiene — recognizing that Git mistakes involving other people require communication, not just command fixes.

### Scenario Q14: "CI is green, code review is approved, but merging the PR into `main` shows a conflict. Why might this happen, and what do you do?"

**Ideal Answer:** `main` has moved forward with new commits since the PR branch was created/last updated — someone else merged something touching the same lines. Update the PR branch (`git fetch origin && git rebase origin/main`, or merge `main` into the feature branch), resolve any conflicts locally, push the update, and let CI re-run on the updated branch before merging — never resolve conflicts directly in GitHub's web UI for anything non-trivial, since it's harder to test locally first.

**What's Being Tested:** Understanding that "PR approved" and "mergeable" are independent states, and correct procedure to reconcile.

---

## Practical / Debugging / Coding Questions

### Debugging Q15: `git push` is rejected with "Updates were rejected because the remote contains work that you do not have locally." What's happening and what do you do?

**Ideal Answer:** The remote branch has commits your local branch doesn't have (someone else pushed first). Run `git pull` (or `git fetch` + `git merge`/`rebase`) to integrate those remote commits into your local branch first, resolve any conflicts, then push again. Never blindly force-push to make the rejection go away — that would overwrite the teammate's already-pushed work.

**What's Being Tested:** Correct diagnostic instinct for one of the single most common real Git errors.

### Coding Q16: Write the Git commands to squash the last 3 commits on your current branch into one, before opening a PR.
```bash
git rebase -i HEAD~3
```
```
pick a1b2c3d feat: add form
squash e4f5g6h fix validation bug
squash i7j8k9l fix typo in label
```
Save and close the editor, then Git opens a second editor to write the combined commit message. **Explanation:** `squash` (or `s`) merges each marked commit's changes into the one directly above it in the list; the topmost commit in the block (marked `pick`) is what the squashed commits fold into.


# Chapter 10 — Coding Exercises

### 🟢 Easy: Initialize a repo, make 3 commits, view history
**Task:** Create a repo, commit three small changes, and print a one-line-per-commit history.
```bash
git init my-project && cd my-project
echo "# My Project" > README.md
git add README.md && git commit -m "docs: add README"

echo "console.log('hello');" > index.js
git add index.js && git commit -m "feat: add entry file"

echo "node_modules/" > .gitignore
git add .gitignore && git commit -m "chore: add gitignore"

git log --oneline
# c3d4e5f chore: add gitignore
# b2c3d4e feat: add entry file
# a1b2c3d docs: add README
```
**Explanation:** `git log --oneline` condenses each commit to its short SHA + subject line — the go-to command for a quick history overview.

---

### 🟡 Medium: Resolve a merge conflict programmatically-aware walkthrough
**Task:** Two branches both edit `config.js`'s `PORT` value differently. Merge them and resolve correctly.
```bash
git checkout main
git checkout -b feature/port-config
echo "module.exports = { PORT: 4000 };" > config.js
git add config.js && git commit -m "feat: set port to 4000"

git checkout main
echo "module.exports = { PORT: 5000 };" > config.js
git add config.js && git commit -m "feat: set port to 5000"

git merge feature/port-config
# CONFLICT (content): Merge conflict in config.js
```
```javascript
// config.js after conflict
<<<<<<< HEAD
module.exports = { PORT: 5000 };
=======
module.exports = { PORT: 4000 };
>>>>>>> feature/port-config
```
```bash
# Decide the correct final value (say, use an env var instead of hardcoding either):
cat > config.js << 'EOF'
module.exports = { PORT: process.env.PORT || 5000 };
EOF
git add config.js
git commit -m "merge: resolve port conflict using env variable"
```
**Explanation:** The best resolution here isn't "pick one side" — it's recognizing the *underlying* problem (two hardcoded values) and fixing it properly, which is exactly the kind of judgment interviewers want to see beyond mechanical conflict-marker removal.

---

### 🟠 Hard: Recover a commit that was lost via `reset --hard`
**Task:** Simulate accidentally discarding a commit, then recover it using reflog.
```bash
echo "important work" > feature.js
git add feature.js && git commit -m "feat: critical feature"
# SHA: a1b2c3d

git reset --hard HEAD~1   # oops — "lost" the commit
git log --oneline          # a1b2c3d is gone from here

git reflog
# e4f5g6h HEAD@{0}: reset: moving to HEAD~1
# a1b2c3d HEAD@{1}: commit: feat: critical feature

git reset --hard a1b2c3d   # branch pointer restored to the "lost" commit
git log --oneline           # a1b2c3d is back
```
**Explanation:** `git reset --hard` never actually deletes the commit object from `.git/objects` — it only moves the branch pointer. The commit becomes "dangling" (unreachable via normal `log`) but stays recoverable via `reflog` until garbage collection eventually cleans it up.

---

### 🟣 Interview-Level: Set up a `pre-commit` hook that blocks commits containing `console.log`
**Task:** Prevent accidentally committing debug `console.log` statements.
```bash
#!/bin/sh
# .git/hooks/pre-commit  (must be executable: chmod +x .git/hooks/pre-commit)

if git diff --cached --diff-filter=ACM | grep -n "console\.log"; then
  echo "❌ Commit blocked: remove console.log statements before committing."
  exit 1
fi
exit 0
```
**Explanation:** `git diff --cached` inspects the staged changes (exactly what's about to be committed); `--diff-filter=ACM` limits it to Added/Copied/Modified files (ignoring deletions). Exiting with a non-zero code aborts the commit entirely. In real production projects this exact pattern is usually implemented via **Husky** + **lint-staged** (Node ecosystem) rather than raw shell scripts, since Husky hooks are version-controlled and shared across the team automatically — raw `.git/hooks/` files are **not** committed/shared by Git itself.

---

# Chapter 11 — Multiple Choice Questions (MCQs)

**Q1.** What does `git branch` create?
- A) A full copy of the entire project directory ❌ *(That's the old SVN model, not Git's)*
- B) A new, movable pointer to the current commit ✅ *(Correct — instant, O(1) operation)*
- C) A new remote repository ❌ *(Branches are local until pushed)*
- D) A snapshot of the staging area ❌ *(That's what a commit does)*

**Q2.** Which command shows changes between your working directory and the staging area?
- A) `git diff` ✅ *(Correct — default `git diff` compares working directory to staging area)*
- B) `git diff --staged` ❌ *(This compares staging area to the last commit, not working directory)*
- C) `git status` ❌ *(Summarizes state, doesn't show line-level diffs)*
- D) `git log -p` ❌ *(Shows diffs of past commits, not current uncommitted changes)*

**Q3.** What's the key danger of `git push --force`?
- A) It's slower than a normal push ❌ *(Not a performance concern)*
- B) It can overwrite remote commits that others have already pushed, permanently losing their work from that branch ✅
- C) It only works on `main` ❌ *(Works on any branch)*
- D) It requires admin access ❌ *(Any push access is sufficient unless branch protection blocks it)*

**Q4.** What does `git rebase` do to commit SHAs?
- A) Keeps them exactly the same ❌ *(This is true of merge, not rebase)*
- B) Creates brand new commits with new SHAs, even if the code changes are identical ✅
- C) Deletes the original commits permanently and immediately ❌ *(Originals become dangling but recoverable via reflog until GC)*
- D) Only changes the SHA of the very first commit ❌ *(Every replayed commit gets a new SHA)*

**Q5.** What is the primary purpose of a Pull Request on GitHub?
- A) To merge code automatically with no review ❌ *(Opposite of the intended purpose)*
- B) To propose changes for review/discussion before merging into another branch ✅
- C) To create a new Git repository ❌ *(Unrelated function)*
- D) To delete a branch ❌ *(Unrelated function)*

**Q6.** What does `git reflog` track?
- A) The canonical project history shared with everyone ❌ *(That's `git log`)*
- B) Every place your local HEAD has pointed, including "lost" commits ✅
- C) Only merge commits ❌ *(Tracks all HEAD movements, not just merges)*
- D) Remote branch history on GitHub ❌ *(Reflog is purely local)*

**Q7.** In a three-way merge, what is the "merge base"?
- A) The most recent commit on the target branch ❌ *(That's one of the two tips being compared, not the base)*
- B) The common ancestor commit of both branches being merged ✅
- C) The very first commit in the repository ❌ *(Only true if the branches diverged at the repo's root, which is rare)*
- D) A commit created automatically after merging ❌ *(That's the merge commit, a different concept)*

**Q8.** Which file prevents specific files/folders from ever being tracked by Git?
- A) `.gitconfig` ❌ *(Stores settings, not ignore rules)*
- B) `.gitattributes` ❌ *(Controls things like line-ending normalization, not ignoring)*
- C) `.gitignore` ✅ *(Correct — lists patterns Git should never track)*
- D) `.gitmodules` ❌ *(Configures submodules, unrelated)*

---

# Chapter 12 — Flashcards (Revision)

| # | Front (Question) | Back (Answer) |
|---|---|---|
| 1 | Git vs GitHub? | Git = the version control tool; GitHub = a cloud platform hosting Git repos + collaboration features |
| 2 | Three areas in Git? | Working Directory → Staging Area (Index) → Repository |
| 3 | What is a commit, structurally? | A full project snapshot + pointer to parent commit(s) + metadata, identified by a SHA hash |
| 4 | What is a branch, internally? | A small movable pointer (file) referencing a specific commit SHA |
| 5 | What does HEAD point to? | The currently checked-out branch (or commit, if detached) |
| 6 | Merge vs rebase, one line? | Merge preserves history with a new merge commit; rebase rewrites history into a new linear sequence |
| 7 | Golden rule of rebasing? | Never rebase commits that others have already pulled/based work on |
| 8 | fetch vs pull? | fetch = download only; pull = fetch + merge/rebase into current branch |
| 9 | What triggers a merge conflict? | Same lines of the same file changed differently on both branches |
| 10 | Clone vs fork? | Clone = local copy of a repo; Fork = a full independent server-side copy under your own account |
| 11 | What does `git reflog` recover? | "Lost" commits still physically present but unreachable from any branch — until GC runs |
| 12 | `reset --soft` vs `--mixed` vs `--hard`? | soft = moves branch pointer only; mixed = also unstages; hard = also discards working directory changes |
| 13 | What does `git bisect` do? | Binary-searches commit history to find the exact commit that introduced a bug |
| 14 | Safer alternative to `git push --force`? | `git push --force-with-lease` — refuses to overwrite if remote has commits you haven't seen |
| 15 | What undoes a pushed commit safely on a shared branch? | `git revert` — creates a new commit reversing the change, doesn't rewrite history |
| 16 | What is a blob? | A Git object storing raw file content only, no filename |
| 17 | What is `git cherry-pick` for? | Applying one specific commit's changes onto a different branch |
| 18 | Where do secrets belong relative to Git? | Never in the repo — use `.gitignore` + environment variables/secret managers |
| 19 | What creates the linear "no merge commit" history on GitHub PR merges? | "Squash and merge" or "Rebase and merge" merge options |
| 20 | What is `.gitignore` for? | Listing file/folder patterns Git should never track |

---

# Chapter 13 — One-Page Cheat Sheet 📋

```
THE THREE AREAS
────────────────
Working Directory ──git add──▶ Staging Area ──git commit──▶ Repository (.git)
                  ◀─git checkout─          ◀─git reset──

DAILY WORKFLOW
────────────────
git status              # what's changed?
git add <file>           # stage it
git commit -m "msg"      # snapshot it
git push origin <branch> # upload it

BRANCHING
──────────
git branch <name>          # create branch
git checkout <name>        # switch to it
git checkout -b <name>     # create + switch in one step
git branch -d <name>       # delete (safe, only if merged)
git branch -D <name>       # delete (force)

MERGE vs REBASE
─────────────────
merge:   preserves history, new merge commit, SAFE on shared branches
rebase:  linear history, new SHAs, UNSAFE on shared branches

REMOTE OPS
───────────
git fetch    # download only, doesn't touch your branch
git pull     # fetch + merge/rebase into current branch
git push     # upload your commits

UNDO OPERATIONS (least → most destructive)
─────────────────────────────────────────────
git checkout -- <file>       # discard unstaged changes to a file
git reset --soft HEAD~1      # undo last commit, keep changes staged
git reset --mixed HEAD~1     # undo last commit, keep changes unstaged
git reset --hard HEAD~1      # undo last commit, DISCARD changes entirely
git revert <sha>              # safe undo via a NEW commit (shared-branch safe)

RECOVERY
─────────
git reflog                    # find "lost" commits
git reset --hard <found-sha>  # restore to a lost commit

CONFLICT MARKERS
──────────────────
<<<<<<< HEAD        (your current branch's version)
...your version...
=======
...their version...
>>>>>>> branch-name  (incoming branch's version)

GITHUB PR MERGE OPTIONS
──────────────────────────
Merge commit       → preserves full branch history, adds merge commit
Squash and merge   → all commits become ONE clean commit on main
Rebase and merge   → linear history, no merge commit, original commits replayed
```

# Chapter 14 — Timed Revision Notes ⏱️

### 5-Minute Revision
- Git = tool, GitHub = hosted platform + collaboration.
- Three areas: Working Directory → Staging → Repository.
- A commit is a full snapshot + parent pointer + metadata (SHA-identified).
- A branch is just a movable pointer to a commit.
- Merge = preserves history (new merge commit). Rebase = rewrites history (new SHAs, linear).

### 15-Minute Revision
Add to the above:
- fetch = download only; pull = fetch + merge/rebase.
- Merge conflicts occur when the same lines are changed differently on both branches.
- Golden rule: never rebase shared/already-pulled history.
- `reset --soft/--mixed/--hard` differ in what they touch (pointer only / +staging / +working directory).
- `git revert` is the shared-branch-safe undo (new commit); `reset --hard` + force-push is not.

### 30-Minute Revision
Add to the above:
- Git's object model: blob (content), tree (directory listing), commit (snapshot+metadata), tag.
- Three-way merge uses the common ancestor ("merge base") to decide how to combine changes automatically.
- `git reflog` tracks every place HEAD has pointed locally — recovers "lost" commits until garbage collection.
- `git bisect` binary-searches history to find a bug-introducing commit.
- Clone (local copy) vs. Fork (independent server-side copy, used for external contribution).
- Secrets leaked into Git history: rotate the credential FIRST, then clean history (`git filter-repo`/BFG), then force-push + everyone re-clones.

### 1-Hour Revision (Full Pass)
Read Chapters 1–9 in full, focusing especially on:
- Chapter 2.3–2.5 (object model, branches-as-pointers, merge vs rebase) — the conceptual core almost every question builds on.
- Chapter 3.4–3.5 (three-way merge and rebase internals) — frequently asked at mid/senior level.
- Chapter 9 Advanced Q10–Q12 — process/system-design style questions common at senior level.
- Chapter 7 (common mistakes) — maps directly to practical "gotcha" interview questions.

---

# Chapter 15 — Common Bugs & How to Debug Them 🐛

| Bug | Why It Happens | How to Debug | Fix |
|---|---|---|---|
| "fatal: refusing to merge unrelated histories" | Merging two repos/branches that don't share a common commit ancestor (e.g., re-initialized repo) | `git log --oneline --graph --all` to inspect both histories | `git merge <branch> --allow-unrelated-histories` (use carefully, understand why they diverged first) |
| Accidentally committed `node_modules/` | No `.gitignore` set up before first commit | `git log --stat` shows huge unexpected file counts | `git rm -r --cached node_modules && echo "node_modules/" >> .gitignore && git commit` |
| Detached HEAD confusion ("you are in detached HEAD state") | Checked out a specific commit SHA/tag instead of a branch | `git status` explicitly warns about this state | Create a branch immediately if you want to keep any new commits: `git checkout -b new-branch-name` |
| Merge conflict markers accidentally committed into the file | Forgot to remove `<<<<<<<`/`=======`/`>>>>>>>` after resolving | Search codebase: `git grep "<<<<<<<"` | Remove markers, re-test, amend the commit: `git commit --amend` |
| "Your branch is ahead of origin by N commits" surprises you | Local commits were made but never pushed (e.g., forgot, or push failed silently) | `git log origin/main..HEAD` to see the exact unpushed commits | `git push origin <branch>` |
| Line-ending diffs showing entire files as "changed" (Windows/Mac/Linux team) | No `.gitattributes` normalizing line endings (CRLF vs LF) across OSes | `git diff` shows every line as removed+added despite no real content change | Add `.gitattributes` with `* text=auto`, then re-normalize: `git add --renormalize .` |
| Force-push accidentally deleted a teammate's commits | Used `git push --force` without checking what was on the remote first | `git reflog` on the teammate's machine (if they haven't re-cloned) can often recover it locally | Prevention: always use `--force-with-lease`; recovery: check reflogs on any machine that had the commits before the force-push |

---

# Chapter 16 — Production Interview Stories 🎬

**Story 1 — "The 400MB Repo"**
*Scenario:* "Our repo's clone time went from 10 seconds to 4 minutes over two years, and nobody knows why. How do you investigate and fix it?"

**What a senior engineer expects:** Use `git count-objects -vH` and tools like `git-sizer` to identify what's bloating the repo — almost always large binary files (images, videos, build artifacts, or even accidentally committed `node_modules`/`dist` folders) committed directly instead of via Git LFS or excluded via `.gitignore`. The fix involves identifying the largest blobs in history (`git rev-list --objects --all | git cat-file --batch-check` piped and sorted by size), migrating large-but-needed assets to Git LFS, and using `git filter-repo` to purge truly unnecessary large blobs from history — with the understanding that this rewrites history and requires full team re-clone coordination.

**Story 2 — "The Broken Production Deploy"**
*Scenario:* "A merge to `main` just broke production. Continuous deployment already shipped it. Walk me through the next 10 minutes."

**What a senior engineer expects:** Immediate priority is restoring service, not investigating root cause first. `git revert <bad-merge-sha>` (or the specific bad commit) pushed immediately to trigger a new, safe deploy — never `reset --hard` + force-push on `main` under time pressure, since that's both slower to reason about correctly under stress and disruptive to anyone else's in-flight work. Root-cause investigation and a proper fix happen *after* service is restored, using the reverted branch/commit as reference.

**Story 3 — "The Onboarding Nightmare"**
*Scenario:* "New engineers keep breaking `main` in their first week because they don't understand the branching workflow. How do you fix this structurally, not just by telling people to be careful?"

**What a senior engineer expects:** This tests process/tooling maturity over individual blame. Solutions: enable **branch protection rules** on `main` (require PR + passing CI + at least one approval, disallow direct pushes) so it becomes *structurally impossible* to break `main` directly regardless of individual mistakes; add a clear `CONTRIBUTING.md` documenting the exact branch/PR workflow; consider a repo template or onboarding checklist. The signal interviewers want: good engineers build systems that make mistakes hard, not systems that rely on everyone remembering the rules.

---

# Chapter 17 — Frequently Asked Interview Questions (Rapid-Fire Bank)

> A calibrated, high-signal set covering the range interviewers actually draw from — organized by level, each with a concise but complete answer. (Full deep-dive treatment of the highest-value subset is in Chapter 9 above.)

### Beginner Rapid-Fire (30)
1. **What is version control?** A system that tracks changes to files over time, allowing you to recall specific versions and collaborate safely.
2. **What is a repository?** A project's full set of files plus its entire tracked history.
3. **What's the difference between local and remote repositories?** Local lives on your machine; remote is hosted elsewhere (e.g., GitHub) for sharing/collaboration.
4. **What does `git init` do?** Creates a new, empty Git repository (a `.git` folder) in the current directory.
5. **What does `git status` show?** The current state of the working directory and staging area relative to the last commit.
6. **What's the difference between `git add .` and `git add -A`?** `git add .` stages changes in the current directory and below; `git add -A` stages all changes in the entire repo, including outside the current directory.
7. **What does `-m` do in `git commit -m "message"`?** Lets you supply the commit message inline instead of opening a text editor.
8. **What's `git log` used for?** Viewing commit history — author, date, message, SHA.
9. **What does `git log --oneline` do?** Shows a condensed, one-line-per-commit history.
10. **What is `origin`?** The conventional default name for a repo's primary remote.
11. **What does `git remote -v` show?** The URLs of all configured remotes (fetch and push).
12. **What is a `.gitignore` file for?** Listing files/patterns Git should never track (e.g., `node_modules/`, `.env`).
13. **What's the difference between `git checkout` and `git switch`?** `switch` (newer, Git 2.23+) is a clearer, safer command specifically for changing branches; `checkout` is the older, more overloaded command that also handles file restoration and detached HEAD.
14. **What does `git diff` show by default?** Differences between the working directory and the staging area.
15. **What is a SHA in Git?** A 40-character (SHA-1) hash uniquely identifying an object (commit, blob, tree, tag) based on its content.
16. **What is `HEAD`?** A pointer to the currently checked-out branch (or commit, if detached).
17. **What does `git clone <url>` do?** Downloads a full copy of a remote repository, including its entire history.
18. **What's a "detached HEAD" state?** When HEAD points directly at a commit instead of a branch — new commits made here aren't attached to any branch and can be lost without creating one.
19. **What does `git rm` do differently from just deleting a file in the OS?** It deletes the file AND stages that deletion for the next commit in one step.
20. **What's `git mv` for?** Renaming/moving a tracked file, staging the rename in one step.
21. **What does `git tag` do?** Creates a named pointer to a specific commit, typically used to mark release versions (e.g., `v1.0.0`).
22. **What's the difference between a lightweight and annotated tag?** Lightweight is just a pointer; annotated stores extra metadata (tagger, date, message) as a full Git object.
23. **What does `git stash` do?** Temporarily shelves uncommitted changes so you can switch context (e.g., branches), without committing incomplete work.
24. **How do you restore stashed changes?** `git stash pop` (applies and removes from stash list) or `git stash apply` (applies but keeps it in the list).
25. **What's a "fast-forward" merge?** When the target branch has no new commits since the source branch diverged, so Git can simply move the pointer forward with no merge commit needed.
26. **What does `git blame <file>` show?** Which commit/author last modified each line of a file.
27. **What is a "fork" used for on GitHub?** Creating your own copy of someone else's repo to contribute changes back via a Pull Request without needing direct write access.
28. **What's an "upstream" repository?** The original repository a fork was created from.
29. **What does `git branch -a` show?** All branches, both local and remote-tracking.
30. **What is GitHub Issues used for?** Tracking bugs, feature requests, and tasks, often linked directly to commits/PRs that resolve them.

### Intermediate Rapid-Fire (25)
31. **What's the difference between `git merge --no-ff` and a regular merge?** `--no-ff` always creates a merge commit even if a fast-forward were possible, preserving a visible record that a feature branch existed.
32. **What does `git cherry-pick` do?** Applies the changes from one specific commit onto your current branch as a new commit.
33. **What's the risk of cherry-picking?** Can create duplicate-looking commits if that same commit is later merged normally too, sometimes complicating history/conflict resolution.
34. **What does `git commit --amend` do?** Modifies the most recent commit (message and/or staged changes) instead of creating a new one — rewrites that commit's SHA.
35. **Is it safe to amend a pushed commit?** Only if nobody else has pulled it yet — otherwise it's a history rewrite requiring force-push and coordination.
36. **What's `git rebase -i` used for?** Interactive rebase — reordering, squashing, editing, or dropping commits before finalizing history.
37. **What does "squash" do in interactive rebase?** Combines a commit into the one above it, merging their changes into a single commit.
38. **What's the difference between `git branch -d` and `-D`?** `-d` refuses to delete a branch with unmerged changes (safe); `-D` force-deletes regardless.
39. **What is `.gitattributes` used for?** Configuring per-file-type Git behavior, commonly line-ending normalization and diff/merge strategies for specific file types.
40. **What is Git LFS?** Large File Storage — an extension that stores large binary files outside the main repo (as pointers), preventing repo bloat.
41. **What's a "shallow clone"?** A clone fetching only a limited/recent slice of history (`--depth N`) instead of the full history, for speed.
42. **What does `git log --graph` add?** An ASCII visualization of the branch/merge structure alongside the commit list.
43. **What's the difference between `git diff HEAD` and `git diff`?** They're typically equivalent for uncommitted changes (both compare working directory to HEAD-equivalent state), but `git diff` alone compares working dir to the index while `git diff HEAD` compares working dir to the last commit directly, including staged changes.
44. **What does `git clean -fd` do?** Permanently deletes untracked files and directories — irreversible, use with caution (`-n` for a dry run first).
45. **What are branch protection rules on GitHub?** Repository settings that enforce requirements (PR reviews, passing CI, no force-push) before code can be merged/pushed to a specific branch.
46. **What's a CODEOWNERS file?** Defines which users/teams are automatically requested as reviewers for changes to specific paths.
47. **What does `git rev-parse HEAD` return?** The full SHA of the current commit.
48. **What's the difference between a Git "tag" and a "release" on GitHub?** A tag is a pure Git concept (a named pointer); a GitHub Release is a GitHub-specific feature built on top of a tag, adding release notes, downloadable assets, etc.
49. **What does `.git/config` typically contain in a cloned repo?** Remote URLs, branch tracking info, and any repo-local overrides of global Git settings.
50. **How would you find which commit introduced a specific line of code?** `git blame <file>` for a quick look, or `git log -S"<search string>"` (the "pickaxe" option) to find commits that added/removed that exact string anywhere in history.
51. **What does `git log --author="name"` do?** Filters commit history to only commits by that author.
52. **What's the purpose of a draft Pull Request?** Signals a PR is work-in-progress, not ready for review/merge, while still enabling early CI feedback and discussion.
53. **What is `git worktree` used for?** Checking out multiple branches simultaneously into separate working directories from one shared `.git` repository.
54. **What does "squash and merge" do on GitHub specifically?** Combines all commits in the PR into a single commit on the target branch, discarding the individual commit history from the branch (though it's preserved in the PR itself).
55. **What's the difference between `origin/main` and `main` locally?** `main` is your local branch; `origin/main` is your local machine's last-known snapshot of the remote's `main` — updated only by `fetch`/`pull`, not automatically in real time.

### Advanced Rapid-Fire (20)
56. **How would you split a large, messy commit into several smaller logical commits after the fact?** `git reset --soft HEAD~1` to uncommit while keeping changes staged, then selectively `git add -p` and commit in smaller, logical chunks.
57. **What is `git filter-repo` and why is it preferred over the older `filter-branch`?** A modern, much faster, safer tool for rewriting repository history (e.g., removing secrets/large files from every commit); `filter-branch` is officially deprecated due to performance and correctness issues.
58. **How does Git handle binary files differently from text files?** Git can't produce meaningful line-based diffs for binaries — it treats them as opaque blobs, storing a full new copy on any change (no delta compression benefit), which is why large binaries bloat repos.
59. **What is a "fast-forward-only" pull configuration and why would a team enforce it?** `git pull --ff-only` refuses to create a merge commit if history has diverged, forcing an explicit decision (rebase or merge) rather than an automatic merge commit — used to keep history intentional.
60. **How would you audit a repository for accidentally-committed secrets across its entire history?** Tools like `gitleaks` or `trufflehog` scan every commit's full diff history for credential-shaped patterns (API key formats, private key headers, etc.), not just the current state of files.
61. **What's the difference between GitHub Actions "on: push" and "on: pull_request" triggers, and why does it matter for security?** `pull_request` from a fork runs with restricted permissions/secrets by default (protecting against malicious PRs stealing secrets); `pull_request_target` runs with full base-repo permissions and must be used very carefully, typically only combined with explicit checks, to avoid a serious secret-exfiltration vulnerability.
62. **How would you design a Git workflow supporting long-term maintenance of multiple released versions simultaneously (e.g., v1.x and v2.x both need bugfixes)?** Maintain long-lived release branches (`release/1.x`, `release/2.x`) alongside `main`; bugfixes are cherry-picked or backported to each relevant release branch as needed.
63. **What is `git submodule` and what's a common pain point with it?** Embeds another Git repo at a pinned commit inside your repo; the common pain point is that submodules don't auto-update — collaborators must remember `git submodule update --init --recursive` after pulling, easy to forget, leading to "why is this file missing/old" confusion.
64. **How would you enforce commit message conventions automatically?** A `commit-msg` Git hook (often via Husky + commitlint in Node projects) validating the message format against a configured convention (e.g., Conventional Commits) before allowing the commit.
65. **What's the performance difference between Git's loose objects and pack files?** Loose objects are individually compressed files (fast to write, but many small files add overhead); pack files bundle many objects together with delta compression against similar objects, dramatically reducing size/IO — `git gc` periodically repacks loose objects into pack files.
66. **How would you safely test a risky rebase before committing to it?** Create a temporary backup branch first (`git branch backup-before-rebase`) so you can always `git reset --hard backup-before-rebase` if the rebase goes wrong, without relying solely on reflog.
67. **What is `git bisect run` and when would you use it?** Automates the entire bisect process by running a specified test script at each step, letting Git fully automatically pinpoint the breaking commit without manual testing at each midpoint — ideal when you have a reliable automated test reproducing the bug.
68. **How do you handle Git LFS bandwidth/storage costs at scale?** Monitor LFS usage via the hosting provider's quotas, prune old/unnecessary LFS objects (`git lfs prune`), and consider whether truly large assets (e.g., video) belong in a dedicated asset/CDN system instead of the repo at all.
69. **What's the risk of `pull_request_target` combined with `actions/checkout` of the PR head in GitHub Actions?** It can let an external, untrusted PR's code execute with the base repository's full secrets/permissions — a well-known supply-chain attack vector if not carefully scoped (e.g., never checking out and running untrusted PR code with elevated permissions).
70. **How would you migrate a huge existing Subversion (SVN) repository to Git while preserving history?** Use `git svn clone` (or specialized migration tools) to walk the SVN history and recreate equivalent Git commits, mapping SVN authors/branches/tags to Git's model — often requiring careful author-mapping and cleanup afterward since the two systems' branching models don't map 1:1.