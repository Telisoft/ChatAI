import { all } from 'redux-saga/effects'
import loginSaga from './auth/login/saga'

export default function* rootSaga() {
  yield all([loginSaga()])
}
