const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new UglifyJsWebpackPlugin({
                // 用多进程并行运行以提高构建速度 默认并发运行次数：os.cups().length - 1
                parallel: true,
                cache: false,
                sourceMap: true
            })
        ],
        splitChunks: {
            // 所有的包全部在分包范围
            chunks: 'all',
            // 最少被使用几次
            minChunks: 1,
            // 最小的包大小 否则就算引用次数够了也不单独抽离
            minSize: 0,
            // 最大异步请求数
            maxAsyncRequests: 6,
            // 最大同步请求数
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