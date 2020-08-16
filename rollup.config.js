import typescript from 'rollup-plugin-typescript2';
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
      format: 'es',
      banner,
    },
    plugins: [
      typescript(),
    ],
  },
  {
    input: 'src/cli.ts',
    output: {
      file: 'dist/cli.js',
      format: 'es',
      banner,
    },
    plugins: [
      typescript(),
    ],
  },
];
