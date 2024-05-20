---
date: 2018-07-26
---

# Linux Terminal

*Here are some basic understandings and commands that can be used on UNIX terminal and eventually on Mac.*


## Mac Specific

### Macbook Air

- Text input source `British PC` aligns correctly to british keyboards with
  - left to 1 as backtick and negation
  - left to Z as backslash and pipe `\\ |`
  - left to enter as hash and tilde, `~ #`
  - " above 2, and @ above ?.

### Mac Tools

```sh
# SQL Client for MySQL, Postgre
brew install --cask sequel-ace
```

### Homebrew

- package manager for mac,
  - cask are usually GUIs apps like Sublime.
  - formulae are packages, CLIs, like node.

Brew Global Commands:

- `brew update` - Update brew and cask list, not packages
- `brew upgrade` -  Upgrade all packages
- `brew list` - List installed packages and casks
- `brew outdated` - List outdated packages?
- `brew doctor` - Diagnose brew issues
- `brew cleanup` - cleans all packages
- `brew services list`- lists all services installed

Brew Commands:

- `brew install git` -  Install a package
- `brew uninstall git` -  Remove/Uninstall a package
- `brew upgrade git` -  Upgrade a package
- `brew switch git 2.5.0` -  Change versions
- `brew list --versions git`  See what versions you have
- `brew cleanup git` Remove old versions

Brew Cask (GUI) commands:

- `brew install --cask firefox` Install the Firefox browser
- `brew list --cask`  List installed applications

### Others

`diskutil list` - lists all disks

Format a disk from Mac terminal:

- `diskutil eraseDisk FILE_SYSTEM DISK_NAME DISK_IDENTIFIER`
- eg: `diskutil eraseDisk FAT32 VY_Disk /dev/disk2` or use ExFAT

- `/Volumes/PenDrive` location of usb mounts

Copy to clipboard

- `$ pbcopy < my_filename.ext` it copies the content of file to clipboard.
- It is helpful to quickly copy RSA key to clipboard which you need to paste on, may be, GitHub.

Androids

- `~/.android` - google utility folder
- `avdmanager list avd` - lists all android virtual devices installed.

Uninstalling:
Usually check for following dirs and remove:

- `sudo rm /usr/local/mypkg`
- `sudo rm -rf /usr/local/var/mypkg`
- `sudo rm -rf /usr/local/mypkg*`
- `sudo rm -rf /Library/StartupItems/mypkg*`
- `sudo rm -rf /Library/PreferencePanes/MyPkg*`
- `rm -rf ~/Library/PreferencePanes/MyPkg*`
- `sudo rm -rf /Library/Receipts/mypkg*`
- `sudo rm -rf /Library/Receipts/MyPkg*`



## Ubuntu Specific

- what? - Ubuntu is debain based os, others are Mint, Elementary and PoP OS.

  - **Packages Installation & Managemet** - apt pkg dpkg
    - Packages are maintained in **repositories**, `Main`, `Universe`, `Restricted` and `Multiverse`. You can enable the repo based on your requirement.
    - Debain uses `dpkg` packaging system, for install/uninstall software.
    - PPA - Personal Package Archive - allows application developers to create their own repositories to distribute.

  - **APT - Advanced Package Tool**
    - it is CLT UI that works with core libraries to handle the installation and removal of software on Debian, Ubuntu. IT manages dependencies, config files and upgrades/downgrades. `apt-get` performs installation, search, updates to pkg available on system. works with `sudo` only.
    - apt=most common used command options from apt-get and apt-cache. It is high level wrapper on old apt-get. Use apt for better UI and info like summary and progress bar.
    - `dpkg` does not handle dependency, while `apt` does. apt under the hood uses dpkg.


Tasks

- Add repository
  - `sudo add-apt-repository universe`
  - `` add a PPA repo

```sh
# Enable a repo
sudo add-apt-repository universe

# Add a repo
sudo add-apt-repository ppa:whatever/ppa

# list the repos added to system
sudo add-apt-repository --list

# Remove repo
sudo add-apt-repository --remove ppa:whatever/ppa
```

Here, when you enable a repo, itmeans packages can be searched in this repository


- Update and Upgrade
  - `sudo apt-get update` - updates local copy of packages database. The result has :
    - Hit: no change in pkg
    - Get: update available, downloads details but not the update
    - Ign: ignores.
  - `sudo apt-get upgrade` updates core system and apps installed.
  - Update one package - `sudo apt-get upgrade [package_name]`.
  
