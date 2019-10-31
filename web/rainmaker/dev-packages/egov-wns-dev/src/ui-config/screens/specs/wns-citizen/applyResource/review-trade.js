import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./footer";

export const getReviewTrade = (isEditable = true) => {
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
            labelName: "Service Details",
            labelKey: "Service Details"
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
    viewOne: getCommonContainer({
      reviewApplicationType: getLabelWithValue(
        {
          labelName: "Service Type",
          labelKey: "Service Type"
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
          labelName: "Connection Category",
          labelKey: "Connection Category"
        },
        { jsonPath: "Licenses[0].oldLicenseNumber" }
      ),
      reviewLicenceType: getLabelWithValue(
        {
          labelName: "Connection Type",
          labelKey: "Connection Type"
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
          labelName: "Meter Id",
          labelKey: "Meter Id"
        },
        { jsonPath: "Licenses[0].tradeName" }
      ),
      reviewPipe: getLabelWithValue(
        {
          labelName: "Pipe Size (in mm)",
          labelKey: "Pipe Size (in mm)"
        },
        {
          jsonPath: "Licenses[0].pipe",
        }
      ),
      reviewCommencementDate: getLabelWithValue(
        {
          labelName: "Connection Execution Date",
          labelKey: "Connection Execution Date"
        },
        {
          jsonPath: "Licenses[0].commencementDate",
        }
      ),
      reviewGSTNo: getLabelWithValue(
        {
          labelName: "Rainwater harvesting Facility",
          labelKey: "Rainwater harvesting Facility"
        },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
        }
      ),
      reviewOperationalArea: getLabelWithValue(
        {
          labelName: "Water Source",
          labelKey: "Water Source"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
      ),
      reviewNoOfEmployee: getLabelWithValue(
        {
          labelName: "Water Sub Source",
          labelKey: "Water Sub Source"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.noOfEmployees" }
      )
    })
  });
};


