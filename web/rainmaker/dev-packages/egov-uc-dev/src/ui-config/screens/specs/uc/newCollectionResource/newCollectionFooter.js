import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { convertDateToEpoch } from "../../utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { ifUserRoleExists } from "../../utils";
import { validateFields } from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getCommonPayUrl } from "egov-ui-framework/ui-utils/commons";
import commonConfig from "config/common.js";

const tenantId = getTenantId();
export const getRedirectionURL = () => {
  const redirectionURL = ifUserRoleExists("EMPLOYEE") ? "/uc/pay" : "/inbox";
  return redirectionURL;
};

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

export const newCollectionFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "Generate Challan",
        labelKey: "UC_ECHALLAN"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
       // processDemand(state, dispatch);
          processChallan(state, dispatch);
      }
    }
  }
});

const convertDateFieldToEpoch = (finalObj, jsonPath) => {
  const dateConvertedToEpoch = convertDateToEpoch(get(finalObj, jsonPath));
  set(finalObj, jsonPath, dateConvertedToEpoch);
};

const allDateToEpoch = (finalObj, jsonPaths) => {
  jsonPaths.forEach(jsonPath => {
    if (get(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

// const processDemand = async (state, dispatch) => {
//   const isFormValid = validateFields(
//     "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children",
//     state,
//     dispatch,
//     "newCollection"
//   );



//   console.info("validate field?",isFormValid);
//   if (isFormValid) {
//     try {
//       const mobileNumber = get(
//         state.screenConfiguration.preparedFinalObject,
//         "Demands[0].mobileNumber"
//       );
//       let payload = await httpRequest(
//         "post",
//         `/user/_search?tenantId=${commonConfig.tenantId}`,
//         "_search",
//         [],
//         {
//           tenantId: commonConfig.tenantId,
//           userName: mobileNumber
//         }
//       );
//       if (payload ) {
//         console.info("got user details==",payload);
//         const uuid = get(payload , "user[0].uuid");
//         dispatch(prepareFinalObject("Demands[0].payer.uuid" , uuid));
//         console.info("await for create demand");
//         await createDemand(state, dispatch);       
//         allDateToEpoch(state.screenConfiguration.preparedFinalObject, [
//           "Challan[0].taxPeriodFrom",
//           "Challan[0].taxPeriodTo"
//         ]);
//         const applicationNumber = get(
//           state.screenConfiguration.preparedFinalObject,
//           "Challan[0].challanNo"
//         );
//         const tenantId = get(
//           state.screenConfiguration.preparedFinalObject,
//           "Challan[0].tenantId"
//         );
//         const businessService = get(
//           state.screenConfiguration.preparedFinalObject,
//           "Challan[0].serviceType"
//         );
//         getCommonPayUrl(dispatch, applicationNumber, tenantId, businessService);
//       }
//     } catch (error) {}
//   } else {
//     dispatch(
//       toggleSnackbar(
//         true,
//         {
//           labelName: "Please fill the required fields.",
//           labelKey: "UC_REQUIRED_FIELDS_ERROR_MSG"
//         },
//         "info"
//       )
//     );
//   }
// };

const processChallan = async (state, dispatch) => {

  let isFormValid = true;

  const ucConsumerValid = validateFields(
    "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children",
    state,
    dispatch
  );  
  const ucServiceDetailValid = validateFields(
    "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch
  );
  console.info("validate ucConsumerValid form==",ucConsumerValid);
  console.info("validate ucServiceDetailValid form==",ucServiceDetailValid);
  if (
    !ucConsumerValid ||
    !ucServiceDetailValid 
  ) {
    isFormValid = false;
  }

  if (isFormValid) {
    try {
      const mobileNumber = get(
        state.screenConfiguration.preparedFinalObject,
        "Challan[0].citizen.mobileNumber"
      );
      let payload = await httpRequest(
        "post",
        `/user/_search?tenantId=${commonConfig.tenantId}`,
        "_search",
        [],
        {
          tenantId: commonConfig.tenantId,
          userName: mobileNumber
        }
      );
      if (payload ) {
        const uuid = get(payload , "user[0].uuid");        
        if(uuid){          
          dispatch(prepareFinalObject("Challan[0].accountId" , uuid));
        }
        else{          
          dispatch(prepareFinalObject("Challan[0].accountId" , ""));
        }
       
      //  await createDemand(state, dispatch);
        await createChallan(state, dispatch);       
        allDateToEpoch(state.screenConfiguration.preparedFinalObject, [
          "Challan[0].taxPeriodFrom",
          "Challan[0].taxPeriodTo"
        ]);
        const applicationNumber = get(
          state.screenConfiguration.preparedFinalObject,
          "Challan[0].challanNo"
        );
        const tenantId = get(
          state.screenConfiguration.preparedFinalObject,
          "Challan[0].tenantId"
        );
        const businessService = get(
          state.screenConfiguration.preparedFinalObject,
          "Challan[0].serviceType"
        );
        //console.info("show common pay");
        //getCommonPayUrl(dispatch, applicationNumber, tenantId, businessService);
       // getAcknowledgementCard(dispatch, applicationNumber, tenantId, businessService);
      }
    } catch (error) {}
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill the required fields.",
          labelKey: "UC_REQUIRED_FIELDS_ERROR_MSG"
        },
        "info"
      )
    );
  }
};

const createDemand = async (state, dispatch) => {
  dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
  let demands = JSON.parse(
    JSON.stringify(
      get(state.screenConfiguration.preparedFinalObject, "Demands")
    )
  );
  set(demands[0], "additionalDetails.consumerName", state.screenConfiguration.preparedFinalObject.Demands[0].consumerName);
  set(demands[0], "additionalDetails.mobileNumber", state.screenConfiguration.preparedFinalObject.Demands[0].mobileNumber);
 //GLCODE
  for (let i = 0; i < state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping.length; i++) {

    if ((state.screenConfiguration.preparedFinalObject.Demands[0].serviceType === state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping[i].code) && (state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping[i].cb === tenantId)) {
      set(demands[0], "additionalDetails.GLcode", state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping[i].glcode);
    }

  }
  // Making payer object as null if it is empty object, later will changge in component.
 if(Object.keys(demands[0].payer).length === 0) {
  demands[0].payer = null;
 }
  set(demands[0], "consumerType", demands[0].businessService);
  demands[0].demandDetails &&
    demands[0].demandDetails.forEach(item => {
      if (!item.amount) {
        item.amount = 0;
      }
    });
  demands[0].serviceType &&
    set(demands[0], "businessService", demands[0].serviceType);
  set(
    demands[0],
    "taxPeriodFrom",
    convertDateToEpoch(demands[0].taxPeriodFrom)
  );
  set(demands[0], "taxPeriodTo", convertDateToEpoch(demands[0].taxPeriodTo));
  const mobileNumber = demands[0].mobileNumber;
  const consumerName = demands[0].consumerName;
  //Check if tax period fall between the tax periods coming from MDMS -- Not required as of now
  const taxPeriodValid = isTaxPeriodValid(dispatch, demands[0], state);

  if (taxPeriodValid) {
    const url = get(
      state.screenConfiguration.preparedFinalObject,
      "Demands[0].id",
      null
    )
      ? "/billing-service/demand/_update"
      : "/billing-service/demand/_create";
    try {
      const payload = await httpRequest("post", url, "", [], {
        Demands: demands
      });
      if (payload.Demands.length > 0) {
        //const consumerCode = get(payload, "Demands[0].consumerCode");
        const businessService = get(payload, "Demands[0].businessService");
        set(payload, "Demands[0].mobileNumber", mobileNumber);
        set(payload, "Demands[0].consumerName", consumerName);
        set(payload, "Demands[0].serviceType", businessService);
        set(
          payload,
          "Demands[0].businessService",
          businessService.split(".")[0]
        );
        dispatch(prepareFinalObject("Demands", payload.Demands));
        //await generateBill(consumerCode, tenantId, businessService, dispatch);
      } else {
        alert("Empty response!!");
      }
    } catch (e) {
      console.log(e.message);
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: e.message,
            labelKey: e.message
          },
          "error"
        )
      );
    }
  }
};

