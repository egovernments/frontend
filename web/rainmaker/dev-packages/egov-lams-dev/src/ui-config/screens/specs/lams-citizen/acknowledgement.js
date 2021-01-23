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
import { gotoHomeFooter } from "./gotoHomeFooter";

const getAcknowledgementCard = (
  state,
  dispatch,
  applicationNumber
) => {
  if (applicationNumber) {
    return {
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          // style: {
          //   position: "absolute",
          //   width: "95%"
          // }
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
        }
      },
      gotoHomeFooter
    }
    
  }
}

const acknowledgement = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  beforeInitScreen:(action, state, dispatch) => {
    let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    dispatch(toggleSpinner());

    const data = getAcknowledgementCard(
      state,
      dispatch,
      applicationNumber
    );
    set(action, "screenConfig.components.div.children", data);

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    },
    //newApplicationFooter
  }
};
export default acknowledgement;