import {
  getCommonGrayCard,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { cash, demandDraft, cheque, card } from "./payment-methods";

const tabs= [
  {
    code : "CASH",
    tabButton: "COMMON_CASH",    
    tabIcon: "Dashboard",
    tabContent: { cash }
  },
  {
    code : "CHEQUE",
    tabButton: "COMMON_CHEQUE",
    tabIcon: "Schedule",
    tabContent: { cheque }
  },
  {
    code : "DD",
    tabButton: "COMMON_DD",
    tabIcon: "Schedule",
    tabContent: { demandDraft }
  },
  {
    code : "CARD",
    tabButton: "COMMON_CREDIT_DEBIT_CARD",
    tabIcon: "Schedule",
    tabContent: { card }
  }
]

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
    moduleName: "egov-common",
    componentPath: "CustomTabContainer",
    props: {
      tabs,
      jsonPath : "businessServiceInfo"
    },
    type: "array"
  }
});

export default capturePaymentDetails;
