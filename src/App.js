/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, View } from 'react-native'
import { Text, Thumbnail, Icon, Button } from 'native-base'
import { load } from './modules/user'

const instructions = Platform.select({
  ios: 'ios',
  android: 'android',
})

const bgColor = '#F5FCFF'
const iconColor = '#aaaa00'

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
  beer: {
    marginLeft: -25,
  },
})

@connect(
state => ({
  user: state.user.user,
}),
{load})
export default class App extends React.Component {
  state = {count: 0}

  componentDidMount () {
    this.props.load()
  }

  render () {
    const { user } = this.props
    const { count } = this.state

    return (
      <View style={styles.container}>
        {user &&
          <View style={styles.content}>
            <Thumbnail source={{uri: user.picture.large}} />
            <View>
              <Text>名前: {user.name.last} {user.name.first}</Text>
              <Text>性別: {user.gender}</Text>
              <Text>プラットフォーム: {instructions}</Text>
              <Button small iconRight  transparent primary onPress={() => this.setState({count: count + 1})}>
                <Icon type='Ionicons' name='md-beer' style={{color: iconColor}}/>
                <Text style={styles.beer}>{count}</Text>
              </Button>
            </View>
          </View>
        }
      </View>
    )
  }
}
