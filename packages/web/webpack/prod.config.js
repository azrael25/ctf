const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CompressionPlugin = require('compression-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    version = require('../package.json').version;

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/assets/',
        filename: 'index.[hash].js'
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
                                localIdentName: '[hash:base64:5]',
                                camelCase: true,
                                minimize: true
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
            NODE_ENV: 'production',
            VERSION: version
        }),
        new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') }),
        new ExtractTextPlugin({ filename: 'index.[hash].css', allChunks: true }),
        new CompressionPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title: 'CTF App'
        })
    ],
    stats: {
        children: false
    }
};

module.exports = config;
