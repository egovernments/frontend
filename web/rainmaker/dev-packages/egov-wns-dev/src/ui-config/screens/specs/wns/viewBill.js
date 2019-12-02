import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonGrayCard,
  getCommonContainer,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getQueryArg,
  setBusinessServiceDataToLocalStorage,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, fetchBill, getConsumptionDetails } from "../../../../ui-utils/commons";
import {
  createEstimateData,
  setMultiOwnerForSV,
  setValidToFromVisibilityForSV,
  getDialogButton
} from "../utils";

import { footerReview } from "./viewBillResource/footer";
import {
  getFeesEstimateCard,
  getHeaderSideText,
  getTransformedStatus
} from "../utils";
import {
  getTenantId,
  getUserInfo,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import { loadReceiptGenerationData } from "../utils/receiptTransformer";
import { getProperty } from "./viewBillResource/propertyDetails";
import { getOwner } from "./viewBillResource/ownerDetails";
import { getService } from "./viewBillResource/serviceDetails";
import { viewBillFooter } from "./viewBillResource/viewBillFooter";


const tenantId = JSON.parse(getUserInfo()).tenantId;
let consumerCode = getQueryArg(window.location.href, "connectionNumber");
let headerSideText = { word1: "", word2: "" };
let data;
let payload;
const setDocuments = async (
  payload,
  sourceJsonPath,
  destJsonPath,
  dispatch
) => {
  const uploadedDocData = get(payload, sourceJsonPath);

  const fileStoreIds =
    uploadedDocData &&
    uploadedDocData
      .map(item => {
        return item.fileStoreId;
      })
      .join(",");
  const fileUrlPayload =
    fileStoreIds && (await getFileUrlFromAPI(fileStoreIds));
  const reviewDocData =
    uploadedDocData &&
    uploadedDocData.map((item, index) => {
      return {
        title: `TL_${item.documentType}` || "",
        link:
          (fileUrlPayload &&
            fileUrlPayload[item.fileStoreId] &&
            fileUrlPayload[item.fileStoreId].split(",")[0]) ||
          "",
        linkText: "View",
        name:
          (fileUrlPayload &&
            fileUrlPayload[item.fileStoreId] &&
            decodeURIComponent(
              fileUrlPayload[item.fileStoreId]
                .split(",")[0]
                .split("?")[0]
                .split("/")
                .pop()
                .slice(13)
            )) ||
          `Document - ${index + 1}`
      };
    });
  reviewDocData && dispatch(prepareFinalObject(destJsonPath, reviewDocData));
};

const getTradeTypeSubtypeDetails = payload => {
  const tradeUnitsFromApi = get(
    payload,
    "WaterConnection[0].tradeLicenseDetail.tradeUnits",
    []
  );
  const tradeUnitDetails = [];
  tradeUnitsFromApi.forEach(tradeUnit => {
    const { tradeType } = tradeUnit;
    const tradeDetails = tradeType.split(".");
    tradeUnitDetails.push({
      trade: get(tradeDetails, "[0]", ""),
      tradeType: get(tradeDetails, "[1]", ""),
      tradeSubType: get(tradeDetails, "[2]", "")
    });
  });
  return tradeUnitDetails;
};

const searchResults = async (action, state, dispatch, consumerCode) => {
  let queryObjectForFetchBill = [
    { key: "tenantId", value: tenantId },
    { key: "consumerCode", value: consumerCode },
    { key: "businessService", value: "WS" }
  ];
  let queryObjForSearch = [
    { key: "tenantId", value: tenantId },
    { key: "connectionNumber", value: consumerCode }
  ]
  let queryObjectForConsumptionDetails = [
    { key: "tenantId", value: tenantId },
    { key: "connectionNos", value: consumerCode }
  ]
  let meterReadingsData = await getConsumptionDetails(queryObjectForConsumptionDetails)
  data = await fetchBill(queryObjectForFetchBill)
  payload = await getSearchResults(queryObjForSearch);
  let consumption = meterReadingsData.meterReadings[0].currentReading - meterReadingsData.meterReadings[0].lastReading
  payload.WaterConnection[0].service = "WATER"
  payload.WaterConnection[0].consumption = consumption
  payload.WaterConnection[0].currentMeterReading = meterReadingsData.meterReadings[0].currentReading
  payload.WaterConnection[0].lastMeterReading = meterReadingsData.meterReadings[0].lastReading
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

  await setDocuments(
    payload,
    "WaterConnection[0].tradeLicenseDetail.applicationDocuments",
    "WaterConnectionTemp[0].reviewDocData",
    dispatch
  );
  let sts = getTransformedStatus(get(payload, "WaterConnection[0].status"));
  payload && dispatch(prepareFinalObject("WaterConnection[0]", payload.WaterConnection[0]));
  data && dispatch(prepareFinalObject("Bill[0]", data.Bill[0]));
  payload &&
    dispatch(
      prepareFinalObject(
        "WaterConnectionTemp[0].tradeDetailsResponse",
        getTradeTypeSubtypeDetails(payload)
      )
    );
  const BillData = data.Bill[0];
  const fetchFromReceipt = sts !== "pending_payment";
  createEstimateData(
    BillData,
    "Bill[0].estimateCardData",
    dispatch,
    {},
    fetchFromReceipt
  );
  //Fetch Bill and populate estimate card
  // const code = get(
  //   payload,
  //   "WaterConnection[0].tradeLicenseDetail.address.locality.code"
  // );
  // const queryObj = [{ key: "tenantId", value: tenantId }];
  // // getBoundaryData(action, state, dispatch, queryObj, code);
};

const beforeInitFn = async (action, state, dispatch, consumerCode) => {
  //Search details for given application Number
  if (consumerCode) {
    !getQueryArg(window.location.href, "edited") &&
      (await searchResults(action, state, dispatch, consumerCode));

    // const status = getTransformedStatus(
    //   get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].status")
    // );
    const status = get(
      state,
      "screenConfiguration.preparedFinalObject.WaterConnection[0].status"
    );

    let data = get(state, "screenConfiguration.preparedFinalObject");

    const obj = setStatusBasedValue(status);

    // Get approval details based on status and set it in screenconfig

    if (
      status === "APPROVED" ||
      status === "REJECTED" ||
      status === "CANCELLED"
    ) {
      set(
        action,
        "screenConfig.components.div.children.viewBill.children.cardContent.children.approvalDetails.visible",
        true
      );

      if (get(data, "WaterConnection[0].tradeLicenseDetail.verificationDocuments")) {
        await setDocuments(
          data,
          "WaterConnection[0].tradeLicenseDetail.verificationDocuments",
          "WaterConnectionTemp[0].verifyDocData",
          dispatch
        );
      } else {
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.viewBill.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl",
            "visible",
            false
          )
        );
      }
    } else {
      set(
        action,
        "screenConfig.components.div.children.viewBill.children.cardContent.children.approvalDetails.visible",
        false
      );
    }

    const footer = footerReview(
      action,
      state,
      dispatch,
      status,
      consumerCode,
      tenantId
    );
    process.env.REACT_APP_NAME === "Citizen"
      ? set(action, "screenConfig.components.div.children.footer", footer)
      : set(action, "screenConfig.components.div.children.footer", {});

    if (status === "cancelled")
      set(
        action,
        "screenConfig.components.div.children.headerDiv.children.helpSection.children.cancelledLabel.visible",
        true
      );

    setActionItems(action, obj);
    // loadReceiptGenerationData(consumerCode, tenantId);
  }
};

