
const typescript = require('@rollup/plugin-typescript');
import { defineConfig } from 'rollup';

export default defineConfig({
    input: './src/index.ts',

    plugins: [
        typescript({
            // exclude: 'node_modules/**',
            typescript: require('typescript'),
        })
    ],

    external: id => ['@any86/quick-sort'].includes(id) || /^@any86/.test(id),
    output: [{
        format: 'es',
        file: `./dist/index.es.js`,
        sourcemap: true,
    },{
        format: 'cjs',
        file: `./dist/index.cjs.js`,
        sourcemap: true,
        exports:'default'
    },{
        format: 'umd',
        name: 'arrayToTree',
        file: `./dist/array-to-tree.umd.js`,
        sourcemap: true,
    }]
});