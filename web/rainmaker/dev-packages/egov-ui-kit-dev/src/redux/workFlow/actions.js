import * as actionTypes from "./actionTypes";
import { httpRequest } from "egov-ui-kit/utils/api";
import { WORKFLOW_BUSINESS_SEARCH } from "egov-ui-kit/utils/endPoints";

export const fetchBuisnessService = (payload) => {
  return {
    type: actionTypes.FETCH_BUISNESS_SERVICE,
    payload,
  };
};

export const getBuisnessServiceData = (queryObject) => {
  return async (dispatch, getState) => {
    try {
      const payload = await httpRequest(WORKFLOW_BUSINESS_SEARCH.POST.URL, WORKFLOW_BUSINESS_SEARCH.POST.ACTION, queryObject);
      dispatch(fetchBuisnessService(payload));
    } catch (error) {
      console.log(error);
    }
  };
};
