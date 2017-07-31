import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import InstructionSaga from './instructions/sagas'
import SalesforceSaga from './salesforce/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    SalesforceSaga(),
    InstructionSaga(),
  ]
}
