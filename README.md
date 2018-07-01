# ESLint
以下のESLintを導入します。  
[eslint-plugin-react-native](https://github.com/intellicode/eslint-plugin-react-native)

```
$ yarn add --dev eslint babel-eslint eslint-react eslint-react-native
```

.eslintrc.jsです。  
envパラメータに`'react-native/react-native': true`を設定します。  
extendsに`plugin:react-native/all`を指定するとチェックが厳密になります。  

```.eslintrc.js
module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'react-native/react-native': true,
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'react-native'
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
```

ESLintに引っかかるようになるので  
App.jsを次のように書き直します。  

```App.js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit App.js
    </Text>
    <Text style={styles.instructions}>
      {instructions}
    </Text>
  </View>
)

const bgColor = '#F5FCFF'
const textColor = '#333333'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: textColor,
    marginBottom: 5,
  },
})

export default App
```

