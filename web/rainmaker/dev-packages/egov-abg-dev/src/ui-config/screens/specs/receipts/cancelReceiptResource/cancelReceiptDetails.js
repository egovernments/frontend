import {
  getCommonCard,

  getCommonContainer, getCommonGrayCard,
  getCommonSubHeader,

  getLabelWithValue, getPattern, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { checkValueForNA, setServiceCategory } from "../../utils";
import { convertEpochToDate } from "../../utils/index";


const tenantId = getTenantId();

export const receiptSummaryDetails = {
  receiptNumber: getLabelWithValue(
    {
      labelName: "Reason for Transfer",
      labelKey: "CR_RECEIPT_NUMBER"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].receiptNumber",
      callBack: checkValueForNA
    }
  ),
  consumerNo: getLabelWithValue(
    {
      labelName: "Document Issue Date",
      labelKey: "CR_RECEIPT_CONSUMER_NUMBER"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].bill.consumerCode",
      callBack: checkValueForNA
    }
  ), paymentDate: getLabelWithValue(
    {
      labelName: "Document Value",
      labelKey: "CR_RECEIPT_PAYMENT_DATE"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].receiptDate",
      callBack: value => {
        return convertEpochToDate(value);
      }
    }
  ),
  payerName: getLabelWithValue(
    {
      labelName: "Remarks",
      labelKey: "CR_RECEIPT_PAYER_NAME"
    },
    {
      jsonPath:
        "PaymentReceipt.payerName",
      callBack: checkValueForNA
    }
  ),  payerNumber: getLabelWithValue(
    {
      labelName: "Remarks",
      labelKey: "CR_RECEIPT_PAYER_NUMBER"
    },
    {
      jsonPath:
        "PaymentReceipt.mobileNumber",
      callBack: checkValueForNA
    }
  ),
  serviceType: getLabelWithValue(
    {

      labelName: "Market Value",
      labelKey: "CR_RECEIPT_SERVICE_TYPE"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].businessService",
      callBack: checkValueForNA
    }
  ),
  billPeriod: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_BILL_PERIOD"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].bill.billDetails[0].fromPeriod",
      callBack: value => {
        return convertEpochToDate(value);
      }
    }
  ), receiptAmount: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_AMOUNT"
    },
    {
      jsonPath:
        "PaymentReceipt.totalAmountPaid",
      callBack: checkValueForNA
    }
  ), pendingAmount: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_PENDING_AMOUNT"
    },
    {
      jsonPath:
        "PaymentReceipt.totalAmountPaid1",
      callBack: checkValueForNA
    }
  ), paymentMode: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_PAYMENT_MODE"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentMode",
      callBack: checkValueForNA
    }
  ), txnId: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_TXN_ID"
    },
    {
      jsonPath:
        "PaymentReceipt.transactionNumber",
      callBack: checkValueForNA
    }
  ), g8ReceiptNo: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_G8_RECEIPT_NO"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].manualReceiptNumber",
      callBack: checkValueForNA
    }
  ), g8ReceiptDate: getLabelWithValue(
    {
      labelName: "Document No.",
      labelKey: "CR_RECEIPT_G8_RECEIPT_DATE"
    },
    {
      jsonPath:
        "PaymentReceipt.paymentDetails[0].manualReceiptDate",
      callBack: value => {
        return convertEpochToDate(value);
      }
    }
  ),
}
const receiptDetails = getCommonGrayCard({
  receiptDetailsContainer: getCommonContainer(receiptSummaryDetails)
});


export const receiptSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Registration Details",
          labelKey: "CR_RECEIPT_SUMMARY"
        })
      }
    }
  },

  cardOne: receiptDetails
});
const serviceTypeChange = (reqObj) => {
  let { state, value, dispatch } = reqObj;
  dispatch(prepareFinalObject('Demands[0].businessService', value));
  const demandId = get(
    state.screenConfiguration.preparedFinalObject,
    "Demands[0].id",
    null
  );


  if (!demandId && value) {
    const taxHeads = setTaxHeadFields(value, state, dispatch);
    console.log(taxHeads);
  }

}

const serviceCategoryChange = (reqObj) => {
  let { state, value, dispatch } = reqObj;
  dispatch(prepareFinalObject('Demands[0].consumerType', value));
  const demandId = get(
    state.screenConfiguration.preparedFinalObject,
    "Demands[0].id",
    null
  );
  resetTaxAmountFields(state, dispatch);
  const serviceData = get(
    state.screenConfiguration,
    "preparedFinalObject.applyScreenMdmsData.nestedServiceData",
    {}
  );
  //Set tax head fields if there is no service type available
  if (!demandId && serviceData[value]) {
    const taxHeads = setTaxHeadFields(value, state, dispatch);
  }

}

