import { call, CallEffect, put, takeEvery, takeLatest } from 'redux-saga/effects'
// Login Redux States
import { AuthLoginActionTypes } from './types'
import { authLoginApiResponseError, authLoginApiResponseSuccess } from './actions'
//Include Both Helper File with needed methods
import { postJwtLogin } from '../../../api'

function* loginUser({ payload: { data } }) {
  try {
    console.log('data:', data)
    const response = yield call(postJwtLogin, {
      phoneNumber: data.phoneNumber,
      password: data.password,
    })

    yield put(authLoginApiResponseSuccess(AuthLoginActionTypes.LOGIN_USER, response))
  } catch (error) {
    yield put(authLoginApiResponseError(AuthLoginActionTypes.LOGIN_USER, error))
  }
}

function* loginSaga() {
  yield takeEvery(AuthLoginActionTypes.LOGIN_USER, loginUser)
}

export default loginSaga
