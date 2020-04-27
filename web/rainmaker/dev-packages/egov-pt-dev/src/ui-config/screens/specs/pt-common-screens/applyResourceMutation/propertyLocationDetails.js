import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getTextField,
  getSelectField
} from "egov-ui-framework/ui-config/screens/specs/utils";


export const propertyLocationDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Mutation Details",
      labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  propertyLocationDetailsContainer: getCommonContainer({
    city: getSelectField({
      label: {
        labelKey: "PT_COMMON_CITY"
      },
      placeholder: {
        labelKey: "PT_COMMON_CITY_PLACEHOLDER"
      },
      labelPrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
      jsonPath: "searchScreen.tenantId",//db sake
      required: true,
      gridDefination: {
        xs: 12,
        sm: 6
      },
    }),
    localityOrMohalla: getSelectField({
      label: {
        labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA"
      },
      placeholder: {
        labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA_PLACEHOLDER"
      },
      labelPrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
      jsonPath: "searchScreen.tenantId",//db sake
      required: true,
      gridDefination: {
        xs: 12,
        sm: 6
      },
    }),
    doorNo: getTextField({
      label: {
        labelKey: "PT_COMMON_DOOR_NO_LABEL"
      },
      placeholder: {
        labelKey: "PT_COMMON_SEARCH_DOOR_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_DOOR_NO",
      jsonPath: "searchScreen.applicationNumber"
    }),
    buildingOrColonyName: getTextField({
      label: {
        labelKey: "PT_COMMON_BUILDING_COLONY_LABEL"
      },
      placeholder: {
        labelKey: "PT_COMMON_SEARCH_BUILDING_COLONY_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_BUILDING_COLONY",
      jsonPath: "searchScreen.applicationNumber"
    })
  })
});
