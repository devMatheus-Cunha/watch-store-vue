/* eslint-disable prettier/prettier */
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        requireConfigFile: false,
        sourceType: 'module',
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        'no-unused-vars': 'off',
        'vue/multi-word-component-names': 'off',
        'no-undef': 'off',
        'import/order': 'off',
        'require-await': 'off',
        'require-prop-type-constructor': 'off',
        'require-default-prop': 'off',
    },
}