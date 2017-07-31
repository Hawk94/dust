import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  INSTRUCTION_CREATING,
  INSTRUCTION_REQUESTING,
} from './constants'

import {
  instructionCreateSuccess,
  instructionCreateError,
  instructionRequestSuccess,
  instructionRequestError,
} from './actions'

const instructionsUrl = `${process.env.REACT_APP_API_URL}/api/v1/instructions`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
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

function* instructionCreateFlow (action) {
  try {
    const { client, instruction } = action
    const createdInstruction = yield call(instructionCreateApi, client, instruction)
    // creates the action with the format of
    // {
    //   type: INSTRUCTION_CREATE_SUCCESS,
    //   instruction,
    // }
    // Which we could do inline here, but again, consistency
    yield put(instructionCreateSuccess(createdInstruction))
  } catch (error) {
    // same with error
    yield put(instructionCreateError(error))
  }
}

function instructionRequestApi (client) {
  const url = `${instructionsUrl}/?created_by=${client.id}`
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // passe our token as an "Authorization" header
      Authorization: client.token || undefined,
    },
  })

  return handleRequest(request)
}

function* instructionRequestFlow (action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our instructionRequestApi function with the client
    const instructions = yield call(instructionRequestApi, client)
    // dispatch the action with our instructions!
    yield put(instructionRequestSuccess(instructions))
  } catch (error) {
    yield put(instructionRequestError(error))
  }
}

function* instructionsWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(INSTRUCTION_CREATING, instructionCreateFlow),
    takeLatest(INSTRUCTION_REQUESTING, instructionRequestFlow),
  ]
}

export default instructionsWatcher
