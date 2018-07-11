# react-navigation
react-navigationを使うと画面遷移ができます。  

```
$ yarn add react-navigation
```

App.jsにルーティング設定を記述します。  
後述のEntryScreen画面（Component）とUserScreen画面(Component)を  
createStackNavigatorにて指定し、Navigation Componentを作成します。  
headerオプションをnullにすることでreact-navigationのNavigationBarを非表示にできます。(NativeBaseの方で表示するため)  
initialRouteNameには初期画面を指定します。  

```App.js
import React from 'react'
import { createStackNavigator } from 'react-navigation'
// react-nativeの警告を非表示にする
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

// 画面を読み込み
import EntryScreen from './screens/EntryScreen'
import UserScreen from './screens/UserScreen'


// ルーティングする画面を定義
export const Navigation = createStackNavigator({
  Entry: { screen: EntryScreen, navigationOptions: { header: null } },
  User: { screen: UserScreen, navigationOptions: { header: null }},
}, {initialRouteName: 'Entry'})


export const App = () => (
  <Navigation />
)
```

EntryScreen.jsを作成します。  
Navigation Componentでwrapされているため、  
navigation propsが参照できます。  
実際に遷移しているのは`navigation.navigate('User')`の箇所です。  

```EntryScreen.js
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
    navigation.navigate('User')
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
```

![EntryScreen](./docs/EntryScreen.png)


UserScreen画面です。  
`navigation.goBack()`で前の画面に遷移できます。  

```UserScreen.js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, View } from 'react-native'
import { Text, Thumbnail, Icon, Button, Container, Header, Content, Title, Body, Left, Right, Card } from 'native-base'
import { load } from '../modules/user'

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

const HeaderBackButton = ({onPress}) => (
  <Left>
    <Button transparent>
      <Icon name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'arrow-back'} onPress={onPress} />
    </Button>
  </Left>
)

@connect(
state => ({
  user: state.user.user,
}),
{load})
export default class UserScreen extends React.Component {
  state = {count: 0}

  componentDidMount () {
    this.props.load()
  }

  render () {
    const { user, navigation } = this.props
    const { count } = this.state

    return (
       <Container>
        <Header>
          <HeaderBackButton onPress={() => navigation.goBack()} />
          <Body>
            <Title>ユーザ</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card style={styles.container}>
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
          </Card>
        </Content>
      </Container>
    )
  }
}
```

![UserScreen](./docs/UserScreen.png)