const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const checkCompilerHooksPlugin = require('./checkCompilerHooksPlugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle-[hash].js'
    },
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,//指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]'//指定类名
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new ExtractTextPlugin("[name]-[hash].css"),
        new checkCompilerHooksPlugin()
    ]
}