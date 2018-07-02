/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, View } from 'react-native'
import { Text, Thumbnail } from 'native-base'
import { load } from './modules/user'

const instructions = Platform.select({
  ios: 'ios',
  android: 'android',
})

const bgColor = '#F5FCFF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

@connect(
state => ({
  user: state.user.user,
}),
{load})
export default class App extends React.Component {

  componentDidMount () {
    this.props.load()
  }

  render () {
    const { user } = this.props
    console.log(user)
    return (
      <View style={styles.container}>
        {user &&
          <View style={styles.content}>
            <Thumbnail source={{uri: user.picture.large}} />
            <View>
              <Text>名前: {user.name.last} {user.name.first}</Text>
              <Text>性別: {user.gender}</Text>
              <Text>プラットフォーム: {instructions}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}
