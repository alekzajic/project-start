let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./config/webpack.config.prod');
let chalk = require('chalk');
let clearConsole = require('./config/utils/clearConsole');
let displayWebpackStats = require('./config/utils/displayWebpackStats');

/**
 * Setup webpack compiler
 */
const DEFAULT_PORT = process.env.PORT || 7778;
const compiler = webpack(config);
compiler.plugin('invalid', function () {
    clearConsole();
    console.log('Compiling...');
});
compiler.plugin('done', function(stats) { displayWebpackStats(stats, DEFAULT_PORT)});

const devServer = new WebpackDevServer(compiler, {
    contentBase: config.devServer.outputPath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    noInfo: true,
    stats: {
        chunks: false,
        assets: false,
        errors: false,
        warnings: false,
        colors: true,
        timings: false,
        version: false
    }
});

devServer.listen(DEFAULT_PORT, 'localhost', function (err) {
    if (err) {
        return console.log(err);
    }
    clearConsole();
    console.log(chalk.cyan('Starting the testing build server...'));
});
