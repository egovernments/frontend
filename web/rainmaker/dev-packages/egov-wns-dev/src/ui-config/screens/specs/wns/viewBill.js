import { getCommonHeader, getCommonCard, getCommonGrayCard, getCommonContainer, getCommonSubHeader, convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getSearchResults, getSearchResultsForSewerage, fetchBill, getDescriptionFromMDMS, getConsumptionDetails } from "../../../../ui-utils/commons";
import set from "lodash/set";
import { getQueryArg, setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { createEstimateData } from "../utils";
import { getFeesEstimateCard } from "../utils";
import { getProperty } from "./viewBillResource/propertyDetails";
import { getOwner } from "./viewBillResource/ownerDetails";
import { getService } from "./viewBillResource/serviceDetails";
import { viewBillFooter } from "./viewBillResource/viewBillFooter";

let consumerCode = getQueryArg(window.location.href, "connectionNumber");
const tenantId = getQueryArg(window.location.href, "tenantId")
const service = getQueryArg(window.location.href, "service")
const searchResults = async (action, state, dispatch, consumerCode) => {
  /**
   * This methods holds the api calls and their responses for both water and sewerage service which are required in view bill page
   */
  let queryObjectForFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: consumerCode }, { key: "businessService", value: "WS" }];
  let queryObjForSearch = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: consumerCode }]
  let queryObjectForConsumptionDetails = [{ key: "tenantId", value: tenantId }, { key: "connectionNos", value: consumerCode }]
  let viewBillTooltip = [], data;
  if (service === "WATER") {
    /**
     * For displaying data for water service when user arrives at view bill page
     */
    let meterReadingsData = await getConsumptionDetails(queryObjectForConsumptionDetails);
    let payload = await getSearchResults(queryObjForSearch);
    data = await fetchBill(queryObjectForFetchBill);
    if (payload !== null && payload !== undefined && data !== null && data !== undefined) {
      if (payload.WaterConnection.length > 0 && data.Bill.length > 0) {
        payload.WaterConnection[0].service = service
        data.Bill[0].billDetails[0].billAccountDetails.forEach(async element => {
          /**
           * For displaying description of keys in bill details as tooltip
           */
          let cessKey = element.taxHeadCode
          let body = { "MdmsCriteria": { "tenantId": "pb.amritsar", "moduleDetails": [{ "moduleName": "ws-services-calculation", "masterDetails": [{ "name": cessKey }] }] } }
          let res = await getDescriptionFromMDMS(body)
          let des, obj;
          if (res !== null && res !== undefined && res.MdmsRes !== undefined && res.MdmsRes !== null) { des = res.MdmsRes["ws-services-calculation"]; }
          if (des !== null && des !== undefined && des[cessKey] !== undefined && des[cessKey][0] !== undefined && des[cessKey][0] !== null) {
            obj = { key: element.taxHeadCode, value: des[cessKey][0].description, amount: element.amount, order: element.order }
          }
          viewBillTooltip.push(obj)
          if (viewBillTooltip.length >= data.Bill[0].billDetails[0].billAccountDetails.length) {
            let dataArray = [{ total: data.Bill[0].totalAmount, fromPeriod: data.Bill[0].billDetails[0].fromPeriod, toPeriod: data.Bill[0].billDetails[0].toPeriod, expiryDate: data.Bill[0].billDetails[0].expiryDate }]
            let descriptionArray = viewBillTooltip
            let finalArray = [{ description: descriptionArray, data: dataArray }]
            dispatch(prepareFinalObject("viewBillToolipData", finalArray));
          }
        });
        /**
         * For displaying consumption, current Meter Reading and Last Meter Reading
         */
        if (meterReadingsData !== null && meterReadingsData !== undefined && meterReadingsData.meterReadings.length > 0) {
          payload.WaterConnection[0].consumption = meterReadingsData.meterReadings[0].currentReading - meterReadingsData.meterReadings[0].lastReading
          payload.WaterConnection[0].currentMeterReading = meterReadingsData.meterReadings[0].currentReading
          payload.WaterConnection[0].lastMeterReading = meterReadingsData.meterReadings[0].lastReading
          meterReadingsData.meterReadings[0].currentReadingDate = convertEpochToDate(meterReadingsData.meterReadings[0].currentReadingDate)
          meterReadingsData.meterReadings[0].lastReading = meterReadingsData.meterReadings[0].lastReading === 0 ? "0" : meterReadingsData.meterReadings[0].lastReading
        }
        dispatch(prepareFinalObject("WaterConnection[0]", payload.WaterConnection[0]));
        dispatch(prepareFinalObject("billData", data.Bill[0]));
        dispatch(prepareFinalObject("consumptionDetails[0]", meterReadingsData.meterReadings[0]))
      }
    }
  } else if (service === "SEWERAGE") {
    /**
     * For displaying data for sewerage service when user arrives at view bill page
     */
    let meterReadingsData = await getConsumptionDetails(queryObjectForConsumptionDetails)
    let payload = await getSearchResultsForSewerage(queryObjForSearch);
    data = await fetchBill(queryObjectForFetchBill)
    let viewBillTooltip = []
    if (payload !== null && payload !== undefined && data !== null && data !== undefined) {
      if (payload.SewerageConnections.length > 0 && data.Bill.length > 0) {
        payload.SewerageConnections[0].service = service
        data.Bill[0].billDetails[0].billAccountDetails.forEach(async element => {
          /**
           * For displaying description of keys in bill details as tooltip
           */
          let cessKey = element.taxHeadCode
          let body = { "MdmsCriteria": { "tenantId": "pb.amritsar", "moduleDetails": [{ "moduleName": "ws-services-calculation", "masterDetails": [{ "name": cessKey }] }] } }
          let res = await getDescriptionFromMDMS(body)
          let des, obj;
          if (res !== null && res !== undefined && res.MdmsRes !== undefined && res.MdmsRes !== null) { des = res.MdmsRes["ws-services-calculation"]; }
          if (des !== null && des !== undefined && des[cessKey] !== undefined && des[cessKey][0] !== undefined && des[cessKey][0] !== null) {
            obj = { key: element.taxHeadCode, value: des[cessKey][0].description, amount: element.amount, order: element.order }
          }
          viewBillTooltip.push(obj)
          if (viewBillTooltip.length >= data.Bill[0].billDetails[0].billAccountDetails.length) {
            let dataArray = [{ total: data.Bill[0].totalAmount, fromPeriod: data.Bill[0].billDetails[0].fromPeriod, toPeriod: data.Bill[0].billDetails[0].toPeriod, expiryDate: data.Bill[0].billDetails[0].expiryDate }]
            let descriptionArray = viewBillTooltip
            let finalArray = [{ description: descriptionArray, data: dataArray }]
            dispatch(prepareFinalObject("viewBillToolipData", finalArray));
          }
        });
        /**
         * For displaying consumption, current Meter Reading and Last Meter Reading
         */
        if (meterReadingsData !== null && meterReadingsData !== undefined && meterReadingsData.meterReadings.length > 0) {
          payload.SewerageConnections[0].consumption = meterReadingsData.meterReadings[0].currentReading - meterReadingsData.meterReadings[0].lastReading
          payload.SewerageConnections[0].currentMeterReading = meterReadingsData.meterReadings[0].currentReading
          payload.SewerageConnections[0].lastMeterReading = meterReadingsData.meterReadings[0].lastReading
        }
        dispatch(prepareFinalObject("WaterConnection[0]", payload.SewerageConnections[0]));
        dispatch(prepareFinalObject("billData", data.Bill[0]));
        dispatch(prepareFinalObject("consumptionDetails", meterReadingsData.meterReadings[0]))
      }
    }
  }
  /**
   * For displaying the bill details card in view bill
   */
  createEstimateData(data, "screenConfiguration.preparedFinalObject.billData.billDetails", dispatch, {}, {});
};

