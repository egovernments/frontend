import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, fetchBill } from "../../../../..//ui-utils/commons";
import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping,
} from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: "pb.amritsar"
    },
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children",
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
          labelKey: "ERR_WS_FILL_MANDATORY_FIELDS"
        },
        "error"
      )
    );
  } else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
    const response = await getSearchResults(queryObject);
    let queryObjectForFetchBill = [{ key: "tenantId", value: 'pb.amritsar' }, { key: "consumerCode", value: response.WaterConnection[0].connectionNo }, { key: "businessService", value: "WS" }];
    const billData = await fetchBill(queryObjectForFetchBill)
    response.WaterConnection[0].service = "WATER"
    response.WaterConnection[0].due = billData.Bill[0].billDetails.length > 0 ? billData.Bill[0].billDetails[0].totalAmount : 0
    try {
      let data = response.WaterConnection.map(item => ({

        [getTextToLocalMapping("Service")]:
          item.service || "-", //will be modified later
        [getTextToLocalMapping("Consumer No")]: item.connectionNo || "-",
        [getTextToLocalMapping("Owner Name")]:
          (item.property.owners !== undefined && item.property.owners.length > 0) ? item.property.owners[0].name : "-" || "-",
        [getTextToLocalMapping("Status")]: item.status || "-",
        [getTextToLocalMapping("Due")]: item.due || 0,
        [getTextToLocalMapping("Address")]: item.property.address.street || "-",
        ["tenantId"]: 'pb.amritsar',
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
