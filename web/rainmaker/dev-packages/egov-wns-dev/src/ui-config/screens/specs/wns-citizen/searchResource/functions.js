import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, fetchBill, getSearchResultsForSewerage } from "../../../../../ui-utils/commons";
import { convertEpochToDate, getTextToLocalMapping } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
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
          labelKey: "ERR_WS_FILL_MANDATORY_FIELDS"
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
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
    try {
      let tenantId = get(state, "screenConfiguration.preparedFinalObject.searchScreen.tenantId");
      let response = await getSearchResults(queryObject);
      // let sewerageResponse = await getSearchResultsForSewerage(queryObject)
      // if (sewerageResponse !== undefined && sewerageResponse !== null && sewerageResponse.SewerageConnections.length > 0) {
      //   sewerageResponse.SewerageConnections.forEach(async element => {
      //     element.service = "SEWERAGE";
      //     let queryObjectForSewerageFetchBill = [
      //       { key: "tenantId", value: tenantId },
      //       { key: "consumerCode", value: element.connectionNo },
      //       { key: "businessService", value: "SW" }
      //     ];
      //     let billData = await fetchBill(queryObjectForSewerageFetchBill);
      //     if (billData !== undefined && billData !== null && billData.Bill.length > 0) {
      //       element.due = billData.Bill[0].totalAmount;
      //       element.dueDate = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].expiryDate : " ";
      //     }
      //   });
      // }

      if (response !== undefined && response !== null) {
        if (response.WaterConnection.length > 0) {
          response.WaterConnection.forEach(async element => {
            element.service = "WATER";
            let queryObjectForWaterFetchBill = [
              { key: "tenantId", value: tenantId },
              { key: "consumerCode", value: element.connectionNo },
              { key: "businessService", value: "WS" }
            ];
            let billData = await fetchBill(queryObjectForWaterFetchBill);
            if (billData !== undefined && billData !== null && billData.Bill.length > 0) {
              element.due = billData.Bill[0].totalAmount;
              element.dueDate = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].expiryDate : " ";
            }
            dispatch(prepareFinalObject("connectionsToRender", response.WaterConnection));
          });
          // if (sewerageResponse !== undefined && sewerageResponse !== null && sewerageResponse.SewerageConnections.length > 0) {
          //   sewerageResponse.SewerageConnections.forEach(element => response.WaterConnection.push(element))
          //   dispatch(prepareFinalObject("connectionsToRender", response.WaterConnection));
          // }
        }
      }
      const connections = get(state, "screenConfiguration.preparedFinalObject.connectionsToRender");
      if (connections !== undefined && connections !== null && connections.length > 0) {
        let data = connections.map(item => ({
          [getTextToLocalMapping("Service")]: item.service || "-",
          [getTextToLocalMapping("Consumer No")]: item.connectionNo || "-",
          [getTextToLocalMapping("Owner Name")]:
            (item.property.owners !== undefined && item.property.owners.length > 0) ? item.property.owners[0].name : " " || " ",
          [getTextToLocalMapping("Status")]: item.status || "-",
          [getTextToLocalMapping("Due")]: item.due || 0,
          [getTextToLocalMapping("Address")]: item.property.address.street || "-",
          [getTextToLocalMapping("Due Date")]: item.dueDate !== undefined ? convertEpochToDate(item.dueDate) : " " || " ",
          ["tenantId"]: tenantId
        }));

        dispatch(handleField("search", "components.div.children.searchResults", "props.data", data));
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
      }
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
