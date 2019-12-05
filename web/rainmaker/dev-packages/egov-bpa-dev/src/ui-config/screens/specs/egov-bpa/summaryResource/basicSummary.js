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

export const basicSummary = getCommonGrayCard({
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
          labelName: "Basic Details",
          labelKey: "Basic Details"
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
            gotoApplyWithStep(state, dispatch, 0);
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
        basicDetailsContainer: getCommonContainer({
          scrutinynumber: getLabelWithValue(
            {
              labelName: "Building plan scrutiny number",
              labelKey: "Building plan scrutiny number"
            },
            {
              jsonPath: "BPAs[0].BPADetails.basicdetails.scrutinynumber",
              callBack: value => {
                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
              }
            }
          ),
          occupancy: getLabelWithValue(
            {
              labelName: "occupancy",
              labelKey: "occupancy"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.basicdetails.occupancy",
              callBack: value => {
                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
              }
            }
          ),
          applicationtype: getLabelWithValue(
            {
              labelName: "Application Type",
              labelKey: "Application Type"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.basicdetails.apptype"
            }
          ),
          servicetype: getLabelWithValue(
            {
              labelName: "Service Type",
              labelKey: "Service Type"
            },
            {
              jsonPath: "BPAs[0].BPADetails.basicdetails.servicetype"
            }
          ),
          applicationdate: getLabelWithValue(
            {
              labelName: "Application Date",
              labelKey: "Application Date"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.basicdetails.appdate"
            }
          ),
          applicationFee: getLabelWithValue(
            {
              labelName: "Application Fee",
              labelKey: "Application Fee"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.basicdetails.appfee"
            }
          ),
          remarks: getLabelWithValue(
            {
              labelName: "Remarks",
              labelKey: "Remarks"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.basicdetails.remarks"
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
      prefixSourceJsonPath:
        "children.cardContent.children.basicDetailsContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});
