import {
  handleScreenConfigurationFieldChange as handleField,
  toggleSnackbar,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {
  getPayload,
  getTenantName
} from "./publicSearchUtils";
import { validateFields } from "../../utils/index";
import { findAndReplace, getSearchResults, getSearchResultsForSewerage, getWorkFlowData, serviceConst, fetchBill } from "../../../../../ui-utils/commons";
import { ComponentJsonPath, getPropertyWithBillAmount } from "./publicSearchUtils";

export const propertySearch = async (state, dispatch) => {
  searchApiCall(state, dispatch);
};

const removeValidation = (state, dispatch) => {
  Object.keys(ComponentJsonPath).map(key => {
    dispatch(
      handleField("public-search", ComponentJsonPath[key], "props.error", false)
    );

    dispatch(
      handleField("public-search", ComponentJsonPath[key], "isFieldValid", true)
    );

    dispatch(
      handleField("public-search", ComponentJsonPath[key], "props.helperText", "")
    );
    return true;
  });
};

const getAddress = item => {
  if (item && item.address) {
    let doorNo = item.address.doorNo != null ? item.address.doorNo + "," : "";
    let buildingName =
      item.address.buildingName != null ? item.address.buildingName + "," : "";
    let street = item.address.street != null ? item.address.street + "," : "";
    let mohalla = item.address.locality.name
      ? item.address.locality.name + ","
      : "";
    let city = item.address.city != null ? item.address.city : "";
    return doorNo + buildingName + street + mohalla + city;
  }
};

const searchApiCall = async (state, dispatch) => {
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
    "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children",
    state,
    dispatch,
    "public-search"
  );

  if (!isSearchBoxFirstRowValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_PT_FILL_VALID_FIELDS"
        },
        "error"
      )
    );
    return;
  }
  
  if (searchScreenObject.tenantId && searchScreenObject.locality && !(searchScreenObject.ids || searchScreenObject.mobileNumber || searchScreenObject.ownerName)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city and locality",
          labelKey:
            "PT_SEARCH_SELECT_AT_LEAST_ONE_FIELD_WITH_CITY_AND_LOCALITY"
        },
        "error"
      )
    );
    return;
  } else {
    removeValidation(state, dispatch);
    const isAdvancePaymentAllowed = get(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");
    // const queryObject = getPayload(searchScreenObject);
    
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }

    let waterMeteredDemandExipryDate = 0;
    let waterNonMeteredDemandExipryDate = 0;
    let sewerageNonMeteredDemandExpiryDate = 0;
    let payloadbillingPeriod
    try {
      try {
        // Get the MDMS data for billingPeriod
        let mdmsBody = {
          MdmsCriteria: {
            tenantId: searchScreenObject.tenantId,
            moduleDetails: [
              { moduleName: "ws-services-masters", masterDetails: [{ name: "billingPeriod" }] },
              { moduleName: "sw-services-calculation", masterDetails: [{ name: "billingPeriod" }] }
            ]
          }
        }
        //Read metered & non-metered demand expiry date and assign value.
        payloadbillingPeriod = await httpRequest("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

      } catch (err) { console.log(err) }
      let getSearchResult = getSearchResults(queryObject)
      let getSearchResultForSewerage = getSearchResultsForSewerage(queryObject, dispatch)
      let finalArray = [];
      let searchWaterConnectionResults, searcSewerageConnectionResults;
      try { searchWaterConnectionResults = await getSearchResult } catch (error) { finalArray = []; console.log(error) }
      try { searcSewerageConnectionResults = await getSearchResultForSewerage } catch (error) { finalArray = []; console.log(error) }
      const waterConnections = searchWaterConnectionResults ? searchWaterConnectionResults.WaterConnection.map(e => { e.service = serviceConst.WATER; return e }) : []
      const sewerageConnections = searcSewerageConnectionResults ? searcSewerageConnectionResults.SewerageConnections.map(e => { e.service = serviceConst.SEWERAGE; return e }) : [];
      let combinedSearchResults = searchWaterConnectionResults || searcSewerageConnectionResults ? sewerageConnections.concat(waterConnections) : []
      for (let i = 0; i < combinedSearchResults.length; i++) {
        let element = combinedSearchResults[i];
        if (element.property && element.property !== "NA" && element.connectionNo !== null && element.connectionNo !== 'NA') {
          let queryObjectForWaterFetchBill;
          if (element.service === serviceConst.WATER) {
            queryObjectForWaterFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "WS" }];
          } else {
            queryObjectForWaterFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: element.connectionNo }, { key: "businessService", value: "SW" }];
          }

          if (element.service === serviceConst.WATER && payloadbillingPeriod.MdmsRes['ws-services-masters'] && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod !== null) {
            payloadbillingPeriod.MdmsRes['ws-services-masters'].billingPeriod.forEach(obj => {
              if (obj.connectionType === 'Metered') {
                waterMeteredDemandExipryDate = obj.demandExpiryDate;
              } else if (obj.connectionType === 'Non Metered') {
                waterNonMeteredDemandExipryDate = obj.demandExpiryDate;
              }
            });
          }
          if (element.service === serviceConst.SEWERAGE && payloadbillingPeriod.MdmsRes['sw-services-calculation'] && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== undefined && payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod !== null) {
            payloadbillingPeriod.MdmsRes['sw-services-calculation'].billingPeriod.forEach(obj => {
              if (obj.connectionType === 'Non Metered') {
                sewerageNonMeteredDemandExpiryDate = obj.demandExpiryDate;
              }
            });
          }

          let billResults = await fetchBill(queryObjectForWaterFetchBill, dispatch)
          billResults ? billResults.Bill.map(bill => {
            let updatedDueDate = 0;
            if (element.service === serviceConst.WATER) {
              updatedDueDate = (element.connectionType === 'Metered' ?
                (bill.billDetails[0].toPeriod + waterMeteredDemandExipryDate) :
                (bill.billDetails[0].toPeriod + waterNonMeteredDemandExipryDate));
            } else if (element.service === serviceConst.SEWERAGE) {
              updatedDueDate = bill.billDetails[0].toPeriod + sewerageNonMeteredDemandExpiryDate;
            }
            let obj = {
              due: bill.totalAmount,
              dueDate: updatedDueDate,
              service: element.service,
              connectionNo: element.connectionNo,
              name: (element.property && element.property !== "NA" && element.property.owners) ? element.property.owners[0].name : '',
              status: element.status,
              address: (element.property && element.property !== "NA" && element.property.address) ? element.property.address.street : '',
              tenantId: element.tenantId,
              connectionType: element.connectionType
            }
            finalArray.push(obj)
          }) : finalArray.push({
            due: 'NA',
            dueDate: 'NA',
            service: element.service,
            connectionNo: element.connectionNo,
            name: (element.property && element.property !== "NA" && element.property.owners) ? element.property.owners[0].name : '',
            status: element.status,
            address: (element.property && element.property !== "NA" && element.property.address) ? element.property.address.street : '',
            tenantId: element.tenantId,
            connectionType: element.connectionType
          })
        }
      }
      showResults(finalArray, dispatch, tenantId)
    } catch (err) { console.log(err) }
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

const showResults = (connections, dispatch, tenantId) => {
  let data = connections.map(item => ({
    ["WS_COMMON_TABLE_COL_SERVICE_LABEL"]: item.service,
    ["WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL"]: item.connectionNo,
    ["WS_COMMON_TABLE_COL_OWN_NAME_LABEL"]: item.name,
    ["WS_COMMON_TABLE_COL_STATUS_LABEL"]: item.status,
    ["WS_COMMON_TABLE_COL_DUE_LABEL"]: item.due,
    ["WS_COMMON_TABLE_COL_ADDRESS"]: item.address,
    ["WS_COMMON_TABLE_COL_DUE_DATE_LABEL"]: (item.dueDate !== undefined && item.dueDate !== "NA") ? convertEpochToDate(item.dueDate) : item.dueDate,
    ["WS_COMMON_TABLE_COL_TENANTID_LABEL"]: item.tenantId,
    ["WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL"]: item.connectionType
  }))

  dispatch(handleField("search", "components.div.children.searchResults", "props.data", data));
  dispatch(handleField("search", "components.div.children.searchResults", "props.rows", connections.length));
  showHideTable(true, dispatch);
}
