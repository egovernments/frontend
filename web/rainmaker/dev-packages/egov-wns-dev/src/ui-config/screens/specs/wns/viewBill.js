import { getCommonHeader, getCommonCard, getCommonGrayCard, getCommonContainer, getCommonSubHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { getQueryArg, setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { createEstimateData, setMultiOwnerForSV, setValidToFromVisibilityForSV } from "../utils";
import { getFeesEstimateCard, getHeaderSideText } from "../utils";
import { getProperty } from "./viewBillResource/propertyDetails";
import { getOwner } from "./viewBillResource/ownerDetails";
import { getService } from "./viewBillResource/serviceDetails";
import { viewBillFooter } from "./viewBillResource/viewBillFooter";

let consumerCode = getQueryArg(window.location.href, "connectionNumber");
const tenantId = getQueryArg(window.location.href, "tanentId")
let headerSideText = { word1: "", word2: "" };

const searchResults = async (action, state, dispatch, consumerCode) => {
  let queryObjectForFetchBill = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: consumerCode }, { key: "businessService", value: "WS" }];
  let queryObjForSearch = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: consumerCode }]
  let queryObjectForConsumptionDetails = [{ key: "tenantId", value: tenantId }, { key: "connectionNos", value: consumerCode }]
  // let meterReadingsData = await getConsumptionDetails(queryObjectForConsumptionDetails)
  // let payload = await getSearchResults(queryObjForSearch);
  // let data = await fetchBill(queryObjectForFetchBill)
  let payload = {
    "ResponseInfo": {
      "apiId": "",
      "ver": ".",
      "ts": null,
      "resMsgId": "uief87324",
      "msgId": "",
      "status": "successful"
    },
    "WaterConnection": [
      {
        "id": "4d33e86d-7511-4e14-ac54-d1662dc88d0e",
        "property": {
          "id": "1234",
          "propertyId": null,
          "linkPropertyId": null,
          "tenantId": "pb.amritsar",
          "accountId": "AccountId ",
          "oldPropertyId": null,
          "status": null,
          "address": {
            "tenantId": null,
            "doorNo": "5",
            "plotNo": null,
            "id": null,
            "landmark": null,
            "city": "Bangalore",
            "district": "Bangalore",
            "region": null,
            "state": null,
            "country": "India",
            "pincode": "56004",
            "additionDetails": null,
            "buildingName": "Umiya Emporium",
            "street": "147/J, 10th Cross, 12th Main, 3rd Block, Koramangala, Bengaluru, Karnataka 560034",
            "locality": null,
            "geoLocation": {
              "latitude": 12.9716,
              "longitude": 77.5946,
              "additionalDetails": null
            }
          },
          "acknowldgementNumber": "AcknowldgementNumber ",
          "propertyType": "Domestic",
          "ownershipCategory": null,
          "owners": [
            {
              "name": "Mr George",
              "mobileNumber": "7894567345",
              "gender": "Male",
              "fatherOrHusbandName": "Mr Jacob",
              "correspondenceAddress": "No.97, 3rd Floor, Umiya Emporium, Hosur Main Road, Madiwala, Opposite Forum Mall, Bengaluru, Karnataka 560029",
              "isPrimaryOwner": true,
              "ownerShipPercentage": null,
              "ownerType": "Joint",
              "institutionId": "Institue",
              "documents": null,
              "relationship": null,
              "additionalDetails": {}
            }
          ],
          "institution": null,
          "creationReason": null,
          "noOfFloors": null,
          "landArea": 2400.0,
          "source": null,
          "channel": "CITIZEN",
          "documents": null,
          "unit": null,
          "additionalDetails": null
        },
        "applicationNo": null,
        "applicationStatus": null,
        "status": "Active",
        "connectionNo": "WS/107/2019-20/000022",
        "oldConnectionNo": null,
        "documents": null,
        "connectionCategory": "Permanent",
        "rainWaterHarvesting": false,
        "connectionType": "Metered",
        "waterSource": "Bulk-Supply",
        "meterId": null,
        "meterInstallationDate": 0,
        "pipeSize": 127.0,
        "noOfTaps": 0,
        "waterSubSource": "Raw",
        "uom": "kL",
        "calculationAttribute": "Water consumption"
      }
    ]
  }
  let meterReadingsData = {
    "ResponseInfo": {
      "apiId": "",
      "ver": ".",
      "ts": null,
      "resMsgId": "uief87324",
      "msgId": "",
      "status": "successful"
    },
    "meterReadings": [
      {
        "id": "c6326927-0f4c-46ea-b05f-b7bd3a046aca",
        "billingPeriod": "Q3-2018-19",
        "meterStatus": "Working",
        "lastReading": 70,
        "lastReadingDate": 1575028112,
        "currentReading": 347,
        "currentReadingDate": 1575028312,
        "connectionNo": "WS/107/2019-20/000022"
      }
    ]
  }
  let data = {
    "ResposneInfo": null,
    "Bill": [
      {
        "id": "fdd8524d-1296-42da-b12e-ff0b2b5f5c76",
        "mobileNumber": null,
        "payerName": null,
        "payerAddress": null,
        "payerEmail": null,
        "isActive": true,
        "isCancelled": null,
        "additionalDetails": null,
        "taxAndPayments": [
          {
            "businessService": "WS",
            "taxAmount": 4155.00,
            "amountPaid": null
          }
        ],
        "billDetails": [
          {
            "id": "68525859-1b6e-416f-a2d1-8bfbdfc303c2",
            "tenantId": "pb.amritsar",
            "demandId": "a0210097-133d-4d8a-a509-d62026c6d8e0",
            "bill": "fdd8524d-1296-42da-b12e-ff0b2b5f5c76",
            "businessService": "WS",
            "billNumber": "1001",
            "billDate": 1575447479755,
            "consumerCode": "WS/107/2019-20/000022",
            "consumerType": "waterConnection",
            "expiryDate": 1576219061538,
            "minimumAmount": 100.00,
            "totalAmount": 4155.00,
            "fromPeriod": 1551484800900,
            "toPeriod": 1554321600900,
            "collectedAmount": 0.00,
            "collectionModesNotAllowed": [
              "DD"
            ],
            "partPaymentAllowed": false,
            "isAdvanceAllowed": true,
            "additionalDetails": null,
            "billAccountDetails": [
              {
                "id": "9e2ee10a-0fdf-4f94-8182-f8bb00cff6b8",
                "tenantId": "pb.amritsar",
                "billDetail": "68525859-1b6e-416f-a2d1-8bfbdfc303c2",
                "demandDetailId": "9e4f57eb-00d3-481a-be0b-ced279f86074",
                "order": 0,
                "amount": 4155.00,
                "adjustedAmount": 0,
                "isActualDemand": false,
                "glcode": null,
                "taxHeadCode": "WS_CHARGE",
                "additionalDetails": null,
                "purpose": "ARREAR"
              }
            ],
            "status": null
          }
        ],
        "tenantId": "pb.amritsar",
        "auditDetails": {
          "createdBy": "27341795-8dc7-407f-828c-2502458ae8a6",
          "lastModifiedBy": "27341795-8dc7-407f-828c-2502458ae8a6",
          "createdTime": 1575447479755,
          "lastModifiedTime": 1575447479755
        }
      }
    ]
  }
  let viewBillTooltip = []
  if (payload !== (null || undefined) && meterReadingsData !== (null || undefined) && payload.WaterConnection.length > 0 && meterReadingsData.meterReadings.length > 0 && data.Bill.length > 0) {
    data.Bill[0].billDetails[0].billAccountDetails.forEach(async element => {
      let cessKey = element.taxHeadCode
      let body = {
        "MdmsCriteria": {
          "tenantId": "pb.amritsar",
          "moduleDetails": [
            {
              "moduleName": "ws-services-calculation",
              "masterDetails": [
                { "name": cessKey }
              ]
            }
          ]
        }
      }
      // let res = await getDescriptionFromMDMS(body)
      let res = {
        "ResponseInfo": null,
        "MdmsRes": {
          "ws-services-calculation": {
            "WS_CHARGE": [
              {
                "description": "The base water charge calculated for particular billing period based on different units of measurement and calculation criteria."
              }
            ]
          }
        }
      }
      let des = res.MdmsRes["ws-services-calculation"]
      let obj = { key: element.taxHeadCode, value: des[cessKey][0].description, amount: element.amount, order: element.order }
      viewBillTooltip.push(obj)
      if (viewBillTooltip.length >= data.Bill[0].billDetails[0].billAccountDetails.length) {
        let dataArray = [{ total: data.Bill[0].billDetails[0].totalAmount, fromPeriod: data.Bill[0].billDetails[0].fromPeriod, toPeriod: data.Bill[0].billDetails[0].toPeriod, expiryDate: data.Bill[0].billDetails[0].expiryDate }]
        let descriptionArray = viewBillTooltip
        let finalArray = [{ description: descriptionArray, data: dataArray }]
        dispatch(prepareFinalObject("viewBillToolipData", finalArray));
      }
    });
    payload.WaterConnection[0].service = "WATER"
    payload.WaterConnection[0].consumption = meterReadingsData.meterReadings[0].currentReading - meterReadingsData.meterReadings[0].lastReading
    payload.WaterConnection[0].currentMeterReading = meterReadingsData.meterReadings[0].currentReading
    payload.WaterConnection[0].lastMeterReading = meterReadingsData.meterReadings[0].lastReading

    dispatch(prepareFinalObject("WaterConnection[0]", payload.WaterConnection[0]));
    dispatch(prepareFinalObject("billData", data.Bill[0]));
    dispatch(prepareFinalObject("consumptionDetails", meterReadingsData.meterReadings[0]))
  } else {
    payload.WaterConnection[0].consumption = " "
    payload.WaterConnection[0].currentMeterReading = " "
    payload.WaterConnection[0].lastMeterReading = " "
  }
  headerSideText = getHeaderSideText(
    get(payload, "WaterConnection[0].status"),
    get(payload, "WaterConnection[0].licenseNumber")
  );
  set(payload, "WaterConnection[0].headerSideText", headerSideText);
  get(payload, "WaterConnection[0].property.owners") &&
    get(payload, "WaterConnection[0].property.owners").length > 0
    ? setMultiOwnerForSV(action, true)
    : setMultiOwnerForSV(action, false);

  if (get(payload, "WaterConnection[0].licenseType")) {
    setValidToFromVisibilityForSV(
      action,
      get(payload, "WaterConnection[0].licenseType")
    );
  }
  createEstimateData(data, "screenConfiguration.preparedFinalObject.billData.billDetails", dispatch, {}, {});
};

