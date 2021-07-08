import commonConfig from "config/common.js";
import {
  getBreak, getCommonCard,
  getCommonContainer, getCommonHeader,
  getTextField,
  getSelectField,
  getLabel,
  getPattern,
  getCommonParagraph, getCommonTitle, getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar, unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {disableField,enableField, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { set } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import { togglePropertyFeilds, toggleSewerageFeilds, toggleWaterFeilds } from '../../../../ui-containers-local/CheckboxContainer/toggleFeilds';
import { httpRequest } from "../../../../ui-utils";
import {
  findAndReplace, getPropertyResults, getSearchResults, getSearchResultsForSewerage,
  handleApplicationNumberDisplay,
  isActiveProperty,
  isModifyMode,
  isModifyModeAction, prefillDocuments, prepareDocumentsUploadData,
  showHideFieldsFirstStep, getCBMdmsData
} from "../../../../ui-utils/commons";
import { triggerModificationsDisplay } from "./../utils/index";
import { additionDetails } from "./applyResource/additionalDetails";
import { OwnerInfoCard } from "./applyResource/connectionDetails";
import { getHolderDetails, holderHeader, sameAsOwner } from "./applyResource/connectionHolder";
import { footer } from "./applyResource/footer";
import { getOwnerDetails, ownerDetailsHeader, ownershipType } from "./applyResource/ownerDetails";
import { getExistingConnectionDetails } from "./applyResource/existingConnectionDetails";
import { getPropertyDetails } from "./applyResource/property-locationDetails";
import { getPropertyIDDetails, propertyHeader, propertyID } from "./applyResource/propertyDetails";
import { reviewConnectionDetails, snackbarWarningMessage, reviewRoadCuttingUserEntry } from "./applyResource/reviewConnectionDetails";
import { reviewDocuments } from "./applyResource/reviewDocuments";
import { reviewModificationsEffective } from "./applyResource/reviewModificationsEffective";
import { reviewOwner } from "./applyResource/reviewOwner";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { WaterSewerageOnProperty } from "./applyResource/functions";
import './index.css'

let isMode = isModifyMode();
export const stepperData = () => {
  if (process.env.REACT_APP_NAME === "Citizen") {
    return [{ labelKey: "WS_COMMON_CONNECTION_DETAILS" }, { labelKey: "WS_COMMON_DOCS" }, { labelKey: "WS_COMMON_SUMMARY" }];
  }
  else if (isModifyMode()) {
    return [{ labelKey: "WS_COMMON_PROPERTY_DETAILS" }, { labelKey: "WS_COMMON_ADDN_DETAILS" }, { labelKey: "WS_COMMON_DOCS" }, { labelKey: "WS_COMMON_SUMMARY" }];
  } else {
    return [{ labelKey: "WS_COMMON_CONNECTION_DETAILS" }, { labelKey: "WS_COMMON_DOCS" }, { labelKey: "WS_COMMON_ADDN_DETAILS" }, { labelKey: "WS_COMMON_SUMMARY" }];
  }
}
export const stepper = getStepperObject({ props: { activeStep: 0, classes: { root: "wns-stepper" } } }, stepperData());

export const getHeaderLabel = () => {
  if (isModifyMode()) {
    return process.env.REACT_APP_NAME === "Citizen" ? "WS_MODIFY_NEW_CONNECTION_HEADER" : "WS_MODIFY_CONNECTION_HEADER"
  }
  return process.env.REACT_APP_NAME === "Citizen" ? "WS_APPLY_NEW_CONNECTION_HEADER" : "WS_APPLICATION_NEW_CONNECTION_HEADER"
}

const headerrow = getCommonContainer({
  header: getCommonTitle(
    {
      labelName: "Required Documents",
      labelKey: "WS_DOCUMENT_DETAILS_HEADER"
    },
  )
});


export const header = getCommonContainer({
  headerDiv: getCommonContainer({
    header: getCommonHeader({
      labelKey: getHeaderLabel()
    })
  }),

  applicationNumberWater: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ApplicationNoContainer",
    props: { number: "NA", mode: isModifyMode() },
    visible: false
  },

  applicationNumberSewerage: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ApplicationNoContainer",
    props: { number: "NA", mode: isModifyMode() },
    visible: false
  }

});

export const reviewConnDetails = reviewConnectionDetails();

export const reviewOwnerDetails = reviewOwner(process.env.REACT_APP_NAME !== "Citizen");

export const reviewDocumentDetails = reviewDocuments();

export const reviewModificationsDetails = (isModifyMode()) ? reviewModificationsEffective(process.env.REACT_APP_NAME !== "Citizen") : {};


const summaryScreenCitizen = getCommonCard({
  reviewConnDetails,
  reviewDocumentDetails,
});
const summaryScreenEMP = getCommonCard({
  reviewConnDetails,
  reviewModificationsDetails,
  reviewDocumentDetails,
  reviewOwnerDetails,
  // reviewRoadCuttingUserEntry
})


let summaryScreen = process.env.REACT_APP_NAME === "Citizen" ? summaryScreenCitizen : summaryScreenEMP;


