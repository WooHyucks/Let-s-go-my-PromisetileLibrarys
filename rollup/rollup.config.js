import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import polyfillNode from "rollup-plugin-polyfill-node";

export default {
  input: "src/main.ts",
  output: [
    {
      file: "build/bundle.js",
      format: "umd",
      name: "PromiseOption",
      globals: {
        os: "os",
      },
    },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    resolve({
      preferBuiltins: true,
    }),
    polyfillNode(),
  ],
};
