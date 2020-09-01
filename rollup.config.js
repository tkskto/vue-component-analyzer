import path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import buildIns from 'rollup-plugin-node-builtins';
import license from 'rollup-plugin-license';

import pkg from './package.json';

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.author.url}
  Released under the ${pkg.license} License.
*/`;

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
    },
    external: [
      'fs',
      'path',
      'buffer',
    ],
    plugins: [
      typescript(),
      commonjs(),
      nodeResolve(),
      json(),
      buildIns(),
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
    input: 'src/commadline.ts',
    output: {
      file: 'dist/commadline.js',
      format: 'es',
      banner,
    },
    plugins: [
      typescript(),
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
      typescript(),
    ],
  },
];
