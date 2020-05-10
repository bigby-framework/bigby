<div align="center">

![bigby](https://bigby.dev/logo.png)

**The Adequately Astonishing HTML5 Game Development Framework**

[![npm](https://raster.shields.io/npm/v/bigby.png)](https://www.npmjs.com/package/bigby) [![CI](https://github.com/bigby-framework/bigby/workflows/CI/badge.svg)](https://github.com/bigby-framework/bigby/actions)

</div>

## Summary

🚧 **WARNING: UNDER CONSTRUCTION!** 🚧

**Bigby is a JavaScript/TypeScript framework for the rapid development of HTML5
games.** It is currently under heavy development, which is why I'm humbly asking
you to not take anything you're seeing here too seriously, as the whole project
is going to remain very much in flux for a little while longer. If you want to
follow development, please follow [@hmans](https://twitter.com/hmans) and/or
[@BigbyFramework](https://twitter.com/bigbyframework) on Twitter. Thanks!

## Resources

- 📖 Website: [bigby.dev](https://bigby.dev/)
- ⁉️ Forum: [Spectrum](https://spectrum.chat/bigby)
- 💬 Community Chat: [Discord](https://discordapp.com/channels/699977689347522561/699977689347522564)
- 🐙 Code: [bigby-framework/bigby](https://github.com/bigby-framework/bigby)
- 🐦 Twitter: [@BigbyFramework](https://twitter.com/bigbyframework)

## Features / Progress

- [x] Written in TypeScript, use it with any flavor of JavaScript.
- [x] Build super-high-performance 2D games (powered by Pixi.js)
- [x] Simple resource loading
- [x] Spritesheet support
- [ ] 2D physics
  - [x] Basic physics support
  - [ ] Collision management
  - [ ] Circle colliders
  - [ ] Box colliders
  - [ ] Polygon colliders
  - [ ] PhysicsEditor import
- [ ] Spatial audio
- [ ] Game controller support

## Planned for the future:

- [ ] Networking Layer (use Bigby on the server)
- [ ] 3D support

## Structure of this repository

Bigby is split into a collection of packages that are all developed in sync as part of this monorepo:

- **@bigby/core**: just the core classes, no game-specific functionality.
- **@bigby/game**: the core game engine (2D rendering, sprites, shaders, ...)
- **@bigby/physics2d**: 2D physics
- **@bigby/random**: A collection of utility functions for generating various kinds of random values.

It is all tied together by the **bigby** master package, which merely serves as a convenient entrypoint to the framework.

## Contributing

**🚧 Reminder: Bigby is currently under heavy construction.** If you want to contribute, please get in touch first before you start work on your PR. Bigby is moving very fast at the moment, and chances for getting unannounced PRs merged are relatively low.

To get started, clone the repository, and run the following commands:

```
yarn install  # installs all dependencies
yarn build    # performs an initial build of all packages
yarn dev      # fires up dev/watch mode for everything
```

## "Style Guide"

Not meant as a complete style guide, but we're trying to follow these rules within the repository:

- Functionality is split into small/micro packages where it makes sense. Specifically, it is assumed that someone building a game with Bigby generally has a very specific idea of the feature set they want to use, and we don't want to force dependencies/imports on them that they won't need.
- `@bigby/*` packages are written in TypeScript and compile to ES6 ES modules _only_. For the time being (!), it is assumed that users operate in an environment that is ready to consume these. ES modules are placed in each package's `esm/` subdirectory and not bundled further.
- Each class lives in its own file of the same name (e.g. `Behavior.ts` for `Behavior`.) The class is always the module's **default export**.
- Each package's `index.ts` offers named exports of all classes contained in the package.
