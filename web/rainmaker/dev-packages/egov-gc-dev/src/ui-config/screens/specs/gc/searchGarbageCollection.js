import { getCommonHeader, getBreak, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { showSearches } from "./searchResource/searchTabs";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchResults } from "./searchResource/searchResults";
import { searchApplicationResults } from "./searchResource/searchApplicationResults";
import { localStorageGet, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import find from "lodash/find";
import { setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import { resetFieldsForConnection, resetFieldsForApplication } from '../utils';
import { handleScreenConfigurationFieldChange as handleField ,unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { getRequiredDocData, showHideAdhocPopup } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils/api";
import commonConfig from "config/common.js";

const header = getCommonHeader({
    label: "WS_SEARCH_CONNECTION_HEADER"
  });


const searchGarbageCollection = {
    uiFramework: "material-ui",
    name: "searchGarbageCollection",
    components: {
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Form",
          props: {
            className: "common-div-css",
            id: "searchGarbageCollection"
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
                  visible: true,
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
                      labelName: "NEW APPLICATION",
                      labelKey: "WS_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
                    })
                  },
                  onClickDefination: {
                    action: "condition",
                    callBack: (state, dispatch) => {
                      showHideAdhocPopup(state, dispatch, "search");
    
                    }
                  },
                  // onClickDefination: {
                  //   action: "condition",
                  //   callBack: (state, dispatch) => {
                  //     pageResetAndChange(state, dispatch);
                  //   }
                  // }
                }
              }
            },
            showSearches,
            breakAfterSearch: getBreak(),
            searchResults,
            searchApplicationResults
          }
        },
        adhocDialog: {
          uiFramework: "custom-containers",
          componentPath: "DialogContainer",
          props: {
            open: false,
            maxWidth: false,
            screenKey: "searchGarbageCollection"
          },
          children: {
            popup: {}
          }
        }
      }


}
export default searchGarbageCollection;