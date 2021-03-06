#! /usr/bin/env node

var packageJson = require('../package.json')
var program = require('commander')
var elmDev = require('./elm-dev')

program
  .version(packageJson.version)
  .option('-e, --env [env]', 'environment', 'development')

program
  .command('install')
  .description('Installs Elm dependencies')
  .action(function (env, opts) {
    elmDev.install()
  })

program
  .command('docs')
  .description('Generates Elm documentation')
  .action(function (env, opts) {
    elmDev.docs()
  })

program
  .command('help')
  .description('Output usage information')
  .action(function (env, opts) {
    program.outputHelp()
  })

program
  .command('new <dir>')
  .alias('init')
  .description('Scaffolds a new Elm-UI project')
  .action(function (dir) {
    elmDev.scaffold(dir)
  })

program
  .command('server')
  .option('-f, --prefix [prefix]', 'path prefix')
  .option('-p, --port [port]', 'port')
  .option('-d, --debug', "use Elm's debugger")
  .alias('start')
  .description('Starts development server')
  .action(function (env, opts) {
    elmDev.serve({
      port: parseInt(env.port) || 8001,
      prefix: env.prefix || '',
      env: program.env,
      debug: env.debug
    })
  })

program
  .command('build')
  .option('-m, --main [file]', 'main file to compile')
  .description('Builds final files')
  .action(function (env, opts) {
    elmDev.build({
      env: program.env,
      main: env.main
    })
  })

program.parse(process.argv)
