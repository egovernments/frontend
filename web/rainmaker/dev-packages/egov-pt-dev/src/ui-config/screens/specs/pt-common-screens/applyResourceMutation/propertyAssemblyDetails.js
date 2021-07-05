import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getSelectField,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from 'lodash/get';
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const renderARVData = (usageType, propType, dispatch, state) => {

    console.log("usage type",usageType);
    //let noOfFloors;
    let propertyType = get(
            state.screenConfiguration.preparedFinalObject,
            "Property.propertyType"
          ); 
    console.log("propertyType",propertyType);
    const additionalDetailsJson = "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.arv"; 
    if (propertyType === "VACANT") {
        set(state.screenConfiguration.preparedFinalObject,"Property.arvValue", "");
        dispatch(handleField('register-property', additionalDetailsJson, "props.disabled", true));
       // dispatch(handleField('register-property', additionalDetailsJson, "props.visible", false));
    }else{
        dispatch(handleField('register-property', additionalDetailsJson, "props.disabled", false));
    }
}

export const renderNoOfFloorData = (usageType, propType, dispatch, state) => {

    console.log("usage type",usageType);
    //let noOfFloors;
    let propertyType = get(
            state.screenConfiguration.preparedFinalObject,
            "Property.propertyType"
          ); 
    console.log("propertyType",propertyType);
    const additionalDetailsJson = "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.noOfFloors"; 
    if (propertyType === "VACANT") {
        set(state.screenConfiguration.preparedFinalObject,"Property.noOfFloors", "");
        dispatch(handleField('register-property', additionalDetailsJson, "props.disabled", true));
       //dispatch(handleField('register-property', additionalDetailsJson, "props.visible", false));
    }else{
        dispatch(handleField('register-property', additionalDetailsJson, "props.disabled", false));
    }
}

export const renderAreaData = (usageType, propType, dispatch, state) => {

    console.log("usage type",usageType);
    //let noOfFloors;
    let propertyType = get(
            state.screenConfiguration.preparedFinalObject,
            "Property.propertyType"
          ); 
    console.log("propertyType",propertyType);
    
    const additionalDetailsJson_totalConstructedArea = "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.totalConstructedArea"; 
    if (propertyType === "VACANT") {
        set(state.screenConfiguration.preparedFinalObject,"Property.noOfFloors", "");
        dispatch(handleField('register-property', additionalDetailsJson_totalConstructedArea, "props.disabled", true));
       
       // dispatch(handleField('register-property', additionalDetailsJson, "props.visible", false));
    }else{
        dispatch(handleField('register-property', additionalDetailsJson_totalConstructedArea, "props.disabled", false));
       
    }
}

export const renderNoOfFlatsData = (usageType, propType, dispatch, state) => {

    console.log("usage type",usageType);
    //let noOfFloors;
    let propertyType = get(
            state.screenConfiguration.preparedFinalObject,
            "Property.propertyType"
          ); 
    console.log("propertyType",propertyType);
    const additionalDetailsJson = "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.noOfFlats"; 
    if (propertyType === "VACANT") {
        set(state.screenConfiguration.preparedFinalObject,"Property.noOfFlats", "");
        dispatch(handleField('register-property', additionalDetailsJson, "props.disabled", true));
       // dispatch(handleField('register-property', additionalDetailsJson, "props.visible", false));
    }else{
        dispatch(handleField('register-property', additionalDetailsJson, "props.disabled", false));
    }
}


export const rendersubUsageType = (usageType, propType, dispatch, state) => {
  let subTypeValues = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreenMdmsData.PropertyTax.subUsageType"
  );
  let propertyType = get(
    state.screenConfiguration.preparedFinalObject,
    "Property.propertyType"
  );  
  const additionalDetailsJson = "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.subUsageType"; 

  let subUsage;
    if (propertyType === "BUILTUP.SHAREDPROPERTY" || propertyType === "BUILTUP.INDEPENDENTPROPERTY") {
        if (usageType === "NONRESIDENTIAL.COMMERCIAL" || usageType === "NONRESIDENTIAL.INDUSTRIAL" || usageType === "NONRESIDENTIAL.INSTITUTIONAL"
        || usageType === "NONRESIDENTIAL.OTHERS") {
            dispatch(handleField('register-property', additionalDetailsJson, "visible", true));
            dispatch(handleField('register-property', additionalDetailsJson, "props.visible", true));
            if (usageType === "MIXED") {
                subUsage = subTypeValues;
            } else {
                subUsage = subTypeValues.filter(cur => {
                    return (cur.code.startsWith(usageType))
                })
            }
        } else {
            set(state.screenConfiguration.preparedFinalObject,"Property.subUsageCategory", "");
            dispatch(handleField('register-property', additionalDetailsJson, "visible", false));
            dispatch(handleField('register-property', additionalDetailsJson, "props.visible", false));
        }
    } else {
        set(state.screenConfiguration.preparedFinalObject,"Property.subUsageCategory", "");
        dispatch(handleField('register-property', additionalDetailsJson, "visible", false));
        dispatch(handleField('register-property', additionalDetailsJson, "props.visible", false));
    }

//   if (propertyType === "BUILTUP.SHAREDPROPERTY") {
//     dispatch(handleField('register-property', additionalDetailsJson, "required", true));
//     dispatch(handleField('register-property', additionalDetailsJson, "props.required", true))

