import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/static/**',
      '.eslintrc.cjs'
    ]
  },
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-explicit-emits':     'off',
      'vue/no-v-html':                  'off'
    }
  }
]
