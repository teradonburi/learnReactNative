const LOAD = 'user/LOAD'

const initData = {
  user: null,
}

export default function reducer(state = initData, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        user: action.user || state.user,
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
