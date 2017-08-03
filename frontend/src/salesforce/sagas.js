import { call, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_CREATING,
} from './constants'


const salesforceBaseUrl = process.env.REACT_APP_SALESFORCE_BASE_URL
const salesforceClientId = process.env.REACT_APP_SALESFORCE_CONSUMER_KEY
const salesforceClientSecret = process.env.REACT_APP_SALESFORCE_CONSUMER_SECRET
const redirectUri = `${process.env.REACT_APP_API_URL}/salesforce/callback`

function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function salesforceAuthCreateApi (client, callbackUrl) {

  const access_token = callbackUrl.split('code=')[1]
  const url = `${salesforceBaseUrl}/token?code=${access_token}&grant_type=authorization_code&client_id=${salesforceClientId}&client_secret=${salesforceClientSecret}&redirect_uri=${redirectUri}`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: 'no-cors',
  }).then(function(response) {
    console.log(response)
  }
)}

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