- Install and remove / uninstall
  - `sudo apt-get install [pkg1] [pkg2]` if you know the name of apps.
  - `sudo apt-get remove [package_name]` to uninstall. but kepps config files.
  - `sudo apt-get autoremove` cleans up unwanted pkg.
  - `apt list --installed` see all that's installed.

  - Install a `.deb` file, eg, Chrome. You can use apt or dpkg. apt is manager and takes care of dependecies.
    - `sudo apt install ./name.deb` to install with dependencies, or
    - `sudo dpkg -i /path/to/foo.deb` installs, then `sudo apt-get install -f` fix-broken dependencies.

### First Steps

Do following in a new install

- update and upgrade `sudo apt update && sudo apt upgrade`
- codecs flash and fonts `sudo apt install ubuntu-restricted-extras`
- vlc - `sudo apt install vlc`
- chrome `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb` then `sudo dpkg -i google-chrome-stable_current_amd64.deb`
- more - <https://itsfoss.com/things-to-do-after-installing-ubuntu-20-04/>

Clean up

- Delete apps - `sudo apt purge thunderbird`
- remove sw dependencies `sudo apt autoremove`
- remove partially installed packages `sudo apt autoclean`
- remove cache `sudo apt clean`

Speed up

- disable animations `gsettings set org.gnome.desktop.interface enable-animations false`

Dev Softwares

- sublime `sudo snap install sublime-text --classic`
- vs code `sudo snap install code --classic`


Install Git and Gh:

- install git and essentials `sudo apt-get install build-essential procps curl file git`
- set up git - `git config --global user.name "YOUR NAME"`
- set up git - `git config --global user.email "YOUR EMAIL ADDRESS"`

<!---
- install gh - `sudo snap install gh`
- gh authenticate - `gh auth login`
-->


Install Jupyter notebook, see Python Notes <https://iyadavvaibhav.github.io/python-notes/>


Install nsepa and Citrix Workspace:

- `wget http://ftp.br.debian.org/debian/pool/main/n/network-manager/libnm-util2_1.6.2-3+deb9u2_amd64.deb http://ftp.br.debian.org/debian/pool/main/n/network-manager/libnm-glib4_1.6.2-3+deb9u2_amd64.deb` download debs
- `sudo apt install ./libnm-util2_1.6.2-3+deb9u2_amd64.deb ./libnm-glib4_1.6.2-3+deb9u2_amd64.deb` install the debs downloaded
- Download .deb file from Citrix, amd 64
- `cd ~/Downloads`
- `sudo dpkg -i icaclient_21.4.0.11_amd64.deb`
- `sudo apt-get install -f`


### Others

- `lsblk` lists disk

Check graphics card installed

- check hardware using **lshw** (list hardware) is a small Linux/Unix tool which is used to generate the detailed information of the system's hardware configuration from various files in the /proc directory. E.g. to see graphics driver - `sudo lshw -c video`
- check loaded modules using **lsmod** - it shows which loadable kernel modules are currently loaded. `lsmod | grep radeon`
- The glxinfo program shows information about the OpenGL and GLX implementations running on a given X display. `sudo apt install mesa-utils` and `glxinfo -b`
- Check boot message for graphics card in use `dmesg | grep -i radeon`

Windows on Linux

- `sudo apt-get install playonlinux`
- installs wine too, 32 bit
- to install a program, create a virtual machine and install it.
- to install nfsmw
  - create a machine, 32bit
  - add drivers dcdx9 and vcrun6
  - more on install <https://www.youtube.com/watch?v=lUqU_uf-o9E>
  - more on download <https://www.youtube.com/watch?v=no8-fB4MX00&t=1s>

### Users and Groups

List all users

- `getent passwd`
- `compgen -u`
- `cut -d: -f1 /etc/passwd`

List all groups

- `compgen -g`

Add user to group - `sudo adduser username group`

### OS Setup and Virtualization

USB Installation

