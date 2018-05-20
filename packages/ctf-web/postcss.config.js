const lost = require('lost'),
    postcssAtRulesVariables = require('postcss-at-rules-variables'),
    postcssImport = require('postcss-import'),
    postcssFor = require('postcss-for'),
    postcssCssnext = require('postcss-cssnext');

module.exports = {
    plugins: [
        postcssImport({ filter: path => !/normalize/.test(path) }),
        postcssCssnext,
        postcssAtRulesVariables,
        postcssFor,
        lost
    ]
};
