import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../viewBillResource/footer";

export const getServiceDetails = (isEditable = true) => {
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
            labelKey: "WS_COMMON_SERV_DETAIL"
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
          labelKey: "WS_SERV_DETAIL_SERV_TYPE"
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
          labelKey: "WS_SERV_DETAIL_CONN_CATEGORY"
        },
        { jsonPath: "Licenses[0].oldLicenseNumber" }
      ),
      reviewLicenceType: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_TYPE"
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
          labelKey: "WS_SERV_DETAIL_METER_ID"
        },
        { jsonPath: "Licenses[0].tradeName" }
      ),
      reviewPipe: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
        },
        {
          jsonPath: "Licenses[0].pipe",
        }
      ),
      reviewCommencementDate: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
        },
        {
          jsonPath: "Licenses[0].commencementDate",
        }
      ),
      reviewGSTNo: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC"
        },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
        }
      ),
      reviewOperationalArea: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
      ),
      reviewNoOfEmployee: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.noOfEmployees" }
      )
    })
  });
};


