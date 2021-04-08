const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const { loadProdCss } = require('../utils/css')

const commonConfig = require('./webpack.common')

module.exports = merge(
    commonConfig,
    {
        mode: 'production',
        devtool: false,
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
            splitChunks: {
                chunks: 'all',
            },
            runtimeChunk: {
                name: 'runtime'
            },
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../../static/assets'),
                        to: path.resolve(__dirname, '../../build/assets')
                    },
                ]
            })
        ]
    },
    loadProdCss()
)
