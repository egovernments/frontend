import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonGrayCard,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import generateReceipt from "../utils/receiptPdf";
import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField ,prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import {
  getQueryArg,
  setBusinessServiceDataToLocalStorage,
  getFileUrlFromAPI,setDocuments
} from "egov-ui-framework/ui-utils/commons";
import { getSearchResults } from "../../../../ui-utils/commons";
import {
  createEstimateData,
  setMultiOwnerForSV,
  setValidToFromVisibilityForSV,
  getDialogButton,
  showHideAdhocPopup,
  getEpochForDate,
  convertEpochToDateForEndDateYMD,
  convertDateToEpoch,
  convertDateTimeToEpoch
} from "../utils";


import { footerReview, downloadPrintContainer,footerReviewTop  } from "./applyResource/footer";
import {
  getFeesEstimateCard,
  getHeaderSideText,
  getTransformedStatus
} from "../utils";
import { getReviewTrade } from "./applyResource/review-trade";
import { getReviewOwner } from "./applyResource/review-owner";
import { getReviewDocuments } from "./applyResource/review-documents";
import { getDeclaration }from "./applyResource/declaration";
import { loadReceiptGenerationData } from "../utils/receiptTransformer";
import { adhocPopup } from "./applyResource/adhocPopup";


const tenantId = getQueryArg(window.location.href, "tenantId");
let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
let headerSideText = { word1: "", word2: "" };

const getTradeTypeSubtypeDetails = payload => {
  const tradeUnitsFromApi = get(
    payload,
    "Licenses[0].tradeLicenseDetail.tradeUnits",
    []
  );
  const tradeUnitDetails = [];
  tradeUnitsFromApi.forEach(tradeUnit => {
    const { tradeType } = tradeUnit;
    const tradeDetails = tradeType.split(".");
    tradeUnitDetails.push({
      trade: get(tradeDetails, "[0]", ""),
      tradeType: get(tradeDetails, "[1]", ""),
      tradeSubType: get(tradeDetails, "[2]", "")
    });
  });
  return tradeUnitDetails;
};

const searchResults = async (action, state, dispatch, applicationNo) => {
  let queryObject = [
    { key: "tenantId", value: tenantId },
    { key: "applicationNumber", value: applicationNo }
  ];
  let payload = await getSearchResults(queryObject);

  headerSideText = getHeaderSideText(
    get(payload, "Licenses[0].status"),
    get(payload, "Licenses[0].licenseNumber")
  );
  set(payload, "Licenses[0].headerSideText", headerSideText);

  let rebateAmount = get(payload, "Licenses[0].tradeLicenseDetail.adhocExemption");
  set(payload, "Licenses[0].assignee", []);
  get(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") &&
  get(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(
    "."
  )[0] === "INDIVIDUAL"
    ? setMultiOwnerForSV(action, true)
    : setMultiOwnerForSV(action, false);

  if(rebateAmount && rebateAmount < 0){
    set(payload, "Licenses[0].tradeLicenseDetail.adhocExemption", -rebateAmount);
  }
  // set(payload, "Licenses[0].assignee", []);
  // get(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") &&
  //   get(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(
  //     "."
  //   )[0] === "INDIVIDUAL"
  //   ? setMultiOwnerForSV(action, true)
  //   : setMultiOwnerForSV(action, false);
  //
  // if (get(payload, "Licenses[0].licenseType")) {
  //   setValidToFromVisibilityForSV(
  //     action,
  //     get(payload, "Licenses[0].licenseType")
  //   );
  // }

  // get(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") &&
  // get(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(
  //   "."
  // )[0] === "INDIVIDUAL"
  //   ? setMultiOwnerForSV(action, true)
  //   : setMultiOwnerForSV(action, false);

  // if (get(payload, "Licenses[0].licenseType")) {
  //   setValidToFromVisibilityForSV(
  //     action,
  //     get(payload, "Licenses[0].licenseType")
  //   );
  // }

  await setDocuments(
    payload,
    "Licenses[0].tradeLicenseDetail.applicationDocuments",
    "LicensesTemp[0].reviewDocData",
    dispatch,'TL'
  );

  let sts = getTransformedStatus(get(payload, "Licenses[0].status"));
  payload && dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));

  //set business service data

  const businessService = get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].workflowCode"
  );
  const businessServiceQueryObject = [
    { key: "tenantId", value: tenantId },
    {
      key: "businessServices",
      value: businessService ? businessService : "NewTL"
    }
  ];

  await setBusinessServiceDataToLocalStorage(businessServiceQueryObject, dispatch);

  //set Trade Types

  payload &&
    dispatch(
      prepareFinalObject(
        "LicensesTemp[0].tradeDetailsResponse",
        getTradeTypeSubtypeDetails(payload)
      )
    );
  const LicenseData = payload.Licenses[0];
  const fetchFromReceipt = sts !== "pending_payment";


  // generate estimate data
  createEstimateData(
    LicenseData,
    "LicensesTemp[0].estimateCardData",
    dispatch,
    {},
    fetchFromReceipt
  );
};

