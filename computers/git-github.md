# Git GitHub

## Git GitHub

* [git - the simple guide](https://rogerdudler.github.io/git-guide/)
* Publish blog posts from R + knitr to WordPress

[https://yihui.name/knitr/demo/wordpress/](https://yihui.name/knitr/demo/wordpress/)

* A minimal example of building and deploying a blogdown-based website via Travis CI [https://travis-blogdown.yihui.name](https://travis-blogdown.yihui.name)

[https://github.com/yihui/travis-blogdown](https://github.com/yihui/travis-blogdown)

* add this to book.json

```
{
"plugins": ["youtube", "youtubex", "component", "autosize-iframe"]
    }
```

* Gitbook plugin component

[https://plugins.gitbook.com/plugin/component](https://plugins.gitbook.com/plugin/component)

```
{
    "plugins": ["component"]
}

<div data-gb-custom-block data-tag="component">

</div>
```

* YouTube

```
<div data-gb-custom-block data-tag="youtube">CR-7blJkNaI</div>
```

* add this to book.json

```
{
"plugins": ["youtube", "youtubex", "component", "autosize-iframe"]
    }
```

* Gitbook plugin component

[https://plugins.gitbook.com/plugin/component](https://plugins.gitbook.com/plugin/component)

```
{
    "plugins": ["component"]
}

<div data-gb-custom-block data-tag="component">

</div>
```

* YouTube

```
<div data-gb-custom-block data-tag="youtube">CR-7blJkNaI</div>
```

### GitBook Plugins

* add this to book.json

```
{
"plugins": ["youtube", "youtubex", "component", "autosize-iframe"]
    }
```

* Gitbook plugin component

[https://plugins.gitbook.com/plugin/component](https://plugins.gitbook.com/plugin/component)

```
{
    "plugins": ["component"]
}

<div data-gb-custom-block data-tag="component">

</div>
```

* YouTube

```
<div data-gb-custom-block data-tag="youtube">CR-7blJkNaI</div>
```

#### [Adding an existing project to GitHub using the command line](https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/)

[https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/](https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/)

> * Create a new repository on GitHub. You can also add a gitignore file, a readme and a > licence if you want
> * Open Git Bash
> * Change the current working directory to your local project.
> * Initialize the local directory as a Git repository.
>
> ```
> git init
> ```
>
> * Add the files in your new local repository. This stages them for the first commit.
>
> ```
> git add .
> ```
>
> * Commit the files that you’ve staged in your local repository.
>
> ```
> git commit -m "initial commit"
> ```
>
> * Copy the https url of your newly created repo
> * In the Command prompt, add the URL for the remote repository where your local repository > will be pushed.
>
> ```
> git remote add origin 'remote_repository_URL'
> ```
>
> ```
> git remote -v
> ```
>
> * Push the changes in your local repository to GitHub.
>
> ```
> git push -f origin master
> ```

## clone a branch

[https://github.com/jamovi/jamovi/tree/current-dev](https://github.com/jamovi/jamovi/tree/current-dev)

```
git clone --single-branch --branch current-dev https://github.com/jamovi/jamovi.git
```

## Keeping a fork up to date

[https://gist.github.com/sbalci/9959350f59eda7ca24bd77fe2d21323f](https://gist.github.com/sbalci/9959350f59eda7ca24bd77fe2d21323f)

1. Clone your fork:

```
git clone git@github.com:YOUR-USERNAME/YOUR-FORKED-REPO.git
```

1. Add remote from original repository in your forked repository:

```
cd into/cloned/fork-repo
git remote add upstream git://github.com/ORIGINAL-DEV-USERNAME/REPO-YOU-FORKED-FROM.git
git fetch upstream
```

1. Updating your fork from original repo to keep up with their changes:

```
git pull upstream master
```

#### [git - how to delete all commit history in github? - Stack Overflow](https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github)

{% embed url="https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github" %}

Deleting the `.git` folder may cause problems in your git repository. If you want to delete all your commit history but keep the code in its current state, it is very safe to do it as in the following:

1.  Checkout

    `git checkout --orphan latest_branch`
2.  Add all the files

    `git add -A`
3.  Commit the changes

    `git commit -am "commit message"`
4.  Delete the branch

    `git branch -D main`
5.  Rename the current branch to main

    `git branch -m main`
6.  Finally, force update your repository

    `git push -f origin main`
