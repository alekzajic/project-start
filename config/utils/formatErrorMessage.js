module.exports = function formatErrorMessage(message) {
    return message
    // Make some common errors shorter:
        .replace(
            // Babel syntax error
            'Module build failed: SyntaxError:',
            'Syntax error:'
        )
        .replace(
            // Webpack file not found error
            /Module not found: Error: Cannot resolve 'file' or 'directory'/,
            'Module not found:'
        )
        // Internal stacks are generally useless so we strip them
        .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
        // Webpack loader names obscure CSS filenames
        .replace('./~/css-loader!./~/postcss-loader!', '');
};