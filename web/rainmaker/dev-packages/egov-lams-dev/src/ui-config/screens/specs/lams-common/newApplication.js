import {
  prepareFinalObject,  handleScreenConfigurationFieldChange as handleField 
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object

import {loadMdmsData, loadLeaseDetails, loadLeaseDetails2, setDocsForEditFlow} from "../lams-utils/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {newApplicationDetailsCard, newApplicationDocumentsCard, OwnerInfoCard} from "./newApplicationDetailsCard";
import {checkIfCitizenEditScreen} from "../lams-utils/utils";
import {footer} from "./newApplicationFooter";
import {documentList} from "./documentList";
import { ifUserRoleExists } from "../utils";
import get from "lodash/get";
import jp from "jsonpath";

const newApplication = {
  uiFramework: "material-ui",
  name: "newApplication",
  beforeInitScreen:(action, state, dispatch) => {

    const LeaseRenewalWorkflowCode = "LAMS_NewLR_V2";
    const businessService = "LAMS";
    const workflowAction = "APPLY";

    dispatch(prepareFinalObject("lamsStore.removedDocs", {})); //Clear all the data first
    dispatch(prepareFinalObject("lamsStore.uploadedDocsInRedux", {})); //Clear all the data first
    dispatch(prepareFinalObject("lamsStore.Lease[0]", {})); //Clear all the data first
    dispatch(prepareFinalObject("lamsStore.Lease[0].businessService", businessService));
    dispatch(prepareFinalObject("lamsStore.Lease[0].workflowCode", LeaseRenewalWorkflowCode));
    dispatch(prepareFinalObject("lamsStore.Lease[0].action", workflowAction));
   
    loadMdmsData(action, state, dispatch).then((response) => {
      const tenants = get(response, "MdmsRes.tenant.tenants");
      //Requires City Module Updations of MDMS? tobechanged
      let jpFilter = "$[?(@.code != 'pb')]";
      let onlyCBs = jp.query(tenants, jpFilter);
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

      const queryParams = [{ key: "applicationNumber", value: applicationNumber },
        { key: "tenantId", value: tenantId }
      ];
      loadLeaseDetails2(action, state, dispatch, queryParams).then((response)=>{
        dispatch(prepareFinalObject("lamsStore.Lease", response.leases));
        setDocsForEditFlow(state,dispatch);
        dispatch(prepareFinalObject("lamsStore.Lease[0].action", workflowAction));
        dispatch(
          handleField(
            "newApplication",
            "components.div1",
            "visible",
            false
          )
        );
      });
    }

    if(checkIfCitizenEditScreen())
    {
      dispatch(
        handleField(
          "newApplication",
          "components.div1",
          "visible",
          false
        )
      );
    }
    else
    {
      dispatch(
        handleField(
          "newApplication",
          "components.div1",
          "visible",
          true
        )
      );
    }
    return action;
  },
  components: {
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
    div2:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
      },
      children: {
        details: OwnerInfoCard
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false: true
    },
    newApplicationDocumentsCard,
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