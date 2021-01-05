const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')

const loadPostCss = ({ sourceMap = false, minify = false } = { sourceMap: false, minify: false }) => {
    const plugins = [
        // цепочка плагинов postcss
        postcssPresetEnv({
            stage: 0, // default stage 2
        }),
    ]

    if (minify) {
        plugins.push(cssnano)
    }

    return {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                sourceMap,
                plugins,
            },
        },
    }
}

const loadCss = ({ sourceMap = false } = { sourceMap: false }) => {
    return {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: process.env.NODE_ENV === 'development'
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]'
            },
            sourceMap,
        },
    }
}

module.exports.loadDevCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    loadCss({ sourceMap: true }),
                    loadPostCss({ sourceMap: true, minify: false }),
                ],
            },
        ],
    },
})

module.exports.loadProdCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    loadCss({ sourceMap: false }),
                    loadPostCss({ sourceMap: false, minify: true }),
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:5].[id].css',
            chunkFilename: 'css/[name].[contenthash:5].[id].css',
        }),
    ],
})
