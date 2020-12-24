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
    getLabelWithValue,
    getDivider
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";


  export const leaseDetailsCardReview = getCommonGrayCard({
    
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
        surveyNo: getLabelWithValue(
          {
            labelName: "Survey No",
            labelKey: "LAMS_SURVEYNO"
          },
          {
            jsonPath: "lamsStore.Lease[0].leaseDetails.surveyNo",
            //callBack: convertEpochToDate
          }
        ),
        termNo: getLabelWithValue(
          {
            labelName: "Term Number",
            labelKey: "LAMS_TERMNO"
          },
          {
            jsonPath: "lamsStore.Lease[0].leaseDetails.termNo",
            //callBack: convertEpochToDate
          }
        ),
        area: getLabelWithValue(
          {
            labelName: "Area ",
            labelKey: "LAMS_AREA"
          },
          {
            jsonPath: "lamsStore.Lease[0].leaseDetails.area",
            //callBack: convertEpochToDate
          }
        ),
        located:getLabelWithValue(
          {
            labelName: "Located",
            labelKey: "LAMS_LOC"
          },
          {
            jsonPath: "lamsStore.Lease[0].leaseDetails.located",
          }
        ),
        // category:getLabelWithValue(
        //   {
        //     labelName: "Category",
        //     labelKey: "LAMS_CATEGORY"
        //   },
        //   {
        //     jsonPath: "lamsStore.Lease[0].leaseDetails.category",
        //   },
        // ),
        div: getDivider(),
        termExpiryDate:getLabelWithValue(
          {
            labelName: "Term Expiry Date",
            labelKey: "LAMS_TERM_EXP_DATE"
          },
          {
            jsonPath: "lamsStore.Lease[0].leaseDetails.termExpiryDate",
            callBack: convertEpochToDate
          }
        ),
        annualRent:getLabelWithValue(
          {
            labelName: "Annual Rent",
            labelKey: "LAMS_ANN_RENT"
          },
          {
            jsonPath: "lamsStore.Lease[0].leaseDetails.annualRent",
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
            jsonPath: "lamsStore.Lease[0].leaseDetails.lesseAsPerGLR",
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