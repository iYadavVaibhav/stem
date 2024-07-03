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

- You can get/set/edit/unset variables that configure git. Values can be set at **global** or **system** or **local** (repo) level.
- Global configs are stored in `.gitconfig` file in `home` dir usually. It holds YAML data. You can set values using commands and see the values set.
  - `~/.gitconfig` global
  - `./.git/config` local in repo
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
  - `git config --global --unset http.proxy` to unset a variable

## Read Local Repo

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

## Write Local Repo

- create repo
  - `git clone https://...git` - **clone remote** repository
  - `git init` - start repository local

- commits
  - `git add --all`
  - `git commit -m "Initial Commit"`

**Remotes**

```sh
# add remote to existing local repo
git remote add origin https://repo.git

# update remote
git remote set-url origin https://repo.git

# View remotes added to local repo
git remote -v

# View URL of a remote
git remote get-url --all <remote-name>
```

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
  - `git remote prune origin` - removed deleted remote branch from local history in branch -a.

**Remove Files and Folders**

If a file is tracked in git then adding it to `.gitignore` will not ignore it. So you will have to do following for it.

```sh
# to remove dir
git rm --cached -r the_project/dev_dir

# to remove a file
git rm --cached the_project/secrets.py
```

## Read Remote Repo

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

## Write Remote Repo

- `--set-upstream` or `-u` to set upstream
- `git push` writes current-local-branch to remote
  - `git push -u origin <local-branch-name>` - sets upstream as origin/local-branch-name and pushes current-local-branch to remote git. New remote-branch "local-branch-name" is created, if not exists.
  - `git push -u origin local-branch:remote-branch` - uses different branch names. Creates new on remote if does not exist.
    - Output `Branch 'local-branch' set up to track remote branch 'remote-branch' from 'origin'.`
  - `git push -u origin HEAD` need not write
  - `git push -u origin` - sets upstream as origin and pushes current-local-branch to remote.
- `git push origin` pushes **all** branches to remote


## Pull Requests - PR

Is a request made by developer (coder) to other developers (reviewers) so that reviewers can review the _feature-branch_ and up on satisfaction they can approve it. On required approvals coder can `merge` the _feature_ branch to _main_ branch. This will pull the feature branch to main branch, hence named _pull request_.

**Review**

To approve a Pull Request you need to create the same on your local machine. So on terminal do:

```sh
$ git checkout -b JIRA-123
Switched to a new branch 'JIRA-123'
branch 'JIRA-123' set up to track 'origin/JIRA-123'.

$ git pull
remote: Enumerating objects: 22, done.
remote: Counting objects: 100% (22/22), done.
...
Already up to date.
```

If you accidently pull a wrong remote branch to local,eg in local-develop you pulled remote-JIRA-123 , you can reset using

```sh
git reset --hard origin/develop
```

**Create a Pull Request**

When you develop a new feature, you can create a Pull Request so that reviewers can review and approve it.

Pull Request needs a source (your feature branch) and destination (the main branch).

It is good to have a **template** for the documentation of Pull Request that reviews can use to review.

```md
**Title**

JIRA-123 - The Story Name


**Info**

I have done ...

So that...

**Steps for reviewers**

- Ensure that ...
- Copy this to ...
- Add env ...
- Run below commands ...

`Insert Code`

- Check that ...
- Verify that ...
- Approve PR.
```


## How to clone a repository from GitHub.com

- `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`
- eg, `git clone https://github.com/miguelgrinberg/microblog.git`
- This will bring all the files from remote to local directory with git repository on local folder.
- Now if you have permission to commit to this repo then you can **authenticate to push**, else **change the remote** to another repo that you can push to.

## Git Diff Patch & Bundle - Text Sync

_all about syncing in network restrictions_

**Git Patch**

It is changes in text-format. It lets collaborate using text files instead of remote servers.

> "A patch in Git is a textual representation of the changes in a commit, formatted in a way that Git can reconstruct the commit and apply it on a branch in another repository." - InitialCommit

It should be used when you want to share one or more commits over email. It was used to when push/pull to remote was not used, rather email was used to sync changes. So text having information of changes done was sent to another user via email and they can apply to branch in their repository.

`git format-patch` command builds patch from multiple commits. It generates the patch file. To generate a patch file is called "format a patch".

**Git  Diff**

`git diff` command shows difference between two things (files/commits/branches).

The output `format-patch` and `diff` is same, except that