export const documentDetails = getCommonCard({
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
         children: {
          header1: {
            gridDefination: {
              xs: 8,
              sm: 8
            },
            ...headerrow
          }
          ,
       
          helpSection: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
              color: "primary",
              style: { justifyContent: "flex-end" }, 
            },
            gridDefination: {
            
              xs: 4,
              sm: 4,
              align: "right"
            },
            children : {
              helpPdfButton:{
                componentPath:"Button", 
               
         
                props:{
                  //variant: "outlined",
                  color:"primary",                 
                  style: { textAlign: "right", display: "flex" },
                },
                onClickDefination: {
                  action: "condition",
                  callBack: (state, dispatch) => {
                  downloadSelfDeclerationForm(state, dispatch);
                  }
                },
                children:{
                  
                  nextButtonIcon:{
                    uiFramework:"custom-atoms",
                    componentPath:"Icon",
                    props:{
                      iconName:"cloud_download"
                    }
                  },
                  nextButtonLabel:getLabel({
                    labelName:"Self Declearation Form",
                    labelKey:"WS_SELFDECLERATION_FORM"
                  }),
                },
                            
               }
            }
          }
        }
       },      
       paragraph: getCommonParagraph({
        labelName:
          "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
        labelKey: "WS_DOCUMENT_DETAILS_SUBTEXT"
      }),
    }
  },
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "DocumentListContainer",
    props: {
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "WS_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      // description: "Only .jpg and .pdf files. 6MB max file size.",
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      maxFileSize: 5000
    },
    type: "array"
  }
});



export const downloadSelfDeclerationForm = async (state, dispatch) => {  
  try{
    const helpurl = get(state.screenConfiguration.preparedFinalObject,
      "selfDecFormURL",
      ""
    );  
    window.open(helpurl,"_blank");
  }catch(er){
    console.log("errror in opening pdf ",er);
  }
  
}

export const getMdmsData = async dispatch => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        { moduleName: "common-masters", masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" },{ name: "Help" }] },
        { moduleName: "tenant", masterDetails: [{ name: "tenants" }, { name: "citymodule" }] },
        { moduleName: "sw-services-calculation", masterDetails: [{ name: "Documents" }, { name: "RoadType" }, { name: "PipeSize" }] },
        { moduleName: "ws-services-calculation", masterDetails: [{ name: "PipeSize" }] },
        {
          moduleName: "ws-services-masters", masterDetails: [
            { name: "waterSource" },
            { name: "connectionType" },
            { name: "PropertySearch" },
            { name: "TaxHeadMaster" },
            { name: "motorInfo" },
            { name: "authorizedConnection" },
            { name: "workflowBasedCardPermission" },
            { name: "waterUsage"}
          ]
        },
        { moduleName: "PropertyTax", 
             masterDetails: 
             [{ name: "PTWorkflow" }, 
             { name: "PropertyOwnershipCategory" }
            //  { name: "UsageCategory" },
            //  { name: "UsageCategoryMajor" },
            //  { name: "UsageCategoryMinor" },
            //  { name: "UsageCategorySubMinor" },
            ]}
      ]
    }
  };
  try {
    let payload = null;    
    payload = await httpRequest("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);   
    if (payload.MdmsRes['sw-services-calculation'].PipeSize !== undefined && payload.MdmsRes['sw-services-calculation'].PipeSize.length > 0) {
      let drainageSize = [];
      payload.MdmsRes['sw-services-calculation'].PipeSize.forEach(obj => drainageSize.push({ code: obj.size, name: obj.id, isActive: obj.isActive }));
      payload.MdmsRes['sw-services-calculation'].drainageSize = drainageSize;
    }
    if (payload.MdmsRes['ws-services-calculation'].PipeSize !== undefined && payload.MdmsRes['ws-services-calculation'].PipeSize.length > 0) {
      let pipeSize = [];
      payload.MdmsRes['ws-services-calculation'].PipeSize.forEach(obj => pipeSize.push({ code: obj.size, name: obj.id, isActive: obj.isActive }));
      payload.MdmsRes['ws-services-calculation'].pipeSize = pipeSize;
      let waterSource = [], GROUND = [], SURFACE = [], PIPE = [];
      payload.MdmsRes['ws-services-masters'].waterSource.forEach(obj => {
        waterSource.push({
          code: obj.code.split(".")[0],
          name: obj.name,
          isActive: obj.active
        });
        if (obj.code.split(".")[0] === "GROUND") {
          GROUND.push({
            code: obj.code.split(".")[1],
            name: obj.name,
            isActive: obj.active
          });
        } else if (obj.code.split(".")[0] === "SURFACE") {
          SURFACE.push({
            code: obj.code.split(".")[1],
            name: obj.name,
            isActive: obj.active
          });
        } else if (obj.code.split(".")[0] === "PIPE") {
          PIPE.push({
            code: obj.code.split(".")[1],
            name: obj.name,
            isActive: obj.active
          })
        }
      })
      let filtered = waterSource.reduce((filtered, item) => {
        if (!filtered.some(filteredItem => JSON.stringify(filteredItem.code) == JSON.stringify(item.code)))
          filtered.push(item)
        return filtered
      }, [])
      payload.MdmsRes['ws-services-masters'].waterSource = filtered;
      payload.MdmsRes['ws-services-masters'].GROUND = GROUND;
      payload.MdmsRes['ws-services-masters'].SURFACE = SURFACE;
      payload.MdmsRes['ws-services-masters'].PIPE = PIPE;
    }
    //Water usage type
    let waterUsage = [], waterSubUsage = [];   
    payload.MdmsRes['ws-services-masters'].waterUsage.forEach(obj => {
      if(obj.code.includes('.')){
        waterSubUsage.push({
          code: obj.code,
          name: obj.name,
          isActive: obj.active
        });
      }
      else{
        waterUsage.push({
          code: obj.code,
          name: obj.name,
          isActive: obj.active
        }); 
      }
         
    })    
    
    payload.MdmsRes['ws-services-masters'].waterSubUsage = waterSubUsage;
    payload.MdmsRes['ws-services-masters'].waterUsage = waterUsage;

    // let filteredWaterUsage = waterUsage.reduce((filteredWaterUsage, item) => {
    //   if (!filteredWaterUsage.some(filteredItem => JSON.stringify(filteredItem.code) == JSON.stringify(item.code)))
    //   filteredWaterUsage.push(item)
    //   return filteredWaterUsage
    // }, [])
    
    // payload.MdmsRes['ws-services-masters'].waterSubUsage = payload.MdmsRes['ws-services-masters'].waterUsage;
    // payload.MdmsRes['ws-services-masters'].waterUsage = filteredWaterUsage;
    
    //Water usage type


    //related to ownershipcategory
    let OwnerShipCategory = get(
      payload,
      "MdmsRes.common-masters.OwnerShipCategory"
    )
    let institutions = []
    OwnerShipCategory = OwnerShipCategory.map(category => {
      if (category.code.includes("INDIVIDUAL")) {
        return category.code;
      }
      else {
        let code = category.code.split(".");
        institutions.push({ code: code[1], parent: code[0], active: true });
        return code[0];
      }
    });
    OwnerShipCategory = OwnerShipCategory.filter((v, i, a) => a.indexOf(v) === i)
    OwnerShipCategory = OwnerShipCategory.map(val => { return { code: val, active: true } });

    payload.MdmsRes['common-masters'].Institutions = institutions;
    payload.MdmsRes['common-masters'].OwnerShipCategory = OwnerShipCategory;

    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    
      let selfDecFormURL = get(
        payload,
        "MdmsRes.common-masters.Help",
        []
        ).filter(item =>item.code ==="WS_SELFDECLERATION_FORM" );
 
  dispatch(prepareFinalObject("selfDecFormURL", selfDecFormURL[0].URL)); 
  
  
  } catch (e) { console.log(e); }
};

