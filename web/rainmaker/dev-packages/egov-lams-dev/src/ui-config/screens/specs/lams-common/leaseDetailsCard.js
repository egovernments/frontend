import {
    getCommonCard,
    getTextField,
    
    getCommonContainer,
    getPattern,
   
    getCommonTitle,
    getSelectField,
    getCommonParagraph,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabelWithValue
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";


  export const leaseDetailsCard = getCommonGrayCard({
    
    header: getCommonSubHeader(
      {
        labelName: "Lease Details ",
        labelKey: "LAMS_DETAILS_HEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    leaseDetailsContainer: getCommonContainer(
      {
        termNo: getLabelWithValue(
          {
            labelName: "Term Number",
            labelKey: "LAMS_TERMNO"
          },
          {
            jsonPath: "lamsStore.selectedSurveyDetails.termNo",
            //callBack: convertEpochToDate
          }
        ),
        area: getLabelWithValue(
          {
            labelName: "Area ",
            labelKey: "LAMS_AREA"
          },
          {
            jsonPath: "lamsStore.selectedSurveyDetails.area",
            //callBack: convertEpochToDate
          }
        ),
        termExpiryDate:getLabelWithValue(
          {
            labelName: "Term Number",
            labelKey: "LAMS_TERM_EXP_DATE"
          },
          {
            jsonPath: "lamsStore.selectedSurveyDetails.termExpiryDate",
            callBack: convertEpochToDate
          }
        ),
        annualRent:getLabelWithValue(
          {
            labelName: "Annual Rent",
            labelKey: "LAMS_ANN_RENT"
          },
          {
            jsonPath: "lamsStore.selectedSurveyDetails.annualRent",
            //callBack: convertEpochToDate
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    leaseDetailsContainer2: getCommonContainer(
      {
        lesseAsPerGLR: getLabelWithValue(
          {
            labelName: "Lease as per GLR",
            labelKey: "LAMS_AS_PER_GLR"
          },
          {
            jsonPath: "lamsStore.selectedSurveyDetails.lesseAsPerGLR",
            //callBack: convertEpochToDate
          }
        )
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
  });