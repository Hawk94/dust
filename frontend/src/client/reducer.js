import { CLIENT_SET, CLIENT_UNSET } from './constants'

const initialSate = {
  id: null,
  token: null,
}

const reducer = function clientReducer (state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      return {
        id: action.token.client.id,
        email: action.token.client.email,
        token: action.token.auth_token,
      }

    case CLIENT_UNSET:
      return {
        id: null,
        email: null,
        token: null,
      }

    default:
      return state
  }
}

export default reducer
