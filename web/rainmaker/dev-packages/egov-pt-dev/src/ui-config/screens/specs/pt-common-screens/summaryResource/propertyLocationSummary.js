import {
  getBreak, getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { checkValueForNA } from "../../utils";

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

export const propertyLocationSummary = getCommonGrayCard({
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
          labelName: "Mutation Details",
          labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
        })
      },
    }
  },
  propertyLocationHeader: getHeader({
    labelName: "Mutation Details",
    labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
  }),
  break1: getBreak(),
  propertyLocationContainer: getCommonContainer({
    city: getLabelWithValue(
      {
        labelName: "City",
        labelKey: "PT_COMMON_CITY"
      },
      {
        localePrefix: {
          moduleName: "TENANT_TENANTS",
          masterName: "PB"
        },
        jsonPath: "Property.address.city"
      }
    ),
    propertyLocation: getLabelWithValue(
      {
        labelName: "Property Location",
        labelKey: "PT_COMMON_PROPERTY_LOCATION"
      },
      {
        localePrefix: {
          moduleName: "PT_COMMON",
          masterName: "PROPERTY_LOCATION"
        },
        jsonPath: "Property.address.location",
        callBack: checkValueForNA
      }
    ),
    localityOrMohalla: getLabelWithValue(
      {
        labelName: "Locality/Mohalla",
        labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA"
      },
      {
        localePrefix: {
          moduleName: getQueryArg(window.location.href, "tenantId") ? getQueryArg(window.location.href, "tenantId").replace('.', '_').toUpperCase() : "",
          masterName: "REVENUE"
        },
        jsonPath: "Property.address.locality.code"
      }
    ),
    doorNo: getLabelWithValue(
      {
        labelName: "Door No",
        labelKey: "PT_COMMON_DOOR_NO_LABEL"
      },
      {
        jsonPath: "Property.address.doorNo",
        callBack: checkValueForNA
      }
    ),
    buildingOrColonyName: getLabelWithValue(
      {
        labelName: "COlony Name",
        labelKey: "PT_COMMON_BUILDING_COLONY_LABEL"
      },
      {
        jsonPath: "Property.address.buildingName",
        callBack: checkValueForNA
      }
    )
  })
});
