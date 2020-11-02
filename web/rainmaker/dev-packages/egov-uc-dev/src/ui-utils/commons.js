import { httpRequest } from "./api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear,
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson,
  setFilteredTradeTypes,
  getTradeTypeDropdownData
} from "../ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTranslatedLabel,
  //updateDropDowns,
  ifUserRoleExists
} from "../ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../ui-redux/store";
import get from "lodash/get";
import set from "lodash/set";
import {
  getQueryArg,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
// import { getTenantId,getLocalization,getLocale } from "ui-utils/localStorageUtils";
import { setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";

export const updateTradeDetails = async requestBody => {
  try {
    const payload = await httpRequest(
      "post",
      "/tl-services/v1/_update",
      "",
      [],
      requestBody
    );
    return payload;
  } catch (error) {
    // store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
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

export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "collection-services/payments/_search",
      "",
      queryObject
    );

    return response;
  } catch (error) {
    console.error(error);
    // store.dispatch(
    //   toggleSnackbar(
    //     true,
    //     { labelName: error.message, labelCode: error.message },
    //     "error"
    //   )
    // );
  }
};

const setDocsForEditFlow = async (state, dispatch) => {
  const applicationDocuments = get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.applicationDocuments",
    []
  );
  let uploadedDocuments = {};
  let fileStoreIds =
    applicationDocuments &&
    applicationDocuments.map(item => item.fileStoreId).join(",");
  const fileUrlPayload =
    fileStoreIds && (await getFileUrlFromAPI(fileStoreIds));
  applicationDocuments &&
    applicationDocuments.forEach((item, index) => {
      uploadedDocuments[index] = [
        {
          fileName:
            (fileUrlPayload &&
              fileUrlPayload[item.fileStoreId] &&
              decodeURIComponent(
                getFileUrl( fileUrlPayload[item.fileStoreId])
                  .split("?")[0]
                  .split("/")
                  .pop()
                  .slice(13)
              )) ||
            `Document - ${index + 1}`,
          fileStoreId: item.fileStoreId,
          fileUrl: Object.values(fileUrlPayload)[index],
          documentType: item.documentType,
          tenantId: item.tenantId,
          id: item.id
        }
      ];
    });
  dispatch(
    prepareFinalObject("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments)
  );
};

export const getBoundaryData = async (
  action,
  state,
  dispatch,
  queryObject,
  code,
  componentPath
) => {
  try {
    let payload = await httpRequest(
      "post",
      "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      "_search",
      queryObject,
      {}
    );
    const tenantId =
      process.env.REACT_APP_NAME === "Employee"
        ? get(
            state.screenConfiguration.preparedFinalObject,
            "Licenses[0].tradeLicenseDetail.address.city"
          )
        : getQueryArg(window.location.href, "tenantId");

    const mohallaData =
      payload &&
      payload.TenantBoundary[0] &&
      payload.TenantBoundary[0].boundary &&
      payload.TenantBoundary[0].boundary.reduce((result, item) => {
        result.push({
          ...item,
          name: `${tenantId
            .toUpperCase()
            .replace(/[.]/g, "_")}_REVENUE_${item.code
            .toUpperCase()
            .replace(/[._:-\s\/]/g, "_")}`
        });
        return result;
      }, []);

    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.tenant.localities",
        // payload.TenantBoundary && payload.TenantBoundary[0].boundary,
        mohallaData
      )
    );

    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
        "props.suggestions",
        mohallaData
      )
    );
    if (code) {
      let data = payload.TenantBoundary[0].boundary;
      let messageObject =
        data &&
        data.find(item => {
          return item.code == code;
        });
      if (messageObject)
        dispatch(
          prepareFinalObject(
            "Licenses[0].tradeLicenseDetail.address.locality.name",
            messageObject.name
          )
        );
    }
  } catch (e) {
    console.log(e);
  }
};
export const getTransformedLocalStorgaeLabels = () => {
  const localeLabels = JSON.parse(
    getLocalization(`localization_${getLocale()}`)
  );
  return transformById(localeLabels, "code");
};
// export const transformById = (payload, id) => {
//   return (
//     payload &&
//     payload.reduce((result, item) => {
//       result[item[id]] = {
//         ...item
//       };

//       return result;
//     }, {})
//   );
// };
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

const createOwnersBackup = (dispatch, payload) => {
  const owners = get(payload, "Licenses[0].tradeLicenseDetail.owners");
  owners &&
    owners.length > 0 &&
    dispatch(
      prepareFinalObject(
        "LicensesTemp[0].tradeLicenseDetail.owners",
        JSON.parse(JSON.stringify(owners))
      )
    );
};

