# folder-reader

Recursively stream a directory of files.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/folder-reader.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/folder-reader
[travis-image]: https://img.shields.io/travis/sethvincent/folder-reader.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/folder-reader
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

Recursively read all files/directories in a set of directories.

Creates a stream that outputs objects with file content and metadata.

Example item in the stream:

```js
{
  basename: 'index.js',
  relname: 'tests/index.js',
  root: '/Users/sdv/workspace/sethvincent/folder-reader',
  filepath: '/Users/sdv/workspace/sethvincent/folder-reader/tests/index.js',
  stat: [fs.Stat Object],
  type: 'file' // or 'directory'
}
```

Based on the [folder-walker](https://npmjs.com/folder-walker) module.

## Install

```sh
npm install --save folder-reader
```

## Usage

```js
var path = require('path')
var reader = require('folder-reader')

var dir = path.join(__dirname, 'docs')
reader(dir).on('data', console.log)
```

## Documentation
- [Getting started](docs/getting-started.md)
- [Related modules](docs/related-modules.md)
- [API](docs/api.md)
- [Tests](tests/)

### Examples
- [Basic example](examples/basic.js)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It is important that this project contributes to a friendly, safe, and welcoming environment for all. Read this project's [code of conduct](CONDUCT.md)

## Changelog

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/folder-reader/issues)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[ISC](LICENSE.md)
