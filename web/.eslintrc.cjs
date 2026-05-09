/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/no-v-html': 'off',
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never']
  }
}
