import { NEED_FETCHING, FETCHING, FETCH_SUCCESSFUL, FETCH_FAILED } from "../status";
import { FETCH_CURRENT_USER_REQUEST, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAILURE } from "../actionsTypes";

const initialState = {
  data: null,
  error: null,
  status: NEED_FETCHING,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        status: FETCHING,
      };
    
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        status: FETCH_SUCCESSFUL,
        data: action.data,
      }

    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        status: FETCH_FAILED,
        error: action.error,
      }

    default:
      return state;
  } 
}
