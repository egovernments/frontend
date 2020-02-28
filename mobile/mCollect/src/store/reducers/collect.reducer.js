import {
  FETCH_BILL_LOADING,
  FETCH_BILL_SUCCESS,
  FETCH_BILL_ERROR,
  CREATE_PAYMENT_PENDING,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR,
  CLEAR_PAYMENT,
} from '../actions/collect.actions';

const initialState = {
  loading: false,
  bill: {},
  payment: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        bill: action.bill,
      };
    case FETCH_BILL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_PAYMENT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payment,
        error: {},
      };
    case CREATE_PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        payment: {},
        error: action.error,
      };
    case CLEAR_PAYMENT:
      return {
        ...state,
        loading: false,
        bill: {},
        payment: {},
        error: null,
      };
    default:
      return state;
  }
};
