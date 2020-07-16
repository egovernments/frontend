import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { convertDateToEpoch } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import store from "ui-redux/store";
import { httpRequest } from "../../../../../ui-utils/api";
import { getTextToLocalMapping } from "../../utils";
import { getBpaSearchResults } from "../../../../../ui-utils/commons";


export const getNOCSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/noc-services/v1/noc/_search?offset=0&limit=-1",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

export const getWorkFlowDataForBPA = async Licenses => {
  var businessIds = [];
  let tenantMap = {};
  let processInstanceArray = [];
  var appNumbers = [];
  Licenses.forEach(item => {
    var appNums = tenantMap[item.tenantId] || [];
    appNumbers = appNums;
    appNums.push(item.applicationNo);
    tenantMap[item.tenantId] = appNums;
  });

  for (var key in tenantMap) {
    for (let i = 0; i < appNumbers.length / 100; i++) {
      let queryObject = [
        {
          key: "tenantId",
          value: key
        },
        {
          key: "businessIds",
          value: tenantMap[key].slice(i * 100, (i * 100) + 100)
        }
      ];
      try {
        let payload = await httpRequest(
          "post",
          "egov-workflow-v2/egov-wf/process/_search",
          "",
          queryObject
        );
        processInstanceArray = processInstanceArray.concat(payload.ProcessInstances)

      } catch (error) {
        console.log(error);
        return [];
      }
    }
    var businessIdToOwnerMapping = {};
    processInstanceArray.filter(
      record => record.moduleName.includes("noc-services")
    ).forEach(item => {
      businessIdToOwnerMapping[item.businessId] = {
        assignee: get(item, "assigner.name"),
        sla: item.businesssServiceSla && convertMillisecondsToDays(item.businesssServiceSla),
        state: item.state.state
      };
    });
    return businessIdToOwnerMapping;
  }
};

const convertMillisecondsToDays = (milliseconds) => {
  return Math.round(milliseconds / (1000 * 60 * 60 * 24));
}

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let tenantId = getTenantId();
  let nocType = get(
    state.screenConfiguration.preparedFinalObject,
    "nocType",
    ""
  );
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    },
    {
      key: "nocType",
      value: nocType
    }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "BPA_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
        },
        "warning"
      )
    );
  }  
  else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
    try {
      const response = await getNOCSearchResults(queryObject);
      const businessIdToOwnerMappingForBPA = await getWorkFlowDataForBPA(response.Noc); 
      console.log(businessIdToOwnerMappingForBPA, "businessIdToOwnerMappingForBPAaa")     ;
      let data = response.Noc.map(item => ({
        ["BPA_COMMON_TABLE_COL_APP_NO"]: item.applicationNo || "-",
        ["SOURCE_MODULE_NUMBER"]: item.sourceRefId || "-",
        ["SOURCE_MODULE"]: getTextToLocalMapping(item.source) || "-",
        ["CURRENT_OWNER"]: get(businessIdToOwnerMappingForBPA[item.applicationNo], "assignee", null) || "NA",
        ["BPA_COMMON_TABLE_COL_STATUS_LABEL"]: item.applicationStatus || "-",
      }));

      dispatch(
        handleField(
          "noc-search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "noc-search",
          "components.div.children.searchResults",
          "props.rows",
          response.Noc.length
        )
      );
      showHideTable(true, dispatch);
    } catch (error) {
      console.log(error);
    }
  }
};
const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "noc-search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};
