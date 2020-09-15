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
import { downloadChallan } from "../utils";
import './index.css';
const header = getCommonHeader({
  labelName: `mCollect`,
  labelKey: "ACTION_TEST_UNIVERSAL_COLLECTION",
 });

const downloadprintMenu = (state, dispatch) => {
  let applicationDownloadObject = {
    label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
    link: () => {
      const totalAmount = get(
        state.screenConfiguration.preparedFinalObject,
        "ReceiptTemp[0].Bill[0].totalAmount"
      );
      const billDate = get(
        state.screenConfiguration.preparedFinalObject,
        "ReceiptTemp[0].Bill[0].billDate"
      );
      
      dispatch(
        prepareFinalObject(
          "Challan.totalAmount",
          totalAmount
        )
      );
      dispatch(
        prepareFinalObject(
          "Challan.billDate",
           billDate
        )
      );
      const { Challan } = state.screenConfiguration.preparedFinalObject;
      downloadChallan(Challan,"download");         
     // generateTLAcknowledgement(state.screenConfiguration.preparedFinalObject, `tl-acknowledgement-${Challan.id}`);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
    link: () => {
      const { Challan } = state.screenConfiguration.preparedFinalObject;
      downloadChallan(Challan,"print");          
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
      style: { textAlign: "right", display: "flex" }
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
            props: { variant: "outlined", 
            style: { 
              height: "60px", color: "#FE7A51", 
              marginRight: "5px" 
            },
            className: "uc-download-button" },
            menu: downloadMenu
          }
        }
      },
      printMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "PRINT", labelKey: "TL_PRINT" },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", 
            style: { height: "60px", color: "#FE7A51" },
            className: "uc-print-button" },
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
  challanNumber,
 
 ) => {
   if(purpose === "challan" && status === "success"){
    const billNo = get(
      state.screenConfiguration.preparedFinalObject,
      "ReceiptTemp[0].Bill[0].billNumber"
    ); 
     return {     
      
      header :getCommonContainer({
        header: getCommonHeader({
            labelName: `mCollect`, //later use getFinancialYearDates
            labelKey: "ACTION_TEST_UNIVERSAL_COLLECTION"
        }),
        consumerCode: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-common",
            componentPath: "ApplicationNoContainer",
            props: {
                number: challanNumber,
                label: {
                    labelKey:   "PAYMENT_UC_CONSUMER_CODE",
                },
            }
        }
      }),
      headerdownloadprint:downloadprintMenu(state, dispatch),  
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
          
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
  else if (purpose === "challan" && status === "failure") {
    console.info("came to failure");
    return {
      header: getCommonHeader({
        labelName: `mCollect`,
        labelKey: "ACTION_TEST_UNIVERSAL_COLLECTION",
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Sorry Bill generation failed!",
              labelKey: "UC_BILL_GENERATED_FAILURE_MESSAGE"
            },
            body: {
              labelName: "Sorry Bill generation has been failed!",
              labelKey: "UC_BILL_GENERATED_FAILURE_MESSAGE_BODY"
            }
          })
        }
      },
      paymentFailureFooter: acknowledgementFailureFooter
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
      {
        key: "businessServices",
        value: serviceCategory
      }
    ];
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
