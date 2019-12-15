import { fetchData } from "./citizenSearchResource/citizenFunctions";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "TL_MY_APPLICATIONS_HEADER"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            applicationName: {
              label: "TL_COMMON_TABLE_COL_OWN_NAME",
              jsonPath: "tradeLicenseDetail.owners[0].name"
            },
            applicationNumber: {
              label: "TL_COMMON_TABLE_COL_APP_NO",
              jsonPath: "applicationNumber"
            },

            ownerName: {
              label: "BPA_LICENSEE_TYPE_LABEL",
              jsonPath: "tradeLicenseDetail.tradeUnits[0].tradeType"
            },
            moduleNumber: {
              label: "BPA_COMMON_TABLE_COL_LIC_NO",
              jsonPath: "licenseNumber"
            },
            status: {
              label: "TL_COMMON_TABLE_COL_STATUS",
              jsonPath: "status"
            },
            moduleName: "BPAREG",
            statusPrefix: "WF_NEWTL_"
          }
        }
      }
    }
  }
};

export default screenConfig;
