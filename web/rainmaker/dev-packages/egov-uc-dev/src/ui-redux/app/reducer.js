import * as actionTypes from "./actionTypes";
import { getLocale, localStorageSet } from "../../ui-utils/localStorageUtils";
import { initLocalizationLabels } from "./utils";
const locale = getLocale() || "en_IN";
const localizationLabels = initLocalizationLabels(locale);

const initialState = {
  name: "MIHY",
  route: "",
  previousRoute: "",
  locale,
  localizationLabels
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        locale: action.locale,
        localizationLabels: action.localizationLabels,
      };
    case actionTypes.SET_ROUTE:
      return {
        ...state,
        previousRoute: action.route
          ? window.location.pathname
          : state.previousRoute,
        route: action.route
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
