var path = require('path')
var reader = require('../index')

var dir = path.join(__dirname, 'example-files')
var contents = {}

var stream = reader(dir)

stream.on('data', function (data) {
  if (data.type === 'file') {
    contents[data.relname] = data.file
  }
})

stream.on('end', function () {
  console.log(contents)
})