let titleText = "";

const setStatusBasedValue = status => {
  switch (status) {
    case "approved":
      return {
        titleText: "Review the Trade License",
        titleKey: "TL_REVIEW_TRADE_LICENSE",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "pending_payment":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "TL_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_CEMP"]
        }
      };
    case "pending_approval":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "TL_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "cancelled":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
    case "rejected":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };

    default:
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
  }
};

const headerrow = getCommonContainer({
  header: getCommonHeader({
    labelKey: "WS_COMMON_WATER_BILL_HEADER"
  }),
  headerDynamicVal: getCommonHeader({
    labelName: `(Q3-2018-19)`,
  }),
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
    sourceJsonPath: "Bill[0].estimateCardData"
  }),
});

const propertyDetails = getProperty(false);
const ownerDetails = getOwner(false);
const serviceDetails = getService();

// let approvalDetails = getApprovalDetails(status);
let title = getCommonTitle({ labelName: titleText });

const setActionItems = (action, object) => {
  set(
    action,
    "screenConfig.components.div.children.viewBill.children.cardContent.children.title",
    getCommonTitle({
      labelName: get(object, "titleText"),
      labelKey: get(object, "titleKey")
    })
  );
  set(
    action,
    "screenConfig.components.div.children.viewBill.children.cardContent.children.title.visible",
    get(object, "titleVisibility")
  );
  set(
    action,
    "screenConfig.components.div.children.viewBill.children.cardContent.children.title.roleDefination",
    get(object, "roleDefination")
  );
};

export const viewBill = getCommonCard({
  estimate,
  serviceDetails,
  propertyDetails,
  ownerDetails
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "view-bill",
  beforeInitScreen: (action, state, dispatch) => {
    const tenantId = JSON.parse(getUserInfo()).tenantId;
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
    const queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessService", value: "WS" }
    ];
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
      moduleName: "egov-tradelicence",
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
