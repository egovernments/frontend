import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { isPublicSearch,getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { ifUserRoleExists } from "../../utils";
import './acknowledgementUtils.css';

const getHomeButtonPath = (item) => {
    if(JSON.parse(window.localStorage.getItem('Citizen.isMobileApp')) == true){
        return isPublicSearch() ? "/withoutAuth/pt-mutation/public-search" : ifUserRoleExists("CITIZEN") ?  "/" : "/inbox";
    }
    else
    {
        return isPublicSearch() ? "/withoutAuth/pt-mutation/public-search" : (ifUserRoleExists("CITIZEN") ? get(item, "citizenUrl", "/") : get(item, "employeeUrl", "/inbox"));
    }
    
}
const isMiniReceiptBtnVisible =()=>{
    if((process.env.REACT_APP_NAME === "Employee" && JSON.parse(window.localStorage.getItem('isPOSmachine')) )
    && status != "failure"){
        return true;
       
    }
    else 
    return false;

}
// const UCminiReceiptBuilder=(h)=> {
//     var NEXTLINE = "&&";
//     let receiptString = "     " + h["ulbType"];
//     receiptString = receiptString + NEXTLINE + "        Collection Receipt" + NEXTLINE;
//     receiptString = receiptString + "******************************************" + NEXTLINE; // receiptString = receiptString + " PTR UID       : " + h["propertyId"] + NEXTLINE;
  
//     receiptString = receiptString + " Receipt No    : " + h["receiptNumber"] + NEXTLINE;
//     receiptString = receiptString + " Receipt Date  : " + h["receiptDate"] + NEXTLINE;
//     receiptString = receiptString + " Consumer Name : " + h["consumerName"] + NEXTLINE; // receiptString = receiptString + " Financial Year: " + h["financialYear"] + NEXTLINE;
//     // receiptString = receiptString + " Owner Name    : " + h["ownerName"] + NEXTLINE;
//     // receiptString = receiptString + " Mobile Number : " + h["mobileNumber"] + NEXTLINE;
//     // receiptString = receiptString + " Property Type : " + h["propertyType"] + NEXTLINE;
//     // receiptString = receiptString + " Plot Size     : " + h["plotSize"] + " sq. yards" + NEXTLINE;
  
//     receiptString = receiptString + " Category      : " + h["businessService"] + NEXTLINE;
//     receiptString = receiptString + " From Period   : " + h["fromPeriod"] + NEXTLINE;
//     receiptString = receiptString + " To Period     : " + h["toPeriod"] + NEXTLINE;
//     receiptString = receiptString + " Paid Amount   : Rs." + h["receiptAmount"] + NEXTLINE;
//     receiptString = receiptString + " Payment Mode  : " + h["paymentMode"] + NEXTLINE;
//     receiptString = receiptString + " Collector Name: " + h["collectorName"] + NEXTLINE;
//     receiptString = receiptString + "******************************************" + NEXTLINE; //console.log(receiptString.replace(/&&/g, "\n"));
  
//     return "egov://print/" + receiptString;
//   }

const getCommonApplyFooter = children => {
    return {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
            className: "apply-wizard-footer common-footer-mobile"
        },
        children
    };
};

const defaultValues = {
    "code": "DEFAULT",
    "headerBandLabel": "PAYMENT_COMMON_CONSUMER_CODE",
    "receiptKey": "consolidatedreceipt",
    "billKey": "consolidatedbill",
    "buttons": [
        {
            "label": "COMMON_BUTTON_HOME",
            "citizenUrl": "/",
            "employeeUrl": "/inbox"
        }
    ]
}

