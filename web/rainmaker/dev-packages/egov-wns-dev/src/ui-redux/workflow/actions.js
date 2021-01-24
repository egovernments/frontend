import * as actionTypes from "./actionTypes";
import { httpRequest } from "ui-utils/api";
import { WORKFLOW_SEARCH } from "egov-ui-kit/utils/endPoints";
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
        WORKFLOW_SEARCH.POST.URL,
        "",
        queryObject
      );
      dispatch(setProcessInstances(payload));
    } catch (error) {
      console.log(error);
    }
  };
};
