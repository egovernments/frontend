import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";
import { download,downloadAppFeeReceipt } from "../../../../ui-utils/commons";
import { ifUserRoleExists, generateBill } from "../utils";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { paymentFooter } from "./acknowledgementResource/paymentFooter";
import './index.css';
import { getHeader } from "./pay";



const downloadprintMenu = (state, applicationNumber, tenantId, uiCommonPayConfig) => {
   const receiptKey = get(uiCommonPayConfig, "receiptKey","consolidatedreceipt")
   const licence = get(state.screenConfiguration.preparedFinalObject , "Licenses"); 
   let receiptDownloadObject = {

        label: { labelName: "DOWNLOAD RECEIPT", labelKey: "COMMON_DOWNLOAD_RECEIPT" },
        link: () => {
            const receiptQueryString = [
                { key: "receiptNumbers", value: applicationNumber },
                { key: "tenantId", value: tenantId }
            ]
            if(licence && licence[0].action && licence[0].action==="APPLY")
             {
                const queryStr = [
                   { key: "applicationNumber", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
                    { key: "tenantId", value: tenantId }
                ]
                 downloadAppFeeReceipt(queryStr , "download" , "tradelicense-appl-receipt",state);
            }
         
        else
            download(receiptQueryString, "download", receiptKey, state);

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
            if(licence && licence[0].action && licence[0].action==="APPLY")
            downloadAppFeeReceipt(receiptQueryString , "print" , "tradelicense-appl-receipt",state);
         
           else
            download(receiptQueryString, "print", receiptKey, state);
        },
        leftIcon: "receipt"
    };
    let downloadMenu = [];
    let printMenu = [];
    downloadMenu = [receiptDownloadObject];
    printMenu = [receiptPrintObject];


    return {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        visible:JSON.parse(window.localStorage.getItem('isPOSmachine'))? false : true,
        props: {
            className: "downloadprint-commonmenu",
            style: { textAlign: "right", display: "flex" },
           
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
                        props: { variant: "outlined", style: { height: "60px", color: "#FE7A51",marginRight:"5px" }, className: "tl-download-button"},
                        menu: downloadMenu
                    },
                    
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
    status,
    receiptNumber,
    consumerCode,
    tenant
) => {
    const roleExists = ifUserRoleExists("CITIZEN");
    let header = getHeader(state);
    const businessService = getQueryArg(window.location.href, "businessService");
    const transBusinessService = businessService ? businessService.toUpperCase().replace(/[._:-\s\/]/g, "_") : "DEFAULT";
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    if (status === "success") {
        return {
            header,
            headerdownloadprint: downloadprintMenu(state, receiptNumber, tenant, uiCommonPayConfig),
            applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                children: {
                    card: acknowledgementCard({
                        icon: "done",
                        backgroundColor: "#39CB74",
                        header: {
                            labelKey:"SUCCESS_PAYMENT_MESSAGE"
                        },
                        body: {
                            labelKey: "SUCCESS_PAYMENT_MESSAGE_DETAIL"
                        },
                        tailText: {
                            labelKey: "SUCCESS_PAYMENT_RECEIPT_NO"
                        },
                        number: receiptNumber
                    })
                }
            },
            paymentFooter: paymentFooter(state, consumerCode, tenant, status, businessService)
        };
    } else if (status === "failure") {
        return {
            header,
            applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                children: {
                    card: acknowledgementCard({
                        icon: "close",
                        backgroundColor: "#E54D42",
                        header: {
                            labelKey:  "FAILURE_PAYMENT_MESSAGE"
                        },
                        body: {
                            labelKey: "FAILURE_PAYMENT_MESSAGE_DETAIL"
                        }
                    })
                }
            },
            paymentFooter: paymentFooter(state, consumerCode, tenant, status, businessService)
        };
    }else if(status ==="pending"){
        return {
            header,
            applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                children: {
                    card: acknowledgementCard({
                        icon: "close",
                        backgroundColor: "#E54D42",
                        // header: {
                        //     labelKey: roleExists ? `CITIZEN_PENDING_${transBusinessService}_PAYMENT_MESSAGE` : `EMPLOYEE_PENDING_${transBusinessService}_PAYMENT_MESSAGE`
                        // },
                        // body: {
                        //     labelKey: roleExists ? `CITIZEN_PENDING_${transBusinessService}_PAYMENT_MESSAGE_DETAIL` : `EMPLOYEE_PENDING_${transBusinessService}_PAYMENT_MESSAGE_DETAIL`
                        // }
                        header: {
                            labelKey: "PENDING_PAYMENT_MESSAGE"
                        },
                        body: {
                            labelKey: "PENDING_PAYMENT_MESSAGE_DETAIL"
                        }
                    })
                }
            },
            paymentFooter: paymentFooter(state, consumerCode, tenant, status, businessService)
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
        const businessService = getQueryArg(window.location.href, "businessService");
        // Calling the Bill so that payer information can be set in the PDF for Citizen application
        if(process.env.REACT_APP_NAME === "Citizen") {
            generateBill(dispatch, consumerCode, tenant, businessService);
        }
        const data = getAcknowledgementCard(
            state,
            dispatch,
            status,
            receiptNumber,
            consumerCode,
            tenant
        );

        // const script = document.createElement("script");
        // script.src = "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/ulb-overrides-uat-20191226.js";
        // script.async = true;
        // script.onload = () =>{
        //     //var ret = window.isMobileView();
        //     if(true === JSON.parse(window.localStorage.getItem('isPOSmachine'))){
        //         const ReceiptDataTemp = get(
        //             state.screenConfiguration.preparedFinalObject,
        //             "ReceiptTemp[0]"
        //           );
                  
                 
        //           var receiptDateFormatted = getDateFromEpoch(ReceiptDataTemp.Bill[0].billDate);
        //           var receiptAmount = ReceiptDataTemp.instrument.amount;
        //           var paymentMode = ReceiptDataTemp.instrument.instrumentType.name;
                 
        //           var fromPeriod = getDateFromEpoch(ReceiptDataTemp.Bill[0].billDetails[0].fromPeriod);
        //           var toPeriod = getDateFromEpoch(ReceiptDataTemp.Bill[0].billDetails[0].toPeriod);
        //           var consumerName = ReceiptDataTemp.Bill[0].payerName;
        //           var localizedULBName = document.getElementsByClassName("rainmaker-displayInline")[0].textContent;
        //           var collectorName = ""; 
        //           if (window.isEmployee()) {
        //             var empInfo = JSON.parse(localStorage.getItem("Employee.user-info"));
        //             collectorName = empInfo.name;
        //           }


        //           var UCminiReceiptData = {
        //             ulbType: localizedULBName,
        //             receiptNumber: receiptNumber,
        //             tenantid: tenant,
        //             consumerName: consumerName,
        //             receiptDate: receiptDateFormatted,
        //             businessService: businessService,
        //             fromPeriod: fromPeriod,
        //             toPeriod: toPeriod,
        //             receiptAmount: receiptAmount,
        //             paymentMode: paymentMode,
        //             collectorName: collectorName
        //           };  

        //         var UCreceiptURL = window.UCminiReceiptBuilder(UCminiReceiptData);
        //         window.loadUCMiniReceiptButton(UCreceiptURL);
                
        //     }
              
        // };
        // document.body.appendChild(script);






        set(action, "screenConfig.components.div.children", data);
        return action;
    }
};

export default screenConfig;
