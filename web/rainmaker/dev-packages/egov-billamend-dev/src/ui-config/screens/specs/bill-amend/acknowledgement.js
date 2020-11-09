import { getCommonContainer, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { loadUlbLogo } from "egov-ui-kit/utils/pdfUtils/generatePDF";
import { generateTLAcknowledgement } from "egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement";
import get from "lodash/get";
import set from "lodash/set";
// import { getSearchResults } from "../../../../ui-utils/commons";
import { createEstimateData, getTransformedStatus } from "../utils";
import { loadReceiptGenerationData } from "../utils/receiptTransformer";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";
import { approvalSuccessFooter } from "./acknowledgementResource/approvalSuccessFooter";
import { gotoHomeFooter } from "./acknowledgementResource/gotoHomeFooter";
// import { paymentFailureFooter } from "./acknowledgementResource/paymentFailureFooter";
// import { paymentSuccessFooter } from "./acknowledgementResource/paymentSuccessFooter";
import "./index.css";



const getTradeTypeSubtypeDetails = payload => {
  const tradeUnitsFromApi = get(
    payload,
    "Licenses[0].tradeLicenseDetail.tradeUnits",
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

// const searchResults = async (dispatch, applicationNo, tenantId) => {
//   let queryObject = [
//     { key: "tenantId", value: tenantId },
//     { key: "applicationNumber", value: applicationNo }
//   ];
//   let payload = await getSearchResults(queryObject);

//   set(payload, "Licenses[0].assignee", []);

//   await setDocuments(
//     payload,
//     "Licenses[0].tradeLicenseDetail.applicationDocuments",
//     "LicensesTemp[0].reviewDocData",
//     dispatch, 'TL'
//   );
//   //set Trade Types

//   payload && dispatch(
//     prepareFinalObject(
//       "Licenses", get(
//         payload,
//         "Licenses",
//         []
//       )))
//   payload &&
//     dispatch(
//       prepareFinalObject(
//         "LicensesTemp[0].tradeDetailsResponse",
//         getTradeTypeSubtypeDetails(payload)
//       )
//     );
//   let sts = getTransformedStatus(get(payload, "Licenses[0].status"));
//   const LicenseData = payload.Licenses[0];
//   const fetchFromReceipt = sts !== "pending_payment";


//   // generate estimate data
//   createEstimateData(
//     LicenseData,
//     "LicensesTemp[0].estimateCardData",
//     dispatch,
//     {},
//     fetchFromReceipt
//   );
// };

const downloadprintMenu = (state, dispatch) => {
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "BILL_APPLICATION" },
    link: () => {
      const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
      const documents = LicensesTemp && LicensesTemp[0].reviewDocData;
      set(Licenses[0], "additionalDetails.documents", documents)
      // downloadAcknowledgementForm(Licenses);
      generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, `tl-acknowledgement-${Licenses[0].applicationNumber}`);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "BILL_APPLICATION" },
    link: () => {
      const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
      const documents = LicensesTemp && LicensesTemp[0].reviewDocData;
      set(Licenses[0], "additionalDetails.documents", documents)
      // downloadAcknowledgementForm(Licenses,'print');
      generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, 'print');
    },
    leftIcon: "assignment"
  };
  let downloadMenu = [];
  let printMenu = [];
  downloadMenu = [applicationDownloadObject];
  printMenu = [applicationPrintObject];


  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "downloadprint-commonmenu",
      style: { textAlign: "right", display: "flex", }
    },
    children: {
      downloadMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "Download", labelKey: "BILL_DOWNLOAD" },
            leftIcon: "cloud_download",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "tl-download-button" },
            menu: downloadMenu
          }
        }
      },
      printMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "PRINT", labelKey: "BILL_PRINT" },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
            menu: printMenu
          }
        }
      }

    },
  }

}
const getAcknowledgementCard = (
  state,
  dispatch,
  purpose,
  status,
  applicationNumber,
  secondNumber,
  financialYear,
  tenant
) => {
  const financialYearText = financialYear ? financialYear : "";
  if (purpose === "apply" && status === "success") {
    // searchResults(dispatch, applicationNumber, tenant);
    return {
      headerDiv: getCommonContainer({
        header: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children:{
            headerTitle:getCommonHeader({
              labelName: `Acknowledgement for Bill Amendment`,
              labelKey: "BILL_COMMON_APPLICATION_NEW_AMENDMENT",
              dynamicArray: [financialYearText],
              style:{alignSelf:"center"}
            })
          }
        },
        headerdownloadprint: downloadprintMenu(state, dispatch),
      },{style:{justifyContent:"space-between"}}),


      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          // style: {
          //   position: "absolute",
          //   width: "95%"
          // }
        },
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "BILL_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName:
                "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "BILL_APPLICATION_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BILL_APPLICATION_NUMBER"
            },
            number: applicationNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: applicationSuccessFooter(
        state,
        dispatch,
        applicationNumber,
        tenant
      )
    };
  } else if (purpose === "approve" && status === "success") {
    // loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: `BILL AMENDMENT Application ${financialYearText}`,
          labelKey: "BILL_AMENDMENT_APPLICATION",
          dynamicArray: [financialYearText]
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is Approved Successfully",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName:
                "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: `Application for Trade License ${financialYearText}`,
        labelKey: "TL_APPLICATION_TRADE_LICENSE",
        dynamicArray: [financialYearText]
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: "TL_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName:
                "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
    };
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const purpose = getQueryArg(window.location.href, "purpose");
    const status = getQueryArg(window.location.href, "status");
    const financialYear = getQueryArg(window.location.href, "FY");
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const secondNumber = getQueryArg(window.location.href, "secondNumber");
    const tenant = getQueryArg(window.location.href, "tenantId");
    loadUlbLogo(tenant);
    const data = getAcknowledgementCard(
      state,
      dispatch,
      purpose,
      status,
      applicationNumber,
      secondNumber,
      financialYear,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;