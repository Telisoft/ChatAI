import { all, call, fork, put, takeEvery } from "redux-saga/effects";
// Login Redux States
import { ChatsActionTypes } from "./types";
//actions
import {
  chatsApiResponseError,
  chatsApiResponseSuccess,
  getChannels as getChannelsAction,
  getDirectMessages as getDirectMessagesAction,
  getFavourites as getFavouritesAction,
} from "./actions";

import {
  addContacts as addContactsApi,
  addConversation as addConversationApi,
  createChannel as createChannelApi,
  deleteImage as deleteImageApi,
  deleteMessage as deleteMessageApi,
  deleteUserMessages as deleteUserMessagesApi,
  forwardMessage as forwardMessageApi,
  getArchiveContact as getArchiveContactApi,
  getChannelDetails as getChannelDetailsApi,
  getChannels as getChannelsApi,
  getChatUserConversations as getChatUserConversationsApi,
  getChatUserDetails as getChatUserDetailsApi,
  getDirectMessages as getDirectMessagesApi,
  getFavourites as getFavouritesApi,
  readConversation as readConversationApi,
  readMessage as readMessageApi,
  receiveMessage as receiveMessageApi,
  receiveMessageFromUser as receiveMessageFromUserApi,
  sendMessage,
  sendMessageBackend,
  sendSMS,
  toggleArchiveContact as toggleArchiveContactApi,
  toggleFavouriteContact as toggleFavouriteContactApi
} from "../../api/index";

import { showErrorNotification, showSuccessNotification } from "../../helpers/notifications";

function* getFavourites() {
  try {
    const response: Promise<any> = yield call(getFavouritesApi);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.GET_FAVOURITES, response)
    );
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.GET_FAVOURITES, error));
  }
}

function* getDirectMessages() {
  try {
    const response: Promise<any> = yield call(getDirectMessagesApi);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.GET_DIRECT_MESSAGES, response)
    );
  } catch (error: any) {
    yield put(
      chatsApiResponseError(ChatsActionTypes.GET_DIRECT_MESSAGES, error)
    );
  }
}

function* getChannels() {
  try {
    const response: Promise<any> = yield call(getChannelsApi);
    yield put(chatsApiResponseSuccess(ChatsActionTypes.GET_CHANNELS, response));
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.GET_CHANNELS, error));
  }
}

function* addContacts({ payload: contacts }: any) {
  try {
    const response: Promise<any> = yield call(addContactsApi, contacts);
    yield put(chatsApiResponseSuccess(ChatsActionTypes.ADD_CONTACTS, response));
    yield call(showSuccessNotification, response + "");

  } catch (error: any) {
    yield call(showErrorNotification, error);
    yield put(chatsApiResponseError(ChatsActionTypes.ADD_CONTACTS, error));
  }
}

function* addConversation({ payload: conversation }: any) {
  try {
    const response: Promise<any> = yield call(addConversationApi, conversation);
    yield put(chatsApiResponseSuccess(ChatsActionTypes.ADD_CONVERSATION, response));
    yield call(showSuccessNotification, response + "");
    yield put({type: ChatsActionTypes.GET_DIRECT_MESSAGES});
  } catch (error: any) {
    yield call(showErrorNotification, error);
    yield put(chatsApiResponseError(ChatsActionTypes.ADD_CONVERSATION, error));
  }
}

function* createChannel({ payload: channelData }: any) {
  try {
    const response: Promise<any> = yield call(createChannelApi, channelData);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.CREATE_CHANNEL, response)
    );
    yield call(showSuccessNotification, response + "");
  } catch (error: any) {
    yield call(showErrorNotification, error);
    yield put(chatsApiResponseError(ChatsActionTypes.CREATE_CHANNEL, error));
  }
}

function* getChatUserDetails({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(getChatUserDetailsApi, id);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.GET_CHAT_USER_DETAILS, response)
    );
  } catch (error: any) {
    console.log('detailsuer: error');
    yield put(
      chatsApiResponseError(ChatsActionTypes.GET_CHAT_USER_DETAILS, error)
    );
  }
}

function* getChatUserConversations({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(getChatUserConversationsApi, id);
    yield put(
      chatsApiResponseSuccess(
        ChatsActionTypes.GET_CHAT_USER_CONVERSATIONS,
        response
      )
    );
  } catch (error: any) {
    console.log('error');
    yield put(
      chatsApiResponseError(ChatsActionTypes.GET_CHAT_USER_CONVERSATIONS, error)
    );
  }
}

function* onSendMessage({ payload: data }: any) {
  try {
    console.log('data:', data);
    const response: Promise<any> = yield call(sendMessage, data);
    console.log('response:', response)
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.ON_SEND_MESSAGE, response)
    );
  } catch (error: any) {
    console.log('error:', error);
    yield put(chatsApiResponseError(ChatsActionTypes.ON_SEND_MESSAGE, error));
  }
}

