import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import user from './user'

const allReducers = combineReducers({
  form: formReducer,
  user,
})

export default allReducers