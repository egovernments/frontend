import commonConfig from "config/common.js";
import { getBreak, getCommonHeader, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "../../../../ui-utils";
import { showHideAdhocPopup } from "../utils";
import "./index.css";
import { resetFields } from "./mutation-methods";
import propertySearchTabs from "./property-search-tabs";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
// import { progressStatus } from "./searchResource/progressStatus";
import { searchApplicationTable, searchPropertyTable } from "./searchResource/searchResults";
const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
const tenant = getTenantId();

//console.log(captureMutationDetails);

const getMDMSData = async (action, dispatch) => {
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
        }, { moduleName: "PropertyTax", masterDetails: [{ name: "Documents" }] }
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
    payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;


    let documents = get(
      payload.MdmsRes,
      "PropertyTax.Documents",
      []
    );
    set(
      action,
      "screenConfig.components.adhocDialog.children.popup",
      getRequiredDocuments(documents)
    );
    // console.log("payload--", payload)
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
  labelName: "Property Tax",
  labelKey: "PROPERTY_TAX"
});
const screenConfig = {
  uiFramework: "material-ui",
  name: "propertySearch",

  beforeInitScreen: (action, state, dispatch) => {
    resetFields(state, dispatch);
    getMDMSData(action, dispatch);
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
                  labelName: "Add New Property",
                  labelKey: "PT_ADD_NEW_PROPERTY_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  showHideAdhocPopup(state, dispatch, "propertySearch");

                }
              },
              // roleDefination: {
              //   rolePath: "user-info.roles",
              //   path : "tradelicence/apply"

              // }
            }
          }
        },
        propertySearchTabs,
        breakAfterSearch: getBreak(),
        searchPropertyTable,
        searchApplicationTable

      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "propertySearch"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default screenConfig;

