import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { newCollectionDetailsCard } from "./newCollectionResource/newCollectionDetails";
import { newCollectionFooter } from "./newCollectionResource/newCollectionFooter";
import { prepareFinalObject,toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { fetchGeneralMDMSData } from "egov-ui-framework/ui-redux/common/actions";
import { getTenantId } from "egov-ui-framework/ui-utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { setServiceCategory } from "../utils";
import commonConfig from "config/common.js";
import get from "lodash/get";
import set from "lodash/set";

const header = getCommonHeader({
  labelName: "New Collection",
  labelKey: "UC_COMMON_HEADER"
});
const tenantId = getTenantId();

const getData = async (action, state, dispatch, demandId) => {
  dispatch(toggleSpinner())
  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            // {
            //   name: "tenants"
            // },
            {
              name: "citymodule",
              filter: "[?(@.code=='UC')]"
            }
          ]
        },
        {
          moduleName: "BillingService",
          masterDetails: [
            { name: "BusinessService", filter: "[?(@.type=='Adhoc')]" },
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
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );

    let ucCities=get(payload.MdmsRes, "tenant.citymodule[0].tenants", []);
    set(payload.MdmsRes,"ucCities",ucCities);
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    setServiceCategory(
      get(payload.MdmsRes, "BillingService.BusinessService", []),
      dispatch
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
    } catch (e) {
      console.log(e);
    }
  }
  dispatch(toggleSpinner())
};

const newCollection = {
  uiFramework: "material-ui",
  name: "newCollection",
  beforeInitScreen: (action, state, dispatch) => {
    const hasReceipt = get(
      state.screenConfiguration.preparedFinalObject,
      "Demands[0].hasReceipt",
      false
    );
    if (hasReceipt) {
      dispatch(prepareFinalObject("Demands", [{ hasReceipt: false }]));
    }
    const demandId = get(
      state.screenConfiguration.preparedFinalObject,
      "Demands[0].id",
      null
    );
    if (demandId) {
      const screenConfigForUpdate = get(
        state.screenConfiguration,
        "screenConfig.newCollection"
      );
      set(
        screenConfigForUpdate,
        "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceCategory.props.disabled",
        true
      );
      set(
        screenConfigForUpdate,
        "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType.props.disabled",
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
        id: "newCollection"
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
        newCollectionDetailsCard,
        newCollectionFooter
      }
    }
  }
};

export default newCollection;
