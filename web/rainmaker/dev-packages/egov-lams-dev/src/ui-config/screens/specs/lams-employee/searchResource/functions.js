import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../../ui-utils/commons";
import {sampleSearchResponse} from "../../lams-utils/sampleData";

import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping
} from "../../utils/index";
import { toggleSnackbar,toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { checkIfTheUserIsDeo, checkIfTheUserIsLrCe, checkIfTheUserIsCeo, getCbsForDeoBasedOnLamsRoles} from "../../../../../ui-utils/commons";

//Added toggleSpinner for Search by Minju
export const searchApiCall = async (state, dispatch) => {
  dispatch(toggleSpinner());
  showHideTable(false, dispatch);

  let queryObject = [
    { key: "offset", value: "0" }
  ];

  if(checkIfTheUserIsDeo())
  {
    let cbs = getCbsForDeoBasedOnLamsRoles(state,dispatch);
    let queryString = "";
    cbs.forEach(cb => {
      queryString = queryString+cb.code+","
    })
    queryString = queryString?queryString.slice(0, -1):queryString; 
    queryObject.push({key: "tenantIds",value: queryString});
    queryObject.push({key: "located",value: 2})
  } 
  else
  if(checkIfTheUserIsCeo())
  {
    queryObject.push({key: "tenantId",value: getTenantId()});
    queryObject.push({key: "located",value: 1});
  }
  else
  if(checkIfTheUserIsLrCe())// For counter employee, dont put restriction on located
  {
    queryObject.push({key: "tenantId",value: getTenantId()});
  }

  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.leaseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.leaseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
    dispatch(toggleSpinner());
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to start search",
          labelKey: "ERR_FILL_VALID_FIELDS"
        },
        "warning"
      )
    );
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(toggleSpinner());
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "ERR_FILL_ONE_FIELDS"
        },
        "warning"
      )
    );
  } else if (
    (searchScreenObject["fromDate"] === undefined ||
      searchScreenObject["fromDate"].length === 0) &&
    searchScreenObject["toDate"] !== undefined &&
    searchScreenObject["toDate"].length !== 0
  ) {
    dispatch(toggleSpinner());
    dispatch(
      toggleSnackbar(
        true,
        { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" },
        "warning"
      )
    );
  } else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] && 
        searchScreenObject[key].trim() !== ""
      ) {
        if (key === "fromDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "daystart")
          });
        } else if (key === "toDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "dayend")
          });
        } else {
          queryObject.push({ key: key, value: searchScreenObject[key].trim().toUpperCase() });
        }
      }
    }



    let response = await getSearchResults(queryObject); //tobechanged
    if(!response || !response.leases)
    {
      alert("Search did not return full data. Showing sample data only for testing.");
      response = sampleSearchResponse; //tobechanged
    }
    try {
      
      let data = response.leases.map(item => ({
        ['LAMS_TABLE_COL_APP_NO']:
          item.applicationNumber || "-",
        ['LAMS_TABLE_COL_APPLCNT_NAME']: item.userDetails[0].name || "-",
        ['LAMS_TABLE_COL_APP_DATE']: convertEpochToDate(item.applicationDate) || "-",
          ['LAMS_TABLE_COL_APP_TYPE']:
          `LAMS_APPLICATIONTYPE_${item.applicationType}`  || "NEW",
        ['LAMS_TABLE_COL_STATUS']: item.status || "-",
        ["TENANT_ID"]: item.tenantId,
        ["LAMS_TABLE_COL_STATUS"]: item.status || "-"
      }));

      console.log("Check the data now ", data);
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.rows",
          response.leases.length
        )
      );
      showHideTable(true, dispatch);
      dispatch(toggleSpinner());
    } catch (error) {
      dispatch(toggleSpinner());
      dispatch(toggleSnackbar(true, error.message, "error"));
      console.log(error);
    }
  }
};
const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};
