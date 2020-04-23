import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getSelectField,
  getTextField,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";

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
        "Property.additionalDetails.reasonForTransfer",
      localePrefix: {
        moduleName: "PropertyTax",
        masterName: "ReasonForTransfer"
      },
      sourceJsonPath: "ReasonForTransfer.PropertyTax.ReasonForTransfer",
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
      pattern: getPattern("amount"),
      jsonPath: "Property.additionalDetails.reasonForTransfer"
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
      pattern: getPattern("Amount"),
      jsonPath: "Property.additionalDetails.marketValue"
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
        "Property.additionalDetails.reasonForTransfer",
      localePrefix: {
        moduleName: "PropertyTax",
        masterName: "ReasonForTransfer"
      },
      sourceJsonPath: "ReasonForTransfer.PropertyTax.ReasonForTransfer",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    subUsageTypeType: getSelectField({
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
        "Property.additionalDetails.reasonForTransfer",
      localePrefix: {
        moduleName: "PropertyTax",
        masterName: "ReasonForTransfer"
      },
      sourceJsonPath: "ReasonForTransfer.PropertyTax.ReasonForTransfer",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    })
  })
}); 
