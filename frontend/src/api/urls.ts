//auth
export const POST_FAKE_LOGIN = `${process.env.REACT_APP_BACKEND_URL}post-fake-login`;
export const POST_FAKE_JWT_LOGIN = `${process.env.REACT_APP_BACKEND_URL}user/login`;
export const POST_FAKE_PASSWORD_FORGET = `${process.env.REACT_APP_BACKEND_URL}fake-forget-pwd`;
export const POST_FAKE_JWT_PASSWORD_FORGET = `${process.env.REACT_APP_BACKEND_URL}jwt-forget-pwd`;
export const SOCIAL_LOGIN = `${process.env.REACT_APP_BACKEND_URL}social-login`;
export const JWT_REGISTER = `${process.env.REACT_APP_BACKEND_URL}user/register`;
export const POST_FAKE_REGISTER = `${process.env.REACT_APP_BACKEND_URL}post-fake-register`;

export const USER_CHANGE_PASSWORD = `${process.env.REACT_APP_BACKEND_URL}user-change-password`;

// profile & settings
export const GET_PROFILE_DETAILS = `${process.env.REACT_APP_BACKEND_URL}user/profile-details`;
export const GET_USER_SETTINGS = `${process.env.REACT_APP_BACKEND_URL}user/user-settings`;
export const UPDATE_ETTINGS = `${process.env.REACT_APP_BACKEND_URL}update-user-settings`;

// contacts
export const GET_CONTACTS = `${process.env.REACT_APP_BACKEND_URL}user/user-contacts`;
export const INVITE_CONTACT = `${process.env.REACT_APP_BACKEND_URL}invite-contact`;

// calls
export const GET_CALLS_LIST = `${process.env.REACT_APP_BACKEND_URL}user/calls-list`;

// bookmarks
export const GET_BOOKMARKS_LIST = `${process.env.REACT_APP_BACKEND_URL}user/bookmarks-list`;
export const DELETE_BOOKMARK = `${process.env.REACT_APP_BACKEND_URL}bookmarks-delete`;
export const UPDATE_BOOKMARK = `${process.env.REACT_APP_BACKEND_URL}bookmarks-update`;

// chats
export const GET_FAVOURITES = `${process.env.REACT_APP_BACKEND_URL}user/get-favourites`;
export const GET_DIRECT_MESSAGES = `${process.env.REACT_APP_BACKEND_URL}user/get-direct-messages`;
export const GET_CHANNELS = `${process.env.REACT_APP_BACKEND_URL}user/get-channels`;
export const ADD_CONTACTS = `${process.env.REACT_APP_BACKEND_URL}user/add-contact`;
export const CREATE_CHANNEL = `${process.env.REACT_APP_BACKEND_URL}create-channel`;
export const GET_CHAT_USER_DETAILS = `${process.env.REACT_APP_BACKEND_URL}user/get-user-details`;
export const GET_CHAT_USER_CONVERSATIONS = `${process.env.REACT_APP_BACKEND_URL}user/get-user-conversations`;
export const SEND_MESSAGE = `${process.env.REACT_APP_BACKEND_URL}send-message`;
// export const SEND_MESSAGE_BACKEND = `${process.env.REACT_APP_BACKEND_URL}completion`;
export const SEND_MESSAGE_BACKEND = `${process.env.REACT_APP_BACKEND_URL}completion/chat`;
export const RECEIVE_MESSAGE = `${process.env.REACT_APP_BACKEND_URL}receive-message`;
export const READ_MESSAGE = `${process.env.REACT_APP_BACKEND_URL}read-message`;
export const RECEIVE_MESSAGE_FROM_USER = `${process.env.REACT_APP_BACKEND_URL}receive-message-from-user`;
export const DELETE_MESSAGE = `${process.env.REACT_APP_BACKEND_URL}delete-message`;
export const FORWARD_MESSAGE = `${process.env.REACT_APP_BACKEND_URL}forward-message`;
export const DELETE_USER_MESSAGES = `${process.env.REACT_APP_BACKEND_URL}delete-user-messages`;
export const TOGGLE_FAVOURITE_CONTACT = `${process.env.REACT_APP_BACKEND_URL}toggle-favourite-contact`;
export const GET_ARCHIVE_CONTACT = `${process.env.REACT_APP_BACKEND_URL}user/get-archive-contacts`;
export const TOGGLE_ARCHIVE_CONTACT = `${process.env.REACT_APP_BACKEND_URL}toggle-archive-contact`;
export const READ_CONVERSATION = `${process.env.REACT_APP_BACKEND_URL}user/read-conversation`;
export const DELETE_IMAGE = `${process.env.REACT_APP_BACKEND_URL}user-delete-img`;

// groups
export const GET_CHANNEL_DETAILS = `${process.env.REACT_APP_BACKEND_URL}get-channel-details`;
