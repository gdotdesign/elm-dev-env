var which = require('npm-which')(__dirname)
var spawn = require('child_process').spawn

module.exports = function () {
  var dashDashIndex = process.argv.indexOf('--')
  var additionalFlags = process.argv.slice(3)

  if (dashDashIndex > 0) {
    additionalFlags = process.argv.slice(dashDashIndex + 1)
  }

  spawn(which.sync('elm-spec'), additionalFlags, { stdio: 'inherit' })
}
