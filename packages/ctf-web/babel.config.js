module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        'add-module-exports'
    ],
    env: {
        development: {
            plugins: [
                'react-hot-loader/babel'
            ]
        },
        production: {
            plugins: [
                '@babel/plugin-transform-react-constant-elements',
                '@babel/plugin-transform-react-inline-elements',
                ['transform-react-remove-prop-types', { 'ignoreFilenames': ['node_modules'], 'removeImport': true }]
            ]
        }
    }
};
