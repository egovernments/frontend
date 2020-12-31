import {
  getCommonCardWithHeader,
  getLabel,
  getCommonCard,
  getDivider,

  getCommonContainer, getCommonGrayCard, getCommonHeader,getCommonSubHeader,

  getCommonTitle,

} from "egov-ui-framework/ui-config/screens/specs/utils";

import get from "lodash/get";
import set from "lodash/set";

import { localStorageGet, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";


import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
import {getMdmsData, loadMdmsData} from "../lams-utils/utils";
import {setDocsForEditFlow} from "../lams-utils/utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getQueryArg , setDocuments} from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { value } from "jsonpath";
import { validateForm } from "egov-ui-framework/ui-redux/screen-configuration/utils";
import { validateFields } from "../utils";
import { toggleSpinner , toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import {popup} from "./searchPreviewResource/popup"
import {showHideAdhocPopup, getDialogButton} from "../utils"
import { getReviewDocuments } from "./searchPreviewResource/review-documents";
import {userDetailsCard} from "./searchPreviewResource/userDetailsCard";
import {leaseDetailsCardReview} from "./searchPreviewResource/leaseDetailsCardReview";
import {constructQueryParamsBasedOnCurrentWorkflowType} from "../../../../ui-utils/commons";

import { workflowMasterData, leaseData , 
  licenseData, 
  licenseDataPDDE, licenseDataDGDE, licenseDataMOD, licenseDataApproved,
  LicensesTemp,  businessServiceData, sampleSearchResponse} from "../lams-utils/sampleData";

let applicationNumber = getQueryArg(window.location.href, "applicationNumber");

const headerrow = getCommonContainer({
});

let titleText= "Application Details";
let title = getCommonTitle({ labelName: titleText ,labelKey :"LAMS_APPLICATION_DETAILS" });
const reviewDocumentDetails = getReviewDocuments(false, false);

export const leaseRenewalReviewDetails = getCommonCard({
  title,
  userDetailsCard,
  leaseDetailsCardReview,
  reviewDocumentDetails
});


let loadLeaseDetails = async (action, state, dispatch) => {
  try{
    //dispatch(toggleSpinner());
    applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const queryParams = [{ key: "applicationNumber", value: applicationNumber },
      { key: "tenantId", value: tenantId }
    ];
    let payload = null;
    payload = await httpRequest(
      "post",
      "lams-services/v1/_search",
      "_search",
      queryParams,
      {}
    );
    return payload;
  }
  catch(e)
  {
    toggleSnackbar(
      true,
      {
        labelName: "Could not load lease Details",
        labelKey: "LAMS_API_ERROR"
      },
      "error"
    );
  }
  return null;
}

let loadWorkflowMasterData = async (action, state, dispatch) => {
  try{
    const queryParams = constructQueryParamsBasedOnCurrentWorkflowType(state);
    //console.log("The query params is ", queryParams);
    let payload = null;
    payload = await httpRequest(
      "post",
      "egov-workflow-v2/egov-wf/businessservice/_search",
      "_search",
      queryParams,
      {}
    );
    
    return payload;
  }
  catch(e)
  {
    toggleSnackbar(
      true,
      {
        labelName: "Could not load Workflow Master Details",
        labelKey: "LAMS_API_ERROR"
      },
      "error"
    );
  }
  return null;
};

let setDocumentsInfo = async (action, state, dispatch) => {
  //Set correct documents value
  let data = get(state, "screenConfiguration.preparedFinalObject");
  if (get(data, "lamsStore.Lease[0].leaseDetails.applicationDocuments")) {
    await setDocuments(
      data,
      "lamsStore.Lease[0].leaseDetails.applicationDocuments",
      "lamsStore.LeaseTemp[0].reviewDocData",
      dispatch, 'LAMS'
    );
  }
}

const asdfa = () =>{
  
}
const searchPreview = {
  uiFramework: "material-ui",
  name: "searchPreview",
  beforeInitScreen: (action, state, dispatch) => {
    applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    loadLeaseDetails(action, state, dispatch).then((response)=>{
      if(response && response.leases && response.leases.length > 0)
      {
        dispatch(prepareFinalObject("lamsStore.Lease", response.leases));
        
        //This is used for edit flow, if required. This puts the documents data to redux. Which is used to show
        //uploaded documents, which can be editted also.
        setDocsForEditFlow(state,dispatch); 
      }
      
      //toberemoved
      if(!response.leases || response.leases.length == 0 || 
        (response.leases && response.leases.length>0 && response.leases[0].userDetails && response.leases[0].userDetails.length == 0) ||
        (response.leases && response.leases.length>0 && !response.leases[0].leaseDetails))
      {
        alert("Some values missing! Showing Default values");
        dispatch(prepareFinalObject("lamsStore.Lease", sampleSearchResponse.leases));
      }

      setDocumentsInfo(action, state, dispatch);

      dispatch(prepareFinalObject("LicensesTemp", LicensesTemp))

      //tobechanged  uncomment below code
      loadWorkflowMasterData(action, state, dispatch).then((response)=>{
        let businessServiceData = response;
        localStorageSet("businessServiceData", JSON.stringify(businessServiceData.BusinessServices));
        //alert("Recieved full BusinessService Data");
        let fullContainer = getFullContainer(action, state, dispatch);
        set(action, "screenConfig.components.div.children", fullContainer);
        //alert("Setting done");
      });
    });
    //localStorageSet("businessSeraiceData", JSON.stringify(businessServiceData));

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "search-preview"
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "search-preview"
      },
      children: {
        popup: popup
      }
    }
  }
};

