let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let webpack = require('webpack');
let WriteFilePlugin = require('write-file-webpack-plugin');

let paths = {
    src: path.resolve('src'),
    html: path.resolve('src/html'),
    scss: path.resolve('src/scss'),
    js: path.resolve('src/js'),
    assets: path.resolve('src/assets'),
    images: path.resolve('src/assets/images'),
    app: path.resolve('dist')
};

module.exports = {
    devtool: 'eval',
    entry: [
        // require.resolve('./polyfills'),
        path.join(paths.js, 'app')
    ],
    devServer: {
        outputPath: paths.app
    },
    output: {
        path: paths.app,
        pathinfo: true,
        filename: 'js/[name]-[hash].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['web_modules', 'node_modules', 'src'],
        extensions: ['.js', '.json']
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            // eslint
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                include: paths.js,
                options: {
                    configFile: path.join(__dirname, 'eslint.js'),
                    useEslintrc: false
                }
            },
            // javascript
            {
                test: /\.js$/,
                include: paths.js,
                loader: 'babel-loader',
                options: require('./babel.dev')
            },
            // css/scss
            {
                test: /\.(css|scss)$/,
                include: paths.scss,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        },
                        'resolve-url-loader',
                        'sass-loader'
                    ],
                })
            },
            // assets
            {
                test: /\.(svg|jpg|png|gif|svg|mp4|webm|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                include: paths.assets,
                exclude: path.join(paths.assets, 'font-icons'),
                loader: 'url-loader',
                options: {
                    name: '[path]/[name].[ext]',
                    context: paths.assets,
                    limit: 128
                }
            },
            // fontgen-loader ( https://github.com/DragonsInn/fontgen-loader )
            {
                test: /\.font\.(js|json)$/,
                // loader: "style-loader!css-loader!fontgen-loader"
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader',
                        'fontgen-loader'
                    ],
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(paths.html, 'index.html'),
            favicon: path.join(paths.images, 'favicon.ico')
        }),
        new ExtractTextPlugin('css/[name]-[hash].min.css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new CaseSensitivePathsPlugin(),
        new WriteFilePlugin()
    ],
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
