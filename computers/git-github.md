# Git GitHub

* Publish blog posts from R + knitr to WordPress

[https://yihui.name/knitr/demo/wordpress/](https://yihui.name/knitr/demo/wordpress/)

* A minimal example of building and deploying a blogdown-based website via Travis CI [https://travis-blogdown.yihui.name](https://travis-blogdown.yihui.name)

[https://github.com/yihui/travis-blogdown](https://github.com/yihui/travis-blogdown)

* add this to book.json

```text
{
"plugins": ["youtube", "youtubex", "component", "autosize-iframe"]
    }
```

* Gitbook plugin component

[https://plugins.gitbook.com/plugin/component](https://plugins.gitbook.com/plugin/component)

```text
{
    "plugins": ["component"]
}

{% component %}
{% endcomponent %}
```

* YouTube 

```text
{% youtube %}CR-7blJkNaI{% endyoutube %}
```

* add this to book.json

```text
{
"plugins": ["youtube", "youtubex", "component", "autosize-iframe"]
    }
```

* Gitbook plugin component

[https://plugins.gitbook.com/plugin/component](https://plugins.gitbook.com/plugin/component)

```text
{
    "plugins": ["component"]
}

{% component %}
{% endcomponent %}
```

* YouTube 

```text
{% youtube %}CR-7blJkNaI{% endyoutube %}
```

## GitBook Plugins

* add this to book.json

```text
{
"plugins": ["youtube", "youtubex", "component", "autosize-iframe"]
    }
```

* Gitbook plugin component

[https://plugins.gitbook.com/plugin/component](https://plugins.gitbook.com/plugin/component)

```text
{
    "plugins": ["component"]
}

{% component %}
{% endcomponent %}
```

* YouTube 

```text
{% youtube %}CR-7blJkNaI{% endyoutube %}
```



### [Adding an existing project to GitHub using the command line](https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/)

https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/

> - Create a new repository on GitHub. You can also add a gitignore file, a readme and a > licence if you want
> 
> - Open Git Bash
> 
> - Change the current working directory to your local project.
> 
> - Initialize the local directory as a Git repository.
> 
> ```text
> git init
> ```
> 
> - Add the files in your new local repository. This stages them for the first commit.
> 
> ```text
> git add .
> ```
> 
> - Commit the files that you’ve staged in your local repository.
> 
> ```text
> git commit -m "initial commit"
> ```
> 
> - Copy the https url of your newly created repo
> 
> - In the Command prompt, add the URL for the remote repository where your local repository > will be pushed.
> 
> ```text
> git remote add origin 'remote_repository_URL'
> ```
> 
> ```text
> git remote -v
> ```
> 
> - Push the changes in your local repository to GitHub.
> 
> ```text
> git push -f origin master
> ```
> 


