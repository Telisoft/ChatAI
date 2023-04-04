import { all, call, fork, put, takeEvery } from "redux-saga/effects";
//  Redux States
import { ContactsActionTypes } from "./types";
import { contactsApiResponseError, contactsApiResponseSuccess } from "./actions";
// api
import {
  getContacts as getContactsApi,
  inviteContact as inviteContactApi,
  deleteContact as deleteContactApi,

} from "../../api/index";
// helpers
import { showErrorNotification, showSuccessNotification } from "../../helpers/notifications";
import { ChatsActionTypes } from "../chats/types";

function* getContacts({ payload: filters }: any) {
  try {
    const response: Promise<any> = yield call(getContactsApi, filters);
    yield put(
      contactsApiResponseSuccess(ContactsActionTypes.GET_CONTACTS, response)
    );
  } catch (error: any) {
    yield put(
      contactsApiResponseError(ContactsActionTypes.GET_CONTACTS, error)
    );
  }
}

function* deleteContact({ payload: contactId }: any) {
  try {
    const response: Promise<any> = yield call(deleteContactApi, contactId);
    yield put(
      contactsApiResponseSuccess(ContactsActionTypes.GET_CONTACTS, response)
    );
    yield put({type: ContactsActionTypes.GET_CONTACTS});
  } catch (error: any) {
    yield put(
      contactsApiResponseError(ContactsActionTypes.GET_CONTACTS, error)
    );
  }
}


function* inviteContact({ payload: newPassword }: any) {
  try {
    const response: Promise<any> = yield call(inviteContactApi, newPassword);
    yield put(
      contactsApiResponseSuccess(ContactsActionTypes.INVITE_CONTACT, response)
    );

    yield put({type: ContactsActionTypes.GET_CONTACTS});

    console.log(response);
    yield call(showSuccessNotification, response + "");
  } catch (error: any) {
    yield call(showErrorNotification, error);
    yield put(
      contactsApiResponseError(ContactsActionTypes.INVITE_CONTACT, error)
    );
  }
}

export function* watchGetContacts() {
  yield takeEvery(ContactsActionTypes.GET_CONTACTS, getContacts);
}

export function* watchInviteContact() {
  yield takeEvery(ContactsActionTypes.INVITE_CONTACT, inviteContact);
}

export function* watchDeleteContact() {
  yield takeEvery(ContactsActionTypes.DELETE_CONTACT, deleteContact);
}

function* contactsSaga() {
  yield all([
    fork(watchGetContacts),
    fork(watchInviteContact),
    fork(watchDeleteContact),
  ]);
}

export default contactsSaga;
