# elm-dev-env
[![Build Status](https://travis-ci.org/gdotdesign/elm-dev-env.svg?branch=master)](https://travis-ci.org/gdotdesign/elm-dev-env)
[![npm version](https://badge.fury.io/js/elm-dev-env.svg)](https://badge.fury.io/js/elm-dev-env)

Opinionated Elm development environment.

## Quickstart

```sh
npm install elm-dev-env -g
elm-dev init my-app
cd my-app
elm-dev install
elm-dev start
```

Create a production build with `elm-app build`

## Documentation

### Installation
Node >=4 is required only as a build dependency.

`npm install elm-dev-env -g`

### Cli
Installing **elm-dev-env** adds the `elm-dev` command:

```
Usage: elm-dev [options] [command]


Commands:

  install                  Installs Elm dependencies
  spec                     Runs specs
  docs                     Generates Elm documentation
  help                     Output usage information
  new|init <dir>           Scaffolds a new Elm-UI project
  server|start [options]   Starts development server
  build [options]          Builds final files

Options:

  -h, --help       output usage information
  -V, --version    output the version number
  -e, --env [env]  environment
```

### Creating an app
To create a new app, run:

```sh
elm-dev init my-app
cd my-app
elm-dev install
```

This will create a directory structure like this:

```
my-app
├── config                  -- Configuration files
│   └── development.json
├── public                  -- Static files
│   └── index.html
├── source                  -- Elm source files
│   ├── Counter.elm
│   └── Main.elm
├── spec                    -- Specs for elm-spec
│   └── MainSpec.elm
├── stylesheets             -- Sass stylesheets
│   └── main.scss
├── .gitignore
└── elm-package.json
```

Also it will install Elm package dependencies with
[`elm-github-install`](https://github.com/gdotdesign/elm-github-install).

### Development server
The development server can be started with `elm-dev start` or `elm-dev server`:

```
$ elm-dev start

Listening on localhost:8001
[BS] Proxying: http://localhost:8001
[BS] Access URLs:
 --------------------------------------
       Local: http://localhost:8002
    External: http://192.168.2.105:8002
 --------------------------------------
          UI: http://localhost:8003
 UI External: http://192.168.2.105:8003
 --------------------------------------
```

This will start three servers:

* http://localhost:8001 - The application server
* http://localhost:8002 - Proxied application server that has live reloading
* http://localhost:8003 - Settings for the live reload server

### Running specs
Specs can be run with the `elm-dev spec` command, which is uses
[`elm-spec`](https://github.com/gdotdesign/elm-spec) to test the components
and your app.

### Building production files
The final minified files can be generated with `elm-ui build`, this will:

* compile and minify one main file (`Main.elm` by default) to **dist/Main.js**
* autoprefix, compile and minify the main stylesheet file to **dist/main.css**
* copy all static files from **public** to **dist**

### Generating documentation
Elm documentation can be generated with the `elm-dev docs` command, the
documentation file will be `documentation.json`.

## What is included?
The following libraries are used:
* [elm-github-install](https://github.com/gdotdesign/elm-github-install) to install Elm packages
* [elm-spec](https://github.com/gdotdesign/elm-spec) to test components and the app
* [autoprefixed](https://www.npmjs.com/package/autoprefixer) to add browser prefixes to CSS
* [browser-sync](https://browsersync.io) to add live reloading functionality
* [node-sass](https://www.npmjs.com/package/node-sass) to support Sass stylesheets
