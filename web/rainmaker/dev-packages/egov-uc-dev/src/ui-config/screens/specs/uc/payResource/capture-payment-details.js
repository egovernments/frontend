import {
  getCommonGrayCard,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {cash, demandDraft, cheque, card} from "./paymentMethod";
const capturePaymentDetails = getCommonGrayCard({
  header: getCommonSubHeader(
    { labelName: "Capture Payment", labelKey: "NOC_PAYMENT_CAP_PMT" },
    {
      style: {
        marginBottom: "8px"
      }
    }
  ),
  tabSection: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-uc",
    componentPath: "CustomTabContainer",
    props: {
       tabs: [
        {
          tabButton: "COMMON_CASH",
          tabIcon: "Dashboard",
          tabContent: { cash }
        },
        {
          tabButton: "COMMON_CHEQUE",
          tabIcon: "Schedule",
          tabContent: { cheque }
        },
        {
          tabButton: "COMMON_DD",
          tabIcon: "Schedule",
          tabContent: { demandDraft }
        },
        {
          tabButton: "COMMON_CREDIT_DEBIT_CARD",
          tabIcon: "Schedule",
          tabContent: { card }
        }
      ],
      jsonPath : "businessServiceInfo"
    },
    type: "array"
  }
});

export default capturePaymentDetails;
