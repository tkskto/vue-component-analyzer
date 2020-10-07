# vue-component-analyzer

This tool can Analyze dependency tree for Vue.js SFC (Single File Component)

![](https://github.com/tkskto/vue-component-analyzer/blob/images/images/screenshot.png?raw=true)

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

- `--dir` : target directory. default is `src`.
- `-f` or `--format` : report type. choose one from [browser | json | both]. default is `browser'.
- `-o` or `--out` : output directory for JSON file.

## License

MIT License.


