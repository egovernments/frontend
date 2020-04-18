import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  getBreak,
  getDateField,
  getTimeField,
  getCommonHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import { getTransformedLocale, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import "./index.css";

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
export const fieldinspectionSummary = getCommonGrayCard({
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
          labelName: "Field Inspection Report",
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
      },
    },
  },
  fieldInspectionDetailsCard: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        fieldDetails: getCommonContainer({
         
          headerContainer:getCommonHeader({
            label:{
              labelName:"Field Inspection - ",
            },
            headerJsonPath:"BPA.additionalDetails.fieldinspection_pending[0]"
          }),
          
          fieldinspectiondate: getDateField({
            label: {
              labelName: "Inspection Date",
            },
            required: true,
            jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].date",
            jsonPathUpdatePrefix:
              "BPA.additionalDetails.fieldinspection_pending",
            gridDefination: {
              xs: 12,
              sm: 3,
              md: 3,
            },
          }),
          fieldinspectiontime: getTimeField({
            label: {
              labelName: "Inspection Time",
            },
            required: true,
            jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].time",
            jsonPathUpdatePrefix:
              "BPA.additionalDetails.fieldinspection_pending",
            gridDefination: {
              xs: 12,
              sm: 3,
              md: 3,
            },
          }),
          break: getBreak(),
          checkListHeader: getHeader({
            labelName: "Check List",
          }),
          break: getBreak(),
          questions: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-bpa",
            componentPath: "CheckListContainer",
            props: {
              documents: [],
              buttonLabel: {
                labelName: "UPLOAD FILE",
                labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE",
              },
              jsonPath:
                "BPA.additionalDetails.fieldinspection_pending[0].questions",
              //sourceJsonPath:"BPA.additionalDetails.fieldinspection_pending[0].questions",
              jsonPathUpdatePrefix:
                "BPA.additionalDetails.fieldinspection_pending",
              inputProps: {
                accept: "image/*, .pdf, .png, .jpeg",
              },
              maxFileSize: 6000,
            },
            type: "array",
          },
          break: getBreak(),
          documentsListHeader: getHeader({
            labelName: "Documents",
          }),
          break: getBreak(),
          documentList: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-bpa",
            componentPath: "NocListContainer",
            props: {
              documents: [],
              buttonLabel: {
                labelName: "UPLOAD FILE",
                labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE",
              },
              jsonPath: "BPA.additionalDetails.fieldinspection_pending[0].docs",
              //sourceJsonPath:"BPA.additionalDetails.fieldinspection_pending[0].docs",
              jsonPathUpdatePrefix:
                "BPA.additionalDetails.fieldinspection_pending",
              inputProps: {
                accept: "image/*, .pdf, .png, .jpeg",
                multiple: false,
              },
              maxFileSize: 6000,
            },
            type: "array",
          },
        }),
      }),
      items: [],
      hasAddItem: true,
      //onFieldChange: addItemToState,
      isReviewPage: false,
      prefixSourceJsonPath:
        "children.cardContent.children.fieldDetails.children",
      //afterPrefixJsonPath: "children.value.children.key",
      //jsonPathUpdatePrefix:"BPA.additionalDetails.fieldinspection_pending",
      sourceJsonPath: "BPA.additionalDetails.fieldinspection_pending",
    },
    type: "array",
  },
});
