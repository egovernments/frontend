import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard, getDialogButton } from "../../utils";

import { getReviewTrade } from "./review-trade";
import { getReviewOwner } from "./review-owner";
import { getReviewDocuments } from "./review-documents";

// const estimate = getCommonGrayCard({
//   estimateSection: getFeesEstimateCard({
//     sourceJsonPath: "LicensesTemp[0].estimateCardData"
//   })
// });

const declarationDetails = getCommonContainer({
  checkbox:{
   uiFramework: "custom-atoms-local",
  //  moduleName: "egov-tradeli",
   componentPath: "Checkbox",
   props: {
     content:'EPASS_MUTATION_DECLARATION',
      label: {
        labelName: "Declaration Message",
        labelKey: "EPASS_DECLARATION_MESSAGE"
      },
    //  jsonPath:
    //      "Property.declaration"
   },

   visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
 }
 });


export const declarationSummary = getCommonContainer({
 header: {
   uiFramework: "custom-atoms",
   componentPath: "Container",
   props: {
     style: { margin: "10px" }
   },
   children: {
     body:declarationDetails
   }
 },

});

const reviewTradeDetails = getReviewTrade();

const reviewOwnerDetails = getReviewOwner();

// const reviewDocumentDetails = getReviewDocuments();

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please review your Application and Submit",
    labelKey: "TL_SUMMARY_HEADER"
  }),
  // estimate,
  // viewBreakupButton: getDialogButton(
  //   "VIEW BREAKUP",
  //   "TL_PAYMENT_VIEW_BREAKUP",
  //   "apply"
  // ),
  reviewTradeDetails,
  reviewOwnerDetails
  // ,
  // reviewDocumentDetails
});
