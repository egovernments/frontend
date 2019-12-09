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

import { connectionDetailsFooter } from "./connectionDetailsResource/connectionDetailsFooter";
import { getServiceDetails } from "./connectionDetailsResource/service-details";
import { getPropertyDetails } from "./connectionDetailsResource/property-details";
import { getOwnerDetails } from "./connectionDetailsResource/owner-deatils";
const tenantId = getQueryArg(window.location.href, "tenantId")
let connectionNumber = getQueryArg(window.location.href, "connectionNumber");
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

const searchResults = async (action, state, dispatch, connectionNumber) => {
  let queryObject = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: connectionNumber }];
  // let payloadData = await getSearchResults(queryObject);
  let payloadData = {
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
  if (payloadData !== null && payloadData !== undefined && payloadData.WaterConnection.length > 0) {
    payloadData.WaterConnection[0].service = "WATER"
    dispatch(prepareFinalObject("WaterConnection[0]", payloadData.WaterConnection[0]))
  }
};

const beforeInitFn = async (action, state, dispatch, connectionNumber) => {
  //Search details for given application Number
  if (connectionNumber) {
    (await searchResults(action, state, dispatch, connectionNumber));
    let connectionType = get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].connectionType")
    if (connectionType !== "Metered") {
      set(
        action.screenConfig,
        "components.div.children.connection-details.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.editSection.visible",
        false
      );
    } else {
      set(
        action.screenConfig,
        "components.div.children.connection-details.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.editSection.visible",
        true
      );
    }

    const footer = footerReview(action, state, dispatch, status, connectionNumber, tenantId);
    process.env.REACT_APP_NAME === "Citizen"
      ? set(action, "screenConfig.components.div.children.footer", footer)
      : set(action, "screenConfig.components.div.children.footer", {});
  }
};

const headerrow = getCommonContainer({
  header: getCommonHeader({ labelKey: "WS_SEARCH_CONNECTIONS_DETAILS_HEADER" }),
  connectionNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: {
      number: connectionNumber
    }
  }
});

const serviceDetails = getServiceDetails();

const propertyDetails = getPropertyDetails(false);

const ownerDetails = getOwnerDetails(false);

export const connectionDetails = getCommonCard({ serviceDetails, propertyDetails, ownerDetails });

const screenConfig = {
  uiFramework: "material-ui",
  name: "connection-details",
  beforeInitScreen: (action, state, dispatch) => {
    set(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connectionNumber.props.number", connectionNumber);
    const tenantId = getQueryArg(window.location.href, "tenantId");
    connectionNumber = getQueryArg(window.location.href, "connectionNumber");
    const queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessService", value: "WS" }];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);
    beforeInitFn(action, state, dispatch, connectionNumber);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview",
        id: "connection-details"
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
