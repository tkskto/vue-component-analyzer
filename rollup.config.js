import path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import license from 'rollup-plugin-license';
import pkg from './package.json';

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.author.url}
  Released under the ${pkg.license} License.
*/`;

export default [
  {
    input: '.temp/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
      exports: 'default',
    },
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
      license({
        banner: 'see license.txt',
        thirdParty: {
          output: {
            file: path.join(__dirname, 'dist', 'license.txt'),
          },
        },
      }),
    ],
  },
  {
    input: 'src/client.ts',
    output: {
      file: 'dist/client.js',
      format: 'es',
      banner,
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfigForClient.json',
      }),
    ],
  },
];
