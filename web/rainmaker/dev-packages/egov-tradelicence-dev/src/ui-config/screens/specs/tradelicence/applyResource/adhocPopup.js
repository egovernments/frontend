import {
  getCommonHeader,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonSubHeader,
  getLabel,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { showHideAdhocPopup } from "../../utils";
import get from "lodash/get";
import { httpRequest } from "../../../../../ui-utils/api";
import cloneDeep from "lodash/cloneDeep";
import { createEstimateData,validateFields } from "../../utils";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import set from "lodash/set";

const getEstimateDataAfterAdhoc = async (state, dispatch) => {
  const TLRequestBody = cloneDeep(
    get(state.screenConfiguration.preparedFinalObject, "Licenses")
  );
  set(TLRequestBody[0], "action", "ADHOC");
  const TLpayload = await httpRequest(
    "post",
    "/tl-services/v1/_update",
    "",
    [],
    { Licenses: TLRequestBody }
  );

  // clear data from form

  const billPayload = await createEstimateData(
    TLpayload.Licenses[0],
    "LicensesTemp[0].estimateCardData",
    dispatch,
    window.location.href
  );

  //get deep copy of bill in redux - merge new bill after adhoc
  const billInRedux = cloneDeep(
    get(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].Bill[0]")
  );
  const mergedBillObj = { ...billInRedux, ...billPayload.billResponse.Bill[0] };

  //merge bill in Receipt obj
  billPayload &&
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0]", mergedBillObj));

  //set amount paid as total amount from bill
  billPayload &&
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].Bill[0].billDetails[0].amountPaid",
        billPayload.billResponse.Bill[0].billDetails[0].totalAmount
      )
    );

  //set total amount in instrument
  billPayload &&
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].instrument.amount",
        billPayload.billResponse.Bill[0].billDetails[0].totalAmount
      )
    );

  //Collection Type Added in CS v1.1
  const totalAmount = get(
    billPayload,
    "billResponse.Bill[0].billDetails[0].totalAmount"
  );
  dispatch(
    prepareFinalObject(
      "ReceiptTemp[0].Bill[0].billDetails[0].collectionType",
      "COUNTER"
    )
  );
  if (totalAmount) {
    //set amount paid as total amount from bill - destination changed in CS v1.1
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid",
        totalAmount
      )
    );
  }

  showHideAdhocPopup(state, dispatch);
};
let totalAmount = (estimateCardData) => {
  let tlTax=0;
  let commonRebate=0;
  let commonPenalty=0;
  let adhocPenalty=0;
  let adhocRebate = 0;
  let garbageFee=0;
  let miscCharges=0;
  estimateCardData.forEach(data => {
   
    if(data.name.labelKey === 'TL_TAX' || data.name.labelKey === 'TL_RENEWAL_TAX'){
      tlTax = data.value ? data.value : 0;
    }
    if(data.name.labelKey === 'TL_COMMON_REBATE'|| data.name.labelKey === 'TL_RENEWAL_REBATE'){
      commonRebate = data.value ? data.value : 0;
    }
    if(data.name.labelKey === 'TL_COMMON_PEN' || data.name.labelKey === 'TL_RENEWAL_PENALTY'){
      commonPenalty = data.value ? data.value : 0;
    }
    if(data.name.labelKey === 'TL_ADHOC_PENALTY'){
      adhocPenalty= data.value ? data.value : 0;
    
    }
    if(data.name.labelKey === 'TL_ADHOC_REBATE'){
      adhocRebate= data.value ? data.value : 0;
    }
    if(data.name.labelKey === 'TL_GARBAGE_FEE'){
        garbageFee= data.value ? data.value : 0;
    }
    if(data.name.labelKey === 'TL_MISC_CHARGES'){
      miscCharges= data.value ? data.value : 0;
  }
  });
    
  return tlTax+adhocPenalty+commonPenalty+garbageFee+miscCharges-Math.abs(commonRebate)-Math.abs(adhocRebate);
}
const updateAdhoc = (state, dispatch) => {
let isFormValid = true;
 const  isPenaltyValid = validateFields(
    "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children",
    state,
    dispatch,
    "search-preview"
  );
  const  isRebateValid = validateFields(
    "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children",
    state,
    dispatch,
    "search-preview"
  );
  const  isGcValid = validateFields(
    "components.adhocDialog.children.popup.children.adhocGCCard.children",
    state,
    dispatch,
    "search-preview"
  );
  

  if(!isPenaltyValid || !isRebateValid || !isGcValid){
    isFormValid=false;
  }
  if(isFormValid){
  const adhocAmount = get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.adhocPenalty"
  );
  const rebateAmount = get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.adhocExemption"
  );
  const garbageCharges =  get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.additionalDetail.garbageCharges"
  );
  const miscCharges =  get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.additionalDetail.miscCharges"
  );
  const miscComments =  get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.additionalDetail.miscComments"
  );
  if(miscCharges && (!miscComments || miscComments.length===0)){
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please enter the misc remarks",
          labelKey: "ERR_MISC_COMMENTS"
        },
        "warning"
      )
    );
    return;
  }
  if (adhocAmount || rebateAmount || garbageCharges || miscCharges) {
   
    const totalAmt = totalAmount(get(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].estimateCardData"));
    if (rebateAmount && rebateAmount > totalAmt) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Rebate should be less than or equal to total amount!",
            labelKey: "ERR_REBATE_GREATER_THAN_AMOUNT"
          },
          "warning"
        )
      );
    } else {
      getEstimateDataAfterAdhoc(state, dispatch);
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Enter at least one field",
          labelKey: "ERR_ENTER_ATLEAST_ONE_FIELD"
        },
        "warning"
      )
    );
  }
}

