module.exports = {
    babelrc: false,
    cacheDirectory: true,
    presets: [
        ['babel-preset-es2015', {loose: true, modules: false}],
        'babel-preset-es2016',
        'babel-preset-react'
    ],
    plugins: [
        'babel-plugin-transform-decorators-legacy',
        'babel-plugin-syntax-trailing-function-commas',
        'babel-plugin-transform-class-properties',
        'babel-plugin-transform-object-rest-spread',
        'react-hot-loader/babel'
    ].map(require.resolve).concat([
        [require.resolve('babel-plugin-transform-runtime'), {
            helpers: false,
            polyfill: false,
            regenerator: true
        }]
    ])
};
