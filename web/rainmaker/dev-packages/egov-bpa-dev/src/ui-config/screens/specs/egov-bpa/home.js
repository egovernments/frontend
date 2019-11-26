import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FireNocIcon from "../../../../ui-atoms-local/Icons/FireNocIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { pbkdf2 } from "crypto";

const header = getCommonHeader(
  {
    labelName: "BPA",
    labelKey: "BPA"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const cardItems = [
  {
    label: {
      labelKey: "BPA_APPLY",
      labelName: "Apply for BPA"
    },
    icon: <FireNocIcon />,
    route: {
      screenKey: "home",
      jsonPath: "components.adhocDialog"
    }
  },
  {
    label: {
      labelKey: "BPA_MY_APPLICATIONS",
      labelName: "My Applications"
    },
    icon: <MyApplicationIcon />,
    route: "my-applications"
  }
];

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: (action, state, dispatch) => {
    getRequiredDocData(action, state, dispatch).then(() => {
      let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.searchScreenMdmsData.BPA.Documents",
        []
      );
      set(
        action,
        "screenConfig.components.adhocDialog.children.popup",
        // getRequiredDocuments(documents)
      );
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        listCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-bpa",
          componentPath: "HowItWorks"
        }
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "home"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default tradeLicenseSearchAndResult;
