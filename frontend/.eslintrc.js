module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-v-for-key': 0,
    'vue/comment-directive': 0,
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        endOfLine: 'lf',
        printWidth: 110,
        trailingComma: 'none'
      }
    ]
  }
}
