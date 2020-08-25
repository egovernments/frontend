import { getCommonHeader,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  acknowledgementSuccesFooter,
  acknowledgementFailureFooter
} from "./acknowledgementResource/acknowledgementFooter";
import set from "lodash/set";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getSearchResults } from "../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { generateTLAcknowledgement } from "egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement";

const header = getCommonHeader({
  labelName: `mCollect`,
  labelKey: "ACTION_TEST_UNIVERSAL_COLLECTION",
 });

const getAcknowledgementCard = (
  state,
  dispatch,
  purpose,
  status,
  challanNumber,
 
) => {
  if (purpose === "pay" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: `New Collection`,
        labelKey: "UC_COMMON_HEADER"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: {
            position: "absolute",
            width: "95%"
          }
        },
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "UC_PAYMENT_COLLECTED_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName:
                "A notification regarding Payment Collection has been sent to the consumer at registered Mobile No.",
              labelKey: "UC_PAYMENT_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "payment receipt no.",
              labelKey: "UC_PAYMENT_NO_LABEL"
            },
            number: challanNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: acknowledgementSuccesFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: getCommonHeader({
        labelName: `New collection`,
        labelKey: "new collection"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Payment Collection failed!",
              labelKey: "UC_PAYMENT_FAILED"
            },
            body: {
              labelName: "Payment Collection has been failed!",
              labelKey: "UC_PAYMENT_NOTIFICATION"
            }
          })
        }
      },
      paymentFailureFooter: acknowledgementFailureFooter
    };
  }
  else if(purpose === "challan" && status === "success"){
    const billNo = get(
      state.screenConfiguration.preparedFinalObject,
      "ReceiptTemp[0].Bill[0].billNumber"
    );

    let downloadMenu = [];
      let printMenu = [];
      
    const downloadprintMenu = (state, dispatch) => {
      let applicationDownloadObject = {
        label: { labelName: "Application", labelKey: "TL_APPLICATION" },
        link: () => {
          const { UC_Challan } = state.screenConfiguration.preparedFinalObject;                  
          generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, 'download');
        },
        leftIcon: "assignment"
      };
      let applicationPrintObject = {
        label: { labelName: "Application", labelKey: "TL_APPLICATION" },
        link: () => {
          const { UC_Challan } = state.screenConfiguration.preparedFinalObject;        
          generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, 'print');
        },
        leftIcon: "assignment"
      };
      
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
   }

     return {
     
       headerDiv:{
        uiFramework: "custom-atoms",
        componentPath: "Div",
       
        children: {

          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
  
            children: {
              header: {
                gridDefination: {
                  xs: 12,
                  sm: 2
                },
                ...header,            
              },
              challanNo:{
                uiFramework: "custom-atoms",
                componentPath: "Div",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
               children: {
                challanNumberContainer: getCommonContainer({
                  challanNumber: {
                       uiFramework: "custom-atoms-local",
                       moduleName: "egov-uc",
                       componentPath: "ApplicationNoContainer",
                       
                       props: {
                         number: challanNumber,
                       },
                     },
                   }),
               }
              },
         
              helpSection: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
               gridDefination: {
                 xs: 12,
                 sm: 6
               },
               props: {
                className: "downloadprint-commonmenu",
                style: { textAlign: "right", display: "flex",justifyContent: "flex-end" },
               },
               children: {
               downloadMenu: {
               uiFramework: "custom-molecules",
               componentPath: "DownloadPrintButton",
               props: {
                 data: {
                   label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
                   leftIcon: "cloud_download",
                   rightIcon: "arrow_drop_down",
                   props: {
                     variant: "outlined",
                     style: { height: "60px", color: "#FE7A51",marginRight:"5px" },
                     className: "tl-download-button",
                   },
                   menu: downloadMenu,
                 },
               },
               },
               printMenu: {
               uiFramework: "custom-molecules",
               componentPath: "DownloadPrintButton",
               props: {
                 data: {
                   label: { labelName: "PRINT", labelKey: "TL_PRINT" },
                   leftIcon: "print",
                   rightIcon: "arrow_drop_down",
                   props: {
                     variant: "outlined",
                     style: { height: "60px", color: "#FE7A51" },
                     className: "tl-print-button",
                   },
                   menu: printMenu,
                 },
               },
             },
             },
            },
            }
          },
                 
        
        

        },
      },
     
     
      // helpSection: {
      //   uiFramework: "custom-atoms",
      //   componentPath: "Div",
      //   props: {
      //     className: "downloadprint-commonmenu",
      //     style: { textAlign: "right", display: "flex",justifyContent: "flex-end" },
      //   },
      //   children: {
      //     downloadMenu: {
      //       uiFramework: "custom-molecules",
      //       componentPath: "DownloadPrintButton",
      //       props: {
      //         data: {
      //           label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
      //           leftIcon: "cloud_download",
      //           rightIcon: "arrow_drop_down",
      //           props: {
      //             variant: "outlined",
      //             style: { height: "60px", color: "#FE7A51" },
      //             className: "tl-download-button",
      //           },
      //           menu: [],
      //         },
      //       },
      //     },
      //     printMenu: {
      //       uiFramework: "custom-molecules",
      //       componentPath: "DownloadPrintButton",
      //       props: {
      //         data: {
      //           label: { labelName: "PRINT", labelKey: "TL_PRINT" },
      //           leftIcon: "print",
      //           rightIcon: "arrow_drop_down",
      //           props: {
      //             variant: "outlined",
      //             style: { height: "60px", color: "#FE7A51" },
      //             className: "tl-print-button",
      //           },
      //           menu: [],
      //         },
      //       },
      //     },
      //   },
      // },

      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: {
            position: "absolute",
            width: "95%"
          }
        },
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Bill Generated Successfully!",
              labelKey: "UC_BILL_GENERATED_SUCCESS_MESSAGE"
            },
            body: {
              labelName:
                "A notification regarding Payment Collection has been sent to the consumer at registered Mobile No.",
              labelKey: "UC_BILL_GENERATION_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Bill No.",
              labelKey: "UC_BILL_NO_LABEL"
            },
            number: billNo
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: acknowledgementSuccesFooter
    };
  }
};

const getSearchData = async (dispatch, queryObj) => {
  const response = await getSearchResults(queryObj);
  response &&
    response.Receipt &&
    response.Receipt.length > 0 &&
    dispatch(
      prepareFinalObject("receiptSearchResponse.Receipt", response.Receipt)
    );
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
   // const billNumber = getQueryArg(window.location.href, "billNumber");
    const challanNumber = getQueryArg(window.location.href, "challanNumber");
    const tenant = getQueryArg(window.location.href, "tenantId");
    const serviceCategory = getQueryArg(
      window.location.href,
      "serviceCategory"
    );
    const tenantId = getTenantId();
    const queryObject = [
      {
        key: "tenantId",
        value: tenantId
      },
      { key: "offset", value: "0" },
      // {
      //   key: "receiptNumbers",
      //   value: billNumber
      // },
      {
        key: "businessServices",
        value: serviceCategory
      }
    ];

   // getSearchData(dispatch, queryObject);

    const data = getAcknowledgementCard(
      state,
      dispatch,
      purpose,
      status,
      //billNumber,
      challanNumber,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;
