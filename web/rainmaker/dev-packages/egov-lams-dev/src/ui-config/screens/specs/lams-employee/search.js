import {
    getCommonHeader,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { leaseApplication } from "./searchResource/leaseRenewalApplicationSearch";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  //import { pendingApprovals } from "./searchResource/pendingApprovals";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  // import { progressStatus } from "./searchResource/progressStatus";
  import { searchResults } from "./searchResource/searchResults";
  import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { httpRequest } from "../../../../ui-utils";
  import find from "lodash/find";
  import get from "lodash/get";
  import {getCbsForDeoBasedOnLamsRoles, getLamsRoles} from "../../../../ui-utils/commons"
  import {loadDeoMappingsFromMdms} from "../lams-utils/utils";
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  const tenant= getTenantId();
  const pageResetAndChange = (state, dispatch) => {
    dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    dispatch(prepareFinalObject("LicensesTemp", []));
    dispatch(prepareFinalObject("DynamicMdms", []));
    dispatch(setRoute(`/tradelicence/apply?tenantId=${tenant}`));
  };
  
  
  const getMdmsData = async (dispatch) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: getTenantId(),
        moduleDetails: [
          {
            moduleName: "TradeLicense",
            masterDetails: [
              { name: "ApplicationType" }
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
      let types = [];
      if(payload && payload.MdmsRes){
        types =  get(payload.MdmsRes, "TradeLicense.ApplicationType").map((item,index) => {
          return {
            code : item.code.split(".")[1]
          }
        });
      }    
       dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.searchScreen.applicationType",
          types
        )
      );
    }catch (e) {
      console.log(e);
    }
  }
  
  const header = getCommonHeader({
    labelName: "Lease Application Search",
    labelKey: "LAMS_COMMON_SEARCH"
  });
  const tradeLicenseSearchAndResult = {
    uiFramework: "material-ui",
    name: "search",
    beforeInitScreen: (action, state, dispatch) => {
      dispatch(prepareFinalObject("searchScreen", {}));
      
      //dispatch(prepareFinalObject("searchScreen.applicationType", [{code: "EXTENSION"},{code: "RENEWAL"}]));
      dispatch(prepareFinalObject("lamsStore.searchScreen.applicationType", [{code: "EXTENSION"},{code: "RENEWAL"}]));

      loadDeoMappingsFromMdms(action, state, dispatch).then((response) => {
        let cbsOfDeos = getCbsForDeoBasedOnLamsRoles(state, dispatch); //getCbsForDeoBasedOnLamsRoles();
        dispatch(prepareFinalObject("lamsStore.searchScreen.tenantIds", cbsOfDeos));
      });

      getMdmsData(dispatch);
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "search"
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
          //pendingApprovals,
          leaseApplication,
          breakAfterSearch: getBreak(),
          searchResults
        }
      }
    }
  };
  
  export default tradeLicenseSearchAndResult;