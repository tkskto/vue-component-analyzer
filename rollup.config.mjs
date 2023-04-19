import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import {readFile} from 'fs/promises';
const pkg = JSON.parse(
  await readFile(
    new URL('./package.json', import.meta.url)
  )
);

let dependencies = '';

for (const name in pkg.dependencies) {
  if (Object.prototype.hasOwnProperty.call(pkg.dependencies, name)) {
    dependencies += `    ${name} -- ${pkg.dependencies[name]}\n`;
  }
}

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.author.url}
  Released under the ${pkg.license} License.
  See LICENSE.txt for full license.
  dependencies: 
    ${dependencies.trim()}
*/`;

export default [
  {
    input: '.temp/server/index.js',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'es',
        banner,
      },
    ],
    external: [
      'fs',
      'path',
      'mkdirp',
      'commander',
      'globby',
      'vue-eslint-parser',
      'opener',
      'http',
      'ws',
      'express',
      'ejs',
    ],
    plugins: [
      json(),
      commonjs(),
      nodeResolve(),
      terser(),
    ],
  },
  {
    input: 'src/client/client.ts',
    output: {
      file: 'dist/client.js',
      format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: 'src/client/tsconfig.json',
      }),
      terser(),
    ],
  },
];
