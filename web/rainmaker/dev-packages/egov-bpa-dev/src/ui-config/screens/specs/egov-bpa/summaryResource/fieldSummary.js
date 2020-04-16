import {
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getBreak,
  getDateField,
  getTimeField,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import { documentDetails } from "../applyResource/documentDetails";
import { changeStep } from "../applyResource/footer";

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
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


export const fieldSummary = getCommonGrayCard({
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
          labelName: "Field Inspection",
          labelKey: "BPA_FIELD_INSPECTION_DETAILS_TITLE"
        })
      },
    }
  },
  fieldInspectionDetailsCard: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        fieldinspectiondate: getDateField({
          label: {
           labelName: "Inspection Date",
          },
            pattern: getPattern("Date"),
            jsonPath: "fieldinspectionreportdata[0].date",
            props: {
              disabled: true,
              /* style: {                
                display: "inline-block",
                width: "50%"               
              } */
            },
          }),
          fieldinspectiontime: getTimeField({
          label: {
            labelName: "Inspection Time",
          },
            jsonPath: "fieldinspectionreportdata[0].time",
            props: {
              disabled: true,
              /* style: {                
                display: "inline-block",
                width: "50%"               
              } */
            }
          }),
        checkListDetailsContainer: getHeader({
          labelName: "Check List",
          labelKey: "BPA_CHECK_LIST_DETAILS"
        }),
        break: getBreak(),
        CheckListQuestions: getCommonGrayCard({
            body: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-bpa",
              componentPath: "FieldInspectionContainer",
              props: {
                className: "noc-review-documents",
                jsonPath: "fieldinspectionreportdata[0].questions",
                 }
            },
        }),
        documentsDetailsContainer: getHeader({
            labelName: "Documents",
            labelKey: "BPA_FIELD_INSPECTION_DOCUMENTS"
              }),
        break: getBreak(), 
        DocumentList: getCommonGrayCard({
            body: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-bpa",
              componentPath: "DownloadFileContainer",
              props: {  
                className: "noc-review-documents",
                jsonPath: "fieldinspectionreportdata[0].docs",
              }
            },
        }),
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      prefixSourceJsonPath:
        "children.cardContent.children",
      afterPrefixJsonPath:  "children.cardContent.children.body",
      sourceJsonPath: "fieldinspectionreportdata",
    },
    type: "array"
  },
});
