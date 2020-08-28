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
        // else{          
        //   dispatch(prepareFinalObject("Challan[0].accountId" , ));
        // }
             
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



const createChallan = async(state,dispatch) =>{
    console.info("creating challan");
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
    let eChallans = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Challan")
      )
    );
    
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
    //Check if tax period fall between the tax periods coming from MDMS -- Not required as of now
    const taxPeriodValid = isTaxPeriodValid(dispatch, eChallans[0], state);
    
    console.info("echallan requ=",eChallans);
    if (taxPeriodValid) {
      const url = "/echallan-services/eChallan/v1/_create";     
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
          await generateBill(consumerCode, tenantId, businessService, dispatch);
        } else {
          console.info("some error  happened while generating challan");
          dispatch(setRoute(`/uc/acknowledgement?purpose=challan&status=failure`));
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
      console.info("Prepareing Receipt Temp===");
      dispatch(prepareFinalObject("ReceiptTemp[0].Bill", payload.Bill));                
      dispatch(setRoute(`/uc/acknowledgement?purpose=challan&status=success&challanNumber=${consumerCode}`));
    }
    else{     
      dispatch(setRoute(`/uc/acknowledgement?purpose=challan&status=failure`));
    }
  } catch (e) {
    console.log(e);
    dispatch(setRoute(`/uc/acknowledgement?purpose=challan&status=failure`));
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
