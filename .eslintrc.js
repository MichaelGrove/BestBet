module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        indent: ['error', 'tab'],
        'no-tabs': 'off',
        'class-methods-use-this': 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',
    },
};
