import {
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson
} from "../ui-config/screens/specs/utils";
import {
  getTranslatedLabel,
  updateDropDowns,
  setOrganizationVisibility
} from "../ui-config/screens/specs/utils";
import store from "ui-redux/store";
import get from "lodash/get";
import set from "lodash/set";
import {
  getQueryArg,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getMultiUnits } from "egov-ui-framework/ui-utils/commons";
import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import jp from "jsonpath";
import { appSearchMockData } from './searchMockJson';
import { createApp } from './createMock'



const handleDeletedCards = (jsonObject, jsonPath, key) => {
  let originalArray = get(jsonObject, jsonPath, []);
  let modifiedArray = originalArray.filter(element => {
    return element.hasOwnProperty(key) || !element.hasOwnProperty("isDeleted");
  });
  modifiedArray = modifiedArray.map(element => {
    if (element.hasOwnProperty("isDeleted")) {
      element["isActive"] = false;
    }
    return element;
  });
  set(jsonObject, jsonPath, modifiedArray);
};

export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/tl-services/v1/BPAREG/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

export const updateTradeDetails = async requestBody => {
  try {
    const payload = await httpRequest(
      "post",
      "/tl-services/v1/BPAREG/_update",
      "",
      [],
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};

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

export const getAppSearchResults = async (queryObject, dispatch) => {
  try {
    store.dispatch(toggleSpinner());
    const response = "";
    //  await httpRequest(
      // "post",
      // "/bpa-services/v1/_search",
      // "",
      // queryObject
    // );
    store.dispatch(toggleSpinner());
    return appSearchMockData;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};

export const createUpdateBpaApplication = async (state, dispatch, status) => {
  let nocId = get(
    state,
    "screenConfiguration.preparedFinalObject.BPAs[0].id"
  );
  let method = nocId ? "UPDATE" : "CREATE";

  try {
    let payload = get(
      state.screenConfiguration.preparedFinalObject,
      "BPA",
      []
    );
    let tenantId = get(
      state.screenConfiguration.preparedFinalObject,
      "citiesByModule.citizenTenantId",
      getTenantId()
    );
    // set(payload[0], "tenantId", tenantId);
    // set(payload[0], "fireNOCDetails.action", status);
    payload.tenantId = tenantId;

    // Get uploaded documents from redux
    let reduxDocuments = get(
      state,
      "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux",
      {}
    );
    handleDeletedCards(
      payload[0],
      "BPA.owners",
      "id"
    );

    // Set owners & other documents
    let ownerDocuments = [];
    let otherDocuments = [];
    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentType === "OWNER") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              tenantId: tenantId,
              documentType: doc.documentSubCode
                ? doc.documentSubCode
                : doc.documentCode,
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        } else if (!doc.documentSubCode) {
          // SKIP BUILDING PLAN DOCS
          otherDocuments = [
            ...otherDocuments,
            {
              tenantId: tenantId,
              documentType: doc.documentCode,
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
    });

    set(
      payload[0],
      "BPA.additionalDetail.documents",
      ownerDocuments
    );
    set(
      payload[0],
      "BPA.additionalDetail.documents",
      otherDocuments
    );

    // Set Channel and Financial Year
    process.env.REACT_APP_NAME === "Citizen"
      ? set(payload[0], "bpaDetails.channel", "CITIZEN")
      : set(payload[0], "bpaDetails.channel", "COUNTER");
    set(payload[0], "bpaDetails.financialYear", "2019-20");

    // Set Dates to Epoch
    let owners = get(payload[0], "BPA.owners", []);
    owners.forEach((owner, index) => {
      set(
        payload[0],
        `BPA.owners[${index}].dob`,
        convertDateToEpoch(get(owner, "dob"))
      );
    });
    let payload1 = createApp;
    let response;
    if (method === "CREATE") {
      response = await httpRequest(
        "post",
        "bpa-services/bpa/appl/_create",
        "",
        [],
        { BPA : payload1 }
      );
      console.log(response, "response jbsd;kjbfdsf");
      response = furnishNocResponse(response);
      dispatch(prepareFinalObject("BPA", response.BPA));
      setApplicationNumberBox(state, dispatch);
    } else if (method === "UPDATE") {
      response = await httpRequest(
        "post",
        "bpa-services/bpa/appl/__update",
        "",
        [],
        { BPA: payload }
      );
      response = furnishNocResponse(response);
      dispatch(prepareFinalObject("BPA", response.BPA));
    }
    return { status: "success", message: response };
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    // Revert the changed pfo in case of request failure
    let fireNocData = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs",
      []
    );
    fireNocData = furnishNocResponse({ FireNOCs: fireNocData });
    dispatch(prepareFinalObject("FireNOCs", fireNocData.FireNOCs));

    return { status: "failure", message: error };
  }
};

export const prepareDocumentsUploadData = (state, dispatch) => {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.DocTypeMapping[0].docTypes",
    []
  );
  let documentsDropDownValues = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType",
    []
  );

  let documentsList = [];
  documents.forEach(doc => {
    let code = doc.code.split(".")[0];
    doc.dropDownValues = [];
    documentsDropDownValues.forEach(value => {
      if (code === value.code.split(".")[0]) {
        doc.hasDropdown = true;
        doc.dropDownValues.push(value);
      }
    });
    documentsList.push(doc);
  });
  documents = documentsList;

  // documents = documents.filter(item => {
  //   return item.active;
  // });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = 'Documents',//doc.documentType;
    card["title"] = 'Documents',//doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    let card = {};
    card["name"] = doc.code;
    card["code"] = doc.code;
    card["required"] = doc.required ? true : false;
    if (doc.hasDropdown && doc.dropDownValues) {
      let dropDownValues = {};
      dropDownValues.label = "Select Documents";
      dropDownValues.required = doc.required;
      dropDownValues.menu = doc.dropDownValues.filter(item => {
        return item.active;
      });
      dropDownValues.menu = dropDownValues.menu.map(item => {
        return { code: item.code, label: getTransformedLocale(item.code) };
      });
      card["dropDownValues"] = dropDownValues;
    }
    tempDoc[doc.documentType].cards.push(card);
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });
  dispatch(prepareFinalObject("documentsContract", documentsContract));
};


