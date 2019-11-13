module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "mocha": true
    },
    "extends": ["plugin:vue/essential", "standard"],
    "plugins": [
        "vue"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
    },
    rules: {
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'no-console': 'off',
        'comma-dangle': ['error', {
            'arrays': 'ignore',
            'objects': 'ignore',
            'imports': 'never',
            'exports': 'never',
            'functions': 'ignore'
        }],
        'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 2 }],
        //'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never' }],
        'space-before-function-paren': 'off',
        'spaced-comment': 'off',
        'brace-style': ['error', 'stroustrup'],
        'padded-blocks': 'off',
        'no-constant-condition': 'off',
        'camelcase': 'off',
        'no-new': 'off',
        'prefer-const': 'off',
        'quote-props': ['error', 'consistent'],
        'dot-notation': 'off',
        'standard/no-callback-literal': 'off',
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'prefer-promise-reject-errors': 'off',
        'no-unused-vars': ['error', { 'args': 'none', 'ignoreRestSiblings': true, 'argsIgnorePattern': '^_' }],
    }
};