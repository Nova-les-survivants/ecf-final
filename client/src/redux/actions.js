import { FETCH_CURRENT_USER_REQUEST, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAILURE, RESET_CURRENT_USER } from "./actionsTypes";

export const resetCurrentUser = () => ({
  type: RESET_CURRENT_USER,
});

export const fetchCurrentUserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST,
});

export const fetchCurrentUserSuccess = (data) => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  data,
});

export const fetchCurrentUserFailure = (error) => ({
  type: FETCH_CURRENT_USER_FAILURE,
  error,
});
