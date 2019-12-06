import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, fetchBill } from "../../../../..//ui-utils/commons";
import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping
} from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(getUserInfo()).tenantId
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

  // const isSearchBoxSecondRowValid = validateFields(
  //   "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
  //   state,
  //   dispatch,
  //   "search"
  // );

  if (!(isSearchBoxFirstRowValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelKey: "ERR_WS_FILL_MANDATORY_FIELDS"
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
          labelKey: "ERR_WS_FILL_ATLEAST_ONE_FIELD"
        },
        "error"
      )
    );
  } else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        // if (key === "fromDate") {
        //   queryObject.push({
        //     key: key,
        //     value: convertDateToEpoch(searchScreenObject[key], "daystart")
        //   });
        // } else if (key === "toDate") {
        //   queryObject.push({
        //     key: key,
        //     value: convertDateToEpoch(searchScreenObject[key], "dayend")
        //   });
        // } else {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
  }
  let queryObjectForFetchBill, billData;
  const response = await getSearchResults(queryObject);
  if (response !== undefined && response !== null && response.WaterConnection.length > 0) {
    response.WaterConnection[0].service = "WATER"
    queryObjectForFetchBill = [
      { key: "tenantId", value: JSON.parse(getUserInfo()).tenantId },
      { key: "consumerCode", value: response.WaterConnection[0].connectionNo },
      { key: "businessService", value: "WS" }
    ];
    billData = await fetchBill(queryObjectForFetchBill)
    if (billData !== undefined && billData !== null && billData.Bill.length > 0) {
      response.WaterConnection[0].due = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].totalAmount : " "
      response.WaterConnection[0].dueDate = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].expiryDate : " "
    }
  }
  try {
    let data = response.WaterConnection.map(item => ({

      [getTextToLocalMapping("Service")]:
        item.propertyType || "WATER", //will be modified later
      [getTextToLocalMapping("Consumer No")]: item.connectionNo || " ",
      [getTextToLocalMapping("Owner Name")]:
        (item.property.owners !== undefined && item.property.owners.length > 0) ? item.property.owners[0].name : " " || " ",
      [getTextToLocalMapping("Status")]: item.status || "-",
      [getTextToLocalMapping("Due")]: item.due || 0,
      [getTextToLocalMapping("Address")]: item.property.address.street || "-",
      [getTextToLocalMapping("Due Date")]: item.dueDate !== undefined ? convertEpochToDate(item.dueDate) : " " || " ",
      ["tenantId"]: JSON.parse(getUserInfo()).tenantId
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
          "Search Results for Water & Sewerage Connections"
        )} (${response.WaterConnection.length})`
      )
    );
    showHideTable(true, dispatch);
  } catch (error) {
    dispatch(toggleSnackbar(true, error.message, "error"));
    console.log(error);
  }
}
// };
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