export const beforeInitFn = async (action, state, dispatch, applicationNumber) => {
  //Search details for given application Number
  if (applicationNumber) {
    !getQueryArg(window.location.href, "edited") &&
      (await searchResults(action, state, dispatch, applicationNumber));

   //check for renewal flow
    const licenseNumber = get(
      state.screenConfiguration.preparedFinalObject,
      `Licenses[0].licenseNumber`
    );
    let queryObjectSearch = [
      {
        key: "tenantId",
        value: tenantId
      },
      { key: "offset", value: "0" },
      { key: "licenseNumbers", value: licenseNumber}
    ];
    const payload = await getSearchResults(queryObjectSearch);
    const length = payload && payload.Licenses.length > 0 ? get(payload,`Licenses`,[]).length : 0;
    dispatch(prepareFinalObject("licenseCount" ,length));
    const status = get(
      state,
      "screenConfiguration.preparedFinalObject.Licenses[0].status"
    );    
    const applicationType = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].applicationType"
    );

    const payloadStatus = get(payload,`Licenses[0].status`,null);
    const payloadType = get(payload,`Licenses[0].applicationType`,null);
    const LicensevalidToDate = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].validTo"
    );

   let LicenseExpiryDate = LicensevalidToDate-1000;


   let date = new Date();

   //let date = new Date().toISOString().slice(0,10);

   let currentDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay();
       
   let limitEpochDate = convertDateTimeToEpoch("01-01-2021 00:00:00");

   let currentDatetoEpoch = convertDateToEpoch(currentDate);

   const financialYear = get(
     state,
     "screenConfiguration.preparedFinalObject.Licenses[0].financialYear"
   );
  if(status !== "INITIATED"){

  if(process.env.REACT_APP_NAME === "Citizen" )
  {

     const footer = footerReview(
      action,
      state,
      dispatch,
      status,
      applicationNumber,
      tenantId,
      financialYear
    ); 

    set(action, "screenConfig.components.footer", footer)  
    
   //if(status ==="APPROVED" && applicationType ==="NEW" && licene_expiry_date>=limit_date)
    if(payloadStatus ==="APPROVED" && payloadType ==="NEW" && ((currentDatetoEpoch<LicenseExpiryDate && currentDatetoEpoch>=limitEpochDate )||(currentDatetoEpoch>LicenseExpiryDate)))

    {
      dispatch(handleField(
        "search-preview",
        "components.div.children.reviewDeclaration.children.cardContent.children.headerDiv",
        "visible",
        true
      ));      
    }
    else if (payloadStatus ==="EXPIRED")
    {
      dispatch(handleField(
        "search-preview",
        "components.div.children.reviewDeclaration.children.cardContent.children.headerDiv",
        "visible",
        true
      ));

    }
    else if(payloadType ==="RENEWAL")
    {
      dispatch(handleField(
        "search-preview",
        "components.div.children.reviewDeclaration.children.cardContent.children.headerDiv",
        "visible",
        false
      ))
      set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.submitButton.props.visible", false)
      // dispatch(
      //   handleField(
      //     "search-preview",
      //     "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
      //     "props.visible",
      //     false
      //   )
      // );
      set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.editButton.props.visible", false)

      // dispatch(
      //   handleField(
      //     "search-preview",
      //     "components.div.children.footer.children.container.children.rightdiv.children.editButton",
      //     "props.visible",
      //     false
      //   )
      // );

    }
    else    {
      dispatch(handleField(
        "search-preview",
        "components.div.children.reviewDeclaration.children.cardContent.children.headerDiv",
        "visible",
        false
      ));
     //set(action, "screenConfig.components.footer", {})

         set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.submitButton", {})
         set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.editButton", {})

    //  set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.submitButton.props.visible", false)

      // dispatch(
      //   handleField(
      //     "search-preview",
      //     "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
      //     "props.visible",
      //     false
      //   )
      // );
     // set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.editButton.props.visible", false)

      // dispatch(
      //   handleField(
      //     "search-preview",
      //     "components.div.children.footer.children.container.children.rightdiv.children.editButton",
      //     "props.visible",
      //     false
      //   )
      // );

    }
   }
  }
  else
  {
    dispatch(handleField(
      "search-preview",
      "components.div.children.reviewDeclaration.children.cardContent.children.headerDiv",
      "visible",
      false
    ));   
  }
   

  if (status === "REJECTED"|| status ==="PENDINGPAYMENT" || status ==="APPROVED") {
      console.log("=====status=123======" + status + "============");
      // set(
      //   action.screenConfgig,
      //   "components.div.children.tradeReviewDetails.children.cardContent.children.addPenaltyRebateButton.visible",
      //   false
      // );

      dispatch(
        handleField(
          "search-preview",
          "components.div.children.tradeReviewDetails.children.cardContent.children.addPenaltyRebateButton",
          "visible",
          false
        )
      );
    }

    // const financialYear = get(
    //   state,
    //   "screenConfiguration.preparedFinalObject.Licenses[0].financialYear"
    // );

    let data = get(state, "screenConfiguration.preparedFinalObject");

    get(data, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory") &&
      get(data, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory").split(
        "."
      )[0] === "INDIVIDUAL"
      ? setMultiOwnerForSV(action, true)
      : setMultiOwnerForSV(action, false);

    if (get(data, "Licenses[0].licenseType")) {
      setValidToFromVisibilityForSV(
        action,
        get(data, "Licenses[0].licenseType")
      );
    }

    const obj = setStatusBasedValue(status);
    if (get(data, "Licenses[0].tradeLicenseDetail.applicationDocuments")) {
      await setDocuments(
        data,
        "Licenses[0].tradeLicenseDetail.applicationDocuments",
        "LicensesTemp[0].reviewDocData",
        dispatch,'TL'
      );
    }

    const statusCont = {
      word1: {
        ...getCommonTitle(
          {
            jsonPath: "Licenses[0].headerSideText.word1"
          },
          {
            style: {
              marginRight: "10px",
              color: "rgba(0, 0, 0, 0.6000000238418579)"
            }
          }
        )
      },
      word2: {
        ...getCommonTitle({
          jsonPath: "Licenses[0].headerSideText.word2"
        })
      },
      cancelledLabel: {
        ...getCommonHeader(
          {
            labelName: "Cancelled",
            labelKey: "TL_COMMON_STATUS_CANC"
          },
          { variant: "body1", style: { color: "#E54D42" } }
        ),
        visible: false
      }
    };

    const printCont = downloadPrintContainer(
      action,
      state,
      dispatch,
      status,
      applicationNumber,
      tenantId
    );
    const CitizenprintCont=footerReviewTop(
      action,
      state,
      dispatch,
      status,
      applicationNumber,
      tenantId,
      financialYear
    );

    console.log("prasad status", status)

    process.env.REACT_APP_NAME === "Citizen"
      ? set(
          action,
          "screenConfig.components.div.children.headerDiv.children.helpSection.children",
          CitizenprintCont
        )
      : set(
          action,
          "screenConfig.components.div.children.headerDiv.children.helpSection.children",
          printCont
        );
     
        let dvalue =  get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tradeLicenseDetail.additionalDetail.declaration")

        if(dvalue === undefined )
        {
         dispatch(prepareFinalObject("Licenses[0].tradeLicenseDetail.additionalDetail.declaration",false));
        }

      
    // Get approval details based on status and set it in screenconfig

    if (
      status === "APPROVED" ||
      status === "REJECTED" ||
      status === "CANCELLED"
    ) {
      set(
        action,
        "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible",
        true
      );

      if (get(data, "Licenses[0].tradeLicenseDetail.verificationDocuments")) {
        await setDocuments(
          data,
          "Licenses[0].tradeLicenseDetail.verificationDocuments",
          "LicensesTemp[0].verifyDocData",
          dispatch,'TL'
        );
      } else {
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl",
            "visible",
            false
          )
        );
      }
    } else {
      set(
        action,
        "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible",
        false
      );
    }



    const headerrow = getCommonContainer({
      header: getCommonHeader({
        labelName: "Trade License Application (2018-2019)",
        labelKey: applicationType === "RENEWAL"? "TL_TRADE_RENEW_APPLICATION":"TL_TRADE_APPLICATION"
      }),
    applicationLicence:getCommonContainer({
      applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-tradelicence",
        componentPath: "ApplicationNoContainer",
        props: {
          number: applicationNumber
        }
      },
      licenceNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-tradelicence",
        componentPath: "licenceNoContainer",
        visible: licenseNumber? true : false,
        props: {
          number: licenseNumber,
        }
      }
    })
    });
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.headertop",
      headerrow
    );




    if (status === "cancelled")
      set(
        action,
        "screenConfig.components.div.children.headerDiv.children.helpSection.children.cancelledLabel.visible",
        true
      );
      setActionItems(action, obj);
    // loadReceiptGenerationData(applicationNumber, tenantId);
      set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.editButton.props.disabled", false)

      //
      // dispatch(
      //   handleField(
      //     "search-preview",
      //     "components.div.children.footer.children.container.children.rightdiv.children.editButton",
      //     "props.disabled",
      //     false
      //   )
      // );
      set(action, "screenConfig.components.footer.children.container.children.rightdiv.children.submitButton.props.disabled", false)

      // dispatch(
      //   handleField(
      //     "search-preview",
      //     "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
      //     "props.disabled",
      //     false
      //   )
      // );

  }

  //let declaration_value =  get(state.screenConfiguration.preparedFinalObject.Licenses[0], "tradeLicenseDetail.additionalDetail.declaration")

 /*  set(
    action,
    "screenConfig.search-preview.components.div.children.footer.children.container.children.rightdiv.children.editButton.visible",
    false
  ); */


 /*  dispatch(
    handleField(
      "search-preview",
      "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
      "visible",
      false
    )
  );  */

