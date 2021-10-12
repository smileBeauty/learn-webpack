const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: process.cwd(),
    entry: {
        vender: [
            'react',
            'react-dom',
            'moment'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].dll.js',
        library: '[name]_library'
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
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]_library',
            path: path.resolve(__dirname, '../dist/[name]-manifest.json')
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin({
                // 用多进程并行运行以提高构建速度 默认并发运行次数：os.cups().length - 1
                parallel: true,
                cache: false,
                sourceMap: true
            })
        ]
    }
};