export const paymentFooter = (state, consumerCode, tenant, status, businessService) => {

    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject, "commonPayInfo", defaultValues);
    const buttons = get(uiCommonPayConfig, "buttons");
    const redirectionURL = isPublicSearch() ? "/withoutAuth/egov-common/pay" : "/egov-common/pay";
    const path = `${redirectionURL}?consumerCode=${consumerCode}&tenantId=${tenant}&businessService=${businessService}`

    // gotoHome: {
    //     componentPath: "Button",
    //     props: {
    //         variant: "contained",
    //         color: "primary",
    //         className:"common-footer-mobile",
    //         style: {
    //             minWidth: "200px",
    //             height: "48px",
    //             marginRight: "16px",
    //             marginLeft: "40px"
    //         }
    //     },
    //     children: {
    //         downloadReceiptButtonLabel: getLabel({
    //             labelKey : label
    //         //    ...footer.label,
    //             //  labelName: get(footer,"label.labelName","GO TO HOME"),
    //             //  labelKey: get(footer,"label.labelKey","GO_TO_HOME")
    //         })
    //     },
    //     onClickDefination: {
    //         action: "page_change",
    //         path: get(footer,"link", `/inbox`)
    //     },
    // },



    const footer = buttons && buttons.map((item, index) => {
        return {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                className: "common-footer-mobile",

                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px",
                    marginTop: "5px"
                }
            },
            children: {
                downloadReceiptButtonLabel: getLabel({
                    labelKey: get(item, "label", "GO_TO_HOME")
                })
            },
            onClickDefination: {
                action: "page_change",
                path: getHomeButtonPath(item)
            },
        }
    })
    return getCommonApplyFooter({
        ...footer,
        printMiniReceiptButton: {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                // className: "apply-wizard-footer-right-button",
                className: "common-footer-mobile",
                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px",
                    marginTop: "5px"
                }
                // disabled: true
            },
            children: {
                printFormButtonLabel: getLabel({
                    labelName: "PRINT MINI RECEIPT",
                    labelKey: "COMMON_PRINT_MINI_RECEIPT"
                })
            },
            onClickDefination: {
                action: "condition",
                callBack: () => {

                    const ReceiptDataTemp = get(
                        state.screenConfiguration.preparedFinalObject,
                        "ReceiptTemp[0]"
                      );
                      
                     
                      let receiptDateFormatted = getDateFromEpoch(ReceiptDataTemp.Bill[0].billDate);
                      let receiptAmount = ReceiptDataTemp.instrument.amount;
                      let paymentMode = ReceiptDataTemp.instrument.instrumentType.name;
                     
                      let fromPeriod = getDateFromEpoch(ReceiptDataTemp.Bill[0].billDetails[0].fromPeriod);
                      let toPeriod = getDateFromEpoch(ReceiptDataTemp.Bill[0].billDetails[0].toPeriod);
                      let consumerName = ReceiptDataTemp.Bill[0].payerName;
                      let id = getQueryArg(window.location.href, "tenantId"); 
                      let localizedULBName = "";
                      if(id != null){
                       id =  id.split(".")[1];
                       localizedULBName =  id[0].toUpperCase() + id.slice(1);
                        
                      };
                      let collectorName = ""; 
                      
                    let empInfo = JSON.parse(localStorage.getItem("Employee.user-info"));
                    collectorName = empInfo.name;
                      let UCminiReceiptData = {
                        ulbType: localizedULBName,
                        receiptNumber: getQueryArg(window.location.href, "receiptNumber"),
                        tenantid: getQueryArg(window.location.href, "tenantId"),
                        consumerName: consumerName,
                        receiptDate: receiptDateFormatted,
                        businessService: getQueryArg(window.location.href, "businessService"),
                        fromPeriod: fromPeriod,
                        toPeriod: toPeriod,
                        receiptAmount: receiptAmount,
                        paymentMode: paymentMode,
                        collectorName: collectorName,
                        status:"Paid"
                      };  
                      try {
                          console.log("Receipt",JSON.stringify(UCminiReceiptData));
                        window.Android && window.Android.sendPrintData("printData",JSON.stringify(UCminiReceiptData));
                      } catch (e) {
                        console.log(e);
                      }
                     // UCminiReceiptBuilder(UCminiReceiptData);
                }
            },
            visible: isMiniReceiptBtnVisible()
        },
        retryButton: {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                className: "common-footer-mobile",
                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px",
                }
            },
            children: {
                downloadReceiptButtonLabel: getLabel({
                    labelName: "RETRY",
                    labelKey: "COMMON_RETRY"
                })
            },
            onClickDefination: {
                action: "page_change",
                path
            },
            visible: status === "failure" ? true : false
        }

    });
};