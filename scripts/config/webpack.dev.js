const { merge } = require('webpack-merge')

const { loadDevCss } = require('../utils/css')
const { BUILD_DIRECTORY } = require('../constants')

const commonConfig = require('./webpack.common')

module.exports = merge(
    commonConfig,
    {
        mode: 'development',
        devtool: 'eval-cheap-module-source-map',
        devServer: {
            contentBase: BUILD_DIRECTORY,
            open: true,
            compress: true,
            hot: true,
            overlay: true,
            stats: { colors: true },
            port: 8080,
            quiet: false
        },
    },
    loadDevCss()
)
