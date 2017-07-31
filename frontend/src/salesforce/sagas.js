salesforceAuthimport { call, put, takeLatest } from 'redux-saga/effects'
import ClientOAuth2 from 'client-oauth2'
import { handleApiErrors } from '../lib/api-errors'
import {
  SALESFORCE_AUTH_CREATING,
  SALESFORCE_AUTH_REQUESTING,
} from './constants'

import {
  salesforceAuthCreateSuccess,
  salesforceAuthCreateError,
  salesforceAuthRequestSuccess,
  salesforceAuthRequestError,
} from './actions'

const salesforceBaseUrl = `${process.env.SALESFORCE_BASE_URL}`
const salesforceClientId = `${process.env.SALESFORCE_CONSUMER_KEY}`
const salesforceClientSecret = `${process.env.SALESFORCE_CONSUMER_SECRET}`
const salesforceResponseUri = `${process.env.SALESFORCE_RESPONSE_URI}`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function salesforceAuthRequestApi (client) {
  var salesforceAuth = new ClientOAuth2({
    clientId: salesforceAuthUrl,
    clientSecret: salesforceClientSecret,
    accessTokenUri: `${SalesforceBaseuUrl}/token`,
    authorizationUri: `${SalesforceBaseuUrl}/authorize`,
    redirectUri: 'http://dust-prod.herokuapp.com/auth/salesforce/callback',
  })

  const auth_url = `${instructionsUrl}/?created_by=${client.id}`

  window.location = auth_url;
}

function* salesforceAuthWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(INSTRUCTION_REQUESTING, instructionRequestFlow),
  ]
}

export default instructionsWatcher
