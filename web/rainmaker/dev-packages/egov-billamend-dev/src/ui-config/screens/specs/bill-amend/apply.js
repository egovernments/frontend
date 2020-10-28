import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getQueryArg,
  getFileUrlFromAPI,
  setBusinessServiceDataToLocalStorage,
  getTransformedLocale,
  orderWfProcessInstances
} from "egov-ui-framework/ui-utils/commons";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest, edcrHttpRequest } from "../../../../ui-utils/api";
import set from "lodash/set";
import get from "lodash/get";
import jp from "jsonpath";
// import { changeStep } from "./applyResource/footer";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { documentDetails } from "./applyResource/documentDetails";
import { footer } from "./applyResource/footer";
import { AddDemandRevisionBasis,AddAdjustmentAmount } from "./applyResource/amountDetails";
import commonConfig from "config/common.js";

export const stepsData = [
  { labelName: "Amount Details", labelKey: "BILL_STEPPER_AMOUNT_DETAILS_HEADER" },
  { labelName: "Documents", labelKey: "BILL_STEPPER_DOCUMENTS_HEADER" },
  { labelName: "Summary", labelKey: "BILL_STEPPER_SUMMARY_HEADER" }
];

export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Apply for Bill`,
    labelKey: "BILL_APPLY_FOR_BILL"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA"
    },
    visible: false
  }
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    AddAdjustmentAmount,
    AddDemandRevisionBasis
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    documentDetails
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {

  },
  visible: false
};

export const getData = async (action, state, dispatch) => {
  await getMdmsData(action, state, dispatch);
}

export const getMdmsData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "BillAmendment",
          masterDetails: [
            { name: "documentObj" }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            { name: "DocumentType" }
          ]
        }
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch, componentJsonpath) => {
    dispatch(prepareFinalObject("BILL", {}));

    getData(action, state, dispatch).then(responseAction => {

    });


    const step = getQueryArg(window.location.href, "step");
    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      let intStep = parseInt(step);
      set(
        action.screenConfig,
        "components.div.children.stepper.props.activeStep",
        intStep
      );
      let formWizardNames = [
        "formwizardFirstStep",
        "formwizardSecondStep",
        "formwizardThirdStep"
      ];
      for (let i = 0; i < 3; i++) {
        set(
          action.screenConfig,
          `components.div.children.${formWizardNames[i]}.visible`,
          i == step
        );
        set(
          action.screenConfig,
          `components.div.children.footer.children.previousButton.visible`,
          step != 0
        );
      }
    }
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
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        taskStatus: {
          moduleName: "egov-workflow",
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          visible: false,
          componentJsonpath: 'components.div.children.taskStatus',
          props: {
            dataPath: "",
            moduleName: "",
            updateUrl: ""
          }
        },
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        footer
      }
    }
  }
};

export default screenConfig;
