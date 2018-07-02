import { AppRegistry } from 'react-native'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import client from 'axios'
import allReducers from './src/modules/reducer'
import App from './src/App'
import { StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material'

// TODO: 開発時以外は環境設定で有効にしない
const isDevelopment = true
const reduxCompose = isDevelopment ? composeWithDevTools : compose
// axiosをthunkの追加引数に加える
const thunkWithClient = thunk.withExtraArgument(client)
// redux-thunkをミドルウェアに適用
const store = createStore(allReducers, reduxCompose(applyMiddleware(thunkWithClient)))


// リクエスト共通処理
client.interceptors.request.use(req => {
  // 共通のAPI処理、認証ヘッダー等を付与する
  return req
}, err => Promise.reject(err))

// レスポンス共通処理
client.interceptors.response.use(res => res, err => {
  // 通信キャンセル
  if (client.isCancel(err)) {
    return Promise.reject({code: 999, message: 'cancel'})
  }

  if (err.response.status === 401) {
    // 認証エラーなど
  }
  return Promise.reject(err.response || {})
})


const Application = () => (
  <StyleProvider style={getTheme(material)}>
    <Provider store={store}>
      <App/>
    </Provider>
  </StyleProvider>
)

AppRegistry.registerComponent('learnReactNative', () => Application)
