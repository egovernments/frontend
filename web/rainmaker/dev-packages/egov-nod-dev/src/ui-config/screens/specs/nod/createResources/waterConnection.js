import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { httpRequest } from "../../../../../ui-utils";
  import "./index.css";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getWaterData } from "./functions";
  
  export const waterConnection = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Water Dues(Please fill one of the search criteria)", label: "Water Dues(Please fill one of the search criteria)" },
      { style: { marginBottom: 18 } }
    ),
    wnsGenerateBill: getCommonContainer({


waterId: getTextField({
  label: { labelName: "Water Connection Id", label: "Water Connection Id" },
  placeholder: {
    labelName: "Water Connection Id",
    label: "Water Connection Id"
  },
  gridDefination: {
    xs: 12,
    sm: 3
  },
  required: false,
  visible: true,
  errorMessage: "Invalid Water Connection Number",
  sourceJsonPath: "WaterId",
  jsonPath: "NODScreen.WaterId"
}),
mobileNumber: getTextField({
  label: { labelName: "Mobile", label: "Mobile" },
  placeholder: {
    labelName: "Mobile",
    label: "Mobile"
  },
  gridDefination: {
    xs: 12,
    sm: 3
  },
  required: false,
  visible: true,
  errorMessage: "Invalid Mobile No.",
  sourceJsonPath: "mobileNumber",
  jsonPath: "NODScreen.mobileNumber"
}),

searchButton: {
  componentPath: "Button",
  gridDefination: { xs: 12, sm: 3 },
  props: {
    variant: "contained",
    style: {
      color: "white",
      margin: "28px",
      backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
      borderRadius: "2px",
      width: "220px",
      height: "48px",
      float: "left"
    }
  },
  children: { buttonLabel: getLabel({ label: "Verify" }) },
  onClickDefination: {
 
    action: "condition",
    callBack: getWaterData,
              
  }
},




      }),

    
    
});
  


