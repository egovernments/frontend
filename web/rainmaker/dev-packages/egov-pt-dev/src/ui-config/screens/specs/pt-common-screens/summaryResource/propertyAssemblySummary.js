import {
  getBreak, getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

export const propertyAssemblySummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Property Assembly Details",
          labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
        })
      },
    }
  },
  propertyAssemblyHeader: getHeader({
    labelName: "Property Assembly Details",
    labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
  }),
  break1: getBreak(),
  propertyAssemblyContainer: getCommonContainer({
    propertyType: getLabelWithValue(
      {
        labelName: "Property Type",
        labelKey: "PT_COMMON_PROPERTY_TYPE"
      },
      {
        localePrefix: {
          moduleName: "COMMON",
          masterName: "PROPTYPE"
        },
        jsonPath: "Property.propertyType",
      }
    ),
    totalLandArea: getLabelWithValue(
      {
        labelName: "Total Land Area",
        labelKey: "PT_COMMON_TOTAL_LAND_AREA"
      },
      {
        jsonPath: "Property.landArea"
      }
    ),
    totalConstructedArea: getLabelWithValue(
      {
        labelName: "Total Constructed Area",
        labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA"
      },
      {
        jsonPath: "Property.totalConstructedArea"
      }
    ),
    usageType: getLabelWithValue(
      {
        labelName: "Usage Type",
        labelKey: "PT_COMMON_USAGE_TYPE"
      },
      {
        localePrefix: {
          moduleName: "COMMON",
          masterName: "PROPUSGTYPE"
        },
        jsonPath: "Property.usageCategory",
      }
    ),
    subUsageType: getLabelWithValue(
      {
        labelName: "Sub Usage Type",
        labelKey: "PT_COMMON_SUB_USAGE_TYPE"
      },
      {
        localePrefix: {
          moduleName: "COMMON",
          masterName: "PROPSUBUSGTYPE"
        },
        jsonPath: "Property.subUsageCategory",
      }
    )
  })
});
