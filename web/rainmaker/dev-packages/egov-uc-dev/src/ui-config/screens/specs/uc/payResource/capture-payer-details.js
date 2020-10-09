// import { payeeDetails } from "egov-common/ui-containers-local/CustomTabContainer/payment-methods";
import {
  getCommonGrayCard,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import {
  getCommonContainer,
  getDateField,
  getPattern, getSelectField, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const payeeDetails = getCommonContainer({
  paidBy: getSelectField({
    label: {
      labelName: "Paid By",
      labelKey: "NOC_PAYMENT_PAID_BY_LABEL"
    },
    placeholder: {
      labelName: "Paid By",
      labelKey: "NOC_PAYMENT_PAID_BY_PLACEHOLDER"
    },
    data: [
      {
        code: "COMMON_OWNER"
      },
      {
        code: "COMMON_OTHER"
      }
    ],
    jsonPath: "ReceiptTemp[0].Bill[0].payer",
    required: true,
    beforeFieldChange: (action, state, dispatch) => {
      let tabIndex = 0;
      let tabs = get(state.screenConfiguration.screenConfig, "pay.components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs", []);
      let tabValue = get(tabs[tabIndex], "code", '').toLowerCase();
      let componentPath = process.env.REACT_APP_NAME === "Citizen" ? "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePayerDetails.children.cardContent.children.payerDetailsCardContainer" : `components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[${tabIndex}].tabContent.${tabValue}.children.payeeDetails`;
      if (action.value === "COMMON_OTHER") {
        dispatch(
          handleField(
            "pay",
            `${componentPath}.children.payerName`,
            "props.value",
            ""
          )
        );
        dispatch(
          handleField(
            "pay",
            `${componentPath}.children.payerMobileNo`,
            "props.value",
            ""
          )
        );
        dispatch(
          handleField(
            "pay",
            `${componentPath}.children.payerName`,
            "props.error",
            false
          )
        );
        dispatch(
          handleField(
            "pay",
            `${componentPath}.children.payerMobileNo`,
            "props.error",
            false
          )
        );
      } else {
        dispatch(
          handleField(
            "pay",
            `${componentPath}.children.payerName`,
            "props.value",
            get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].payerName", '')
          )
        );
        dispatch(
          handleField(
            "pay",
            `${componentPath}.children.payerMobileNo`,
            "props.value",
            get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].mobileNumber", '')
          )
        );
      }
    }

  }),
  payerName: getTextField({
    label: {
      labelName: "Payer Name",
      labelKey: "NOC_PAYMENT_PAYER_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Name",
      labelKey: "NOC_PAYMENT_PAYER_NAME_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].paidBy",
    required: true
  }),
  payerMobileNo: getTextField({
    label: {
      labelName: "Payer Mobile No.",
      labelKey: "NOC_PAYMENT_PAYER_MOB_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Mobile No.",
      labelKey: "NOC_PAYMENT_PAYER_MOB_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].payerMobileNumber",
    pattern: getPattern("MobileNo"),
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    iconObj: {
      position: "start",
      label: "+91 |"
    },
    required: true
  })
});


const capturePayerDetails = getCommonGrayCard({
  header: getCommonSubHeader({
    labelName: "Payer Information",
    labelKey: "PAY_PAYER_DETAILS"
  }),
  payerDetailsCardContainer: payeeDetails
});

export default capturePayerDetails;
