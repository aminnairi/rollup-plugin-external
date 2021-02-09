import {resolve} from "path";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import remove from "rollup-plugin-delete";

export default {
  input: resolve(__dirname, "source", "rollup-plugin-external.ts"),
  plugins: [
    remove({
      verbose: true,
      targets: [resolve("library", "**", "*")]
    }),
    typescript({
      tsconfig: "tsconfig.rollup.json"
    }),
    terser()
  ],
  external: [
    "fs",
    "module"
  ],
  output: {
    file: resolve(__dirname, "library", "rollup-plugin-external.js"),
    format: "cjs",
    sourcemap: true
  }
};
