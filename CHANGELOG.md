# Changelog

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
