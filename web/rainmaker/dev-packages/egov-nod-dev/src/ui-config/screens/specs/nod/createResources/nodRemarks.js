import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getBreak,
    getLabel,
    getCommonParagraph,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { httpRequest } from "../../../../../ui-utils";
  import "./index.css";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

  
  export const nodRemarks = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Remarks", label: "Remarks" },
      { style: { marginBottom: 18 } }
    ),
    subText: getCommonParagraph({
      labelName:"Remarks",
      label: "Remarks"
    }),
    break: getBreak(),
    wnsGenerateBill: getCommonContainer({
     
      reasontype: getSelectField({

        label: {
          label: "Reason"
        },
        placeholder: {
          labelKey: "Reason"
        },
        data: [
          {
            code: "Sold the Property",
            value:"Sold the Property",
          },
          {
            code: "Apply for New Connection",
            value:"Apply for New Connection",
          }
         
        ],
       
        gridDefination: {xs: 12, sm: 4},
        required: false,
        jsonPath: "NODScreen.reasonType",
        labelsFromLocalisation: true,
        fullwidth: true,
        isClearable: true,
        inputLabelProps: {
        shrink: true
        }
      }),










      }),

    
});
  


