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
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
    ]
}
