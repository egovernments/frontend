import * as actionTypes from "./actionTypes";

export const setRoute = route => {
  return { type: actionTypes.SET_ROUTE, route };
};

export const generalMDMSFetchSuccess = (payload, moduleName, masterArray, key) => {
  return {
    type: actionTypes.GENERAL_MDMS_FETCH_SUCCESS,
    payload,
    moduleName,
    masterArray,
    key,
  };
};

const generalMDMSFetchError = (error) => {
  return {
    type: actionTypes.GENERAL_MDMS_FETCH_ERROR,
    error,
  };
};

export const fetchGeneralMDMSData = (requestBody, moduleName, masterArray, key, tenantId) => {
  if (!requestBody) {
    var genRequestBody = {
      MdmsCriteria: {
        tenantId,
        moduleDetails: [
          {
            moduleName,
            masterDetails: masterArray.map((item) => {
              return {
                name: item,
              };
            }),
          },
        ],
      },
    };
  }
  return async (dispatch) => {
    try {
      const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody || genRequestBody);
      dispatch(generalMDMSFetchSuccess(payload, moduleName, masterArray, key));
    } catch (error) {
      dispatch(generalMDMSFetchError(error.message));
    }
  };
};