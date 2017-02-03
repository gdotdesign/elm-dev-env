var renderElm = require('../render/elm')
var uglifyJS = require('uglify-js')
var path = require('path')
var fs = require('fs')

module.exports = function(file, debug, config, shouldFail) {
  var destination = path.resolve(`dist/${file}.js`)
  var source = path.resolve(`source/${file}.elm`)

  return function(callback) {
    console.log(`Building JavaScript: ${file}...`)

    renderElm(source, debug, config, shouldFail)(function(err, contents) {
      if (err) {
        return callback(err, null)
      }

      minified = uglifyJS.minify(contents, {
        fromString: true
      })

      fs.writeFileSync(destination, minified.code)

      callback(null, null)
    })
  }
}
