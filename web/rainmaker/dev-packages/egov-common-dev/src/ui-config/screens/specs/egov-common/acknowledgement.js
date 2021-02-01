import { paymentFooter } from "./acknowledgementResource/paymentFooter";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import set from "lodash/set";
import get from "lodash/get";
import { ifUserRoleExists } from "../utils";
import {download} from  "../../../../ui-utils/commons";
import {getHeader} from "./pay";
import { httpRequest } from "../../../../ui-utils/api";
import { downloadReceiptFromFilestoreID } from "egov-common/ui-utils/commons"
import './index.css';


const downloadprintMenu=(state,applicationNumber,tenantId,uiCommonPayConfig)=>{
    const receiptKey = get(uiCommonPayConfig, "receiptKey");
    const businessService=get(state.screenConfiguration.preparedFinalObject,"Licenses[0].businessService");
    const applicationType=get(state.screenConfiguration.preparedFinalObject,"Licenses[0].applicationType")?get(state.screenConfiguration.preparedFinalObject,"Licenses[0].applicationType"):"NA";
    const workflowCode=get(state.screenConfiguration.preparedFinalObject,"Licenses[0].workflowCode")?get(state.screenConfiguration.preparedFinalObject,"Licenses[0].workflowCode"):"NA";

      let receiptDownloadObject = {
        label: { labelName: "DOWNLOAD RECEIPT", labelKey: "COMMON_DOWNLOAD_RECEIPT" },
        link: () => {
            const receiptQueryString = [
                { key: "receiptNumbers", value: applicationNumber },
                { key: "tenantId", value: tenantId }
            ]
            download(receiptQueryString , "download" , receiptKey, state);
          
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
            download(receiptQueryString  ,"print" , receiptKey ,state);
        },
        leftIcon: "receipt"
      };
      let tlCertificateDownloadObject = {
        label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
        link: () => {
          const { Licenses } = state.screenConfiguration.preparedFinalObject;
          downloadCertificateForm(Licenses,applicationNumber,tenantId,);
        },
        leftIcon: "book"
      };
      let tlCertificatePrintObject = {
        label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
        link: () => {
          const { Licenses } = state.screenConfiguration.preparedFinalObject;
          downloadCertificateForm(Licenses,applicationNumber,tenantId,'print');
        },
        leftIcon: "book"
      };
    let downloadMenu = [];
    let printMenu = [];
    if(businessService == "TL" && applicationType == "RENEWAL" && workflowCode == "DIRECTRENEWAL")
    {
        downloadMenu = [receiptDownloadObject,tlCertificateDownloadObject];
        printMenu = [receiptPrintObject,tlCertificatePrintObject];
    }
    else{
        downloadMenu = [receiptDownloadObject];
        printMenu = [receiptPrintObject];
    }  
    
  
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
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject , "commonPayInfo");
    if (status === "success") {
       let extraData= {...state.properties, 'payment':state.screenConfiguration.paymentDetails}
        return {
            header,
            headerdownloadprint:downloadprintMenu(state,receiptNumber,tenant,uiCommonPayConfig),
            applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                children: {
                    card: acknowledgementCard({
                        icon: "done",
                        backgroundColor: "#39CB74",
                            header: {
                                labelKey: roleExists ? `CITIZEN_SUCCESS_PAYMENT_MESSAGE` : `EMPLOYEE_SUCCESS_PAYMENT_MESSAGE`
                            },
                            body: {
                                labelKey: roleExists ? `CITIZEN_SUCCESS_PAYMENT_MESSAGE_DETAIL` : `EMPLOYEE_SUCCESS_PAYMENT_MESSAGE_DETAIL`
                            },
                            tailText: {
                                labelKey : roleExists ? `CITIZEN_SUCCESS_PAYMENT_RECEIPT_NO` : `EMPLOYEE_SUCCESS_PAYMENT_RECEIPT_NO`
                            },
                        number: receiptNumber
                        
                    })
                }
            },
            paymentFooter: paymentFooter(state,consumerCode, tenant, status,extraData)
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
                            labelKey: roleExists ? `CITIZEN_FAILURE_AYMENT_MESSAGE` : `EMPLOYEE_FAILURE_PAYMENT_MESSAGE`
                        },
                        body: {
                            labelKey: roleExists ? `CITIZEN_FAILURE_PAYMENT_MESSAGE_DETAIL` : `EMPLOYEE_FAILURE_PAYMENT_MESSAGE_DETAIL`
                        }
                    })
                }
            },
            paymentFooter: paymentFooter(state,consumerCode, tenant,status,null)
        };
    }
};
const downloadCertificateForm = async(LicensesOld,applicationNumber,tenantId,mode='download') => {
    const applicationType= LicensesOld &&  LicensesOld.length >0 ? get(LicensesOld[0],"applicationType") : "NEW";
    const workflowCode=LicensesOld &&  LicensesOld.length >0 ? get(LicensesOld[0],"workflowCode"):"EDITRENEWAL";
   
     const queryStr = [
       { key: "key", value:workflowCode==="DIRECTRENEWAL"?"tlrenewalcertificate": "tlcertificate" },
       { key: "tenantId", value: "pb" }
     ]
     const DOWNLOADRECEIPT = {
       GET: {
         URL: "/pdf-service/v1/_create",
         ACTION: "_get",
       },
     };
     let queryObject = [
       { key: "tenantId", value: tenantId},
       {
         key: "applicationNumber",
         value: LicensesOld[0].applicationNumber
       }
     ];
     const LicensesPayload = await getSearchResults(queryObject);
     const Licenses=get(LicensesPayload,"Licenses");
     const oldFileStoreId=get(Licenses[0],"fileStoreId")
     if(oldFileStoreId){
       downloadReceiptFromFilestoreID(oldFileStoreId,mode)
     }
     else{
     try { 
       httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Licenses }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
         .then(res => {
           res.filestoreIds[0]
           if (res && res.filestoreIds && res.filestoreIds.length > 0) {
             res.filestoreIds.map(fileStoreId => {
               downloadReceiptFromFilestoreID(fileStoreId,mode)
             })
           } else {
             console.log("Error In Acknowledgement form Download");
           }
         });
     } catch (exception) {
       alert('Some Error Occured while downloading Acknowledgement form!');
     }
   }
   };

   const getSearchResults = async queryObject => {
    try {
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_search",
        "",
        queryObject
      );
      return response;
    } catch (error) {
      console.log(error);
      return {};
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
