import commonConfig from "config/common.js";
import { getCommonHeader,
  getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { setServiceCategory } from "../utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { newCollectionFooter } from "./newCollectionResource/newCollectionFooter";
import {newCollectionConsumerDetailsCard} from './newCollectionResource/neCollectionConsumerDetails'
import{newCollectionServiceDetailsCard} from './newCollectionResource/newCollectionServiceDetails';
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
const header = getCommonHeader({
  labelName: "New Collection",
  labelKey: "UC_COMMON_HEADER"
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
        },
        {
          moduleName: "common-masters",
          masterDetails: [            
            { name: "Help" }
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
    // dispatch(
    //   prepareFinalObject("Demands[0].tenantId", tenantId)
    // );

    const presentTenantId = getQueryArg(window.location.href, "tenantId")?getQueryArg(window.location.href, "tenantId"):getTenantId();
      
      let helpUrl = get(
        payload,
        "MdmsRes.common-masters.Help",
        []
        ).filter(item =>item.code ==="UC");
    //console.info("my help url==",helpUrl);
    console.info("my help url is set or mCollect==",helpUrl[0].URL);
    
    dispatch(prepareFinalObject("helpFileUrl", helpUrl[0].URL));
//Get Mohalla data
        
try {
  let payload = await httpRequest(
    "post",
    "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
    "_search",
    [{ key: "tenantId", value: `${tenantId}`, }],
    {}
  );
  const mohallaData =
    payload &&
    payload.TenantBoundary[0] &&
    payload.TenantBoundary[0].boundary &&
    payload.TenantBoundary[0].boundary.reduce((result, item) => {
      result.push({
        ...item,
        name: `${tenantId
          .toUpperCase()
          .replace(
            /[.]/g,
            "_"
          )}_REVENUE_${item.code
          .toUpperCase()
          .replace(/[._:-\s\/]/g, "_")}`
      });
      return result;
    }, []);
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.tenant.localities",
      mohallaData
    )
  );
  
  dispatch(
    handleField(
      "newCollection",
      "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children.ConsumerLocMohalla",
      "props.suggestions",
      mohallaData
      // payload.TenantBoundary && payload.TenantBoundary[0].boundary
    )
  );
  const mohallaLocalePrefix = {
    moduleName: `${tenantId}`,
    masterName: "REVENUE"
  };
 
  dispatch(
    handleField(
      "newCollection",
      "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children.ConsumerLocMohalla",
      "props.localePrefix",
      mohallaLocalePrefix
    )
  );
} catch (e) {
  console.log(e);
}
//End of Mohalla data




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
      // dispatch(
      //   prepareFinalObject(
      //     "Demands[0].consumerCode",
      //     get(payload, "idResponses[0].id", "")
      //   )
      // );
      loadServiceType(tenantId, dispatch);
    } catch (e) {
      console.log(e);
    }
  }

  // return action;
};

const newCollection = {
  uiFramework: "material-ui",
  name: "newCollection",
  beforeInitScreen: (action, state, dispatch) => {
    const demandId = get(
      state.screenConfiguration.preparedFinalObject,
      "Demands[0].id",
      null
    );
    const screenConfigForUpdate = get(
      state.screenConfiguration,
      "screenConfig.newCollection"
    );
    if (demandId) {

      set(
        screenConfigForUpdate,
        "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceCategory.props.disabled",
        true
      );
      set(
        screenConfigForUpdate,
        "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceType.props.disabled",
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
            },
            buttonDiv: {
              uiFramework: "custom-atoms",
              componentPath: "Div",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              children: {
                searchAndPayBtn :{
                  componentPath: "Button",             
                  //visible: enableButton,
                  props: {
                    variant: "outlined",
                    color: "primary",
                    style: {
                      color: "primary",
                      borderRadius: "2px",
                      width: "250px",
                      height: "48px",
                      marginRight: "16px"
                    }
                  },
                  children: {
                    buttonLabel: getLabel({
                      labelName: "Search And Pay",
                      labelKey: "UC_SEARCHANDPAY_LABEL"
                    }),
                  },                  
                  onClickDefination: {
                    action: "condition",
                    callBack: (state, dispatch) => {
                      openPayBillForm(state, dispatch);
                    }
                  }
                },
                searchReceiptBtn:{
                  componentPath: "Button",             
                  //visible: enableButton,
                  props: {
                    variant: "outlined",
                    color: "primary",
                    style: {
                      color: "primary",
                      borderRadius: "2px",
                      width: "250px",
                      height: "48px",
                      marginRight: "16px"
                    }
                  },
                  children: {
                    buttonLabel: getLabel({
                      labelName: "Receipt Search",
                      labelKey: "UC_SEARCHRECEIPT_LABEL"
                    }),
                  },
               
                  onClickDefination: {
                    action: "condition",
                    callBack: (state, dispatch) => {
                      openReceiptSearchForm(state, dispatch);
                    }
                  }
                },
              },            
            
            }
          }
        },
       // newCollectionDetailsCard,
        newCollectionConsumerDetailsCard,
        newCollectionServiceDetailsCard, 
        newCollectionFooter
      }
    }
  }
};

export default newCollection;

const openReceiptSearchForm = (state, dispatch) => {
  // dispatch(prepareFinalObject("Demands", []));
  dispatch(prepareFinalObject("Challan", []));
   dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
   const path =
     process.env.REACT_APP_SELF_RUNNING === "true"
       ? `/egov-ui-framework/uc/search`
       : `/uc/search`;
   dispatch(setRoute(path));
 };

 const openPayBillForm = (state, dispatch) => {  
  const path = `/abg/billSearch`;
  dispatch(setRoute(path));
 };