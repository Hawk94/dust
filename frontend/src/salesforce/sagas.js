import { call, takeLatest } from 'redux-saga/effects'
import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_CREATING,
} from './constants'


const salesforceBaseUrl = process.env.REACT_APP_SALESFORCE_BASE_URL
const salesforceClientId = process.env.REACT_APP_SALESFORCE_CONSUMER_KEY
const salesforceClientSecret = process.env.REACT_APP_SALESFORCE_CONSUMER_SECRET
const redirectUri = `${process.env.REACT_APP_API_URL}/salesforce/callback`

class accessToken {
  constructor(createdBy, callbackUrl) {
    this.createdBy = createdBy;
    this.callbackUrl = callbackUrl;
  }
}

function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function salesforceAuthCreateApi (client, callbackUrl) {
  const tokensUrl = `${process.env.REACT_APP_API_URL}/api/v1/access_tokens`
  const access_token = accessToken(client.id, callbackUrl)

  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // passes our token as an "Authorization" header in
      // every POST request.
      Authorization: client.token || undefined, // will throw an error if no login
    },
    body: JSON.stringify(access_token),
  })
  
  return handleRequest(request)
}

function instructionCreateApi (client, instruction) {
  instruction.created_by = client.id
  const url = `${instructionsUrl}/`
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // passes our token as an "Authorization" header in
      // every POST request.
      Authorization: client.token || undefined, // will throw an error if no login
    },
    body: JSON.stringify(instruction),
  })

  return handleRequest(request)
}

function* salesforceAuthCreateFlow (action) {
  const { client, callbackUrl } = action
  yield call(salesforceAuthCreateApi, client, callbackUrl)
}

function salesforceAuthRequestApi () {

  const authUrl = `${salesforceBaseUrl}/authorize?response_type=code&client_id=${salesforceClientId}&redirect_uri=${redirectUri}`

  window.location.href = authUrl

}

function* salesforceAuthRequestFlow (action) {
    yield call(salesforceAuthRequestApi)
}

function* salesforceAuthWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(SALESFORCE_AUTH_CREATING, salesforceAuthCreateFlow),
    takeLatest(SALESFORCE_AUTH_REQUESTING, salesforceAuthRequestFlow),
  ]
}

export default salesforceAuthWatcher
