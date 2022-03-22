---
date: 2022-02-17 20:00:00 +0100
layout: post
tags: [bash, ssh]
title: When bash_aliases stop working
---

The other day I noticed my bash aliases on one of my servers weren't working anymore even though I hadn't touched them for months. No helpful colored output, no custom `ll` alias, nothing. Time to investigate!

## .bash_aliases

Bash aliases allow you to make your own custom commands for a SSH user by editing a file called `.bash_aliases` in the home directory of your SSH user. It can be very helpful when you often use commands with the same flags. The `ll` command is a popular pick for showing all files including hidden files in a folder with the long listing format along with human readable filesizes.

```bash
alias ll="ls -lah"
```

By using the full `ls -lah` command I could see the `.bash_aliases` file was still there and untouched, so the problem exists somewhere else. When editing your bash aliases you need to use the `source` command to reload your bash aliases like so.

```bash
source .bash_aliases
```

And my bash aliases are working again. This tells me the problem occurs during the SSH login and prohibits the bash aliases from initializing. So now we need to look into the login process of the SSH user.

## .bashrc

The `.bash_aliases` file is actually an addition to the `.bashrc` file to allow you to keep your custom additions organized. It literally uses the former mentioned `source` command if a `.bash_aliases` file exists. The file also contains the `force_color_prompt` setting for a colored prompt which wasn't working anymore either. This means something prohibits the `.bashrc` file from initializing. Since I hadn't made big changes to this server, I was starting to think this was going to be a small gotcha moment.

## Other bash files

We've already dealt with two files related to bash in the home directory. Let's see what other bash files can be found with the following command.

```bash
ls -lah | grep bash

-rw-r--r--  1 nick nick  802 Feb 17 14:13 .bash_aliases
-rw-------  1 nick nick  10K Feb 17 14:07 .bash_history
-rw-r--r--  1 nick nick  220 Apr 10  2010 .bash_logout
-rw-r--r--  1 nick nick   44 Feb 16 15:42 .bash_profile
-rw-r--r--  1 nick nick 3.2K Sep 30 19:52 .bashrc
```

The history file keeps tabs of the 500 last commands used by this SSH user. The logout file clears the screen to increase privacy when leaving the console. In my case the profile file holds the path to a PHP 5.6 executable for a legacy project (I know, working on phasing it out). Nothing really odd about these files, let's see what odd files I can spot in the home directory.

## .profile

There is actually one file that peaks my interest, the `.profile` file. When you open it with any editor, it becomes clear this file is also related to bash. This is the file that loads `.bashrc` during login. The second comment in the file explains the actual cause of the problem.

```
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
```

And then it occured to me the day before I had rebuild the PHP 5.6 instance as I was working on phasing parts out of that legacy project. Rebuilding it -for some reason- created a new `.bash_profile` file which prevents `.bash_rc` and `.bash_aliases` from initializing during login. The fix was as easy as deleting the file since the PHP 5.6 path wasn't needed for login shells. That'll teach me for running a PHP 5.6 instance in 2022.
