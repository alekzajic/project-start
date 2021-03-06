let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
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
    app: path.resolve('dev')
};

let DEFAULT_PORT = process.env.PORT || 7777;

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${DEFAULT_PORT}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader',
        // require.resolve('./polyfills'),
        path.join(paths.js, 'app')
    ],
    devServer: {
        outputPath: paths.app
    },
    output: {
        path: paths.app,
        pathinfo: true,
        filename: 'js/[name].js',
        publicPath: '/',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMaps: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer]
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
                loader: "style-loader!css-loader!fontgen-loader"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(paths.html, 'index.html'),
            favicon: path.join(paths.images, 'favicon.ico')
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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
