import { AuthLoginActionTypes } from './types'
// common success
export const authLoginApiResponseSuccess = (actionType, data) => ({
  type: AuthLoginActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
})

// common error
export const authLoginApiResponseError = (actionType, error) => ({
  type: AuthLoginActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
})

export const loginUser = (data) => {
  return {
    type: AuthLoginActionTypes.LOGIN_USER,
    payload: { data },
  }
}

export const logoutUser = () => {
  return {
    type: AuthLoginActionTypes.LOGOUT_USER,
  }
}