- works like a charm,
- make a bootable live usb/cd - <https://linuxhint.com/create_bootable_linux_usb_flash_drive/>
- boot from it and install to another USB - <https://www.fosslinux.com/10212/how-to-install-a-complete-ubuntu-on-a-usb-flash-drive.htm>
- space and drive speed is a issue.
- Clean grub of mac - <https://apple.stackexchange.com/questions/337189/unwanted-grub-on-macos-high-sierra>
- Tripe boot mac - <https://www.youtube.com/watch?v=B0EuYHFeLAA>
- First steps on Ubuntu - <https://www.youtube.com/watch?v=GrI5c9PXS5k>

Virtual box add on:

- `sudo apt update`
- `sudo apt install virtualbox-guest-dkms virtualbox-guest-x11 virtualbox-guest-utils`

### Securing Ubuntu Server

**Firewall**

```sh
# install firewall
$ sudo apt-get install -y ufw

# enable ports required
$ sudo ufw allow ssh
$ sudo ufw allow http
$ sudo ufw allow 443/tcp

# Add to startup
$ sudo ufw --force enable
Firewall is active and enabled on system startup

# Check status
$ sudo ufw status
```

This will install ufw, the Uncomplicated Firewall. Allow external traffic on port 22 (ssh), 80 (http) and 443 (https) only, rest ports are declined.

**Fail2ban**

```sh
# Install fail2ban
$ sudo apt install fail2ban
# keeps logs of login attempts and bans if multiple failed attempts are done```
```

**SSH Only Login**

Restric to ssh login and no root login. Do `nano /etc/ssh/sshd_config` and add

```
PubkeyAuthentication yes
PermitRootLogin no
```

and do

```sh
systemctl restart ssh
```

### User Management

```sh
# Add user
$ adduser john
```

```sh
# make user root user
$ usermod -aG sudo john
```
Here, it adds user `john` to sudo `group`. `-a, --append` is to add group, use with -G. And `-G, --groups GROUP1[,GROUP2,...[,GROUPN]]` is to add groups.

```sh
# switch user
$ su john
```


**Links**

- [Securing Ubuntu Prod - Miguel](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xvii-deployment-on-linux/page/0#:~:text=Securing%20Your%20Server)



## SSH - Secure Shell Protocol

Secure Shell Protocol (SSH) is a **network protocol** that lets a user **access a computer** securely over an unsecured network. It uses **cryptography** to secure communication. It also lets connect using keys and thus avoiding to provide username and password/token on each request.

**View your RSA Keys**

RSA keys are stored in your user-directory

```sh
$ ls ~/.ssh
config  id_rsa  id_rsa.pub  known_hosts
```

if `id_rsa` and `id_rsa.pub` exist then you have rsa keys, else

**Generate Your SSH Keys**

Every machine need to have SSH public and private key to authenticate. To generate key:

```sh
$ ssh-keygen
```

**RSA Public Key**

File `id_rsa.pub` has your public key, it represents you as a user in crytic key. This is secret, but can be givent to servers (vm, github etc.), so that they have your public key and can authenticate you without password. If a public key of a client-machine is in servers authorized keys, then connection from client-machine is authorized **without requiring password** of user.

**Adding your Key to Server**

On **Server** your have logged in with password. Copy your public key from your client machined, then on the server do:

```sh
$ echo <your-copied-public-key> >> ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/authorized_keys
```

This adds your key to server. Then `600` changes permission to `-rw-------` from `-rw-rw-r--` so that it is secure and only current user can read write it. More information can be found here on [Miguel's Linux Deployment Guide](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xvii-deployment-on-linux/page/0)

On **Github.com** - Copy the content of Public RSA Key, then open GitHub, click your profile icon, settings, SSH and GPC Keys, Click on the new ssh key button. Enter any title (usually your user and machine) and key that you copied. This key lets the user and machine be identified without password. More on this [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

Once **added**, the **concept** is that `ssh` command on your terminal will do a cryptographic operation with your private key then this magic is sent to server which uses your copied public key to validate and authorize you. GULP it for now..!

**What is the known_hosts file in SSH?**

The known_hosts file stores the public keys of the server accessed by a user (on client). It stores identity of server so that user accidently does not connect to unknown host and get attacked. They are stored in `/etc/ssh/known_hosts` for system hosts or in `~/.ssh/known_hosts` for each user.

If the host is unknow you see following message:

```sh
$ ssh -p 2222 vaibhav@127.0.0.1
The authenticity of host '[127.0.0.1]:2222 ([127.0.0.1]:2222)' can't be established.
ED25519 key fingerprint is SHA256:UystFEOFRcH1YLdhYgr543JgrecGeZ2jmg02naQQZVw.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[127.0.0.1]:2222' (ED25519) to the list of known hosts.
```

Otherwise it simply lets connect.

**Install SSH Server and Enable on Ubuntu**

Any server needs to run SSH server and enable SSH port on itself so that it can accept SSH connections.

```sh
# install ssh
sudo apt install openssh-server

