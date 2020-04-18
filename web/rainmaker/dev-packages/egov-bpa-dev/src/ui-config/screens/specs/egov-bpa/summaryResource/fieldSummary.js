import { getCommonGrayCard, getCommonSubHeader, getCommonContainer, getLabelWithValue, getLabel, getBreak, getDateField, getTimeField, getPattern } from "egov-ui-framework/ui-config/screens/specs/utils";
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
      style: {
        marginBottom: "10px"
      }
    },

  },
  fieldInspectionDetailsCard: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        dateandtimeContainer: getCommonContainer({
          header: getLabel(
            "Field Inspection Report ",
            "",
            {
              jsonPath: "fieldinspectionreportdata[0].title",
            style: {
             marginRight:"50px",
             color:"#000",
             fontWeight:"bold",
             fontSize:"18px"
            }
            },
          ),
       
          fieldinspectiondate: getDateField({
            label: {
              labelName: "Inspection Date",
            },
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 3
            },
            props:{
              disabled:true,
            },
            pattern: getPattern("Date"),
            jsonPath: "fieldinspectionreportdata[0].date",
          }),
          fieldinspectiontime: getTimeField({
            label: {
              labelName: "Inspection Time",
            },
            props:{
              disabled:true
            },
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 3
            },
            jsonPath: "fieldinspectionreportdata[0].time",
          }),


          break: getBreak(),
          checkListDetailsContainer: getHeader({
            labelName: "Check List",
             
            
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
               
              },
            },
          }),
          documentsDetailsContainer: getHeader({
            labelName: "Documents",

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
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      prefixSourceJsonPath: "children.cardContent.children.dateandtimeContainer.children",
      afterPrefixJsonPath: "children.cardContent.children.body",
      sourceJsonPath: "fieldinspectionreportdata",
    },
    type: "array"
  },
});
