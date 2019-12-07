const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../assets'),
        publicPath: '/assets/',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: path.resolve(__dirname, '../'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]',
                                camelCase: true
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.svg$/,
                use: 'url-loader?limit=1000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            VERSION: 'dev'
        }),
        new ExtractTextPlugin({ filename: 'index.css', allChunks: true })
    ],
    devServer: {
        hot: false,
        inline: false
    },
    devtool: 'eval'
};

module.exports = config;
