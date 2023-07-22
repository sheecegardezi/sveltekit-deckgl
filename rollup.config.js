import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import replace from "@rollup/plugin-replace"
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = false;

export default {
  input: 'src/main.js', // Always use this for input, since we don't need separate outputs for production.
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
    globals: {
      '@deck.gl/core': 'core',
      '@deck.gl/layers': 'layers'
    }
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: true
      },
      css: (css) => {
        css.write('public/build/bundle.css');
      },
    }),
    css({
      output: 'bundle.css'
    }),
    babel({
      babelHelpers: 'runtime',
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      mainFields: ["browser", "main"],
      preferBuiltins: false
    }),
    !production && serve(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}
