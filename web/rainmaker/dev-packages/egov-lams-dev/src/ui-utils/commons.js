import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";
import commonConfig from "config/common.js";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import { getTenantId, localStorageGet, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import store from "ui-redux/store";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";
import {
  acceptedFiles, getFileUrl,
  getFileUrlFromAPI, getMultiUnits, getQueryArg, setBusinessServiceDataToLocalStorage,
} from "egov-ui-framework/ui-utils/commons";
import { uploadFile } from "egov-ui-framework/ui-utils/api";
import cloneDeep from "lodash/cloneDeep";
import { downloadReceiptFromFilestoreID} from "egov-common/ui-utils/commons";
import axios from "axios";
import qs from "qs";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import $ from 'jquery';
import { commentsPattern} from "./constants";
import {DSIGN_REDIRECT_URL} from "../ui-config/lams-app-config";

export const isFileValid = (file, acceptedFiles) => {
  const mimeType = file["type"];
  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
    false
  );
};

export const getFileSize = file => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

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

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

export const getSearchResults = async (queryObject, dispatch) => {
  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      "/lams-services/v1/_search", //tobechanged
      "",
      queryObject
    );
    store.dispatch(toggleSpinner());
    return response;
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

export const createUpdateNocApplication = async (state, dispatch, status) => {
  let nocId = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0].id"
  );
  let method = nocId ? "UPDATE" : "CREATE";
  try {
    let payload = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs",
      []
    );
    let tenantId = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
      getTenantId()
    );
    set(payload[0], "tenantId", tenantId);
    set(payload[0], "fireNOCDetails.action", status);

    // Get uploaded documents from redux
    let reduxDocuments = get(
      state,
      "screenConfiguration.preparedFinalObject.documentsUploadRedux",
      {}
    );

    handleDeletedCards(payload[0], "fireNOCDetails.buildings", "id");
    handleDeletedCards(
      payload[0],
      "fireNOCDetails.applicantDetails.owners",
      "id"
    );

    let buildings = get(payload, "[0].fireNOCDetails.buildings", []);
    buildings.forEach((building, index) => {
      // GET UOMS FOR THE SELECTED BUILDING TYPE
      let requiredUoms = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
        []
      ).filter(buildingType => {
        return buildingType.code === building.usageType;
      });
      requiredUoms = get(requiredUoms, "[0].uom", []);
      // GET UNIQUE UOMS LIST INCLUDING THE DEFAULT
      let allUoms = [
        ...new Set([
          ...requiredUoms,
          ...[
            "NO_OF_FLOORS",
            "NO_OF_BASEMENTS",
            "PLOT_SIZE",
            "BUILTUP_AREA",
            "HEIGHT_OF_BUILDING"
          ]
        ])
      ];
      let finalUoms = [];
      allUoms.forEach(uom => {
        let value = get(building.uomsMap, uom);
        value &&
          finalUoms.push({
            code: uom,
            value: parseInt(value),
            isActiveUom: requiredUoms.includes(uom) ? true : false,
            active: true
          });
      });

      // Quick fix to repair old uoms
      let oldUoms = get(
        payload[0],
        `fireNOCDetails.buildings[${index}].uoms`,
        []
      );
      oldUoms.forEach((oldUom, oldUomIndex) => {
        set(
          payload[0],
          `fireNOCDetails.buildings[${index}].uoms[${oldUomIndex}].isActiveUom`,
          false
        );
        set(
          payload[0],
          `fireNOCDetails.buildings[${index}].uoms[${oldUomIndex}].active`,
          false
        );
      });
      // End Quick Fix

      set(payload[0], `fireNOCDetails.buildings[${index}].uoms`, [
        ...finalUoms,
        ...oldUoms
      ]);

      // Set building documents
      let uploadedDocs = [];
      jp.query(reduxDocuments, "$.*").forEach(doc => {
        if (doc.documents && doc.documents.length > 0) {
          if (
            doc.documentSubCode &&
            doc.documentSubCode.startsWith("BUILDING.BUILDING_PLAN")
          ) {
            if (doc.documentCode === building.name) {
              uploadedDocs = [
                ...uploadedDocs,
                {
                  tenantId: tenantId,
                  documentType: doc.documentSubCode,
                  fileStoreId: doc.documents[0].fileStoreId
                }
              ];
            }
          }
        }
      });
      set(
        payload[0],
        `fireNOCDetails.buildings[${index}].applicationDocuments`,
        uploadedDocs
      );
    });

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
      "fireNOCDetails.applicantDetails.additionalDetail.documents",
      ownerDocuments
    );
    set(
      payload[0],
      "fireNOCDetails.additionalDetail.documents",
      otherDocuments
    );

    // Set Channel and Financial Year
    process.env.REACT_APP_NAME === "Citizen"
      ? set(payload[0], "fireNOCDetails.channel", "CITIZEN")
      : set(payload[0], "fireNOCDetails.channel", "COUNTER");
    set(payload[0], "fireNOCDetails.financialYear", "2019-20");

    // Set Dates to Epoch
    let owners = get(payload[0], "fireNOCDetails.applicantDetails.owners", []);
    owners.forEach((owner, index) => {
      set(
        payload[0],
        `fireNOCDetails.applicantDetails.owners[${index}].dob`,
        convertDateToEpoch(get(owner, "dob"))
      );
    });

    let response;
    if (method === "CREATE") {
      response = await httpRequest(
        "post",
        "/firenoc-services/v1/_create",
        "",
        [],
        { FireNOCs: payload }
      );
      response = furnishNocResponse(response);
      dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
      setApplicationNumberBox(state, dispatch);
    } else if (method === "UPDATE") {
      response = await httpRequest(
        "post",
        "/firenoc-services/v1/_update",
        "",
        [],
        { FireNOCs: payload }
      );
      response = furnishNocResponse(response);
      dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
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
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.FireNoc.Documents",
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
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};

