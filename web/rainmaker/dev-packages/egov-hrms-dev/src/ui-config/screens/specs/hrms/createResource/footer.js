import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSnackbar ,showSpinner ,hideSpinner} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import {
  getCommonApplyFooter,

  validateFields
} from "../../utils";
import { createUpdateEmployee, setRolesList } from "../viewResource/functions";
import "./index.css";



const moveToReview = dispatch => {
  const reviewUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/hrms/review`
      : `/hrms/review`;
  dispatch(setRoute(reviewUrl));
};

export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["create"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  let isFormValid = true;
  if (activeStep === 0) {
    const isEmployeeDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.employeeDetails.children.cardContent.children.employeeDetailsContainer.children",
      state,
      dispatch,
      "create"
    );
    const isProfessionalDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.professionalDetails.children.cardContent.children.employeeDetailsContainer.children",
      state,
      dispatch,
      "create"
    );
    if (!(isEmployeeDetailsValid && isProfessionalDetailsValid)) {
      isFormValid = false;
    }
    let tenantId = getTenantId();
    const errorMessage = {
      labelName: "Mobile number already exists . Please try with different mobile number",
      labelKey: "ERR_MOBILE_NUMBER_EXISTS_FIELDS"
    };
    let existingPhoneNumbers = get(state.screenConfiguration.preparedFinalObject, "existingPhoneNumbers", []);
    if(get(state.screenConfiguration.preparedFinalObject, "empPhoneNumber")!=get(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber")){

    
    if (existingPhoneNumbers.includes(get(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber"))) {
      dispatch(toggleSnackbar(true, errorMessage, "error"));
      return;
    } else {
      dispatch(showSpinner());
try {
  

      let queryObject = [
        {
          key: "phone",
          value: get(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber")
        },
        {
          key: "tenantId",
          value: tenantId
        }
      ];
      const response = await httpRequest(
        "post",
        "/egov-hrms/employees/_search",
        "",
        queryObject
      );
      dispatch(hideSpinner());

      if (response && response.Employees && response.Employees.length == 0) {


      } else {
        dispatch(prepareFinalObject("existingPhoneNumbers", [...existingPhoneNumbers, get(state.screenConfiguration.preparedFinalObject, "Employee[0].user.mobileNumber")]));

        dispatch(toggleSnackbar(true, errorMessage, "error"));
        return
      }
    } catch (error) {
      dispatch(hideSpinner());
      dispatch(toggleSnackbar(true,{...errorMessage,labelKey:'HRMS_SEARCH_ERROR'}, "error"));
      return
    }
    }
  }
  }
  if (activeStep === 1) {
    let jurisdictionDetailsPath =
      "components.div.children.formwizardSecondStep.children.jurisdictionDetails.children.cardContent.children.jurisdictionDetailsCard.props.items";
    let jurisdictionDetailsItems = get(
      state.screenConfiguration.screenConfig.create,
      jurisdictionDetailsPath,
      []
    );
    let isJurisdictionDetailsValid = true;
    for (var j = 0; j < jurisdictionDetailsItems.length; j++) {
      if (
        (jurisdictionDetailsItems[j].isDeleted === undefined ||
          jurisdictionDetailsItems[j].isDeleted !== false) &&
        !validateFields(
          `${jurisdictionDetailsPath}[${j}].item${j}.children.cardContent.children.jnDetailsCardContainer.children`,
          state,
          dispatch,
          "create"
        )
      )
        isJurisdictionDetailsValid = false;
    }
    if (!isJurisdictionDetailsValid) {
      isFormValid = false;
    }
    let assignmentDetailsPath =
      "components.div.children.formwizardThirdStep.children.assignmentDetails.children.cardContent.children.assignmentDetailsCard.props.items";
    let assignmentDetailsItems = get(
      state.screenConfiguration.screenConfig.create,
      assignmentDetailsPath,
      []
    );
    let isAssignmentDetailsValid = true;
    for (var j = 0; j < assignmentDetailsItems.length; j++) {
      if (
        (assignmentDetailsItems[j].isDeleted === undefined ||
          assignmentDetailsItems[j].isDeleted !== false) &&
        !validateFields(
          `${assignmentDetailsPath}[${j}].item${j}.children.cardContent.children.asmtDetailsCardContainer.children`,
          state,
          dispatch,
          "create"
        )
      )
        isAssignmentDetailsValid = false;
    }
    let assignmentsData = get(
      state.screenConfiguration.preparedFinalObject.Employee[0],
      "assignments",
      []
    );
    let atLeastOneCurrentAssignmentSelected = assignmentsData.some(
      assignment => {
        return assignment.isCurrentAssignment;
      }
    );
    if (!atLeastOneCurrentAssignmentSelected) {
      const errorMessage = {
        labelName: "Please select at least one current assignment",
        labelKey: "ERR_SELECT_CURRENT_ASSIGNMENT"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
      return;
    }
    if (!isAssignmentDetailsValid) {
      isFormValid = false;
    }
    setRolesList(state, dispatch);
  }
  if (activeStep === 2) {

  }
  if (activeStep === 4) {
    moveToReview(dispatch);
  }
  if (activeStep !== 4) {
    if (isFormValid) {
      changeStep(state, dispatch);
    } else {
      const errorMessage = {
        labelName: "Please fill all fields",
        labelKey: "ERR_FILL_ALL_FIELDS"
      };
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
    state.screenConfiguration.screenConfig["create"],
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
  const isPayButtonVisible = activeStep === 2 ? true : false;
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
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("create", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "create",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "create",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "create",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    case 3:
      dispatchMultipleFieldChangeAction(
        "create",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "create",
        getActionDefinationForStepper(
          "components.div.children.formwizardFifthStep"
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
    },
    // {
    //   path: "components.div.children.formwizardFourthStep",
    //   property: "visible",
    //   value: false
    // },
    // {
    //   path: "components.div.children.formwizardFifthStep",
    //   property: "visible",
    //   value: false
    // }
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

export const handleCreateUpdateEmployee = (state, dispatch) => {
  let uuid = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee[0].uuid",
    null
  );
  if (uuid) {
    createUpdateEmployee(state, dispatch, "UPDATE");
  } else {
    createUpdateEmployee(state, dispatch, "CREATE");
  }
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
        labelKey: "HR_COMMON_BUTTON_PREV_STEP"
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
        labelKey: "HR_COMMON_BUTTON_NXT_STEP"
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
  payButton: {
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
        labelKey: "HR_COMMON_BUTTON_SUBMIT"
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
      callBack: handleCreateUpdateEmployee
    },
    visible: false
  }
});
