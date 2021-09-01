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
  import "./index.css";
 
  
  export const propertySummary = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Property Summary", label: "Property Summary" },
      { style: { marginBottom: 18 } }
    ),
    
    break: getBreak(),
    wnsGenerateBill: getCommonContainer({

      }),

    
});
  