export const cancelReceiptDetailsCard = getCommonCard(
  {
    searchContainer: getCommonContainer(
      {
        City: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-uc",
          componentPath: "AutosuggestContainer",
          props: {
            label: {
              labelName: "Reason",
              labelKey: "CR_RECEIPT_CANCELLATION_REASON_LABEL"
            },
            localePrefix: {
              moduleName: "CR",
              masterName: "REASON"
            },
            optionLabel: "name",
            placeholder: {
              labelName: "Select Reason",
              labelKey: "CR_SELECT_RECEIPT_CANCELLATION_REASON_LABEL"
            },
            required: true,
            value: tenantId,
            disabled: true,
            labelsFromLocalisation: true,
            isClearable: true,
            className: "autocomplete-dropdown",
            sourceJsonPath: "applyScreenMdmsData.reasonForReceiptCancel",
          },
          jsonPath: "Demands[0].reason",
          gridDefination: {
            xs: 12,
            sm: 8
          },
          // beforeFieldChange: async (action, state, dispatch) => {
          //   const citiesByModule = get(
          //     state,
          //     "common.citiesByModule.UC.tenants",
          //     []
          //   );
          //   if (!citiesByModule.find(item => item.code === action.value)) {
          //     return action;
          //   }
          //   let requestBody = {
          //     MdmsCriteria: {
          //       tenantId: action.value,
          //       moduleDetails: [
          //         {
          //           moduleName: "BillingService",
          //           masterDetails: [
          //             {
          //               name: "BusinessService",
          //               filter: "[?(@.type=='Adhoc')]"
          //             },
          //             {
          //               name: "TaxHeadMaster"
          //             },
          //             {
          //               name: "TaxPeriod"
          //             }
          //           ]
          //         }
          //       ]
          //     }
          //   };
          //   try {
          //     let payload = null;
          //     payload = await httpRequest(
          //       "post",
          //       "/egov-mdms-service/v1/_search",
          //       "_search",
          //       [],
          //       requestBody
          //     );
          //     dispatch(
          //       prepareFinalObject(
          //         "applyScreenMdmsData.BillingService",
          //         payload.MdmsRes.BillingService
          //       )
          //     );
          //     setServiceCategory(
          //       get(payload, "MdmsRes.BillingService.BusinessService", []),
          //       dispatch
          //     );
          //   } catch (e) {
          //     console.log(e);
          //   }
          //   return action;
          // }
        },
        ConsumerName: getTextField({
          label: {
            labelName: "Consumer Name",
            labelKey: "CR_MORE_DETAILS_LABEL"
          },
          placeholder: {
            labelName: "Enter Consumer Name",
            labelKey: "CR_SELECT_MORE_DETAILS_LABEL"
          },
          gridDefination: {
            xs: 12,
            sm: 8
          },
          required: true,
          visible: true,
          pattern: getPattern("Address"),
          errorMessage: "Invalid Details.",
          jsonPath: "Demands[0].moreDetails"
        }),

        commentsContainer: getCommonContainer({
          comments: getTextField({
            label: {
              labelName: "Comments",
              labelKey: "CR_ADDITIONAL_PENALTY"
            },
            placeholder: {
              labelName: "Enter Comment ",
              labelKey: "CR_ADDITIONAL_PENALTY_PLACEHOLDER"
            },
            Required: false,
            gridDefination: {
              xs: 12,
              sm: 6
            },
            pattern: getPattern("Amount"),

            jsonPath: "Demands[0].additionalPenalty"
          })
        })
      }
    )
  }
);
export const viewReceiptDetailsCard = getCommonCard(
  {

    receiptDetails: receiptSummary,

  });



const resetTaxAmountFields = (state, dispatch) => {
  // const noOfPreviousTaxHeads = get(
  //   state.screenConfiguration,
  //   "preparedFinalObject.Demands[0].demandDetails",
  //   []
  // ).length;
  // const taxFields = get(
  //   state.screenConfiguration,
  //   "screenConfig.cancelReceipt.components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
  //   {}
  // );
  // const taxFieldKeys = Object.keys(taxFields).filter(item =>
  //   item.startsWith("taxheadField_")
  // );
  // if (noOfPreviousTaxHeads > 0) {
  //   for (let i = 0; i < taxFieldKeys.length; i++) {
  //     dispatch(
  //       handleField(
  //         "cancelReceipt",
  //         "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
  //         `${taxFieldKeys[i]}.props.value`,
  //         ""
  //       )
  //     );
  //     dispatch(
  //       handleField(
  //         "cancelReceipt",
  //         "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
  //         `${taxFieldKeys[i]}.visible`,
  //         false
  //       )
  //     );
  //   }
  //   dispatch(prepareFinalObject(`Demands[0].demandDetails`, []));
  // }
}

