import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../..//ui-utils/commons";
import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping
} from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";

export const searchApiCall = async (state, dispatch) => {
  let queryObject = [
    {
      key: "tenantId",
      value: getTenantId()
    },
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
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
        searchScreenObject.hasOwnProperty(key) &&
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
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
        }
      }
    }

    const response = await getSearchResults(queryObject);
    try {
      const localisationLabels = getTransformedLocalStorgaeLabels();
      let data = response.Licenses.map(item => ({
        [getTextToLocalMapping("Application No")]:
          item.applicationNumber || "-",
        [getTextToLocalMapping("Category")]: getLocaleLabels("TRADELICENSE_TRADETYPE_"+item.tradeLicenseDetail.tradeUnits[0].tradeType, "TRADELICENSE_TRADETYPE_"+item.tradeLicenseDetail.tradeUnits[0].tradeType, localisationLabels) || "-",
        [getTextToLocalMapping("Owner Name")]:
          item.tradeLicenseDetail.owners[0].name || "-",
          [getTextToLocalMapping("Mobile Number")]:
          item.tradeLicenseDetail.owners[0].mobileNumber || "-",          
          [getTextToLocalMapping("From District")]:
          getLocaleLabels("TRADELICENSE_DISTRICT_"+item.tradeLicenseDetail.additionalDetail.fromDistrict, "TRADELICENSE_DISTRICT_"+item.tradeLicenseDetail.additionalDetail.fromDistrict, localisationLabels) || "-",
            [getTextToLocalMapping("To District")]:
            getLocaleLabels("TRADELICENSE_DISTRICT_"+item.tradeLicenseDetail.additionalDetail.toDistrict, "TRADELICENSE_DISTRICT_"+item.tradeLicenseDetail.additionalDetail.toDistrict, localisationLabels)  || "-",
        [getTextToLocalMapping("Status")]: getLocaleLabels(`WF_${item.workflowCode.toUpperCase()}_${item.status}`, `WF_${item.workflowCode.toUpperCase()}_${item.status}`, localisationLabels) || "-",
        ["tenantId"]: item.tenantId,
        ["status1"]: item.status || "-"
      }));
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
          "props.title",
          `${getTextToLocalMapping(
            "Search Results for Trade License Applications"
          )} (${response.Licenses.length})`
        )
      );
      showHideTable(true, dispatch);
    } catch (error) {
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
