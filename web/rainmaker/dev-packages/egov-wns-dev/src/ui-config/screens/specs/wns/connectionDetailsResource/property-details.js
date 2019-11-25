import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "../viewBillResource/footer";

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
  reviewApplicationType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_TYPE_LABEL"
    },
    {
      jsonPath:
        "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType",
      localePrefix: {
        moduleName: "TradeLicense",
        masterName: "ApplicationType"
      }
    }
  ),
  reviewOldLicenseNo: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_USAGE_TYPE_LABEL"
    },
    { jsonPath: "Licenses[0].oldLicenseNumber" }
  ),
  reviewLicenceType: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_PLOT_SIZE_LABEL"
    },
    {
      jsonPath: "Licenses[0].licenseType",
      localePrefix: {
        moduleName: "TRADELICENSE",
        masterName: "LICENSETYPE"
      }
    }
  )
})

const propertyLocationDetails = getCommonContainer({
  reviewApplicationType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_ID_LABEL"
    },
    {
      jsonPath:
        "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType",
      localePrefix: {
        moduleName: "TradeLicense",
        masterName: "ApplicationType"
      }
    }
  ),
  reviewOldLicenseNo: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_CITY"
    },
    { jsonPath: "Licenses[0].oldLicenseNumber" }
  ),
  reviewLicenceType: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_DHNO"
    },
    {
      jsonPath: "Licenses[0].licenseType",
      localePrefix: {
        moduleName: "TRADELICENSE",
        masterName: "LICENSETYPE"
      }
    }
  ),
  reviewTradeName: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_BUILD_COMP_NAME"
    },
    { jsonPath: "Licenses[0].tradeName" }
  ),
  reviewPipe: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_STREET_NAME"
    },
    {
      jsonPath: "Licenses[0].pipe",
    }
  ),
  reviewCommencementDate: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_MOHALLA"
    },
    {
      jsonPath: "Licenses[0].commencementDate",
    }
  ),
  reviewGSTNo: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_PINCODE"
    },
    {
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
    }
  ),
  reviewOperationalArea: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_MAP_LOC"
    },
    { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
  )
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
    viewOne: properyDetailsHeader,
    viewTwo: propertyDetails,
    viewThree: propertyLocationDetailsHeader,
    viewFour: propertyLocationDetails
  });
};


