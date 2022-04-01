
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
        format: 'umd',
        name: 'arrayToTree',
        file: `./dist/quick-sort.umd.js`,
        sourcemap: false,
    }]
});