export const prepareDocumentsUploadRedux = (state, dispatch) => {
  const {
    documentsList,
    documentsUploadRedux = {},
    prepareFinalObject
  } = this.props;
  let index = 0;
  documentsList.forEach(docType => {
    docType.cards &&
      docType.cards.forEach(card => {
        if (card.subCards) {
          card.subCards.forEach(subCard => {
            let oldDocType = get(
              documentsUploadRedux,
              `[${index}].documentType`
            );
            let oldDocCode = get(
              documentsUploadRedux,
              `[${index}].documentCode`
            );
            let oldDocSubCode = get(
              documentsUploadRedux,
              `[${index}].documentSubCode`
            );
            if (
              oldDocType != docType.code ||
              oldDocCode != card.name ||
              oldDocSubCode != subCard.name
            ) {
              documentsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };
            }
            index++;
          });
        } else {
          let oldDocType = get(documentsUploadRedux, `[${index}].documentType`);
          let oldDocCode = get(documentsUploadRedux, `[${index}].documentCode`);
          if (oldDocType != docType.code || oldDocCode != card.name) {
            documentsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              isDocumentRequired: card.required,
              isDocumentTypeRequired: card.dropdown
                ? card.dropdown.required
                : false
            };
          }
        }
        index++;
      });
  });
  prepareFinalObject("documentsUploadRedux", documentsUploadRedux);
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

export const getNextFinancialYearForRenewal = async (currentFinancialYear) => {
    
  let payload = null;
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: getTenantId(),
      moduleDetails: [
        {
          moduleName: "egf-master",
          masterDetails: [{ name: "FinancialYear", filter: `[?(@.module == "TL")]` }]
        }
      ]
    }
  };

  try {
    
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    const financialYears = get(payload.MdmsRes , "egf-master.FinancialYear");
    const currrentFYending = financialYears.filter(item => item.code === currentFinancialYear)[0]
    .endingDate;
    return financialYears.filter(item => item.startingDate === currrentFYending)[0].code;
  }catch(e){
    console.log(e.message)
  }
}

