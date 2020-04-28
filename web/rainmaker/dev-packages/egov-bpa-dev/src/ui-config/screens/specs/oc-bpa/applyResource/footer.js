import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getCommonApplyFooter, validateFields } from "../../utils";
import "./index.css";
import {
  submitBpaApplication,
  updateBpaApplication
} from "../../../../../ui-utils/commons";
import { 
  toggleSnackbar, 
  handleScreenConfigurationFieldChange as handleField 
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import _ from "lodash";



export const showRisktypeWarning = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.cityPickerDialog.props.open",
    false
  );
  dispatch(
    handleField("apply", "components.cityPickerDialog", "props.open", !toggle)
  );
  dispatch(
    handleField(
      "components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.div.children.selectButton",
      "visible",
      false
    )
  )
};


const callBackForNext = async (state, dispatch) => {
  window.scrollTo(0, 0);
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  let isFormValid = true;
  let hasFieldToaster = false;

  if(activeStep === 0) {
    let isBasicDetailsCardValid = validateFields(
      "components.div.children.formwizardFirstStep.children.basicDetails.children.cardContent.children.basicDetailsContainer.children",
      state,
      dispatch
    );
    isBasicDetailsCardValid = true; 
    if (
      !isBasicDetailsCardValid
    ) {
      isFormValid = false;
      hasFieldToaster = true;
    } else {
      const riskTypes = {LOW: 0, MEDIUM : 1, HIGH: 2};
      let ocEdcrRiskType = get(
        state.screenConfiguration.preparedFinalObject,
        "BPA.riskType"
      );
      let edcrRisktype = get(
        state.screenConfiguration.preparedFinalObject,
        "bpaDetails.riskType"
      );
      let ocEdcrKathaNo = get(
        state.screenConfiguration.preparedFinalObject,
        "ocScrutinyDetails.planDetail.planInformation.khataNo"
      );
      let edcrKathaNo =  get(
        state.screenConfiguration.preparedFinalObject,
        "scrutinyDetails.planDetail.planInformation.khataNo"
      );
      let ocEdcrPlotNo = get(
        state.screenConfiguration.preparedFinalObject,
        "ocScrutinyDetails.planDetail.planInformation.plotNo"
      );
      let edcrPlotNo = get(
        state.screenConfiguration.preparedFinalObject,
        "scrutinyDetails.planDetail.planInformation.plotNo"
      );
      if(ocEdcrKathaNo && edcrKathaNo && ocEdcrPlotNo && edcrPlotNo) {
          if(ocEdcrPlotNo == edcrPlotNo && ocEdcrKathaNo == edcrKathaNo) {
              console.log("all are ok");
          } else {
            let errorMessage = {};
            if(ocEdcrKathaNo != edcrKathaNo && ocEdcrPlotNo == edcrPlotNo) {
              errorMessage = {
                labelName: "Khata number from permit order XXXX(permit order number) is not matching with the khata number from occupancy certificate. You cannot proceed with the application",
                labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
              };
            } else if (ocEdcrPlotNo != edcrPlotNo && ocEdcrKathaNo == edcrKathaNo) {
              errorMessage = {
                labelName: "Plot number from permit order XXXX(permit order number) is not matching with the Plot number from occupancy certificate. You cannot proceed with the application",
                labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
              };
            } else if(ocEdcrPlotNo != edcrPlotNo && ocEdcrKathaNo != edcrKathaNo) {
              errorMessage = {
                labelName: "Khata No and plot No from permit order XXXX(permit order number) is not matching with the Khata No and plot No from occupancy certificate. You cannot proceed with the application",
                labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
              };
            }
            dispatch(toggleSnackbar(true, errorMessage, "error"));
            return
          }
      }
      if(riskTypes[edcrRisktype] < riskTypes[ocEdcrRiskType]) {
        dispatch(
          toggleSnackbar(
            true,
            {
              labelName: "The Risk type from permit order XXXX(permit order number) to occupancy certificate application is changed from Low to high .You cannot proceed with the application.",
              labelKey: "BPA_RISK_TYPE_VALIDATION_ERROR"
            },
            "error"
          )
        );
        return
      } else if (riskTypes[edcrRisktype] > riskTypes[ocEdcrRiskType]) {
        showRisktypeWarning(state, dispatch, activeStep);
      } else {
        // changeStep(state, dispatch);
        const riskTypeValid = get(
          state,
          "screenConfiguration.preparedFinalObject.BPA.riskType",
          []
        );
        if(riskTypeValid.length === 0){
          let errorMessage = {
            labelName: "Please search scrutiny details linked to the scrutiny number",
            labelKey: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_SEARCH_TITLE"
          };
          dispatch(toggleSnackbar(true, errorMessage, "warning")); 
          return;
        }
      } 
    }
  }

  if (activeStep !== 4) {
    if (isFormValid) {
     changeStep(state, dispatch);
    } else if (hasFieldToaster) { 
      let errorMessage = {
        labelName: "Please fill all mandatory fields and upload the documents !",
        labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
      };
      switch (activeStep) {
        case 0:
          errorMessage = {
            labelName: "Please fill all mandatory fields for Scrutiny Details, then proceed!",
            labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_SCRUTINY_DETAILS_TOAST"
          };
          break;
        case 1:
          errorMessage = {
            labelName: "Please upload all the required documents!",
            labelKey: "ERR_UPLOAD_REQUIRED_DOCUMENTS"
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
  const isSendToCitizenButtonVisible = activeStep === 2 ? true : false;
  const isSubmitButtonVisible = activeStep === 2 ? true : false;

  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.footer.children.submitButton",
      property: "visible",
      value: isSubmitButtonVisible
    },
    {
      path: "components.div.children.footer.children.sendToCitizen",
      property: "visible",
      value: isSendToCitizenButtonVisible
    }
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

export const getActionDefinationForStepper = path => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false
    }
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
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
        labelName: "Previous Step",
        labelKey: "TL_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "TL_COMMON_BUTTON_NXT_STEP"
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
      callBack: callBackForNext
    }
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "BPA_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: submitBpaApplication
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "APPLY"
    },
    visible: false
  },
  sendToCitizen: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      sendToCitizenLabel: getLabel({
        labelName: "SEND TO CITIZEN",
        labelKey: "BPA_SEND_TO_CITIZEN_BUTTON"
      }),
      sendToCitizenIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: updateBpaApplication
    },
    visible: false
  }
});