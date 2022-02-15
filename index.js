var fs = require('fs')

var walker = require('folder-walker')
var through = require('through2')
var isarray = require('isarray')
var pump = require('pump')

/**
* Create a stream that outputs the contents of a set of directories recursively
* @name folderReader
* @param {Array} dirs – The directories to read. Optionally can pass string path of one directory.
* @param {Object} options
* @param {Object} options.fs – alternate fs implementation, optional
* @param {String} options.encoding – encoding of files, default: utf8
* @param {String} options.ignore – ignore function for choosing to ignore files and folders, optional
* @param {Function} options.map – A function you can use to map the contents of files after they are read, optional
* @param {Boolean} options.readFileContent – A boolean indicating whether to read the file content, default: true
* @example
* var path = require('path')
* var reader = require('folder-reader')
*
* var dir = path.join(__dirname, 'docs')
* reader(dir).on('data', console.log)
**/

module.exports = function folderReader (dirs, options) {
  if (!isarray(dirs)) {
    dirs = [dirs]
  }

  options = options || {}
  var xfs = options.fs || fs
  var encoding = options.encoding || 'utf8'
  var ignore = options.ignore
  var map = options.map
  var readFileContent = options.readFileContent !== false

  return pump(walker(dirs, { fs: xfs }), through.obj(each))

  function each (data, enc, next) {
    var self = this

    // if ignored, keep moving through the stream
    if (ignore && ignore(data.filepath, data)) {
      return next()
    }

    // push directories through the stream unchanged
    if (data.type === 'directory') {
      this.push(data)
      return next()
    }

    if (!readFileContent) {
      this.push(data)
      return next()
    }

    // assume a file if not a directory
    xfs.readFile(data.filepath, encoding, function (err, file) {
      if (err) return next(err)

      data.file = file

      if (map) {
        data = map(data)
      }

      self.push(data)
      next()
    })
  }
}
