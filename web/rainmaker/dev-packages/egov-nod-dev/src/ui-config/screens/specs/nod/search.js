import { getCommonHeader, getBreak, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { showSearches } from "./searchResources/searchTabs";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { searchConnection } from "./searchResources/searchConnection";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import commonConfig from "config/common.js";
import { httpRequest } from "../../../../ui-utils/api";
// const getMDMSData = (action, dispatch) => {
//   const moduleDetails = [
//     {  
//       moduleName: "ws-services-masters",
//       masterDetails: [
//         { name: "Documents" }
//       ] 
//     }
//   ]
//   try {
//     getRequiredDocData(action, dispatch, moduleDetails)
//   } catch (e) {
//     console.log(e);
//   }
// };






const header = getCommonHeader({
    label: "No Dues "
  });


const search = {
    uiFramework: "material-ui",
    name: "search",
    beforeInitScreen: (action, state, dispatch) => {

     
    //  dispatch(prepareFinalObject("searchConnection.tenantId", getTenantIdCommon()));
      dispatch(prepareFinalObject('searchConnection',{}))
      dispatch(prepareFinalObject('createConnection',{}))
      dispatch(prepareFinalObject("currentTab", "SEARCH_CONNECTION"));
      
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
                      label: "Apply No Dues"
                    })
                  },
                  onClickDefination: {
                    action: "condition",
                    callBack: (state, dispatch) => {
                      openNewConnectionForm(state, dispatch);
    
                    }
                  },
                 
                }
               

              }
            },
            showSearches,
            breakAfterSearch: getBreak(),
            searchConnection,
           // createConnection
          }
        },
        adhocDialog: {
          uiFramework: "custom-containers",
          componentPath: "DialogContainer",
          props: {
            open: false,
            maxWidth: false,
            screenKey: "searchGarbage"
          },
          children: {
            popup: {}
          }
        }
      }


}
export default search

const openNewConnectionForm = (state, dispatch) => {
 // alert(process.env.REACT_APP_SELF_RUNNING);
 // dispatch(prepareFinalObject("Demands", []));
 // dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
 //window.open("https://stvending.punjab.gov.in/ticket/", "_blank")
  const path =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/nod/create`
      : `/nod/create`;
  dispatch(setRoute(path));
};