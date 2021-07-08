import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from 'lodash/set';
import { httpRequest } from "../../../../../ui-utils";
import {
  applyForSewerage,
  applyForWater, applyForWaterOrSewerage,
  validateFields,
  findAndReplace,
  isActiveProperty,
  isModifyMode,
  isFreezeMode,
  isModifyModeAction, prepareDocumentsUploadData,
  pushTheDocsUploadedToRedux,
  serviceConst,
  showHideFieldsFirstStep, validateConnHolderDetails, validateFeildsForBothWaterAndSewerage,
  validateFeildsForSewerage, validateFeildsForWater, isEditAction
} from "../../../../../ui-utils/commons";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";
import commonConfig from "config/common.js";

const isMode = isModifyMode();
const isModeAction = isModifyModeAction();
const setReviewPageRoute = (state, dispatch) => {


  let tenantId = getQueryArg(window.location.href, "tenantId");
  const applicationNumber = get(state, "screenConfiguration.preparedFinalObject.applyScreen.applicationNo");
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  let reviewUrl = `${appendUrl}/wns/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenantId}&edited="true"`;
  if (isModifyMode() && isModifyModeAction()) {
    reviewUrl += "&mode=MODIFY"
  }
  if (get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.locality", null) === null) {
    dispatch(prepareFinalObject("WaterConnection[0].additionalDetails.locality", get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].property.address.locality.code")));
  }
  dispatch(setRoute(reviewUrl));
};
const moveToReview = (state, dispatch) => {
  const documentsFormat = Object.values(
    get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux")
  );

  let validateDocumentField = false;    
  for (let i = 0; i < documentsFormat.length; i++) {
    let isDocumentRequired = get(documentsFormat[i], "isDocumentRequired");
    let isDocumentTypeRequired = get(documentsFormat[i], "isDocumentTypeRequired");    
    if (isDocumentRequired) {
      let documents = get(documentsFormat[i], "documents");      
      if(documents != undefined){
          if (documents && documents.length > 0) {           
            if (isDocumentTypeRequired) {             
              let dropdownData = get(documentsFormat[i], "dropdown.value");
              if (dropdownData) {
                // if (get(documentsFormat[i], "dropdown.value") !== null && get(documentsFormat[i]).dropdown !==undefined ){
                validateDocumentField = true;
              } else {
                dispatch(
                  toggleSnackbar(
                    true,
                    { labelName: "Please select type of Document!", labelKey: "" },
                    "warning"
                  )
                );
                validateDocumentField = false;
                break;
              }
            } else {
              validateDocumentField = true;
            }
          } 
          else if (!isModifyMode()) {
           
            dispatch(
              toggleSnackbar(
                true,
                { labelName: "Please upload mandatory documents!", labelKey: "" },
                "warning"
              )
            );
            validateDocumentField = false;
            break;
          } 
          else {
            validateDocumentField = true;
          }
        }
        else{
         
          dispatch(
            toggleSnackbar(
              true,
              { labelName: "Please upload mandatory documents!", labelKey: "" },
              "warning"
            )
          );
          validateDocumentField = false;
          break;
        }
    }
    
    else {
      validateDocumentField = true;
    }
  }

  return validateDocumentField;
};


const getMdmsData = async (state, dispatch) => {
  let tenantId = get(
    state.screenConfiguration.preparedFinalObject,
    "FireNOCs[0].fireNOCDetails.propertyDetails.address.city"
  );
  let mdmsBody = {
    MdmsCriteria: {
       tenantId: commonConfig.tenantId, moduleDetails: [
        { moduleName: "ws-services-masters", masterDetails: [{ name: "Documents" }] },
        { moduleName: "sw-services-calculation", masterDetails: [{ name: "Documents" }] }
      ]
    }
  };
  try {
    let payload = await httpRequest("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);
    dispatch(prepareFinalObject("applyScreenMdmsData.applyScreen.Documents", payload.MdmsRes['ws-services-masters'].Documents));
    prepareDocumentsUploadData(state, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const callBackForNext = async (state, dispatch) => {

  window.scrollTo(0, 0);
  let activeStep = get(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  let isFormValid = true;
  let hasFieldToaster = false;
  /* validations for property details screen */
  if (activeStep === 0) {
    
     validateFields("components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyID.children", state, dispatch)
     validateFields("components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.holderDetails.children", state, dispatch)
     var connectionDetailValidation =  validateFields("components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children", state, dispatch)
     if (getQueryArg(window.location.href, "action") === "edit" && !isModifyMode()) {
        if(connectionDetailValidation){
              let application = findAndReplace(get(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
              const uploadedDocData = application.documents;
              const reviewDocData = uploadedDocData && uploadedDocData.map(item => {
                return {
                  title: `WS_${item.documentType}`,
                  link: item.fileUrl && item.fileUrl.split(",")[0],
                  linkText: "View",
                  name: item.fileName
                };
              });
              dispatch(prepareFinalObject("applyScreen.reviewDocData", reviewDocData));
              let applyScreenObject = findAndReplace(get(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
              let applyScreenObj = findAndReplace(applyScreenObject, 0, null);
              //connectionholdercode
              let connectionHolderObj = get(state.screenConfiguration.preparedFinalObject, "connectionHolders");
              let holderData = connectionHolderObj[0];
              if (holderData !== null && holderData !== undefined) {
                if (holderData.sameAsPropertyAddress === true) {
                  holderData = null
                }
              }
              if (holderData == null) {
                applyScreenObject.connectionHolders = holderData;
              } else {
                let arrayHolderData = [];
                arrayHolderData.push(holderData);
                applyScreenObj.connectionHolders = arrayHolderData;
              }

              if (!isActiveProperty(applyScreenObj.property)) {
                dispatch(toggleSnackbar(true, { labelKey: `ERR_WS_PROP_STATUS_${applyScreenObj.property.status}`, labelName: `Property Status is ${applyScreenObj.property.status}` }, "warning"));
                showHideFieldsFirstStep(dispatch, "", false);
                dispatch(prepareFinalObject("applyScreen", applyScreenObj));
                return false;
              }
            }
          else{
            isFormValid = false;
            dispatch(toggleSnackbar(true, {
                labelKey: "WS_FILL_REQUIRED_FIELDS",
                labelName: "Please fill Required details"
              },
                "warning"
              )
            )
          }


    }
      
    else {
    
      
      const water = get(
        state.screenConfiguration.preparedFinalObject,
        "applyScreen.water"
      );
      const sewerage = get(
        state.screenConfiguration.preparedFinalObject,
        "applyScreen.sewerage"
      );
      const searchPropertyId = get(
        state.screenConfiguration.preparedFinalObject,
        "searchScreen.propertyIds"
      )
      let applyScreenObject = get(state.screenConfiguration.preparedFinalObject, "applyScreen");

      //connectionholdercode

      let connectionHolderObj = get(state.screenConfiguration.preparedFinalObject, "connectionHolders");
      let holderData = connectionHolderObj[0];
      if (holderData !== null && holderData !== undefined) {
        if (holderData.sameAsPropertyAddress === true) {
          holderData = null
        }
      }
      if (holderData == null) {
        applyScreenObject.connectionHolders = holderData;
      } else {
        let arrayHolderData = [];
        arrayHolderData.push(holderData);
        applyScreenObject.connectionHolders = arrayHolderData;
      }
      
      if (searchPropertyId !== undefined && searchPropertyId !== "") {

        if (!isActiveProperty(applyScreenObject.property)) {
          dispatch(toggleSnackbar(true, { labelKey: `ERR_WS_PROP_STATUS_${applyScreenObject.property.status}`, labelName: `Property Status is ${applyScreenObject.property.status}` }, "warning"));
          showHideFieldsFirstStep(dispatch, "", false);
          return false;
        }
        // TODO else part update propertyId.
      
        if (validateConnHolderDetails(applyScreenObject)) {
          isFormValid = true;
          hasFieldToaster = false;
          
          if (applyScreenObject.water || applyScreenObject.sewerage) {
            if (
              applyScreenObject.hasOwnProperty("property") &&
              !_.isUndefined(applyScreenObject["property"]) &&
              !_.isNull(applyScreenObject["property"]) &&
              !_.isEmpty(applyScreenObject["property"])
            ) {
              if (water && sewerage) {
                if (validateFeildsForBothWaterAndSewerage(applyScreenObject)) {
                  isFormValid = true;
                  hasFieldToaster = false;
                } else {
                  isFormValid = false;
                  dispatch(
                    toggleSnackbar(
                      true, {
                      labelKey: "WS_FILL_REQUIRED_FIELDS",
                      labelName: "Please fill Required details"
                    },
                      "warning"
                    )
                  )
                }
              } else if (water) {
                if (validateFeildsForWater(applyScreenObject)) {
                  isFormValid = true;
                  hasFieldToaster = false;
                } else {
                  isFormValid = false;
                  dispatch(
                    toggleSnackbar(
                      true, {
                      labelKey: "WS_FILL_REQUIRED_FIELDS",
                      labelName: "Please fill Required details"
                    },
                      "warning"
                    )
                  )
                }
              } else if (sewerage) {
               
                if (validateFeildsForSewerage(applyScreenObject)) {
                  isFormValid = true;
                  hasFieldToaster = false;
                } else {
                  isFormValid = false;
                  dispatch(
                    toggleSnackbar(
                      true, {
                      labelKey: "WS_FILL_REQUIRED_FIELDS",
                      labelName: "Please fill Required details"
                    },
                      "warning"
                    )
                  )
                }
              }
            } else {
              isFormValid = false;
              dispatch(
                toggleSnackbar(
                  true, {
                  labelKey: "ERR_WS_PROP_NOT_FOUND",
                  labelName: "No Property records found, please search or create a new property"
                },
                  "warning"
                )
              );
            }
            let waterData = get(state, "screenConfiguration.preparedFinalObject.WaterConnection");
            let sewerData = get(state, "screenConfiguration.preparedFinalObject.SewerageConnection")
            let waterChecked = get(state, "screenConfiguration.preparedFinalObject.applyScreen.water");
            let sewerChecked = get(state, "screenConfiguration.preparedFinalObject.applyScreen.sewerage")
            let modifyAppCreated = get(state, "screenConfiguration.preparedFinalObject.modifyAppCreated")
            if (isFormValid) {
              if ((waterData && waterData.length > 0) || (sewerData && sewerData.length > 0)) {
                if (waterChecked && sewerChecked) {
                  dispatch(
                    prepareFinalObject(
                      "applyScreen.service",
                      "Water And Sewerage"
                    )
                  );
                  if (sewerData && sewerData.length > 0 && waterData.length === 0) { await applyForWater(state, dispatch); }
                  else if (waterData && waterData.length > 0 && sewerData.length === 0) { await applyForSewerage(state, dispatch); }
                } else if ((sewerChecked && sewerData.length === 0) || (isModifyMode() && sewerData.length === 1 && !modifyAppCreated)) {
                  dispatch(
                    prepareFinalObject(
                      "applyScreen.service",
                      _.capitalize(serviceConst.SEWERAGE)
                    )
                  );
                 
                  await applyForSewerage(state, dispatch);
                } else if ((waterChecked && waterData.length === 0) || (isModifyMode() && waterData.length === 1 && !modifyAppCreated)) {
                  dispatch(
                    prepareFinalObject(
                      "applyScreen.service",
                      _.capitalize(serviceConst.WATER)
                    )
                  );
                  await applyForWater(state, dispatch);
                }
              } else if (waterChecked && sewerChecked) {
                dispatch(
                  prepareFinalObject(
                    "applyScreen.service",
                    "Water And Sewerage"
                  )
                );
                if (waterData.length === 0 && sewerData.length === 0) { 
                  isFormValid = await applyForWaterOrSewerage(state, dispatch); 
                 
                }
              } else if (waterChecked) {
                dispatch(
                  prepareFinalObject(
                    "applyScreen.service",
                    _.capitalize(serviceConst.WATER)
                  )
                );
                if (waterData.length === 0) { isFormValid = await applyForWaterOrSewerage(state, dispatch);  }
              } else if (sewerChecked) {
                dispatch(prepareFinalObject("applyScreen.service", _.capitalize(serviceConst.SEWERAGE)))
                if (sewerData.length === 0) { isFormValid = await applyForWaterOrSewerage(state, dispatch);  }
              }
            }
          } else {
            isFormValid = false;
            hasFieldToaster = true;
          }
        } else {
          isFormValid = false;
          dispatch(
            toggleSnackbar(
              true, {
              labelKey: "WS_FILL_REQUIRED_HOLDER_FIELDS",
              labelName: "Please fill Required details"
            },
              "warning"
            )
          )
        }
      } else {
        
        isFormValid = false;
        dispatch(
          toggleSnackbar(
            true, {
            labelKey: "WS_FILL_REQUIRED_FIELDS",
            labelName: "Please fill Required details"
          },
            "warning"
          )
        );
      }
    }
    prepareDocumentsUploadData(state, dispatch);
   }

  /* validations for Additional /Docuemnts details screen */
  if (activeStep === 1) {

    console.log("in active step 1 for plumber info");

     if (isModifyMode()) {
      // setting of plumber dtls
     // console.log("setting of plumber dtls");
      var plumberInfo = get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].plumberInfo", null); 
   // console.log("plumber info--"+JSON.stringify(plumberInfo));
    if(plumberInfo && plumberInfo.length>0)
    {
      if(plumberInfo[0].licenseNo || plumberInfo[0].name || plumberInfo[0].mobileNumber)
      {
      //console.log("additionalDetails--"+get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.detailsProvidedBy", null));
      if(get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.detailsProvidedBy", null) === "NA" || get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.detailsProvidedBy", null) === "") 
      {
       dispatch(prepareFinalObject("WaterConnection[0].additionalDetails.detailsProvidedBy", "ULB"));
      // console.log("plumber dtl--"+get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.detailsProvidedBy", null));
      }
      }
      else if(get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.detailsProvidedBy", null) === "ULB")
      dispatch(prepareFinalObject("WaterConnection[0].additionalDetails.detailsProvidedBy", "NA"));
    }
      // isFormValid = true;
      // hasFieldToaster = false;
      let modificationContainerValid = true;
      let applicationStatus = get(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationStatus");
      if(applicationStatus == "PENDING_FOR_CONNECTION_ACTIVATION"){
      
        modificationContainerValid = validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.modificationsEffectiveFrom.children.cardContent.children.modificationEffectiveDate.children",state,dispatch);
      
      }
      let addConnDetailValid =validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children", state, dispatch);
     
      isFormValid = (addConnDetailValid &&modificationContainerValid)? true:false;
      hasFieldToaster = true;

    } else {
      
      if (moveToReview(state, dispatch)) {
        await pushTheDocsUploadedToRedux(state, dispatch);
        isFormValid = true; 
        hasFieldToaster = false;
        if (process.env.REACT_APP_NAME === "Citizen"){
          // let tenantId = get(state.screenConfiguration.preparedFinalObject, "applyScreen.property.tenantId");  
          // const mohallaLocalePrefix = {      
          //   moduleName: tenantId.replace('.', '_').toUpperCase(),
          //   masterName: "REVENUE"
          // };
          // console.log("MOHALLA_PREFIX",mohallaLocalePrefix);
          // dispatch(
          //   handleField(
          //     "apply",
          //     "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewTwo.props.items[0].item0.children.cardContent.children.propertyLocationDetailsContainer.children.reviewLocalityOrMohalla.children.value1.children.key",
          //     "props.localePrefix",
          //     mohallaLocalePrefix
          //   )
          // );
          if(getQueryArg(window.location.href, "action") === "edit"){
            setReviewPageRoute(state, dispatch);
          }
        }
      }
      else {
        isFormValid = false;
        hasFieldToaster = true;
      }
    }
  }
  /* validations for Additional /Docuemnts details screen */
  if (activeStep === 2 && process.env.REACT_APP_NAME !== "Citizen") {
    var plumberInfo = get(state.screenConfiguration.preparedFinalObject, "applyScreen.plumberInfo", null); 
    //console.log("plumber info--"+JSON.stringify(plumberInfo));
    if(plumberInfo && plumberInfo.length>0)
    {
      if(plumberInfo[0].licenseNo || plumberInfo[0].name || plumberInfo[0].mobileNumber)
      {
      //console.log("additionalDetails--"+get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.detailsProvidedBy", null));
      if(get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.detailsProvidedBy", null) === null || get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.detailsProvidedBy", null) === "NA" || get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.detailsProvidedBy", null) === "") 
      {
       dispatch(prepareFinalObject("applyScreen.additionalDetails.detailsProvidedBy", "ULB"));
       //console.log("plumber dtl--"+get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.detailsProvidedBy", null));
      }
      }
      else if(get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.detailsProvidedBy", null) === "ULB")
      dispatch(prepareFinalObject("applyScreen.additionalDetails.detailsProvidedBy", "NA"));
    }
    
    let plumberValid =validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children", state, dispatch);
    //let activateDetailValid =validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children", state, dispatch);
    // let addConnDetailValid = true;
    // if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water")){ // Validate this only for water.
    //   // addConnDetailValid =validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children", state, dispatch);
    //      addConnDetailValid = validateWaterConnectionDetails(state);
    // }
    // else{
    //     addConnDetailValid = validateSewerageConnectionDetails(state);
    // }
    
    let wsConnectionTaxHeadsValid = validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.wsConnectionTaxHeads.children",state,dispatch);
    let wsTaxheadsFilledOrNotFlag =  true;
    let addConnDetailValid = true;
    let applicationStatus = get(state.screenConfiguration.preparedFinalObject, "applyScreen.applicationStatus");
     //Tax estimate must be filled by Field inspector
    if(applicationStatus == "PENDING_FOR_FIELD_INSPECTION"){
      wsTaxheadsFilledOrNotFlag = checkTaxHeadsFilledOrNot(state);
      if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water")){ // Validate this only for water.
        // addConnDetailValid =validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children", state, dispatch);
           addConnDetailValid = validateWaterConnectionDetails(state);
      }
      else{
       
          addConnDetailValid = validateSewerageConnectionDetails(state);
         
      }

    }
        
 //   console.info("DC-connection valid?",addConnDetailValid)
    //Check one full row is filled/not
    let roadCuttingDataRowValidation =  checkRoadCuttingRowFilledOrNot(state,dispatch,isFormValid);
    let roadCuttingDataValiation = true;      
    if(roadCuttingDataRowValidation){ //Full row is filled so check the data is valid or not
      var objectJsonPath = "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children";
      const fields = get(state.screenConfiguration.screenConfig["apply"],objectJsonPath,{});
     //Check data entered in road cutting are valid/not
      for (var eachItem in fields) { 
        if(eachItem.includes('_')){
          let eachRoadCuttingValidation = validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.wsConnectionTaxHeadsContainer.children.cardContent.children.roadCuttingChargeContainer.children."+eachItem+".children",state, dispatch);
          if(!eachRoadCuttingValidation){
            roadCuttingDataValiation = false;
            break;
          }
        }          
      }     
    }
    let activationDetailsFilledFlag = true;
    let activationDetailsConnectionTypeFlag = true;//checks for the date of activation filled or not
   
    if(applicationStatus == "PENDING_FOR_CONNECTION_ACTIVATION"){
      activationDetailsFilledFlag  = validateFields("components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children",state,dispatch);
      let data = get(state.screenConfiguration.preparedFinalObject, "applyScreen")
      if (data.connectionType === "Metered") {
        activationDetailsConnectionTypeFlag = connectionTypeValidation(state);
        if(!activationDetailsConnectionTypeFlag){
          let  errorMessage = {
            labelName:"Please fill all fields for meter info",
            labelKey: "ERR_METERDETAILS_TOAST"
          };
          dispatch(toggleSnackbar(true, errorMessage, "warning"));
          return;
        }
      }
          
    }
    

    if(!addConnDetailValid){
      let  errorMessage = {
        labelName:"Please fill connection details",
        labelKey: "ERR_CONNECTIONDETAILS_TOAST"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
      return;
    }

    let errorMessage = {
      labelName: "Please provide valid inputs!",
      labelKey: "WS_FILL_VALID_INPUTS"
    };
    if(!roadCuttingDataRowValidation){
      let  errorMessage = {
        labelName:"Please fill all fields for road cutting charges",
        labelKey: "ERR_ROADCUTTING_TOAST"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
      return;
    }
    else if(!wsTaxheadsFilledOrNotFlag){
      let  errorMessage = {
        labelName:"Please fill Tax head estimate",
        labelKey: "ERR_WSTAXHEAD_EST"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
      return;
    }

    
    else if(!plumberValid|| !wsConnectionTaxHeadsValid || !roadCuttingDataValiation || !wsTaxheadsFilledOrNotFlag || !activationDetailsFilledFlag){
       dispatch(toggleSnackbar(true, errorMessage, "warning"));
      return;
    }
    // let roadCuttingValidation =  checkRoadCuttingRowFilledOrNot(state,dispatch,isFormValid);
   
    
    // isFormValid = roadCuttingValidation;
    hasFieldToaster = !isFormValid;
    if(isFormValid){
      if (isModifyMode()) {
               
          if (moveToReview(state, dispatch)) {
            await pushTheDocsUploadedToRedux(state, dispatch);
            if (getQueryArg(window.location.href, "action") === "edit" && (!isModifyMode() || (isModifyMode() && isModifyModeAction()))) {
              setReviewPageRoute(state, dispatch);
            } 
             isFormValid = true; 
             hasFieldToaster = false;
                // if (process.env.REACT_APP_NAME === "Citizen" && getQueryArg(window.location.href, "action") === "edit") {
                //   setReviewPageRoute(state, dispatch);
                // }
          }
           else {
             isFormValid = false;
            hasFieldToaster = true;
          }
        
      
      } 
      else {
           
          if (getQueryArg(window.location.href, "action") === "edit" && (!isModifyMode() || (isModifyMode() && isModifyModeAction()))) {
            setReviewPageRoute(state, dispatch);
          }
        //isFormValid = true;
       }
  
    }

  


    let applyScreenObject = findAndReplace(get(state.screenConfiguration.preparedFinalObject, "applyScreen", {}), "NA", null);
    let applyScreenObj = findAndReplace(applyScreenObject, 0, null);
    dispatch(handleField("apply", "components.div.children.formwizardFourthStep.children.snackbarWarningMessage", "props.propertyId", get(applyScreenObj, "property.propertyId", '')));
    if (isActiveProperty(applyScreenObj.property)) {
      dispatch(handleField("apply", "components.div.children.formwizardFourthStep.children.snackbarWarningMessage", "visible", false));
    }


   }  
   if (activeStep === 3) {
      let sewerageForm = get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage");
      let waterForm = get(state.screenConfiguration.preparedFinalObject, "applyScreen.water");      
      if (sewerageForm && waterForm) {
        isFormValid = await acknoledgementForBothWaterAndSewerage(state, activeStep, isFormValid, dispatch);
      } else if (waterForm) {
        isFormValid = await acknoledgementForWater(state, activeStep, isFormValid, dispatch);
      } else {
        isFormValid = await acknoledgementForSewerage(state, activeStep, isFormValid, dispatch);      
      }
        
      // responseStatus === "success" && changeStep(activeStep, state, dispatch);
   }
  if (activeStep !== 3) {
    
    
    if (isFormValid) {
      changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName: "Please fill all mandatory fields!",
        labelKey: "WS_FILL_REQUIRED_FIELDS"
      };
      if(!isModifyMode()){
        
        switch (activeStep) {
          case 1:
            errorMessage = {
              labelName:
                "Please upload all Mandatory Document!",
                labelKey: "WS_UPLOAD_MANDATORY_DOCUMENTS"
              // labelKey:"WS_FILL_REQUIRED_FIELDS"
            };
            break;
          case 2:
          
            errorMessage = {
              labelName:"Please fill valid road cutting",
              labelKey: "ERR_ROADCUTTING_TOAST"
            };
            break;
        }
      }
      else{
      
         switch (activeStep) {
          case 1:
             errorMessage = {
              labelName: "Please fill all mandatory fields!",
              labelKey: "WS_FILL_REQUIRED_FIELDS"
            };
            break;
          case 2:
            
            errorMessage = {
              labelName:"Please upload all Mandatory Document!",
              labelKey: "WS_UPLOAD_MANDATORY_DOCUMENTS"
            };
            
            break;
          
        }
      }
     
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
 };

 const checkTaxHeadsFilledOrNot =(state) =>{
  let taxEstimateFilled = get(state.screenConfiguration.preparedFinalObject, "applyScreen.wsTaxHeads");
  for(var i=0;i<taxEstimateFilled.length;i++){
     var amt = parseFloat(taxEstimateFilled[i].amount);
    if(isNaN(amt) == false){
       return true;
    }  
  }
   return false;
 }

 const connectionTypeValidation = (state) =>{
   let meterId = get(state.screenConfiguration.preparedFinalObject, "applyScreen.meterId");
   let meterInstallationDate =get(state.screenConfiguration.preparedFinalObject, "applyScreen.meterInstallationDate");
   let initialMeterReading =get(state.screenConfiguration.preparedFinalObject, "applyScreen.additionalDetails.initialMeterReading");
   
   if( initialMeterReading !== null && meterInstallationDate !==null && meterId !== null)
      return true;
   else
       return false;

 }

 const validateSewerageConnectionDetails =(state) =>{

  let noOfCloset = get(state.screenConfiguration.preparedFinalObject, "applyScreen.noOfWaterClosets");
  let noOfToilets = get(state.screenConfiguration.preparedFinalObject, "applyScreen.noOfToilets");
  let drainangePipeSize = get(state.screenConfiguration.preparedFinalObject, "applyScreen.drainageSize");
 
   if(noOfCloset !== "" && noOfToilets !== "" && drainangePipeSize !==null){
     return true;
   }
   else
    return false;
 }
 const validateWaterConnectionDetails =(state)=>{
  // console.info("DC-validate connection details")
 
  let connectionType = get(state.screenConfiguration.preparedFinalObject, "applyScreen.connectionType");
  let  noOfTaps =get(state.screenConfiguration.preparedFinalObject, "applyScreen.noOfTaps");
  let pipeSize = get(state.screenConfiguration.preparedFinalObject, "applyScreen.pipeSize");
  let usageType =  get(state.screenConfiguration.preparedFinalObject, "applyScreen.usageCategory");
 // let authorizedConnection = get(state.screenConfiguration.preparedFinalObject, "applyScreen.authorizedConnection");
 // let motorInfo = get(state.screenConfiguration.preparedFinalObject, "applyScreen.motorInfo");
  let waterSource = get(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSourceType");
  let waterSubSource = get(state.screenConfiguration.preparedFinalObject, "DynamicMdms.ws-services-masters.waterSource.selectedValues[0].waterSubSource");
  let waterSubSourceTransformed = get(state.screenConfiguration.preparedFinalObject,"DynamicMdms.ws-services-masters.waterSource.waterSubSourceTransformed.allDropdown[0]")
  
  //console.info("DC- waterSubSource",waterSubSource)
  //console.info("DC- waterSubSourceTransformed",waterSubSourceTransformed)

  let waterSubSourceValid = false;
  if(waterSource !=null){
    if(waterSubSourceTransformed != undefined ){
      if(waterSubSourceTransformed[0].code != undefined){
        let waterSubSrcCheck = waterSubSourceTransformed.filter(item => item.code === waterSubSource);
        if(waterSubSrcCheck && waterSubSrcCheck.length)
           waterSubSourceValid = true
        else
          waterSubSourceValid = false
      }
      else{
        waterSubSourceValid = true;
      }
      
   }
  
  }
  
  
  //console.info("DC sub src..",waterSubSourceValid)
  if(connectionType !==null && noOfTaps !==null && pipeSize!==null && usageType !=null && waterSource!==null && waterSubSourceValid == true )
     return true;
  else
    return false;
 
  // if(connectionType !==null && noOfTaps !==null && pipeSize!==null &&  waterSource!==null && waterSubSource !=="null.null" && usageType !=null)
  //    return true;
  // else
  //   return false;
 

 }

 const checkRoadCuttingRowFilledOrNot = (state) =>{
   let roadTypeEstimate = get(state.screenConfiguration.preparedFinalObject, "applyScreen.roadTypeEst");
   const roadEstimateValidation = [];
   roadTypeEstimate.forEach(element => {
    var arr =[parseFloat(element.length,10),parseFloat(element.breadth,10),parseFloat(element.depth,10),parseFloat(element.rate,10)];
    const NanResult = arr.filter(each => isNaN(each));
    
    if(NanResult.length < 4 && NanResult.length >0){
        roadEstimateValidation.push(element);
       }
    });
    if(roadEstimateValidation.length>=1) {
       return false;
    }
    else {
      return true;
    }
 
  }




 const moveToSuccess = (combinedArray, dispatch) => {
  const tenantId = get(combinedArray[0].property, "tenantId") || getQueryArg(window.location.href, "tenantId");
  const purpose = "apply";
  const status = "success";
  const applicationNoWater = get(combinedArray[0], "applicationNo");
  const applicationNoSewerage = get(combinedArray[1], "applicationNo");
  let mode = (isModifyMode()) ? "&mode=MODIFY" : (isFreezeMode()) ? "&mode=FREEZE" : ""
  if (applicationNoWater && applicationNoSewerage) {
    dispatch(
      setRoute(
        `/wns/acknowledgement?purpose=${purpose}&status=${status}&applicationNumberWater=${applicationNoWater}&applicationNumberSewerage=${applicationNoSewerage}&tenantId=${tenantId}${mode}`
      )
    );
  } else if (applicationNoWater) {
    dispatch(
      setRoute(
        `/wns/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNoWater}&tenantId=${tenantId}${mode}`
      )
    );
  } else {
    dispatch(
      setRoute(
        `/wns/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNoSewerage}&tenantId=${tenantId}${mode}`
      )
    );
  }
};

const acknoledgementForBothWaterAndSewerage = async (state, activeStep, isFormValid, dispatch) => {
  if (isFormValid) {
    if (activeStep === 0) {
      prepareDocumentsUploadData(state, dispatch);
    }
    if (activeStep === 3) {
      isFormValid = await applyForWaterOrSewerage(state, dispatch);
     
      let WaterConnection = get(state.screenConfiguration.preparedFinalObject, "WaterConnection");
      let SewerageConnection = get(state.screenConfiguration.preparedFinalObject, "SewerageConnection");
      let combinedArray = WaterConnection.concat(SewerageConnection)
      if (isFormValid) { moveToSuccess(combinedArray, dispatch) }
    }
    return isFormValid;
  } else if (hasFieldToaster) {
    let errorMessage = {
      labelName: "Please fill all mandatory fields and upload the documents!",
      labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
    };
    switch (activeStep) {
      case 0:
        errorMessage = {
          labelName:
            "Please check the Missing/Invalid field for Property Details, then proceed!",
          labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
        };
        break;
      case 1:
        errorMessage = {
          labelName:
            "Please check the Missing/Invalid field for Property Details, then proceed!",
          labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
        };
        break;
      case 2:
        
        errorMessage = {
          labelName:
            "Please fill all mandatory fields for Applicant Details, then proceed!",
          labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
        };
        break;
    }
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }
  return !isFormValid;
}

const acknoledgementForWater = async (state, activeStep, isFormValid, dispatch) => {
  if (isFormValid) {
    if (activeStep === 0) {
      prepareDocumentsUploadData(state, dispatch);
    }
    if (activeStep === 3) {
      isFormValid = await applyForWaterOrSewerage(state, dispatch);
      
      let combinedArray = get(state.screenConfiguration.preparedFinalObject, "WaterConnection");
      if (isFormValid) { moveToSuccess(combinedArray, dispatch) }
    }
    return true;
  } else if (hasFieldToaster) {
    let errorMessage = {
      labelName: "Please fill all mandatory fields and upload the documents!",
      labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
    };
    switch (activeStep) {
      case 1:
        errorMessage = {
          labelName:
            "Please check the Missing/Invalid field for Property Details, then proceed!",
          labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
        };
        break;
      case 2:
        
        errorMessage = {
          labelName:
            "Please fill all mandatory fields for Applicant Details, then proceed!",
         // labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
         labelKey:"ERR_ROADCUTTING_TOAST"
        };
        break;
    }
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }
  return false;
}

const acknoledgementForSewerage = async (state, activeStep, isFormValid, dispatch) => {
 
  if (isFormValid) {
    if (activeStep === 0) {
      prepareDocumentsUploadData(state, dispatch);
    }
    if (activeStep === 3) {

      isFormValid = await applyForWaterOrSewerage(state, dispatch);
     
      let combinedArray = get(state.screenConfiguration.preparedFinalObject, "SewerageConnection");
     
      if (isFormValid) { moveToSuccess(combinedArray, dispatch) }
    }
    return true;
  } else if (hasFieldToaster) {
    let errorMessage = {
      labelName: "Please fill all mandatory fields and upload the documents!",
      labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
    };
    switch (activeStep) {
      case 1:
        errorMessage = {
          labelName:
            "Please check the Missing/Invalid field for Property Details, then proceed!",
          labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
        };
        break;
      case 2:
      
        errorMessage = {
          labelName:
            "Please fill all mandatory fields for Applicant Details, then proceed!",
          labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
        };
        break;
    }
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }
  return false;
}

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
 
  window.scrollTo(0, 0);
  let activeStep = get(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    if (activeStep === 1 && mode === "next") {
      const isDocsUploaded = get(
        state.screenConfiguration.preparedFinalObject,
        "applyScreen.documents",
        null
      );
      if (isDocsUploaded) {
        activeStep = process.env.REACT_APP_NAME === "Citizen" ? 3 : 2;
      } else if (isModifyMode()) {
        activeStep = 2;
      }
    } else if (process.env.REACT_APP_NAME === "Citizen" && activeStep === 3) {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 2;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }
  if (activeStep === 0) {
    let conHolders = get(state, "screenConfiguration.preparedFinalObject.applyScreen.connectionHolders");
    let isCheckedSameAsProperty = (conHolders && conHolders.length > 0 && !conHolders[0].sameAsPropertyAddress) ? false : true;
    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.sameAsOwner.children.sameAsOwnerDetails",
        "props.isChecked",
        isCheckedSameAsProperty
      )
    )
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = isNextButton(activeStep);
  const isPayButtonVisible = activeStep === 3 ? true : false;
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
  if (process.env.REACT_APP_NAME === "Citizen") { renderStepsCitizen(activeStep, dispatch); }
  else { renderSteps(activeStep, dispatch); }
}

export const isNextButton = (activeStep) => {
  if (process.env.REACT_APP_NAME === "Citizen" && activeStep < 2) { return true; }
  else if (process.env.REACT_APP_NAME !== "Citizen" && activeStep < 3) { return true; }
  else return false
}

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      let mStepSecond = (isModifyMode()) ? 'formwizardThirdStep' : 'formwizardSecondStep';
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          `components.div.children.${mStepSecond}`
        ),
        dispatch
      );
      break;
    case 2:
      let mStep = (isModifyMode()) ? 'formwizardSecondStep' : 'formwizardThirdStep';
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          `components.div.children.${mStep}`
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );

  }
};

export const renderStepsCitizen = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      let mStepSecond = (isModifyMode()) ? 'formwizardThirdStep' : 'formwizardSecondStep';
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          `components.div.children.${mStepSecond}`
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  let actionDefination = [];
  if (process.env.REACT_APP_NAME === "Citizen") {
    actionDefination = [
      {
        path: "components.div.children.formwizardFirstStep",
        property: "visible",
        value: true
      },
      {
        path: "components.div.children.formwizardSecondStep",
        property: "visible",
        value: false
      },
      {
        path: "components.div.children.formwizardFourthStep",
        property: "visible",
        value: false
      }
    ];
  } else {
    let mStep1 = "formwizardThirdStep";
    let mStep2 = "formwizardSecondStep";

    if (isModifyMode()) {
      mStep1 = "formwizardSecondStep";
      mStep2 = "formwizardThirdStep";
    }

    actionDefination = [
      {
        path: "components.div.children.formwizardFirstStep",
        property: "visible",
        value: true
      },
      {
        path: `components.div.children.${mStep2}`,
        property: "visible",
        value: false
      },
      {
        path: `components.div.children.${mStep1}`,
        property: "visible",
        value: false
      },
      {
        path: "components.div.children.formwizardFourthStep",
        property: "visible",
        value: false
      }
    ];
  }
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = { ...actionDefination[i], value: false };
    if (path === actionDefination[i].path) {
      actionDefination[i] = { ...actionDefination[i], value: true };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  window.scrollTo(0, 0);
  changeStep(state, dispatch, "previous");
};

export const footer = getCommonApplyFooter("BOTTOM", {
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        // minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "WS_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        // minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "WS_COMMON_BUTTON_NXT_STEP"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        //minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "WS_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
    visible: false
  }
});

export const footerReview = (
  action,
  state,
  dispatch,
  status) => {
  let tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "WSCERTIFICATE" },
    link: () => {
      const { Licenses } = state.screenConfiguration.preparedFinalObject;
      downloadCertificateForm(Licenses);
    },
    leftIcon: "book"
  };
  let tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "WSCERTIFICATE" },
    link: () => {
      const { Licenses } = state.screenConfiguration.preparedFinalObject;
      downloadCertificateForm(Licenses, 'print');
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "WSRECEIPT" },
    link: () => {


      const receiptQueryString = [
        { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
        { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }
      ]
      download(receiptQueryString);
      // generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "WSRECEIPT" },
    link: () => {
      const receiptQueryString = [
        { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "applicationNumber") },
        { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tenantId") }
      ]
      download(receiptQueryString, "print");
      // generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "WSAPPLICATION" },
    link: () => {
      const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
      const documents = LicensesTemp[0].reviewDocData;
      set(Licenses[0], "additionalDetails.documents", documents)
      downloadAcknowledgementForm(Licenses);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "WSAPPLICATION" },
    link: () => {
      const { Licenses, LicensesTemp } = state.screenConfiguration.preparedFinalObject;
      const documents = LicensesTemp[0].reviewDocData;
      set(Licenses[0], "additionalDetails.documents", documents)
      downloadAcknowledgementForm(Licenses, 'print');
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      break;
    case "pending_approval":
      break;
    case "CANCELLED":
      break;
    case "REJECTED":
      break;
    default:
      break;
  }
}