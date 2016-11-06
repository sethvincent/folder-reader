# Getting started with folder-reader

This module creates a Node [stream](https://nodejs.org/api/stream.html) that outputs an object for every file and directory it finds in an array of directories.

It does this recursively, so it gets the files and directories in every subdirectory, too.

### Install

To install the module, make sure you have [Node](https://nodejs.org) installed, and that [npm](https://npmjs.org) is available on your machine (it's a package manage that is installed when you install Node).

Run the `npm install` command:

```js
npm install folder-reader
```

## Usage

Basic usage looks like this:

```js
var path = require('path')
var reader = require('folder-reader')

var dir = path.join(__dirname, 'docs')
reader(dir).on('data', console.log)
```

Note that in that example I passed only one directory. Alternately, we can pass an array of directories:

```js
var path = require('path')
var reader = require('folder-reader')

var dirs = [
  path.join(__dirname, 'docs'),
  path.join(__dirname, 'tests'),
  path.join(__dirname, 'examples')
]

reader(dirs).on('data', console.log)
```

These examples so for just use console.log to print the objects in the terminal. Let's take a look at an example that uses these objects.

### Using the file/directory objects

In this example we'll use the `data` and `end` events of the stream to populate the `contents` object with the contents of all the files.

We use the `data.relname` property as the key for each file, and `data.file` is the value.

```js
var path = require('path')
var reader = require('folder-reader')

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
```

Instead of using the `data` and `end` events, let's try an example using the [through2 module](https://npmjs.com/through2).

Also, instead of making the key of each file, `data.relname`, let's create nested objects that better represent the structure of the file directory.

To help with this we'll use the [obj-keypath module](https://npmjs.com/obj-keypath) to simplify setting the values of nested objects.

```js
var path = require('path')
var through = require('through2')
var keypath = require('obj-keypath')
var reader = require('folder-reader')

var dir = path.join(__dirname, 'example-files')
var contents = {}

var stream = reader(dir).pipe(through.obj(each, end))

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
```
