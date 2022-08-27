import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import url from "@rollup/plugin-url";
import analyze from "rollup-plugin-analyzer";
import { uglify } from "rollup-plugin-uglify";
import copy from "rollup-plugin-copy";
import cleaner from 'rollup-plugin-cleaner';
import kontra from "rollup-plugin-kontra";

export function makeConfig(isProduction) {
  return {
    input: "./src/index.ts",
    output: {
      dir: "./dist/",
      format: "iife",
      sourcemap: !isProduction,
    },
    plugins: [
      nodeResolve(),
      esbuild(),
      url(),
      isProduction &&
        cleaner({
          targets: ["./dist/"],
        }),
      isProduction &&
        kontra({
          gameObject: {
            velocity: true,
          },
          sprite: {
            image: true,
            animation: true,
          },
          debug: true,
        }),
      isProduction && uglify({ sourcemap: !isProduction }),
      isProduction && analyze(),
      copy({
        targets: [{ src: "./public/index.html", dest: "./dist/" }],
      }),
    ],
  };
}

export default makeConfig({ isProduction: false });
