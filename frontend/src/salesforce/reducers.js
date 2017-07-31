import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_REQUEST_SUCCESS,
  SALESFORCE_AUTH_REQUEST_ERROR,
} from './constants'

const initialState = {
  auth_token: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function instructionReducer (state = initialState, action) {
  switch (action.type) {
    case SALESFORCE_AUTH_REQUESTING:
      return {
        ...state, // ensure that we don't erase fetched ones
        requesting: false,
        successful: true,
        messages: [{
          body: 'Fetching auth_token...!',
          time: new Date(),
        }],
        errors: [],
      }

    case SALESFORCE_AUTH_REQUEST_SUCCESS:
      return {
        list: action.instructions, // replace with fresh list
        requesting: false,
        successful: true,
        messages: [{
          body: 'Auth token fetched!',
          time: new Date(),
        }],
        errors: [],
      }

    case SALESFORCE_AUTH_REQUEST_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      }

    default:
      return state
  }
}

export default reducer