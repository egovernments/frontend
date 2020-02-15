import { getLabel ,validateFields} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { loginRequest } from "egov-ui-framework/ui-utils/api";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { authenticated } from "egov-ui-framework/ui-redux/auth/actions";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

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

export const loginFooter = getCommonApplyFooter({
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
        labelName: "Login",
        labelKey: "CORE_COMMON_LOGIN"
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
        login(state, dispatch);
      }
    }
  }
});



const login =async (state, dispatch) => {
  const isFormValid = validateFields(
    "components.div.children.loginDetailsCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "login"
  );
  if (isFormValid) {
    dispatch(toggleSpinner())
    //login call
    try {
      let formResponse = await loginRequest(
        state.screenConfiguration.preparedFinalObject.login.username,
        state.screenConfiguration.preparedFinalObject.login.password,
        "",
        "password",
        state.screenConfiguration.preparedFinalObject.login.tenantId,
        "EMPLOYEE"
      );
      dispatch(authenticated(formResponse));
      dispatch(setRoute("search"))
      dispatch(toggleSpinner())
    } catch (e) {
      console.log(e);
      dispatch(toggleSpinner())
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Invalid Credentials!",
            labelKey: "Invalid Credentials!"
          },
          "error"
        )
      );
    } finally {

    }

  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill the required fields.",
          labelKey: "UC_REQUIRED_FIELDS_ERROR_MSG"
        },
        "error"
      )
    );
  }
};
