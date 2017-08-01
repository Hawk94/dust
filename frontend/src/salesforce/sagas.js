import { call, takeLatest } from 'redux-saga/effects'
import ClientOAuth2 from 'client-oauth2'
import {
  SALESFORCE_AUTH_REQUESTING,
  SALESFORCE_AUTH_CREATING,
} from './constants'


const salesforceBaseUrl = process.env.REACT_APP_SALESFORCE_BASE_URL
const salesforceClientId = process.env.REACT_APP_SALESFORCE_CONSUMER_KEY
const salesforceClientSecret = process.env.REACT_APP_SALESFORCE_CONSUMER_SECRET

function salesforceAuthCreateApi (client, callbackUrl) {

  const salesforceAuth = new ClientOAuth2({
    clientId: salesforceClientId,
    clientSecret: salesforceClientSecret,
    accessTokenUri: `${salesforceBaseUrl}/token`,
    authorizationUri: `${salesforceBaseUrl}/authorize`,
    redirectUri: 'https://dust-prod.herokuapp.com/salesforce/callback',
  })
  
  const access_token = salesforceAuth.code.getToken(callbackUrl)
  console.log(access_token)
  // const url = `${instructionsUrl}/`
  // const request = fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // passes our token as an "Authorization" header in
  //     // every POST request.
  //     Authorization: client.token || undefined, // will throw an error if no login
  //   },
  //   body: JSON.stringify(instruction),
  // })

  // return handleRequest(request)
}

function* salesforceAuthCreateFlow (action) {
  console.log('called')
  const { client, callbackUrl } = action
  yield call(salesforceAuthCreateApi, client, callbackUrl)
}

function salesforceAuthRequestApi () {

  const salesforceAuth = new ClientOAuth2({
    clientId: salesforceClientId,
    clientSecret: salesforceClientSecret,
    accessTokenUri: `${salesforceBaseUrl}/token`,
    authorizationUri: `${salesforceBaseUrl}/authorize`,
    redirectUri: 'https://dust-prod.herokuapp.com/salesforce/callback',
  })
  
  console.log(salesforceAuth)


  const authUrl = salesforceAuth.code.getUri()
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
