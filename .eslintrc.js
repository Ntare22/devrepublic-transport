module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true
  },
  extends: [
    'airbnb-base',
    'plugin:jasmine/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
