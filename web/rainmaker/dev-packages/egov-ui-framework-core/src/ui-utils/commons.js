import isEmpty from "lodash/isEmpty";
import { httpRequest, uploadFile } from "./api.js";
import cloneDeep from "lodash/cloneDeep";
/* import {
  localStorageSet,
  localStorageGet,
  getLocalization,
  getLocale
} from "egov-ui-kit/utils/localStorageUtils"; */
import { toggleSnackbar,toggleSpinner,prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import orderBy from "lodash/orderBy";
import get from "lodash/get";
import set from "lodash/set";
//import commonConfig from "config/common.js";
import { validate } from "egov-ui-framework/ui-redux/screen-configuration/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

export const addComponentJsonpath = (components, jsonPath = "components") => {
  for (var componentKey in components) {
    if (components.hasOwnProperty(componentKey)) {
      if (components[componentKey].children) {
        components[
          componentKey
        ].componentJsonpath = `${jsonPath}.${componentKey}`;
        const childJsonpath = `${components[componentKey].componentJsonpath}.children`;
        addComponentJsonpath(components[componentKey].children, childJsonpath);
      } else {
        components[
          componentKey
        ].componentJsonpath = `${jsonPath}.${componentKey}`;
      }
    }
  }
  return components;
};



export const getQueryArg = (url, name) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

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

export const isFieldEmpty = field => {
  if (field === undefined || field === null) {
    return true;
  }
  if (typeof field !== "object") {
    field = field.toString().trim();
    return isEmpty(field);
  }
  return false;
};

export const slugify = term => {
  return term.toLowerCase().replace(/\s+/, "-");
};

export const persistInLocalStorage = obj => {
  Object.keys(obj).forEach(objKey => {
    const objValue = obj[objKey];
    localStorageSet(objKey, objValue);
  }, this);
};

export const ifUserRoleExists = role => {
  let userInfo = JSON.parse(getUserInfo());
  const roles = get(userInfo, "roles");
  const roleCodes = roles ? roles.map(role => role.code) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

export const fetchFromLocalStorage = key => {
  return localStorageGet(key) || null;
};

export const trimObj = obj => {
  if (!Array.isArray(obj) && typeof obj !== "object") return obj;
  for (var key in obj) {
    obj[key.trim()] =
      typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

export const getDateInEpoch = () => {
  return new Date().getTime();
};

export const getImageUrlByFile = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

export const getFileSize = file => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const isFileValid = (file, acceptedFiles) => {
  const mimeType = file["type"];
  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
    false
  );
};

export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      result[item[id]] = {
        ...item
      };

      return result;
    }, {})
  );
};

