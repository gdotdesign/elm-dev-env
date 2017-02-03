var which = require('npm-which')(__dirname)
var spawn = require('child_process').spawnSync

spawn('rm', ['-rf', 'test-app'])
spawn('node', [ 'bin/index.js', 'init', 'test-app' ], { stdio: 'inherit' })
spawn('node', [ '../bin/index.js', 'install'], { stdio: 'inherit', cwd: 'test-app' })
spawn('node', [ '../bin/index.js', 'spec'], { stdio: 'inherit', cwd: 'test-app' })
spawn('node', [ '../bin/index.js', 'docs'], { stdio: 'inherit', cwd: 'test-app' })
spawn('node', [ '../bin/index.js', 'build'], { stdio: 'inherit', cwd: 'test-app' })
spawn('rm', ['-rf', 'test-app'])