const beforeInitFn = async (action, state, dispatch, consumerCode) => {
  if (consumerCode) {
    (await searchResults(action, state, dispatch, consumerCode));
  }
};

let headerrow = getCommonContainer({
  header: getCommonHeader({ labelKey: "WS_COMMON_WATER_BILL_HEADER" }),
  consumerCode: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: { number: consumerCode }
  }
});

const estimate = getCommonGrayCard({
  header: getCommonSubHeader({ labelKey: "WS_VIEWBILL_DETAILS_HEADER" }, { style: { marginBottom: 18 } }),
  estimateSection: getFeesEstimateCard({ sourceJsonPath: "viewBillToolipData" }),
});

const propertyDetails = getProperty();
const ownerDetails = getOwner();
const serviceDetails = getService();

export const viewBill = getCommonCard({ estimate, serviceDetails, propertyDetails, ownerDetails });

const screenConfig = {
  uiFramework: "material-ui",
  name: "viewBill",
  beforeInitScreen: (action, state, dispatch) => {
    consumerCode = getQueryArg(window.location.href, "connectionNumber");
    // To set the application no. at the  top
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.consumerCode.props.number",
      consumerCode
    );
    beforeInitFn(action, state, dispatch, consumerCode);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: { className: "common-div-css search-preview" },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: { header1: { gridDefination: { xs: 12, sm: 8 }, ...headerrow } }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
        },
        viewBill,
        viewBillFooter
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "ViewBreakupContainer",
      props: { open: false, maxWidth: "md", screenKey: "search-preview" }
    }
  }
};

export default screenConfig;
