import commonConfig from "config/common.js";
import { getCommonHeader ,getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { setServiceCategory } from "../utils";
import { viewReceiptDetailsCard } from "./cancelReceiptResource/cancelReceiptDetails";
import { viewReceiptFooter } from "./cancelReceiptResource/cancelReceiptFooter";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const header =getCommonContainer({
  header: getCommonHeader({
    labelName: `Cancel Receipt`, //later use getFinancialYearDates
    labelKey: "CR_COMMON_HEADER"
  }),
  //applicationNumber: applicationNumberContainer()
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "ApplicationContainer",
    props: {
      number: getQueryArg(window.location.href, "consumerCode")|| 'PB-PT-2020-03-03-004161',
      label: {
        labelValue: "Receipt Details Receipt No.",
        labelKey: "CR_RECEIPT_DETAILS_NUMBER"
      }
    },
    visible: true
  }
});
const tenantId = getTenantId();
const loadServiceType = async (tenantId, dispatch) => {
  let requestBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "BillingService",
          masterDetails: [
            {
              name: "BusinessService",
              filter: "[?(@.type=='Adhoc')]"
            },
            {
              name: "TaxHeadMaster"
            },
            {
              name: "TaxPeriod"
            }
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
      requestBody
    );
    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.BillingService",
        payload.MdmsRes.BillingService
      )
    );
    setServiceCategory(
      get(payload, "MdmsRes.BillingService.BusinessService", []),
      dispatch
    );
  } catch (e) {
    console.log(e);
  }
}
const getData = async (action, state, dispatch, demandId) => {

  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            },
            { name: "citymodule" }
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
      requestBody
    );

    if (payload) {
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
      const citymodule = get(payload, "MdmsRes.tenant.citymodule");
      const liveTenants = citymodule && citymodule.filter(item => item.code === "UC");
      dispatch(
        prepareFinalObject("applyScreenMdmsData.tenant.citiesByModule", get(liveTenants[0], "tenants"))
      );
    }
    const serviceCategories = get(
      state.screenConfiguration,
      "preparedFinalObject.searchScreenMdmsData.serviceCategory",
      []
    );
    if (serviceCategories && serviceCategories.length !== 0) {
      setServiceCategory(
        serviceCategories,
        dispatch
      );
    } else if (tenantId) {
      loadServiceType(tenantId, dispatch)
    }
    dispatch(
      prepareFinalObject("Demands[0].tenantId", tenantId)
    );
  } catch (e) {
    console.log(e);
  }
  if (!demandId) {
    try {
      let payload = null;
      payload = await httpRequest("post", "/egov-idgen/id/_generate", "", [], {
        idRequests: [
          {
            idName: "",
            format: "UC/[CY:dd-MM-yyyy]/[seq_uc_demand_consumer_code]",
            tenantId: `${tenantId}`
          }
        ]
      });
      dispatch(
        prepareFinalObject(
          "Demands[0].consumerCode",
          get(payload, "idResponses[0].id", "")
        )
      );
      loadServiceType(tenantId, dispatch);
    } catch (e) {
      console.log(e);
    }
  }

  // return action;
};

const viewReceipt = {
  uiFramework: "material-ui",
  name: "viewReceipt",
  beforeInitScreen: (action, state, dispatch) => {
    const demandId = get(
      state.screenConfiguration.preparedFinalObject,
      "Demands[0].id",
      null
    );
    const screenConfigForUpdate = get(
      state.screenConfiguration,
      "screenConfig.viewReceipt"
    );

    dispatch(prepareFinalObject('DynamicMdms.BillingService.selectedValues',[]));
    dispatch(prepareFinalObject('DynamicMdms.BillingService.serviceCategories.selectedValues',[]));

    if (demandId) {

      set(
        screenConfigForUpdate,
        "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.serviceCategory.props.disabled",
        true
      );
      set(
        screenConfigForUpdate,
        "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.serviceType.props.disabled",
        true
      );
      action.screenConfig = screenConfigForUpdate;
    }
    !demandId && getData(action, state, dispatch, demandId);

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "viewReceipt"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            }
          }
        },
        viewReceiptDetailsCard,
        viewReceiptFooter
      }
    }
  }
};

export default viewReceipt;
