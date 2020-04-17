# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- @bigby/3d: the beginnings of 3D support!
- @bigby/2d-editor: new package that is home to 2d game specific editing components.
- @bigby/behaviors: new package that's going to house a collection of behaviors that are useful in any kind of game. The `Timer` behavior has been moved from @bigby/core to this package.
- @bigby/behaviors: new `Ticker` behavior. Implements a requestAnimationFrame based ticker that you can add to your top-level entity.
- @bigby/behaviors: new `KeyboardInput` behavior.
- @bigby/core: `Entity.from` factory that will create a complete entity (including behaviors) from data.
- @bigby/cli: new module, providing a convenient `bigby` CLI tool.
- @bigby/editor: provide `startEditor` convenience function.

### Changed

- @bigby/editor: now automatically installs React as a dependency (instead of listing it as a peer dependency.)

## 0.5.10

- First version noted in this changelog. Exciting!
