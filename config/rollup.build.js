import baseConfig from './common';

export default [{
    ...baseConfig,
    output: {
        format: "esm",
        dir: "./lib/esm",
        sourcemap: true,
        globals: {
            react: 'React',
            antd: 'antd'
        }
    }
}, {
    ...baseConfig,
    output: {
        format: "amd",
        dir: "./lib/amd",
        sourcemap: true,
        globals: {
            react: 'React',
            antd: 'antd'
        }
    }
}, {
    ...baseConfig,
    output: {
        format: "umd",
        dir: "./lib/umd",
        name: 'wmsUI',
        sourcemap: true,
        globals: {
            react: 'React',
            antd: 'antd'
        }
    }
}];