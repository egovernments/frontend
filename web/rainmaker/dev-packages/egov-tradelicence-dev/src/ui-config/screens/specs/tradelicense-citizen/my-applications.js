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
            contents: [
              {
                label: "TL_COMMON_TABLE_COL_APP_NO",
                jsonPath: "applicationNumber"
              },
              {
                label: "TL_COMMON_TABLE_COL_EPASS_NO",
                jsonPath: "licenseNumber"
              },
              {
                label: "TL_COMMON_TABLE_COL_TRADE_TYPE",
                jsonPath: "tradeLicenseDetail.tradeUnits[0].tradeType",
                localePrefix: {
                  moduleName: "TRADELICENSE",
                  masterName: "TRADETYPE"
                }
              },
              {
                label: "TL_COMMON_TABLE_COL_OWN_NAME",
                jsonPath: "tradeLicenseDetail.owners[0].name"
              },
              {
                label: "TL_COMMON_TABLE_COL_OWN_MOBILE",
                jsonPath: "tradeLicenseDetail.owners[0].mobileNumber"
              },
            ],
            moduleName: "TL",
            homeURL: "/tradelicense-citizen/home"
          }
        }
      }
    }
  }
};

export default screenConfig;
