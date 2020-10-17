import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";
// import { getSelectedTabIndex } from "egov-ui-framework/ui-utils/commons";
import cloneDeep from "lodash/cloneDeep";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { convertDateToEpoch, validateFields } from "../../utils";
// import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import set from "lodash/set";

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
export const getRedirectionURL = receiptNumber => {
  const redirectionURL = ifUserRoleExists("EMPLOYEE")
    ? `/uc/acknowledgement?purpose=pay&status=success&receeiptNumber=${receiptNumber}`
    : "/inbox";

  return redirectionURL;
};
export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "GO BACK",
        labelKey: "UC_PAY_GO_BACK"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        goBack(state, dispatch);
      }
    }
  },
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
        labelName: "GENERATE RECEIPT",
        labelKey: "UC_BUTTON_GENERATE_RECEIPT"
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
        callBackForPay(state, dispatch);
      }
    }
  }
});
 const getSelectedTabIndex = paymentType => {
  switch (paymentType) {
    case "Cash":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "Cheque":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };
    case "Card":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};

const callBackForPay = async (state, dispatch) => {
  debugger;
  const { href } = window.location;
  let isFormValid = true;

  // --- Validation related -----//

  const selectedPaymentType = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0].instrument.instrumentType.name"
  );
  const {
    selectedTabIndex,
    selectedPaymentMode,
    fieldsToValidate
  } = getSelectedTabIndex(selectedPaymentType);

  if (selectedPaymentType === "Cheque" || selectedPaymentType === "DD") {
    const bankName = get(
      state.screenConfiguration.preparedFinalObject,
      "ReceiptTemp[0].instrument.bank.name",
      null
    );
    const branchName = get(
      state.screenConfiguration.preparedFinalObject,
      "ReceiptTemp[0].instrument.branchName",
      null
    );
    if (!bankName && !branchName) {
      dispatch(prepareFinalObject("ReceiptTemp[0].instrument.ifscCode", null));
    }
  }

  isFormValid =
    fieldsToValidate
      .map(curr => {
        return validateFields(
          `components.div.children.body.children.cardContent.children.capturePayment.children.cardContent.children.tabSection.props.tabs[${selectedTabIndex}].tabContent.${selectedPaymentMode}.children.${curr}.children`,
          state,
          dispatch,
          "pay"
        );
      })
      .indexOf(false) === -1;
  if (
    get(
      state.screenConfiguration.preparedFinalObject,
      "Bill[0].billDetails[0].manualReceiptDate"
    )
  ) {
    isFormValid = validateFields(
      `components.div.children.body.children.cardContent.children.G8ReceiptDetails.children.cardContent.children.header.children`,
      state,
      dispatch,
      "pay"
    );
  }

  //------------ Validation End -------------//

  //------------- Form related ----------------//

  const ReceiptDataTemp = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0]"
  );

  // console.log(ReceiptDataTemp,"ReceiptDataTemp");
  // debugger;
  let finalReceiptData = cloneDeep(ReceiptDataTemp);

  allDateToEpoch(finalReceiptData, [
    "Bill[0].billDetails[0].manualReceiptDate",
    "instrument.transactionDateInput"
  ]);
  if (get(finalReceiptData, "instrument.transactionDateInput")) {
    set(
      finalReceiptData,
      "instrument.instrumentDate",
      get(finalReceiptData, "instrument.transactionDateInput")
    );
  }
  ////tenant hard cording

  set(
    finalReceiptData,
    "Bill[0].tenantId",
    get(
      state.screenConfiguration,
      "preparedFinalObject.ReceiptTemp[0].tenantId",
      ""
    )
  );

  //Add payerName and Mobile no
  set(
    finalReceiptData,
    "Bill[0].payerName",
    get(
      state.screenConfiguration,
      "preparedFinalObject.Demands[0].consumerName",
      ""
    )
  );
  set(
    finalReceiptData,
    "Bill[0].mobileNumber",
    get(
      state.screenConfiguration,
      "preparedFinalObject.Demands[0].mobileNumber",
      ""
    )
  );

  //Add comments
  set(
    finalReceiptData,
    "Bill[0].billDetails[0].additionalDetails.comment",
    get(
      state.screenConfiguration,
      "preparedFinalObject.Demands[0].additionalDetails.comment",
      ""
    )
  );

  if (get(finalReceiptData, "instrument.transactionNumber")) {
    set(
      finalReceiptData,
      "instrument.instrumentNumber",
      get(finalReceiptData, "instrument.transactionNumber")
    );
  }

  if (selectedPaymentType === "Card") {
    //Extra check - remove once clearing forms onTabChange is fixed
    if (
      get(finalReceiptData, "instrument.transactionNumber") !==
      get(finalReceiptData, "instrument.transactionNumberConfirm")
    ) {
      // dispatch(
      //   toggleSnackbar(
      //     true,
      //     {
      //       labelName: "Transaction numbers don't match !",
      //       labelKey: "ERR_TRASACTION_NUMBERS_DONT_MATCH"
      //     },
      //     "error"
      //   )
      // );
      return;
    }
  }

  //------------- Form End ----------------//

  let ReceiptBody = {
    Receipt: []
  };

  let ReceiptBodyNew = {
    Payment: { paymentDetails: [] }
  };
    
  console.log(finalReceiptData,"finalreceipt");
  ReceiptBody.Receipt.push(finalReceiptData);

  ReceiptBodyNew.Payment["tenantId"] = finalReceiptData.tenantId;
 ReceiptBodyNew.Payment["totalDue"] = totalAmount;

 ReceiptBodyNew.Payment["paymentMode"] =
 finalReceiptData.instrument.instrumentType.name;