const setTaxHeadFields = (value, state, dispatch) => {
  const serviceData = get(
    state.screenConfiguration,
    "preparedFinalObject.applyScreenMdmsData.nestedServiceData",
    {}
  );
  const taxHeadMasters = get(
    state.screenConfiguration,
    "preparedFinalObject.applyScreenMdmsData.BillingService.TaxHeadMaster",
    {}
  );
  const matchingTaxHeads = taxHeadMasters.filter(
    item => item.service === value
  );
  if (matchingTaxHeads && matchingTaxHeads.length > 0) {
    //Delete previous Tax Head fields
    const noOfPreviousTaxHeads = get(
      state.screenConfiguration,
      "preparedFinalObject.Demands[0].demandDetails",
      []
    ).length;
    const taxFields = get(
      state.screenConfiguration,
      "screenConfig.cancelReceipt.components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
      {}
    );
    const taxFieldKeys = Object.keys(taxFields).filter(item =>
      item.startsWith("taxheadField_")
    );
    if (noOfPreviousTaxHeads > 0) {
      for (let i = 0; i < taxFieldKeys.length; i++) {
        dispatch(
          handleField(
            "cancelReceipt",
            "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
            `${taxFieldKeys[i]}.props.value`,
            ""
          )
        );
        dispatch(
          handleField(
            "cancelReceipt",
            "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
            `${taxFieldKeys[i]}.visible`,
            false
          )
        );
      }
      dispatch(prepareFinalObject(`Demands[0].demandDetails`, []));
    }
    //Show new tax head fields
    matchingTaxHeads.forEach((item, index) => {
      dispatch(
        prepareFinalObject(
          `Demands[0].demandDetails[${index}].taxHeadMasterCode`,
          item.code
        )
      );
      dispatch(
        prepareFinalObject(
          `Demands[0].demandDetails[${index}].collectionAmount`,
          0
        )
      );
      dispatch(
        handleField(
          "cancelReceipt",
          "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
          `taxheadField_${item.code.split(".").join("_")}`,
          getTextField({
            label: {
              labelName: "Tax Amount",
              labelKey: `${getTransformedLocale(item.code)}`
            },
            placeholder: {
              labelName: "Enter Tax Amount",
              labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
            },
            componentJsonpath: `components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.taxheadField_${item.code
              .split(".")
              .join("_")}`,
            required: item.isRequired || false,
            pattern: getPattern("Amount"),
            errorMessage: "Invalid Amount",
            visible: true,
            // required: true,
            props: {
              // required: true
            },
            jsonPath: `Demands[0].demandDetails[${index}].taxAmount`
          })
        )
      );
    });
    // dispatch(
    //   handleField(
    //     "cancelReceipt",
    //     "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children",
    //     `comment`,
    //     getTextField({
    //       label: {
    //         labelName: "Comments",
    //         labelKey: "UC_COMMENT_LABEL"
    //       },
    //       placeholder: {
    //         labelName: "Enter Comment ",
    //         labelKey: "UC_COMMENT_PLACEHOLDER"
    //       },
    //       Required: false,
    //       jsonPath: "Demands[0].comment",
    //       componentJsonpath: `components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.comment`
    //     })
    //   )
    // );
  }
};

// const setServiceCategory = (businessServiceData, dispatch) => {
//   let nestedServiceData = {};
//   businessServiceData.forEach(item => {
//     if (item.code && item.code.indexOf(".") > 0) {
//       if (nestedServiceData[item.code.split(".")[0]]) {
//         let child = get(
//           nestedServiceData,
//           `${item.code.split(".")[0]}.child`,
//           []
//         );
//         child.push(item);
//         set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
//       } else {
//         set(
//           nestedServiceData,
//           `${item.code.split(".")[0]}.code`,
//           item.code.split(".")[0]
//         );
//         set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
//       }
//     } else {
//       set(nestedServiceData, `${item.code}`, item);
//     }
//   });
//   dispatch(
//     prepareFinalObject(
//       "applyScreenMdmsData.nestedServiceData",
//       nestedServiceData
//     )
//   );
//   let serviceCategories = Object.values(nestedServiceData).filter(
//     item => item.code
//   );
//   dispatch(
//     prepareFinalObject(
//       "applyScreenMdmsData.serviceCategories",
//       serviceCategories
//     )
//   );
// };



