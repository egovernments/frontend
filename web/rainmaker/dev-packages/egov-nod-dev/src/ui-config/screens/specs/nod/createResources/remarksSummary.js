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
 
  
  export const remarksSummary = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Remarks Summary", label: "Remarks Summary" },
      { style: { marginBottom: 18 } }
    ),
  
    break: getBreak(),
    wnsGenerateBill: getCommonContainer({

      }),

    
});
  


