import { getCommonCard, getPattern, getCommonSubHeader, getTextField, getSelectField, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from 'lodash/get';
import set from 'lodash/set';
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";



// export const getGenderRadioButton = {
//   uiFramework: "custom-containers",
//   componentPath: "RadioGroupContainer",
//   gridDefination: { xs: 12, sm: 12, md: 6 },
//   jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
//   props: {
//     label: { key: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" },
//     buttons: [
//       { labelKey:"HARVESTING_SCORE_YES", value: "Yes" },
//       { labelKey:"HARVESTING_SCORE_NO", value: "No" },
//     ],
//     jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
//     required: true
//   },
//   type: "array"
// };

export const getCheckboxContainer = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-wns",
  componentPath: "CheckboxContainer",
  gridDefination: { xs: 12, sm: 12, md: 12 },
  props: {
    jsonPathSewerage: "applyScreen.sewerage",
    jsonPathWater: "applyScreen.water",
    required: true
  },
  type: "array",
};



 export const OwnerInfoCard = getCommonCard({

  header: getCommonSubHeader(
    { labelName: "Connection Details", labelKey: "WS_COMMON_CONNECTION_DETAILS" },
    { style: { marginBottom: 18 } }
  ),

  tradeUnitCardContainer: getCommonContainer({
    getCheckboxContainer,

    numberOfTaps: getTextField({
      label: { labelKey: "WS_CONN_DETAIL_NO_OF_TAPS" },
      placeholder: { labelKey: "WS_SERV_DETAIL_NO_OF_TAPS_PLACEHOLDER" },
      gridDefination: { xs: 12, sm: 6 },
      required: true,
      jsonPath: "applyScreen.proposedTaps",
    
     pattern :/^[1-9][0-9]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    }),

    pipeSize: getSelectField({
      label: { labelKey: "WS_CONN_DETAIL_PIPE_SIZE" },
      sourceJsonPath: "applyScreenMdmsData.ws-services-calculation.pipeSize",
      placeholder: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE_PLACEHOLDER" },
      required: true,
      gridDefination: { xs: 12, sm: 6 },
      jsonPath: "applyScreen.proposedPipeSize"
    }),
    // Added usage and sub usage - Ajmer observation
    proposedUsageCategory: getSelectField({
            label: {
              labelName: "Usage Type",
              labelKey: "WS_COMMON_USAGE_TYPE"
            },
           
            required: true,
            jsonPath: "applyScreen.proposedUsageCategory",
            sourceJsonPath: "applyScreenMdmsData.ws-services-masters.waterUsage",     
            placeholder: { labelKey: "WS_COMMON_USAGE_TYPE_PLACEHOLDER" },
            gridDefination: { xs: 12, sm: 6 },
            localePrefix: {
              moduleName: "WS",
              masterName: "WSUSGTYPE"
            },
      //       beforeFieldChange: async (action, state, dispatch) => {
      //            renderProposedSubUsageType(action.value,  dispatch, state)
      //       }
       }),
    // proposedSubUsageCategory:{
    //     uiFramework: "custom-containers-local",
    //     moduleName: "egov-pt",
    //     componentPath: "AutosuggestContainer",
    //     props: {
    //         style: {
    //             width: "100%",
    //             cursor: "pointer"
    //           },
    //         label: {
    //             labelName: "Sub Usage Type",
    //             labelKey: "WS_SUB_USAGE_TYPE"
    //         },
    //         placeholder: {
    //           labelName: "Select Sub usage",
    //           labelKey: "WS_COMMON_SUB_USAGE_TYPE_PLACEHOLDER"
    //       },
      
                      
    //         localePrefix: {
    //             moduleName: "WS",
    //        			 masterName: "WSSUBUSGTYPE"
    //         },
    //         jsonPath: "applyScreen.proposedSubUsageCategory",
    //         sourceJsonPath:"proposedSubUsagetypeForSelectedUsageCategory",
    //         className: "autocomplete-dropdown pds-search",
    //         labelsFromLocalisation: true,
    //         required: false,        
    //         disabled: false,
    //         isClearable: true,      
    //         fullwidth: true,
         
    //     },
    //     required: false,
    //     visible: false,
    //     jsonPath: "applyScreen.proposedSubUsageCategory",
    //     gridDefination: { xs: 12, sm: 6 },
        
    //  },


    //Added usage and sub usage
    numberOfWaterClosets: getTextField({
      label: { labelKey: "WS_CONN_DETAIL_NO_OF_WATER_CLOSETS" },
      placeholder: { labelKey: "WS_CONN_DETAIL_NO_OF_WATER_CLOSETS_PLACEHOLDER" },
      gridDefination: { xs: 12, sm: 6 },
      required: true,
      jsonPath: "applyScreen.proposedWaterClosets",
   
     pattern :/^[1-9][0-9]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    }),

    numberOfToilets: getTextField({
      label: { labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS" },
      placeholder: { labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS_PLACEHOLDER" },
      required: true,
      gridDefination: { xs: 12, sm: 6 },
      jsonPath: "applyScreen.proposedToilets",
     
      pattern :/^[1-9][0-9]*$/i,
      
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    }),

    drainageSize: getSelectField({
      label: { labelKey: "WS_CONN_DETAIL_DRAINAGE_SIZE" },
      sourceJsonPath: "applyScreenMdmsData.sw-services-calculation.drainageSize",
      placeholder: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE_PLACEHOLDER" },
      required: true,
      gridDefination: { xs: 12, sm: 6 },
      jsonPath: "applyScreen.proposedDrainageSize"
    })
  })
},
{
  style: { overflow: "visible" }
});

//Wont show subusage for the time being since while updateing it is not getting populating
// export const renderProposedSubUsageType = (usageType, dispatch, state) => {  
//     let subTypeValues = get(
//       state.screenConfiguration.preparedFinalObject,
//       "applyScreenMdmsData.ws-services-masters.waterSubUsage"
//     );
 
//     const additionalDetailsJson = "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.proposedSubUsageCategory"; 
  
//     let proposedSubUsage;     
            
//           if (usageType == "COMMERCIAL" || usageType == "RESIDENTIAL") {        
//               dispatch(handleField("apply", additionalDetailsJson, "visible", true));
//               dispatch(handleField("apply", additionalDetailsJson, "props.visible", true));
//               proposedSubUsage = subTypeValues.filter(cur => {
//                 return (cur.code.startsWith(usageType))
//             })
          
//           } else {
//               set(state.screenConfiguration.preparedFinalObject,"applyScreen.proposedSubUsageCategory", ""); 
//               set(state.screenConfiguration.preparedFinalObject,"applyScreen.proposedSubUsageCategory", ""); 
//               dispatch(handleField("apply", additionalDetailsJson, "visible", false));
//               dispatch(handleField("apply", additionalDetailsJson, "props.visible", false));        
//           } 
 
  
//           console.info("DC-subusage got=",proposedSubUsage)
//     dispatch(
//       prepareFinalObject(
//         "proposedSubUsagetypeForSelectedUsageCategory",
//         proposedSubUsage
//       )
//     )
  
//   }