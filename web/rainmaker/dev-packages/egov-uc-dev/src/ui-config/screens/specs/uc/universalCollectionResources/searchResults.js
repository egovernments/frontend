import React from "react";
import {
  sortByEpoch,
  getEpochForDate
} from "../../utils";
// import {download} from "egov-common/ui-utils/commons"
import get from "lodash/get";
// import { httpRequest } from "../../../../ui-utils";
import store from "ui-redux/store";
import axios from "axios";

import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

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

function globalConfigExists() {
  return typeof window.globalConfigs !== "undefined" && typeof window.globalConfigs.getConfig === "function";
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
};


const commonConfig = {
  MAP_API_KEY: globalConfigExists() ? window.globalConfigs.getConfig("GMAPS_API_KEY") : process.env.REACT_APP_GMAPS_API_KEY,
  tenantId: globalConfigExists() ? window.globalConfigs.getConfig("STATE_LEVEL_TENANT_ID") : process.env.REACT_APP_DEFAULT_TENANT_ID,
  forgotPasswordTenant: "pb.amritsar",
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

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [

      {
        labelName: "Receipt No.",
        labelKey: "UC_COMMON_TABLE_COL_RECEIPT_NO",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div onClick={value => {
                const receiptQueryString = [
                  { key: "receiptNumbers", value:  tableMeta.rowData[0]},
                  { key: "tenantId", value: tableMeta.rowData[7] }
                ]
                download(receiptQueryString , "download" ,tableMeta.rowData[6]) ;
              }}>
              {value}
            </div>
          )
        }
      },
      {
        labelName: "Payee Name",
        labelKey: "UC_COMMON_TABLE_COL_PAYEE_NAME"
      },
      {
        labelName: "Service Type",
        labelKey: "UC_SERVICE_TYPE_LABEL"
      },
      {
        labelName: "Date",
        labelKey: "UC_COMMON_TABLE_COL_DATE"
      },
      {
        labelName: "Amount[INR]",
        labelKey: "UC_COMMON_TABLE_COL_AMOUNT"
      },
      {
        labelName: "Status",
        labelKey: "UC_COMMON_TABLE_COL_STATUS"
      },
      {
        labelName: "Receipt Key",
        labelKey: "RECEIPT_KEY",
        options: {
          display: false
        }
      },
      {
        labelName: "Tenant Id",
        labelKey: "TENANT_ID",
        options: {
          display: false
        }
      }
    ],
    title: {
      labelKey: "COMMON_TABLE_SEARCH_RESULT_RECIEPT",
      labelName: "Search Results for Receipt",
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
    },
    customSortColumn: {
      column: "Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};
