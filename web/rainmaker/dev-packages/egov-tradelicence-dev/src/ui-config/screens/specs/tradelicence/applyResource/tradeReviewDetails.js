import {
  getCommonCard,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard, getDialogButton } from "../../utils";
import { getReviewTrade,getDeclarationCard } from "./review-trade";
import { getReviewOwner } from "./review-owner";
import { getReviewDocuments } from "./review-documents";

const reviewTradeDetails = getReviewTrade(false);

const reviewOwnerDetails = getReviewOwner(false);

const reviewDocumentDetails = getReviewDocuments();

const declarationDetails = getDeclarationCard();

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please review your Application and Submit",
    labelKey: "TL_SUMMARY_HEADER"
  }),
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails
});

export const declarationCard = getCommonCard({
  declarationDetails
});
