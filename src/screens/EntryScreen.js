/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'native-base'

const bgColor = '#F5FCFF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
})

export default class EntryScreen extends React.Component {

  move = () => {
    const { navigation } = this.props
    navigation.navigate('Login')
  }

  render () {

    return (
      <View style={styles.container}>
        <View>
          <Button small iconRight  transparent primary onPress={this.move}>
            <Text style={styles.beer}>ログイン</Text>
          </Button>
        </View>
      </View>
    )
  }
}
