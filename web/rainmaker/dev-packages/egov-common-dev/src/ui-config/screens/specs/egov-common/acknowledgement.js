import {
    getCommonHeader,
    getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";
import { paymentFooter } from "./acknowledgementResource/paymentFooter";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import set from "lodash/set";
import { ifUserRoleExists } from "../utils";
import {download} from  "../../../../ui-utils/commons";
import './index.css';
const downloadprintMenu=(state,applicationNumber,tenantId)=>{
      let receiptDownloadObject = {
        label: { labelName: "DOWNLOAD RECEIPT", labelKey: "COMMON_DOWNLOAD_RECEIPT" },
        link: () => {
            const receiptQueryString = [
                { key: "receiptNumbers", value: applicationNumber },
                { key: "tenantId", value: tenantId }
            ]
            download(receiptQueryString);
          
        },
        leftIcon: "receipt"
      };
      let receiptPrintObject = {
        label: { labelName: "PRINT RECEIPT", labelKey: "COMMON_PRINT_RECEIPT" },
        link: () => {
            const receiptQueryString = [
                { key: "receiptNumbers", value: applicationNumber },
                { key: "tenantId", value: tenantId }
            ]
            download(receiptQueryString,"print");
        },
        leftIcon: "receipt"
      };
    let downloadMenu = [];
    let printMenu = [];
    // switch (purpose) {
    //   case "approve":
    //     downloadMenu = [certificateDownloadObject ];
    //     printMenu = [certificatePrintObject ];
    //     break;
    //   case "apply":
    //     downloadMenu = [applicationDownloadObject];
    //     printMenu = [applicationPrintObject];
    //     break;
    //     default:
    //     break;
    // }
        downloadMenu = [receiptDownloadObject];
        printMenu = [receiptPrintObject];
    
  
      return {
  
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className:"downloadprint-commonmenu",
          style: { textAlign: "right", display: "flex" }
        },
        children: {
          downloadMenu: {
            uiFramework: "custom-molecules",
            componentPath: "DownloadPrintButton",
            props: {
              data: {
                label: {labelName : "DOWNLOAD" , labelKey :"TL_DOWNLOAD"},
                 leftIcon: "cloud_download",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { height: "60px", color : "#FE7A51" }, className: "tl-download-button" },
                menu: downloadMenu
              }
            }
          },
          printMenu: {
            uiFramework: "custom-molecules",
            componentPath: "DownloadPrintButton",
            props: {
              data: {
                label: {labelName : "PRINT" , labelKey :"TL_PRINT"},
                leftIcon: "print",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { height: "60px", color : "#FE7A51"}, className: "tl-print-button" },
                menu: printMenu
              }
            }
          }
    
        },
        // gridDefination: {
        //   xs: 12,
        //   sm: 6
        // }
      
  
      }
     
  }
const getAcknowledgementCard = (
    state,
    dispatch,
    status,
    receiptNumber,
    consumerCode,
    tenant
) => {
    const roleExists = ifUserRoleExists("CITIZEN");
    if (status === "success") {
        return {
            header: getCommonContainer({
                header: getCommonHeader({
                    labelName: roleExists ? 'Payment Details' : 'Collection Details',
                    labelKey: roleExists ? "PAYMENT_HEADER_CITIZEN" : "PAYMENT_HEADER_EMPLOYEE"
                }),
                applicationNumber: {
                    uiFramework: "custom-atoms-local",
                    moduleName: "egov-common",
                    componentPath: "ApplicationNoContainer",
                    props: {
                        number: consumerCode,
                        label: {
                            labelValue:"Consumer Code.:",
                            labelKey:"PAYMENT_COMMON_CONSUMER_CODE"
                        }
                    }                  
                }
            }),
            headerdownloadprint:downloadprintMenu(state,receiptNumber,tenant),
            applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                children: {
                    card: acknowledgementCard({
                        icon: "done",
                        backgroundColor: "#39CB74",
                        header: {
                            labelName: roleExists ? "Payment has been paid successfully!" : "Payment has been collected successfully!",
                            labelKey: roleExists ? "PAYMENT_MESSAGE_CITIZEN" : "PAYMENT_MESSAGE_EMPLOYEE"
                        },
                        body: {
                            labelName: roleExists ? "A notification regarding Payment has been sent to property owner at registered Mobile No." : "A notification regarding Payment Collection has been sent to property owner at registered Mobile No.",
                            labelKey: roleExists ? "PAYMENT_MESSAGE_DETAIL_CITIZEN" : "PAYMENT_MESSAGE_DETAIL_EMPLOYEE"
                        },
                        tailText: {
                            labelName: "Payment Receipt No.",
                            labelKey: "PAYMENT_RECEIPT_NO"
                        },
                        number: receiptNumber
                    })
                }
            },
            // applicationSuccessFooter: applicationSuccessFooter(
            //     state,
            //     dispatch,
            //     receiptNumber,
            //     tenant,
            //     consumerCode
            // )
            paymentFooter: paymentFooter(state,consumerCode, tenant, status)
        };
    } else if (status === "failure") {
        return {
            header: getCommonContainer({
                header: getCommonHeader({
                    labelName: roleExists ? 'Payment Details' : 'Collection Details',
                    labelKey: roleExists ? "PAYMENT_HEADER_CITIZEN" : "PAYMENT_HEADER_EMPLOYEE"
                }),
                applicationNumber: {
                    uiFramework: "custom-atoms-local",
                    moduleName: "egov-common",
                    componentPath: "ApplicationNoContainer",
                    props: {
                        number: consumerCode,
                        label: {
                            labelValue:"Consumer Code.:",
                            labelKey:"PAYMENT_COMMON_CONSUMER_CODE"
                        }
                    }
                }
            }),
            applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                children: {
                    card: acknowledgementCard({
                        icon: "close",
                        backgroundColor: "#E54D42",
                        header: {
                            labelName: "Payment has failed!",
                            labelKey: "PAYMENT_FAILURE_MESSAGE"
                        },
                        body: {
                            labelName: "A notification regarding payment failure has been sent to property owner at registered Mobile No.",
                            labelKey: "PAYMENT_FAILURE_MESSAGE_DETAIL"
                        }
                    })
                }
            },
            paymentFooter: paymentFooter(state,consumerCode, tenant,status)
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
            },
            children: {}
        }
    },
    beforeInitScreen: (action, state, dispatch) => {
        const status = getQueryArg(window.location.href, "status");
        const consumerCode = getQueryArg(window.location.href, "consumerCode");
        const receiptNumber = getQueryArg(window.location.href, "receiptNumber");
        const tenant = getQueryArg(window.location.href, "tenantId");
        const data = getAcknowledgementCard(
            state,
            dispatch,
            status,
            receiptNumber,
            consumerCode,
            tenant
        );
        set(action, "screenConfig.components.div.children", data);
        return action;
    }
};

export default screenConfig;