const showHideFieldModifyConnection = (action) => {
  let fieldsChanges = [
    ["components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.clickHereLink",false],
    ["components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.wnsPtySearchButton",false],
    ["components.div.children.formwizardFirstStep.children.OwnerInfoCard", false],     
    ["components.div.children.formwizardFourthStep.children.snackbarWarningMessage.children.clickHereLink", true],
   // ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSeven", false],
   // ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight", false],
    ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewNine", false],
    ["components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTen", false],
  ]
  for (var i = 0; i < fieldsChanges.length; i++) {
    set(
      action.screenConfig,
      fieldsChanges[i][0] + ".visible",
      fieldsChanges[i][1]
    );
  }
}

export const getData = async (action, state, dispatch) => { 
  let applicationNo = getQueryArg(window.location.href, "applicationNumber");
  const connectionNo = getQueryArg(window.location.href, "connectionNumber");
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const propertyID = getQueryArg(window.location.href, "propertyId");
  const actionType = getQueryArg(window.location.href, "action");
  let mStep = (isModifyMode()) ? 'formwizardSecondStep' : 'formwizardThirdStep';
  await getMdmsData(dispatch);
  if (tenantId) {
    await getCBMdmsData(dispatch, tenantId);
    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
  }
        
  if (applicationNo) {
    //Edit/Update Flow ----   
    let queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "applicationNumber", value: applicationNo }
     ];
     if (actionType && (actionType.toUpperCase() === "EDIT")) {
      if (connectionNo) {
        handleApplicationNumberDisplay(dispatch, connectionNo)
      } else {
        handleApplicationNumberDisplay(dispatch, applicationNo)
      }
      let payloadWater, payloadSewerage;
       if (applicationNo.includes("SW")) {
         try { payloadSewerage = await getSearchResultsForSewerage(queryObject, dispatch) } catch (error) { console.error(error); }
         payloadSewerage.SewerageConnections[0].water = false;
         payloadSewerage.SewerageConnections[0].sewerage = true;
         payloadSewerage.SewerageConnections[0].service = "Sewerage";
         dispatch(prepareFinalObject("SewerageConnection", payloadSewerage.SewerageConnections));
       } else {
         try { payloadWater = await getSearchResults(queryObject) } catch (error) { console.error(error); };
         payloadWater.WaterConnection[0].water = true;
         payloadWater.WaterConnection[0].sewerage = false;
         payloadWater.WaterConnection[0].service = "Water";
         dispatch(prepareFinalObject("WaterConnection", payloadWater.WaterConnection));
         if (get(payloadWater, "WaterConnection[0].waterSource", null) && get(payloadWater, "WaterConnection[0].waterSubSource", null)) {
           dispatch(prepareFinalObject("DynamicMdms.ws-services-masters.waterSource.selectedValues", [{
             waterSourceType: get(payloadWater, "WaterConnection[0].waterSource", null),
             waterSubSource: get(payloadWater, "WaterConnection[0].waterSourceSubSource", null)
           }]))
         } else if (get(payloadWater, "WaterConnection[0].waterSource", null)) {
           dispatch(prepareFinalObject("DynamicMdms.ws-services-masters.waterSource.selectedValues", [{
             waterSourceType: get(payloadWater, "WaterConnection[0].waterSource", null),
             waterSubSource: get(payloadWater, "WaterConnection[0].waterSourceSubSource", null)
           }]))
         }
       }
      const waterConnections = payloadWater ? payloadWater.WaterConnection : []
      if (waterConnections.length > 0) {
        waterConnections[0].additionalDetails.locality = get(waterConnections[0], "property.address.locality.code");
      }
      const sewerageConnections = payloadSewerage ? payloadSewerage.SewerageConnections : [];
      if (sewerageConnections.length > 0) {
        sewerageConnections[0].additionalDetails.locality = get(sewerageConnections[0], "property.address.locality.code");
      }
      let combinedArray = waterConnections.concat(sewerageConnections);

      if (!window.location.href.includes("propertyId")) {
        if (!isActiveProperty(combinedArray[0].property)) {
          dispatch(toggleSnackbar(true, { labelKey: `ERR_WS_PROP_STATUS_${combinedArray[0].property.status}`, labelName: `Property Status is ${combinedArray[0].property.status}` }, "warning"));
          showHideFieldsFirstStep(dispatch, "", false);
        }
      }
      // For Modify connection details
      if (isModifyMode() && !isModifyModeAction()) {
        // this delete for initiate modify connection 
        delete combinedArray[0].id; combinedArray[0].documents = [];
        
        if (waterConnections.length > 0)
           waterConnections[0].plumberInfo =[];
        if (sewerageConnections.length > 0) 
           sewerageConnections[0].plumberInfo =[];
      }
      if (isModifyMode() && isModifyModeAction()) {
        // ModifyEdit should not call create.       
        dispatch(prepareFinalObject("modifyAppCreated", true));
      }      

      dispatch(prepareFinalObject("applyScreen", findAndReplace(combinedArray[0], "null", "NA")));
      // For oldvalue display
      let oldcombinedArray = cloneDeep(combinedArray[0]);
      dispatch(prepareFinalObject("applyScreenOld", findAndReplace(oldcombinedArray, "null", "NA")));
      if (combinedArray[0].connectionHolders && combinedArray[0].connectionHolders !== "NA") {
        combinedArray[0].connectionHolders[0].sameAsPropertyAddress = false;
        dispatch(prepareFinalObject("connectionHolders", combinedArray[0].connectionHolders));
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.sameAsOwner.children.sameAsOwnerDetails",
            "props.isChecked",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.holderDetails",
            "visible",
            true
          )
        );
        set(
          action.screenConfig,
          "components.div.children.formwizardFirstStep.children.connectionHolderDetails.visible",
          true
        );
      }
      let data = get(state.screenConfiguration.preparedFinalObject, "applyScreen")
      if (data.connectionType !== "Metered") {
        dispatch(
          handleField(
            "apply",
            `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading`,
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate`,
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID`,
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading`,
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate`,
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID`,
            "visible",
            false
          )
        );
      }
      if (data.additionalDetails !== undefined && data.additionalDetails.detailsProvidedBy !== undefined) {
        if (data.additionalDetails.detailsProvidedBy === "Self") {
          dispatch(
            handleField(
              "apply",
              `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberLicenceNo`,
              "visible",
              false
            )
          );
          dispatch(
            handleField(
              "apply",
              `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberName`,
              "visible",
              false
            )
          );
          dispatch(
            handleField(
              "apply",
              `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberMobNo`,
              "visible",
              false
            )
          );
        } else if (data.additionalDetails.detailsProvidedBy === "ULB") {
          dispatch(
            handleField(
              "apply",
              `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberLicenceNo`,
              "visible",
              true
            )
          );
          dispatch(
            handleField(
              "apply",
              `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberName`,
              "visible",
              true
            )
          );
          dispatch(
            handleField(
              "apply",
              `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberMobNo`,
              "visible",
              true
            )
          );
        }
      }
      let ownershipCategory = get(data, "property.ownershipCategory", "");
      if (ownershipCategory.includes("INDIVIDUAL")) {
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.institutionSummary",
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.applicantSummary",
            "visible",
            true
          )
        );
      } else {
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.institutionSummary",
            "visible",
            true
          )
        );
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.applicantSummary",
            "visible",
            false
          )
        );
      }


      if (propertyID) {       
        let queryObject = [{ key: "tenantId", value: tenantId }, { key: "propertyIds", value: propertyID }];
        getApplyPropertyDetails(queryObject, dispatch, propertyID, tenantId, state)
      } else {       
        let propId = get(state.screenConfiguration.preparedFinalObject, "applyScreen.property.propertyId")       
        //Aleady existing connection count
        let queryObjectProperty = [];
        queryObjectProperty = [{ key: "searchType", value: "CONNECTION" }];
        queryObjectProperty.push({ key: "tenantId", value: tenantId });
        queryObjectProperty.push({ key: "propertyId", value: propId });
        try {           
          let payloadWater = await getSearchResults(queryObjectProperty);
          let wsConns = get(payloadWater,"WaterConnection",[]); 
          let count = wsConns.length; 
          let connStr =[];         
          wsConns.forEach(obj => connStr.push(obj.connectionNo));
          dispatch(prepareFinalObject("applyScreen.existingWaterConnCount", count));
          dispatch(prepareFinalObject("applyScreen.existingWaterConn", connStr.join(", ")));          
        } catch (error) { console.error(error); };
        try {
          let payloadSewerage = await getSearchResultsForSewerage(queryObject, dispatch);
          let swConns = get(payloadSewerage, "SewerageConnections", []);
          let count = swConns.length;
          let connStr = [];
          swConns.forEach(obj => connStr.push(obj.connectionNo));
          dispatch(prepareFinalObject("applyScreen.existingSewerageConnCount", count));
          dispatch(prepareFinalObject("applyScreen.existingSewerageConn", connStr.join(", ")));
        } catch (error){ console.error(error); };
        //Connection count
        dispatch(prepareFinalObject("searchScreen.propertyIds", propId));
      }
      //For Modify Connection hide the connection details card
      if (isModifyMode()) {
        showHideFieldModifyConnection(action);
        //Disable property Id field
        disableField('apply', "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.propertyID", dispatch);

        if(data.waterSource == "OTHERS")
        {         
          enableField('apply', 'components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.sourceInfo', dispatch);
        }
        else
        {
          disableField('apply', 'components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.sourceInfo', dispatch);
        }
      }
      let docs = get(state, "screenConfiguration.preparedFinalObject");
      await prefillDocuments(docs, "displayDocs", dispatch);
    }
  } else if (propertyID) {   
    let queryObject = [{ key: "tenantId", value: tenantId }, { key: "propertyIds", value: propertyID }];
    getApplyPropertyDetails(queryObject, dispatch, propertyID, tenantId, state)
    WaterSewerageOnProperty(tenantId, propertyID, dispatch)
    if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water") && get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
      toggleWaterFeilds(action, true);
      toggleSewerageFeilds(action, true);
    } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
      toggleWaterFeilds(action, false);
      toggleSewerageFeilds(action, true);
    } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water")) {
      toggleWaterFeilds(action, true);
      toggleSewerageFeilds(action, false);
    }
    else {
      toggleWaterFeilds(action, false);
      toggleSewerageFeilds(action, false);
    }
    togglePropertyFeilds(action, true);
  }
};
const getApplicationNoLabel = () => {
  if (isModifyMode() && !isModifyModeAction()) {
    return "WS_ACKNO_CONNECTION_NO_LABEL";
  }
  return "WS_ACKNO_APP_NO_LABEL";
}

const checkCardPermission = (state, cardName) => {
  
  let workFlowStatus = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreen.applicationStatus",
    null
  );
  let cardList = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.ws-services-masters.workflowBasedCardPermission",
    []
  );
  
  let appType =isModifyMode()?"MODIFY":"NEW";

  cardList = cardList.filter((card) => card.code.includes(cardName) && card.workflow.includes(appType) );

  let accessFlag = false;
  if(cardList.length > 0 ){    
    for(var i=0;i<cardList.length;i++){
        if(cardList[i].status.includes(workFlowStatus)){
          console.info("YES, present so return true")
          accessFlag = true;
          break;
        }                
    }   
  }
  return accessFlag;    
  }
 
 
 
//   if (cardList.length > 0 && cardList[0].status.includes(workFlowStatus)) {
//     return true;
//   }
//   return false;
// }

const getApplyPropertyDetails = async (queryObject, dispatch, propertyID, tenantId, state) => {
  let payload = await getPropertyResults(queryObject, dispatch);
  let propertyObj = payload.Properties[0]; 
  if (!isActiveProperty(propertyObj)) {
    dispatch(toggleSnackbar(true, { labelKey: `ERR_WS_PROP_STATUS_${propertyObj.status}`, labelName: `Property Status is ${propertyObj.status}` }, "warning"));
    showHideFieldsFirstStep(dispatch, propertyObj.propertyId, false);
  }
  if (propertyObj && propertyObj.owners && propertyObj.owners.length > 0) {
    propertyObj.owners = propertyObj.owners.filter(owner => owner.status == "ACTIVE");
  }
  dispatch(prepareFinalObject("applyScreen.property", findAndReplace(propertyObj, null, "NA")));
  dispatch(prepareFinalObject("searchScreen.propertyIds", propertyID));
  showHideFieldsFirstStep(dispatch, propertyObj.propertyId, true);
  if (propertyID) {
    const mohallaLocalePrefix = {
      moduleName: tenantId,
      masterName: "REVENUE"
    };
    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardFirstStep.children.Details.children.cardContent.children.propertyDetail.children.viewFour.children.locality.children.value.children.key",
        "props.localePrefix",
        mohallaLocalePrefix
      )
    );

    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewTwo.props.items[0].item0.children.cardContent.children.propertyLocationDetailsContainer.children.reviewLocalityOrMohalla.children.value1.children.key",
        "props.localePrefix",
        mohallaLocalePrefix
      )
    );


    let ownershipCategory = get(payload, "Properties[0].ownershipCategory", "");
    if (ownershipCategory.includes("INDIVIDUAL")) {
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.institutionSummary",
          "visible",
          false
        )
      );
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.applicantSummary",
          "visible",
          true
        )
      );      
    } else {
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.institutionSummary",
          "visible",
          true
        )
      );
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.applicantSummary",
          "visible",
          false
        )
      );
    }
  }

  let tenantIdProp = get(payload, "Properties[0].tenantId", "");
  if (tenantIdProp) {
    const wsTenant = get(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.tenant.citymodule").filter(city => city.code == 'WS')[0].tenants.filter(tenant => tenant.code == tenantIdProp);
    const swTenant = get(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.tenant.citymodule").filter(city => city.code == 'SW')[0].tenants.filter(tenant => tenant.code == tenantIdProp);
    if (wsTenant.length > 0) {
      if (swTenant.length == 0) {
        dispatch(prepareFinalObject("applyScreen.water", true));
        dispatch(prepareFinalObject("applyScreen.sewerage", false));
      }
      dispatch(prepareFinalObject("disableWS", false));
      //toggleSewerageFeilds(action, true);
      // toggleWaterFeilds(action, true);
    }
    else {
      dispatch(prepareFinalObject("disableWS", true));
      //toggleWaterFeilds(action, false);            
    }
    if (swTenant.length > 0) {
      if (wsTenant.length == 0) {
        dispatch(prepareFinalObject("applyScreen.water", false));
        dispatch(prepareFinalObject("applyScreen.sewerage", true));
      }
      dispatch(prepareFinalObject("disableSW", false));
      //toggleSewerageFeilds(action, true);
    }
    else {
      dispatch(prepareFinalObject("disableSW", true));
      // toggleSewerageFeilds(action, false);
    }

  }



}

let existingConnectionDetails = getExistingConnectionDetails();
let propertyDetail = getPropertyDetails();
let propertyIDDetails = getPropertyIDDetails();
let ownerDetail = getOwnerDetails();
let holderDetails = getHolderDetails();

export let ownerDetails = getCommonCard({ ownerDetailsHeader, ownershipType, ownerDetail });
export let IDDetails = getCommonCard({ propertyHeader, propertyID, propertyIDDetails });
export let existingConnection = getCommonCard({ existingConnectionDetails });
export let Details = getCommonCard({ propertyDetail });
export let connectionHolderDetails = getCommonCard({ holderHeader, sameAsOwner, holderDetails })

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form1" },
  children: { IDDetails, Details, existingConnection, ownerDetails, connectionHolderDetails, OwnerInfoCard }
};
export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form2" },
  children: { documentDetails },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form3" },
  children: { additionDetails },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: { id: "apply_form4" },
  children: { snackbarWarningMessage, summaryScreen },
  visible: false
};

const pageReset = (dispatch) => {
  dispatch(handleField("apply",
    "components",
    "div", {}));
  // dispatch(handleField("search",
  // "components",
  // "div", {}));
  // dispatch(handleField("search-preview",
  // "components",
  // "div", {}));
  dispatch(unMountScreen("search"));
  dispatch(unMountScreen("search-preview"));
  dispatch(prepareFinalObject("WaterConnection", []));
  dispatch(prepareFinalObject("SewerageConnection", []));
  dispatch(prepareFinalObject("applyScreen", {}));
  dispatch(prepareFinalObject("searchScreen", {}));
  dispatch(prepareFinalObject("connectionHolders", []));
  dispatch(prepareFinalObject("documentsUploadRedux", {}));
  dispatch(prepareFinalObject("DynamicMdms.ws-services-masters.waterSource.selectedValues", []));
  dispatch(prepareFinalObject("editWSFlow", false));

  existingConnectionDetails = getExistingConnectionDetails();
  propertyDetail = getPropertyDetails();
  propertyIDDetails = getPropertyIDDetails();
  ownerDetail = getOwnerDetails();
  holderDetails = getHolderDetails();
  existingConnection = getCommonCard({ existingConnectionDetails });
  ownerDetails = getCommonCard({ ownerDetailsHeader, ownershipType, ownerDetail });
  IDDetails = getCommonCard({ propertyHeader, propertyID, propertyIDDetails });
  Details = getCommonCard({ propertyDetail });
  connectionHolderDetails = getCommonCard({ holderHeader, sameAsOwner, holderDetails })
}

const getIndividualTaxheads = (item, index, dispatch) => {

  //return{
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.wsConnectionTaxHeads.children",
      `taxheadField_${item.code.split(".").join("_")}`,
      getTextField({
        label: {
          labelName: "Tax Amount",
          labelKey: `${getTransformedLocale(item.code)}`,
        },
        placeholder: {
          labelName: "Enter Tax Amount",
          labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER",
        },

        componentJsonpath: `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.wsConnectionTaxHeads.children.taxheadField_${item.code.split(".").join("_")}`,
        pattern: getPattern("DecimalNumber"),       
        visible: item.code.endsWith('_ROAD_CUTTING_CHARGE') ? false : true,
        jsonPath: `applyScreen.wsTaxHeads[${index}].amount`,

        props: {
          type: "number",
          jsonPath: `applyScreen.wsTaxHeads[${index}].amount`,
        },
        jsonPath: `applyScreen.wsTaxHeads[${index}].amount`,



      })

    )
  )

}


const setRoadCuttingEstimate = (item, index, dispatch) => {

  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children",
      `roadCutting_${index}`,
      getCommonContainer({
        roadTypeDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: {
              display: "table",
              width: "100%",
              height: "100%",
            },
          },



          children: {
            subHeader: getCommonTitle({
              // labelKey: `${getTransformedLocale(item.code)}`
              labelKey: `WS_ROADTYPE_${(item.code)}`,
             },
              {
                style: {
                  fontSize: "15px",
                  overflowWrap: 'break-word',
                  textAlign: "left",
                  display: "table-cell",
                  verticalAlign: "middle"
                }
              }
            )
          },
          gridDefination: {
            xs: 12,
            sm: 2
          },

        },


        RoadCuttingLength: getTextField({
          label: {
            labelName: "Road Cutting Length",
            labelKey: "WF_ESTIMATION_LENGTH"
          },
          // placeholder: {
          //   labelName: "Road Cutting Length",
          //   labelKey: "WF_ESTIMATION_LENGTH_PLACEHOLDER"
          // },
          props: {
            type: "number",
            id: `roadLength_${index}`,
          },

          // required: true,
          visible: true,
          pattern: getPattern("ThreeDigitDecimalNumber"),
          componentJsonpath: `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children.roadCutting_${index}.children.RoadCuttingLength`,
          jsonPath: `applyScreen.roadTypeEst[${index}].length`,
          gridDefination: {
            xs: 12,
            sm: 2
          },
        }),
        RoadCuttingBreadth: getTextField({
          label: {
            labelName: "Road Cutting Breadth",
            labelKey: "WF_ESTIMATION_BREADTH"
          },
          // placeholder: {
          //   labelName: "Road Cutting Breadth",
          //   labelKey: "WF_ESTIMATION_BREADTH_PLACEHOLDER"
          // },
          props: {
            type: "number",
            id: `roadBreadth_${index}`,
          },
          // required: true,
          visible: true,
          pattern: getPattern("ThreeDigitDecimalNumber"),
          componentJsonpath: `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children.roadCutting_${index}.children.RoadCuttingBreadth`,
          jsonPath: `applyScreen.roadTypeEst[${index}].breadth`,
          gridDefination: {
            xs: 12,
            sm: 2
          },
        }),
        RoadCuttingDepth: getTextField({
          label: {
            labelName: "Road Cutting Depth",
            labelKey: "WF_ESTIMATION_DEPTH"
          },
          // placeholder: {
          //   labelName: "Road Cutting Depth",
          //   labelKey: "WF_ESTIMATION_DEPTH_PLACEHOLDER"
          // },
          props: {
            type: "number",
            id: `roadDepth_${index}`,
          },
          // required: true,
          visible: true,
          pattern: getPattern("ThreeDigitDecimalNumber"),
          componentJsonpath: `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children.roadCutting_${index}.children.RoadCuttingDepth`,
          jsonPath: `applyScreen.roadTypeEst[${index}].depth`,
          gridDefination: {
            xs: 12,
            sm: 2
          },
        }),
        RoadCuttingRate: getTextField({
          label: {
            labelName: "Road Cutting Rate",
            labelKey: "WF_ESTIMATION_RATE"
          },
          // placeholder: {
          //   labelName: "Road Cutting Rate",
          //   labelKey: "WF_ESTIMATION_RATE_PLACEHOLDER"
          // },
          props: {
            type: "number",
            id: `roadRate_${index}`,
          },
          // required: true,
          visible: true,
          pattern: getPattern("DecimalNumber"),
          componentJsonpath: `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children.roadCutting_${index}.children.RoadCuttingRate`,
          jsonPath: `applyScreen.roadTypeEst[${index}].rate`,
          gridDefination: {
            xs: 12,
            sm: 2
          },
        }),

      }),
    )
  )
}

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  // hasBeforeInitAsync:true,
  beforeInitScreen: (action, state, dispatch) => {
    //prevent the createCall at last step.
    dispatch(prepareFinalObject("modifyAppCreated", false));
    pageReset(dispatch);
    dispatch(prepareFinalObject(`applyScreen.wsTaxHeads`, []));
    //Road cutting charges
    dispatch(prepareFinalObject(`applyScreen.roadTypeEst`, []));

    dispatch(prepareFinalObject("applyScreen.water", false));
    dispatch(prepareFinalObject("applyScreen.sewerage", false));

    const propertyId = getQueryArg(window.location.href, "propertyId");
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");

    getData(action, state, dispatch).then(() => {
      let ownershipCategory = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
        []
      );
      dispatch(prepareFinalObject("OwnershipCategory", ownershipCategory));

      //Make estimation/activation containers visible to false initially
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer",
          "visible",
          false
        )
      );

      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.modificationsEffectiveFrom",
          "visible",
          false
        )
      );
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer",
          "visible",
          false
        )
      );


      //Setting Tax heads and Road Types
      if (applicationNumber && getQueryArg(window.location.href, "action") === "edit" && process.env.REACT_APP_NAME !== "Citizen") {

        //show tax head estimates to only field inspector and doc verifier
        let chkwsConnectionTaxHeadsContainer = checkCardPermission(state, "wsConnectionTaxHeadsContainer");
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer",
            "visible",
            chkwsConnectionTaxHeadsContainer
          )
        );


         //  if (!isModifyMode()) {

          let chkplumberDetailsContainer = checkCardPermission(state, "plumberDetailsContainer");
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.plumberDetailsContainer",
              "visible",
              chkplumberDetailsContainer
            )
          );
          let chkconnectiondetailscontainer = checkCardPermission(state, "connectiondetailscontainer");
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer",
              "visible",
              chkconnectiondetailscontainer
            )
          );

          let chkActivationDetailsContainer = checkCardPermission(state, "activationDetailsContainer");
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer",
              "visible",
              chkActivationDetailsContainer
            )
          );

          //Fill tax heads and road cutting charges
          //Create tax head object ---start
          let taxHeadDetails = get(
            state,
            "screenConfiguration.preparedFinalObject.applyScreenMdmsData.ws-services-masters.TaxHeadMaster",
            []
          );
          //Filter for tax heads 
          let applicationType = applicationNumber.includes("SW") ? "SW" : "WS";
          taxHeadDetails = taxHeadDetails.filter((taxHead) => taxHead.service.includes(applicationType));

          //Read existing tax heads
          let existingTaxHeads = get(state, "screenConfiguration.preparedFinalObject.applyScreen.wsTaxHeads", []);
          let taxHeads = {};
          existingTaxHeads.forEach(obj => taxHeads[obj.taxHeadCode] = obj);

       
          for (var i = 0; i < taxHeadDetails.length; i++) {           
            taxHeadDetails[i] = { ...taxHeadDetails[i], amount: null, taxHeadCode: taxHeadDetails[i].code, id: null };
           
            if (taxHeads[taxHeadDetails[i].code]) { //If amt = 0 then put amt = null else estimate page will be populated with all 0 values
              taxHeadDetails[i].amount = taxHeads[taxHeadDetails[i].code].amount !=0 ? taxHeads[taxHeadDetails[i].code].amount : null;
              taxHeadDetails[i].id = taxHeads[taxHeadDetails[i].code].id;
            }
          }
         
          dispatch(prepareFinalObject(`applyScreen.wsTaxHeads`, taxHeadDetails));

          //Filter for road types
          let roadTypes = get(
            state,
            "screenConfiguration.preparedFinalObject.applyScreenMdmsData.sw-services-calculation.RoadType",
            []
          );
          let existingRoadDetail = get(state, "screenConfiguration.preparedFinalObject.applyScreen.roadTypeEst", []);
          let roadDetails = {};
          existingRoadDetail.forEach(obj => obj['code'] = obj.roadType);
          existingRoadDetail.forEach(obj => roadDetails[obj.roadType] = obj);
           //If road cutting filled then populate that value else put null else 0 will be populated 
          for (var i = 0; i < roadTypes.length; i++) {
            roadTypes[i] = { ...roadTypes[i], roadType: roadTypes[i].code, length: null, depth: null, breadth: null, rate: null };
            if (roadDetails[roadTypes[i].code]) {
              roadTypes[i] = (roadDetails[roadTypes[i].code].length != 0 && roadDetails[roadTypes[i].code].breadth != 0 && roadDetails[roadTypes[i].code].depth != 0 && roadDetails[roadTypes[i].code].rate != 0)? roadDetails[roadTypes[i].code] : roadTypes[i];
            }
          }
          dispatch(
            prepareFinalObject(`applyScreen.roadTypeEst`, roadTypes)
          );

          //create component
          for (var i = 0; i < taxHeadDetails.length; i++) {
            getIndividualTaxheads(taxHeadDetails[i], i, dispatch);
          }
          for (var i = 0; i < roadTypes.length; i++) {
            setRoadCuttingEstimate(roadTypes[i], i, dispatch);
          }

          let chkModificationsEffectiveFrom = checkCardPermission(state, "modificationsEffectiveFrom");
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.modificationsEffectiveFrom",
              "visible",
              chkModificationsEffectiveFrom
            )
          );

     //   }
     //   else {
          // dispatch(
          //   handleField(
          //     "apply",
          //     "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.modificationsEffectiveFrom",
          //     "visible",
          //     true
          //   )
          // );

          // dispatch(
          //   handleField(
          //     "apply",
          //     "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer",
          //     "visible",
          //     true
          //   )
          // );
      //  }

      }
      if (applicationNumber && getQueryArg(window.location.href, "action") === "edit") {
        dispatch(prepareFinalObject("editWSFlow", true));
      }
    });



    if (propertyId) {
      togglePropertyFeilds(action, true);
      if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water") && get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
        toggleWaterFeilds(action, true);
        toggleSewerageFeilds(action, true);
      } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
        toggleWaterFeilds(action, false);
        toggleSewerageFeilds(action, true);
      } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water")) {
        toggleWaterFeilds(action, true);
        toggleSewerageFeilds(action, false);
      } else {
        toggleWaterFeilds(action, false);
        toggleSewerageFeilds(action, false);
      }
    } else if (applicationNumber && getQueryArg(window.location.href, "action") === "edit") {
      togglePropertyFeilds(action, true);
      if (applicationNumber.includes("SW")) {
        dispatch(prepareFinalObject("applyScreen.water", false));
        dispatch(prepareFinalObject("applyScreen.sewerage", true));
        toggleWaterFeilds(action, false);
        toggleSewerageFeilds(action, true);
      } else {
        dispatch(prepareFinalObject("applyScreen.water", true));
        dispatch(prepareFinalObject("applyScreen.sewerage", false));
        toggleWaterFeilds(action, true);
        toggleSewerageFeilds(action, false);
      }
    } else {

      togglePropertyFeilds(action, false)
      if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water") && get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
        toggleWaterFeilds(action, true);
        toggleSewerageFeilds(action, true);
      } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
        toggleWaterFeilds(action, false);
        toggleSewerageFeilds(action, true);
      } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water")) {
        toggleWaterFeilds(action, true);
        toggleSewerageFeilds(action, false);
      } else {
        toggleWaterFeilds(action, false);
        toggleSewerageFeilds(action, false);
      }
    }


    // if (isModifyMode()) {
    //   triggerModificationsDisplay(action, true);
    // }
    // else {
    //   triggerModificationsDisplay(action, false);
    // }

    if (propertyId) {
      prepareDocumentsUploadData(state, dispatch);
    }

    set(action, "screenConfig.components.div.children.stepper.props.steps", stepperData());
    set(action, 'screenConfig.components.div.children.headerDiv.children.header.children.headerDiv.children.header.children.key.props.labelKey', getHeaderLabel());
    dispatch(handleField("apply", "components", "div", get(action, "screenConfig.components.div", {})))
    isMode = getQueryArg(window.location.href, "mode");
    isMode = (isMode) ? isMode.toUpperCase() : "";
    let connectionNumber = getQueryArg(window.location.href, "connectionNumber");
    let tenantId = getQueryArg(window.location.href, "tenantId");
    let action1 = getQueryArg(window.location.href, "action");

    let modeaction1 = getQueryArg(window.location.href, "modeaction");

    let mode = getQueryArg(window.location.href, "mode");
    let modifyLink;
    //When application comes for modification comes here
    if (isMode === "MODIFY" || action1 === "edit") {
      modifyLink = `/wns/apply?`;
      modifyLink = applicationNumber ? modifyLink + `applicationNumber=${applicationNumber}` : modifyLink;
      modifyLink = connectionNumber ? modifyLink + `&connectionNumber=${connectionNumber}` : modifyLink;
      modifyLink = action1 ? modifyLink + `&action=${action1}` : modifyLink;
      modifyLink = modeaction1 ? modifyLink + `&modeaction=${modeaction1}` : modifyLink;
      modifyLink = isMode ? modifyLink + `&mode=${isMode}` : modifyLink;
      modifyLink = tenantId ? modifyLink + `&tenantId=${tenantId}` : modifyLink;

    } else {
      modifyLink = "/wns/apply"
    }

    // set(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.wsConnectionTaxHeads.children", taxHeads);
    //set(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.wsConnectionTaxHeads.children.taxheads", taxHeads);
    set(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumberSewerage.props.mode", isModifyMode() && !isModifyModeAction());
    set(action, "screenConfig.components.div.children.headerDiv.children.header.children.applicationNumberWater.props.mode", isModifyMode() && !isModifyModeAction());
    set(action, "screenConfig.components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.clickHereLink.props.url", modifyLink)
    set(action, "screenConfig.components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children.clickHereLink.props.isMode", isMode)


    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: { className: "common-div-css search-preview" },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: { header: { gridDefination: { xs: 12, sm: 10 }, ...header } }
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        footer
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "ViewBreakupContainer",
      props: { open: false, maxWidth: "md", screenKey: "apply" }
    }
  }
};

export default screenConfig;