import { call, takeLatest } from 'redux-saga/effects'
import ClientOAuth2 from 'client-oauth2'
import {
  SALESFORCE_AUTH_REQUESTING,
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
    redirectUri: 'http://dust-prod.herokuapp.com/auth/salesforce/callback',
  })

  const auth_url = salesforceAuth.code.getUri()
  
  window.location.href = auth_url
}

function* salseforceAuthRequestFlow (action) {
    yield call(salesforceAuthRequestApi)
}

function* salesforceAuthWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(SALESFORCE_AUTH_REQUESTING, salseforceAuthRequestFlow),
  ]
}

export default salesforceAuthWatcher