else{
  dispatch(
    toggleSnackbar(
      true,
      {
        labelName: "Please enter valid data",
        labelKey: "TL_VALID_FIELDS_ERROR_MSG"
      },
      "warning"
    )
  );
}
};

export const adhocPopup = getCommonContainer({
  // header: getCommonHeader({
  //   labelName: "Add Adhoc Penalty/Rebate",
  //   labelKey: "TL_ADD_HOC_CHARGES_POPUP_HEAD"
  // }),
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: getCommonHeader(
            {
              labelName: "Add Adhoc Charges",
              labelKey: "TL_ADD_HOC_CHARGES_POPUP_HEAD"
            },
            {
              style: {
                fontSize: "20px"
              }
            }
          )
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "close"
                }
              }
            },
            onClickDefination: {
              action: "condition",
              callBack: showHideAdhocPopup
            }
          }
        }
      }
    }
  },
  adhocPenaltyCard: getCommonContainer(
    {
      subheader: getCommonSubHeader(
        {
          labelName: "Adhoc Penalty",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_SUB_FIRST"
        },
        {
          style: {
            fontSize: "16px"
          }
        }
      ),
      penaltyAmountAndReasonContainer: getCommonContainer({
        penaltyAmount: getTextField({
          label: {
            labelName: "Adhoc Penalty Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
          },
          placeholder: {
            labelName: "Enter Adhoc Penalty Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
          },
          props: {
            type:"number",
            style: {
              width: "90%"
            }
          },
          
          pattern: getPattern("Amount"),
          jsonPath: "Licenses[0].tradeLicenseDetail.adhocPenalty"
        }),
      
        penaltyReason: getSelectField({
          label: {
            labelName: "Reason for Adhoc Penalty",
            labelKey: "TL_PAYMENT_PENALTY_REASON"
          },
          placeholder: {
            labelName: "Select reason for Adhoc Penalty",
            labelKey: "TL_PAYMENT_PENALTY_REASON_SELECT"
          },
          props: {
            style: {
              width: "90%"
            }
          },
          data: [
            {
              code: "TL_ADHOC_PENDING_DUES"
            },
            {
              code: "TL_ADHOC_MISCALCULATION"
            },
            {
              code: "TL_ADHOC_ONE_TIME_PENALTY"
            },
            {
              code: "TL_ADHOC_OTHER"
            }
          ],
          jsonPath: "Licenses[0].tradeLicenseDetail.adhocPenaltyReason"
        }),
    
      commentsField: getTextField({
        label: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        placeholder: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        props: {
          style: {
            width: "90%"
          }
        },
        pattern: getPattern("Comments"),
        jsonPath: "Licenses[0].tradeLicenseDetail.adhocComments"
      }),
    }),
    },
    {
      style: {
        marginTop: "12px"
      }
    }
  ),

  
  adhocRebateCard: getCommonContainer(
    {
      subHeader: getCommonSubHeader(
        {
          labelName: "Adhoc Rebate",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_SUB_SEC"
        },
        {
          style: {
            fontSize: "16px"
          }
        }
      ),
      rebateAmountAndReasonContainer: getCommonContainer({
        rebateAmount: getTextField({
          label: {
            labelName: "Adhoc Rebate Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
          },
          placeholder: {
            labelName: "Enter Adhoc Rebate Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
          },
          props: {
            type:"number",
            style: {
              width: "90%"
            }
          },
          pattern: getPattern("Amount"),
          jsonPath: "Licenses[0].tradeLicenseDetail.adhocExemption"
        }),
        rebateReason: getSelectField({
          label: {
            labelName: "Reason for Adhoc Rebate",
            labelKey: "TL_PAYMENT_REBATE_REASON"
          },
          placeholder: {
            labelName: "Select Reason for Adhoc Rebate",
            labelKey: "TL_PAYMENT_REBATE_REASON_SELECT"
          },
          props: {
            style: {
              width: "90%"
            }
          },
          data: [
            {
              code: "TL_REBATE_ADVANCED_PAID"
            },
            {
              code: "TL_REBATE_BY_COMMISSIONER"
            },
            {
              code: "TL_REBATE_ADDITIONAL_AMOUNT_CAHNGED"
            },
            {
              code: "TL_ADHOC_OTHER"
            }
          ],
          jsonPath: "Licenses[0].tradeLicenseDetail.adhocExemptionReason"
        }),
        rebateCommentsField: getTextField({
          label: {
            labelName: "Enter Comments",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
          },
          placeholder: {
            labelName: "Enter Comments",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "90%"
            }
          },
          pattern: getPattern("Comments"),
          jsonPath: "Licenses[0].tradeLicenseDetail.rebateComments"
        })
      })
    },
    {
      style: {
        marginTop: "24px"
      }
    }
  ),
  adhocGCCard: getCommonContainer(
    {
      subheader: getCommonSubHeader(
        {
          labelName: "Garbage Penalty",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_GARBAGE_FIRST"
        },
        {
          style: {
            fontSize: "16px"
          }
        }
      ),

      
      GCReasonContainer: getCommonContainer({
        garbageAmount: getTextField({
          label: {
            labelName: "Garbage Charges",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_GC_AMT_LABEL"
          },
          placeholder: {
            labelName: "Enter Garbage Charge Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_GC_AMT_PLACEHOLDER"
          },
          props: {
            type:"number",
            style: {
              width: "90%"
            }
          },
          pattern: getPattern("Amount"),
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.garbageCharges"
        }),
        
      }),
      commentsField: getTextField({
        label: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        placeholder: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        props: {
          style: {
            width: "90%"
          }
        },
        pattern: getPattern("Comments"),
        jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.garbageComments"
      })
    },
    {
      style: {
        marginTop: "12px"
      }
    }
  ),

  miscCard: getCommonContainer(
    {
      subheader: getCommonSubHeader(
        {
          labelName: "Miscellaneous Charges",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_MISC_FIRST"
        },
        {
          style: {
            fontSize: "16px"
          }
        }
      ),

      
      MiscReasonContainer: getCommonContainer({
        MiscAmount: getTextField({
          label: {
            labelName: "Miscellaneous Charges",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_MISC_AMT_LABEL"
          },
          placeholder: {
            labelName: "Enter Miscellaneous Charges Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_MISC_AMT_PLACEHOLDER"
          },
          props: {
            type:"number",
            style: {
              width: "90%"
            }
          },
          pattern: getPattern("Amount"),
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.miscCharges"
        }),
        
      }),
      commentsField: getTextField({
        label: {
          labelName: "Enter Remarks",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_REMARKS_LABEL"
        },
        placeholder: {
          labelName: "Enter Remarks",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_REMARKS_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        props: {
          style: {
            width: "90%"
          }
        },
        pattern: getPattern("Comments"),
        jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.miscComments"
      })
    },
    {
      style: {
        marginTop: "12px"
      }
    }
  ),
  
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        textAlign: "center"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            width: "140px",
            height: "48px",
            margin: "8px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: showHideAdhocPopup
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            width: "140px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "ADD",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_ADD"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: updateAdhoc
        }
      }
    }
  }
});
