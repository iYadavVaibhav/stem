---
description: Git and GitHub
description: Notes on working of Git and Github
date: 2018-07-02
---

# Git and GitHub

Git is version control software to track changes in source code. GitHub is cloud storage for Gits. We check-in and check-out files to git and it keeps a track of the history.

## Installation

- `git --version` to check the version of git installed.
- `where git` to find path
  - to fix this, add the location of folder having `git.exe` to `$PATH`.
- *On mac it was pre installed as part of Xcode Command Line Tools.*

## Terminology

- `HEAD` variable that points to default branch.
- `checkout` switch or activate a branch
- `remote` - Git repo on server. Git stores remote URLs in objects called "remotes"
  - `origin` origin is the default remote for almost all repositories. It has info on fetch/push url, remote branches, track status etc.
- `track` - local-branch needs a link to remote-branch to do push and pull.
  - as a `tracking reference to the upstream server`
  - set `the remote as upstream`  
  - to `track remote branch`
  - current branch `has no upstream branch.`
  - `-u` or `--set-upstream` or `--set-upstream-to=origin/master` or `--track` all are same.
  - `upstream branch` - remote-branch to which local-branch tracks to
- `fetch` look for changes but **don't download**
- `pull` **download** changes to local
- `fork` - copies the code to **your-remote-space**. Keeps link to **original upstream**, in case you want to pull future changes.
- `clone` to **local-system** for making changes
- `pull request` Ask **remote-repo owner** to pull your branch into main branch. This will **merge** your updates. Do follow developer guidelines for this to be accepted.

## Configuration

- You can get/set/edit/unset options with this command
- values can be set at **global** or **system** or **local** (repo) level
  - `~/.gitconfig` global
  - `./.gitconfig` local in repo
- username and email are required to be correctly set locally as they are written in each commit (who did it?). This also helps to associate correct account when pushed to remote.
- format is `git config --flag name.key value`

- **read** config
  - `git config user.name` shows name  
  - `git config user.email` shows email
  - `git config --list --global` get all global options, --list or -l
  - `git config --list --local` get all local options
  - `git config --get remote.origin.url` - remote URL, --get is optional

- **write** config
  - `git config --global user.name "Your Name"` sets the user name in global file
  - `git config user.name "Your Name"` sets user name in local repo file
  - `git config --global credential.helper 'cache --timeout=72000'` caches. so enter credentials once every 20 hours
  - `git config --global credential.helper store` - stores the username and password in store utility

## Operations


### Read Local Repo

- `git status` - current local branch and changes
- `git branch` - local branches
- `git branch -r` - remote branches
- `git branch -a` - all, local and remote branches
  - output

    ```bash
    * PRJ-454
    develop
    remotes/origin/PRJ-454
    remotes/origin/PRJ-508
    remotes/origin/HEAD -> origin/develop
    remotes/origin/origin/develop
    ```

  - first two are local and then remotes, see `HEAD` points to one of the remote branch, this is checkout and acts as default.

### Write Local Repo

- create repo
  - `git clone https://...git` - **clone remote** repository
  - `git init` - start repository local

- commits
  - `git add --all`
  - `git commit -m "Initial Commit"`

- remotes add/set
  - `git remote add origin https://...git` **add a remote** to existing local repo
  - `git remote set-url origin https://...git` **update remote**, change to new

- branch/pull
  - `git checkout -b <new-branch>` - **creates** new-local-branch and **checksout**. It has **no upstream** to track.
  - `git checkout <branch-name>` - **checksout** existing-local-branch
  - `git checkout head` - checksout detached default branch
  - `git checkout HEAD` - checksout default branch, usually master.
  - `git branch -u origin/remote-branch-name` to set-upstream on current-local-branch to track. remote-branch-name should exist.
  - `git branch -u origin/remote-branch-name local-branch-name` to set upstream on **another**-local-branch.
  - `git pull` - downloads changes from remote to current-local-branch
  - `git pull origin remote_branch_name` - pulls an existing remote branch to local repository, local branch with same name should exist, else do `git checkout -b <new-branch>`
  - If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:
    - `git switch -c <new-branch-name>`

