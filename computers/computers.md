# Computers


### set PYTHONPATH for npm 


```
npm config set python /usr/bin/python3
```

https://www.npmjs.com/package/node-gyp


---


### [Deploying a Shiny app as a desktop application with Electron](https://www.travishinkelman.com/post/deploy-shiny-electron/)

- Read this [post](https://www.travishinkelman.com/post/deploy-shiny-electron/)

- Clone this repository [R Shiny Electron (RSE) template](https://github.com/dirkschumacher/r-shiny-electron)

- install Electron

```
npm install -g electron
```

- install Electron Forge

```
npm install -g electron-forge
```

- open folder with terminal

```
cd r-shiny-electron-master
```

- npm install

```
npm install
```

- install local R

update R version in `get-r-mac.sh` file

```
./get-r-mac.sh
```

- install packages

```
Rscript add-cran-binary-pkgs.R
```

- run app

```
npm start
```

- make package

```
electron-forge package
```

- make portable app

```
electron-forge make
```









