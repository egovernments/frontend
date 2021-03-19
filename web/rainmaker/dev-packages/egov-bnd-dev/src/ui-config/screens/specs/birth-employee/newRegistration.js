import {
  prepareFinalObject,  handleScreenConfigurationFieldChange as handleField 
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {newRegistrationForm} from "./newRegistrationCard";
import {footer} from "./newRegistrationFooter";


const newRegistration = {
  uiFramework: "material-ui",
  name: "newRegistration",
  beforeInitScreen:(action, state, dispatch) => {
    return action;
  },
  components: {
    div2:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
      },
      children: {
        details: newRegistrationForm
      },
      //visible: process.env.REACT_APP_NAME === "Employee" ? true: false
    },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        details: footer
      },
    },
  }
};


export default newRegistration;