const getMultiUnits = multiUnits => {
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

// const getMultipleAccessories = licenses => {
//   let accessories = get(licenses, "tradeLicenseDetail.accessories");
//   let mergedAccessories =
//     accessories &&
//     accessories.reduce((result, item) => {
//       if (item && item !== null && item.hasOwnProperty("accessoryCategory")) {
//         if (item.hasOwnProperty("id")) {
//           if (item.hasOwnProperty("active") && item.active) {
//             if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
//               set(item, "active", false);
//               result.push(item);
//             } else {
//               result.push(item);
//             }
//           }
//         } else {
//           if (!item.hasOwnProperty("isDeleted")) {
//             result.push(item);
//           }
//         }
//       }
//       return result;
//     }, []);

//   return mergedAccessories;
// };

const getMultipleOwners = owners => {
  let mergedOwners =
    owners &&
    owners.reduce((result, item) => {
      if (item && item !== null && item.hasOwnProperty("mobileNumber")) {
        if (item.hasOwnProperty("active") && item.active) {
          if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
            set(item, "active", false);
            result.push(item);
          } else {
            result.push(item);
          }
        } else {
          if (!item.hasOwnProperty("isDeleted")) {
            result.push(item);
          }
        }
      }
      return result;
    }, []);

  return mergedOwners;
};

export const applyTradeLicense = async (state, dispatch, activeIndex) => {
  try {
    let queryObject = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Licenses", [])
      )
    );
    let documents = get(
      queryObject[0],
      "tradeLicenseDetail.applicationDocuments"
    );
    set(
      queryObject[0],
      "validFrom",
      convertDateToEpoch(queryObject[0].validFrom, "dayend")
    );
    set(queryObject[0], "wfDocuments", documents);
    set(
      queryObject[0],
      "validTo",
      convertDateToEpoch(queryObject[0].validTo, "dayend")
    );
    if (queryObject[0] && queryObject[0].commencementDate) {
      queryObject[0].commencementDate = convertDateToEpoch(
        queryObject[0].commencementDate,
        "dayend"
      );
    }
    let owners = get(queryObject[0], "tradeLicenseDetail.owners");
    owners = (owners && convertOwnerDobToEpoch(owners)) || [];

    //set(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));
    const cityId = get(
      queryObject[0],
      "tradeLicenseDetail.address.tenantId",
      ""
    );
    const tenantId = ifUserRoleExists("CITIZEN") ? cityId : getTenantId();
    const BSqueryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessService", value: "newTL" }
    ];
    if (process.env.REACT_APP_NAME === "Citizen") {
      let currentFinancialYr = getCurrentFinancialYear();
      //Changing the format of FY
      let fY1 = currentFinancialYr.split("-")[1];
      fY1 = fY1.substring(2, 4);
      currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
      set(queryObject[0], "financialYear", currentFinancialYr);
      setBusinessServiceDataToLocalStorage(BSqueryObject, dispatch);
    }

    set(queryObject[0], "tenantId", tenantId);

    if (queryObject[0].applicationNumber) {
      //call update

      let accessories = get(queryObject[0], "tradeLicenseDetail.accessories");
      let tradeUnits = get(queryObject[0], "tradeLicenseDetail.tradeUnits");
      set(
        queryObject[0],
        "tradeLicenseDetail.tradeUnits",
        getMultiUnits(tradeUnits)
      );
      set(
        queryObject[0],
        "tradeLicenseDetail.accessories",
        getMultiUnits(accessories)
      );
      set(
        queryObject[0],
        "tradeLicenseDetail.owners",
        getMultipleOwners(owners)
      );

      let action = "INITIATE";
      if (
        queryObject[0].tradeLicenseDetail &&
        queryObject[0].tradeLicenseDetail.applicationDocuments
      ) {
        if (getQueryArg(window.location.href, "action") === "edit") {
          // const removedDocs = get(
          //   state.screenConfiguration.preparedFinalObject,
          //   "LicensesTemp[0].removedDocs",
          //   []
          // );
          // set(queryObject[0], "tradeLicenseDetail.applicationDocuments", [
          //   ...get(
          //     state.screenConfiguration.prepareFinalObject,
          //     "Licenses[0].tradeLicenseDetail.applicationDocuments",
          //     []
          //   ),
          //   ...removedDocs
          // ]);
        } else if (activeIndex === 1) {
          alert("active index 1");

          set(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
        } else action = "APPLY";
      }
      // else if (
      //   queryObject[0].tradeLicenseDetail &&
      //   queryObject[0].tradeLicenseDetail.applicationDocuments &&
      //   activeIndex === 1
      // ) {
      // } else if (
      //   queryObject[0].tradeLicenseDetail &&
      //   queryObject[0].tradeLicenseDetail.applicationDocuments
      // ) {
      //   action = "APPLY";
      // }
      set(queryObject[0], "action", action);
      const isEditFlow = getQueryArg(window.location.href, "action") === "edit";
      !isEditFlow &&
        (await httpRequest("post", "/tl-services/v1/_update", "", [], {
          Licenses: queryObject
        }));
      let searchQueryObject = [
        { key: "tenantId", value: queryObject[0].tenantId },
        { key: "applicationNumber", value: queryObject[0].applicationNumber }
      ];
      let searchResponse = await getSearchResults(searchQueryObject);
      if (isEditFlow) {
        searchResponse = { Licenses: queryObject };
      } else {
        dispatch(prepareFinalObject("Licenses", searchResponse.Licenses));
      }
      const updatedtradeUnits = get(
        searchResponse,
        "Licenses[0].tradeLicenseDetail.tradeUnits"
      );
      const tradeTemp = updatedtradeUnits.map((item, index) => {
        return {
          tradeSubType: item.tradeType.split(".")[1],
          tradeType: item.tradeType.split(".")[0]
        };
      });
      dispatch(prepareFinalObject("LicensesTemp.tradeUnits", tradeTemp));
      createOwnersBackup(dispatch, searchResponse);
    } else {
      let accessories = get(queryObject[0], "tradeLicenseDetail.accessories");
      let tradeUnits = get(queryObject[0], "tradeLicenseDetail.tradeUnits");
      // let owners = get(queryObject[0], "tradeLicenseDetail.owners");
      let mergedTradeUnits =
        tradeUnits &&
        tradeUnits.filter(item => !item.hasOwnProperty("isDeleted"));
      let mergedAccessories =
        accessories &&
        accessories.filter(item => !item.hasOwnProperty("isDeleted"));
      let mergedOwners =
        owners && owners.filter(item => !item.hasOwnProperty("isDeleted"));

      set(queryObject[0], "tradeLicenseDetail.tradeUnits", mergedTradeUnits);
      set(queryObject[0], "tradeLicenseDetail.accessories", mergedAccessories);
      set(queryObject[0], "tradeLicenseDetail.owners", mergedOwners);
      set(queryObject[0], "action", "INITIATE");
      //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
      if (!queryObject[0].applicationNumber)
        set(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_create",
        "",
        [],
        { Licenses: queryObject }
      );
      dispatch(prepareFinalObject("Licenses", response.Licenses));
      createOwnersBackup(dispatch, response);
    }
    /** Application no. box setting */
    setApplicationNumberBox(state, dispatch);
    return true;
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
    console.log(error);
    return false;
  }
};

