module.exports = function clearConsole() {
    process.stdout.write('\x1bc');
};
