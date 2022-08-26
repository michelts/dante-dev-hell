import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild'
import url from '@rollup/plugin-url';
import analyze from 'rollup-plugin-analyzer'
import { uglify } from "rollup-plugin-uglify";
import copy from 'rollup-plugin-copy';
import kontra from 'rollup-plugin-kontra';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist/',
    format: 'iife',
    sourcemap: !isProduction,
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
    isProduction && uglify({sourcemap: !isProduction}),
    isProduction && analyze(),
    copy({
      targets: [
        { src: 'public/index.html', dest: 'dist/' },
      ]
    }),
  ]
}
