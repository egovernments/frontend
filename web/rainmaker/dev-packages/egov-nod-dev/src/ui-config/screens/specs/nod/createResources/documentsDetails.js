import {
    getCommonCard,
    getCommonTitle,
    getBreak,
    getCommonParagraph,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import "./index.css";
  import { documentList } from "./documentList";

  
  export const documentsDetails = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Required Documents", label: "Required Documents" },
      { style: { marginBottom: 18 } }
    ),
    subText: getCommonParagraph({
      labelName:"Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
      label: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload"
    }),
    documentList
  });
    


