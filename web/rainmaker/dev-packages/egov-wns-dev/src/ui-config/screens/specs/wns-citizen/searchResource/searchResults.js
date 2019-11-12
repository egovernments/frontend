import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { sortByEpoch, getEpochForDate } from "../../utils";
import {
  getLocalization,
  getTenantId
} from "egov-ui-kit/utils/localStorageUtils";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};

export const textToLocalMapping = {
  "Service": getLocaleLabels(
    "Service",
    "WS_COMMON_TABLE_COL_SERVICE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Application No": getLocaleLabels(
    "Application No",
    "WS_COMMON_TABLE_COL_APP_NO_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Consumer No": getLocaleLabels(
    "Consumer No",
    "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "WS_COMMON_TABLE_COL_OWN_NAME_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Address": getLocaleLabels(
    "Address",
    "WS_COMMON_TABLE_COL_ADDRESS",
    getTransformedLocalStorgaeLabels()
  ),
  "Due": getLocaleLabels(
    "Due",
    "WS_COMMON_TABLE_COL_DUE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  Status: getLocaleLabels(
    "Status",
    "NOC_COMMON_TABLE_COL_STATUS_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  INITIATED: getLocaleLabels(
    "Initiated,",
    "NOC_INITIATED",
    getTransformedLocalStorgaeLabels()
  ),
  APPLIED: getLocaleLabels(
    "Applied",
    "NOC_APPLIED",
    getTransformedLocalStorgaeLabels()
  ),
  DOCUMENTVERIFY: getLocaleLabels(
    "Pending for Document Verification",
    "WF_FIRENOC_DOCUMENTVERIFY",
    getTransformedLocalStorgaeLabels()
  ),
  APPROVED: getLocaleLabels(
    "Approved",
    "NOC_APPROVED",
    getTransformedLocalStorgaeLabels()
  ),
  REJECTED: getLocaleLabels(
    "Rejected",
    "NOC_REJECTED",
    getTransformedLocalStorgaeLabels()
  ),
  CANCELLED: getLocaleLabels(
    "Cancelled",
    "NOC_CANCELLED",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGAPPROVAL: getLocaleLabels(
    "Pending for Approval",
    "WF_FIRENOC_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_FIRENOC_PENDINGPAYMENT",
    getTransformedLocalStorgaeLabels()
  ),
  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_FIRENOC_FIELDINSPECTION",
    getTransformedLocalStorgaeLabels()
  ),
  "Search Results for Water & Sewerage Connections": getLocaleLabels(
    "Search Results for Water & Sewerage Connections",
    "WS_HOME_SEARCH_RESULTS_TABLE_HEADING",
    getTransformedLocalStorgaeLabels()
  )
};

export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
    // data: [],
    columns: {
      [get(textToLocalMapping, "Service")]: {},
      [get(textToLocalMapping, "Application No")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              <span
                style={{
                  color: "#FE7A51"
                }}
              >
                {rowData[get(textToLocalMapping, "Application No")]}
              </span>
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "Consumer No")]: {},
      [get(textToLocalMapping, "Owner Name")]: {},
      [get(textToLocalMapping, "Address")]: {},
      [get(textToLocalMapping, "Due")]: {},
      // [get(textToLocalMapping, "Status")]: {}
    },
    title: get(textToLocalMapping, "Search Results for Water & Sewerage Connections"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

const onRowClick = rowData => {
  let appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  switch (rowData[get(textToLocalMapping, "Status")]) {
    case get(textToLocalMapping, "APPLIED"):
    case get(textToLocalMapping, "PENDINGPAYMENT"):
    case get(textToLocalMapping, "APPROVED"):
    case get(textToLocalMapping, "PENDINGAPPROVAL"):
    case get(textToLocalMapping, "FIELDINSPECTION"):
    case get(textToLocalMapping, "REJECTED"):
    case get(textToLocalMapping, "CANCELLED"):
    case get(textToLocalMapping, "DOCUMENTVERIFY"):
      return `${appendUrl}/fire-noc/search-preview?applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
        }&tenantId=${rowData["tenantId"]}`;

    case get(textToLocalMapping, "INITIATED"):
      return `${appendUrl}/fire-noc/apply?applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
        }&tenantId=${rowData.tenantId}`;

    default:
      return `${appendUrl}/fire-noc/search`;
  }
};
