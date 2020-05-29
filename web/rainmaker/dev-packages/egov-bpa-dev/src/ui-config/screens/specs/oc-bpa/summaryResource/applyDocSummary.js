import {
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import { changeStep } from "../applyResource/footer";

const getHeader = (label) => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label,
    },
    type: "array",
  };
};

export const applyDocSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" },
    },
    children: {
      header: {
        gridDefination: {
          xs: 8,
        },
        ...getCommonSubHeader({
          labelName: "Document and NOC details",
          labelKey: "BPA_DOCUMENT_AND_NOC_DETAILS_HEADER",
        }),
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px",
          },
        },
        gridDefination: {
          xs: 4,
          align: "right",
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit",
            },
          },
          buttonLabel: getLabel({
            labelName: "Edit",
            labelKey: "NOC_SUMMARY_EDIT",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            changeStep(state, dispatch, "", 3);
          },
        },
      },
    },
  },
  documentDetailsCard: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        body: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-bpa",
          componentPath: "DocumentSummaryContainer",
          props: {
            sourceJsonPath: "documentDetailsPreview",
            className: "noc-review-documents",
          },
        },
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      prefixSourceJsonPath:
        "children.cardContent.children.totalBuildUpAreaDetailsContainer.children",
      afterPrefixJsonPath: "children.value.children.key",
    },
    type: "array",
  },
});
