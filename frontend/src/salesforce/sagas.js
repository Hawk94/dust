import { call, takeLatest } from 'redux-saga/effects'
import ClientOAuth2 from 'client-oauth2'
import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_CREATING,
} from './constants'


const salesforceBaseUrl = process.env.REACT_APP_SALESFORCE_BASE_URL
const salesforceClientId = process.env.REACT_APP_SALESFORCE_CONSUMER_KEY
const salesforceClientSecret = process.env.REACT_APP_SALESFORCE_CONSUMER_SECRET

function salesforceAuthRequestApi () {

  const salesforceAuth = new ClientOAuth2({
    clientId: salesforceClientId,
    clientSecret: salesforceClientSecret,
    accessTokenUri: `${salesforceBaseUrl}/token`,
    authorizationUri: `${salesforceBaseUrl}/authorize`,
    redirectUri: 'https://dust-prod.herokuapp.com/salesforce/callback',
  })

  const auth_url = salesforceAuth.code.getUri()
  
  window.location.href = auth_url
}

function salesforceAuthCreateApi () {

  const salesforceAuth = new ClientOAuth2({
    clientId: salesforceClientId,
    clientSecret: salesforceClientSecret,
    accessTokenUri: `${salesforceBaseUrl}/token`,
    authorizationUri: `${salesforceBaseUrl}/authorize`,
    redirectUri: 'https://dust-prod.herokuapp.com/salesforce/callback',
  })
  const callbackUrl = window.location.href
  const access_token = salesforceAuth.code.getToken(callbackUrl)
  console.log(access_token)
}

function* salesforceAuthRequestFlow (action) {
    yield call(salesforceAuthRequestApi)
}

function* salesforceAuthCreateFlow (action) {
    yield call(salesforceAuthCreateApi)
}

function* salesforceAuthWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(SALESFORCE_AUTH_CREATING, salesforceAuthCreateFlow),
    takeLatest(SALESFORCE_AUTH_REQUESTING, salesforceAuthRequestFlow),
  ]
}

export default salesforceAuthWatcher
