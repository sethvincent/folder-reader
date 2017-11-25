# folder-reader changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

* ???

## v2.0.0

### Changed

* `options.map` now must return the data object instead of passing it to a callback

### Removed

* Removed glob matching with `options.filter`. `options.ignore` function can be used instead

### Added

* `options.ignore` function for ignoring files/folders

## v1.1.0

### Added

* Added support for alternate `fs` implementations

## v1.0.0

### Added

* Initial working version
