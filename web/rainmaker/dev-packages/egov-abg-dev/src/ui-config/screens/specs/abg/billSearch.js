import { getBreak, getCommonHeader, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import { billSearchCard } from "./billSearchResources/billSearchCard";
import { searchResults } from "./billSearchResources/searchResults";
import "./index.css";
import { ifUserRoleExists } from "../utils";
import get from "lodash/get";
import filter  from "lodash/filter";

const header = getCommonHeader({
  labelName: "Universal Bill",
  labelKey: "ABG_UNIVERSAL_BILL_COMMON_HEADER"
});
const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const getMDMSData = async (action, state, dispatch) => {
  const tenantId = getTenantId();
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "BillingService",
          masterDetails: [
            {
              name: "BusinessService"
            }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "uiCommonPay"
            }
          ]
        },
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants",
              filter : `[?(@.city.ulbGrade!="ST")]`,
            }
          ]
        }
      ]
    }
  };
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    payload.MdmsRes.BillingService.BusinessService = payload.MdmsRes.BillingService.BusinessService.filter(service => service.billGineiURL && service.type && service.type=='Adhoc');
    dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const getData = async (action, state, dispatch) => {
  await getMDMSData(action, state, dispatch);
};

const billSearchAndResult = {
  uiFramework: "material-ui",
  name: "billSearch",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch);
    const tenantId = process.env.REACT_APP_NAME === "Employee" ? getTenantId() : JSON.parse(getUserInfo()).permanentCity;
    if (tenantId) {
      dispatch(prepareFinalObject("searchScreen", { tenantId: tenantId }));
      const ulbComponentJsonPath = "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children.ulb";
      const disableUlb = process.env.REACT_APP_NAME === "Citizen" ? false : true;
      dispatch(
        handleField(
          "billSearch",
          ulbComponentJsonPath,
          "props.value",
          tenantId
        )
      );
      dispatch(
        handleField(
          "billSearch",
          ulbComponentJsonPath,
          "props.disabled",
          disableUlb
        )
      );
    }
    //added by vidya to get mobile number
    if(ifUserRoleExists("CITIZEN")){
      const userName = JSON.parse(getUserInfo()).userName;
      dispatch(
        prepareFinalObject("searchScreen.mobileNumber", userName)
      );
    }
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "billSearch"
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
            groupBillButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: process.env.REACT_APP_NAME === "Employee" ? enableButton : false,
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
                ButtonLabel: getLabel({
                  labelName: "Group Bills",
                  labelKey: "ABG_COMMON_HEADER"
                })
              },
              onClickDefination: {
                action: "page_change",
                path:
                  process.env.REACT_APP_SELF_RUNNING === "true"
                    ? `/egov-ui-framework/abg/groupBills`
                    : `/abg/groupBills`
              },
              visible: false //process.env.REACT_APP_NAME === "Employee" ? true : false,
            },
            howitWorksButton:{
              componentPath:"Button",
              
             
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible:process.env.REACT_APP_NAME === "Citizen" ? true : false,
              props:{
                //variant: "outlined",
                color:"primary",                 
                  style:{
                  minWidth:"180px",
                  height:"48px",
                  marginRight:"45",
                  borderRadius: "inherit"
                }
              },
              onClickDefination: {
                action: "page_change",
                path:`/abg/how-it-works-abg`
              },
              children:{
                
                helpButtonIcon:{
                  uiFramework:"custom-atoms",
                  componentPath:"Icon",
                  props:{
                    iconName:"help-circle"
                  }
                },
                helpButtonLabel:getLabel({
                  labelName:"Bill How it Works",
                  labelKey:"ABG_HELP"
                }),
              },
                          
             }, 
          }
        },
        billSearchCard,
        breakAfterSearch: getBreak(),
        searchResults
      }
    }
  }
};

export default billSearchAndResult;
