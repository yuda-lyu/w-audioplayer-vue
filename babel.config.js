module.exports = {
    'presets': [
        ['@babel/preset-env', {
            'useBuiltIns': 'entry',
            'corejs': 3
        }]
    ],
    'plugins': [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-export-default-from',
        // '@babel/plugin-syntax-import-assertions', //已被棄用
        // '@babel/plugin-proposal-nullish-coalescing-operator', //browser與nodejs已支援
        // '@babel/plugin-proposal-object-rest-spread', //browser與nodejs已支援
        // '@babel/plugin-proposal-optional-chaining', //browser與nodejs已支援
    ]
}
