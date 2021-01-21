import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { getBillAmendSearchResult } from "../../../../../ui-utils/commons";
import { validateFields } from "../../utils";
import { convertEpochToDate } from "../../utils/index";


export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let tenantId = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen.tenantId"
  );
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );

  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.searchCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "search"
  );
  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.searchCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "search"
  );
  if (!isSearchBoxFirstRowValid || !isSearchBoxSecondRowValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "BILL_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
        },
        "warning"
      )
    );
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "BILL_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
        },
        "warning"
      )
    );
  } else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) && searchScreenObject[key] &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
      if (searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key] =="") {
          delete searchScreenObject[key];
      }
    }
    let serviceObject = get(
      state.screenConfiguration.preparedFinalObject,
      "searchScreenMdmsData.BillingService.BusinessService"
    ).filter(item => item.code === searchScreenObject.businesService);

    searchScreenObject.url = serviceObject && serviceObject[0] && serviceObject[0].billGineiURL;
    const isAdvancePayment = serviceObject && serviceObject[0] && serviceObject[0].isAdvanceAllowed;
    // if (!searchScreenObject.url) {
    //   dispatch(
    //     toggleSnackbar(
    //       true,
    //       {
    //         labelName: "Selected Service Category is Not Available for Search",
    //         labelKey: "BILL_SEARCH_BILLGINEIURL_NOTFOUND"
    //       },
    //       "error"
    //     )
    //   );
    //   return;
    // }
    // searchScreenObject.tenantId =getTenantId();
    const responseFromAPI = await getBillAmendSearchResult(queryObject,dispatch)
    const bills = (responseFromAPI && responseFromAPI.Amendments) || [];
    const billTableData = bills.map(item => {
      return {
        businessService: get(item, "businessService"),
        amendmentId: get(item, "amendmentId"),
        consumerCode: get(item, "consumerCode"),
        status: get(item, "status"),
        consumerName: get(item, "additionalDetails.payerName"),
        consumerAddress: get(item, "additionalDetails.payerAddress"),
        tenantId: get(item, "tenantId")
      };
    });
    dispatch(
      prepareFinalObject("searchScreenMdmsData.searchResponse", bills)
    );
    
    try {
      let data = billTableData.map(item => ({
    
        ['BILL_COMMON_SERVICE_TYPE']: item.businessService || "-",
        ["BILL_COMMON_APPLICATION_NO"]: item.amendmentId || "NA",
        ["PAYMENT_COMMON_CONSUMER_CODE"]:item.consumerCode  || "-",
        
        ['BILL_COMMON_TABLE_COL_CONSUMER_NAME']: item.consumerName  || "-",
        ['BILL_COMMON_TABLE_CONSUMER_ADDRESS']:item.consumerAddress  || "-",
  
        ['BILL_COMMON_TABLE_COL_STATUS']: item.status  || "-",

        ["TENANT_ID"]: item.tenantId ||'',

      }));

     
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.tableData",
          billTableData
        )
      );
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.rows",
          billTableData.length
        )
      );

      showHideTable(true, dispatch);
    } catch (error) {
      dispatch(toggleSnackbar(true, error.message, "error"));
      console.log(error);
    }
  }
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

const getActionItem = (status) => {
  switch (status) {
    case "ACTIVE": return "PAY";
    case "CANCELLED":
    case "EXPIRED": return "GENERATE NEW BILL"
    case "PAID": return "DOWNLOAD RECEIPT"
    case "PARTIALLY_PAID": return "PARTIALLY PAID"
  }
}
