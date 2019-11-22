import {
    getBreak,
    getCommonCard,
    getCommonParagraph,
    getCommonTitle
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  export const statusOfNocDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Status Of NOC from the following departments",
        labelKey: "Status Of NOC from the following departments"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    break: getBreak(),
    documentList: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-noc",
      componentPath: "NocListContainer",
      props: {
        documents: [
          // {
          //   name: "Identity ",
          //   required: true,
          //   jsonPath: "noc.documents.identityProof",
          //   selector: {
          //     inputLabel: "Select Document",
          //     menuItems: [
          //       { value: "AADHAAR", label: "Aadhaar Card" },
          //       { value: "VOTERID", label: "Voter ID Card" },
          //       { value: "DRIVING", label: "Driving License" }
          //     ]
          //   }
          // },
          // {
          //   name: "Address Proof ",
          //   required: true,
          //   jsonPath: "noc.documents.addressProof",
          //   selector: {
          //     inputLabel: "Select Document",
          //     menuItems: [
          //       { value: "ELECTRICITYBILL", label: "Electricity Bill" },
          //       { value: "DL", label: "Driving License" },
          //       { value: "VOTERID", label: "Voter ID Card" }
          //     ]
          //   }
          // },
          // {
          //   name: "Site Plan ",
          //   jsonPath: "Trade[0].businessProof"
          // },
          // {
          //   name: "Ground Floor Plan ",
          //   jsonPath: "Trade[0].businessProof"
          // },
          // {
          //   name: "Owner's Checklist as per NBC ",
          //   jsonPath: "Trade[0].businessProof"
          // },
          // {
          //   name: "Copy of Provisional fire NoC ",
          //   jsonPath: "Trade[0].businessProof"
          // }
        ],
        buttonLabel: {
          labelName: "UPLOAD FILE",
          labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
        },
        // description: "Only .jpg and .pdf files. 6MB max file size.",
        inputProps: {
          accept: "image/*, .pdf, .png, .jpeg"
        },
        maxFileSize: 6000
      },
      type: "array"
    }
  });
  