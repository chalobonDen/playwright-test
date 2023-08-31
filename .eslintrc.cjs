module.exports = {
  env: {
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  // Standard JavaScript Style Guide
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  // Airbnb JavaScript Style Guide
  // extends: ["airbnb-base", "plugin:prettier/recommended"],
  // Google JavaScript Style Guide
  // extends: ["google", "plugin:prettier/recommended"],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
  },
}
