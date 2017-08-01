import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_REQUEST_SUCCESS,
  SALESFORCE_AUTH_CREATING,
  SALESFORCE_AUTH_REQUEST_ERROR,
} from './constants'

export const salesforceAuthRequest = function salesforceAuthRequest () {
  return {
    type: SALESFORCE_AUTH_REQUESTING,
  }
}

export const salesforceAuthSuccess = function salesforceAuthSuccess (response_url) {
  return {
    type: SALESFORCE_AUTH_REQUEST_SUCCESS,
    response_url,
  }
}

export const salesforceAuthError = function salesforceAuthError (error) {
  return {
    type: SALESFORCE_AUTH_REQUEST_ERROR,
    error,
  }
}

export const salesforceAuthCreate = function salesforceAuthCreate () {
  return {
    type: SALESFORCE_AUTH_CREATING,
  }
}