import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  updatePFOforSearchResults,
  getBoundaryData
} from "../../../../ui-utils/commons";
import get from "lodash/get";
import { footer } from "../tradelicence/applyResource/footer";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  header,
  formwizardFirstStep,
  formwizardSecondStep,
  formwizardThirdStep,
  formwizardFourthStep,
  stepper,
  getMdmsData
} from "../tradelicence/apply";
import { getAllDataFromBillingSlab , getFinancialYearDates, convertDateToEpoch} from "../utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";

const getData = async (action, state, dispatch, tenantId) => {
  await getMdmsData(action, state, dispatch);
  await getAllDataFromBillingSlab(tenantId, dispatch);
  await getBoundaryData(action, state, dispatch, [
    { key: "tenantId", value: tenantId }
  ]);
  dispatch(
    prepareFinalObject(
      "Licenses[0].tradeLicenseDetail.address.tenantId",
      tenantId
    )
  );
  dispatch(
    prepareFinalObject("Licenses[0].tradeLicenseDetail.address.city", tenantId)
  );
};
const updateSearchResults = async (
  action,
  state,
  dispatch,
  queryValue,
  tenantId
) => {
  await getData(action, state, dispatch, tenantId);
  updatePFOforSearchResults(
    action,
    state,
    dispatch,
    queryValue,
    "",
    tenantId
  ).then((response)=>{

    const queryValueFromUrl = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const endTime = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].validTo",
      ""
    );
    const noOfYears = parseInt(get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].tradeLicenseDetail.additionalDetail.noOfYears",
      ""
    ));
    if (queryValueFromUrl) {
      dispatch(
        prepareFinalObject(
          "Licenses[0].oldLicenseNumber",
          get(
            state.screenConfiguration.preparedFinalObject,
            "Licenses[0].applicationNumber",
            ""
          )
        )
      );
      let startDate = getFinancialYearDates("yyyy-mm-dd", endTime + 1000, noOfYears).startDate
      let endDate = getFinancialYearDates("yyyy-mm-dd", endTime + 1000, noOfYears).endDate
      dispatch(
        prepareFinalObject(
          `Licenses[0].validFrom`, convertDateToEpoch(startDate, "")
        ));
      dispatch(prepareFinalObject(
        `Licenses[0].validTo`, convertDateToEpoch(endDate, "dayend")
      ));
      dispatch(
        prepareFinalObject(
          `Licenses[0].financialYear`, startDate.split("-")[0] + "-" + endDate.split("-")[0].slice(endDate.split("-")[0].length - 2)
        ));
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.applicationType",
            "props.value",
            "APPLICATIONTYPE.RENEWAL"
          )
        );
        dispatch(
          prepareFinalObject(
            "Licenses[0].applicationType",
            "RENEWAL"
          )
        );
        dispatch(
          prepareFinalObject(
            "Licenses[0].workflowCode",
            "EDITRENEWAL"
          )
        );
      dispatch(prepareFinalObject("Licenses[0].action", "INITIATE"));
      dispatch(prepareFinalObject("Licenses[0].applicationNumber", ""));
      dispatch(
        handleField(
          "apply",
          "components.div.children.headerDiv.children.header.children.applicationNumber",
          "visible",
          false
        )
      );
    }
    else {
      const applicationType = get(
        response,
        "Licenses[0].applicationType",
        null
      );
      getAllDataFromBillingSlab(tenantId, dispatch,[{
        key:"applicationType",value:applicationType
      }]);
    }
  });


};
const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    const queryValue = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const applicationNo = queryValue
      ? queryValue
      : get(
          state.screenConfiguration.preparedFinalObject,
          "Licenses[0].oldLicenseNumber",
          null
        );
    if (applicationNo) {
      updateSearchResults(action, state, dispatch, applicationNo, tenantId);
    } else {
      getData(action, state, dispatch, tenantId);
    }
    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
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
        formwizardFourthStep,
        footer
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "apply"
      }
    }
  }
};

export default screenConfig;
