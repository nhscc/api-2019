const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'jsx-a11y',
        'import'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            experimentalObjectRestSpread: true,
            jsx: true,
        }
    },
    env: {
        es6: true,
        node: true,
        jest: true,
        browser: true,
        webextensions: true,
    },
    rules: {
        'no-console': 'warn',
        'import/no-unresolved': ['error', { commonjs: true }],
        'no-unused-vars': 'off',
        'no-restricted-globals': ['warn'].concat(restrictedGlobals),
        'react/jsx-max-depth': 'error',
        'no-extra-boolean-cast': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        // ? Disable these rules for all files...
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
    overrides: [{
        // ? ... but enable these rules specifically for TypeScript files
        files: ['*.ts', '*.tsx'],
        rules: {
            'no-undef': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            // ? Already handled by vscode
            '@typescript-eslint/no-unused-vars': 'off',
        }
    }],
    settings: {
        'import/extensions': [
            '.ts', '.tsx', '.js', '.jsx',
        ],
        // ? Switch parsers depending on which type of file we're looking at
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
            'babel-eslint': ['.js', '.jsx'],
        },
        'import/resolver': {
            alias : {
                map: [
                    // ! If changed, also update these aliases in package.json and .eslint.rc
                    ['universe','./src'],
                    ['multiverse','./lib'],
                    ['types','./types'],
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {},
        },
        'import/ignore': [
            // ? Don't go complaining about anything that we don't own
            '.*/node_modules/.*',
        ]
    }
};
