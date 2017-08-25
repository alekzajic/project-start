let chalk = require('chalk');
let prompt = require('./prompt');
let clearConsole = require('./clearConsole');
let formatErrorMessage = require('./formatErrorMessage');

module.exports = function displayWebpackStats(stats, DEFAULT_PORT) {
    clearConsole();
    console.log(chalk.gray(`Listening on http://localhost:${DEFAULT_PORT}`));
    let hasErrors = stats.hasErrors();
    let hasWarnings = stats.hasWarnings();
    if (!hasErrors && !hasWarnings) {
        console.log(chalk.green('Compiled successfully!'));
        console.log();
        return;
    }

    let json = stats.toJson();
    let formattedErrors = json.errors.map(message =>
        'Error in ' + formatErrorMessage(message)
    );
    let formattedWarnings = json.warnings.map(message =>
        'Warning in ' + formatErrorMessage(message)
    );

    if (hasErrors) {
        console.log(chalk.red('Failed to compile.'));
        console.log();
        if (formattedErrors.some(message => message.indexOf('Syntax error:') !== -1)) {
            // If there are any syntax errors, show just them.
            // This prevents a confusing ESLint parsing error preceding a much more useful Babel syntax error.
            formattedErrors = formattedErrors.filter(message => message.indexOf('Syntax error:') !== -1);
        }
        formattedErrors.forEach(message => {
            console.log(message);
        });
        console.log();
        // If errors exist, ignore warnings.
        return;
    }

    if (hasWarnings) {
        console.log(chalk.yellow('Compiled with warnings.'));
        console.log();
        formattedWarnings.forEach(message => {
            console.log(message);
        });
        console.log();
        console.log('You may use special comments to disable some warnings.');
        console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
        console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
        console.log();
    }
};
