import { httpRequest } from "egov-ui-kit/utils/api";
import { SEARCHWFBUSINESS } from "egov-ui-kit/utils/endPoints";
import * as actionTypes from "./actionTypes";

export const fetchBuisnessService = (payload) => {
  return {
    type: actionTypes.FETCH_BUISNESS_SERVICE,
    payload,
  };
};

export const getBuisnessServiceData = (queryObject) => {
  return async (dispatch, getState) => {
    try {
      const payload = await httpRequest(SEARCHWFBUSINESS.GET.URL, "_search", queryObject);
      dispatch(fetchBuisnessService(payload));
    } catch (error) {
      console.log(error);
    }
  };
};
