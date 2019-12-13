import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, fetchBill, getSearchResultsForSewerage } from "../../../../../ui-utils/commons";
import { convertEpochToDate, getTextToLocalMapping } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [{ key: "tenantId", value: JSON.parse(getUserInfo()).tenantId }, { key: "offset", value: "0" }];
  let searchScreenObject = get(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
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
    dispatch(toggleSnackbar(true, { labelKey: "ERR_WS_FILL_MANDATORY_FIELDS" }, "warning"));
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(toggleSnackbar(true, { labelKey: "ERR_WS_FILL_ATLEAST_ONE_FIELD" }, "error"));
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
    let getSearchResult = getSearchResults(queryObject)
    let getSearchResultForSewerage = getSearchResultsForSewerage(queryObject)
    Promise.all([getSearchResult, getSearchResultForSewerage]).then(response => {
      if (response[0] !== undefined && response[0] !== null && response[0].WaterConnection.length > 0) {
        for (let i = 0; i < response[0].WaterConnection.length; i++) {
          let element = response[0].WaterConnection[i]
          element.service = "WATER"
          let queryObjectForWaterFetchBill = [{ key: "tenantId", value: JSON.parse(getUserInfo()).tenantId }, { key: "consumerCode", value: response[0].WaterConnection[i].connectionNo }, { key: "businessService", value: "WS" }];
          fetchBill(queryObjectForWaterFetchBill).then(resp => {
            if (resp !== undefined && resp !== null && resp.Bill.length > 0) {
              for (let j = 0; j < resp.Bill.length; j++) {
                response[0].WaterConnection[i]['due'] = resp.Bill[j]['totalAmount']
                response[0].WaterConnection[i]['dueDate'] = resp.Bill[j].billDetails[0]['expiryDate']
              }
            }
            const connections = get(state, "screenConfiguration.preparedFinalObject.connectionsToRender")
            showResults(connections, dispatch);
          }, err => { console.log(err) }).catch(error => { console.log(error) })
        }
        dispatch(prepareFinalObject("connectionsToRender", response[0].WaterConnection))
      } else {
        dispatch(prepareFinalObject("connectionsToRender", []))
      }
      if (response[1] !== undefined && response[1] !== null && response[1].SewerageConnections.length > 0) {
        for (let i = 0; i < response[1].SewerageConnections.length; i++) {
          let element = response[1].SewerageConnections[i]
          element.service = "SEWERAGE";
          let queryObjectForSewerageFetchBill = [{ key: "tenantId", value: JSON.parse(getUserInfo()).tenantId }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "SW" }];
          fetchBill(queryObjectForSewerageFetchBill).then(billData => {
            if (billData !== undefined && billData !== null && billData.Bill.length > 0) {
              for (let j = 0; j < billData.Bill.length; j++) {
                element['due'] = billData.Bill[j].totalAmount
                element['dueDate'] = billData.Bill[j].billDetails.length > 0 ? billData.Bill[j].billDetails[0].expiryDate : " "
              }
            }
            let connectionsSewerage = get(state, "screenConfiguration.preparedFinalObject.connectionsToRenderSewerage")
            let connectionsWater = get(state, "screenConfiguration.preparedFinalObject.connectionsToRender")
            let finalArray = connectionsWater.concat(connectionsSewerage)
            showResults(finalArray, dispatch)
          }, err => { console.log(err) }).catch(error => { console.log(error) })
        }
        dispatch(prepareFinalObject("connectionsToRenderSewerage", response[1].SewerageConnections))
      } else {
        dispatch(prepareFinalObject("connectionsToRenderSewerage", []))
        let connectionsSewerage = get(state, "screenConfiguration.preparedFinalObject.connectionsToRenderSewerage")
        let connectionsWater = get(state, "screenConfiguration.preparedFinalObject.connectionsToRender")
        let finalArray = connectionsWater.concat(connectionsSewerage)
        showResults(finalArray, dispatch)
      }
    }, err => { console.log(err) }).catch(error => console.log(error))
  }
}
const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(handleField("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

const showResults = (connections, dispatch) => {
  if (connections !== undefined && connections !== null) {
    let data = connections.map(item => ({

      [getTextToLocalMapping("Service")]: item.service,
      [getTextToLocalMapping("Consumer No")]: item.connectionNo || " ",
      [getTextToLocalMapping("Owner Name")]: (item.property.owners !== undefined && item.property.owners.length > 0) ? item.property.owners[0].name : " " || " ",
      [getTextToLocalMapping("Status")]: item.status || " ",
      [getTextToLocalMapping("Due")]: (item.due !== undefined || item.due !== null) ? item.due : " " || " ",
      [getTextToLocalMapping("Address")]: item.property.address.street || " ",
      [getTextToLocalMapping("Due Date")]: item.dueDate !== undefined ? convertEpochToDate(item.dueDate) : " " || " ",
      ["tenantId"]: JSON.parse(getUserInfo()).tenantId
    }));

    dispatch(handleField("search", "components.div.children.searchResults", "props.data", data));
    dispatch(handleField("search", "components.div.children.searchResults", "props.title",
      `${getTextToLocalMapping(
        "Search Results for Water & Sewerage Connections"
      )} (${connections.length})`
    ));
    showHideTable(true, dispatch);
  }
}
