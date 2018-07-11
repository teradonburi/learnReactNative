module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'react-native/react-native': true,
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all', 'plugin:jest/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'react-native',
    'jest',
    'detox',
  ],
  'globals': {
  },
  'rules': {
    'indent': 'off',
    'indent-legacy': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'keyword-spacing': [
      'error',
      { 'before': true, 'after': true }
    ],
    'key-spacing': [
      'error',
      { 'mode': 'minimum' }
    ],
    'comma-spacing': [
      'error',
      { 'before': false, 'after': true }
    ],
    'space-before-blocks': [
      'error'
    ],
    'arrow-spacing': [
      'error',
      { "before": true, "after": true }
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'dot-notation': [
      'error'
    ],
    'brace-style': [
      'error',
      '1tbs'
    ],
    'no-else-return': [
      'error'
    ],
    'no-unused-vars': [
      'warn',
      { 'ignoreRestSiblings': true }
    ],
    'no-console': 'off',
    'no-useless-escape': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/prefer-stateless-function': [
      2,
      { 'ignorePureComponents': true },
    ],
    'react/no-string-refs': 'off', // TODO
  }
}
