var which = require('npm-which')(__dirname)
var spawn = require('child_process').spawn

module.exports = function () {
  spawn(which.sync('elm-install'), { stdio: 'inherit' })
}
