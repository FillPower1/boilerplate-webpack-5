const { SOURCE_DIRECTORY, BUILD_DIRECTORY } = require('../constants')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'

module.exports = {
    entry: [SOURCE_DIRECTORY],
    output: {
        filename: IS_DEV ? 'js/[name].bundle.js' : 'js/[name].[contenthash].[id].js',
        path: BUILD_DIRECTORY,
        publicPath: '/',
        hashDigestLength: 5,
    },
    mode: 'none',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash:5].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:5].[ext]'
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './static/index.html',
            title: 'Boilerplate 🚀',
            minify: false,
        })
    ],
}
