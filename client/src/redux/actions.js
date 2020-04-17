import { FETCH_CURRENT_USER_REQUEST, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAILURE } from "./actionsTypes";

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
