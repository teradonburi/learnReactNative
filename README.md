# ESLint
以下のESLintを導入します。  
[eslint-plugin-react-native](https://github.com/intellicode/eslint-plugin-react-native)

```
$ yarn add --dev eslint babel-eslint eslint-react eslint-react-native
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
