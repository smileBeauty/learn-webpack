const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpackUtils = require('./webpack-utils');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    target: 'web',
    entry: webpackUtils.getEntry(),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[contenthash]_bundle.js'
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
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css'
        }),
        ...webpackUtils.getHtmlTemplate(HtmlWebpackPlugin)
    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new UglifyJsWebpackPlugin({
                // 用多进程并行运行以提高构建速度 默认并发运行次数：os.cups().length - 1
                parallel: true,
                cache: true,
                sourceMap: true
            })
        ],
    },
    devServer: {
        compress: true,
        port: 8080,
        open: true,
        historyApiFallback: {
            rewrites: webpackUtils.getRewritePaths('home')
        },
    }
};