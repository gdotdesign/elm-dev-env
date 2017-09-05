var renderElm = require('../render/elm')
var uglifyJS = require('uglify-js')
var babel = require('babel-core')
var path = require('path')
var fs = require('fs')

module.exports = function (file, debug, config, shouldFail) {
  var destination = path.resolve(`dist/${file}.js`)
  var source = path.resolve(`source/${file}.elm`)

  return function (callback) {
    console.log(`Building JavaScript: ${file}...`)

    renderElm(source, debug, config, shouldFail)(function (err, contents) {
      if (err) {
        return callback(err, null)
      }

      var trasnformed =
        babel
          .transform(contents, { presets: [['es2015', { modules: false }]] })
          .code

      var minified = uglifyJS.minify(trasnformed)

      fs.writeFileSync(destination, minified.code)

      callback(null, null)
    })
  }
}
