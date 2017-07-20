import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import InstructionSaga from './dashboard/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    InstructionSaga(),
  ]
}
