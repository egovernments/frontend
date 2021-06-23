import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { hideSpinner, showSpinner, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { PAYMENTSEARCH } from "egov-ui-kit/utils/endPoints";
import { set } from "lodash";
import get from "lodash/get";
import { ifUserRoleExists, validateFields } from "../../utils";


export const getRedirectionURL = () => {
  const redirectionURL = ifUserRoleExists("EMPLOYEE") ? "/uc/pay" : "/inbox";
  return redirectionURL;
};

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const cancelBillFooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "PREVIOUS STEP",
        labelKey: "BC_PREV_STEP_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        // processDemand(state, dispatch);
        dispatch(setRoute(`/bills/viewBill?connectionNumber=${getQueryArg(window.location.href, "consumerNumber")}&tenantId=${getQueryArg(window.location.href, "tenantId")}&edit=true&service=${getQueryArg(window.location.href, "service")}`));
      }
    },
    visible: true
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "CANCEL BILL",
        labelKey: "BC_BILL_CANCEL_BUTTON"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        // processDemand(state, dispatch);

        cancelReceipt(state, dispatch);
        // dispatch(setRoute(`/receipts/acknowledgement?purpose=apply&status=success`));
      }
    }
  }
});
export const viewBillFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "NEXT STEP",
        labelKey: "BC_NEXT_STEP_BUTTON"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        // processDemand(state, dispatch);
        dispatch(setRoute(`/bills/cancelBill?consumerNumber=${getQueryArg(window.location.href, "connectionNumber")}&tenantId=${getQueryArg(window.location.href, "tenantId")}&service=${getQueryArg(window.location.href, "service")}`));

      }
    }
  }
});


const cancelReceipt = async (state, dispatch) => {
  const isFormValid = validateFields(
    "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "cancelReceipt"
  );

  let paymentWorkflows = get(state.screenConfiguration.preparedFinalObject, 'paymentWorkflows', []);

  if (isFormValid && paymentWorkflows && Array.isArray(paymentWorkflows) && paymentWorkflows.length > 0) {
    try {
      dispatch(showSpinner());
      set(paymentWorkflows[0], 'action', 'CANCEL');
      set(paymentWorkflows[0], 'tenantId', getQueryArg(window.location.href, "tenantId"));
      set(paymentWorkflows[0], 'paymentId', get(state.screenConfiguration.preparedFinalObject, 'PaymentReceipt.id', ''));
      let payload = await httpRequest(
        "post",
        `${PAYMENTSEARCH.GET.URL}${getQueryArg(window.location.href, "businessService")}/_workflow`,
        "_search",
        [],
        { paymentWorkflows: paymentWorkflows }
      );
      if (payload) {
        dispatch(hideSpinner());
        //  getCommonPayUrl(dispatch, applicationNumber, tenantId, businessService);
        dispatch(setRoute(`/receipts/acknowledgement?purpose=apply&receiptNumbers=${getQueryArg(window.location.href, "receiptNumbers")}&status=success`));
      }
    } catch (error) {
      dispatch(hideSpinner());
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please fill the required fields.",
            labelKey: error.message
          },
          "error"
        )
      );
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill the required fields.",
          labelKey: "CR_REQUIRED_FIELDS_ERROR_MSG"
        },
        "info"
      )
    );
  }
}
