import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

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
  labelName: "Propery Details",
  labelKey: "Propery Details"
});
const propertyLocationDetailsHeader = getHeader({
  labelName: "Property Location Details",
  labelKey: "Property Location Details"
});

const propertyDetails = getCommonContainer({
  reviewApplicationType: getLabelWithValue(
    {
      labelName: "Property Type",
      labelKey: "Property Type"
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
      labelName: "Property Usage Type",
      labelKey: "Property Usage Type"
    },
    { jsonPath: "Licenses[0].oldLicenseNumber" }
  ),
  reviewLicenceType: getLabelWithValue(
    {
      labelName: "Plot Size (in sq meters)",
      labelKey: "Plot Size (in sq meters)"
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
      labelName: "Property ID",
      labelKey: "Property ID"
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
      labelName: "City",
      labelKey: "City"
    },
    { jsonPath: "Licenses[0].oldLicenseNumber" }
  ),
  reviewLicenceType: getLabelWithValue(
    {
      labelName: "Door/House NO.",
      labelKey: "Door/House NO."
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
      labelName: "Building/Company Name",
      labelKey: "Building/Company Name"
    },
    { jsonPath: "Licenses[0].tradeName" }
  ),
  reviewPipe: getLabelWithValue(
    {
      labelName: "Street Name",
      labelKey: "Street Name"
    },
    {
      jsonPath: "Licenses[0].pipe",
    }
  ),
  reviewCommencementDate: getLabelWithValue(
    {
      labelName: "Locality/Mohalla",
      labelKey: "Locality/Mohalla"
    },
    {
      jsonPath: "Licenses[0].commencementDate",
    }
  ),
  reviewGSTNo: getLabelWithValue(
    {
      labelName: "Pincode",
      labelKey: "Pincode"
    },
    {
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
    }
  ),
  reviewOperationalArea: getLabelWithValue(
    {
      labelName: "Location on Map",
      labelKey: "Location on Map"
    },
    { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
  )
})

export const getReviewOwner = (isEditable = true) => {
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
            labelName: "Property Details",
            labelKey: "Property Details"
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


