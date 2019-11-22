import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../viewBillResource/footer";

const ownerDetails = getCommonContainer({
  reviewApplicationType: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
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
      labelKey: "WS_OWN_DETAIL_NAME"
    },
    { jsonPath: "Licenses[0].oldLicenseNumber" }
  ),
  reviewLicenceType: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
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
      labelKey: "WS_OWN_DETAIL_GUARDIAN_LABEL"
    },
    { jsonPath: "Licenses[0].tradeName" }
  ),
  reviewPipe: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_GUARDIAN_NAME_LABEL"
    },
    {
      jsonPath: "Licenses[0].pipe",
    }
  ),
  reviewCommencementDate: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_CATEGORY_LABEL"
    },
    {
      jsonPath: "Licenses[0].commencementDate",
    }
  ),
  reviewGSTNo: getLabelWithValue(
    {
      labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
    },
    {
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
    }
  ),
  reviewOperationalArea: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_CROSADD"
    },
    { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
  )
})

export const getOwnerDetails = (isEditable = true) => {
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
            labelKey: "WS_COMMON_OWN_DETAIL"
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


