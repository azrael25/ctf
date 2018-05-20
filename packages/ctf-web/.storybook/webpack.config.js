const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.module.rules = [
        {
            test: /\.jsx?$/,
            use: 'babel-loader',
            include: path.resolve(__dirname, '../'),
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[hash:base64:5]',
                        camelCase: true,
                        minimize: true
                    }
                },
                'postcss-loader'
            ],
            include: path.resolve(__dirname, '../src/components/ui'),
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        localIdentName: '[local]',
                        minimize: true
                    }
                },
                'postcss-loader'
            ],
            include: path.resolve(__dirname, '../stories'),
        }
    ];

    return defaultConfig;
};