ReceiptBodyNew.Payment["paidBy"] = finalReceiptData.Bill[0].paidBy;
ReceiptBodyNew.Payment["mobileNumber"] =
 finalReceiptData.Bill[0].payerMobileNumber;
 ReceiptBodyNew.Payment["payerName"] = finalReceiptData.Bill[0].paidBy?finalReceiptData.Bill[0].paidBy:(finalReceiptData.Bill[0].payerName||finalReceiptData.Bill[0].payer);
 if(finalReceiptData.instrument.transactionNumber){
 ReceiptBodyNew.Payment["transactionNumber"] =
   finalReceiptData.instrument.transactionNumber;

 }


  const totalAmount = Number(finalReceiptData.Bill[0].totalAmount);
  console.log(totalAmount,"111111111111111111111111111");
  let amtPaid =
    state.screenConfiguration.preparedFinalObject.AmountType ===
    "partial_amount"
      ? state.screenConfiguration.preparedFinalObject.AmountPaid
      : finalReceiptData.Bill[0].totalAmount;
      console.log(amtPaid,"22222222222222222222222222222");

      amtPaid = amtPaid ? Number(amtPaid) : totalAmount;
      console.log(amtPaid,"33333333333333333333333333333");

    console.log(ReceiptBody,"ReceiptBodydata");


    ReceiptBodyNew.Payment.paymentDetails.push({
      manualReceiptDate:
        finalReceiptData.Bill[0].billDetails[0].manualReceiptDate,
      manualReceiptNumber:
        finalReceiptData.Bill[0].billDetails[0].manualReceiptNumber,
      businessService: finalReceiptData.Bill[0].businessService,
      billId: finalReceiptData.Bill[0].id,
      totalDue: totalAmount,
      totalAmountPaid: amtPaid
    });

    ReceiptBodyNew.Payment["totalAmountPaid"] = amtPaid;

  //---------------- Create Receipt ------------------//
  if (isFormValid) {

    try {
      // dispatch(toggleSpinner());
      let response = await httpRequest(
        "post",
        "collection-services/payments/_create",
        "_create",
        [],
        ReceiptBodyNew,
        [],
        {}
      );
      let receiptNumber = get(
        response,
        "Receipt[0].Bill[0].billDetails[0].receiptNumber",
        null
      );
      let serviceCategory = get(
        response,
        "Receipt[0].Bill[0].billDetails[0].businessService",
        ""
      );
      console.log(receiptNumber, response);
      dispatch(prepareFinalObject("receiptSearchResponse", response));
      // moveToSuccess(href, dispatch, receiptNumber);
      const path =
        process.env.REACT_APP_SELF_RUNNING === "true"
          ? `/egov-ui-framework/uc/acknowledgement?purpose=pay&status=success&receiptNumber=${receiptNumber}&serviceCategory=${serviceCategory}`
          : `/uc/acknowledgement?purpose=pay&status=success&receiptNumber=${receiptNumber}&serviceCategory=${serviceCategory}`;
      dispatch(setRoute(`${path}`));
      // dispatch(toggleSpinner());
    } catch (e) {
      // dispatch(toggleSpinner());
      // dispatch(toggleSnackbar(true, { labelName: e.message }, "error"));
      console.log(e);
    }
  } else {
    // dispatch(
    //   toggleSnackbar(
    //     true,
    //     {
    //       labelName:
    //         "Please fill all mandatory fields and upload the documents !",
    //       labelKey: "ERR_FILL_MANDATORY_FIELDS"
    //     },
    //     "warning"
    //   )
    // );
  }
};

const allDateToEpoch = (finalObj, jsonPaths) => {
  jsonPaths.forEach(jsonPath => {
    if (get(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

const convertDateFieldToEpoch = (finalObj, jsonPath) => {
  const dateConvertedToEpoch = convertDateToEpoch(
    get(finalObj, jsonPath),
    "daystart"
  );
  set(finalObj, jsonPath, dateConvertedToEpoch);
};

const goBack = (state, dispatch) => {
  const demand = get(
    state.screenConfiguration.preparedFinalObject,
    "Demands[0]",
    []
  );
  const demandId = demand.id || null;
  if (demandId) {
    const serviceType = get(demand, "serviceType");
    const serviceCategory = get(demand, "businessService");
    // const businessService = get(demand[0], "businessService")
  }
  const path =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/uc/newCollection`
      : `/uc/newCollection`;
  dispatch(setRoute(`${path}`));
};