const getFullContainer = (
  action, state, dispatch
) => {
  return {
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header1: {
          gridDefination: {
            xs: 12,
            sm: 8
          },
          ...headerrow
        },
        helpSection: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          props: {
            color: "primary",
            style: { justifyContent: "flex-end" }
          },
          gridDefination: {
            xs: 12,
            sm: 4,
            align: "right"
          }
        }
      }
    },
    applicationNumber2: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-lams",
      componentPath: "ApplicationNo",
      props: {
        number: applicationNumber,
        label:{
          labelKey:"LAMS_TABLE_COL_APP_NO",
          labelValue:"Appl No: "
        } 
      }
    },
    taskStatus: {
      uiFramework: "custom-containers-local",
      componentPath: "WorkFlowContainer",
      moduleName: "egov-lams",//"egov-workflow",//"egov-lams",
      // visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
      props: {
        dataPath: "lamsStore.Lease",
        moduleName:  "", //"LAMS_NewLR_CEO_V3",//get(state, "screenConfiguration.preparedFinalObject.lamsStore.Lease[0].workflowCode"),//"LAMS_NewLR_V2",  //tobechanged
        //Dont send moduleName here. Pick this up from the state inside WorkflowContainer 
        //For this to work, the application data should be loaded and data should be ready.(Done in beforeInitScreen)
        updateUrl: "/lams-services/v1/_update"
      }
    },
    // actionDialog: {
    //   uiFramework: "custom-containers-local",
    //   componentPath: "ResubmitActionContainer",
    //   moduleName: "egov-tradelicence",
    //   visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
    //   props: {
    //     open: true,
    //     dataPath: "Licenses",
    //     moduleName: "LAMS_NewLR_V2",
    //     updateUrl: "/tl-services/v1/_update",
    //     data: {
    //       buttonLabel: "RESUBMIT",
    //       moduleName: "LAMS_NewLR_V2",
    //       isLast: false,
    //       dialogHeader: {
    //         labelName: "RESUBMIT Application",
    //         labelKey: "WF_RESUBMIT_APPLICATION"
    //       },
    //       showEmployeeList: false,
    //       roles: "CITIZEN",
    //       isDocRequired: false
    //     }
    //   }
    // },
    leaseRenewalReviewDetails,
  };
}

export default searchPreview;