import * as actionTypes from "./actionTypes";
import { transformById, getTransformedDropdown } from "ui-utils/commons";


const initialState = {
  name: "MIHY",
  route: "",
  previousRoute: ""
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROUTE:
      return {
        ...state,
        previousRoute: action.route
          ? window.location.pathname
          : state.previousRoute,
        route: action.route
      };
      case actionTypes.GENERAL_MDMS_FETCH_SUCCESS:
      const { masterArray, key } = action;
      const generalMDMSDataById = masterArray.reduce((result, masterName) => {
        result[masterName] = transformById(action.payload.MdmsRes[action.moduleName][masterName], key ? key : "code");
        return result;
      }, {});
      return {
        ...state,
        loading: false,
        generalMDMSDataById: getTransformedDropdown(generalMDMSDataById, ["PropertyType", "OwnerShipCategory", "UsageCategory"]),
      };

    case actionTypes.GENERAL_MDMS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    // case actionTypes.SHOW_TOAST:
    //   return {
    //     ...state,
    //     toastObject: {
    //       message: action.message,
    //       open: action.open,
    //       error: action.error
    //     }
    //   };
    case actionTypes.TOGGLE_SPINNER:
      return {
        ...state,
        spinner: !state.spinner
      };
    default:
      return state;
  }
};
export default appReducer;
