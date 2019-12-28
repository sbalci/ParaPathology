# Computers

## set PYTHONPATH for npm

```text
npm config set python /usr/bin/python3
```

[https://www.npmjs.com/package/node-gyp](https://www.npmjs.com/package/node-gyp)

## [Deploying a Shiny app as a desktop application with Electron](https://www.travishinkelman.com/post/deploy-shiny-electron/)

* Read this [post](https://www.travishinkelman.com/post/deploy-shiny-electron/)
* Clone this repository [R Shiny Electron \(RSE\) template](https://github.com/dirkschumacher/r-shiny-electron)
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

https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/



```bash
git init
```


```bash
git add .
```


```bash
git commit -m "initial commit"
```


```bash
git remote add origin <remote repository URL>
```

```bash
git remote -v
```

```bash
git push -f origin master
```



