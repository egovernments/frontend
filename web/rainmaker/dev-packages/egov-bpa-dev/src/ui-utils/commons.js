import { httpRequest } from "./api";
import {
  convertDateToEpoch,
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson
} from "../ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTranslatedLabel,
  updateDropDowns,
  setOrganizationVisibility
} from "../ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "redux/store";
import get from "lodash/get";
import set from "lodash/set";
import {
  getQueryArg,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getMultiUnits } from "egov-ui-framework/ui-utils/commons";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";

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
  const mimeType = file["type"];
  const fileNameArray = file["name"].split(".");
  const fileFormat = fileNameArray[fileNameArray.length - 1];

  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(fileFormat.toUpperCase()) > -1) ||
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
