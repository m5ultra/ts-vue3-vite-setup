module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 0,
    'import/no-extraneous-dependencies': 0,
    'vue/multi-word-component-names': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
