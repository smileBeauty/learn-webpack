const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const myLoader1 = require('../loaders/my-loader1');
const myLoader2 = require('../loaders/my-loader2');
const myLoader3 = require('../loaders/my-loader3');
const MyPlugin = require('../plugins/my-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    target: 'web',
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].bundle.js',
        assetModuleFilename: './asset/[hash].[ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: false
                        }
                    },
                    // myLoader3,
                    // myLoader2,
                    // myLoader1,
                    'thread-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'thread-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../template/index.html'),
            inject: 'body',
            favicon: path.resolve(__dirname, '../template/favicon.ico')
        }),
        new MyPlugin({ name: 'zhangsan' })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new UglifyJsWebpackPlugin({
                // ????????????????????????????????????????????? ???????????????????????????os.cups().length - 1
                parallel: true,
                cache: false,
                sourceMap: true
            })
        ],
        splitChunks: {
            // ?????????????????????????????????
            chunks: 'all',
            // ?????????????????????
            minChunks: 1,
            // ?????????????????? ????????????????????????????????????????????????
            minSize: 0,
            // ?????????????????????
            maxAsyncRequests: 6,
            // ?????????????????????
            maxInitialRequests: 6,
            cacheGroups: {
                moment: {
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: -5,
                    name: 'moment'
                },
                'react-react-dom': {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: -5,
                    name: 'react-react-dom'
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                },
                common: {
                    minChunks: 2,
                    minSize: 0,
                    priority: -10,
                    name: 'common'
                }
            },
        }
    },
    externals: {
        jquery: 'jQuery'
    }
};