const convertOwnerDobToEpoch = owners => {
  let updatedOwners =
    owners &&
    owners
      .map(owner => {
        return {
          ...owner,
          dob:
            owner && owner !== null && convertDateToEpoch(owner.dob, "dayend")
        };
      })
      .filter(item => item && item !== null);
  return updatedOwners;
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

const setApplicationNumberBox = (state, dispatch) => {
  let applicationNumber = get(
    state,
    "screenConfiguration.preparedFinalObject.Licenses[0].applicationNumber",
    null
  );
  if (applicationNumber) {
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "visible",
        true
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "props.number",
        applicationNumber
      )
    );
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
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
// export const clearUserDetails = () => {
//   Object.keys(localStorage).forEach((key) => {
//     if (key.startsWith(appName)) {
//       window.localStorage.removeItem(key);
//     }
//   });
// };

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

  //localizations
export const getTransformedLocale = label => {
  return label && label.toUpperCase().replace(/[.:-\s\/]/g, "_");
};

export const transformLocalizationLabels = (localizationLabels) => {
  let labelsById = transformById(localizationLabels, "code");
  return labelsById;
};
//GET methods

// export const getLocaleLabels = (label, labelKey, localizationLabels) => {
//   if (!localizationLabels)
//     localizationLabels = transformById(
//       JSON.parse(getLocalization(`localization_${getLocale()}`)),
//       "code"
//     );
//   if (labelKey) {
//     let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
//     if (!translatedLabel || labelKey === translatedLabel) {
//       return translatedLabel;
//     } else {
//       return translatedLabel;
//     }
//   } else {
//     return label;
//   }
// };
