import {
  prepareFinalObject,  handleScreenConfigurationFieldChange as handleField 
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object

import {loadMdmsData, loadLeaseDetails, loadLeaseDetails2, setDocsForEditFlow} from "../lams-utils/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {newApplicationDetailsCard, newApplicationDocumentsCard, OwnerInfoCard, 
  setPostDSignSuccessScreen,setNewApplicationScreen,setCitizenEditScreen} from "./newApplicationDetailsCard";
import {checkIfCitizenEditScreen} from "../lams-utils/utils";
import {footer} from "./newApplicationFooter";
import {documentList} from "./documentList";
import { ifUserRoleExists } from "../utils";
import get from "lodash/get";
import jp from "jsonpath";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { localStorageGet, localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
import {afterDSignDone, isPostDSignMode} from "../../../../ui-utils/commons";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";



const initFreshScreen = (action, state, dispatch) =>{
 
  loadMdmsData(action, state, dispatch).then((response) => {
    const tenants = get(response, "MdmsRes.tenant.tenants");
    //Requires City Module Updations of MDMS? tobechanged
    let jpFilter = "$[?(@.code != 'pb')]";
    let onlyCBs = jp.query(tenants, jpFilter);
    if(!(process.env.REACT_APP_NAME === "Citizen"))
    {
      let tenantId = getTenantId();
      let currentCbFilter = "$[?(@.code == '"+tenantId+"')]";
      onlyCBs = jp.query(onlyCBs, currentCbFilter );
    } 
    onlyCBs.sort((a, b) => (a.code > b.code) ? 1 : -1)
    dispatch(prepareFinalObject("lamsStore.allTenants", onlyCBs));
  });

  //tobechanged
  let tenantId2 = process.env.REACT_APP_NAME === "Citizen"? getQueryArg(window.location.href, "tenantId") : state.auth.userInfo.tenantId;
  if(!ifUserRoleExists("CITIZEN")) //Only for employee directly set the tenantId
    dispatch(prepareFinalObject("lamsStore.Lease[0].tenantId", state.auth.userInfo.tenantId));

  dispatch(prepareFinalObject("lamsStore.requiredDocuments", [{applicationDocuments:documentList}]));

  //Check if its citizen Review and he wants to edit
  if(checkIfCitizenEditScreen())
  {
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const purpose = getQueryArg(window.location.href, "purpose");
    const workflowAction = "APPLY";

    const queryParams = [{ key: "applicationNumber", value: applicationNumber },
      { key: "tenantId", value: tenantId }
    ];
    loadLeaseDetails2(action, state, dispatch, queryParams).then((response)=>{
      dispatch(prepareFinalObject("lamsStore.Lease", response.leases));
      setDocsForEditFlow(state,dispatch);
      dispatch(prepareFinalObject("lamsStore.Lease[0].action", workflowAction));
      
      dispatch(handleField("newApplication","components.div1","visible",false));
      dispatch(handleField("newApplication","components.div2","visible",false));
    });

    dispatch(handleField("newApplication","components.div1","visible",false));
    dispatch(handleField("newApplication","components.div2","visible",false));
    setCitizenEditScreen(action,state, dispatch);
  }
  else
  //D Sign Success Page check.
  if(isPostDSignMode())
  {
    dispatch(toggleSpinner());
    setTimeout(() => {     
      setPostDSignSuccessScreen(action,state, dispatch);
      dispatch(toggleSpinner());
    }, 2000); //Give 2 sec gap so that the screen is loaded correctly
    afterDSignDone(action,dispatch);;
    dispatch(handleField("newApplication","components.div1","visible",true));
  }
  else //For Fresh application
  {
    dispatch(toggleSpinner());
    setTimeout(() => {     
      setNewApplicationScreen(action,state, dispatch);
      const businessService = "LAMS";
      const workflowAction = "APPLY";
      dispatch(prepareFinalObject("lamsStore.removedDocs", {})); //Clear all the data first
      dispatch(prepareFinalObject("lamsStore.uploadedDocsInRedux", {})); //Clear all the data first
      dispatch(prepareFinalObject("lamsStore.Lease[0]", {})); //Clear all the data first
      dispatch(prepareFinalObject("lamsStore.Lease[0].businessService", businessService));
      dispatch(prepareFinalObject("lamsStore.Lease[0].action", workflowAction));
      dispatch(prepareFinalObject("lamsStore.Lease[0].tenantId", ""));
      dispatch(toggleSpinner());
    }, 2000); //Give 2 sec gap so that the screen correctly
  }
}

const initPostDSignSuccessScreen = (action, state, dispatch) => {

  setPostDSignSuccessScreen(action,state, dispatch);
  afterDSignDone(action,dispatch);;  
}

const newApplication = {
  uiFramework: "material-ui",
  name: "newApplication",
  beforeInitScreen:(action, state, dispatch) => {

    // let aspTxnID = localStorageGet("dSign.aspTxnID");  //get(state.screenConfiguration.preparedFinalObject , "lamsStore.dSign.aspTxnID");
    // let initiated = localStorageGet("dSign.initiated");
    // let dSignSuccess = getQueryArg(window.location.href, "success");
    // if(aspTxnID && initiated && dSignSuccess)
    // {
    //   initPostDSignSuccessScreen(action,state,dispatch);
    // }
    // else
    // {
    //   initFreshScreen(action,state, dispatch);
    // }
    
    initFreshScreen(action,state, dispatch);
    return action;
  },
  components: {
    div2:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
      },
      children: {
        details: OwnerInfoCard
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false: checkIfCitizenEditScreen()? false: true
    },
    div1:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
      },
      children: {
        details: newApplicationDetailsCard
      },
      visible: checkIfCitizenEditScreen()?false:true
    },
    div3:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
      },
      children: {
        details: newApplicationDocumentsCard
      },
      visible: checkIfCitizenEditScreen()?true:false
    },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        details: footer
      },
    },
  }
};


export default newApplication;