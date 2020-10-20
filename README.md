# vue-component-analyzer

This tool can Analyze dependency tree for Vue.js SFC (Single File Component).

Also, you can see Props of Component.

![](https://github.com/tkskto/vue-component-analyzer/blob/images/images/screenshot3.png?raw=true)

## Why?

When you try to change the behavior of components, it will help you to　investigate the influence range.

When you will join a new big project using Vue.js, it will help you to understand dependencies.

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

Or you can use npx（after npm install）:

```
npx vca --dir pages
```

### CLI Options

- `--dir` : analyze target directory. default is `src`.
- `-f` or `--format` : report type. choose one from [browser | json | both]. default is `browser`.
- `-o` or `--out` : output directory. JSON file will output here.
- `-p` or `--port` : select a port number for the local server.

## License

MIT License.


