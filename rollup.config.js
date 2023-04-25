import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';

const pluginFiles = Object.fromEntries(
  glob
    .sync('lib/plugins/**/*.ts')
    .map((file) => [
      path.relative('lib/plugins', file.slice(0, file.length - path.extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
);

export default [
  {
    input: 'lib/export.ts',
    output: [
      {
        file: 'dist/export.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/export.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript()],
  },
  {
    input: pluginFiles,
    output: [
      {
        dir: 'dist/plugins/',
        entryFileNames: '[name].cjs',
        format: 'cjs',
      },
      {
        dir: 'dist/plugins/',
        entryFileNames: '[name].mjs',
        format: 'es',
      },
    ],
    plugins: [typescript()],
  },
];
