import {
  getCommonCard,
  getCommonTitle,
  getSelectField,
  getCommonContainer,
  getLabel,
  getPattern,
  getDateField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getFileUrlFromAPI,
  handleFileUpload,
  getTransformedLocale,
  getFileUrl
} from "egov-ui-framework/ui-utils/commons";
import {generateBillApiCall ,searchBillApiCall, fileUpload} from "./functions";
import UploadFile from "egov-ui-framework/ui-atoms/UploadFile"


import "./index.css";
debugger
export const bulkUpload = getCommonCard({

   wnsGenerateBill: getCommonContainer({
}),
//---------------------------------------------------------------------------------------
//             Reset Button and Submit Button
//-----------------------------------------------------------------------------------------
   button: getCommonContainer({
     buttonContainer: getCommonContainer({
  //-------------date--------------
  fromDate: getDateField({
    label: { labelName: "Billing Period", labelKey: "Billing Period" },
    placeholder: {
      labelName: "Billing Period",
      labelKey: "BPA_FROM_DATE_PLACEHOLDER"
    },
    jsonPath: "searchScreen.fromDate",
    gridDefination: {
      xs: 12,
      sm: 3
    },
    pattern: getPattern("Date"),
    errorMessage: "ERR_INVALID_DATE",
    required: false
  }),
  //------------------end date--------------------
  toDate: getDateField({
    label: { labelName: "Meter Reading Date", labelKey: "Meter Reading Date" },
    placeholder: {
      labelName: "Meter Reading Date",
      labelKey: "BPA_TO_DATE_PLACEHOLDER"
    },
    jsonPath: "bulkupload.toDate",
    gridDefination: {
      xs: 12,
      sm: 3
    },
    pattern: getPattern("Date"),
    errorMessage: "ERR_INVALID_DATE",
    required: false
  }),
  //-------------------date---------------
  
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "bulkUpload",
    props: {
      documents: [
        {
          name: "Identity ",
          required: true,
          jsonPath: "bpa.documents.identityProof",
          selector: {
            inputLabel: "Select Document",
            menuItems: [
              { value: "AADHAAR", label: "Aadhaar Card" },
              { value: "VOTERID", label: "Voter ID Card" },
              { value: "DRIVING", label: "Driving License" }
            ]
          }
        },
        {
          name: "Address Proof ",
          required: true,
          jsonPath: "bpa.documents.addressProof",
          selector: {
            inputLabel: "Select Document",
            menuItems: [
              { value: "ELECTRICITYBILL", label: "Electricity Bill" },
              { value: "DL", label: "Driving License" },
              { value: "VOTERID", label: "Voter ID Card" }
            ]
          }
        }
      ],
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "BPA_DOC_DET_BTN_UPLOAD_FILE"
      },
      // description: "Only .jpg and .pdf files. 6MB max file size.",
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      maxFileSize: 5000
    },
    type: "array"
  },
 //---------------------------------------------------
  searchButton: {
    componentPath: "Button",
    gridDefination: { xs: 12, sm: 3 },
    jsonPath: "bpa.documents.addressProof",
    required: true,
   
    props: {
      variant: "contained",
      style: {
        color: "white",
        margin: "28px",
        backgroundColor: "#fe7a51",
        borderRadius: "2px",
        width: "220px",
        height: "48px",
        float: "left"
      },
      component:"button"
    },
    children: { buttonLabel: getLabel({ labelKey:  "File Choose" }) },
   
  },
 
  
//---------------------------------------------------------------------------------------
//             Generate Bill  Button
//-----------------------------------------------------------------------------------------
      filechoos: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 3 },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "28px",
            backgroundColor: "#fe7a51",
            borderRadius: "2px",
            width: "220px",
            height: "48px",
            float: "left"
          }
        },
        children: { buttonLabel: getLabel({ labelKey: "Upload" }) },
        onClickDefination: {
       
          action: "condition",
          callBack: fileUpload
        }
      },
    })


  }),
  
  
});



