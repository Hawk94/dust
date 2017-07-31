import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import InstructionSaga from './instructions/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    InstructionSaga(),
  ]
}
