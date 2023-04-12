import typescript from '@rollup/plugin-typescript';

export default {
  input: 'lib/run.ts',
  output: [
    {
      file: 'dist/bundle.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/bundle.mjs',
      format: 'es',
    },
  ],
  plugins: [
    typescript(),
  ],
};
