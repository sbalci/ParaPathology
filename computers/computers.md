# Computers

## set PYTHONPATH for npm

```text
npm config set python /usr/bin/python3
```

[https://www.npmjs.com/package/node-gyp](https://www.npmjs.com/package/node-gyp)

## [Deploying a Shiny app as a desktop application with Electron](https://www.travishinkelman.com/post/deploy-shiny-electron/)

* Read this [post](https://www.travishinkelman.com/post/deploy-shiny-electron/)
* Clone this repository [R Shiny Electron](https://github.com/dirkschumacher/r-shiny-electron)$RSE$ template
* install Electron

```text
npm install -g electron
```

* install Electron Forge

```text
npm install -g electron-forge
```

* open folder with terminal

```text
cd r-shiny-electron-master
```

* npm install

```text
npm install
```

* install local R

update R version in `get-r-mac.sh` file

```text
./get-r-mac.sh
```

* install packages

```text
Rscript add-cran-binary-pkgs.R
```

* run app

```text
npm start
```

* make package

```text
electron-forge package
```

* make portable app

```text
electron-forge make
```

## [Adding an existing project to GitHub using the command line](https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/)

[https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/](https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/)

```text
git init
```

```text
git add .
```

```text
git commit -m "initial commit"
```

```text
git remote add origin <remote repository URL>
```

```text
git remote -v
```

```text
git push -f origin master
```

## md2googleslides -- Markdown to Google Slides

[https://github.com/gsuitedevs/md2googleslides](https://github.com/gsuitedevs/md2googleslides)

```text
npm install -g md2gslides
```

```text
md2gslides slides.md
```

## slidex

Convert PowerPoint Slides to xaringan $remark.js$ Slides

[https://github.com/datalorax/slidex](https://github.com/datalorax/slidex)

## Change Key - Mouse Functions

* [Introduction to AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html)
* [Automator User Guide](https://support.apple.com/guide/automator/welcome/mac)
* [keyboardmaestro](http://www.keyboardmaestro.com/main/)
* [Hammerspoon](http://www.hammerspoon.org/)
* [Karabiner](https://karabiner-elements.pqrs.org/)
* [phoenix](https://github.com/kasper/phoenix)
* [AutoHotkey](https://github.com/Lexikos/AutoHotkey_L)

## Virtual Machines

* [Azure Virtual Machines](https://azure.microsoft.com/en-gb/free/virtual-machines/?cdn=disable)
* [Compute Engine](https://cloud.google.com/compute)

## Regular Expressions

[https://regex101.com/](https://regex101.com/){target="_blank"}

