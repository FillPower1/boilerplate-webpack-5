const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports.loadDevCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                exportLocalsConvention: 'camelCase',
                                exportOnlyLocals: false
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
})

module.exports.loadProdCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:8]',
                                exportLocalsConvention: 'camelCase',
                                exportOnlyLocals: false
                            },
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:5].[id].css',
            chunkFilename: 'css/[name].[contenthash:5].[id].css'
        })
    ]
})
