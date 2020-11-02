import {
  FETCH_TENANTS_PENDING,
  FETCH_TENANTS_SUCCESS,
  FETCH_TENANTS_ERROR,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../actions/login.actions';

const initialState = {
  pending: false,
  tenants: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TENANTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_TENANTS_SUCCESS:
      return {
        ...state,
        pending: false,
        tenants: action.tenants,
      };
    case FETCH_TENANTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case LOGIN_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};
