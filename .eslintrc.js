module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['webpack.config.js'],
  rules: {
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-tabs': ['error', {allowIndentationTabs: true}],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
  },
};
