const path = require('path'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const prod = argv.mode === 'production';

    return {
        mode: argv.mode,
        entry: [
            ...prod ? [] : ['react-hot-loader/patch'],
            './src/index.js'
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: prod ? '/assets/' : '/',
            filename: prod ? '[name].[hash].js' : 'index.js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'babel-loader',
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    resolve: {
                        extensions: ['.js', '.jsx']
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        prod ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: prod ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]'
                                },
                                importLoaders: 1,
                                localsConvention: 'camelCaseOnly'
                            }
                        },
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: prod ? 'index.css' : '[name].[hash].css',
                ignoreOrder: false
            })
        ],
        devServer: {
            hot: true,
            inline: true,
            port: 3000
        },
        devtool: prod ? 'eval' : 'source-map',
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        }
    };
};
