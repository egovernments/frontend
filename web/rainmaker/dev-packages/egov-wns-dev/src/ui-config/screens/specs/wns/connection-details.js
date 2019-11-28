import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonGrayCard,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getQueryArg,
  setBusinessServiceDataToLocalStorage,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import { footerReview } from "./viewBillResource/footer";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../ui-utils/commons";
import {
  createEstimateData,
  setMultiOwnerForSV,
  setValidToFromVisibilityForSV,
} from "../utils";

import { connectionDetailsFooter } from "./connectionDetailsResource/connectionDetailsFooter";
import {
  getHeaderSideText,
  getTransformedStatus
} from "../utils";
import { getServiceDetails } from "./connectionDetailsResource/service-details";
import { getPropertyDetails } from "./connectionDetailsResource/property-details";
import { getOwnerDetails } from "./connectionDetailsResource/owner-deatils";
import { loadReceiptGenerationData } from "../utils/receiptTransformer";

const tenantId = getQueryArg(window.location.href, "tenantId");
let connectionNumber = getQueryArg(window.location.href, "connectionNumber");
let connectionType = getQueryArg(window.location.href, "connectionType");
let headerSideText = { word1: "", word2: "" };

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

const searchResults = async (action, state, dispatch, connectionNumber) => {
  let queryObject = [
    { key: "tenantId", value: tenantId },
    { key: "connectionNumber", value: connectionNumber }
  ];
  let payload = await getSearchResults(queryObject);
  payload.WaterConnection[0].service = "WATER"
  headerSideText = getHeaderSideText(
    get(payload, "WaterConnection[0].status"),
    get(payload, "WaterConnection[0].licenseNumber")
  );
  set(payload, "WaterConnection[0].headerSideText", headerSideText);

  get(payload, "WaterConnection[0].property.owners") &&
    get(payload, "WaterConnection[0].property.owners.length" > 0)
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
  payload &&
    dispatch(
      prepareFinalObject(
        "WaterConnectionTemp[0].tradeDetailsResponse",
        getTradeTypeSubtypeDetails(payload)
      )
    );
  const LicenseData = payload.WaterConnection[0];
  const fetchFromReceipt = sts !== "pending_payment";
  createEstimateData(
    LicenseData,
    "WaterConnectionTemp[0].estimateCardData",
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

const beforeInitFn = async (action, state, dispatch, connectionNumber) => {
  //Search details for given application Number
  if (connectionNumber) {
    !getQueryArg(window.location.href, "edited") &&
      (await searchResults(action, state, dispatch, connectionNumber));

    // const status = getTransformedStatus(
    //   get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].status")
    // );
    // const status = get(
    //   state,
    //   "screenConfiguration.preparedFinalObject.WaterConnection[0].status"
    // );

    let data = get(state, "screenConfiguration.preparedFinalObject");
    let displayButton = get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].connectionType")
    const obj = setStatusBasedValue(status);
    if (displayButton !== "Metered") {
        set(
          action.screenConfig,
          "components.div.children.connectionDetails.children.cardContent.children.serviceDetails.viewOne.editSection.visible",
          false
        );
      }
    // Get approval details based on status and set it in screenconfig

    if (
      status === "APPROVED" ||
      status === "REJECTED" ||
      status === "CANCELLED"
    ) {
      set(
        action,
        "screenConfig.components.div.children.connectionDetails.children.cardContent.children.approvalDetails.visible",
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
            "components.div.children.connectionDetails.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl",
            "visible",
            false
          )
        );
      }
    } else {
      set(
        action,
        "screenConfig.components.div.children.connectionDetails.children.cardContent.children.approvalDetails.visible",
        false
      );
    }

    const footer = footerReview(
      action,
      state,
      dispatch,
      status,
      connectionNumber,
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

    // setActionItems(action, obj);
    // loadReceiptGenerationData(connectionNumber, tenantId);
  }
};


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
        titleText: "Active",
        titleVisibility: false,
        roleDefination: {}
      };
  }
};

const headerrow = getCommonContainer({
  header: getCommonHeader({
    labelKey: "WS_SEARCH_CONNECTIONS_DETAILS_HEADER"
  }),
  connectionNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: {
      number: connectionNumber
    }
  }
});

const serviceDetails = getServiceDetails(false);

const propertyDetails = getPropertyDetails(false);

const ownerDetails = getOwnerDetails(false);


const setActionItems = (action, object) => {
  set(
    action,
    "screenConfig.components.div.children.connectionDetails.children.cardContent.children.title",
    getCommonTitle({
      labelName: get(object, "titleText"),
      labelKey: get(object, "titleKey")
    })
  );
  set(
    action,
    "screenConfig.components.div.children.connectionDetails.children.cardContent.children.title.visible",
    get(object, "titleVisibility")
  );
  set(
    action,
    "screenConfig.components.div.children.connectionDetails.children.cardContent.children.title.roleDefination",
    get(object, "roleDefination")
  );
};

export const connectionDetails = getCommonCard({
  serviceDetails,
  propertyDetails,
  ownerDetails
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    const status = getQueryArg(window.location.href, "status");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    connectionNumber = getQueryArg(window.location.href, "connectionNumber");
    //To set the application no. at the  top
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.connectionNumber.props.number",
      connectionNumber
    );
    if (status !== "pending_payment") {
      set(
        action.screenConfig,
        "components.div.children.connectionDetails.children.cardContent.children.viewBreakupButton.visible",
        false
      );
    }
    const queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessService", value: "newTL" }
    ];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);
    beforeInitFn(action, state, dispatch, connectionNumber);
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
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end", display: "block" }
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              },
              children: {
                // process.env.REACT_APP_NAME === "Employee"
                //   ? {} 
                //   : {
                word1: {
                  ...getCommonTitle(
                    {
                      labelKey: "WS_CONNECTION_DETAILS_STATUS_HEADER"
                    },
                    {
                      style: {
                        marginRight: "10px",
                        // color: "rgba(0, 0, 0, 0.6000000238418579)"
                      }
                    }
                  )
                },
                word2: {
                  ...getCommonTitle({
                    labelName: "Active",
                    // jsonPath: "WaterConnection[0].headerSideText.word2"
                  }
                    ,
                    {
                      style: {
                        marginRight: "10px",
                        color: "rgba(0, 0, 0, 0.6000000238418579)"
                      }
                    })
                },
                // cancelledLabel: {
                //   ...getCommonHeader(
                //     {
                //       labelName: "Cancelled",
                //       labelKey: "TL_COMMON_STATUS_CANC"
                //     },
                //     { variant: "body1", style: { color: "#E54D42" } }
                //   ),
                //   visible: false
                // }
              }
            }
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
        },
        connectionDetails,
        connectionDetailsFooter
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