# view status
sudo systemctl status ssh

# allow ssh port on firewall
sudo ufw allow ssh

# get IP address of ubnutu machine
ip a
```

You need to secure Ubunut server as well to prevent misuse, see "Securing Ubuntu Server" for more details.

Now this machine can accept SSH connections.

### SCP - File Transfer via SSH

To copy a **file**:

```sh
# Syntax
scp <source> <destination>

# To copy a file from B to A while logged into B:
scp /path/to/file username@a:/path/to/destination

# To copy a file from B to A while logged into A:
scp username@b:/path/to/file /path/to/destination
```

If you want to copy a **directory** from machine a to b while logged into a:

```sh
scp -r /path/to/directory user@machine_b_ipaddress:/path/to/destination
```

If you want to copy a **directory** from machine a to b while logged into b:

```sh
scp -r user@machine_a_ipaddress:/path/to/directory /path/to/destination
```

Example:

```sh
scp -r .\abc\ john@192.168.10.10:/tmp/abc
```

## Linux Ways

- `alias vynote="subl ~/path/to/file/notepad.txt"` add to `.bash_profile` to make shortcut

ENVs:

- `source activate [path to env]` activates env
- `source deactivate` deactivates enn

Emac Basic

- Press `ctrl + c + x` to save and exit a file.

Other

- everything global is installed in `/usr/local/bin/`
- use PostMan for http requests to REST routes

- `rmdir` removed empty dir
- `rm -rf` removes non/empty dir and files forcefully
- `rm` removes files not directories.

- **ls** - shows file in dir
  - `ls -l` as a list
  - `ls -h` human readable sizes
  - `ls -r` reverse order
  - `ls -t` sorts by last modified date and time, default is latest at top
  - `ls -a` shows all, includes hidden files
  - Examples
    - `ls -lt | head` shows last 10 modified files.

- **head/tail** - show first or last lines
  - `head -n 2` - `--lines` - shows first 2 lines.
  - Examples
    - `ls -lt | head -n 5` shows only 5 files from prev command.
    - `head -5 notes.txt` - shows top 5 lines from file.

## Shell Configuration

.zprofile is same as .bash_profile is for bash shell. Also same as .zshenv, this file is to set path and env.

.zshrc is to set look and feel.

To make zsh use auto-suggestiona and syntax highlight

```sh
brew install zsh-syntax-highlighting zsh-autosuggestions
```

Then, add to `~/.zshrc`:

```sh
# >>> Syntax Highlight Begins >>>
autoload -Uz colors
autoload -Uz compinit
autoload -Uz down-line-or-beginning-search
autoload -Uz up-line-or-beginning-search
autoload -Uz vcs_info
 
colors
compinit
 
zle -N down-line-or-beginning-search
zle -N up-line-or-beginning-search
 
bindkey "^[[A" up-line-or-beginning-search
bindkey "^[[B" down-line-or-beginning-search
bindkey "${terminfo[kcuu1]}" up-line-or-beginning-search
bindkey "${terminfo[kcud1]}" down-line-or-beginning-search
bindkey "${terminfo[kcbt]}" reverse-menu-complete
bindkey "${terminfo[kdch1]}" delete-char
 
precmd_functions+=(vcs_info)
vcs_info_format="%{$fg_bold[cyan]%}(%{$fg_bold[red]%}%b%{$fg_bold[cyan]%}) "
 
zstyle ':completion:*' menu select
zstyle ':vcs_info:*' enable git
zstyle ':vcs_info:*' formats "$vcs_info_format"
zstyle ':vcs_info:*' actionformats "$vcs_info_format"
 
export PROMPT='%(?:%{$fg_bold[green]%}:%{$fg_bold[red]%})➜ %{$fg_bold[cyan]%}%c %{$vcs_info_msg_0_%}%{$reset_color%}'
setopt PROMPT_SUBST
 
export HISTFILE=~/.zsh_history
export HISTSIZE=10000
export SAVEHIST=1000000
setopt SHARE_HISTORY
setopt HIST_FIND_NO_DUPS
 