export const getTransformedLocalStorgaeLabels = () => {
  const localeLabels = JSON.parse(
    getLocalization(`localization_${getLocale()}`)
  );
  return transformById(localeLabels, "code");
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (
      translatedLabel &&
      typeof translatedLabel === "object" &&
      translatedLabel.hasOwnProperty("message")
    )
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const epochToYmd = et => {
  // Return null if et already null
  if (!et) return null;
  // Return the same format if et is already a string (boundary case)
  if (typeof et === "string") return et;
  let date = new Date(et);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  // date = `${date.getFullYear()}-${month}-${day}`;
  var formatted_date = date.getFullYear() + "-" + month + "-" + day;
  return formatted_date;
};

export const getLocaleLabels = (label, labelKey, localizationLabels) => {
  if (!localizationLabels)
    localizationLabels = transformById(
      JSON.parse(getLocalization(`localization_${getLocale()}`)),
      "code"
    );
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return translatedLabel;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const replaceStrInPath = (inputString, search, replacement) => {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };
  return inputString.replaceAll(search, replacement);
};

export const getFileUrlFromAPI = async (fileStoreId,tenantId) => {
  const queryObject = [
    { key: "tenantId", value: tenantId||commonConfig.tenantId },
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

const getAllFileStoreIds = async ProcessInstances => {
  return (
    ProcessInstances &&
    ProcessInstances.reduce((result, eachInstance) => {
      if (eachInstance.documents) {
        let fileStoreIdArr = eachInstance.documents.map(item => {
          return item.fileStoreId;
        });
        result[eachInstance.id] = fileStoreIdArr.join(",");
      }
      return result;
    }, {})
  );
};


export const getFileUrl = (linkText="") => {
  const linkList = linkText.split(",");
  let fileURL = '';
  linkList&&linkList.map(link => {
    if (!link.includes('large') && !link.includes('medium') && !link.includes('small')) {
      fileURL = link;
    }
  })
  return fileURL;
}

export const setDocuments = async (
  payload,
  sourceJsonPath,
  destJsonPath,
  dispatch,
  businessService
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
        title: `${businessService}_${item.documentType}` || "",
        link:
          (fileUrlPayload &&
            fileUrlPayload[item.fileStoreId] &&
            getFileUrl(fileUrlPayload[item.fileStoreId])) ||
          "",
        linkText: "View",
        name:
          (fileUrlPayload &&
            fileUrlPayload[item.fileStoreId] &&
            decodeURIComponent(
              getFileUrl(fileUrlPayload[item.fileStoreId])
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


export const addWflowFileUrl = async (ProcessInstances, prepareFinalObject) => {
  const fileStoreIdByAction = await getAllFileStoreIds(ProcessInstances);
  const fileUrlPayload = await getFileUrlFromAPI(
    Object.values(fileStoreIdByAction).join(",")
  );
  const processInstances = cloneDeep(ProcessInstances);
  processInstances.map(item => {
    if (item.documents && item.documents.length > 0) {
      item.documents.forEach(i => {
        if (i.fileStoreId && fileUrlPayload[i.fileStoreId]) {
          i.link = getFileUrl(fileUrlPayload[i.fileStoreId]);
          i.title = `TL_${i.documentType}`;
          i.name = decodeURIComponent(
            getFileUrl(fileUrlPayload[i.fileStoreId])
              .split("?")[0]
              .split("/")
              .pop()
              .slice(13)
          );
          i.linkText = "View";
        }
      });
    }
  });
  prepareFinalObject("workflow.ProcessInstances", processInstances);
};

export const setBusinessServiceDataToLocalStorage = async (
  queryObject,
  dispatch
) => {
  try {
    dispatch(toggleSpinner());
    const payload = await httpRequest(
      "post",
      "egov-workflow-v2/egov-wf/businessservice/_search",
      "_search",
      queryObject
    );
    if (
      payload &&
      payload.BusinessServices &&
      payload.BusinessServices.length > 0
    ) {
      localStorageSet(
        "businessServiceData",
        JSON.stringify(get(payload, "BusinessServices"))
      );
    } else {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Business Service returned empty object",
            labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE"
          },
          "error"
        )
      );
    }
    dispatch(toggleSpinner());
  } catch (e) {
    dispatch(toggleSpinner());
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Not authorized to access Business Service!",
          labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE"
        },
        "error"
      )
    );
  }
};

export const acceptedFiles = acceptedExt => {
  const splitExtByName = acceptedExt.split(",");
  const acceptedFileTypes = splitExtByName.reduce((result, curr) => {
    if (curr.includes("image")) {
      result.push("image");
    } else {
      result.push(curr.split(".")[1]);
    }
    return result;
  }, []);
  return acceptedFileTypes;
};

