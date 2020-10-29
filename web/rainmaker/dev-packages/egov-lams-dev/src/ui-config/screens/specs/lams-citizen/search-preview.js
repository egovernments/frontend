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

import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
import { localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import {getMdmsData, loadMdmsData} from "../lams-utils/utils";
import {workflowCode, businessService} from "../lams-utils/utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getQueryArg , setDocuments} from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { value } from "jsonpath";
import { validateForm } from "egov-ui-framework/ui-redux/screen-configuration/utils";
import { validateFields } from "../utils";
import { toggleSpinner , toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import {documentList} from "./documentList";
import {popup} from "./popup"
import {showHideAdhocPopup, getDialogButton} from "../utils"
import { getReviewDocuments } from "./review-documents";
import {userDetailsCard} from "./userDetailsCard";
import {leaseDetailsCardReview} from "./leaseDetailsCardReview";

import { workflowMasterData, leaseData , 
  licenseData, 
  licenseDataPDDE, licenseDataDGDE, licenseDataMOD, licenseDataApproved,
  LicensesTemp,  businessServiceData, sampleSearchResponse} from "./sampleData";

let applicationNumber = getQueryArg(window.location.href, "applicationNumber");

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

const callBackSubmit =() => {
  alert("In the call back submit ");
}

export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "LAMS_COMMON_SUBMIT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackSubmit
    },
    visible: true
  }
});

const headerrow = getCommonContainer({
});


let titleText= "Application Details ";
let title = getCommonTitle({ labelName: titleText });
const reviewDocumentDetails = getReviewDocuments(false, false);

export const leaseRenewalReviewDetails = getCommonCard({
  title,
  //estimate,
  // addPenaltyRebateButton: {
  //   componentPath: "Button",
  //   props: {
  //     color: "primary",
  //     style: {}
  //   },
  //   children: {
  //     previousButtonLabel: getLabel({
  //       labelName: "ADD GARBAGE CHARGES",
  //       labelKey: "TL_PAYMENT_ADD_RBT_PEN"
  //     })
  //   },
  //    onClickDefination: {
  //      action: "condition",
  //      callBack: showHideAdhocPopup
  //    },
  //   roleDefination: {
  //     rolePath: "user-info.roles",
  //     roles: ["TL_FIELD_INSPECTOR"]
  //   },
  //   visible: false
  // },
  // viewBreakupButton: getDialogButton(
  //   "VIEW BREAKUP",
  //   "TL_PAYMENT_VIEW_BREAKUP",
  //   "search-preview"
  // ),
  //reviewTradeDetails,
  //reviewOwnerDetails,
  userDetailsCard,
  leaseDetailsCardReview,
  reviewDocumentDetails
});

let loadLeaseDetails = async () => {
  alert("Trying to search ");
  try{
    //dispatch(toggleSpinner());
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
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
    //dispatch(toggleSpinner());
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

const searchPreview = {
  uiFramework: "material-ui",
  name: "searchPreview",
  beforeInitScreen:(action, state, dispatch) => {
    //const queryValue = getQueryArg(window.location.href, "applicationNumber");
    alert("In the search preview "+applicationNumber);

    let response = loadLeaseDetails();
    if(response && response.length > 0 && response.leases)
      dispatch(prepareFinalObject("lamsStore.Lease", response.leases));

    //toberemoved
    dispatch(prepareFinalObject("lamsStore.Lease", sampleSearchResponse.leases));

    setDocumentsInfo(action, state, dispatch);

    //dispatch(prepareFinalObject("lamsStore.Lease[0].businessService", businessService));
    //dispatch(prepareFinalObject("lamsStore.Lease[0].workflowCode", workflowCode));
    //dispatch(prepareFinalObject("lamsStore.Lease[0].action", "APPLY"));

    //dispatch(prepareFinalObject("lamsStore.allTenants", [{code:"Agra", name:"Agra", active: true, id:"pb.agra"},{code: "Pune",name: "Pune", active: true, id:"pb.pune"}, {name: "Lucknow", code:"Lucknow", active: true, id:"pb.lucknow"}]));
    //dispatch(prepareFinalObject("lamsStore.lamsLocation", [{code:"withinCB", name:"Within CB ", active: true, id:"pb.agra"},{code: "outside CB",name: "Outside CB", active: true, id:"pb.pune"}]));
    //dispatch(prepareFinalObject("lamsStore.lamsSurveyNumber", [{code:"131-212-A", name:"131-212-A", active: true, id:"pb.agra"},{code: "131-16",name: "131-16", active: true, id:"pb.pune"},{code: "131-145",name: "131-145", active: true, id:"pb.lucknow"}]));
    //dispatch(prepareFinalObject("lamsStore.requiredDocuments", [{applicationDocuments:documentList}]));
    
    // let sampleDoc = [{
    //   "title":"TL_ELECTBILL",
    //   "link":"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=beb21a2a-63d2-4e36-b32c-35670007f89c&tenantId=pb",
    //   "linkText":"View",
    //   "name":"Document - 1",
    // }];

    //dispatch(prepareFinalObject("lamsStore.LeaseTemp[0].reviewDocData", sampleDoc));
    //dispatch(prepareFinalObject("lamsStore.Leases", leaseData))
    dispatch(prepareFinalObject("LicensesTemp", LicensesTemp))
    localStorageSet("businessServiceData", JSON.stringify(businessServiceData));

    const testAt = getQueryArg(window.location.href, "testAt");
    switch(testAt)
    {
      case "CEODEO":     dispatch(prepareFinalObject("Licenses", licenseData)); break;//licenseData, licenseDataCEODEO, licenseDataPDDE      ; break;
      case "PDDE":    dispatch(prepareFinalObject("Licenses", licenseDataPDDE)); break;//licenseData, licenseDataCEODEO, licenseDataPDDE      ; break;
      case "DGDE" : dispatch(prepareFinalObject("Licenses", licenseDataDGDE)); break;
      case "MOD" : dispatch(prepareFinalObject("Licenses", licenseDataMOD)); break;
      case "approved" :  dispatch(prepareFinalObject("Licenses", licenseDataApproved)); break;
    }
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
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
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-lams",//"egov-workflow",//"egov-lams",
          // visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "lamsStore.Lease",
            moduleName: "NewLAMS_LR",  //tobechanged
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
        //     moduleName: "NewLAMS_LR",
        //     updateUrl: "/tl-services/v1/_update",
        //     data: {
        //       buttonLabel: "RESUBMIT",
        //       moduleName: "NewLAMS_LR",
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
      }
    },
    //footer,
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
export default searchPreview;