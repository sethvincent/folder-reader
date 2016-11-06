var fs = require('fs')

var walker = require('folder-walker')
var micromatch = require('micromatch')
var through = require('through2')
var isarray = require('isarray')

/**
* Create a stream that outputs the contents of a set of directories recursively
* @name folderReader
* @param {Array} dirs – The directories to read. Optionally can pass string path of one directory.
* @param {Object} options
* @param {String} options.encoding – encoding of files, default: utf8
* @param {String} options.filter – glob pattern for filtering files, examples: `*.md`, `*.css`
* @param {String} options.filter – array of glob patterns for filtering files, examples: `*.md`, `*.css`
* @param {Function} options.map – A function you can use to map the contents of files after they are read
* @example
* var path = require('path')
* var reader = require('folder-reader')
*
* var dir = path.join(__dirname, 'docs')
* reader(dir).on('data', console.log)
**/

module.exports = function folderReader (dirs, options) {
  if (!isarray(dirs)) dirs = [dirs]
  options = options || {}
  var encoding = options.encoding || 'utf8'
  var filter = options.filter || '**/*'
  var map = options.map || function (data, cb) { return cb(data) }

  return walker(dirs).pipe(through.obj(each))

  function each (data, enc, next) {
    var self = this
    if (data.type === 'directory') {
      this.push(data)
      next()
    } else if (data.type === 'file') {
      if (micromatch(data.relname, filter).length) {
        fs.readFile(data.filepath, encoding, function (err, file) {
          if (err) return next(err)
          data.file = file

          map(data, function (updated) {
            if (updated) self.push(updated)
            next()
          })
        })
      } else {
        next()
      }
    }
  }
}
