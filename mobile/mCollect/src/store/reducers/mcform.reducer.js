import {
  FETCH_SERVICES_LOADING,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR,
  CREATE_DEMAND_PENDING,
  CREATE_DEMAND_SUCCESS,
  CREATE_DEMAND_ERROR,
  CLEAR_DEMAND,
  FETCH_MOHALLA_LOADING,
  FETCH_MOHALLA_SUCCESS,
  FETCH_MOHALLA_ERROR,
  CREATE_CHALLAN_PENDING,
  CREATE_CHALLAN_SUCCESS,
  CREATE_CHALLAN_ERROR,
  CLEAR_CHALLAN,
} from '../actions/mcform.actions';

const initialState = {
  loading: false,
  services: {},
  mohallaData:{},
  challans:{},
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

      case FETCH_MOHALLA_LOADING:
        return {
          ...state,
          loading: true,
        };
      case FETCH_MOHALLA_SUCCESS:
        return {
          ...state,
          loading: false,
          mohallaData: action.mohallaData,
        };
      case FETCH_MOHALLA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
        case CREATE_CHALLAN_PENDING:
          return {
            ...state,
            loading: true,
          };
        case CREATE_CHALLAN_SUCCESS:
          return {
            ...state,
            loading: false,
            challans: action.challans,
            error: {},
          };
        case CREATE_CHALLAN_ERROR:
          return {
            ...state,
            loading: false,
            challans: {},
            error: action.error,
          };
        case CLEAR_CHALLAN:
          return {
            ...state,
            loading: false,
            challans: {},
            error: null,
          };
    default:
      return state;
  }
};