export const prepareNOCUploadData = (state, dispatch) => {
  return;
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.NOC",
    []
  );
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (
      doc.code === "BUILDING.BUILDING_PLAN" &&
      doc.hasMultipleRows &&
      doc.options
    ) {
      let buildingsData = get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.natureOfNoc) {
        let natureOfNoc = {};
        natureOfNoc.label = "Nature Of Noc";
        natureOfNoc.required = true;
        natureOfNoc.menu = doc.natureOfNoc.filter(item => {
          return item.active;
        });
        natureOfNoc.menu = natureOfNoc.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["natureOfNoc"] = natureOfNoc;
      }
      if (doc.hasDropdown && doc.remarks) {
        let remarks = {};
        remarks.label = "Remarks";
        remarks.required = true;
        remarks.menu = doc.remarks.filter(item => {
          return item.active;
        });
        remarks.menu = remarks.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["remarks"] = remarks;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("nocDocumentsContract", documentsContract));
};

export const furnishNocResponse = response => {
  // Handle applicant ownership dependent dropdowns
  let ownershipType = get(
    response,
    "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType"
  );
  set(
    response,
    "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType",
    ownershipType == undefined ? "SINGLE" : ownershipType.split(".")[0]
  );

  // Prepare UOMS and Usage Type Dropdowns in required format
  let buildings = get(response, "FireNOCs[0].fireNOCDetails.buildings", []);
  buildings.forEach((building, index) => {
    let uoms = get(building, "uoms", []);
    let uomMap = {};
    uoms.forEach(uom => {
      uomMap[uom.code] = `${uom.value}`;
    });
    set(
      response,
      `FireNOCs[0].fireNOCDetails.buildings[${index}].uomsMap`,
      uomMap
    );

    let usageType = get(building, "usageType");
    set(
      response,
      `FireNOCs[0].fireNOCDetails.buildings[${index}].usageTypeMajor`,
      usageType == undefined ? "" : usageType.split(".")[0]
    );
  });

  return response;
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
                fileUrlPayload[item.fileStoreId]
                  .split(",")[0]
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

export const updatePFOforSearchResults = async (
  action,
  state,
  dispatch,
  queryValue,
  queryValuePurpose,
  tenantId
) => {
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId ? tenantId : getTenantId()
    },
    { key: "applicationNumber", value: queryValue }
  ];
  const isPreviouslyEdited = getQueryArg(window.location.href, "edited");
  const payload = !isPreviouslyEdited
    ? await getSearchResults(queryObject)
    : {
        Licenses: get(state.screenConfiguration.preparedFinalObject, "Licenses")
      };
  getQueryArg(window.location.href, "action") === "edit" &&
    (await setDocsForEditFlow(state, dispatch));
  if (payload) {
    dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  }
  const licenseType = payload && get(payload, "Licenses[0].licenseType");
  updateDropDowns(payload, action, state, dispatch, queryValue);
  const subOwnerShipCategory = get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.subOwnerShipCategory"
  );

  setOrganizationVisibility(action, state, dispatch, subOwnerShipCategory);

  if (queryValuePurpose !== "cancel") {
    set(payload, getSafetyNormsJson(queryValuePurpose), "yes");
    set(payload, getHygeneLevelJson(queryValuePurpose), "yes");
    set(payload, getLocalityHarmedJson(queryValuePurpose), "No");
  }
  set(payload, getCheckBoxJsonpath(queryValuePurpose), true);

  setApplicationNumberBox(state, dispatch);

  createOwnersBackup(dispatch, payload);
};