setopt AUTOCD
 
source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# <<< Syntax Highlight Ends <<<
```


## youtube-dl

- `youtube-dl --extract-audio --audio-format mp3 -o "%(title)s.%(ext)s" http://www.youtube.com/watch?v=fdf4542t5g` -o is --output of filename.

## Termux - Linux on Android

- `pkg` is **similar** to `apt`, it is another package manager in termux, it is even higher wrapper on apt. You can use both.

- **Installing termux**
  - Termux is no more updated on play store, so you can use old or download latest from [F-droid.org](https://f-droid.org/en/packages/com.termux/)
  - Once installed do following on phone

    ```shell
    termux-setup-storage
    termux-change-repo # (I selected Albatros)
    pkg update && pkg upgrade
    exit
    ```

- **Enabling SSH**
  - SSH lets you use phone linux from another laptop. Do this on phone:

    ```shell
    pkg update && pkg upgrade
    pkg install openssh -y # ssh server is now installed
    passwd # set a password to login from another device
    sshd  # It's time to run the server
    ifconfig # to check the IP of phone, ensure wifi is enabled
    ```

  - Now open cmd or terminal on a machine connected to same wifi and do `ssh 192.168.1.17 -p 8022`, where IP is address of phone.

- **Termux - working with packages**
  - Search:  `pkg search <query>`
  - Install: `pkg install <package>`
  - Upgrade: `pkg upgrade`

- **Termux - subscribing to additional repositories**
  - Root:    `pkg install root-repo`
  - X11:     `pkg install x11-repo`

- **Setting Python and Git**

  ```shell
  pkg install python -y
  pkg install git -y
  ```

- **Crontab on Termux**
  - it is used to schedule jobs in linux and make them run at certain intervals.

    ```sh
    pkg install cronie termux-services
    sv-enable crond

    # `service-daemon start` or restart terminal 

    ~/code$ crontab -l
    no crontab for u0_a234

    crontab -e 

    0 * * * * cd /data/data/com.termux/files/home/code && /data/data/com.termux/files/usr/bin/python tbd_logger.py

    ```

  - Example run logs
    - `time 2023-04-22 19:39 - battery 85% - cron at 1m`
    - `time 2023-04-23 12:22 - battery 68% - cron switched to 1hr`


- **Links**
  - [Termux - Docs](https://termux.dev/docs)
  - [Termux - Installing](https://github.com/termux/termux-app#installation)
  - [Termux - Backing up](https://wiki.termux.com/wiki/Backing_up_Termux)
  - [Gist - How to install termux](https://gist.github.com/raveenb/ab3217798c827be889b83b584d70b08b)
  - [Youtube - installing linux on android](https://www.youtube.com/watch?v=B1Zex_KZCfY)
    [Medium - Installing Linux](https://medium.com/junior-dev/how-to-re-purpose-your-old-android-phone-by-running-linux-on-it-1310df46b3fe)
  - [Use Ubuntu in Termux](https://github.com/MFDGaming/ubuntu-in-termux)


## Alpine Linux

Installation detailed steps can be found in this [Alpine Linux Virtual box Guide](https://linuxhint.com/install-alpine-linux-virtualbox/)

## Mobile Linux

Everything related to iOS and Android Linux.

Install Termux App on Android.

```shell
termux-setup-storage
termux-change-repo
pkg update

pkg install git
git --version

pkg install python

pkg install openssl

pip install --upgrade youtube-dl

youtube-dl -i PLyAyDdlMr3GOHFBt0IzgvED-n3uhwyrhd
```

Install on `a-Shell` iOS App

```shell
cd ~/code
wget -qO- http://dl-cdn.alpinelinux.org/alpine/v3.12/main/x86/apk-tools-static-2.10.6-r0.apk | tar -xz sbin/apk.static && ./sbin/apk.static add apk-tools && rm sbin/apk.static
apk add python3
apk add py3-pip
pip install youtube-dl
```

## Links

- [terminal cheat book - mac](https://github.com/0nn0/terminal-mac-cheatsheet#english-version)
- [Setting cronjob on mac](https://www.jcchouinard.com/python-automation-with-cron-on-mac/)
- [vim Getting Started](https://opensource.com/article/19/3/getting-started-vim)
- cheat book - <https://github.com/0nn0/terminal-mac-cheatsheet#english-version>
