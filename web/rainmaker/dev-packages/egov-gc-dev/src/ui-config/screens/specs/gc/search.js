import { getCommonHeader, getBreak, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { showSearches } from "./searchResource/searchTabs";
import { searchResults } from "./searchResource/searchResults";
import { searchApplicationResults } from "./searchResource/searchApplicationResults";
import "./index.css";
import { showHideAdhocPopup } from "egov-ui-framework/ui-utils/commons";

const header = getCommonHeader({
    label: "hhhhhhhhhhh"
  });


const searchGC = {
    uiFramework: "material-ui",
    name: "search",
    beforeInitScreen: (action, state, dispatch) => {
      // dispatch(handleField("apply",
      // "components",
      // "div", {}));
      // dispatch(handleField("search-preview",
      // "components",
      // "div", {}));
      
      return action;
    },
    components: {
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Form",
          props: {
            className: "common-div-css",
            id: "search1"
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
              
                }
              }
            },
            // showSearches,
            // breakAfterSearch: getBreak(),
            // searchResults,
            // searchApplicationResults
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


}
export default searchGC