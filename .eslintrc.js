module.exports = {
    root: true,

    env: {
        browser: true,
        es2022: true,
        'vue/setup-compiler-macros': true,
    },

    extends: ['plugin:vue/vue3-strongly-recommended', 'eslint:recommended', 'prettier', 'plugin:import/recommended'],

    plugins: ['import'],

    parser: 'vue-eslint-parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        ecmaFeatures: {
            jsx: true,
        },
    },

    rules: {
        // import
        'import/extensions': ['error', 'always'],
        // Basic JS
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        'no-debugger': 'warn',
        'no-var': 'error',
        // Vue / Priority A: Essential
        // All rules enabled
        // Vue / Priority B: Strongly Recommended
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        // Vue / Priority C: Recommended
        'vue/attributes-order': 'error',
        'vue/order-in-components': 'error',
        'vue/this-in-template': 'error',
        // Vue / Uncategorized
        'vue/component-name-in-template-casing': 'error',
        'vue/component-options-name-casing': 'error',
        'vue/custom-event-name-casing': 'error',
        'vue/prefer-separate-static-class': 'error',
        'vue/new-line-between-multi-line-property': 'error',
        'vue/match-component-file-name': 'error',
        'vue/no-duplicate-attr-inheritance': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/padding-line-between-blocks': 'error',
        'vue/v-for-delimiter-style': 'error',
    },

    overrides: [
        {
            files: ['**/__tests__/*.js?(x)'],
            env: {
                jest: true,
                node: true,
            },
        },
        {
            files: ['./*.js', 'utility_modules/*.js'],
            env: {
                node: true,
            },
        },
    ],
};
