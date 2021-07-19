import { getCommonHeader, getBreak, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { createConnection } from "./createResources/createConnection";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import commonConfig from "config/common.js";
import { httpRequest } from "../../../../ui-utils/api";





export const getMdmsTenantsData = async (dispatch) => {
  let mdmsBody = {
      MdmsCriteria: {
          tenantId: commonConfig.tenantId,
          moduleDetails: [
              {
                  moduleName: "tenant",
                  masterDetails: [
                      {
                          name: "tenants"
                      },
                      { 
                        name: "citymodule" 
                      }
                  ]
              },
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
      payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
      dispatch(prepareFinalObject("applyScreenMdmsData.tenant", payload.MdmsRes.tenant));

  } catch (e) {
      console.log(e);
  }
};

const getMhollaData = async(dispatch)=>{
  const queryObject = [
    { key: "tenantId", value: localStorage.getItem('tenant-id') },
     
  ];
  let response = await httpRequest(
    "post",
    "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
    "_search",
    queryObject,
    {}
  );
  let mohallaDataArray = [];
  let mohallaDataRow=null;
  let name;
  response.TenantBoundary[0].boundary.map((element,index) => {
    name = element.name + "( "+element.code+" )";
   // code=element.code;
    mohallaDataRow={"code":name};
   mohallaDataArray.push(mohallaDataRow);
  
 });
 
 dispatch(prepareFinalObject("mohallaData", mohallaDataArray));
}

const header = getCommonHeader({
    label: "Genrate Ticket"
  });


const ticket = {
    uiFramework: "material-ui",
    name: "create",
    beforeInitScreen: (action, state, dispatch) => {
     
   //   getMDMSData(action, dispatch);
      getMdmsTenantsData(dispatch);
      getMhollaData(dispatch);
      dispatch(prepareFinalObject("searchConnection.tenantId", getTenantIdCommon()));
      dispatch(prepareFinalObject('createConnection',{}))
      dispatch(prepareFinalObject("currentTab", "CREATE_CONNECTION"));
      
      return action;
    },
    components: {
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Form",
          props: {
            className: "common-div-css",
            id: "create"
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
                      labelName: "Raise Ticket",
                      label: "Raise Ticket"
                    })
                  },
                  onClickDefination: {
                    action: "condition",
                    callBack: (state, dispatch) => {
                      openTicketTool(state, dispatch);
    
                    }
                  },
                 
                }

              }
            },

           


          }
        },
        adhocDialog: {
          uiFramework: "custom-containers",
          componentPath: "DialogContainer",
          props: {
            open: false,
            maxWidth: false,
            screenKey: "create"
          },
          children: {
            popup: {}
          }
        }
      }


}
export default ticket

const openTicketTool = (state, dispatch) => {
  window.open("https://stvending.punjab.gov.in/ticket/", "_blank")
};