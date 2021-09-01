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
  
  
  export const documentSummary = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Document Summary", label: "Document Summary" },
      { style: { marginBottom: 18 } }
    ),
  
    break: getBreak(),
    wnsGenerateBill: getCommonContainer({

      }),

    
});
  


