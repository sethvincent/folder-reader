var path = require('path')
var test = require('tape')
var match = require('anymatch')
var reader = require('../index')

var dir = path.join(__dirname, 'fixtures')

test('read a directory', function (t) {
  var stream = reader(dir)
  var contents = {}

  stream.on('data', function (data) {
    if (data.type === 'file') contents[data.relname] = data.file
  })

  stream.on('end', function () {
    var keys = Object.keys(contents)
    t.equal(keys.length, 7)
    t.end()
  })
})

test('multiple directories', function (t) {
  var dirs = [
    path.join(dir, 'api'),
    path.join(dir, 'modules'),
    path.join(dir, 'welcome')
  ]

  var stream = reader(dirs)
  var contents = {}

  stream.on('data', function (data) {
    if (data.type === 'file') contents[data.relname] = data.file
  })

  stream.on('end', function () {
    var keys = Object.keys(contents)
    t.equal(keys.length, 7)
    t.end()
  })
})

test('ignore files', function (t) {
  function ignore (file, data) {
    // ignore everything except js files
    return !(match(['**/*.js'], file))
  }

  var stream = reader(dir, { ignore: ignore })
  var contents = {}

  stream.on('data', function (data) {
    if (data.type === 'file') {
      contents[data.relname] = data.file
    }
  })

  stream.on('end', function () {
    var keys = Object.keys(contents)
    t.equal(keys.length, 1)
    t.end()
  })
})

test('map results', function (t) {
  function map (data, cb) {
    data.file = 'hi'
    return data
  }

  var stream = reader(dir, { map: map })
  var contents = {}

  stream.on('data', function (data) {
    if (data.type === 'file') {
      contents[data.relname] = data.file
    }
  })

  stream.on('end', function () {
    Object.keys(contents).forEach(function (key) {
      var data = contents[key]
      t.equal(data, 'hi')
    })

    t.end()
  })
})

test('alternate fs implementation', function (t) {
  var mirror = require('mirror-folder')
  var drive = require('hyperdrive')('./tmp/drive')

  var progress = mirror(dir, { name: dir, fs: drive })

  progress.on('end', function () {
    var dirs = [
      path.join(dir, 'api'),
      path.join(dir, 'modules'),
      path.join(dir, 'welcome')
    ]

    var stream = reader(dirs, { fs: drive })
    var contents = {}

    stream.on('data', function (data) {
      if (data.type === 'file') contents[data.relname] = data.file
    })

    stream.on('end', function () {
      var keys = Object.keys(contents)
      t.equal(keys.length, 7)
      t.end()
    })
  })
})
