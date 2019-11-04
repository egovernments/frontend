import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./footer";

const ownerDetails = getCommonContainer({
  reviewApplicationType: getLabelWithValue(
    {
      labelName: "Mobile No.",
      labelKey: "Mobile No."
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
      labelName: "Name",
      labelKey: "Name"
    },
    { jsonPath: "Licenses[0].oldLicenseNumber" }
  ),
  reviewLicenceType: getLabelWithValue(
    {
      labelName: "Gender",
      labelKey: "Gender"
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
      labelName: "Gaurdian",
      labelKey: "Gaurdian"
    },
    { jsonPath: "Licenses[0].tradeName" }
  ),
  reviewPipe: getLabelWithValue(
    {
      labelName: "Gaurdian Name",
      labelKey: "Gaurdian Name"
    },
    {
      jsonPath: "Licenses[0].pipe",
    }
  ),
  reviewCommencementDate: getLabelWithValue(
    {
      labelName: "Owner Category",
      labelKey: "Owner Category"
    },
    {
      jsonPath: "Licenses[0].commencementDate",
    }
  ),
  reviewGSTNo: getLabelWithValue(
    {
      labelName: "Email",
      labelKey: "Email"
    },
    {
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
    }
  ),
  reviewOperationalArea: getLabelWithValue(
    {
      labelName: "Correspondence Adress",
      labelKey: "Correspondence Adress"
    },
    { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
  )
})

export const getReviewDocuments = (isEditable = true) => {
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
            labelName: "Owner Details",
            labelKey: "Owner Details"
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
              changeStep(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    viewOne: ownerDetails
  });
};


