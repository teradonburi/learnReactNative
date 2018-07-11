import React from 'react'
import EntryScreen from '../src/screens/EntryScreen'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'


const mockStore = configureStore([])

describe('EntryScreen', () => {

  // redux-mock-storeの初期化
  const initialState = {
    user: {
      email: null,
    },
  }
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