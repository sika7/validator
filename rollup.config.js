import typescript from '@rollup/plugin-typescript';

export default {
  input: 'lib/run.ts',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs',
    },
  ],
  plugins: [
    typescript(),
    // pluginCommonjs({
    //   extensions: ['.js', '.ts'],
    // }),
    // pluginBabel({
    //   babelHelpers: 'bundled',
    //   configFile: path.resolve(__dirname, '.babelrc.js'),
    // }),
    // pluginNodeResolve({
    //   browser: true,
    // }),
  ],
};
