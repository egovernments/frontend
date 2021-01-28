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


  export const userDetailsCard = getCommonGrayCard({
    
    header: getCommonSubHeader(
      {
        labelName: "Applicant Details",
        labelKey: "LAMS_APPLICANT_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    userDetailsContainer: getCommonContainer(
      {
        termNo: getLabelWithValue(
          {
            labelName: "Applicant Name",
            labelKey: "LAMS_APPLICANT_NAME"
          },
          {
            jsonPath: "lamsStore.Lease[0].userDetails[0].name",
            //callBack: convertEpochToDate
          }
        ),
        // aadhaarNo: getLabelWithValue(
        //   {
        //     labelName: "Aadhaar Number ",
        //     labelKey: "LAMS_AADHAAR_NO"
        //   },
        //   {
        //     jsonPath: "lamsStore.Lease[0].userDetails[0].aadhaarNumber",
        //     //callBack: convertEpochToDate
        //   }
        // ),
        // panNo:getLabelWithValue(
        //   {
        //     labelName: "PAN No",
        //     labelKey: "LAMS_PAN_NO"
        //   },
        //   {
        //     jsonPath: "lamsStore.Lease[0].userDetails[0].pan",
        //   }
        // ),
        mobileNo:getLabelWithValue(
          {
            labelName: "Mobile No",
            labelKey: "LAMS_MOBILE_NO"
          },
          {
            jsonPath: "lamsStore.Lease[0].userDetails[0].mobileNumber",
          }
        ),
        email:getLabelWithValue(
          {
            labelName: "E-Mail Id",
            labelKey: "LAMS_EMAIL"
          },
          {
            jsonPath: "lamsStore.Lease[0].userDetails[0].emailId",
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    // leaseDetailsContainer2: getCommonContainer(
    //   {
    //     lesseAsPerGLR: getLabelWithValue(
    //       {
    //         labelName: "Lease as per GLR",
    //         labelKey: "LAMS_AS_PER_GLR"
    //       },
    //       {
    //         jsonPath: "lamsStore.Lease[0].leaseDetails.lesseAsPerGLR",
    //       }
    //     )
    //   },
    //   {
    //     style: {
    //       overflow: "visible"
    //     }
    //   }
    // ),
  });