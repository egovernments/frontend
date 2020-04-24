import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getSelectField,
  getTextField,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from 'lodash/get';

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
      jsonPath:
        "Property.assemblyDetails.propertyType",
      // localePrefix: {
      //   moduleName: "PropertyTax",
      //   masterName: "PropertyType"
      // },
      sourceJsonPath: "searchScreenMdmsData.PropertyTax.PropertyType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    totalLandArea: getTextField({
      label: {
        labelName: "Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Select Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("Amount"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "Property.assemblyDetails.totalLandArea"
    }),
    totalConstructedArea: getTextField({
      label: {
        labelName: "Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("amount"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "Property.assemblyDetails.totalConstructedArea"
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
      jsonPath:
        "Property.assemblyDetails.usageType",
      // localePrefix: {
      //   moduleName: "PropertyTax",
      //   masterName: "UsageCategory"
      // },
      sourceJsonPath: "searchScreenMdmsData.PropertyTax.UsageType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      beforeFieldChange: async (action, state, dispatch) => {
        console.log("===>action",action)
        if (action.value === "NONRESIDENTIAL.COMMERCIAL") {
          dispatch(
            prepareFinalObject(
              "propsubusagetypeForSelectedusageCategory",
              get(
                state.screenConfiguration.preparedFinalObject,
                "searchScreenMdmsData.PropertyTax.Commercial"
              )
            )
          )
        }else if(action.value === "NONRESIDENTIAL.INDUSTRIAL") {
          dispatch(
            prepareFinalObject(
              "propsubusagetypeForSelectedusageCategory",
              get(
                state.screenConfiguration.preparedFinalObject,
                "searchScreenMdmsData.PropertyTax.Industrial"
              )
            )
          )
        }else if(action.value === "NONRESIDENTIAL.INSTITUTIONAL"){
          dispatch(
            prepareFinalObject(
              "propsubusagetypeForSelectedusageCategory",
              get(
                state.screenConfiguration.preparedFinalObject,
                "searchScreenMdmsData.PropertyTax.Institutional"
              )
            )
          )
        }
      }
    }),
   
    
    subUsageType: getSelectField({
      label: {
        labelName: "Sub Usage Type",
        labelKey: "PT_COMMON_SUB_USAGE_TYPE"
      },
      placeholder: {
        labelName: "Select Sub Usage Type",
        labelKey: "PT_COMMON_SUB_USAGE_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath:
        "Property.assemblyDetails.subUsageType",
      // localePrefix: {
      //   moduleName: "PropertyTax",
      //   masterName: "ReasonForTransfer"
      // },
      sourceJsonPath: "propsubusagetypeForSelectedusageCategory",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    })
  })
}); 
