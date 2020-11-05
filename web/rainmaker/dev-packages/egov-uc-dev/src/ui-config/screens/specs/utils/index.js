import get from "lodash/get";
import {getTransformedLocalStorgaeLabels,getLocaleLabels} from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {httpRequest} from 'ui-utils/api'
export const showHideAdhocPopup = (state, dispatch, screenKey) => {
  let toggle = get(
    state.screenConfiguration.screenConfig[screenKey],
    "components.adhocDialog.props.open",
    false
  );
  dispatch(
    handleField(screenKey, "components.adhocDialog", "props.open", !toggle)
  );
};

export const getCurrentFinancialYear = () => {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

export const getFinancialYearDates = (format, et) => {
  /** Return the starting date and ending date (1st April to 31st March)
   *  of the financial year of the given date in ET. If no ET given then
   *  return the dates for the current financial year */
  var date = !et ? new Date() : new Date(et);
  var curMonth = date.getMonth();
  var financialDates = { startDate: "NA", endDate: "NA" };
  if (curMonth > 3) {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = `01/04/${date.getFullYear().toString()}`;
        financialDates.endDate = `31/03/${(date.getFullYear() + 1).toString()}`;
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = `${date.getFullYear().toString()}-04-01`;
        financialDates.endDate = `${(date.getFullYear() + 1).toString()}-03-31`;
        break;
    }
  } else {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = `01/04/${(
          date.getFullYear() - 1
        ).toString()}`;
        financialDates.endDate = `31/03/${date.getFullYear().toString()}`;
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = `${(
          date.getFullYear() - 1
        ).toString()}-04-01`;
        financialDates.endDate = `${date.getFullYear().toString()}-03-31`;
        break;
    }
  }
  return financialDates;
};
export const setServiceCategory = (businessServiceData, dispatch,screenKey="applyScreenMdmsData") => {
  let nestedServiceData = {};
  businessServiceData.forEach(item => {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        let child = get(
          nestedServiceData,
          `${item.code.split(".")[0]}.child`,
          []
        );
        child.push(item);
        set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
      } else {
        set(
          nestedServiceData,
          `${item.code.split(".")[0]}.code`,
          item.code.split(".")[0]
        );
        set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
      }
    } else {
      set(nestedServiceData, `${item.code}`, item);
    }
  });
  dispatch(
    prepareFinalObject(
      `${screenKey}.nestedServiceData`,
      nestedServiceData
    )
  );
  let serviceCategories = Object.values(nestedServiceData).filter(
    item => item.code
  );
  dispatch(
    prepareFinalObject(
      `${screenKey}.serviceCategories`,
      serviceCategories
    )
  );
};

export const getBill = async (queryObject,dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/billing-service/bill/v2/_fetchbill",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    dispatch(
      /*toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )*/
    );
    console.log(error,'fetxh');
  }
};
export const getBusinessServiceMdmsData = async (dispatch,  tenantId) => {

  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "BillingService",
          masterDetails: [{ name: "BusinessService" }]
        },
        {
          moduleName: "common-masters",
          masterDetails: [{ name: "uiCommonPay" }]
        }
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(prepareFinalObject("businessServiceMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};
export const createEstimateData = billObject => {
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

export const generateBill = async (dispatch, consumerCode, tenantId, businessService) => {
  try {
    if (consumerCode && tenantId) {
      const queryObj = [
        {
          key: "tenantId",
          value: tenantId
        },
        {
          key: "consumerCode",
          value: consumerCode
        }
      ];
      if(businessService){
        queryObj.push({
          key: "businessService",
          value: businessService
        });
      }
      const payload = await getBill(queryObj,dispatch);
      // let payload = sampleGetBill();
      if (payload && payload.Bill[0]) {
        dispatch(prepareFinalObject("ReceiptTemp[0].Bill", payload.Bill));
        const estimateData = createEstimateData(payload.Bill[0]);
        estimateData &&
          estimateData.length &&
          dispatch(
            prepareFinalObject(
              "applyScreenMdmsData.estimateCardData",
              estimateData
            )
          );
      }
    }
  } catch (e) {
    dispatch(
     /* toggleSnackbar(
        true,
        { labelName: e.message, labelKey: e.message },
        "error"
      )*/
    );
    console.log(e);
  }
};

export const getTextToLocalMapping = label => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Receipt No.":
      return getLocaleLabels(
        "Receipt No",
        "UC_COMMON_TABLE_COL_RECEIPT_NO",
        localisationLabels
      );
    case "Payee Name":
      return getLocaleLabels(
        "Consumer Name",
        "UC_COMMON_TABLE_COL_PAYEE_NAME",
        localisationLabels
      );
    case "Service Type":
      return getLocaleLabels(
        "Service Category",
        "UC_SERVICE_TYPE_LABEL",
        localisationLabels
      );
    case "Date":
      return getLocaleLabels(
        "Receipt Date",
        "UC_COMMON_TABLE_COL_DATE",
        localisationLabels
      );
    case "Amount[INR]":
      return getLocaleLabels(
        "Amount Paid[INR]",
        "UC_COMMON_TABLE_COL_AMOUNT",
        localisationLabels
      );
    case "Status":
      return getLocaleLabels(
        "Status",
        "UC_COMMON_TABLE_COL_STATUS",
        localisationLabels
      );
    case "BILLINGSERVICE_BUSINESSSERVICE_PT":
      return getLocaleLabels(
        "Property Tax",
        "BILLINGSERVICE_BUSINESSSERVICE_PT",
        localisationLabels
      );
    default : 
    return getLocaleLabels(
      label,
      label,
      localisationLabels
    );
  }
};
