import { SEARCHWFPROCESS } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "ui-utils/api";
import * as actionTypes from "./actionTypes";

export const setProcessInstances = payload => {
  return {
    type: actionTypes.GET_WORK_FLOW,
    payload
  };
};

export const getWorkFlowData = queryObject => {
  return async (dispatch, getState) => {
    try {
      const payload = await httpRequest(
        "post",
        SEARCHWFPROCESS.GET.URL,
        "",
        queryObject
      );
      dispatch(setProcessInstances(payload));
    } catch (error) {
      console.log(error);
    }
  };
};