const createChallan = async(state,dispatch) =>{
    console.info("creating challan");
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
    let eChallans = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Challan")
      )
    );
    //console.info("glcode length=",state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping.length);
    //set(eChallans[0], "additionalDetails.consumerName", state.screenConfiguration.preparedFinalObject.Challan[0].consumerName);
    //set(eChallans[0], "additionalDetails.mobileNumber", state.screenConfiguration.preparedFinalObject.Challan[0].mobileNumber);
   //GLCODE
    // for (let i = 0; i < state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping.length; i++) {
    //     if ((state.screenConfiguration.preparedFinalObject.Challan[0].serviceType === state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping[i].code) && (state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping[i].cb === tenantId)) {
    //     set(eChallans[0], "additionalDetails.GLcode", state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.BillingService.ServiceGLCODEMapping[i].glcode);
    //   }
  
    //  }
    // Making payer object as null if it is empty object, later will changge in component.
  
    //  if(Object.keys(eChallans[0].payer).length === 0) {
  //   eChallans[0].payer = null;
  //  }
       
    
    
    set(eChallans[0], "consumerType", eChallans[0].businessService);
    
    eChallans[0].amount &&
      eChallans[0].amount.forEach(item => {
        if (!item.amount) {
          item.amount = 0;
        }
      });
     
    eChallans[0].serviceType &&
      set(eChallans[0], "businessService", eChallans[0].serviceType);
    set(
      eChallans[0],
      "taxPeriodFrom",
      convertDateToEpoch(eChallans[0].taxPeriodFrom)
    );
    
    set(eChallans[0], "taxPeriodTo", convertDateToEpoch(eChallans[0].taxPeriodTo));
    
    const mobileNumber = eChallans[0].citizen.mobileNumber;
    const consumerName = eChallans[0].citizen.consumerName;
    //glcode
    for (let i = 0; i < state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.GLCodeMapping.length; i++) {
      if ((state.screenConfiguration.preparedFinalObject.Challan[0].serviceType === state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.GLCodeMapping[i].code) && (state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.GLCodeMapping[i].cb === state.screenConfiguration.preparedFinalObject.Challan[0].tenantId)) {
        set(eChallans[0], "additionalDetail.GLcode", state.screenConfiguration.preparedFinalObject.applyScreenMdmsData.GLCodeMapping[i].glcode);
      }
    }
    console.info("eChallans in state presetn==", eChallans);
    //Check if tax period fall between the tax periods coming from MDMS -- Not required as of now
    const taxPeriodValid = isTaxPeriodValid(dispatch, eChallans[0], state);
    
    console.info("echallan requ=",eChallans);
    if (taxPeriodValid) {

      console.info("tax period valid?");

      const url = "/echallan-services/eChallan/v1/_create";
             
        console.info("url=",url);
      try {
          const payload = await httpRequest("post", url, "", [], {
          Challan: eChallans[0]
        });
        if (payload.challans.length > 0) {
          const consumerCode = get(payload, "challans[0].challanNo");
          const businessService = get(payload, "challans[0].businessService");
          set(payload, "challans[0].mobileNumber", mobileNumber);
          set(payload, "challans[0].consumerName", consumerName);
          set(payload, "challans[0].serviceType", businessService);
          set(
            payload,
            "challans[0].businessService",
            businessService.split(".")[0]
          );
          dispatch(prepareFinalObject("Challan", payload.challans[0]));
          console.info("generate bill");
          await generateBill(consumerCode, tenantId, businessService, dispatch);
        } else {
          alert("Empty response!!");
        }
      } catch (e) {
        console.log(e.message);
        dispatch(
          toggleSnackbar(
            true,
            {
              labelName: e.message,
              labelKey: e.message
            },
            "error"
          )
        );
      }
    
    
    }
 
}