/*  if (declaration_value) {
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.footer.children.container.children.rightdiv.children.editButton",
      "visible",
      false
    )
  );
}
else
{
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
      "visible",
      false
    )
  );
}    */
/* const licenseCount = get(
  state,
  "screenConfiguration.preparedFinalObject.licenseCount"
);
console.log("Before Filed in licenseCount", licenseCount);
if(licenseCount>0)
{
dispatch(
  handleField(
    "search-preview",
    "components.div.children.declaration",
    "visible",
    true
  )
);
}
else
{
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.declaration",
      "visible",
      true
    )
  );
} */

};

let titleText = "";

const setStatusBasedValue = status => {
  switch (status) {
    case "approved":
      return {
        titleText: "Review the Trade License",
        titleKey: "TL_REVIEW_TRADE_LICENSE",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "pending_payment":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "TL_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_CEMP"]
        }
      };
    case "pending_approval":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "TL_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "cancelled":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
    case "rejected":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };

    default:
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
  }
};

const headerrow = getCommonContainer({
});

const estimate = getCommonGrayCard({
  estimateSection: getFeesEstimateCard({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

const reviewTradeDetails = getReviewTrade(false);

const getULBCard = () => {
  return getCommonContainer(
    {
      headerDiv: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-tradelicence",
        componentPath: "ULBSummaryCard",
        props: {
          style: { marginBottom: "10px" },
          sourceJsonPath: "mdmsDataForReceipt",
          logopath: "base64UlbLogo"
        }
      }
    },
    { style: { justifyContent: "center", display: "none" } }
  );
};

const ulbCard = getULBCard();

const reviewOwnerDetails = getReviewOwner(false);

const reviewDocumentDetails = getReviewDocuments(false, false);

const reviewDeclaration = getDeclaration(false);


// let approvalDetails = getApprovalDetails(status);
let title = getCommonTitle({ labelName: titleText });

const setActionItems = (action, object) => {
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title",
    getCommonTitle({
      labelName: get(object, "titleText"),
      labelKey: get(object, "titleKey")
    })
  );
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title.visible",
    get(object, "titleVisibility")
  );
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title.roleDefination",
    get(object, "roleDefination")
  );
};

