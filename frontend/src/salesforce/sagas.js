import { call, takeLatest } from 'redux-saga/effects'
import ClientOAuth2 from 'client-oauth2'
import {
  SALESFORCE_AUTH_REQUESTING,
} from './constants'


const salesforceBaseUrl = 'https://login.salesforce.com/services/oauth2'
const salesforceClientId = '3MVG9HxRZv05HarTjaBsVsAdUpMqF_H8JHj6Nl.I0D5bPT_9tuN.tuBQqy.UyGJXIjpl3KhW7OQaKdZHBvbwp'
const salesforceClientSecret = '4580346374068532671'

function salesforceAuthRequestApi () {

  
  console.log(salesforceBaseUrl)

  const salesforceAuth = new ClientOAuth2({
    clientId: salesforceClientId,
    clientSecret: salesforceClientSecret,
    accessTokenUri: `${salesforceBaseUrl}/token`,
    authorizationUri: `${salesforceBaseUrl}/authorize`,
    redirectUri: 'http://dust-prod.herokuapp.com/auth/salesforce/callback',
  })

  const auth_url = salesforceAuth.code.getUri()
  
  console.log(salesforceAuth)
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
