import {
  SALESFORCE_AUTH_CREATING,
  SALESFORCE_AUTH_CREATE_SUCCESS,
  SALESFORCE_AUTH_CREATE_ERROR,
  
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_REQUEST_SUCCESS,
  SALESFORCE_AUTH_REQUEST_ERROR,
} from './constants'

const initialState = {
  auth_token: [],
  requesting: false,
  successful: false,
  creating: false,
  messages: [],
  errors: [],
}

const reducer = function salesforceAuthReducer (state = initialState, action) {
  switch (action.type) {
    case SALESFORCE_AUTH_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Salesforce Auth being created...`,
          time: new Date(),
        }],
        errors: [],
      }

    // On success include the new instruction into our list
    case SALESFORCE_AUTH_CREATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: [{
          body: `Salesforce Auth awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case SALESFORCE_AUTH_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case SALESFORCE_AUTH_REQUESTING:
      return {
        requesting: false,
        successful: true,
        creating: false,
        messages: [{
          body: 'Fetching auth_token...!',
          time: new Date(),
        }],
        errors: [],
      }

    case SALESFORCE_AUTH_REQUEST_SUCCESS:
      return {
        requesting: false,
        successful: true,
        creating: false,
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
        creating: false,
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