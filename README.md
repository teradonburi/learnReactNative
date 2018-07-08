# jest
[Jest](https://jestjs.io/docs/ja/tutorial-react-native)はJavaScriptのテストフレームワークです。  
特にReact DOMツリーのテストもできるフレームワークです。(React以外のJavaScriptフレームワークでも使える)  
jest用のeslintプラグインとjestテスト用のredux-mock-storeが必要なため、
次のパッケージを追加します。  

```
$ yarn add --dev eslint-plugin-jest redux-mock-store
```

jestコマンドが使えるようにjestをglobalインストールします。 

```
$ yarn global add jest
```

jestテスト用にnative-baseは自動変換されないようにpackage.jsonを変更します。  

```
  "jest": {
    "preset": "react-native",
    "transformIgnorePatterns": [
      "/node_modules/(?!native-base)/"
    ]
  }
```

testフォルダを作成します。  
.eslintrc.jsをコピーしてjestテスト用の.eslintrc.jsを作成し、testフォルダ以下に置きます。  
extendsに`'plugin:jest/recommended'`、pluginsに`'jest'`を追加します。  

```
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all', 'plugin:jest/recommended'],
  'plugins': [
    'react',
    'react-native',
    'jest',
  ],
```

test.jsを作成します。  
[UIのスナップショットテスト](https://jestjs.io/docs/ja/snapshot-testing)を行います。  

```test.js
import React from 'react'
import EntryScreen from '../src/screens/EntryScreen'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureStore([])

describe('EntryScreen', () => {

  // redux-mock-storeの初期化
  const initialState = {}
  const store = mockStore(initialState)

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EntryScreen />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

`yarn test`でテストを実行すると、test/__snapshots__フォルダが作成されます。  

```
$ yarn test
yarn run v1.7.0
$ jest
 PASS  test/test.js
  EntryScreen
    ✓ renders correctly (66ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        1.77s, estimated 2s
Ran all test suites.
✨  Done in 2.42s.
```

EntryScreen.jsのrenderの一部を次のように変更します。  

```
<FooterTab>
  <Button full onPress={handleSubmit(this.submit)}><Text>前へ</Text></Button>
  <Button full onPress={handleSubmit(this.submit)}><Text>次へ</Text></Button>
</FooterTab>
```

再びtestを行うとスナップショットからの変更が検知されてエラーとなります。  

```
$ yarn test
yarn run v1.7.0
$ jest
 FAIL  test/test.js
  EntryScreen
    ✕ renders correctly (81ms)

  ● EntryScreen › renders correctly

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "EntryScreen renders correctly 1".

    - Snapshot
    + Received

    @@ -297,10 +297,67 @@
                    "paddingRight": 16,
                  }
                }
                uppercase={false}
              >
    +           前へ
    +         </Text>
    +       </View>
    +       <View
    +         accessible={true}
    +         isTVSelectable={true}
    +         onResponderGrant={[Function]}
    +         onResponderMove={[Function]}
    +         onResponderRelease={[Function]}
    +         onResponderTerminate={[Function]}
    +         onResponderTerminationRequest={[Function]}
    +         onStartShouldSetResponder={[Function]}
    +         style={
    +           Object {
    +             "alignItems": "center",
    +             "alignSelf": "stretch",
    +             "backgroundColor": "transparent",
    +             "borderBottomWidth": null,
    +             "borderColor": null,
    +             "borderLeftWidth": null,
    +             "borderRadius": 0,
    +             "borderRightWidth": null,
    +             "borderTopWidth": null,
    +             "elevation": 0,
    +             "flex": 1,
    +             "flexDirection": null,
    +             "height": 55,
    +             "justifyContent": "center",
    +             "opacity": 1,
    +             "paddingBottom": 6,
    +             "paddingTop": 6,
    +             "shadowColor": null,
    +             "shadowOffset": null,
    +             "shadowOpacity": null,
    +             "shadowRadius": null,
    +           }
    +         }
    +       >
    +         <Text
    +           accessible={true}
    +           allowFontScaling={true}
    +           ellipsizeMode="tail"
    +           style={
    +             Object {
    +               "backgroundColor": "transparent",
    +               "color": "#6b6b6b",
    +               "fontFamily": "System",
    +               "fontSize": 14,
    +               "lineHeight": 16,
    +               "marginLeft": 0,
    +               "marginRight": 0,
    +               "paddingLeft": 16,
    +               "paddingRight": 16,
    +             }
    +           }
    +           uppercase={false}
    +         >
                次へ
              </Text>
            </View>
          </View>
        </View>

      21 |       )
      22 |       .toJSON()
    > 23 |     expect(tree).toMatchSnapshot()
         |                  ^
      24 |   })
      25 | 
      26 | })

      at Object.<anonymous> (test/test.js:23:18)

 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `yarn test -u` to update them.

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   1 failed, 1 total
Time:        3.885s
Ran all test suites.
```

問題がない場合は、次のjestコマンドでスナップショットを更新します。  

```
$ jest --updateSnapshot
```