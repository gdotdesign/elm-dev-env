var renderError = require('./error').renderHTMLError
var which = require('npm-which')(__dirname)
var spawn = require('child_process').spawn
var temp = require('temp').track()
var babel = require("babel-core")
var fs = require('fs')

// Find the elm-make executable
var elmExecutable = which.sync('elm-make')

// Renders an .elm file.
var render = function (file, debug, callback) {
  var filename = temp.openSync({ suffix: '.js' }).path

  var args =
    [file, '--output', filename, '--yes', '--warn', '--report=json']

  var result = ''
  var command

  if (debug) {
    args.push('--debug')
  }

  command = spawn(elmExecutable, args)

  command.stdout.on('data', (data) => {
    result += data
  })

  command.stderr.on('data', (data) => {
    result += data
  })

  command.on('close', function () {
    if (result.match('Successfully generated')) {
      callback(null, '', filename)
    } else {
      callback(result, '', filename)
    }
  })
}

module.exports = function (file, debug, config, shouldFail) {
  return function (callback) {
    render(file, debug, function (error, result, filename) {
      if (error) {
        var prettyError =
          renderError('You have errors in of your Elm file(s):', error)

        if (shouldFail) {
          callback(error, null)
        } else {
          callback(null, prettyError)
        }
      } else {
        var contents = [
          `window.ENV = ${JSON.stringify(config)};`,
          fs.readFileSync(filename, 'utf-8')
            // NOTICE: This is a fix for in elm-lang/core scheduler
            .replace('setTimeout(work, 0);', 'requestAnimationFrame(work);')
        ].join('\n')

        callback(null, babel.transform(contents, { presets: ['es2015'] }).code)
      }
    })
  }
}
