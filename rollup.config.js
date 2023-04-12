import typescript from '@rollup/plugin-typescript';
import pkg from "./package.json";

const moduleName = upperFirst(camelCase(pkg.name.replace(/^\@.*\//, '')));

export default {
  input: 'lib/run.ts',
  output: [
    {
      name: moduleName,
      file: 'dist/bundle.js',
      format: 'cjs',
    },
  ],
  plugins: [
    typescript(),
  ],
};
