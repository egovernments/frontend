import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

export const applicantSummary = getCommonGrayCard({
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
          labelName: "Owner Info",
          labelKey: "Owner Info"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
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
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithStep(state, dispatch, 2);
          }
        }
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          applicantName: getLabelWithValue(
            {
              labelName: "Name",
              labelKey: "NOC_APPLICANT_NAME_LABEL"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.applicantDetails.owners[0].name"
              // callBack: value => {
              //   return value.split(".")[1];
              // }
            }
          ),
          applicantAddress: getLabelWithValue(
            {
              labelName: "Owners Communication Address",
              labelKey: "Owners Communication Address"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.applicantDetails.owners[0].correspondenceAddress"
              // callBack: value => {
              //   return value.split(".")[1];
              // }
            }
          ),
          mobileNo: getLabelWithValue(
            {
              labelName: "Mobile No.",
              labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.applicantDetails.owners[0].mobileNumber"
              // callBack: value => {
              //   return value.split(".")[0];
              // }
            }
          ),
          applicantEmail: getLabelWithValue(
            {
              labelName: "Email",
              labelKey: "NOC_APPLICANT_EMAIL_LABEL"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.applicantDetails.owners[0].emailId"
            }
          ),
          applicantGender: getLabelWithValue(
            {
              labelName: "Gender",
              labelKey: "NOC_GENDER_LABEL"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.applicantDetails.owners[0].gender"
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "BPAs[0].BPADetails.applicantDetails.owners",
      prefixSourceJsonPath:
        "children.cardContent.children.applicantContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});