export const tradeReviewDetails = getCommonCard({
  title,
  estimate,
  // viewBreakupButton: getDialogButton(
  //   "VIEW BREAKUP",
  //   "TL_PAYMENT_VIEW_BREAKUP",
  //   "search-preview"
  // ),
  addPenaltyRebateButton: {
    componentPath: "Button",
    props: {
      color: "primary",
      style: {}
    },
    children: {
      previousButtonLabel: getLabel({
        labelName: "ADD REBATE/PENALTY",
        labelKey: "TL_PAYMENT_ADD_RBT_PEN"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: showHideAdhocPopup
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["TL_APPROVER","TL_DOC_VERIFIER"]
    }
  },
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails,

});

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {

    const status = getQueryArg(window.location.href, "status");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));

    //To set the application no. at the  top
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.applicationNumber.props.number",
      applicationNumber
    );
    if (status !== "pending_payment") {
      set(
        action.screenConfgig,
        "components.div.children.tradeReviewDetails.children.cardContent.children.viewBreakupButton.visible",
        false
      );
    }

    const queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessServices", value: "NewTL" }
    ];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);
    beforeInitFn(action, state, dispatch, applicationNumber);
    loadReceiptGenerationData(applicationNumber, tenantId);
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
        ulbheader: ulbCard,
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
          moduleName: "egov-workflow",
          // visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "Licenses",
            moduleName: "NewTL",
            updateUrl: "/tl-services/v1/_update",
            beforeSubmitHook:
              (data) =>{
                 let rebateAmount = data[0].tradeLicenseDetail.adhocExemption;
                 if(rebateAmount && rebateAmount > 0){
                   data = set(data, "[0].tradeLicenseDetail.adhocExemption", -rebateAmount);
                 }
                 return data;
              }

          }
        },
   /*       actionDialog: {
          uiFramework: "custom-containers-local",
          componentPath: "ResubmitActionContainer",
          moduleName: "egov-tradelicence",
          visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
          props: {
            open: true,
            dataPath: "Licenses",
            moduleName: "NewTL",
            updateUrl: "/tl-services/v1/_update",
            data: {
              buttonLabel: "RESUBMIT",
              moduleName: "NewTL",
              isLast: false,
              dialogHeader: {
                labelName: "RESUBMIT Application",
                labelKey: "WF_RESUBMIT_APPLICATION"
              },
              showEmployeeList: false,
              roles: "CITIZEN",
              isDocRequired: false
            }
          }
        }, 
        actionDialog: {
          uiFramework: "custom-containers-local",
          componentPath: "ResubmitActionContainer",
          moduleName: "egov-tradelicence",
          visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
          props: {
            open: true,
            dataPath: "Licenses",
            moduleName: "NewTL",
            updateUrl: "/tl-services/v1/_update",
            data: {
              buttonLabel: "RESUBMIT",
              moduleName: "NewTL",
              isLast: false,
              dialogHeader: {
                labelName: "RESUBMIT Application",
                labelKey: "WF_RESUBMIT_APPLICATION"
              },
              showEmployeeList: false,
              roles: "CITIZEN",
              isDocRequired: false
            }
          }
        }, */
        tradeReviewDetails,
        reviewDeclaration
      }
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
        popup: adhocPopup
      }
    }
  }
};

export default screenConfig;
