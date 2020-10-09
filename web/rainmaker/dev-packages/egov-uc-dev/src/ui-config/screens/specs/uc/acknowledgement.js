import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";
// import { download } from "../../../../ui-utils/commons";
import { ifUserRoleExists, generateBill } from "../utils";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { paymentFooter } from "./acknowledgementResource/acknowledgementFooter";
import './index.css';
// import { getHeader } from "./pay";
import {
  getCommonCard,
  getCommonHeader,
  getCommonContainer
  //getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import store from "ui-redux/store";
import axios from "axios";

import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const downloadReceiptFromFilestoreID = (fileStoreId, mode, tenantId) => {
  getFileUrlFromAPI(fileStoreId, tenantId).then(async (fileRes) => {
    if (mode === 'download') {
      downloadPdf(fileRes[fileStoreId]);
    } else if (mode === 'open') {
      openPdf(fileRes[fileStoreId], '_self')
    }
    else {
      printPdf(fileRes[fileStoreId]);
    }
  });
}

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "New universal Collection",
    labelKey: "UC_PAY_HEADER"
  })
});

export const localStorageGet = (key, path) => {
  const appName = process.env.REACT_APP_NAME;
  let value = null;
  if (path) {
    const data = JSON.parse(window.localStorage.getItem(appName + "." + key)) || null;
    value = get(data, path);
  } else {
    value = window.localStorage.getItem(appName + "." + key) || null;
  }
  return value;
};

export const getAccessToken = () => {
  return localStorageGet(`token`);
};

export const getLocale = () => {
  return localStorage.getItem("locale");
};

export const isPublicSearch = () => {
  return window.location && window.location.pathname && window.location.pathname.includes("/withoutAuth");
}

const wrapRequestBody = (requestBody, action) => {
  const authToken = getAccessToken();
  let RequestInfo = {
    apiId: "Mihy",
    ver: ".01",
    // ts: getDateInEpoch(),
    action: action,
    did: "1",
    key: "",
    msgId: `20170310130900|${getLocale()}`,
    requesterId: "",
    authToken: authToken
  };
  if(isPublicSearch()) delete RequestInfo.authToken;
  return Object.assign(
    {},
    {
      RequestInfo
    },
    requestBody
  );
  downloadReceiptFromFilestoreID};


  const instance = axios.create({
    baseURL: window.location.origin,
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  
  export const addQueryArg = (url, queries = []) => {
    const urlParts = url.split("?");
    const path = urlParts[0];
    let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
    queries.forEach(query => {
      const key = query.key;
      const value = query.value;
      const newQuery = `${key}=${value}`;
      queryParts.push(newQuery);
    });
    const newUrl = path + "?" + queryParts.join("&");
    return newUrl;
  };

export const httpRequest = async (
  method = "get",
  endPoint,
  action,
  queryObject = [],
  requestBody = {},
  headers = []
) => {
  store.dispatch(toggleSpinner());
  let apiError = "Api Error";

  if (headers)
    instance.defaults = Object.assign(instance.defaults, {
      headers
    });

  endPoint = addQueryArg(endPoint, queryObject);
  var response;
  try {
    switch (method) {
      case "post":
        response = await instance.post(
          endPoint,
          wrapRequestBody(requestBody, action)
        );
        break;
      default:
        response = await instance.get(endPoint);
    }
    const responseStatus = parseInt(response.status, 10);
    store.dispatch(toggleSpinner());
    if (responseStatus === 200 || responseStatus === 201) {
      return response.data;
    }
  } catch (error) {
    const { data, status } = error.response;
    if (status === 400 && data === "") {
      apiError = "INVALID_TOKEN";
    } else {
      apiError =
        (data.hasOwnProperty("Errors") &&
          data.Errors &&
          data.Errors.length &&
          data.Errors[0].message) ||
        (data.hasOwnProperty("error") &&
          data.error.fields &&
          data.error.fields.length &&
          data.error.fields[0].message) ||
        (data.hasOwnProperty("error_description") && data.error_description) ||
        apiError;
    }

    store.dispatch(toggleSpinner());
  }
  // unhandled error
  throw new Error(apiError);
};

function globalConfigExists() {
  return typeof window.globalConfigs !== "undefined" && typeof window.globalConfigs.getConfig === "function";
}

const commonConfig = {
  MAP_API_KEY: globalConfigExists() ? window.globalConfigs.getConfig("GMAPS_API_KEY") : process.env.REACT_APP_GMAPS_API_KEY,
  tenantId: globalConfigExists() ? window.globalConfigs.getConfig("STATE_LEVEL_TENANT_ID") : process.env.REACT_APP_DEFAULT_TENANT_ID,
  forgotPasswordTenant: "pb.amritsar",
};

export const getFileUrlFromAPI = async (fileStoreId, tenantId) => {
  const queryObject = [
    { key: "tenantId", value: tenantId || commonConfig.tenantId },
    { key: "fileStoreIds", value: fileStoreId }
  ];
  try {
    const fileUrl = await httpRequest(
      "get",
      "/filestore/v1/files/url",
      "",
      queryObject
    );
    return fileUrl;
  } catch (e) {
    console.log(e);
  }
};

export const downloadPdf = (link, openIn = '_blank') => {
  var win = window.open(link, openIn);
  if (win) {
    win.focus();
  }
}

export const printPdf = async (link) => {
  var response = await axios.get(link, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/pdf"
    }
  });
  const file = new Blob([response.data], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);
  var myWindow = window.open(fileURL);
  if (myWindow != undefined) {
    myWindow.addEventListener("load", event => {
      myWindow.focus();
      myWindow.print();
    });
  }
}