export const handleFileUpload = (event, handleDocument, props) => {
  const S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  let uploadDocument = true;
  const { maxFileSize, formatProps, moduleName } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(formatProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only image or pdf files can be uploaded`);
        uploadDocument = false;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        uploadDocument = false;
      }
      try{
      if (uploadDocument) {
        store.dispatch(toggleSpinner());
        if (file.type.match(/^image\//)) {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            commonConfig.tenantId
          );
          store.dispatch(toggleSpinner());
          handleDocument(file, fileStoreId);
        } else {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            commonConfig.tenantId
          );
          store.dispatch(toggleSpinner());
          handleDocument(file, fileStoreId);
        }
      }
    }
    catch(e){
     store.dispatch(toggleSpinner());
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: "Invalid Document Format !", labelKey: "INAVLID_DOCUMENT_FORMAT" },
          "error"
        )
      );
      
    }
    });
  }
};

export const addWflowFileUrl = async (ProcessInstances, prepareFinalObject) => {
  const fileStoreIdByAction = await getAllFileStoreIds(ProcessInstances);
  const fileUrlPayload = await getFileUrlFromAPI(
    Object.values(fileStoreIdByAction).join(",")
  );
  const processInstances = cloneDeep(ProcessInstances);
    processInstances.map(item => {
    if (item.documents && item.documents.length > 0) {
      let nonEmptyDoc = [];
      item.documents.forEach(i => {
        if (i.fileStoreId && fileUrlPayload[i.fileStoreId]) {        
          i.link = getFileUrl(fileUrlPayload[i.fileStoreId]);
          i.title = `LAMS_${i.documentType}`;
          i.name = decodeURIComponent(
            getFileUrl(fileUrlPayload[i.fileStoreId])
              .split("?")[0]
              .split("/")
              .pop()
              .slice(13)
          );
          i.linkText = "View";
          nonEmptyDoc.push(i);
        }        
      });
      item.documents = nonEmptyDoc;
    }
  });  
  prepareFinalObject("workflow.ProcessInstances", processInstances);
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

export const checkIfTheUserIsDeo = () =>{
  let lamsRoles = getLamsRoles();
  let isDeo = false;
  lamsRoles.forEach(role => {
    if(role.indexOf("DEO_") > -1)
    {
      isDeo = true;
    }
  });
  return isDeo;
}

export const checkIfTheUserIsCeo = () =>{
  let lamsRoles = getLamsRoles();
  let isCeo = false;
  lamsRoles.forEach(role => {
    if(role.indexOf("LR_APPROVER_CEO") > -1)
    {
      isCeo = true;
    }
  });
  return isCeo;
}

export const checkIfTheUserIsLrCe = () =>{
  let lamsRoles = getLamsRoles();
  let isLrCe = false;
  lamsRoles.forEach(role => {
    if(role.indexOf("LR_CEMP") > -1)
    {
      isLrCe = true;
    }
  });
  return isLrCe;
}

export const deoProcessMappings = (state, dispatch) => {
  let deoMappings = get(state, "screenConfiguration.preparedFinalObject.lamsStore.deoMappings");
  console.log("deoMappings is ",deoMappings);
  return deoMappings;
}

export const getCbsForDeoBasedOnLamsRoles = (state, dispatch) =>{
  let lamsRoles = getLamsRoles();
  let deoName = null;
  lamsRoles.forEach(role => {
    if(role.indexOf("DEO_") > -1)
    {
      deoName = role.split("_")[1];
    }
  });
  let childCbsForDeo = [];
  if(deoName!=null)
    childCbsForDeo = deoProcessMappings(state, dispatch)["DEO_"+deoName];
  let finalList = [];
  if(childCbsForDeo && childCbsForDeo.length>0)
  {
    childCbsForDeo.forEach(cb => {
      finalList.push({"code": cb.toLowerCase()});
    })
    return finalList;
  }
  return [];
}

export const getLamsRoles = () =>{
  let userInfo = JSON.parse(localStorageGet("user-info"));
  //let jpExpression = "$.roles[?(@.code=='LR_APPROVER_CEO' || @.code=='LR_APPROVER_DEO')].code";
  let lamsRoles = [];
  userInfo["roles"].forEach(role => {
    if(role.code == 'LR_APPROVER_CEO' || role.code == 'LR_APPROVER_DEO' || role.code == 'LR_CEMP' 
      || role.code.indexOf("DEO_") > -1)
    {
      lamsRoles.push(role.code);
    }
  });
  console.log("Lams Roles are ",lamsRoles);
  return lamsRoles;
}



export const getWorkflowFilterBasedOnLamsRoles = () => {
  let lamsRoles = getLamsRoles();
  let filter = "";
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1 && lamsRoles.indexOf('LR_APPROVER_DEO') > -1 )
  { 
    //alert("Looks like DEO and CEO are same. Please correct this.");
    filter = "(@.businessService== 'LAMS_NewLR_CEO_V3' || @.businessService== 'LAMS_NewLR_DEO_V3')";
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1)
    filter = "(@.businessService== 'LAMS_NewLR_CEO_V3')";
  else
  if(lamsRoles.indexOf('LR_APPROVER_DEO') > -1)
  {
    filter = "(@.businessService== 'LAMS_NewLR_DEO_V3')";

    // let deoMappings = deoProcessMappings();

    // let role = lamsRoles.find(x => x.index("DEO_") >= 0)
    // let deoBoard = role.split("DEO_")[1];
    // let cbsOfBoard = deoMappings[deoBoard];

    // console.log("The cbs of the board are ". cbsOfBoard);
    // let cbFilter = "(";
    // cbsOfBoard.forEach(function(cb, i) { 
    //   if(i==0)
    //     cbFilter = cbFilter + "@.tenantId=='pb."+cb.toLowerCase()+"'";
    //   else
    //     cbFilter = cbFilter + "|| @.tenantId=='pb."+cb.toLowerCase()+"'";
    // }); 
    // cbFilter = cbFilter + ")";
      
    // filter = filter + " && "+cbFilter;
    // console.log("The final filter is ",filter);

  }
  return filter;
}

export const getWorkflowCodeFromRoles = (tenantId) => {

  if(!tenantId)
    tenantId=getTenantId();
  let lamsRoles = getLamsRoles();
  let queryParams = [];
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1 && lamsRoles.indexOf('LR_APPROVER_DEO') > -1 )
  { 
    alert("Looks like DEO and CEO are same. Please correct this.");
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1)
  {
    return "LAMS_NewLR_CEO_V3";
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_DEO') > -1)
  {
    return "LAMS_NewLR_DEO_V3";
  }

  return queryParams;
}

export const constructQueryParamsBasedOnLamsRoles2 = (tenantId) => {

  if(!tenantId)
    tenantId=getTenantId();
  let lamsRoles = getLamsRoles();
  let queryParams = [];
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1 && lamsRoles.indexOf('LR_APPROVER_DEO') > -1 )
  { 
    alert("Looks like DEO and CEO are same. Please correct this.");
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1)
  {
    queryParams.push({ key: "tenantId", value: tenantId})
    queryParams.push({ key: "businessServices", value: "LAMS_NewLR_CEO_V3"})
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_DEO') > -1)
  {
    queryParams.push({ key: "tenantId", value: tenantId})
    queryParams.push({ key: "businessServices", value: "LAMS_NewLR_DEO_V3"})
  }

  return queryParams;
}

//This function should be used only on the employee side.
export const constructQueryParamsBasedOnLamsRoles = (tenantId) => {

  if(!tenantId)
    tenantId=getTenantId();
  let lamsRoles = getLamsRoles();
  let queryParams = [];
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1 && lamsRoles.indexOf('LR_APPROVER_DEO') > -1 )
  { 
    alert("Looks like DEO and CEO are same. Please correct this.");
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_CEO') > -1)
  {
    queryParams.push({ key: "tenantId", value: tenantId})
    queryParams.push({ key: "role", value: "LR_APPROVER_CEO"})
  }
  else
  if(lamsRoles.indexOf('LR_APPROVER_DEO') > -1)
  {
    let deoRoleName = lamsRoles.find(x => x.indexOf("DEO_") >= 0)
    queryParams.push({ key: "role", value: deoRoleName})
  }

  return queryParams;
}

//This function can be used on both Employee and Citizen side functionality.
export const constructQueryParamsBasedOnCurrentWorkflowType = (state) => {

  let workflowCode = get(state, "screenConfiguration.preparedFinalObject.lamsStore.Lease[0].workflowCode");
  let tenantId = get(state, "screenConfiguration.preparedFinalObject.lamsStore.Lease[0].tenantId");

  let queryParams = [
    { key: "tenantId", value: tenantId }
  ];
  queryParams.push({ key: "businessServices", value: workflowCode })

  return queryParams;

  // if(process.env.REACT_APP_NAME === "Citizen")
  // {
  //   queryParams.push({ key: "businessServices", value: "LAMS_NewLR_CEO_V3" });
  //   queryParams.push({ key: "businessServices", value: "LAMS_NewLR_DEO_V3" });
  //   return queryParams;
  // }
  // else
  // {
  //   let lamsRoles = getLamsRoles();
  //   if(lamsRoles.indexOf('LR_APPROVER_CEO')>-1)
  //     queryParams.push({ key: "businessServices", value: "LAMS_NewLR_CEO_V3" });
  //   if(lamsRoles.indexOf('LR_APPROVER_DEO')>-1)
  //     queryParams.push({ key: "businessServices", value: "LAMS_NewLR_DEO_V3" });
  //   return queryParams;
  // }
}

export const validateActionFormFields = (preparedFinalObject) => {

  const  termNo = get(
    preparedFinalObject,
    `lamsStore.Lease[0].leaseDetails.termNo`,
    []
  );
  if(!termNo || !(new RegExp(/^[0-9]*$/)).test(termNo) || termNo < 1)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Invalid Term No !", labelKey: "INVALID_TERMNO_ERROR" },
      "error"
    ));
    return false;
  }

  const annualRent = get(
    preparedFinalObject,
    `lamsStore.Lease[0].leaseDetails.annualRent`,
    []
  );
  if(!annualRent || !(new RegExp(/^[0-9]*$/)).test(annualRent) || annualRent < 0)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Invalid Annual Rent !", labelKey: "INVALID_ANNUALRENT_ERROR" },
      "error"
    ));
    return false;
  }

  const lesseAsPerGLR = get(
    preparedFinalObject,
    `lamsStore.Lease[0].leaseDetails.lesseAsPerGLR`,
    []
  );
  if(!lesseAsPerGLR || lesseAsPerGLR.length > 2000)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Lesse As per GLR should have less than 2000 charecters", labelKey: "INVALID_LESSEASPERGLR_ERROR" },
      "error"
    ));
    return false;
  }

  const termExpiryDate = get(preparedFinalObject,`lamsStore.Lease[0].leaseDetails.termExpiryDate`,[]);
  const finalTermExpiryDate = get(preparedFinalObject,`lamsStore.Lease[0].leaseDetails.finalTermExpiryDate`,[]);
  const applicationType = get(preparedFinalObject,`lamsStore.Lease[0].applicationType`,[]);

  if(!termExpiryDate)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Invalid Term Expiry Date", labelKey: "INVALID_TERMEXPDATE_ERROR" },
      "error"
    ));
    return false;
  }

  if(!finalTermExpiryDate)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Invalid Final Term Expiry Date", labelKey: "INVALID_FINALTERMEXPDATE_ERROR" },
      "error"
    ));
    return false;
  }

  if(termExpiryDate && finalTermExpiryDate && termExpiryDate>finalTermExpiryDate)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Term Expiry cannot be after Final term Expiry Date", labelKey: "LAMS_DATEDIFF_ERROR" },
      "error"
    ));
    return false;
  }

  if(!validateActionFormForComments(preparedFinalObject))
    return false;
    
  return true;
}

export const validateActionFormForComments = (preparedFinalObject) => {

  const  comment = get(
    preparedFinalObject,
    `lamsStore.Lease[0].comment`,
    []
  );

  if(!comment)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Please fill all mandatory fields !", labelKey: "COMMON_MANDATORY_MISSING_ERROR" },
      "error"
    ));
    return false;
  }
  if(comment && comment.length > 80)
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Comments should be less than 80 Charecters", labelKey: "LAMS_COMMENTS_LEN_ERROR" },
      "error"
    ));
    return false;
  }

  let pattern = commentsPattern;
  if(!(new RegExp(pattern)).test(comment))
  {
    store.dispatch(toggleSnackbar(
      true,
      { labelName: "Comments to only have : Alphabets, Numbers and , . - _", labelKey: "LAMS_COMMENTS_PATTERN_ERROR" },
      "error"
    ));
    return false;
  }

  return true;
}

//This function is not used as of now.
export const downloadLeaseApplication = async (queryStr, mode = 'download') => {

  const DOWNLOADRECEIPT = {
    GET: {
      URL: "/egov-pdf/download/UC/mcollect-challan",
      ACTION: "_get",
    },
  };
  try {
    httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
      .then(res => {
        res.filestoreIds[0]
        if (res && res.filestoreIds && res.filestoreIds.length > 0) {
          res.filestoreIds.map(fileStoreId => {
            downloadReceiptFromFilestoreID(fileStoreId, mode)
          })
        } else {
          console.log("Error In Application form Download");
        }
      });
  } catch (exception) {
    alert('Some Error Occured while downloading Application form!');
  }

}

//This function is used to create pdf in the back end (Simple download) Not for E Sign
export const downloadLeaseApplication1 = async (queryStr, mode = 'download') => {

  const DOWNLOADRECEIPT = {
    GET: {
      URL: "/egov-pdf/download/UC/mcollect-challan",
      ACTION: "_get",
    },
  };
  try {
    httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
      .then(res => {
        res.filestoreIds[0]
        if (res && res.filestoreIds && res.filestoreIds.length > 0) {
          res.filestoreIds.map(fileStoreId => {
            downloadReceiptFromFilestoreID(fileStoreId, mode)
          })
        } else {
          console.log("Error In Application form Download");
        }
      });
  } catch (exception) {
    alert('Some Error Occured while downloading Application form!');
  }

}

export const prepareRequestBodyForLeaseAppPdf = (state, dispatch , forEsign) =>{

  let requestBody = {};
  requestBody.tenantId = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].tenantId");
  requestBody.surveyId = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].leaseDetails.surveyId");
  requestBody.months = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].months");
  requestBody.fatherOrHusbandName = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].userDetails[0].fatherOrHusbandName");
  requestBody.name = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].userDetails[0].name");
  requestBody.located = (get(state.screenConfiguration.preparedFinalObject.lamsStore.Lease[0],"located") === "insideCivil") ? 1: 2;
  requestBody.mobileNo = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].userDetails[0].mobileNumber");
  requestBody.forEsign = forEsign;

  let reqWrapper = {"leaseApplication":[requestBody]}
  return reqWrapper;
}
//This function is used to create pdf in the backend for eSign
export const downloadLeaseApplication2 = async (state, dispatch, forEsign) => {

  let reqWrapper = prepareRequestBodyForLeaseAppPdf(state, dispatch, forEsign);
  let payload = null;
  try{

      payload = await httpRequest(
        "post",
        "/lams-services/dSign/createApplicationPdf",  // "/egov-pdf/download/LRMS/lrms-renewalCertificate?tenantId="+requestBody.tenantId,
        "",
        [],
        reqWrapper
      );
    

    //dsignChange: Remove below code. Remove upper try catch
    //payload = {"filestoreIds":["0207fdc3-4017-4e24-ad15-152aab2e9737"],"ResponseInfo":{"Accept":"application/json","RequestInfo":{"apiId":"Mihy","ver":".01","action":"_get","did":"1","key":"","msgId":"20170310130900|en_IN","requesterId":"","userInfo":{"id":2034,"uuid":"cfd640e6-b19e-4429-a710-86fa41e51cf9","userName":"9480734475","name":"Sham","type":"CITIZEN","mobileNumber":"9480734475","emailId":"Poojapadma45@gmail.com","tenantId":"pb","roles":[{"id":null,"name":"Citizen","code":"CITIZEN","tenantId":"pb"}]},"correlationId":"6ac5b9bc-8b2a-4900-928a-ebcf4067687c"}},"key":"mcollect-challan"};
    
    if(forEsign)
    {
      if(payload && payload.dSignInfo)
        prepareForDSign(state, dispatch, payload);
    }
    else
    {
      if (payload && payload.fileStoreInfo && payload.fileStoreInfo.filestoreIds && payload.fileStoreInfo.filestoreIds.length > 0 ) {
        payload.fileStoreInfo.filestoreIds.map(fileStoreId => {
            downloadReceiptFromFilestoreID(fileStoreId, 'download')
        })
      }
      else
      {
        store.dispatch(
          toggleSnackbar(
            true,
            { labelName: "Error in generating PDF", labelKey: "LAMS_ERROR_PDF_DSIGN" },
            "error"
          )
        );
      }
    }
  }
  catch(error)
  {
    console.error(error);
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: "Error in generating PDF", labelKey: "LAMS_ERROR_PDF_DSIGN" },
        "error"
      )
    );
  }
}

export const prepareForDSign = async (state, dispatch, response) => {

  try{
    // let payload = null;
    // try{
    //   payload = await httpRequest(
    //     "post",
    //     "/egov-lams/dSign/prepareData",
    //     "",
    //     [],
    //     requestBody
    //   );
    // }
    // catch(e)
    // {

    // }
    
    let eSignRequest = response.dSignInfo.esignRequest;
    let aspTxnID = response.dSignInfo.aspTxnID;
    
    //dsignChange : Remove the below code. Remove upper try catch
    let eSignRequest2 = '<?xml version="1.0" encoding="UTF-8"?><Esign AuthMode="1" aspId="DGDE-900" ekycId="" ekycIdType="A" responseSigType="pkcs7" responseUrl="https://localhost:8443/SpringBootESign/finalResponse" sc="Y" ts="2021-01-13T11:15:09" txn="1610516708555A191366689" ver="2.1"><Docs><InputHash docInfo="My Document" hashAlgorithm="SHA256" id="1">3d17778027d3ea9a623aba80f207e0e0a4978deedfbd87f6ea64c115a972e221</InputHash></Docs><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>VlsJGL7pdF65JSnJoAY9gW9+jXqpt8lYJ/UnjzAvV4Q=</DigestValue></Reference></SignedInfo><SignatureValue>qA+VSnZ+m27eEgiWERmRskRwBHxAJAo/zkhCmpLd6GUmxNxm3Kfk8zWnAnBNDpBzld1BrAXdEXkW&#13;'
    +'6abNzG276c32yaxEdM6jvNMWa0Mt5fNNWn21VfQe4gBTIT16Lpm5icGN7Ve4UoFpTYYxOclvW1rV&#13;'
    +'u9EejXQo1OwYCJCbsguWXpgBnLknSbdyhnQXNgrJUsMjnfiwJRSclrbvmf2XGyT4BVmZTrqjLctE&#13;'
    +'3ISF/jU89pKNYwnzGxBu5pfPSKKukpJyfNfLfE3OzekiCSJFfHc9K+3P7zE7X7cVwLPc3F1/Hb0M&#13;'
    +'RfGyRbDoeD3Z13CkAjPA/bw0HuyHF2QtgZU1vwx0KGxmH7vI3iFbJxw1MUsCjxmm9pORmJDmdOU9&#13;'
    +'SMM7Q29ekM991fWDBgfodiUsZck1YsEFeDKWgxhe+5uVTx0zpkuAMIn4Xjpn80IsBda8LCF7F0uD&#13;'
    +'Pd/dqsU6qi89ZEfdTZAIK6D3oYGBuiiouJNQihIKDlyNmxscw2HtsxYUxJjc6LBuECyOmu5Nc4ur&#13;'
    +'HRMk6u3lxPLFyAdi+zajjLVpSfmTlDQdmW5gnm45Vsg3H330xtbYyxXwfvrKQzJIUNOSCnVHtYFf&#13;'
    +'nCb9zOcWzMrAqOUkikV35HOJTR2bFmxPoMY7l/ARCwjKfCPMhBGJ153dfMwg2hW9BgTB0iwlZJg=</SignatureValue></Signature></Esign>';

    let payload = {
     'eSignRequest': eSignRequest, //'<?xml version="1.0" encoding="UTF-8"?><Esign AuthMode="1" aspId="DGDE-900" ekycId="" ekycIdType="A" responseSigType="pkcs7" responseUrl="https://localhost:8443/SpringBootESign/finalResponse" sc="Y" ts="2021-01-13T11:15:09" txn="1610516708555A191366689" ver="2.1"><Docs><InputHash docInfo="My Document" hashAlgorithm="SHA256" id="1">3d17778027d3ea9a623aba80f207e0e0a4978deedfbd87f6ea64c115a972e221</InputHash></Docs><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>VlsJGL7pdF65JSnJoAY9gW9+jXqpt8lYJ/UnjzAvV4Q=</DigestValue></Reference></SignedInfo><SignatureValue>qA+VSnZ+m27eEgiWERmRskRwBHxAJAo/zkhCmpLd6GUmxNxm3Kfk8zWnAnBNDpBzld1BrAXdEXkW&#13;6abNzG276c32yaxEdM6jvNMWa0Mt5fNNWn21VfQe4gBTIT16Lpm5icGN7Ve4UoFpTYYxOclvW1rV&#13;u9EejXQo1OwYCJCbsguWXpgBnLknSbdyhnQXNgrJUsMjnfiwJRSclrbvmf2XGyT4BVmZTrqjLctE&#13;3ISF/jU89pKNYwnzGxBu5pfPSKKukpJyfNfLfE3OzekiCSJFfHc9K+3P7zE7X7cVwLPc3F1/Hb0M&#13;RfGyRbDoeD3Z13CkAjPA/bw0HuyHF2QtgZU1vwx0KGxmH7vI3iFbJxw1MUsCjxmm9pORmJDmdOU9&#13;SMM7Q29ekM991fWDBgfodiUsZck1YsEFeDKWgxhe+5uVTx0zpkuAMIn4Xjpn80IsBda8LCF7F0uD&#13;Pd/dqsU6qi89ZEfdTZAIK6D3oYGBuiiouJNQihIKDlyNmxscw2HtsxYUxJjc6LBuECyOmu5Nc4ur&#13;HRMk6u3lxPLFyAdi+zajjLVpSfmTlDQdmW5gnm45Vsg3H330xtbYyxXwfvrKQzJIUNOSCnVHtYFf&#13;nCb9zOcWzMrAqOUkikV35HOJTR2bFmxPoMY7l/ARCwjKfCPMhBGJ153dfMwg2hW9BgTB0iwlZJg=</SignatureValue></Signature></Esign>nCb9zOcWzMrAqOUkikV35HOJTR2bFmxPoMY7l/ARCwjKfCPMhBGJ153dfMwg2hW9BgTB0iwlZJg=</SignatureValue></Signature></Esign>',
     'aspTxnID': aspTxnID, //'1610516708555A191366689',
     'Content-Type': 'application/xml',
     };

    if (payload && payload.aspTxnID && payload.eSignRequest) {
      callDSignService(state,dispatch, payload);
    }
    else
    {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: "Error in initiating Digital Signature", labelKey: "LAMS_ERROR_INIT_DSIGN" },
          "error"
        )
      );
    }
  }
  catch(error)
  {
    console.error(error);
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: "Error in initiating Digital Signature", labelKey: "LAMS_ERROR_INIT_DSIGN" },
        "error"
      )
    );
  }
}

export const callDSignService = async(state, dispatch, req) => {
  
  let dSignUrl = DSIGN_REDIRECT_URL;

  if(!dSignUrl)
  {
    alert("DSIGN_REDIRECT_URL environment not set");
    dSignUrl = "https://es-staging.cdac.in/esign2.1level1/2.1/form/signdoc";
  }
  try 
  {
    var newForm = $('<form>', {
      action: dSignUrl,
      method: 'post',
      target: '_top',
    });

    // for (var key in req) {
    //   console.log(key,req[key])
    //   newForm.append(
    //     $('<input>', {
    //       name: key,
    //       value: req[key],
    //       type: 'text',
    //     }))
    // }

    newForm.append(
      $('<input>', {
        name: 'eSignRequest',
        value: req['eSignRequest'],
        type: 'text',
      })).append($('<input>', {
        name: 'aspTxnID',
        value: req['aspTxnID'],
        type: 'text',
      })).append($('<input>', {
        name: 'Content-Type',
        value: req['Content-Type'],
        type: 'text',
      }));
      
    //Set the values in lamsStore just before redirection
    dispatch(prepareFinalObject("lamsStore.dSign.aspTxnID", req.aspTxnID));
    dispatch(prepareFinalObject("lamsStore.dSign.initiated",true));

    let leaseDetails = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0]");
    let allCbSurveyDetails = get(state.screenConfiguration.preparedFinalObject , "lamsStore.allSurveyDetails");

    localStorageSet("dSign.aspTxnID", req.aspTxnID);
    localStorageSet("dSign.initiated", true);
    localStorageSet("dSign.leaseDetails", JSON.stringify(leaseDetails));;
    localStorageSet("dSign.cbSurveyDetails", JSON.stringify(allCbSurveyDetails));;

    $(document.body).append(newForm);
    newForm.submit();
  }
  catch(error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: "Digital Signature cannot be performed now", labelKey: "LAMS_ERROR_DSIGN_CDAC_POST" },
        "error"
      )
    );
    console.log(error);
  }
}

export const callDSignServiceOldImpl = async(state, dispatch, req) => {

  if(!process.env.DSIGN_REDIRECT_URL)
  {
    alert("DSIGN_REDIRECT_URL Environment Variable not set!")
    console.error("DSIGN_REDIRECT_URL Environment Variable not set!");
  }
  let dSignUrl = process.env.DSIGN_REDIRECT_URL? process.env.DSIGN_REDIRECT_URL : "https://es-staging.cdac.in/esign2.1level1/2.1/form/signdoc";
  var data = qs.stringify(req);

  const form = new FormData();
  form.append('eSignRequest', req['eSignRequest']);

  var config = {
    method: 'post',
    url: dSignUrl,
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : form
  };

  axios(config)
  .then(function (response) {
    afterDSignDone(state,dispatch,response)
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: "Digital Signature cannot be performed now", labelKey: "LAMS_ERROR_DSIGN_CDAC_POST" },
        "error"
      )
    );
    console.log(error);
  });

}

export const afterDSignDone = async(state, dispatch, response) => {
  
  //console.log("Check now ",JSON.parse(localStorageGet("leaseDetails")));
  dispatch(prepareFinalObject("lamsStore.Lease[0]",JSON.parse(localStorageGet("dSign.leaseDetails"))));
  dispatch(prepareFinalObject("lamsStore.selectedSurveyDetails",JSON.parse(localStorageGet("dSign.leaseDetails")).leaseDetails));
  dispatch(prepareFinalObject("lamsStore.allSurveyDetails",JSON.parse(localStorageGet("dSign.cbSurveyDetails"))));

  //dispatch(prepareFinalObject("lamsStore.dSign.success",true));
  //let initiated = get(state.screenConfiguration.preparedFinalObject , "lamsStore.dSign.initiated");

  let espTxnID = localStorageGet("dSign.aspTxnID"); //getQueryArg(window.location.href, "espTxnID");
  localStorageSet("dSign.aspTxnID","");
  
  let payload = null;
  try{
 
    payload = await httpRequest(
      "post",
      "/lams-services/dSign/getApplicationfile?txnid="+espTxnID,
      "",
      [],
      ""
    );
    
    //dsignChange: Remove below code. Remove upper try catch
    //payload = {"filestoreIds":["0207fdc3-4017-4e24-ad15-152aab2e9737"],"ResponseInfo":{"Accept":"application/json","RequestInfo":{"apiId":"Mihy","ver":".01","action":"_get","did":"1","key":"","msgId":"20170310130900|en_IN","requesterId":"","userInfo":{"id":2034,"uuid":"cfd640e6-b19e-4429-a710-86fa41e51cf9","userName":"9480734475","name":"Sham","type":"CITIZEN","mobileNumber":"9480734475","emailId":"Poojapadma45@gmail.com","tenantId":"pb","roles":[{"id":null,"name":"Citizen","code":"CITIZEN","tenantId":"pb"}]},"correlationId":"6ac5b9bc-8b2a-4900-928a-ebcf4067687c"}},"key":"mcollect-challan"};
    
    if (payload && payload.files && payload.files.length > 0 ) {
      let mode = 'download';
      downloadReceiptFromFilestoreID(payload.files[0].fileStoreId, mode);

      let dSignSuccess = getQueryArg(window.location.href, "success");
      if(dSignSuccess == "false")
      {
        store.dispatch(
          toggleSnackbar(
            true,
            { labelName: "Could not digitally sign the application. Please try again later or print, sign and upload the application.", labelKey: "LAMS_ERROR_DSIGN_AADHAR" },
            "error"
          )
        );
      }

      //Write auto upload code here.
    }
    else
    {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: "Error in getting the Signed PDF", labelKey: "LAMS_ERROR_GET_SIGNED_DOC" },
          "error"
        )
      );
    }
  }
  catch(error)
  {
    console.error(error);
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: "Error in getting the Signed PDF", labelKey: "LAMS_ERROR_GET_SIGNED_DOC" },
        "error"
      )
    );
  }

}

export const isPostDSignMode = () => {
  let aspTxnID = localStorageGet("dSign.aspTxnID");  //get(state.screenConfiguration.preparedFinalObject , "lamsStore.dSign.aspTxnID");
  let initiated = localStorageGet("dSign.initiated");
  let dSignSuccess = getQueryArg(window.location.href, "success");
  if(initiated && aspTxnID && dSignSuccess)
  {
    return true;
  }
  else
  {
    return false;
  }
}

export const  getESignRequest = async() => {

  let requestBody = {};
  let payload = null;
  payload = await httpRequest(
    "post",
    "/egov-lams-service/v1/getESignRequest",
    "getESignRequest",
    [],
    requestBody
  );
  return payload;

}

export const eVerify = () => {
  getESignRequest().then((response) => {
    
    //toberemoved
    let sc = "cn:Y,x500UniqueIdentifier:Y,pseudonym:Y,l:N,street:N,state:Y,postalAddress:Y,postalCode:Y";
    let ts = "2011-11-02T02:50:12.208Z"; //"YYYY-MM-DDTHH:mm:ss.sss"
    let txnId = 123456789;
    let ekycIdType = "A";
    let aspId = 'aspId';
    let authMode = 1 ; //OTP
    let responseSigType = "pkcs7";
    let redirectionUrl = 'https://13.71.65.215.nip.io/employee/lams-common/newApplication';
    let documentId = 'asdfasdf';
    let hashAlgorithm = "SHA256";
    let docInfo = "Information abt the document";
    let ekycId = 'optional';
    response = '<Esign ver="2.5" sc="'+sc+'" ts="'+ ts +'" txn="'+ txnId+'" ekycId="'+ekycId+'" ekycIdType="'+ekycIdType +
      '" aspId="'+aspId +'" AuthMode="'+authMode+'" responseSigType="'+responseSigType+'" responseUrl="'+redirectionUrl +'">' +
    '<Docs>'+
    '<InputHash id="'+documentId+'" hashAlgorithm="'+hashAlgorithm+'" docInfo="'+docInfo+'"> Document Hash in Hex</InputHash>'
    + '</Docs>' +
    + '<Signature>Digital signature of ASP</Signature>'
    + '</Esign>';

    let parser = new DOMParser();
    parser.parseFromString(response,"text/xml")
  });
}

export const getCustomLabel = () =>{


}