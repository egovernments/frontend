import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTransformedLocale,getFileUrlFromAPI } from "egov-ui-framework/ui-utils/commons";
import { getTenantId,getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import store from "ui-redux/store";
import { convertEpochToDate,getTranslatedLabel } from "../ui-config/screens/specs/utils";
import axios from 'axios';
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

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


export const download = async(receiptQueryString, mode = "download" ,configKey = "consolidatedreceipt" , state) => {
  
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

  let consumerCode = getQueryArg(window.location.href, "consumerCode");
  let tenantId = getQueryArg(window.location.href, "tenantId");
  let applicationNumber = getQueryArg(window.location.href, "applicationNumber");

  let queryObject = [
    { key: "tenantId", value:tenantId },
    { key: "applicationNumber", value: consumerCode?consumerCode:applicationNumber}
  ];
  const FETCHFIREDETAILS = {
    GET: {
      URL: "/firenoc-services/v1/_search",
      ACTION: "_get",
    },
  };
  const response = await httpRequest("post", FETCHFIREDETAILS.GET.URL, FETCHFIREDETAILS.GET.ACTION,queryObject);

  try {
    httpRequest("post", FETCHRECEIPT.GET.URL, FETCHRECEIPT.GET.ACTION, receiptQueryString).then((payloadReceiptDetails) => {
      const queryStr = [
        { key: "key", value: configKey },
        { key: "tenantId", value: receiptQueryString[0].value.split('.')[0] }
      ]
      if (payloadReceiptDetails && payloadReceiptDetails.Payments && payloadReceiptDetails.Payments.length == 0) {
        console.log("Could not find any receipts");
        store.dispatch(toggleSnackbar(true, { labelName: "Receipt not Found", labelKey: "ERR_RECEIPT_NOT_FOUND" }
          , "error"));
        return;
      }
      if(payloadReceiptDetails.Payments[0].payerName!=null){
        payloadReceiptDetails.Payments[0].payerName=payloadReceiptDetails.Payments[0].payerName.trim();}
        else if(payloadReceiptDetails.Payments[0].payerName == null && payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="FIRENOC" && payloadReceiptDetails.Payments[0].paidBy !=null)
         { payloadReceiptDetails.Payments[0].payerName=payloadReceiptDetails.Payments[0].paidBy.trim();
        }
        if(payloadReceiptDetails.Payments[0].paidBy!=null)
        {
          payloadReceiptDetails.Payments[0].paidBy?payloadReceiptDetails.Payments[0].paidBy.trim():payloadReceiptDetails.Payments[0].paidBy;
        }
      if(payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="FIRENOC"){
        let owners=""; let contacts="";
        response.FireNOCs[0].fireNOCDetails.applicantDetails.owners.map(ele=>{
          if(owners=="")
          {owners=ele.name; 
            contacts=ele.mobileNumber;}
          else{
            owners=owners+","+ele.name; 
            contacts=contacts+","+ele.mobileNumber;
          }
  
        });
        payloadReceiptDetails.Payments[0].payerName=owners;
        payloadReceiptDetails.Payments[0].mobileNumber=contacts;
        let receiptDate=convertEpochToDate(payloadReceiptDetails.Payments[0].paymentDetails[0].receiptDate);
        let year=receiptDate.split("/")[2];
        year++;
        var nextyear=year;
        year--;
        var lastyear=year-1;
        let month=receiptDate.split("/")[1];
        let from=null,to=null;
        if(month<=3){ from=convertDateToEpoch("04/01/"+lastyear);
        to=convertDateToEpoch("03/31/"+year);}
        else{from=convertDateToEpoch("04/01/"+year);
        to=convertDateToEpoch("03/31/"+nextyear);}
          const details = {
               "address": response.FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress
               }
         payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].additionalDetails=details; 
         payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].fromPeriod=from;
         payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].toPeriod=to; 
   
  
      } 
      // Setting the Payer and mobile from Bill to reflect it in PDF
      state = state ? state : {};
         if(payloadReceiptDetails.Payments[0].paymentMode=="CHEQUE" || payloadReceiptDetails.Payments[0].paymentMode=="DD" || payloadReceiptDetails.Payments[0].paymentMode=="OFFLINE_NEFT" || payloadReceiptDetails.Payments[0].paymentMode=="OFFLINE_RTGS" ){
        let ifsc = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.ifscCode", null);
        let branchName = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.branchName", null);
        let bank = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.bank.name", null);
        payloadReceiptDetails.Payments[0].ifscCode=ifsc; 
        const details = [{
           "branchName": branchName ,
          "bankName":bank }
        ]       
      payloadReceiptDetails.Payments[0].additionalDetails=details; 
    }
      let billDetails = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]", null);
      if ((billDetails && !billDetails.payerName) || !billDetails) {
        billDetails = {
          payerName: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].name", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].name", null),
          mobileNumber: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].mobile", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].mobile", null),
        };
      }
       if(payloadReceiptDetails.Payments[0].paymentMode=="CASH")
      {
        payloadReceiptDetails.Payments[0].instrumentDate=null;
        payloadReceiptDetails.Payments[0].instrumentNumber=null;

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
        const propertiesById = get(state.properties , "propertiesById");
        const propertiesFound = propertiesById ? Object.values(propertiesById) : null;
        let queryData = { Payments: payloadReceiptDetails.Payments };
        if(propertiesFound) {
          queryData.properties = propertiesFound;
        }
        httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, queryData, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
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
export const downloadReceiptFromFilestoreID=(fileStoreId,mode,tenantId)=>{
  getFileUrlFromAPI(fileStoreId,tenantId).then(async(fileRes) => {
    if (mode === 'download') {
      var win = window.open(fileRes[fileStoreId], '_blank');
      if(win){
        win.focus();
      }
    }
    else {
     // printJS(fileRes[fileStoreId])
      var response =await axios.get(fileRes[fileStoreId], {
        //responseType: "blob",
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf"
        }
      });
      console.log("responseData---",response);
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
  });
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
      "/firenoc-services/v1/_search",
      "",
      queryObject
    );
    store.dispatch(toggleSpinner());

    if (response === '') {
      store.dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "This Provisional NoC number is not registered!",
            //labelKey: "ERR_PROVISIONAL_NUMBER_NOT_REGISTERED"
          },
          "info"
        )
      );
      return null;
    }

    response.FireNOCs.forEach(firenoc => {

      let buildings = firenoc.fireNOCDetails.buildings;

      for (let i = 0; i < buildings.length; i++) {

        buildings[i].landArea = parseInt(buildings[i].landArea);
        buildings[i].parkingArea = parseInt(buildings[i].parkingArea);
        buildings[i].totalCoveredArea = parseInt(buildings[i].totalCoveredArea);

      }
    });

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

    let newbuildings = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.buildings",
      []
    );
    newbuildings.map(index => {

      set(
        index,
        `landArea`,
        parseInt(index.landArea)
      );

      set(
        index,
        `totalCoveredArea`,
        parseInt(index.totalCoveredArea)
      );
      set(
        index,
        `parkingArea`,
        parseInt(index.parkingArea)
      );


      if (!index.parkingArea) {
        set(
          index,
          `parkingArea`,
          0
        );

      }
      else {
        set(
          index,
          `parkingArea`,
          parseInt(index.parkingArea)
        );
      }
    })

    let noctypedata = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType"
    );

    if (noctypedata === "NEW" || noctypedata === "PROVISIONAL") {

      let isLegacy = false;
      set(
        payload[0],
        "isLegacy",
        isLegacy
      );
    }


    let provisionalnocnumber = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].provisionFireNOCNumber",
      []
    )


    if (provisionalnocnumber.length === 0) {

      provisionalnocnumber = get(
        state.screenConfiguration.preparedFinalObject,
        "FireNOCs[0].provisionFireNOCNumber",
        []
      )

      var keyToDelete = "provisionFireNOCNumber";

      const codefull = get(
        state.screenConfiguration,
        "preparedFinalObject"
      );

      delete codefull.FireNOCs[0][keyToDelete];

    }


      let userInfodata = JSON.parse(getUserInfo());
      const tenantId1 = get(userInfodata, "permanentCity");

    
      let tenantId2 = get(
        state.screenConfiguration.preparedFinalObject,
        "FireNOCs[0].tenantId",
        getTenantId()
       );

     let tenantId = process.env.REACT_APP_NAME === "Citizen" ?  tenantId1: tenantId2;


     set(payload[0], "tenantId", tenantId);


    set(payload[0], "fireNOCDetails.action", status);
    set(
      payload[0],
      `fireNOCDetails.buildings`,
      newbuildings
    );

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
        (value == 0 || value > 0) &&
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
    jp.query(reduxDocuments, "$.*").forEach((doc, index) => {
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
          if(doc && doc.dropdown && doc.dropdown.value) {
            ownerDocuments[index].dropdown = {
              value : doc.dropdown.value
            }
          }
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
          if(doc && doc.dropdown && doc.dropdown.value) {
            ownerDocuments[index].dropdown = {
              value : doc.dropdown.value
            }
          }
        }
      }
    });

    set(
      payload[0],
      "fireNOCDetails.applicantDetails.additionalDetail.ownerAuditionalDetail.documents",
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

    let data = payload.filter(doc=>doc.fireNOCDetails.action==="APPROVE");

    data = data.map((obj)=>{
      if(obj.fireNOCDetails.action === "APPROVE")
      {
      obj.fireNOCDetails.action = "INITIATE";
      }
      })

      set(
        payload[1],
        "payload[1]",
        data
      );

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
      let isEdited = getQueryArg(window.location.href, "action") === "edit";
      if(!isEdited) {

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

  let NOCType = get(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType", []);
  documents = documents.filter(doc=>{return doc.applicationType  === NOCType });
  documents = documents.length ? documents[0].allowedDocs : [] ;
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
      if(uom.active == true){
        uomMap[uom.code] = `${uom.value}`;
      }
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