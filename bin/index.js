#! /usr/bin/env node

var package_json = require('../package.json')
var program = require('commander')
var elmDev = require('./elm-dev')

var options = function() {
  return {
    env: program.env
  }
}

program
  .version(package_json.version)
  .option('-e, --env [env]', 'environment', 'development')

program
  .command('install')
  .description('Installs Elm dependencies')
  .action(function(env, opts) {
    elmDev.install()
  })

program
  .command('spec')
  .description('Runs specs')
  .action(function(env, opts) {
    elmDev.spec()
  })

program
  .command('docs')
  .description('Generates Elm documentation')
  .action(function(env, opts) {
    elmDev.docs()
  })

program
  .command('help')
  .description('Output usage information')
  .action(function(env, opts) {
    program.outputHelp()
  })

program
  .command('new <dir>')
  .alias('init')
  .description('Scaffolds a new Elm-UI project')
  .action(function(dir) {
    elmDev.scaffold(dir)
  })

program
  .command('server')
  .option('-p, --prefix [prefix]', 'path prefix')
  .option('-d, --debug', "use Elm's debugger")
  .alias('start')
  .description('Starts development server')
  .action(function(env, opts) {
    elmDev.serve({
      env: program.env,
      prefix: env.prefix || '',
      debug: env.debug
    })
  })

program
  .command('build')
  .option('-m, --main [file]', 'main file to compile')
  .description('Builds final files')
  .action(function(env, opts) {
    elmDev.build({
      env: program.env,
      main: env.main
    })
  })

program.parse(process.argv)
