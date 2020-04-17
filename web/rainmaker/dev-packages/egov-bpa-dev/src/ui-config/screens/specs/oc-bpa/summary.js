import {
    getCommonCard,
    getCommonTitle
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import { scrutinySummary } from './summaryResource/scrutinySummary';
import { documentAndNocSummary } from "./summaryResource/documentAndNocSummary";
import { estimateSummary } from "../egov-bpa/summaryResource/estimateSummary";

export const summaryDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please review your Application and Submit",
    labelKey: "TL_SUMMARY_HEADER"
  }),
  estimateSummary: estimateSummary,
  scrutinySummary: scrutinySummary,
  documentAndNocSummary: documentAndNocSummary
});
  