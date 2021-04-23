


import { getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";

export const WSledgerId = {
    ledgerId: getTextField({
        label: { labelKey: "WS_SERV_DETAIL_LEDGER_ID" },
        placeholder: { labelKey: "WS_SERV_DETAIL_LEDGER_ID_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.additionalDetails.ledgerId",
        // pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
  }),
};

export const WSBillingAmount = {
    billingAmount: getTextField({
        label: { labelKey: "WS_SERV_DETAIL_BILLING_AMOUNT" },
        placeholder: { labelKey: "WS_SERV_DETAIL_BILLING_AMOUNT_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.additionalDetails.billingAmount",
        pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
  }),
};

