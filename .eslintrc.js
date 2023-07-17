module.exports = {
  root: true,
  extends: [
    '@vue/standard',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: '*.vue',
      extends: ['@vue/typescript/recommended', 'plugin:vue/vue3-recommended', '@vue/typescript']
    },
    {
      files: ['*.vue', '*.js'],
      extends: ['plugin:vue/essential', '@vue/standard'],
      rules: {
        'vue/multi-word-component-names': 0,
        'vue/max-attributes-per-line': [
          2,
          {
            singleline: 20,
            multiline: 1
          }
        ],
        'vue/require-default-prop': 0,
        'vue/no-multiple-template-root': 0,
        'vue/no-lone-template': 0,
        'vue/no-v-model-argument': 0,
        'vue/one-component-per-file': 0,
        'import/no-cycle': 1,
        'space-before-function-paren': 0,
        '@typescript-eslint/ban-ts-comment': 0
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['standard-with-typescript', 'plugin:import/typescript'],
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/naming-convention': 0,
        'multiline-ternary': 0,
        'no-void': 0,
        'import/no-cycle': 1,
        '@typescript-eslint/space-before-function-paren': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/restrict-plus-operands': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/consistent-type-assertions': 0
      }
    }
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/restrict-plus-operands': 0
  }
}
