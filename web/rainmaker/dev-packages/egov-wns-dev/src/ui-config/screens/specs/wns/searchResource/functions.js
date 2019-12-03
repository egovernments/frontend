import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, fetchBill } from "../../../../..//ui-utils/commons";
import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping
} from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(getUserInfo()).tenantId
    },
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelKey: "ERR_WS_FILL_MANDATORY_FIELDS"
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
          labelKey: "ERR_WS_FILL_ATLEAST_ONE_FIELD"
        },
        "error"
      )
    );
    // } else if (
    //   (searchScreenObject["fromDate"] === undefined ||
    //     searchScreenObject["fromDate"].length === 0) &&
    //   searchScreenObject["toDate"] !== undefined &&
    //   searchScreenObject["toDate"].length !== 0
    // ) {
    //   dispatch(
    //     toggleSnackbar(
    //       true,
    //       { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" },
    //       "warning"
    //     )
    //   );
  } else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        if (key === "fromDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "daystart")
          });
        } else if (key === "toDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "dayend")
          });
        } else {
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
        }
      }
    }
    const response = await getSearchResults(queryObject);
    let queryObjectForFetchBill = [{ key: "tenantId", value: JSON.parse(getUserInfo()).tenantId }, { key: "consumerCode", value: response.WaterConnection[0].connectionNo }, { key: "businessService", value: "WS" }];
    const billData = await fetchBill(queryObjectForFetchBill)
    // const billData = {
    //   "ResposneInfo": null,
    //   "Bill": [
    //     {
    //       "id": "9d9293bc-da3f-474f-a392-b71242791471",
    //       "mobileNumber": null,
    //       "payerName": null,
    //       "payerAddress": null,
    //       "payerEmail": null,
    //       "isActive": true,
    //       "isCancelled": null,
    //       "additionalDetails": null,
    //       "taxAndPayments": [
    //         {
    //           "businessService": "WS",
    //           "taxAmount": 2243.00,
    //           "amountPaid": null
    //         }
    //       ],
    //       "billDetails": [
    //         {
    //           "id": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //           "tenantId": "pb",
    //           "demandId": "4415a6e2-dc52-45c5-a291-f24cd4f02479",
    //           "bill": "9d9293bc-da3f-474f-a392-b71242791471",
    //           "businessService": "WS",
    //           "billNumber": "1001",
    //           "billDate": 1575349398919,
    //           "consumerCode": "WS-CON-003",
    //           "consumerType": "waterConnection",
    //           "expiryDate": 1575397799919,
    //           "minimumAmount": 100.00,
    //           "totalAmount": 2243.00,
    //           "fromPeriod": 1427847400000,
    //           "toPeriod": 1459468809000,
    //           "collectedAmount": 0.00,
    //           "collectionModesNotAllowed": [
    //             "DD"
    //           ],
    //           "partPaymentAllowed": false,
    //           "isAdvanceAllowed": true,
    //           "additionalDetails": null,
    //           "billAccountDetails": [
    //             {
    //               "id": "bae010ef-af1c-415e-aae1-fbea4251c386",
    //               "tenantId": "pb",
    //               "billDetail": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //               "demandDetailId": "57357f4e-177e-4fbb-89ba-9f2a963a302c",
    //               "order": 1,
    //               "amount": 0.00,
    //               "adjustedAmount": 0,
    //               "isActualDemand": false,
    //               "glcode": null,
    //               "taxHeadCode": "WS_TIME_REBATE",
    //               "additionalDetails": null,
    //               "purpose": "ARREAR"
    //             },
    //             {
    //               "id": "f4565063-0d18-4d47-aed4-bd6275491139",
    //               "tenantId": "pb",
    //               "billDetail": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //               "demandDetailId": "ce0485a7-cff9-4bcc-bc34-e6a838023cc0",
    //               "order": 3,
    //               "amount": 97.50,
    //               "adjustedAmount": 0,
    //               "isActualDemand": true,
    //               "glcode": null,
    //               "taxHeadCode": "WS_WATER_CESS",
    //               "additionalDetails": null,
    //               "purpose": "ARREAR"
    //             },
    //             {
    //               "id": "cab4d5e2-ae8b-4caa-9b75-ff6d42fc59b4",
    //               "tenantId": "pb",
    //               "billDetail": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //               "demandDetailId": "d06ed51a-4eba-40c3-9eb5-711bda2fcc62",
    //               "order": 2,
    //               "amount": 0.00,
    //               "adjustedAmount": 0,
    //               "isActualDemand": true,
    //               "glcode": null,
    //               "taxHeadCode": "WS_TIME_INTEREST",
    //               "additionalDetails": null,
    //               "purpose": "ARREAR"
    //             },
    //             {
    //               "id": "b7303fa2-d37c-413a-8744-4b72c8bf94a9",
    //               "tenantId": "pb",
    //               "billDetail": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //               "demandDetailId": "5be159a0-2450-4bc6-8e1a-338f8d9bbd66",
    //               "order": 5,
    //               "amount": 0.50,
    //               "adjustedAmount": 0,
    //               "isActualDemand": true,
    //               "glcode": null,
    //               "taxHeadCode": "WS_Round_Off",
    //               "additionalDetails": null,
    //               "purpose": "ARREAR"
    //             },
    //             {
    //               "id": "e45210e9-2686-409d-b62e-90e797c9ec3a",
    //               "tenantId": "pb",
    //               "billDetail": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //               "demandDetailId": "b7b211f0-024c-4df9-8836-dbdb0ca22207",
    //               "order": 4,
    //               "amount": 195.00,
    //               "adjustedAmount": 0,
    //               "isActualDemand": true,
    //               "glcode": null,
    //               "taxHeadCode": "WS_TIME_PENALTY",
    //               "additionalDetails": null,
    //               "purpose": "OTHERS"
    //             },
    //             {
    //               "id": "40c232ae-c6c4-4ae6-8aa8-f115052568e6",
    //               "tenantId": "pb",
    //               "billDetail": "c083e296-3e94-473b-9c40-27fa7688b67c",
    //               "demandDetailId": "d82fc5c6-f4b2-4246-8461-325dc4c221ec",
    //               "order": 0,
    //               "amount": 1950.00,
    //               "adjustedAmount": 0,
    //               "isActualDemand": false,
    //               "glcode": null,
    //               "taxHeadCode": "WS_CHARGE",
    //               "additionalDetails": null,
    //               "purpose": "ARREAR"
    //             }
    //           ],
    //           "status": null
    //         }
    //       ],
    //       "tenantId": "pb",
    //       "auditDetails": {
    //         "createdBy": "27341795-8dc7-407f-828c-2502458ae8a6",
    //         "lastModifiedBy": "27341795-8dc7-407f-828c-2502458ae8a6",
    //         "createdTime": 1575349398920,
    //         "lastModifiedTime": 1575349398920
    //       }
    //     }
    //   ]
    // }
    response.WaterConnection[0].service = "WATER"
    response.WaterConnection[0].due = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].totalAmount : 0
    response.WaterConnection[0].dueDate = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].expiryDate : ""
    try {
      let data = response.WaterConnection.map(item => ({

        [getTextToLocalMapping("Service")]:
          item.propertyType || "WATER", //will be modified later
        [getTextToLocalMapping("Consumer No")]: item.connectionNo || "-",
        [getTextToLocalMapping("Owner Name")]:
          (item.property.owners !== undefined && item.property.owners.length > 0) ? item.property.owners[0].name : "-" || "-",
        [getTextToLocalMapping("Status")]: item.status || "-",
        [getTextToLocalMapping("Due")]: item.due || 0,
        [getTextToLocalMapping("Address")]: item.property.address.street || "-",
        [getTextToLocalMapping("Due Date")]: convertEpochToDate(item.dueDate) || "-",
        ["tenantId"]: JSON.parse(getUserInfo()).tenantId
        // [getTextToLocalMapping("Connection Type")]: item.connectionType || "-",
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
          "props.title",
          `${getTextToLocalMapping(
            "Search Results for Water & Sewerage Connections"
          )} (${response.WaterConnection.length})`
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