export const openPdf = async (link, openIn = '_blank') => {
  if (window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp()) {
    downloadPdf(link, '_self');
  } else {
    var response = await axios.get(link, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf"
      }
    });
    const file = new Blob([response.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    var myWindow = window.open(fileURL, openIn);
    if (myWindow != undefined) {
      myWindow.addEventListener("load", event => {
        myWindow.focus();
      });
    }
  }
}


export const download = (receiptQueryString, mode = "download", configKey = "consolidatedreceipt", state) => {
  if (state && process.env.REACT_APP_NAME === "Citizen" && configKey === "consolidatedreceipt") {
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    configKey = get(uiCommonPayConfig, "receiptKey", "consolidatedreceipt")
  }
  const FETCHRECEIPT = {
    GET: {
      URL: "/collection-services/payments/_search",
      ACTION: "_get",
    },
  };
  const DOWNLOADRECEIPT = {
    GET: {
      URL: "/pdf-service/v1/_create",
      ACTION: "_get",
    },
  };
  try {
    httpRequest("post", FETCHRECEIPT.GET.URL, FETCHRECEIPT.GET.ACTION, receiptQueryString).then((payloadReceiptDetails) => {
      const queryStr = [
        { key: "key", value: configKey },
        { key: "tenantId", value: receiptQueryString[1].value.split('.')[0] }
      ]
      if (payloadReceiptDetails && payloadReceiptDetails.Payments && payloadReceiptDetails.Payments.length == 0) {
        console.log("Could not find any receipts");
        store.dispatch(toggleSnackbar(true, { labelName: "Receipt not Found", labelKey: "ERR_RECEIPT_NOT_FOUND" }
          , "error"));
        return;
      }
      // Setting the Payer and mobile from Bill to reflect it in PDF
      state = state ? state : {};
      let billDetails = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]", null);
      if ((billDetails && !billDetails.payerName) || !billDetails) {
        billDetails = {
          payerName: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].name", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].name", null),
          mobileNumber: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].mobile", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].mobile", null),
        };
      }
      if (!payloadReceiptDetails.Payments[0].payerName && process.env.REACT_APP_NAME === "Citizen" && billDetails) {
        payloadReceiptDetails.Payments[0].payerName = billDetails.payerName;
        // payloadReceiptDetails.Payments[0].paidBy = billDetails.payer;
        payloadReceiptDetails.Payments[0].mobileNumber = billDetails.mobileNumber;
      }

      const oldFileStoreId = get(payloadReceiptDetails.Payments[0], "fileStoreId")
      if (oldFileStoreId) {
        downloadReceiptFromFilestoreID(oldFileStoreId, mode)
      }
      else {
        httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Payments: payloadReceiptDetails.Payments }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
          .then(res => {
            res.filestoreIds[0]
            if (res && res.filestoreIds && res.filestoreIds.length > 0) {
              res.filestoreIds.map(fileStoreId => {
                downloadReceiptFromFilestoreID(fileStoreId, mode)
              })
            } else {
              console.log('Some Error Occured while downloading Receipt!');
              store.dispatch(toggleSnackbar(true, { labelName: "Error in Receipt Generation", labelKey: "ERR_IN_GENERATION_RECEIPT" }
                , "error"));
            }
          });
      }
    })
  } catch (exception) {
    console.log('Some Error Occured while downloading Receipt!');
    store.dispatch(toggleSnackbar(true, { labelName: "Error in Receipt Generation", labelKey: "ERR_IN_GENERATION_RECEIPT" }
      , "error"));
  }
}

const downloadprintMenu = (state, applicationNumber, tenantId, uiCommonPayConfig) => {
   const receiptKey = get(uiCommonPayConfig, "receiptKey","consolidatedreceipt")
    let receiptDownloadObject = {
        label: { labelName: "DOWNLOAD RECEIPT", labelKey: "COMMON_DOWNLOAD_RECEIPT" },
        link: () => {
            const receiptQueryString = [
                { key: "receiptNumbers", value: applicationNumber },
                { key: "tenantId", value: tenantId }
            ]
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
                        props: { variant: "outlined", style: { height: "60px", color: "#FE7A51",marginRight:"5px" }, className: "tl-download-button" },
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
    // let header = getHeader(state);
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
                            labelKey: roleExists ? `CITIZEN_SUCCESS_${transBusinessService}_PAYMENT_MESSAGE` : `EMPLOYEE_SUCCESS_${transBusinessService}_PAYMENT_MESSAGE`
                        },
                        body: {
                            labelKey: roleExists ? `CITIZEN_SUCCESS_${transBusinessService}_PAYMENT_MESSAGE_DETAIL` : `EMPLOYEE_SUCCESS_${transBusinessService}_PAYMENT_MESSAGE_DETAIL`
                        },
                        tailText: {
                            labelKey: roleExists ? `CITIZEN_SUCCESS_${transBusinessService}_PAYMENT_RECEIPT_NO` : `EMPLOYEE_SUCCESS_${transBusinessService}_PAYMENT_RECEIPT_NO`
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
                            labelKey: roleExists ? `CITIZEN_FAILURE_${transBusinessService}_PAYMENT_MESSAGE` : `EMPLOYEE_FAILURE_${transBusinessService}_PAYMENT_MESSAGE`
                        },
                        body: {
                            labelKey: roleExists ? `CITIZEN_FAILURE_${transBusinessService}_PAYMENT_MESSAGE_DETAIL` : `EMPLOYEE_FAILURE_${transBusinessService}_PAYMENT_MESSAGE_DETAIL`
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
        set(action, "screenConfig.components.div.children", data);
        return action;
    }
};

export default screenConfig;
