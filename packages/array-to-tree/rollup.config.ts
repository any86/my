
const typescript = require('rollup-plugin-typescript2');
import { defineConfig } from 'rollup';
import dts from "rollup-plugin-dts";
import pkg from './package.json';

export default defineConfig({
    input: './src/index.ts',

    plugins: [
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
        dts()
    ],

    external: id => Object.keys(pkg.dependencies).includes(id) || /^@any86/.test(id),
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
        name: 'arrayToTree',
        file: `./dist/array-to-tree.umd.js`,
        sourcemap: true,
        globals: { '@any86/quick-sort': 'quickSort' }
    },
    { file: "./dist/index.d.ts"}
    ]
});