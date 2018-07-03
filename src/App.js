import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

// 画面を読み込み
import EntryScreen from './screens/EntryScreen'
import UserScreen from './screens/UserScreen'


// ルーティングする画面を定義
export const Navigation = createStackNavigator({
  Entry: { screen: EntryScreen, navigationOptions: { header: null } },
  Login: { screen: UserScreen, navigationOptions: { header: null }},
}, {initialRouteName: 'Entry'})


export const App = () => (
  <Navigation />
)