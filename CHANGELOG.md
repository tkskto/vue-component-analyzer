# Changelog

## 0.11.0

### Breaking Changes

*   Drop support for Node.js 20. Node.js 22.12 or later is now required.

### Fixes

*   Use the public `AST` type API provided by `vue-eslint-parser` \#495.
*   Support ESM-only dependencies in the test environment for `commander` v15 \#491.
*   Use the ESM default export provided by `ejs` v6.
*   Update `ws` to v8.21.3, including security fixes \#471 and \#481.
*   Update `rollup` with security fixes \#470.

### Chores

*   Pin dependency versions for supply-chain hardening \#478.
*   \#451 typescript-eslint monorepo to v8.67.0
*   \#452 globby to v16.2.3
*   \#473 jest monorepo to v30.4.2
*   \#475 vue-eslint-parser to v10.4.1
*   \#476 actions/checkout to v7
*   \#477 actions/setup-node to v7
*   \#479 @rollup/plugin-commonjs to v29.0.3
*   \#480 ts-jest to v29.4.12
*   \#483 rollup to v4.62.4
*   \#484 @rollup/plugin-terser to v1
*   \#485 eslint to v10.8.1
*   \#486 lint-staged to v17.3.0
*   \#487 get-tsconfig to v4.14.3
*   \#488 npm-run-all2 to v9.0.3
*   \#490 upload-artifact to v7 and download-artifact to v8
*   \#492 ejs to v6.0.1
*   \#496 js-beautify to v2.0.3

## 0.10.3

Note: v0.10.1 and v0.10.2 were not published to npm due to a CI publish failure. This release includes all changes fixes the publish pipeline.

### Fixes

-   @ and ~ paths not adding trailing slash if needed \#423 from @vitorrd

Thank you for your issue!

### Chores

*   Remove `scripts.prepare` (Husky) to avoid running during `npm publish`.
*   \#419 commander to v14
*   \#420 vue-eslint-parser to v10
*   \#432 ws to v8.18.3
*   \#435 express to v5.2.1
*   \#436 get-tsconfig to v4.13.0
*   \#437 typescript-eslint monorepo to v8.49.0

## 0.10.2

Note: Also this version was not published to npm... Changes were rolled into v0.10.3.

## 0.10.1

Note: This version was not published to npm. Changes were rolled into v0.10.3.

## 0.10.0

### Fixes

*   set pre style for overflow contents

### Chores

*   \#397 express to v5
*   \#398 node to v22 (And dropped v18.x)
*   \#402 typescript-eslint monorepo to v8.32.1
*   \#405 ws to v8.18.2
*   \#409 get-tsconfig to v4.10.1

## 0.9.1

### Fixes

* fix(deps): update dependency vue-eslint-parser to v9.4.3 by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/361
* fix(deps): update typescript-eslint monorepo to v7.18.0 by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/362
* fix(deps): update dependency ws to v8.17.1 [security] by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/370
* fix(deps): update dependency js-beautify to v1.15.2 by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/378
* fix(deps): update dependency express to v4.20.0 [security] by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/372
* fix(deps): update dependency get-tsconfig to v4.10.0 by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/391
* fix(deps): update dependency globby to v14.1.0 by @renovate in https://github.com/tkskto/vue-component-analyzer/pull/392

This release resolves the following security issues.

* https://github.com/tkskto/vue-component-analyzer/issues/374
* https://github.com/tkskto/vue-component-analyzer/issues/375

## 0.9.0

### Fixes

-   fixed parsing process of defineProps \#308 from @Disservin
-   add support tsconfig path aliases \#309 from @Disservin

Thank you for your issue!

### Chores

-   \#300 `mkdirp` to v3.0.1
-   \#303 `vue-eslint-parser` to v9.4.2
-   \#336 `globby` to v14.0.1
-   \#345 `ws` to v8.17.0
-   \#348 `ejs` to v3.1.10
-   \#352 `commander` to v12.1.0

## 0.8.0

### enhancement

-   \#289 add `html` export format.

### Chores

-   \#287 `mkdirp` to v3.0.0
-   \#288 `globby` to v13.1.4
-   \#292 `commander` to v10.0.1

## 0.7.1

There is nothing enhancement, just update dependencies.

## 0.7.0

### enhancement

-   add support for importing scripts with some attributes(`src`, `setup`, `lang`).

## 0.6.1

### enhancement

-   add getImportDeclarationTree API.

### Chores

-   use Node.js LTS for build in GitHub Actions.
-   \#210 `express` to v4.8.12

## 0.5.2

### Chores

-   \#210 update dependency
    -   `commander` to v9.4.1
    -   `globby` to v13.1.2
    -   `vue-eslint-parser` to v9.1.0
    -   `ws` to v8.11.0

## 0.5.1

### Chores

-   \#171 update dependency `vue-eslint-parser` to v8.3.0
-   \#178 update dependency `ejs` to v3.1.8
-   \#186 update dependency `commander` to v9.3.0
-   \#187 update dependency `express` to v4.18.1

### Fixes

-   Fails to render when the component uses optional chaining operator \#174 from @nachodd

## 0.5.0

change package type to `module`.

### Chores

-   \#158 update dependency `commander` to v9.0.0
-   \#159 update dependency `globby` to v13.0.0

## 0.4.1

### Chores

-   \#153 update dependency `vue-eslint-parser` to v8.2.0
-   \#138 update dependency `ws` to v8.5.0

### Fixes

-   update Vue.js logo to SVG.

## 0.4.0

### enhancement

-   add screenshot feature (for only image mode)

### Chores

-   \#119 update dependency `commander` to v8.3.0
-   \#132 update dependency `vue-eslint-parser` to v8
-   \#137 update dependency `ws` to v8.3.0

### Breaking Changes

-   Dropped support for Node.js v12.x

## 0.3.2

### enhancement

-   add icon.

### Chores

-   \#110 update `vue-eslint-parser` 7.7.2 to 7.9.0
-   \#103 update `ws` 7.5.2 to 7.5.3

## 0.3.1

### Bug Fixes

-   \#94 exclude `node_modules`.

### Chores

-   \#93 update `vue-eslint-parser` 7.6.0 to 7.7.2
-   \#91 update `commander` 7.2.0 to 8.0.0
-   \#89 update `globby` 11.0.3 to 11.0.4
-   \#88 update `ws` 7.4.6 to 7.5.2

## 0.3.0

### Updates

-   \#75 add silent mode

### Bug Fixes

-   \#73 fix a bug in file import process.
-   \#74 fix a bug in client JavaScript logic.

### Chores

-   \#72 update `ws` 7.4.4 to 7.4.6

## 0.2.1

### Updates

-   be able to expand and collapse all information.
-   handling circular dependency.

### Chores

-   \#45 update `commander`
-   \#47 update `globby`

## 0.2.0

### Updates

-   be able to change to Tree Style.
-   be able to change props visibility.
-   be able to change fileSize visibility.
-   be able to change lastUpdated visibility.
-   be able to change referenced count visibility.

### Chores

-   \#31 update `ejs`
-   \#32 update `globby`
-   \#33 update `vue-eslint-parser`
-   \#34 update `ws`
-   \#42 update `commander`

## 0.1.4

-   fixed a bug for no extension file import.

## 0.1.3

-   Add components stats
-   bundle output files
-   fixed accessibility issues
