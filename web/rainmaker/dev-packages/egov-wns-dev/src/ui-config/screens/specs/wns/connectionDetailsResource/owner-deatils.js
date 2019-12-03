import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../viewBillResource/footer";

const ownerDetails = getCommonContainer({
  ownerName: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
    },
    { jsonPath: "WaterConnection[0].property.owners[0].name" }
  ),
  ownerMobileNumber: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
    },
    {
      jsonPath:
        "WaterConnection[0].property.owners[0].mobileNumber"
    }
  ),
  gender: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.owners[0].gender"
    }
  ),
  guardian: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_GUARDIAN_LABEL"
    },
    { jsonPath: "WaterConnection[0].property.owners[0].guardian" }
  ),
  guardianName: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_GUARDIAN_NAME_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.owners[0].fatherOrHusbandName",
    }
  ),
  ownerCategory: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_CATEGORY_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.owners[0].ownerType",
    }
  ),
  email: getLabelWithValue(
    {
      labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].property.owners[0].email"
    }
  ),
  correspondenceAddress: getLabelWithValue(
    {
      labelKey: "WS_OWN_DETAIL_CROSADD"
    },
    { jsonPath: "WaterConnection[0].property.owners[0].correspondenceAddress" }
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


