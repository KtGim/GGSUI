import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-typescript2';
import jsx from 'acorn-jsx';
import json from '@rollup/plugin-json';

const fileExtensions = ['.js', '.jsx', '.tsx'];
const cssExtensions = ['.css', '.less'];

const tsPlugin = ts({
    tsconfig: require.resolve('../tsconfig.json'), // 导入本地ts配置
    extensions: fileExtensions,
    tsconfigOverride: { compilerOptions : { module: "es2015" } }
});

export default {
    input: './components/index.tsx',
    external: ['react', 'antd'],
    plugins: [
        json(),
        image(),
        postcss({
        extensions: cssExtensions
        }),
        nodeResolve({
        extensions: fileExtensions
        }),
        tsPlugin,
        babel({
        presets: ["@babel/preset-react"],
        babelHelpers: "bundled",
        extensions: fileExtensions,
        exclude: 'node_modules/**'
        }),
        commonjs()
    ],
    acornInjectPlugins: [jsx()],
}