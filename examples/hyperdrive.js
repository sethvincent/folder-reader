var path = require('path')
var mirror = require('mirror-folder')
var drive = require('hyperdrive')('./tmp/example-drive')

var reader = require('../index')

var dir = path.join(__dirname, 'example-files')
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
    console.log('contents', contents)
  })
})
