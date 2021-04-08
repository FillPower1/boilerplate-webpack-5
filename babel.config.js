module.exports = (api) => {
    // process.env.BABEL_ENV || process.env.NODE_ENV
    const env = api.env()

    api.cache.using(() => env === 'development')

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true
            }
        ]
    ]

    return {
        presets: [
            '@babel/preset-react',
            '@babel/preset-env',
        ],
        plugins,
    }
}
