import {
  INSTRUCTION_CREATING,
  INSTRUCTION_CREATE_SUCCESS,
  INSTRUCTION_CREATE_ERROR,
  INSTRUCTION_REQUESTING,
  INSTRUCTION_REQUEST_SUCCESS,
  INSTRUCTION_REQUEST_ERROR,
} from './constants'

const initialState = {
  list: [], // where we'll store instructions
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function instructionReducer (state = initialState, action) {
  switch (action.type) {
    case INSTRUCTION_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Instruction: ${action.instruction.name} being created...`,
          time: new Date(),
        }],
        errors: [],
      }

    // On success include the new instruction into our list
    case INSTRUCTION_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.instruction]),
        requesting: false,
        successful: true,
        messages: [{
          body: `Instruction: ${action.instruction.name} awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case INSTRUCTION_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case INSTRUCTION_REQUESTING:
      return {
        ...state, // ensure that we don't erase fetched ones
        requesting: false,
        successful: true,
        messages: [{
          body: 'Fetching instructions...!',
          time: new Date(),
        }],
        errors: [],
      }

    case INSTRUCTION_REQUEST_SUCCESS:
      return {
        list: action.instructions, // replace with fresh list
        requesting: false,
        successful: true,
        messages: [{
          body: 'Instructions awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      }

    case INSTRUCTION_REQUEST_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      }

    default:
      return state
  }
}

export default reducer
