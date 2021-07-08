import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { handleNA } from '../../utils';
  import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
  export const propertyLocationDetails = getCommonContainer({
    city: getLabelWithValue(
      {
        labelKey: "WS_PROP_DETAIL_CITY"
      },
      {
        localePrefix: {
          moduleName: "TENANT_TENANTS",
          masterName: "PB"
        },
        jsonPath: "applyScreen.property.address.city",
      }
    ),
    location: getLabelWithValue(
      {
        labelKey: "WS_PROP_DETAIL_LOCATION",
        labelName:"Property Location"
      },
      {
        jsonPath: "applyScreen.property.address.location",
        localePrefix: {
          moduleName: "WS",
          masterName: "PROP_LOCATION"
        }
      }
    ),
    plotOrHouseOrSurveyNo: getLabelWithValue(
      {
        labelKey: "WS_PROP_DETAIL_DHNO",
        labelName:"Door/House No."
      },
      {
        jsonPath: "applyScreen.property.address.doorNo",
        callBack: handleNA
      }
    ),
    buildingOrColonyName: getLabelWithValue(
      {
        labelKey: "WS_PROP_DETAIL_BUILD_NAME_LABEL"
      },
      {
        jsonPath: "applyScreen.property.address.buildingName",
        callBack: handleNA
      }
    ),
    // streetName: getLabelWithValue(
    //   {
    //     labelKey: "WS_PROP_DETAIL_STREET_NAME"
    //   },
    //   {
    //     jsonPath: "applyScreen.property.address.street"
    //   }
    // ),
    locality: getLabelWithValue(
      {
        labelKey: "WS_PROP_DETAIL_LOCALITY_MOHALLA_LABEL",
        labelName:"Locality/Mohalla"
      },
      {
        localePrefix: {
          moduleName: getQueryArg(window.location.href, "tenantId") ? getQueryArg(window.location.href, "tenantId").replace('.', '_').toUpperCase() : getTenantIdCommon(),
          masterName: "REVENUE"
        },
        jsonPath: "applyScreen.property.address.locality.code",
      }
    ),
    // pincode: getLabelWithValue(
    //   {
    //     labelKey: "WS_PROP_DETAIL_PINCODE"
    //   },
    //   { jsonPath: "applyScreen.property.address.pincode" }
    // ),
   })
  
  export const getPropertyDetails = (isEditable = true) => {
    return getCommonContainer({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
          style: { marginBottom: "10px" }
        },
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10
            },
            ...getCommonSubHeader({
              labelKey: "WS_COMMON_PROP_LOC_DETAIL_HEADER",
              labelName:"Property Location Details"
            })
          },
        }
      },
      viewFour: propertyLocationDetails
    });
  };
  
  
  