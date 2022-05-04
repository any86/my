
const typescript = require('rollup-plugin-typescript2');
import { defineConfig } from 'rollup';
import { terser } from "rollup-plugin-terser";
export default defineConfig({
    input: './src/index.ts',

    plugins: [
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
        terser()
    ],

    output: [{
        format: 'es',
        file: `./dist/index.es.js`,
        sourcemap: true,
    }, {
        format: 'cjs',
        file: `./dist/index.cjs.js`,
        sourcemap: true,
        exports: 'default'
    }, {
        format: 'umd',
        name: 'loadImage',
        file: `./dist/repeat.umd.js`,
        sourcemap: true,
    }]
});