import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { changeStep } from "../viewBillResource/footer";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { handlePropertySubUsageType, handleNA } from '../../utils';

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
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

const properyDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PROP_DETAIL_HEADER"
});
const propertyLocationDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PROP_LOC_DETAIL_HEADER"
});

const propertyDetails = getCommonContainer({
  propertyId: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_ID_LABEL"
    },
    { jsonPath: "WaterConnection[0].property.propertyId" }
  ),
  propertyType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_TYPE_LABEL"
    },
    {
      jsonPath:
      "WaterConnection[0].property.propertyType",
      localePrefix: {
        moduleName: "WS",
        masterName: "PROPTYPE"
      }
    }
  ),
  propertyUsageType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_USAGE_TYPE_LABEL"
    },
    { jsonPath: "WaterConnection[0].property.usageCategory",
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPUSGTYPE"
    }
   }
  ),
  propertySubUsageType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_SUB_USAGE_TYPE_LABEL",
      labelName: "Property Sub Usage Type"
    },
    {
      jsonPath: "applyScreen.property.units[0].usageCategory",
      callBack: handlePropertySubUsageType,
      localePrefix: {
        moduleName: "WS",
        masterName: "PROPSUBUSGTYPE"
      }
    }
  ),
  plotSize: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_PLOT_SIZE_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.landArea"
    }
  ),
  constructedArea: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_CONSTRUCTION_SIZE_LABEL"
    },
    { 
      jsonPath: "WaterConnection[0].property.superBuiltUpArea"
    }
  ),
  arv: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_ARV_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.units[0].arv",
      callBack: handleNA

    }
  )
})

// const locationOnMap = WaterConnection[0].property.address.locality.code + WaterConnection[0].property.address.locality.code

const propertyLocationDetails = getCommonContainer({

  city: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_CITY"
    },
    {
      localePrefix: {
        moduleName: "TENANT_TENANTS",
        masterName: "PB"
      },
      jsonPath: "WaterConnection[0].property.address.city",
    }
  ),
  location: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_LOCATION",
      labelName:"Property Location"
    },
    {
      jsonPath: "WaterConnection[0].property.address.location",
      localePrefix: {
        moduleName: "WS",
        masterName: "PROP_LOCATION"
      }
    }
  ),
  plotOrHouseOrSurveyNo: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_PH_SURVEYNO_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.address.doorNo",
    }
  ),
  buildingOrColonyName: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_BUILD_NAME_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.address.buildingName"
    }
  ),
  // streetName: getLabelWithValue(
  //   {
  //     labelKey: "WS_PROP_DETAIL_STREET_NAME"
  //   },
  //   {
  //     jsonPath: "WaterConnection[0].property.address.street"
  //   }
  // ),
  locality: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_LOCALITY_LABEL"
    },
    {
      localePrefix: {
        moduleName: getQueryArg(window.location.href, "tenantId") ? getQueryArg(window.location.href, "tenantId").replace('.', '_').toUpperCase() : getTenantIdCommon(),
        masterName: "REVENUE"
      },
      jsonPath: "WaterConnection[0].property.address.locality.code",
    }
  ),
  // pincode: getLabelWithValue(
  //   {
  //     labelKey: "WS_PROP_DETAIL_PINCODE"
  //   },
  //   { jsonPath: "WaterConnection[0].property.address.pincode" }
  // ),
  // locationOnMap: getLabelWithValue(
  //   {
  //     labelKey: "WS_PROP_DETAIL_MAP_LOC"
  //   },
  //   {
  //     jsonPath: "WaterConnection[0].property.address.locality.locationOnMap"
  //   }
  // ),
})

export const getPropertyDetails = (isEditable = true) => {
  return getCommonGrayCard({
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
            labelKey: "WS_COMMON_PROP_DETAIL_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails

    viewOne: properyDetailsHeader,
    viewTwo: propertyDetails,
    viewThree: propertyLocationDetailsHeader,
    viewFour: propertyLocationDetails
  });
};


