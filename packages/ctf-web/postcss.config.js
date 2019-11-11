const autoprefixer = require('autoprefixer'),
    env = require('postcss-preset-env'),
    cssnano = require('cssnano'),
    normalize = require('postcss-normalize');

module.exports = {
    plugins: [
        normalize,
        env,
        autoprefixer,
        cssnano
    ]
};