const beforeInitFn = async (action, state, dispatch, consumerCode) => {
  //Search details for given application Number
  if (consumerCode) {
    (await searchResults(action, state, dispatch, consumerCode));
  }
};

let headerrow = getCommonContainer({
  header: getCommonHeader({
    labelKey: "WS_COMMON_WATER_BILL_HEADER"
  }),
  // headerDynamicVal: getCommonHeader({
  //   labelName: `(Q3-2018-19)`,
  // }),
  consumerCode: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: {
      number: consumerCode
    }
  }
});

const estimate = getCommonGrayCard({
  header: getCommonSubHeader(
    {
      labelKey: "WS_VIEWBILL_DETAILS_HEADER" //TL_NEW_TRADE_DETAILS_TRADE_UNIT_HEADER
    },
    {
      style: {
        marginBottom: 18
      }
    },
  ),
  estimateSection: getFeesEstimateCard({
    sourceJsonPath: "viewBillToolipData"
  }),
});

const propertyDetails = getProperty(false);
const ownerDetails = getOwner(false);
const serviceDetails = getService();

export const viewBill = getCommonCard({
  estimate,
  serviceDetails,
  propertyDetails,
  ownerDetails,
});

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
    if (status !== "pending_payment") {
      set(
        action.screenConfig,
        "components.div.children.viewBill.children.cardContent.children.viewBreakupButton.visible",
        false
      );
    }
    const queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessService", value: "WS" }];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);
    beforeInitFn(action, state, dispatch, consumerCode);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
              ...headerrow
            },
          }
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
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "search-preview"
      }
    }
  }
};

export default screenConfig;
