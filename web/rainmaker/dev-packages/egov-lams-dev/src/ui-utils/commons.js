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
import { getTenantId, localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
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
import {deoProcessMappings} from "./constants";

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

export const getCbsForDeoBasedOnLamsRoles = () =>{
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
    childCbsForDeo = deoProcessMappings()[deoName];
  let finalList = [];
  if(childCbsForDeo && childCbsForDeo.length>0)
  {
    childCbsForDeo.forEach(cb => {
      finalList.push({"code": "pb."+cb.toLowerCase()});
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

  //let commentPattern = /^[a-zA-Z0-9_.-,]*$/;
  //let pattern = "([a-zA-Z0-9_.-,])+$";
  let pattern =  /^[a-zA-Z0-9_.\-, ]*$/;  // /^[a-zA-Z0-9- .,_]{1,80}$/i ;
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