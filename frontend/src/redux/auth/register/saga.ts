import { all, call, fork, put, takeEvery } from "redux-saga/effects";
//Account Redux states
import { AuthRegisterActionTypes } from "./types";
import { authRegisterApiResponseError, authRegisterApiResponseSuccess } from "./actions";
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postJwtRegister } from "../../../api/index";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }: any) {
  try {
    const response: Promise<any> = yield call(postJwtRegister, user);
    yield put(
      authRegisterApiResponseSuccess(
        AuthRegisterActionTypes.REGISTER_USER,
        response
      )
    );
  } catch (error: any) {
    yield put(
      authRegisterApiResponseError(AuthRegisterActionTypes.REGISTER_USER, error)
    );
  }
}

export function* watchUserRegister() {
  yield takeEvery(AuthRegisterActionTypes.REGISTER_USER, registerUser);
}

function* registerSaga() {
  yield all([fork(watchUserRegister)]);
}

export default registerSaga;
