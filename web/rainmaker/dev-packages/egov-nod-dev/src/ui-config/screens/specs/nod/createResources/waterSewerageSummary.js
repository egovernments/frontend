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

  
  export const waterSewerageSummary = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Water and Sewerage Details", label: "Water and Sewerage Details" },
      { style: { marginBottom: 18 } }
    ),
    
    break: getBreak(),
    wnsGenerateBill: getCommonContainer({

      }),

    
});
  


