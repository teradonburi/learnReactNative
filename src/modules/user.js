const LOAD = 'user/LOAD'
const UPDATE = 'user/UPDATE'

const initData = {
  user: null,
  email: null,
}

export default function reducer(state = initData, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        user: action.user || state.user,
      }
    case UPDATE:
      return {
        ...state,
        email: action.email || state.email,
      }
    default:
      return state
  }
}

export function load() {
  return (dispatch, getState, client) => {
    return client
      .get('https://randomuser.me/api/')
      .then(res => res.data)
      .then(user => {
        dispatch({type: LOAD, user: user.results[0]})
        return user
      })
  }
}

export function update(email) {
  return (dispatch) => {
    dispatch({type: UPDATE, email})
    return Promise.resolve(email)
  }
}
