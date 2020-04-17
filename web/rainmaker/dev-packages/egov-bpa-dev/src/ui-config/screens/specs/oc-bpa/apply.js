import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getQueryArg,
  getFileUrlFromAPI,
  setBusinessServiceDataToLocalStorage,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import set from "lodash/set";
import get from "lodash/get";
import jp from "jsonpath";
import { edcrHttpRequest } from "../../../../ui-utils/api";
import {
  basicDetails,
  buildingPlanScrutinyDetails,
  proposedBuildingDetails,
  abstractProposedBuildingDetails
} from "./applyResource/scrutinyDetails";
import { documentAndNocDetails } from './applyResource/documentAndNocDetails';
import { summaryDetails } from "./summary";
import { footer } from "./applyResource/footer";
import {
  getAppSearchResults
} from "../../../../ui-utils/commons";
import {
  getBpaMdmsData
} from "../utils";


export const stepsData = [
  { labelName: "Scrutiny Details", labelKey: "BPA_STEPPER_SCRUTINY_DETAILS_HEADER" },
  { labelName: "Document and NOC details", labelKey: "BPA_STEPPER_DOCUMENT_NOC_DETAILS_HEADER" },
  { labelName: "Application Summary", labelKey: "BPA_STEPPER_SUMMARY_HEADER" }
];

export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Apply for building permit`,
    labelKey: "BPA_APPLY_FOR_BUILDING_PERMIT_HEADER"
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
    basicDetails,
    buildingPlanScrutinyDetails,
    proposedBuildingDetails,
    abstractProposedBuildingDetails
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    documentAndNocDetails
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
    summaryDetails
  },
  visible: false
};

const getMdmsData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: getTenantId(),
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "DocumentType"
            },
            {
              name: "OwnerType"
            },
            {
              name: "OwnerShipCategory"
            }
          ]
        },
        {
          moduleName: "BPA",
          masterDetails: [
            {
              name: "DocTypeMapping"
            },
            {
              name: "ApplicationType"
            },
            {
              name: "ServiceType"
            },
            {
              name: "RiskTypeComputation"
            },
            {
              name: "OccupancyType"
            },
            {
              name: "SubOccupancyType"
            },
            {
              name: "Usages"
            },
            {
              name: "ProposedLandUse"
            },
            {
              name: "TownPlanningScheme"
            }
          ]
        },
        {
          moduleName: "TradeLicense",
          masterDetails: [
            { name: "TradeType", filter: `[?(@.type == "BPA")]` }
          ]
        }
      ]
    }
  };
  let payload = await getBpaMdmsData(action, state, dispatch, mdmsBody);
  dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
};

const getFirstListFromDotSeparated = list => {
  list = list.map(item => {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [...new Set(list)].map(item => {
    return { code: item };
  });
  return list;
};

const setSearchResponse = async (
  state,
  dispatch,
  applicationNumber,
  tenantId, action
) => {
  const response = await getAppSearchResults([
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "applicationNos", value: applicationNumber }
  ]);

  dispatch(prepareFinalObject("BPA", get(response, "Bpa[0]")));

  let edcrRes = await edcrHttpRequest(
    "post",
    `/edcr/rest/dcr/scrutinydetails?edcrNumber=${get(response, "Bpa[0].edcrNumber")}&tenantId=${tenantId}`,
    "search", []
  );

  dispatch(prepareFinalObject(`scrutinyDetails`, edcrRes.edcrDetail[0]));

  const ownershipCategory = get(response, "Bpa[0].ownershipCategory");
  if (ownershipCategory) {
    dispatch(prepareFinalObject("BPA.ownerShipMajorType", ownershipCategory.split('.')[0]));
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const step = getQueryArg(window.location.href, "step");

    set(state, "screenConfiguration.moduleName", "OCBPA");

    getMdmsData(action, state, dispatch).then(response => {
      let ownershipCategory = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
        []
      );
      ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.DropdownsData.OwnershipCategory",
          ownershipCategory
        )
      );
      let applicationType = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.ApplicationType[0].code"
      );
      dispatch(prepareFinalObject("BPA.applicationType", applicationType));
    });

    let isEdit = true;
    if (step || step == 0) {
      isEdit = false
    }
    if (applicationNumber && isEdit) {
      setSearchResponse(state, dispatch, applicationNumber, tenantId, action);
    }

    const queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessServices", value: "BPA" }
    ];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);

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
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        footer
      }
    }
  }
};

export default screenConfig;