const updateownersAddress = (dispatch, payload) => {
  const owners = get(payload, "Licenses[0].tradeLicenseDetail.owners");
  let permanantAddrLine1 = get(owners[0], "address.addressLine1");
  let permanantAddr = get(owners[0], "permanentAddress");
  if (!permanantAddrLine1) {
    set(owners[0], "address.addressLine1", permanantAddr);
  }
  dispatch(
    prepareFinalObject(
      "LicensesTemp[0].tradeLicenseDetail.owners",
      JSON.parse(JSON.stringify(owners))
    )
  );
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

const userAddressConstruct = address => {
  let doorNo = address.doorNo ? address.doorNo : "";
  let buildingName = address.buildingName ? address.buildingName : "";
  let street = address.street ? address.street : "";
  let landmark = address.landmark ? address.landmark : "";
  return `${doorNo},${buildingName},${street},${landmark}`;
};

export const applyTradeLicense = async (state, dispatch, activeIndex) => {
  try {
    dispatch(toggleSpinner());
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
    // set(queryObject[0], "wfDocuments", documents);
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
    let ownershipType = get(
      queryObject[0],
      "tradeLicenseDetail.subOwnerShipCategory"
    );
    if (ownershipType == "INDIVIDUAL")
      set(queryObject[0], "tradeLicenseDetail.institution", null);
    let owners = get(queryObject[0], "tradeLicenseDetail.owners");
    owners = (owners && convertOwnerDobToEpoch(owners)) || [];
    set(queryObject[0], "tradeLicenseDetail.owners", owners);
    set(queryObject[0], "licenseType", "PERMANENT");
    set(queryObject[0], "businessService", "BPAREG");

    const tenantId = process.env.REACT_APP_DEFAULT_TENANT_ID;

    set(queryObject[0], "tenantId", tenantId);
    let userAddress = get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].userData.address"
    );

    let permanantAddr = userAddressConstruct(userAddress);

    set(
      queryObject[0],
      "tradeLicenseDetail.owners[0].permanentAddress",
      permanantAddr
    );
    set(
      queryObject[0],
      "tradeLicenseDetail.owners[0].permanentCity",
      userAddress.city
    );
    set(
      queryObject[0],
      "tradeLicenseDetail.owners[0].permanentPinCode",
      userAddress.pincode
    );
    if (queryObject[0].applicationNumber) {
      //call update

      let tradeUnits = get(queryObject[0], "tradeLicenseDetail.tradeUnits");
      set(
        queryObject[0],
        "tradeLicenseDetail.tradeUnits",
        getMultiUnits(tradeUnits)
      );
      // set(
      //   queryObject[0],
      //   "tradeLicenseDetail.owners",
      //   getMultipleOwners(owners)
      // );
      let action = "NOWORKFLOW";
      if (
        queryObject[0].tradeLicenseDetail &&
        queryObject[0].tradeLicenseDetail.applicationDocuments
      ) {
        if (activeIndex === 2) {
          action = "APPLY";
        }
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
      let searchResponse = {};
      set(queryObject[0], "action", action);
      const isEditFlow = getQueryArg(window.location.href, "action") === "edit";
      if (!isEditFlow) {
        searchResponse = await httpRequest(
          "post",
          "/tl-services/v1/BPAREG/_update",
          "",
          [],
          {
            Licenses: queryObject
          }
        );
      }
      dispatch(toggleSpinner());

      // let searchQueryObject = [
      //   { key: "tenantId", value: queryObject[0].tenantId },
      //   { key: "applicationNumber", value: queryObject[0].applicationNumber }
      // ];
      // let searchResponse = await getSearchResults(searchQueryObject);
      if (isEditFlow) {
        searchResponse = { Licenses: queryObject };
      } else {
        dispatch(prepareFinalObject("Licenses", searchResponse.Licenses));
        await setDocsForEditFlow(state, dispatch);
      }
      const updatedtradeUnits = get(
        searchResponse,
        "Licenses[0].tradeLicenseDetail.tradeUnits"
      );
    } else {
      let tradeUnits = get(queryObject[0], "tradeLicenseDetail.tradeUnits");
      // let owners = get(queryObject[0], "tradeLicenseDetail.owners");
      let mergedTradeUnits =
        tradeUnits &&
        tradeUnits.filter(item => !item.hasOwnProperty("isDeleted"));

      set(queryObject[0], "tradeLicenseDetail.tradeUnits", mergedTradeUnits);
      set(queryObject[0], "action", "NOWORKFLOW");
      //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
      if (!queryObject[0].applicationNumber)
        set(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
      const response = await httpRequest(
        "post",
        "/tl-services/v1/BPAREG/_create",
        "",
        [],
        { Licenses: queryObject }
      );
      dispatch(toggleSpinner());
      if (!response) {
      }
      dispatch(prepareFinalObject("Licenses", response.Licenses));
      createOwnersBackup(dispatch, response);
    }
    /** Application no. box setting */
    setApplicationNumberBox(state, dispatch);
    return true;
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
    dispatch(toggleSpinner());

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
  const fileNameArray = file["name"].split(".");
  const fileFormat = fileNameArray[fileNameArray.length - 1];
  return (
    (fileFormat &&
      acceptedFiles &&
      acceptedFiles.indexOf(fileFormat.toUpperCase()) > -1) ||
    false
  );
};

export const setApplicationNumberBox = (state, dispatch, applicationNo) => {
  if (!applicationNo) {
    applicationNo = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber",
      null
    );
  }

  if (applicationNo) {
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
        applicationNo
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

export const acceptedFiles = acceptedExt => {
  const splitExtByName = acceptedExt.split(",");
  const acceptedFileTypes = splitExtByName.map(item => {
    return item.toUpperCase();
  });
  return acceptedFileTypes;
};

export const handleFileUpload = (event, handleDocument, props) => {
  let uploadDocument = true;
  const { inputProps, maxFileSize, moduleName } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
      // const fileValid = true //temporary disabling check as dxf issues in other os
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only dxf files can be uploaded`);
        uploadDocument = false;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        uploadDocument = false;
      }
      if (uploadDocument) {
        handleDocument(file);
      }
    });
  }
};