const generateBill = async (
  consumerCode,
  tenantId,
  businessService,
  dispatch
) => {
  try {
    console.info("came to generate bill");
    const payload = await httpRequest(
      "post",
      `/billing-service/bill/v2/_fetchbill?consumerCode=${consumerCode}&businessService=${businessService}&tenantId=${tenantId}`,
      "",
      [],
      {}
    );
    if (payload && payload.Bill[0]) {
      dispatch(prepareFinalObject("ReceiptTemp[0].Bill", payload.Bill));
      //const estimateData = createEstimateData(payload.Bill[0]);
      // estimateData &&
      //   estimateData.length &&
      //   dispatch(
      //     prepareFinalObject(
      //       "applyScreenMdmsData.estimateCardData",
      //       estimateData
      //     )
      //   );
      // dispatch(
      //   prepareFinalObject("applyScreenMdmsData.consumerCode", consumerCode)
      // );
      // dispatch(
      //   prepareFinalObject(
      //     "applyScreenMdmsData.businessService",
      //     businessService
      //   )
      // );
      console.info("bill generated redirect to common pay");
     // dispatch(setRoute(`/uc/pay?tenantId=${tenantId}`));
     dispatch(setRoute(`/uc/acknowledgement?purpose=challan&status=success&challanNumber=${consumerCode}`));
    }
  } catch (e) {
    console.log(e);
  }
};

const createEstimateData = billObject => {
  const billDetails = billObject && billObject.billDetails;
  let fees =
    billDetails &&
    billDetails[0].billAccountDetails &&
    billDetails[0].billAccountDetails.map(item => {
      return {
        name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
        value: item.amount,
        info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
      };
    });
  return fees;
};

const isTaxPeriodValid = (dispatch, challan, state) => {
  const taxPeriods = get(
    state.screenConfiguration,
    "preparedFinalObject.applyScreenMdmsData.BillingService.TaxPeriod",
    []
  );
  const selectedFrom = new Date(challan.taxPeriodFrom);
  const selectedTo = new Date(challan.taxPeriodTo);
  if (selectedFrom <= selectedTo) {
    return true;
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please select the right tax period",
          labelKey: "UC_NEW_COLLECTION_WRONG_TAX_PERIOD_MSG"
        },
        "warning"
      )
    );
    return false;
  }

  //Validation against MDMS Tax periods not required as of now.
  let found =
    taxPeriods.length > 0 &&
    taxPeriods.find(item => {
      const fromDate = new Date(item.fromDate);
      const toDate = new Date(item.toDate);
      return (
        item.service === demand.businessService &&
        fromDate <= selectedFrom &&
        toDate >= selectedTo
      );
    });
  if (found) return true;
  else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please select the right tax period",
          labelKey: "UC_NEW_COLLECTION_WRONG_TAX_PERIOD_MSG"
        },
        "warning"
      )
    );
    return false;
  }
};
