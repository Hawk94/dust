import {
  SALESFORCE_AUTH_CREATING,
  SALESFORCE_AUTH_CREATE_SUCCESS,
  SALESFORCE_AUTH_CREATE_ERROR,

  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_REQUEST_SUCCESS,
  SALESFORCE_AUTH_REQUEST_ERROR,
} from './constants'

export const salesforceAuthCreate = function salesforceAuthCreate (client, callbackUrl) {
  return {
    type: SALESFORCE_AUTH_CREATING,
    client,
    callbackUrl
  }
}

export const salesforceAuthCreateSuccess = function salesforceAuthCreateSuccess () {
  return {
    type: SALESFORCE_AUTH_CREATE_SUCCESS,
  }
}

export const salesforceAuthCreateError = function salesforceAuthCreateError (error) {
  return {
    type: SALESFORCE_AUTH_CREATE_ERROR,
    error,
  }
}

export const salesforceAuthRequest = function salesforceAuthRequest () {
  return {
    type: SALESFORCE_AUTH_REQUESTING,
  }
}

export const salesforceAuthSuccess = function salesforceAuthSuccess (responseUrl) {
  return {
    type: SALESFORCE_AUTH_REQUEST_SUCCESS,
    responseUrl,
  }
}

export const salesforceAuthError = function salesforceAuthError (error) {
  return {
    type: SALESFORCE_AUTH_REQUEST_ERROR,
    error,
  }
}