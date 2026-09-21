# WORKFLOW

Repository: git-crew-sync-creencia-ronnel

## Task 1: Push a change from Clone A
![Task 1 evidence](screenshots/task1.png)

## Task 2: Diverge from Clone B and get rejected
![Task 2 evidence](screenshots/task2.png)

## Task 3: Reconcile with a merge
![Task 3 evidence](screenshots/task3.png)

## Task 4: Diverge again and reconcile with a rebase
![Task 4 rejected push](screenshots/task4a.png)
![Task 4 rebase conflict and resolution](screenshots/task4b.png)

## Task 5: Merge into main
![Task 5 evidence](screenshots/task5.png)

## Task 6: Tag v1.0-synced
![Task 6 terminal](screenshots/task6a.png)
![Task 6 GitHub tag page](screenshots/task6b.png)

## Questions

### 1. What did the rejected push error message tell you, and why did it happen?

The error said `! [rejected] feature/overtime-pay -> feature/overtime-pay (fetch first)`, and the hint said the remote contains work I do not have locally. It happened because Clone A had already pushed commit b3424d6 (the overtime pay) to GitHub, while Clone B was still based on the older commit 1213c49 and had never fetched it. My commit a9e22f9 (rounding) and b3424d6 both descended from 1213c49, so the two histories had diverged. Git refused the push because accepting it would have overwritten my teammate's commit on the remote.

### 2. What's the actual difference between how you resolved Task 3 (merge) vs Task 4 (rebase)?

In Task 3, I ran `git fetch` and `git merge origin/feature/overtime-pay` in Clone B, resolved the conflict in shifts.js and test.js, and finished with `git commit`. This created a new merge commit, 369ee73, with two parents, so both lines of work stayed visible in the history and my original commit a9e22f9 was left unchanged. In Task 4, I ran `git fetch` and `git rebase origin/feature/overtime-pay` in Clone A, resolved the conflict in shifts.js, and finished with `git rebase --continue`. Git replayed my commit 4ae5e09 on top of 369ee73, which gave it a new hash (1bfc45d), so the history became a straight line with no merge commit. The conflict markers were also reversed: in the merge, HEAD was my own change, but in the rebase, HEAD was the remote's version and the bottom half was my commit being replayed. I didn't need `--force` because origin/feature/overtime-pay was already an ancestor of my rebased commit.

### 3. What one habit would have avoided both rejected pushes in this lab?

Running `git fetch` (or `git pull`) before starting work and again before pushing. In Task 2, Clone B never fetched Clone A's push, and in Task 4, Clone A never fetched Clone B's merge, so both times I built on a stale copy of the branch. Fetching first would have shown me the remote's new commits before I pushed, so I could have integrated them on my own terms instead of being rejected. It would not have removed the conflicts, since we edited the same lines, but I would have seen them earlier and resolved them before the push instead of after it failed.

### 4. Which approach, merge or rebase, would you default to on a shared team branch, and why?

I would default to merge on a shared branch. Merge never changes existing commits, so nobody's history gets rewritten and everyone's local copy stays compatible with the remote. Rebase creates new commits with new hashes, as my 4ae5e09 becoming 1bfc45d showed, so if a teammate had already pulled my original commit, rebasing would leave us with mismatched histories and force us to clean up. Rebase was safe in Task 4 only because my commit was still local and had never been pushed. So I would use rebase to tidy my own unpushed commits before sharing them, and merge to combine work that is already shared.