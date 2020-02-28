import {
  FETCH_SERVICES_LOADING,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR,
  CREATE_DEMAND_PENDING,
  CREATE_DEMAND_SUCCESS,
  CREATE_DEMAND_ERROR,
  CLEAR_DEMAND,
} from '../actions/mcform.actions';

const initialState = {
  loading: false,
  services: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.services,
      };
    case FETCH_SERVICES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_DEMAND_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DEMAND_SUCCESS:
      return {
        ...state,
        loading: false,
        demand: action.demand,
        error: {},
      };
    case CREATE_DEMAND_ERROR:
      return {
        ...state,
        loading: false,
        demand: {},
        error: action.error,
      };
    case CLEAR_DEMAND:
      return {
        ...state,
        loading: false,
        demand: {},
        error: null,
      };
    default:
      return state;
  }
};
