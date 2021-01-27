import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { getBillAmendSearchResult, searchBill } from "../../../../../ui-utils/commons";
import { validateFields } from "../../utils";


export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);

  let queryObject = [

  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreenBillAmend",
    {}
  );

  let isSearchBoxFirstRowValid = validateFields(
    "components.div.children.searchCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "search"
  );
  if (isSearchBoxFirstRowValid) {
    isSearchBoxFirstRowValid = get(searchScreenObject, 'mobileNumber', '') == "" && get(searchScreenObject, 'amendmentId', '') == "" && get(searchScreenObject, 'consumerCode', '') == "" ? false : true;
  }

  if (!isSearchBoxFirstRowValid) {
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
        searchScreenObject[key] == "") {
        delete searchScreenObject[key];
      }
    }
    let serviceObject = get(
      state.screenConfiguration.preparedFinalObject,
      "searchScreenMdmsData.BillingService.BusinessService"
    ).filter(item => item.code === searchScreenObject.businesService);

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
    const responseFromAPI = await getBillAmendSearchResult(queryObject, dispatch)
    const Amendments = (responseFromAPI && responseFromAPI.Amendments) || [];
    const respObj = {};

    Amendments.map(bill => {
      respObj[bill.consumerCode] = bill;
    })

    if (get(searchScreenObject, 'amendmentId', '') != "" && get(searchScreenObject, 'consumerCode', '') == "" && get(responseFromAPI, 'Amendments[0].consumerCode', '') != '') {
      queryObject.push({
        "key": 'consumerCode',
        "value": get(responseFromAPI, 'Amendments[0].consumerCode', '')
      })
    } else if (get(searchScreenObject, 'consumerCode', '') != "" && get(searchScreenObject, 'amendmentId', '') == "") {

    }
    const resp = await searchBill(queryObject, dispatch)

    const bills = (resp && resp.Bill) || [];
    const billTableData = bills.map(item => {

      return {
        businessService: get(item, "businessService"),
        amendmentId: get(respObj[get(item, "consumerCode")], "amendmentId", 'NA'),
        consumerCode: get(item, "consumerCode"),
        status: get(respObj[get(item, "consumerCode")], "status", "NA"),
        consumerName: get(item, "payerName"),
        consumerAddress: get(item, "payerAddress"),
        tenantId: get(item, "tenantId"),
        connectionType: get(respObj[get(item, "consumerCode")], "additionalDetails.connectionType", 'Metered')
      };
    });


    if (Amendments && Amendments.length > 1 && billTableData && Array.isArray(billTableData) && billTableData.length > 0) {

      Amendments.map(Amendment => {
        if (Amendment.amendmentId != billTableData[0].amendmentId) {
          billTableData.push({ ...billTableData[0], amendmentId: Amendment.amendmentId, status: Amendment.status, connectionType: get(Amendment, 'additionalDetails.connectionType', '') })
        }
      })
    }
    dispatch(
      prepareFinalObject("searchScreenMdmsData.searchResponse", bills)
    );

    try {
      let data = billTableData.map(item => ({

        ['BILL_COMMON_SERVICE_TYPE']: item.businessService || "-",
        ["BILL_COMMON_APPLICATION_NO"]: item.amendmentId || "NA",
        ["PAYMENT_COMMON_CONSUMER_CODE"]: item.consumerCode || "-",

        ['BILL_COMMON_TABLE_COL_CONSUMER_NAME']: item.consumerName || "-",
        ['BILL_COMMON_TABLE_CONSUMER_ADDRESS']: item.consumerAddress || "-",

        ['BILL_COMMON_TABLE_COL_STATUS']: item.status || "-",

        ["TENANT_ID"]: item.tenantId || '',
        ['BUSINESS_SERVICE']: item.businessService || "-",
        ['SERVICE_CONST']: item.businessService == 'WS' ? 'WATER' : (item.businessService == 'SW' ? 'SEWERAGE' : 'NA'),
        ['CONNECTION_TYPE']: item.connectionType || "NA"

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
