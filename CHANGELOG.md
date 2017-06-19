# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0-alpha.0"></a>
# [0.2.0-alpha.0](https://github.com/zebMcCorkle/node-minecraftserver/compare/v1.0.0-alpha.1...v0.2.0-alpha.0) (2017-06-19)



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/zebMcCorkle/node-minecraftserver/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2017-06-19)


### Bug Fixes

* **MinecraftServer:** actually use default properties ([df41e39](https://github.com/zebMcCorkle/node-minecraftserver/commit/df41e39))
* **MinecraftServer:** query the correct host and port ([6576a1a](https://github.com/zebMcCorkle/node-minecraftserver/commit/6576a1a))
* **MinecraftServer:** use the new properties variable ([99919c7](https://github.com/zebMcCorkle/node-minecraftserver/commit/99919c7))



<a name="1.0.0-alpha.0"></a>
# [1.0.0-alpha.0](https://github.com/zebMcCorkle/node-minecraftserver/compare/v0.1.1-alpha.0...v1.0.0-alpha.0) (2017-06-19)


### Features

* **MinecraftServer:** add MinecraftServer#isOnline() ([8746458](https://github.com/zebMcCorkle/node-minecraftserver/commit/8746458))
* **MinecraftServer:** add MinecraftServer#query() ([c82871a](https://github.com/zebMcCorkle/node-minecraftserver/commit/c82871a))
* **MinecraftServer:** automatically agree to the EULA ([70af60b](https://github.com/zebMcCorkle/node-minecraftserver/commit/70af60b))
* **MinecraftServer:** create server.properties file on run ([80f9859](https://github.com/zebMcCorkle/node-minecraftserver/commit/80f9859))


### BREAKING CHANGES

* **MinecraftServer:** ensure users have agreed to the EULA before spinning up any servers. The EULA can
be found at https://account.mojang.com/documents/minecraft_eula.
* **MinecraftServer:** properties must now be passed in config, else Bad Things™ happen



<a name="0.1.1-alpha.0"></a>
## [0.1.1-alpha.0](https://github.com/zebMcCorkle/node-minecraftserver/compare/v0.1.0...v0.1.1-alpha.0) (2017-06-19)



<a name="0.1.0"></a>
# 0.1.0 (2017-06-19)


### Bug Fixes

* **release:** fix release pushing ([382ec0f](https://github.com/zebMcCorkle/node-minecraftserver/commit/382ec0f))


### build

* **release:** add infrastructure for releases ([ca182c4](https://github.com/zebMcCorkle/node-minecraftserver/commit/ca182c4))
* **typescript:** use TypeScript ([c56cd5c](https://github.com/zebMcCorkle/node-minecraftserver/commit/c56cd5c))


### Documentation

* **contributing:** add contributing information ([d9591fe](https://github.com/zebMcCorkle/node-minecraftserver/commit/d9591fe))


### Features

* **MinecraftServer:** create directory and download .jar file ([bb097ed](https://github.com/zebMcCorkle/node-minecraftserver/commit/bb097ed))
* **MinecraftServer:** run the server jar when MinecraftServer#run() is called ([fc300c7](https://github.com/zebMcCorkle/node-minecraftserver/commit/fc300c7))


### BREAKING CHANGES

* **release:** To release, use yarn run release. This creates a changelog, tag, and publishes to
GitHub and NPM.
* **typescript:** Code must be type-safe
* **contributing:** Use `yarn run commit` instead of `git commit` from now on.
