import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_REQUEST_SUCCESS,
  SALESFORCE_AUTH_REQUEST_ERROR,
} from './constants'

export const salesforceAuthRequest = function salesforceAuthRequest (client) {
  return {
    type: SALESFORCE_AUTH_REQUESTING,
    client,
  }
}

export const salesforceAuthSuccess = function salesforceAuthSuccess (response_url) {
  return {
    type: SALESFORCE_AUTH_SUCCESS,
    auth_token,
  }
}

export const salesforceAuthError = function salesforceAuthError (error) {
  return {
    type: SALESFORCE_AUTH_ERROR,
    error,
  }
}