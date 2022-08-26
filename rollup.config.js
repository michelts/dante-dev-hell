import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild'
import url from '@rollup/plugin-url';
import analyze from 'rollup-plugin-analyzer'
import { uglify } from "rollup-plugin-uglify";
import copy from 'rollup-plugin-copy';
import kontra from 'rollup-plugin-kontra';

const sourcemap = false;

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist/',
    format: 'iife',
    sourcemap,
  },
  plugins: [
    nodeResolve(),
    esbuild(),
    url(),
    kontra({
      gameObject: {
        velocity: true
      },
      sprite: {
        image: true,
        animation: true,
      },
      debug: true
    }),
    uglify({sourcemap}),
    analyze(),
    copy({
      targets: [
        { src: 'public/index.html', dest: 'dist/' },
      ]
    }),
  ]
}
