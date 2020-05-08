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

## Contributing

**🚧 Reminder: Bigby is currently under heavy construction.** If you want to contribute, please get in touch first before you start work on your PR. Bigby is moving very fast at the moment, and chances for getting unannounced PRs merged are relatively low.

To get started, clone the repository, and run the following commands:

```
yarn install  # installs all dependencies
yarn build    # performs an initial build of all packages
yarn dev      # fires up dev/watch mode for everything
```
