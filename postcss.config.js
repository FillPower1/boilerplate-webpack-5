module.exports = ({ env }) => {
    const plugins = [
        require('postcss-import')(),
        require('postcss-nested')(),
        require('postcss-preset-env')({
            stage: 0, // default stage 2
            autoprefixer: true,
            preserve: false
        })
    ]

    if (env === 'production') {
        plugins.push(require('cssnano')())
    }

    return {
        plugins
    }
}
