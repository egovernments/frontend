import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getCommonContainer,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import "./index.css";
  import { getPropertyData } from "./functions";
  
  
  
  
  
  
  export const createConnection = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Property Details", label: "Property Details" },
      { style: { marginBottom: 18 } }
    ),
    wnsGenerateBill: getCommonContainer({


propertyId: getTextField({
  label: { labelName: "Property Id", label: "Property Id" },
  placeholder: {
    labelName: "Property Id",
    label: "Property Id"
  },
  gridDefination: {
    xs: 12,
    sm: 4
  },
  required: true,
  visible: true,
  errorMessage: "Invalid property Id",
  sourceJsonPath: "propertyId",
  jsonPath: "NODScreen.propertyId"
}),

searchButton: {
  componentPath: "Button",
  gridDefination: { xs: 12, sm: 4 },
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
    callBack: getPropertyData,
              
  }
},




      }),

    
    
});
  


