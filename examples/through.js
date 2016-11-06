var path = require('path')
var through = require('through2')
var keypath = require('obj-keypath')
var reader = require('../index')

var dir = path.join(__dirname, 'example-files')
var contents = {}

reader(dir).pipe(through.obj(each, end))

function each (data, enc, next) {
  if (data.type === 'directory') {
    keypath.set(contents, data.relname.split('/'), {})
    next()
  } else if (data.type === 'file') {
    keypath.set(contents, data.relname.split('/'), data.file)
    next()
  }
}

function end () {
  console.log(contents)
}
