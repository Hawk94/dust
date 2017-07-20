import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import instructions from './dashboard/reducer'

const IndexReducer = combineReducers({
  signup,
  client,
  login,
  form,
  instructions,
})

export default IndexReducer
