import {
  INSTRUCTION_CREATING,
  INSTRUCTION_CREATE_SUCCESS,
  INSTRUCTION_CREATE_ERROR,
  INSTRUCTION_REQUESTING,
  INSTRUCTION_REQUEST_SUCCESS,
  INSTRUCTION_REQUEST_ERROR,
} from './constants'

export const instructionCreate = function instructionCreate (client, instruction) {
  return {
    type: INSTRUCTION_CREATING,
    client,
    instruction,
  }
}

export const instructionCreateSuccess = function instructionCreateSuccess (instruction) {
  return {
    type: INSTRUCTION_CREATE_SUCCESS,
    instruction,
  }
}

export const instructionCreateError = function instructionCreateError (error) {
  return {
    type: INSTRUCTION_CREATE_ERROR,
    error,
  }
}

export const instructionRequest = function instructionRequest (client) {
  return {
    type: INSTRUCTION_REQUESTING,
    client,
  }
}

export const instructionRequestSuccess = function instructionRequestSuccess (instructions) {
  return {
    type: INSTRUCTION_REQUEST_SUCCESS,
    instructions,
  }
}

export const instructionRequestError = function instructionRequestError (error) {
  return {
    type: INSTRUCTION_REQUEST_ERROR,
    error,
  }
}