function* onSendSMS({ payload: data }: any) {
  try {
    const response: string = yield call(sendSMS, { data });

    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.ON_SEND_SMS, response)
    );
  } catch (error: any) {
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.ON_SEND_SMS, error)
    );
  }
}

function* onSendMessageBackend({ payload: data }: any) {
  try {
    const response: string = yield call(sendMessageBackend, { data });

    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.ON_SEND_MESSAGE_TO_AI, response)
    );
  } catch (error: any) {
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.ON_SEND_MESSAGE_TO_AI, error)
    );
  }
}

function* receiveMessage({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(receiveMessageApi, id);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.RECEIVE_MESSAGE, response)
    );
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.RECEIVE_MESSAGE, error));
  }
}

function* readMessage({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(readMessageApi, id);
    yield put(chatsApiResponseSuccess(ChatsActionTypes.READ_MESSAGE, response));
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.READ_MESSAGE, error));
  }
}

function* receiveMessageFromUser({ payload: { id, text } }: any) {
  try {
    const response: Promise<any> = yield call(receiveMessageFromUserApi, id, text.bot);
    yield put(
      chatsApiResponseSuccess(
        ChatsActionTypes.RECEIVE_MESSAGE_FROM_USER,
        response
      )
    );
  } catch (error: any) {
    yield put(
      chatsApiResponseError(ChatsActionTypes.RECEIVE_MESSAGE_FROM_USER, error)
    );
  }
}

function* deleteMessage({ payload: { userId, messageId } }: any) {
  try {
    const response: Promise<any> = yield call(
      deleteMessageApi,
      userId,
      messageId
    );
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.DELETE_MESSAGE, response)
    );
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.DELETE_MESSAGE, error));
  }
}

function* forwardMessage({ payload: data }: any) {
  try {
    const response: Promise<any> = yield call(forwardMessageApi, data);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.FORWARD_MESSAGE, response)
    );
    yield call(showSuccessNotification, response + "");
  } catch (error: any) {
    yield call(showErrorNotification, error + "");
    yield put(chatsApiResponseError(ChatsActionTypes.FORWARD_MESSAGE, error));
  }
}

function* deleteUserMessages({ payload: conversationId }: any) {
  try {
    const response: Promise<any> = yield call(deleteUserMessagesApi, conversationId);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.DELETE_USER_MESSAGES, response)
    );
    yield put({type: ChatsActionTypes.GET_DIRECT_MESSAGES});
    yield call(showSuccessNotification, "Success");
  } catch (error: any) {
    yield call(showErrorNotification, error + "");
    yield put(
      chatsApiResponseError(ChatsActionTypes.DELETE_USER_MESSAGES, error)
    );
  }
}

function* getChannelDetails({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(getChannelDetailsApi, id);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.GET_CHANNEL_DETAILS, response)
    );
  } catch (error: any) {
    yield put(
      chatsApiResponseError(ChatsActionTypes.GET_CHANNEL_DETAILS, error)
    );
  }
}

function* toggleFavouriteContact({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(toggleFavouriteContactApi, id);
    yield put(
      chatsApiResponseSuccess(
        ChatsActionTypes.TOGGLE_FAVOURITE_CONTACT,
        response
      )
    );
    yield call(showSuccessNotification, response + "");
  } catch (error: any) {
    yield call(showErrorNotification, error + "");
    yield put(
      chatsApiResponseError(ChatsActionTypes.TOGGLE_FAVOURITE_CONTACT, error)
    );
  }
}

function* getArchiveContact() {
  try {
    const response: Promise<any> = yield call(getArchiveContactApi);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.GET_ARCHIVE_CONTACT, response)
    );
  } catch (error: any) {
    yield put(
      chatsApiResponseError(ChatsActionTypes.GET_ARCHIVE_CONTACT, error)
    );
  }
}

function* toggleArchiveContact({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(toggleArchiveContactApi, id);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.TOGGLE_ARCHIVE_CONTACT, response)
    );
    yield call(showSuccessNotification, response + "");
  } catch (error: any) {
    yield call(showErrorNotification, error + "");
    yield put(
      chatsApiResponseError(ChatsActionTypes.TOGGLE_ARCHIVE_CONTACT, error)
    );
  }
}

function* readConversation({ payload: id }: any) {
  try {
    const response: Promise<any> = yield call(readConversationApi, id);
    yield put(
      chatsApiResponseSuccess(ChatsActionTypes.READ_CONVERSATION, response)
    );
    yield put(getDirectMessagesAction());
    yield put(getFavouritesAction());
    yield put(getChannelsAction());
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.READ_CONVERSATION, error));
  }
}