- the `format-patch` has additional information about the commits, author details, timestamp and file change meta data. This extra information is also merged when applying the patch to another repository.
- the `format-patch` can be used over multiple-commits and generates one patch for each commits. You can then apply these patches in another repository to one-by-one to reach each commit.

You can use diff to create patch

```sh
git diff <old-commit> <new-commit> > diff.patch

git diff branch1 branch2 > diff.patch
# diffs branch1 with branch2 and stores output in diff.patch file
```

Here, branch2 should be new to list latest changes in patch, else the patch will have reverse changes.

**Applying Patch**

`git apply` is command that lets apply patch to a branch. You can also use `patch` which is separate command for updates and not git specific.

```sh
git apply diff.patch
```

**Git Bundle**

`git bundle` is a command that builds one file having whole repository with all commits. It allows easy file sharing without need of central server. Note: this file is binary not text.

```sh
git bundle create <bundle_file> <refs>

git bundle create my_prj.repo HEAD
```

`<refs>` can be HEAD or branch name or tags.

**Links**

- [Initialcommit - git-format-patch](https://initialcommit.com/blog/git-format-patch)
- [Git bundle on Lindedin](https://www.linkedin.com/pulse/what-git-bundle-stephen-paynter/)

## Rename git branch

- `git branch --move main master` - moves main to master, `-m` is same as `--move`
- `git push -u origin master` - pushed master to remote as master (new on remote if not exists)
- `git branch -a` - to view all branches
- finally make `master` as default on remote and delete `main`.
- or simply rename on github.com.

## SSH Authentication for Git

You can **pull** using HTTP/SSH. **HTTP** lets you pull without authentication and is **recommended** for **public** repos.

For **push** you always need **authenticated** n/w, and **recommended** method is **SSH**. Also, to pull private repo you need auth.

```sh
cd ~/.ssh/
ls -la

# If no id_rsa.pub key, generate
ssh-keygen

# copy public key
cat ~/.ssh/id_rsa.pub
```

Now you would have id_rsa.pub and id_rsa files.

The file `id_rsa.pub` has your public key. This is secret, but can be givent to server/bitbucket/github, so that they have your public key and can authenticate you without your username password.

**Add key to Github**

Copy the content, Open GitHub, click your profile icon, settings, SSH and GPC Keys, Click on the new ssh key button. Enter any title and key that you copied.

**Checking SSH Auth**

- Check using `ssh -T git@github.com`
- Output should say `Hi <user_name>! You've successfully authenticated, but GitHub does not provide shell access.`

**Fixing SSH issue**

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

**Links** - <https://docs.github.com/en/authentication/connecting-to-github-with-ssh>

## Multiple Remote Repo Username Setup

You may want to push code to different Remote Repo, eg, tom@github and ram@github. One rsa key does not work on multiple accounts. You need to have different rsa keys. Git Config needs to know which rsa key to use. Also git config need to know name and email.

```sh
# Generate SSH Key for new user
ssh-keygen -t rsa -C "tom@gmail.com"
# name: id_rsa_tom

```

Here, -t defines type of key to generate. -C defines comment to the key, this helps see the comment in the key.

Now copy content of `id_rsa_tom.pub` and use it on server to let you authenticate.

On local, you need to set git config to use correct user details:

```sh
# Change SSH Key to be used in Git Repo
git config --global core.sshcommand 'ssh -i /home/tom/.ssh/id_rsa_tom -F /dev/null'

git config --global user.name "Tom Guy"
git config --global user.email "tom@gmail.com"
```

You can modify above based on which user you want to use for remote push/pull. You can use `--local` if you are in git dir.

In case you have commited by wrong user, you can edit the commit before push.

## Fix Commit Author for Last Commit

Ensure you have correct git config, user.name and user.email. Then amend the comment

```sh
# Configre new username
git config user.name username
git config user.email user.name@gmail.com

# Amend last commit if done wrong
git commit --amend --author="User Name <user.name@gmail.com>"

# Check if last commit is updated
git log

# Change SSH Key to be used in Git Repo
git config --local core.sshcommand 'ssh -i /home/username1/.ssh/id_rsa_username -F /dev/null'

# Pull GitHub content to rebase
git config pull.rebase true 

# Pull to avoid conflict
git pull origin main

# Push to GitHub with new username
git push --set-upstream origin main
```

## Fix Commit author for multiple commits

First, update the git config with correct username and email.

Find commit number which is older than the commits you want to update author, eg, `91d5062`

```sh

git rebase -r 91d5062 \
    --exec 'git commit --amend --no-edit --reset-author'
```

Link: [Stackoverflow - How do I change the author and committer name/email for multiple commits?](https://stackoverflow.com/a/1320317/1055028)

For only **last commit** message update"

```sh
git commit --amend -m "New commit message"
```## Fix Github Commit author for multiple commits

First, update the git config with correct username and email.

Find commit number which is older than the commits you want to update author, eg, `91d5062`

```sh

git rebase -r 91d5062 \
    --exec 'git commit --amend --no-edit --reset-author'
```

Link: [Stackoverflow - How do I change the author and committer name/email for multiple commits?](https://stackoverflow.com/a/1320317/1055028)

For only **last commit** message update"

```sh
git commit --amend -m "New commit message"
```

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

## Git Tags

First commit and then add a tag, `git tag -a v1.4 -m "my version 1.4"` to add new annotated tag.

`git push origin --tags` to push tags to remote.

`git tag -d v0.6` to delete tag

Remote tag example: `git push -d origin v0.6``

**Links** - Git Tags

- [https://git-scm.com/book/en/v2/Git-Basics-Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

## Fix Corrupt Git

Following works on ubuntu

```sh
git repair
```

## Guide - Disconnected Sync when Network is Restricted

Scenario is that you need to sync repo1 and repo2 but there is no central server or connectivity between them. You can't do git push/pull as there is no remote. In this case we use text file having changes called patch.

Here, repo1 is network restricted, repo2 is not.

**Build Patch**

On repo1, ensure you are on `dev` branch and that all changes are commited.

```sh
# Ensure
git checkout dev
git add .
git commit -m "ready_to_diff"

# Build Patch
git diff master dev > diff.patch
```

This generates a patch with all changes done compared to master branch. Now copy the contents of this file to another machine having `repo2`


**Applying patch on Repo2**

Now on repo2, ensure you are on master branch and all changes are commited. Create a new branch to patch:

```sh
git checkout -b master_patched
touch diff.patch
```

Copy and paste contents to `diff.patch`

```sh
git apply --reject --whitespace=fix diff.patch
```

Once you verify that patch is applied and all changes are in place, delete the patch file

```sh
rm diff.patch
git add .
git commit -m "patched"

# merge to master
git checkout master
git merge master_patched

# commit and push
git add .
git commit -m "patched_merged"
git push
```

Now you have synced changes from repo1 to repo2. Lastly, bring these changes to repo1 so that both are in perfect sync.

**Resetting Repo 1**

On repo1

```sh
git checkout master
git branch -D dev
```

Now delete all files and folders except `.git`. Then download zip, extract.

```sh
mv .git ../tmp.git/
rm -rf *.*
rm -rf *
rm -rf .*
mv ../tmp.git ./.git
curl -L http://github.com/iYadavVaibhav/stem/archive/master.zip > master.zip
unzip master.zip
mv ./stem-master/* .
rm master.zip
rm -rf stem-master
```

Then, commit and create dev branch

```sh
git add .
git commit -m "downloaded patched"
git checkout -b dev
```

Now your repo1 is updated with all changes merged and is ready to work.

**Link** - <https://gist.github.com/nepsilon/22bc62a23f785716705c>

## Guide - Git Local to Remote Basics

**Setup Git**

- On any folder, do this **once**
- eg, `mkdir myProject` then `cd myProject`
- `git init` this will create a **local** git repository on your local drive. Now if you need to add this to a remote git repository, for example, a repository on github.com or bitbucket then you need to add remote to this folder.

Now once you have written your code, you can add and commit new code to local git:

**Add and Commit code**

- `git add .` adds all files to git. To add one file, pass filename.
- `git diff` shows changes made to files.
- `git commit -m "Message"` commits to git with message.
- optional, `cat .gitignore` add files that you want git to ignore

**Add Remote**

- Create a new repository on GitHub.com
- on your local folder, `git remote add  [name] [url]` will add remote. Here, `name` can be origin and `url` is https/ssh url of git repo created online on GitHub.com. Use SSH only if you have [SSH authentication](#ssh-authentication-for-git) setup.
- Once remote is added to your local git then you can push or pull the files based on the commands below.

**Syncing local and remote**

- `git pull` pulls updates from remote to local
- `git push` pushes the committed changes from local to remote. We can also specify remote name and branch here. eg:
  - `git push -u origin master`.

## Todo

- [ ] - Merge guide to operations

## Links

- [Github RSA by Karl Broman](https://kbroman.org/github_tutorial/)
