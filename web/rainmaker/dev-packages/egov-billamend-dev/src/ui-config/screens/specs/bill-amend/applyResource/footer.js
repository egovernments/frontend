import {
  dispatchMultipleFieldChangeAction,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter, prepareDocumentsUploadData, validateFields, onDemandRevisionBasis } from "../utils";

import {
  getQueryArg,
  getFileUrlFromAPI,
  getTransformedLocale,
} from "egov-ui-framework/ui-utils/commons";
import {
  toggleSnackbar,
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import "./index.css";
import store from "../../../../../ui-redux/store";

const callBackForNext = async (state, dispatch) => {
  window.scrollTo(0, 0);
  let activeStep = get( state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  let isFormValid = true;
  let hasFieldToaster = false;

  if (activeStep === 0) {
    const isAddDemandRevisionBasisCard = validateFields(
      "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children",
      state,
      dispatch
    );

    const demandRevisionBasisValue = get( state.screenConfiguration.preparedFinalObject, "Amendment.amendmentReason", "");

      if (!isAddDemandRevisionBasisCard) {
        isFormValid = false;
        hasFieldToaster = true;
      } else {
        if ( demandRevisionBasisValue !== "COURTCASESETTLEMENT" ) {
          const fromDate = get( state.screenConfiguration.preparedFinalObject, "Amendment.fromDate");
          const toDate = get( state.screenConfiguration.preparedFinalObject, "Amendment.toDate");
          if (new Date(fromDate) > new Date(toDate)) {
            isFormValid = false;
            let errorMessage = {
              labelName: "From Date should be less than To Date",
              labelKey: "ERR_FROM_TO_DATE_TOAST",
            };
            dispatch(toggleSnackbar(true, errorMessage, "warning"));
          } else {
            await prepareDocumentsUploadData(state, dispatch);
          }
        } else {
          await prepareDocumentsUploadData(state, dispatch);
        }
      }

    // await prepareDocumentsUploadData(state, dispatch);
    // const amount = get(
    //   state.screenConfiguration.preparedFinalObject,
    //   "BILL.AMOUNT",
    //   ""
    // );
    // console.log("amount inside footer",amount)
    // const amountType = get(
    //   state.screenConfiguration.preparedFinalObject,
    //   "BILL.AMOUNTTYPE",
    //   ""
    // );
    // const amountValues = Object.keys(amount).map(
    //   (key) => amount[key][amountType]
    // );
    // if (amountValues.every(item=>item === 0)) {
    //   isFormValid = false;
    //   let errorMessage = {
    //     labelName: "All Tax Heads Amount cant't be 0",
    //     labelKey: "ERR_NON_ZERO_AMOUNT_TOAST",
    //   };
    //   dispatch(toggleSnackbar(true, errorMessage, "warning"));
    // } else {
    //   const amountPattern = /^\d+(\.\d{1,2})?$/;
    //   let error = false;
    //   amountValues.forEach((item) => {
    //     if (!amountPattern.test(item)) {
    //      error - true
    //     }
    //   });
    //   if(error){
    //     isFormValid = false;
    //     let errorMessage = {
    //       labelName: "lpease enter a valid amount",
    //       labelKey: "ERR_VALID_AMOUNT_TOAST",
    //     };
    //     dispatch(toggleSnackbar(true, errorMessage, "warning"));
    //   }
    // }
  }

  if (activeStep === 1) {
    // const documentsUploadRedux = get(
    //   state.screenConfiguration.preparedFinalObject,
    //   "BillTemp[0].uploadedDocsInRedux",
    //   {}
    // );

    const documentsUploadRedux = get(
      state.screenConfiguration.preparedFinalObject,
      "documentsUploadRedux",
      {}
    );
  
    if (Object.keys(documentsUploadRedux).length === 0) {
      isFormValid = false;
      let errorMessage = {
        labelName: "Please fill all mandatory fields and upload the documents!",
        labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST",
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
    onDemandRevisionBasis(state, dispatch);
  }

  if (activeStep !== 4) {
    if (isFormValid) {
      changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName: "Please fill all mandatory fields and upload the documents!",
        labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST",
      };
      switch (activeStep) {
        case 0:
          errorMessage = {
            labelName: "Please, provide required details",
            labelKey: "BILL_ERR_PROVIDE_REQ_DETAILS_TOAST",
          };
          break;
      }
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 2 ? true : false;
  const isSubmitButtonVisible = activeStep === 2 ? true : false;

  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep,
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible,
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible,
    },
    {
      path: "components.div.children.footer.children.submitButton",
      property: "visible",
      value: isSubmitButtonVisible,
    },
  ];
  dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = (path) => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true,
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false,
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false,
    },
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false,
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true,
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  changeStep(state, dispatch, "previous");
};

export const submitApplication = (state, dispatch) => {
  dispatch(
    setRoute("/bill-amend/acknowledgement?purpose=apply&status=success")
  );
};
export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px",
      },
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left",
        },
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "BILL_COMMON_BUTTON_PREV_STEP",
      }),
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious,
    },
    visible: false,
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px",
      },
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "BILL_COMMON_BUTTON_NXT_STEP",
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right",
        },
      },
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext,
    },
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px",
      },
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "BILL_COMMON_BUTTON_SUBMIT",
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right",
        },
      },
    },
    onClickDefination: {
      action: "condition",
      callBack: submitApplication,
    },
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   action: "APPLY"
    // },
    visible: false,
  },
});
