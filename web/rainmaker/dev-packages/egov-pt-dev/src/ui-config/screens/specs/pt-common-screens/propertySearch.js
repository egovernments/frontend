import commonConfig from "config/common.js";
import {
  getBreak, getCommonHeader,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import store from "ui-redux/store";
import { httpRequest } from "../../../../ui-utils";
import "./index.css";
// import { showHideAdhocPopup } from "../utils";
import { resetFields, searchPropertyDetails } from "./mutation-methods";
import { getQueryRedirectUrl, searchPropertyTable } from "./searchResource/searchResults";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
const tenant = getTenantId();



const getMDMSData = async (dispatch) => {
  const mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }, { name: "citymodule" }
          ]
        }
      ]
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
    if (process.env.REACT_APP_NAME != "Citizen") {
      dispatch(
        prepareFinalObject(
          "searchScreen.tenantId",
          tenant
        )
      );
    }
  } catch (e) {
    console.log(e);
  }
};

const header = getCommonHeader({
  labelName: "Property Registry",
  labelKey: "PT_COMMON_PROPERTY_REGISTRY_HEADER"
});
const screenConfig = {
  uiFramework: "material-ui",
  name: "propertySearch",

  beforeInitScreen: (action, state, dispatch) => {
    resetFields(state, dispatch);
    getMDMSData(dispatch);
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
            },
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px"
                    }
                  }
                },

                buttonLabel: getLabel({
                  labelName: "Register New Property",
                  labelKey: "PT_COMMON_REGISTER_NEW_PROPERTY_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: () => {
                  let url = getQueryRedirectUrl();
                  let applicationNo = getQueryArg(window.location.href, "applicationNumber");
                  const connectionNo = getQueryArg(window.location.href, "connectionNumber");
                  const actionType = getQueryArg(window.location.href, "action");
                  url = applicationNo ? url + `&applicationNumber=${applicationNo}` : url;
                  url = connectionNo ? url + `&connectionNumber=${connectionNo}` : url;
                  url = actionType ? url + `&action=${actionType}` : url;
                  store.dispatch(setRoute(`/pt-common-screens/register-property?redirectUrl=${url}`));
                }
              },
            }
          }
        },
        searchPropertyDetails,
        breakAfterSearch: getBreak(),
        searchPropertyTable

      }
    }
  }
};

export default screenConfig;

