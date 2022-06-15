import {
  getCommonCard,
  getCommonTitle,
  getSelectField,
  getCommonContainer,
  getLabel,
  getPattern,
  getDateField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {generateBillApiCall ,searchBillApiCall, fileUpload} from "./functions";
import UploadFile from "egov-ui-framework/ui-atoms/UploadFile"


import "./index.css";

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
  //------------------end date------------
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

 //--------------------
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
  searchButtonOne:{
    ...UploadFile({
      classes:{input:'',button:'primary'},
      handleFileUpload:fileUpload,
      buttonProps:{},
      inputProps:{},
      accept:'jpeg',
      buttonLabel:getLabel({ labelKey: "UploadSingle" }),
      id:'singh'
    }),
    gridDefination: { xs: 12, sm: 3 },
    jsonPath: "bpa.documents.searchButtonOne",
    required: true,
  },
  // searchButtonOne: {
  //   componentPath: "Button",
  //   gridDefination: { xs: 12, sm: 3 },
  //   jsonPath: "bpa.documents.searchButtonOne",
  //   required: true,
  //   },
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
         // callBack: generateBillApiCall
        }
      },
    })


  }),
  
  
});



