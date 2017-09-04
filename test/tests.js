/* eslint-env mocha */

var spawnSync = require('child_process').spawnSync
var spawn = require('child_process').spawn
var expect = require('chai').expect
var request = require('request')
var fs = require('fs')

var startServer = function (done) {
  var server =
    spawn(
      'node',
      ['../bin/index.js', 'server'],
      { cwd: 'test-app' }
    )

  server.stdout.on('data', function (buffer) {
    if (buffer.toString() === 'Listening on localhost:8001\n') {
      done()
    }
  })
  return server
}

describe('Tests', function () {
  // Timeout is 5 minutes
  this.timeout(300000)

  before(function () {
    spawnSync('rm', ['-rf', 'test-app'])
  })

  after(function () {
    spawnSync('rm', ['-rf', 'test-app'])
  })

  describe('Scaffold', function () {
    it('copies files to the folder', function () {
      var result = spawnSync('node', [ 'bin/index.js', 'init', 'test-app' ])

      expect(result.status)
        .to.equal(0)

      expect(result.stderr.toString())
        .to.equal('')

      expect(result.stdout.toString())
        .to.equal('Scaffolding new project into: test-app\n')
    })
  })

  context('With scaffold', function () {
    before(function () {
      spawnSync('node', [ 'bin/index.js', 'init', 'test-app' ])
    })

    context('Without install', function () {
      before(function (done) {
        this.server = startServer(done)
      })

      after(function () {
        this.server.kill('SIGKILL')
      })

      it('renders error', function (done) {
        request
          .get('http://localhost:8001/Main.js', function (error, response) {
            expect(error)
              .to.equal(null)

            expect(response.statusCode)
              .to.equal(200)

            expect(response.body)
              .to.contain('.elm-error {')

            done()
          })
      })
    })

    context('With installed', function () {
      before(function () {
        this.result =
          spawnSync('node',
                    ['../bin/index.js', 'install'],
                    { cwd: 'test-app' })
      })

      describe('Install', function () {
        it('successfully installs dependencies', function () {
          expect(this.result.status)
            .to.equal(0)

          expect(this.result.stderr.toString())
            .to.equal('')

          expect(this.result.stdout.toString())
            .to.contain('Packages configured successfully!')

          expect(fs.existsSync('test-app/elm-stuff'))
            .to.equal(true)
        })
      })


      describe('Build', function () {
        it('build final files', function () {
          var result =
            spawnSync('node',
                      ['../bin/index.js', 'build'],
                      { cwd: 'test-app' })

          expect(result.status)
            .to.equal(0)

          expect(result.stderr.toString())
            .to.equal('')

          expect(result.stdout.toString())
            .to.contain('Build succeeded!')

          expect(fs.existsSync('test-app/dist'))
            .to.equal(true)
        })
      })

      describe('Docs', function () {
        it('generates elm documentation', function () {
          var result =
            spawnSync('node',
                      ['../bin/index.js', 'docs'],
                      { cwd: 'test-app' })

          expect(result.status)
            .to.equal(0)

          expect(result.stderr.toString())
            .to.equal('')

          expect(result.stdout.toString())
            .to.contain('Success! Compiled 1 module.')
        })
      })

      describe('Serve', function () {
        before(function (done) {
          this.server = startServer(done)
        })

        after(function () {
          this.server.kill('SIGKILL')
        })

        it('serves elm files', function (done) {
          request
            .get('http://localhost:8001/Main.js', function (error, response) {
              expect(error)
                .to.equal(null)

              expect(response.statusCode)
                .to.equal(200)

              expect(response.body)
                .to.contain('_user$project$Main$main')

              done()
            })
        })

        it('serves css files', function (done) {
          request
            .get('http://localhost:8001/main.css', function (error, response) {
              expect(error)
                .to.equal(null)

              expect(response.statusCode)
                .to.equal(200)

              expect(response.body)
                .to.contain('body {')

              expect(response.body)
                .to.contain('-ms-flexbox')

              done()
            })
        })

        it('serves static files', function (done) {
          request
            .get('http://localhost:8001/', function (error, response) {
              expect(error)
                .to.equal(null)

              expect(response.statusCode)
                .to.equal(200)

              expect(response.body)
                .to.contain('elm-dev-env scaffolded app')

              done()
            })
        })
      })
    })
  })
})