//     if (usageType === "MIXED") {
//       subUsage = subTypeValues;
//     } else {
//       subUsage = subTypeValues.filter(cur => {
//         return (cur.code.startsWith(usageType))
//       })
//     }
//   } else {
//     subUsage = [];
//     set(state.screenConfiguration.preparedFinalObject,"Property.subUsageCategory", "");
//     dispatch(handleField('register-property', additionalDetailsJson, "required", false));
//     dispatch(handleField('register-property', additionalDetailsJson, "props.required", false));
//   }
  dispatch(
    prepareFinalObject(
      "propsubusagetypeForSelectedusageCategory",
      subUsage
    )
  )

}

export const propertyAssemblyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Property Assembly Details",
      labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  propertyAssemblyDetailsContainer: getCommonContainer({
    propertyType: getSelectField({
      label: {
        labelName: "Property Type",
        labelKey: "PT_COMMON_PROPERTY_TYPE"
      },
      placeholder: {
        labelName: "Select Property Type",
        labelKey: "PT_COMMON_PROPERTY_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath: "Property.propertyType",
      sourceJsonPath: "searchScreenMdmsData.PropertyTax.PropertyType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      localePrefix: {
        moduleName: "COMMON",
        masterName: "PROPTYPE"
      },
      afterFieldChange: async (action, state, dispatch) => {
        let usageType = get(
          state.screenConfiguration.preparedFinalObject,
          "Property.usageCategory"
        );
        // if (usageType) {
          rendersubUsageType(usageType, action.value, dispatch, state)
          renderNoOfFloorData(usageType, action.value, dispatch, state)
          renderNoOfFlatsData(usageType, action.value, dispatch, state)
          renderAreaData(usageType, action.value, dispatch, state)
          renderARVData(usageType, action.value, dispatch, state)
        // }
      }
    }),
    totalLandArea: getTextField({
      label: {
        labelName: "Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA"
      },
      props: {
      },
      placeholder: {
        labelName: "Select Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA_PLACEHOLDER"
      },
      required: true,
      //pattern: /^[1-9]\d{0,7}(\.\d{1,2})?%?$/,
      pattern: /^[1-9]\d{0,7}?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "Property.landArea"
    }),
    totalConstructedArea: getTextField({
      label: {
        labelName: "Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA"
      },
      props: {
      },
      placeholder: {
        labelName: "Enter Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA_PLACEHOLDER"
      },
      required: true,
      pattern: /^[1-9]\d{0,7}?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "Property.superBuiltUpArea"
    }),
    usageType: getSelectField({
      label: {
        labelName: "Usage Type",
        labelKey: "PT_COMMON_USAGE_TYPE"
      },
      placeholder: {
        labelName: "Select Usage Type",
        labelKey: "PT_COMMON_USAGE_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath: "Property.usageCategory",
      sourceJsonPath: "searchScreenMdmsData.PropertyTax.UsageType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      localePrefix: {
        moduleName: "COMMON",
        masterName: "PROPUSGTYPE"
      },
      beforeFieldChange: async (action, state, dispatch) => {
        let propType = get(
          state.screenConfiguration.preparedFinalObject,
          "Property.propertyType"
        );
        rendersubUsageType(action.value, propType, dispatch, state)
      }
    }),

subUsageType:{
    uiFramework: "custom-containers-local",
    moduleName: "egov-pt",
    componentPath: "AutosuggestContainer",
    props: {
        style: {
            width: "100%",
            cursor: "pointer"
          },
        label: {
            labelName: "Sub Usage Type",
            labelKey: "PT_COMMON_SUB_USAGE_TYPE"
        },
  
        placeholder: {
            labelName: "Select Sub Usage Type",
            labelKey: "PT_COMMON_SUB_USAGE_TYPE_PLACEHOLDER"
        },
     
        localePrefix: {
            moduleName: "COMMON",
       			 masterName: "PROPSUBUSGTYPE"
        },
        jsonPath: "Property.subUsageCategory",
        sourceJsonPath:"propsubusagetypeForSelectedusageCategory",
        className: "autocomplete-dropdown pds-search",
        labelsFromLocalisation: true,
        required: true,        
        disabled: false,
        isClearable: true,      
        fullwidth: true,
     
    },
    required: true,
    visible: false,
    jsonPath: "Property.subUsageCategory",
    gridDefination: {
        xs: 12,
        sm:12,
        md: 6
    },
    
 },
    noOfFloors: getTextField({
          label: {
            labelName: "No of Floors",
            labelKey: "PT_COMMON_NO_OF_FLOORS"
          },
          props: {
          },
          placeholder: {
            labelName: "Enter Number of Floors",
            labelKey: "PT_COMMON_NO_OF_FLOORS_PLACEHOLDER"
          },
          required: false,
          pattern: /^[1-9]\d{0,9}?%?$/,
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "Property.noOfFloors"
        }),
    noOfFlats:getTextField({
              label: {
                labelName: "No of Flats",
                labelKey: "PT_COMMON_NO_OF_FLATS"
              },
              props: {
              },
              placeholder: {
                labelName: "Enter Number of Flats",
                labelKey: "PT_COMMON_NO_OF_FLATS_PLACEHOLDER"
              },
              required: false,
              pattern: /^[1-9]\d{0,9}?%?$/,
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              jsonPath: "Property.noOfFlats"
            }),
        arv:getTextField({
                  label: {
                    labelName: "ARV",
                    labelKey: "PT_COMMON_ARV"
                  },
                  props: {
                  },
                  placeholder: {
                    labelName: "Enter Arv",
                    labelKey: "PT_COMMON_ARV_PLACEHOLDER"
                  },
                  required: false,
                  pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
                  errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
                  jsonPath: "Property.arvValue"
                })
  })
},
{
    style: {
      overflow: "visible"
    }
  }
  );