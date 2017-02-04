var renderCSS = require('../render/css')
var CleanCSS = require('clean-css')
var path = require('path')
var fs = require('fs')

module.exports = function (shouldFail) {
  var source = path.resolve('stylesheets/main.scss')
  var destination = path.resolve('dist/main.css')

  return function (callback) {
    console.log('Building CSS...')

    renderCSS(source, shouldFail)(function (err, contents) {
      if (err) {
        return callback(err, null)
      }

      var minified = new CleanCSS().minify(contents)

      fs.writeFileSync(destination, minified.styles)

      callback(null, null)
    })
  }
}