function* deleteImage({ payload: { userId, messageId, imageId } }: any) {
  try {
    const response: Promise<any> = yield call(
      deleteImageApi,
      userId,
      messageId,
      imageId
    );
    yield put(chatsApiResponseSuccess(ChatsActionTypes.DELETE_IMAGE, response));
  } catch (error: any) {
    yield put(chatsApiResponseError(ChatsActionTypes.DELETE_IMAGE, error));
  }
}

export function* watchGetFavourites() {
  yield takeEvery(ChatsActionTypes.GET_FAVOURITES, getFavourites);
}

export function* watchGetDirectMessages() {
  yield takeEvery(ChatsActionTypes.GET_DIRECT_MESSAGES, getDirectMessages);
}
export function* watchGetChannels() {
  yield takeEvery(ChatsActionTypes.GET_CHANNELS, getChannels);
}
export function* watchAddContacts() {
  yield takeEvery(ChatsActionTypes.ADD_CONTACTS, addContacts);
}
export function* watchAddConversation() {
  yield takeEvery(ChatsActionTypes.ADD_CONVERSATION, addConversation);
}
export function* watchCreateChannel() {
  yield takeEvery(ChatsActionTypes.CREATE_CHANNEL, createChannel);
}
export function* watchGetChatUserDetails() {
  yield takeEvery(ChatsActionTypes.GET_CHAT_USER_DETAILS, getChatUserDetails);
}
export function* watchGetChatUserConversations() {
  yield takeEvery(
    ChatsActionTypes.GET_CHAT_USER_CONVERSATIONS,
    getChatUserConversations
  );
}
export function* watchOnSendMessage() {
  yield takeEvery(ChatsActionTypes.ON_SEND_MESSAGE, onSendMessage);
}

export function* watchOnSendMessageBackend() {
  yield takeEvery(ChatsActionTypes.ON_SEND_MESSAGE_TO_AI, onSendMessageBackend);
}

export function* watchOnSendSMS() {
  yield takeEvery(ChatsActionTypes.ON_SEND_SMS, onSendSMS);
}

export function* watchReceiveMessage() {
  yield takeEvery(ChatsActionTypes.RECEIVE_MESSAGE, receiveMessage);
}
export function* watchReadMessage() {
  yield takeEvery(ChatsActionTypes.READ_MESSAGE, readMessage);
}
export function* watchReceiveMessageFromUser() {
  yield takeEvery(
    ChatsActionTypes.RECEIVE_MESSAGE_FROM_USER,
    receiveMessageFromUser
  );
}
export function* watchDeleteMessage() {
  yield takeEvery(ChatsActionTypes.DELETE_MESSAGE, deleteMessage);
}
export function* watchForwardMessage() {
  yield takeEvery(ChatsActionTypes.FORWARD_MESSAGE, forwardMessage);
}
export function* watchDeleteUserMessages() {
  yield takeEvery(ChatsActionTypes.DELETE_USER_MESSAGES, deleteUserMessages);
}
export function* watchGetChannelDetails() {
  yield takeEvery(ChatsActionTypes.GET_CHANNEL_DETAILS, getChannelDetails);
}
export function* watchToggleFavouriteContact() {
  yield takeEvery(
    ChatsActionTypes.TOGGLE_FAVOURITE_CONTACT,
    toggleFavouriteContact
  );
}
export function* watchGetArchiveContact() {
  yield takeEvery(ChatsActionTypes.GET_ARCHIVE_CONTACT, getArchiveContact);
}
export function* watchToggleArchiveContact() {
  yield takeEvery(
    ChatsActionTypes.TOGGLE_ARCHIVE_CONTACT,
    toggleArchiveContact
  );
}
export function* watchReadConversation() {
  yield takeEvery(ChatsActionTypes.READ_CONVERSATION, readConversation);
}
export function* watchDeleteImage() {
  yield takeEvery(ChatsActionTypes.DELETE_IMAGE, deleteImage);
}

function* chatsSaga() {
  yield all([
    fork(watchGetFavourites),
    fork(watchGetDirectMessages),
    fork(watchGetChannels),
    fork(watchAddContacts),
    fork(watchAddConversation),
    fork(watchCreateChannel),
    fork(watchGetChatUserDetails),
    fork(watchGetChatUserConversations),
    fork(watchOnSendMessage),
    fork(watchOnSendSMS),
    fork(watchOnSendMessageBackend),
    fork(watchReceiveMessage),
    fork(watchReadMessage),
    fork(watchReceiveMessageFromUser),
    fork(watchDeleteMessage),
    fork(watchForwardMessage),
    fork(watchDeleteUserMessages),
    fork(watchGetChannelDetails),
    fork(watchToggleFavouriteContact),
    fork(watchGetArchiveContact),
    fork(watchToggleArchiveContact),
    fork(watchReadConversation),
    fork(watchDeleteImage),
  ]);
}

export default chatsSaga;