- merge - changes from one branch to another, say from `hotfix` to `master`
  - `git checkout branch-merge-into` - master if you have to merge changes into master
  - `git merge branch-merge-from` - say hotfix
  - `git rebase master` - if you have new changes in master that you want in your branch. more [here](https://stackoverflow.com/questions/5340724/get-changes-from-master-into-branch-in-git).
  - it can go smooth or can have conflicts, then resolve conflicts
  - more details [here](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

- stash
  - stash means keep safely. When you have to switch from branch A to B but not commit changes in branch A, then stash changes in A, switch to B, do work, back to A, then stash pop to return to your uncommited changes.
  - `git stash` on branch A, to not commit but keep changes safely
  - `git checkout B` - do changes, commit.. push.. whatever
  - `git checkout A`
  - `git stash pop` - to return your uncommited changes in A.
  - more [here](https://opensource.com/article/21/4/git-stash)

- delete
  - `git branch -d my-branch-name` - use `-D` to force delete


### Read Remote Repo

- `git remote show origin` all the information about a remote called origin. Output:
  - fetch and push URL
  - All remote branches, their tracking status and HEAD branch
  - who pulls from whom
  - who pushes to whom

      ```bash
      * remote origin
      Fetch URL: URL/user/repo.git
      Push  URL: URL/user/repo.git
      HEAD branch: master
      Remote branches:
        PRJ-001 tracked
        PRJ-000 stale (use 'git remote prune' to remove)
        master  tracked
      Local branches configured for 'git pull':
        PRJ-001 merges with remote PRJ-001
        master  merges with remote master
      Local refs configured for 'git push':
        PRJ-001 pushes to PRJ-001 (up to date)
        master  pushes to master  (up to date)
      ```

- `git fetch` - reads from remote if changes are available to pull, **does not pull**

### Write Remote Repo

- `--set-upstream` or `-u` to set upstream
- `git push` writes current-local-branch to remote
  - `git push -u origin <local-branch-name>` - sets upstream as origin/local-branch-name and pushes current-local-branch to remote git. New remote-branch "local-branch-name" is created, if not exists.
  - `git push -u origin local-branch:remote-branch` - uses different branch names. Creates new on remote if does not exist.
    - Output `Branch 'local-branch' set up to track remote branch 'remote-branch' from 'origin'.`
  - `git push -u origin HEAD` need not write
  - `git push -u origin` - sets upstream as origin and pushes current-local-branch to remote.
- `git push origin` pushes **all** branches to remote


### Pull Requests

- approvals
  - `git checkout remote_branch_name` - this creates a new local branch and links remote with it.

- create
  - you can create pull request when your branch (source) is ahead of the destination branch, else pull and merge destination.


## How to clone a repository from GitHub.com

- `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`
- eg, `git clone https://github.com/miguelgrinberg/microblog.git`
- This will bring all the files from remote to local directory with git repository on local folder.
- Now if you have permission to commit to this repo then you can **authenticate to push**, else **change the remote** to another repo that you can push to.

## Guide - How to sync when network is restricted

- Idea is to use following branches on local:
  - `master` - this will have files from remote and updated to last merged activity. Download and extract here.
  - `ofc` - branch moves ahead with updates in local environment
  - `ofc_masked` branch having only files that can go remote
  - `zip` - download and extract zip from remote when you have to merge

- Merge process

```sh
# in local on branch ofc, commited
git checkout -b ofc_masked # create branch
# delete internal files, commit
git add .
git commit -m 'ofc_masked for diff'

git checkout -b zip
rm -rf . # delete all 
# then extract zip downloaded from remote
git add .
git commit -m "remote for diff"

git diff ofc_masked zip > diff.patch


# ON Remote   ----------------------------------

git checkout master
git add .
git commit -m "ready_to_merge"

# create new branch in remote and apply patch
git checkout -b master_patched

# download diff.patch, and save

"C:\Program Files\Git\usr\bin\patch.exe" -p1 < diff.patch

# check manually for `*.orig` files and verify changes

git add .
git commit -m "patched"

# merge to master
git checkout master
git merge master_patched
git add .
git commit -m "patched_merged"
git push

# download and extract in master on local

# git diff --no-prefix ofc_masked zip > diff.patch # for this
# "C:\Program Files\Git\usr\bin\patch.exe" -p0 < diff.patch # use this
```
  
- Init or after merge, on local - **auto**
  - checkout master, delete all, download and extract remote
  - checkout ofc, `git rebase master`
  - do manual merge conflicts, `git add .`
  - `git rebase --continue`

- Init or after merge, on local - **manual**
  - download and unzip to master
  - backup internal folder from `ofc`
  - create `ofc` branch from master and add internal folder
  - delete all from `zip` and `ofc_masked`


Link - <https://gist.github.com/nepsilon/22bc62a23f785716705c>

## Guide - Git Local to Remote Basics

### Setup Git

- On any folder, do this **once**
- eg, `mkdir myProject` then `cd myProject`
- `git init` this will create a **local** git repository on your local drive. Now if you need to add this to a remote git repository, for example, a repository on github.com or bitbucket then you need to add remote to this folder.

Now once you have written your code, you can add and commit new code to local git:

### Add and Commit code

- `git add .` adds all files to git. To add one file, pass filename.
- `git diff` shows changes made to files.
- `git commit -m "Message"` commits to git with message.
- optional, `cat .gitignore` add files that you want git to ignore

### Add Remote

- Create a new repository on GitHub.com
- on your local folder, `git remote add  [name] [url]` will add remote. Here, `name` can be origin and `url` is https/ssh url of git repo created online on GitHub.com. Use SSH if you have SSH authentication setup.
- Once remote is added to your local git then you can push or pull the files based on the commands below.

### Syncing local and remote

- `git pull` pulls updates from remote to local
- `git push` pushes the committed changes from local to remote. We can also specify remote name and branch here. eg:
  - `git push -u origin master`.

## Rename git branch

- `git branch --move main master` - moves main to master, `-m` is same as `--move`
- `git push -u origin master` - pushed master to remote as master (new on remote if not exists)
- `git branch -a` - to view all branches
- finally make `master` as default on remote and delete `main`.
- or simply rename on github.com.

## SSH Authentication to push to remote

You can connect to GitHub using the Secure Shell Protocol (SSH), which provides a secure channel over an unsecured network. It can help connect one machine to another using keys and thus avoiding to provide username and password/token on each request. `id_rsa.pub` is default public key.

- if `~/.ssh/id_rsa.pub` exists do `cat ~/.ssh/id_rsa.pub` else generate SSH Key `ssh-keygen`, passphrase is optional.
- copy the content, Open GitHub, click your profile icon, settings, SSH and GPC Keys, Click on the new ssh key button.
- enter any title and key that you copied
- more - <https://docs.github.com/en/authentication/connecting-to-github-with-ssh>

Checking

- Check using `ssh -T git@github.com`
- Output should say `Hi <user_name>! You've successfully authenticated, but GitHub does not provide shell access.`

Fixing SSH issue

- error - `ssh: connect to host github.com port 22: Connection refused`
- change ssh config to use new url and port, Override SSH settings `gedit ~/.ssh/config` and add

```sh
# Add section below to it
Host github.com
  Hostname ssh.github.com
  Port 443
```

- save and try again.
- Change your git remote to use SSH URL instead of HTTPS `git remote set-url origin git@github.com:YOUR-USERNAME/REPO-NAME.git`

## Get and Set Remotes

- `git remote -v` do on a folder to check remotes added.
- `git remote get-url --all REMOTE-NAME` to see URL of remote.
- `git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO.git` to update remote on a folder.

## Handling Conflicts

If you push to git from two different repositories then there may be conflict. eg, you push from mac repo and a cloud repo or ubuntu repo. To handle conflict:

- Open conflicted file in editor and look for `<<<<<<<<` .
- You'll see the changes from the HEAD or base branch (github usually) after the line `<<<<<<< HEAD`
- `========`, it divides your changes from the other branch as `>>>>>>>>YOUR_BRANCH_NAME`
- You can decide if you want keep your branch changes or not. If you want to keep the changes what you did, delete the conflict marker they are, `<<<<<<<, =======, >>>>>>>` and then do a merge.
- Once done, `add commit push` :)

## Version controlling in GIT

You can see previous versions of file in your git repository.

- to see the checkins done

```sh
> git reflog
044cf0e (HEAD -> master) HEAD@{0}: commit: updates
aae1995 HEAD@{1}: commit (initial): first commit
```

- `git show HEAD@{1}:path/to/file.ext` show file on terminal
- press down arrow to navigate and `q` to quit

or

- `git show -1 filename` - shows difference with last revision
- use -1 or -2 or -3 and so on for going into history.

## Adding RSA for password free sync on Mac

GitHub is excellent for code repositories online to share work, collaborate or keep a backup.

I have followed an excellent [post](https://kbroman.org/github_tutorial/) by Karl Broman on the same. To summaries the flow:

- Install git on local drive.
- Setup RSA for SSL: RSA is used for making safe authentications via SSL.
- Setup GitHub Account: You will get an online space to upload your code with version controlling.

## Todo

- [ ] - Merge guide to operations
