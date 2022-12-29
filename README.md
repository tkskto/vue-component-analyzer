# vue-component-analyzer

This tool can Analyze dependency tree for Vue.js SFC (Single File Component). You can see [GitHub Pages](https://tkskto.github.io/vue-component-analyzer/dist/) for a demo.

Also, you can see Props of Component.

![](https://github.com/tkskto/vue-component-analyzer/blob/images/images/screenshot3.png?raw=true)

or you can see simple text pattern.

![](https://github.com/tkskto/vue-component-analyzer/blob/images/images/screenshot4.png?raw=true)

## Why?

When you try to change the behavior of components, it is hard to know where the component is used.

When you join a new big project using Vue.js, it is hard to understand dependencies.

## installation and usage

You can install vue-component-analyzer using npm:

```
npm install @tkskto/vue-component-analyzer --save-dev
```

Then put command on npm scripts.

```
"scripts": {
  "vca": "vca --dir pages"
}
```

Or you can use npm exec（after npm install）:

```
npm exec vca -- --dir .
```

### CLI Options

*   `--dir` : analyze target directory. default is `src`. `node_modules` will be ignored by default.
*   `--silent` : running without almost logs.
*   `-f` or `--format` : report type. choose one from [browser | json | both]. default is `browser`.
*   `-o` or `--out` : output directory. JSON file will output here.
*   `-p` or `--port` : select a port number for the local server.

## API

vue-component-analyzer is also available as an API from v0.6.1.

This API is intended to be used for testing.

```javascript
import {getImportDeclarationTree} from '@tkskto/vue-component-analyzer';

const jsonOfTree = getImportDeclarationTree('entryFile.vue');
```

See [index.d.ts](./types/index.d.ts) for details of types.

(`lastModifiedTime` can be noise. If you don't need it remove explicitly.)

## License

MIT License.