export const handleFileUpload = (event, handleDocument, props) => {
  const S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  let uploadDocument = true;
  const { inputProps, maxFileSize, moduleName } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only image or pdf files can be uploaded`);
        uploadDocument = false;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        uploadDocument = false;
      }
      if (uploadDocument) {
        if (file.type.match(/^image\//)) {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            commonConfig.tenantId
          );
          handleDocument(file, fileStoreId);
        } else {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            commonConfig.tenantId
          );
          handleDocument(file, fileStoreId);
        }
      }
    });
  }
};

//localizations
export const getTransformedLocale = label => {
  return label && label.toUpperCase().replace(/[.:-\s\/]/g, "_");
};

export const appendModulePrefix = (value, localePrefix) => {
  const { moduleName, masterName } = localePrefix;

  const transformedValue = `${getTransformedLocale(
    moduleName
  )}_${getTransformedLocale(masterName)}_${getTransformedLocale(value)}`;
  return transformedValue;
};

export const orderWfProcessInstances = processInstances => {
  processInstances = orderBy(
    processInstances,
    "auditDetails.lastModifiedTime",
    "asc"
  );
  let initiatedFound = false;
  const filteredInstances = processInstances.reverse().reduce((acc, item) => {
    if (item.action == "INITIATE" && !initiatedFound) {
      initiatedFound = true;
      acc.push(item);
    } else if (item.action !== "INITIATE") {
      acc.push(item);
    }
    return acc;
  }, []);
  return filteredInstances.reverse();
};

export const getSelectedTabIndex = paymentType => {
  switch (paymentType) {
    case "Cash":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "Cheque":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };
    case "Card":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};
export const getMultiUnits = multiUnits => {
  let hasTradeType = false;
  let hasAccessoryType = false;

  let mergedUnits =
    multiUnits &&
    multiUnits.reduce((result, item) => {
      hasTradeType = item.hasOwnProperty("tradeType");
      hasAccessoryType = item.hasOwnProperty("accessoryCategory");
      if (item && item !== null && (hasTradeType || hasAccessoryType)) {
        if (item.hasOwnProperty("id")) {
          if (item.hasOwnProperty("active") && item.active) {
            if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
              set(item, "active", false);
              result.push(item);
            } else {
              result.push(item);
            }
          }
        } else {
          if (!item.hasOwnProperty("isDeleted")) {
            result.push(item);
          }
        }
      }
      return result;
    }, []);

  return mergedUnits;
};

export const getUlbGradeLabel = ulbGrade => {
  if (ulbGrade) {
    let ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

export const validateFields = (
  objectJsonPath,
  state,
  dispatch,
  screen = "apply"
) => {
  const fields = get(
    state.screenConfiguration.screenConfig[screen],
    objectJsonPath,
    {}
  );
  let isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (
        fields[variable] &&
        fields[variable].props &&
        (fields[variable].props.disabled === undefined ||
          !fields[variable].props.disabled) &&
        !validate(
          screen,
          {
            ...fields[variable],
            value: get(
              state.screenConfiguration.preparedFinalObject,
              fields[variable].jsonPath
            )
          },
          dispatch,
          true
        )
      ) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

export const downloadPDFFileUsingBase64 = (receiptPDF, filename) => {
  if (typeof mSewaApp === "undefined") {
    // we are running in browser
    receiptPDF.download(filename);
  } else {
    // we are running under webview
    receiptPDF.getBase64(data => {
      mSewaApp.downloadBase64File(data, filename);
    });
  }
};

if (window) {
  window.downloadPDFFileUsingBase64 = downloadPDFFileUsingBase64;
}
// Get user data from uuid API call
export const getUserDataFromUuid = async bodyObject => {
  try {
    const response = await httpRequest(
      "post",
      "/user/_search",
      "",
      [],
      bodyObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getCommonPayUrl = (dispatch, applicationNo, tenantId ,businessService) => {
  const url = `/egov-common/pay?consumerCode=${applicationNo}&tenantId=${tenantId}&businessService=${businessService}`;
  dispatch(setRoute(url));
};

export const getTodaysDateInYMD = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  date = `${date.getFullYear()}-${month}-${day}`;
  return date;
};


//GET methods
export const getAccessToken = () => {
  return localStorageGet(`token`);
};
export const getUserInfo = () => {
  return localStorageGet("user-info");
};
export const getTenantId = () => {
  return localStorageGet("tenant-id");
};
export const getLocalization = (key) => {
  return localStorage.getItem(key);
};
export const getLocale = () => {
  return localStorage.getItem("locale");
};

//SET methods
export const setUserInfo = (userInfo) => {
  localStorageSet("user-info", userInfo, null);
};
export const setAccessToken = (token) => {
  localStorageSet("token", token, null);
};
export const setRefreshToken = (refreshToken) => {
  localStorageSet("refresh-token", refreshToken, null);
};
export const setTenantId = (tenantId) => {
  localStorageSet("tenant-id", tenantId, null);
};
export const setLocale = (locale) => {
  localStorageSet("locale", locale);
};
export const setReturnUrl = (url) => {
  localStorageSet("returnUrl", url);
};

//Remove Items (LOGOUT)
export const clearUserDetails = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(appName)) {
      window.localStorage.removeItem(key);
    }
  });
};
//Role specific get-set Methods
export const localStorageGet = (key, path) => {
  const appName = process.env.REACT_APP_NAME;
  let value = null;
  if (path) {
    const data = JSON.parse(window.localStorage.getItem(appName + "." + key)) || null;
    value = get(data, path);
  } 
  else if(key==="businessServiceData")
  {
    value = window.localStorage.getItem(key) || null;

  }
  else {
    value = window.localStorage.getItem(appName + "." + key) || null;
  }
  return value;
};
export const localStorageSet = (key, data, path) => {
  const appName = process.env.REACT_APP_NAME;
  const storedData = window.localStorage.getItem(appName + "." + key);

  if (path) {
    set(storedData, path, data);
    window.localStorage.setItem(appName + "." + key, storedData);
    window.localStorage.setItem(key, storedData);
  } else {
    window.localStorage.setItem(appName + "." + key, data);
    window.localStorage.setItem(key, data);
  }
};
//Remove Item
export const lSRemoveItem = (key) => {
  const appName = process.env.REACT_APP_NAME;
  window.localStorage.removeItem(appName + "." + key);
};


export const commonConfig = {
  MAP_API_KEY: globalConfigExists() ? window.globalConfigs.getConfig("GMAPS_API_KEY") : process.env.REACT_APP_GMAPS_API_KEY,
  tenantId: globalConfigExists() ? window.globalConfigs.getConfig("STATE_LEVEL_TENANT_ID") : process.env.REACT_APP_DEFAULT_TENANT_ID,
  forgotPasswordTenant: "pb.amritsar",
};

function globalConfigExists() {
  return typeof window.globalConfigs !== "undefined" && typeof window.globalConfigs.getConfig === "function";
}

/* export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      if (!item.hasOwnProperty("active") || (item.hasOwnProperty("active") && item.active)) {
        result[item[id]] = {
          ...item,
        };
      }

      return result;
    }, {})
  );
}; */


export const getTransformedDropdown = (MDMSdata, dataKeys) => {
  dataKeys.forEach(dataKey=>{
    if (MDMSdata && MDMSdata.hasOwnProperty(dataKey)) {
      let keys = MDMSdata[dataKey] && Object.keys(MDMSdata[dataKey]);
      let tempObj = {};
      if(keys && keys.length > 0){
        if(dataKey !== "UsageCategory"){
          MDMSdata[dataKey] = getSingleCodeObject(dataKey, tempObj, MDMSdata, keys);
        } else {
          MDMSdata = {...MDMSdata, ...getUsageCategory(dataKey, tempObj, MDMSdata, keys)};
        }
      }
    }
  });
  return MDMSdata;
  }  

  export const getSingleCodeObject = (dataKey, tempObj, MDMSdata, keys) => {
    keys.forEach(key=>{
      let splittedKey = key.split(".");
      tempObj[splittedKey[splittedKey.length-1]] = MDMSdata[dataKey][key];
      tempObj[splittedKey[splittedKey.length-1]].code = splittedKey[splittedKey.length-1];
    })
    return tempObj;
  }
  
  export const getUsageCategory = (dataKey, tempObj, MDMSdata, keys) => {
    keys.forEach(key=>{
      let splittedKey = key.split(".");
      let categoryCode = splittedKey.pop();
      if(splittedKey.length === 0) {
        tempObj["UsageCategoryMajor"] = {...tempObj["UsageCategoryMajor"], ...getCategoryObject(categoryCode, MDMSdata, dataKey, key)};
      } else if (splittedKey.length === 1) {
        tempObj["UsageCategoryMinor"] = {...tempObj["UsageCategoryMinor"], ...getCategoryObject(categoryCode, MDMSdata, dataKey, key, "usageCategoryMajor", splittedKey[splittedKey.length-1])};
      } else if (splittedKey.length === 2) {
        tempObj["UsageCategorySubMinor"] = {...tempObj["UsageCategorySubMinor"], ...getCategoryObject(categoryCode, MDMSdata, dataKey, key, "usageCategoryMinor", splittedKey[splittedKey.length-1])};
      } else if (splittedKey.length === 3) {
        tempObj["UsageCategoryDetail"] = {...tempObj["UsageCategoryDetail"], ...getCategoryObject(categoryCode, MDMSdata, dataKey, key, "usageCategorySubMinor", splittedKey[splittedKey.length-1])};
      }
    });
    return tempObj;
  }

  export const getCategoryObject = (categoryCode, MDMSdata, dataKey, key, parentKey, parentKeyValue) => {
    let tempObj = {}
    tempObj[categoryCode] = MDMSdata[dataKey][key];
    tempObj[categoryCode].code = categoryCode;
    tempObj[categoryCode][parentKey] = parentKeyValue;
    return tempObj;
  }