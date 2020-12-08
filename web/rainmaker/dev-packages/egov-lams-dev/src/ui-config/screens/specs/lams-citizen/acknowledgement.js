import {
  getCommonCardWithHeader,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object

import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import acknowledgementCard from "./acknowledgementUtils";

let applicationNumber = getQueryArg(window.location.href, "applicationNumber");

const acknowledgement = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  beforeInitScreen:(action, state, dispatch) => {
    applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    dispatch(toggleSpinner());
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        card: acknowledgementCard({
          icon: "done",
          backgroundColor: "#39CB74",
          header: {
            labelName: "Application Submitted Successfully",
            labelKey: "LAMS_APPL_SUBMITTED_SUCCESS"
          },
          body: {
            labelName:
              "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
            labelKey: "LAMS_APPL_SUBMITTED_SUCCESS_MESSAGE_SUB"
          },
          tailText: {
            labelName: "Application No.",
            labelKey: "LAMS_APP_NO_LABEL"
          },
          number: applicationNumber
        })
      },
    },
    //newApplicationFooter
  }
};
export default acknowledgement;