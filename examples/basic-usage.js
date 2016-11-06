var path = require('path')
var reader = require('../index')

var dir = path.join(__dirname, 'example-files')
reader(dir).on('data', console.log)
