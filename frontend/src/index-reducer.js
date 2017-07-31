import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import salesforce from './salesforce/reducer'
import instructions from './instructions/reducer'

const IndexReducer = combineReducers({
  signup,
  client,
  login,
  form,
  salesforce,
  instructions,
})

export default IndexReducer
