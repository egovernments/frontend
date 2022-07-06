import { getCommonHeader, getBreak, convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";
import { showSearches } from "./generateBillResource/billTabs";
import { viewCreateBill } from "./generateBillResource/viewCreateBills";
 import { bulkUpload } from "./generateBillResource/bulkUpload";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { prepareFinalObject,unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { getRequiredDocData, showHideAdhocPopup } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils/api";
import commonConfig from "config/common.js";

const getMDMSData = (action, dispatch) => { };

const getMhollaData = async(dispatch)=>{ }
  const header = getCommonHeader({
    labelKey: "Upload Meter Readings",
  });

  var formConfig = {
    name: "bulkUploadMeter",
     }
  
export const getMdmsTenantsData = async (dispatch) => { }; 

const BulkuploadMeter = {
  uiFramework: "material-ui",
  name: "bulkUploadMeter",
  beforeInitScreen: (action, state, dispatch) => {
   // getMDMSData(action, dispatch);
   // getMhollaData(dispatch);
   // getMDMSAppType(dispatch);
    getMdmsTenantsData(dispatch);
   
    dispatch(prepareFinalObject("searchConnection.tenantId", getTenantIdCommon()));
    dispatch(prepareFinalObject('generateBillScreen',{}))
    dispatch(prepareFinalObject('searchBillScreen',{}))
    dispatch(prepareFinalObject("currentTab", "CREATE_BILL"));


    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "BulkuploadMeter"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs:12,
                sm: 6
              },
              ...header
            },
            
          },
                 
        }, 
        bulkUpload
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "search"
      },
      children: {
        popup: {}
      }
    }
  }
};
exports.default = formConfig;
export default BulkuploadMeter;
