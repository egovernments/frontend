import { httpRequest } from "./api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear,
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson,
  setFilteredTradeTypes,
  getTradeTypeDropdownData
} from "../ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTranslatedLabel,
  //updateDropDowns,
  ifUserRoleExists
} from "../ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../ui-redux/store";
import get from "lodash/get";
import set from "lodash/set";
import {
  getQueryArg,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { setBusinessServiceDataToLocalStorage ,getFileUrl} from "egov-ui-framework/ui-utils/commons";



export const getChallanSearchResult = async queryObject =>{
  try{
    const response = await httpRequest(
      "post",
      "echallan-services/eChallan/v1/_search",
      "",
      queryObject
    );

    return response;
  }
  catch(error){
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
}

export const getSearchResults = async queryObject => {
  console.info("query for search receipt=",queryObject);
  try {
    const response = await httpRequest(
      "post",
      "collection-services/payments/_search",
      "",
      queryObject
    );
      console.info("got receipt response==",response);
    return response;
  } catch (error) {
    console.error(error);
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};



export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};
