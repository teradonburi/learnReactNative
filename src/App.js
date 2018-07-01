/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, Image, Text, View } from 'react-native'
import { load } from './modules/user'

const instructions = Platform.select({
  ios: 'ios',
  android: 'android',
})

const bgColor = '#F5FCFF'
const textColor = '#333333'

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
  img: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    margin: 5,
    color: textColor,
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
            <Image source={{uri: user.picture.large}} style={styles.img} />
            <View>
              <Text style={styles.text}>名前: {user.name.last} {user.name.first}</Text>
              <Text style={styles.text}>性別: {user.gender}</Text>
              <Text style={styles.text}>プラットフォーム: {instructions}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}
