import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getPropertyResults, isActiveProperty, showHideFieldsFirstStep, getSearchResults, getSearchResultsForSewerage , getCBMdmsData,prepareDocumentsUploadData } from "../../../../../ui-utils/commons";
import { getUserInfo, getTenantIdCommon, getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { fetchLocalizationLabel , setRoute } from "egov-ui-kit/redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import store from "ui-redux/store";
export const propertySearchApiCall = async (state, dispatch) => {
  showHideFields(dispatch, false);
  let tenantId = getTenantIdCommon();
  let queryObject = process.env.REACT_APP_NAME === "Citizen"?[{ key: "tenantId", value:getQueryArg(window.location.href, "tenantId") ? getQueryArg(window.location.href, "tenantId") : tenantId }]:[{ key: "tenantId", value: tenantId }];
  let searchScreenObject = get(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.applicantSummary.children.cardContent.children.cardOne",
      //"components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.cardContent.children.headerDiv",
      "props.items",
      []
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.institutionSummary.children.cardContent",
      //"components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.cardContent.children.headerDiv",
      "props.items",
      []
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.headerDiv",
      "props.items",
      []
    )
  );
  dispatch(
    prepareFinalObject(
      "applyScreen.property",
      {}
    )
  );  
  if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(toggleSnackbar(true, { labelKey: "WS_FILL_REQUIRED_FIELDS", labelName: "Please fill required details" }, "warning"));
  } else {
    for (var key in searchScreenObject) {
      if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
    try {
      let allowCitizenToSearchOtherProperties = get(
        state
          .screenConfiguration
          .preparedFinalObject
          .applyScreenMdmsData["ws-services-masters"],
        "PropertySearch", []
      )
        .map(a => a.code === "allowCitizenToUseAnyProperty")[0];
      if (
        process.env.REACT_APP_NAME === "Citizen" &&
        !allowCitizenToSearchOtherProperties
      ) {
        queryObject.push({ key: "mobileNumber", value: JSON.parse(getUserInfo()).mobileNumber })
      }
      let response = await getPropertyResults(queryObject, dispatch);
      if (response && response.Properties.length > 0) {        
        let propertyData = response.Properties[0];
        store.dispatch(
          setRoute(`apply?propertyId=${propertyData.propertyId}&tenantId=${propertyData.tenantId}`)
        ) 
        try{
          getCBMdmsData(dispatch,propertyData.tenantId);
          dispatch(fetchLocalizationLabel(getLocale(), propertyData.tenantId, propertyData.tenantId));
          prepareDocumentsUploadData(state,dispatch);
        }catch(err){
          console.log("Document related process", err);
        }
        if(!isActiveProperty(propertyData)){
          dispatch(toggleSnackbar(true, { labelKey: `ERR_WS_PROP_STATUS_${propertyData.status}`, labelName: `Property Status is ${propertyData.status}` }, "warning"));     
          showHideFieldsFirstStep(dispatch,propertyData.propertyId,false); 
          dispatch(prepareFinalObject("applyScreen.property", propertyData))         
        }else{          
          let contractedCorAddress = "";

          if(propertyData.address.doorNo !== null && propertyData.address.doorNo !== ""){
            contractedCorAddress += propertyData.address.doorNo + ", ";
          }
          if(propertyData.address.buildingName !== null && propertyData.address.buildingName !== ""){
            contractedCorAddress += propertyData.address.buildingName + ", ";
          }        
          contractedCorAddress += propertyData.address.locality.name + ", " + propertyData.address.city;

          for(var i=0; i<propertyData.owners.length;i++){ 
            if(propertyData.owners[i].correspondenceAddress == 'NA' || propertyData.owners[i].correspondenceAddress == null || propertyData.owners[i].correspondenceAddress == ""){
              if(propertyData.owners[i].permanentAddress == 'NA' || propertyData.owners[i].permanentAddress == null || propertyData.owners[i].permanentAddress == ""){
                propertyData.owners[i].correspondenceAddress = contractedCorAddress;
              }else{
                propertyData.owners[i].correspondenceAddress = propertyData.owners[i].permanentAddress;
              }
            }    
          }
          if (propertyData && propertyData.owners && propertyData.owners.length > 0) {
            propertyData.owners = propertyData.owners.filter(
              (owner) => owner.status == "ACTIVE"
            );
          }
          dispatch(prepareFinalObject("applyScreen.property", propertyData))
          showHideFields(dispatch, true);
          let tenantIdProp = get(state.screenConfiguration.preparedFinalObject, "applyScreen.property.tenantId");
          if(tenantIdProp){
            const wsTenant = get(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.tenant.citymodule").filter(city=>city.code=='WS')[0].tenants.filter(tenant=>tenant.code==tenantIdProp);
            const swTenant = get(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.tenant.citymodule").filter(city=>city.code=='SW')[0].tenants.filter(tenant=>tenant.code==tenantIdProp);
           
            if(wsTenant.length>0){
              if(swTenant.length==0){
              dispatch(prepareFinalObject("applyScreen.water", true));
            dispatch(prepareFinalObject("applyScreen.sewerage", false));
              }
            dispatch(prepareFinalObject("disableWS", false));
            }
            else{
              dispatch(prepareFinalObject("disableWS", true));
            }
            if(swTenant.length>0){
              if(wsTenant.length==0){
              dispatch(prepareFinalObject("applyScreen.water", false));
              dispatch(prepareFinalObject("applyScreen.sewerage", true));
              }
              dispatch(prepareFinalObject("disableSW", false));
            }
            else{
              dispatch(prepareFinalObject("disableSW", true));
            }
            
    
          }
        }
        if(searchScreenObject["propertyIds"].trim()){
          const mohallaLocalePrefix = {
            moduleName: propertyData.tenantId,
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

        let ownershipCategory = get(state.screenConfiguration.preparedFinalObject, "applyScreen.property.ownershipCategory", "");
        
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
        WaterSewerageOnProperty(propertyData.tenantId, searchScreenObject["propertyIds"].trim(), dispatch)
      } else {
        showHideFields(dispatch, false);
        dispatch(toggleSnackbar(true, { labelKey: "ERR_WS_PROP_NOT_FOUND", labelName: "No Property records found" }, "warning"));
      }
    } catch (err) {
      showHideFields(dispatch, false);
      console.log(err)
    }
  }
}

export const WaterSewerageOnProperty = async (tenantId, PropertyId, dispatch) => {
  //Added by vidya to get water and severage connection for a property   
  let queryObject = [];
  queryObject = [{ key: "searchType", value: "CONNECTION" }];
  queryObject.push({ key: "tenantId", value: tenantId });
  queryObject.push({ key: "propertyId", value: PropertyId });
  try {
    let payloadWater = await getSearchResults(queryObject);
    let wsConns = get(payloadWater, "WaterConnection", []);
    let count = wsConns.length;
    let connStr = [];
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
    // for (let i = 0; i < swConns.length; i++) {
    //   let conn = swConns[i];                    
    //   connStr = connStr.concat(conn.connectionNo);
    //   console.log("Swerge connection No. ", connStr);   
    // }
    dispatch(prepareFinalObject("applyScreen.existingSewerageConnCount", count));
    dispatch(prepareFinalObject("applyScreen.existingSewerageConn", connStr.join(", ")));
  } catch (error) { console.error(error); }///////////
}

const showHideFields = (dispatch, value) => {
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyIDDetails",
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.Details",
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.ownerDetails",
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.connectionHolderDetails",
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.existingConnection",
      "visible",
      value
    )
  );
}