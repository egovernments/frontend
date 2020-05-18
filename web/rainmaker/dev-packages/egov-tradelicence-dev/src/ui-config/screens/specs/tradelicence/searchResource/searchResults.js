import React from "react";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import {  getLocaleLabels} from "egov-ui-framework/ui-utils/commons";

export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        labelName: "Application No",
        labelKey: "TL_COMMON_TABLE_COL_APP_NO"
      },
      {
        labelName: "License No",
        labelKey: "TL_COMMON_TABLE_COL_LIC_NO"
      },
      {
        labelName: "Trade Name",
        labelKey: "TL_COMMON_TABLE_COL_TRD_NAME"
      },
      {
        labelName: "Owner Name",
        labelKey: "TL_COMMON_TABLE_COL_OWN_NAME"
      },
      {
        labelName: "Application Date",
        labelKey: "TL_COMMON_TABLE_COL_APP_DATE"
      },
      {
        labelName: "Financial Year",
        labelKey: "TL_COMMON_TABLE_COL_FIN_YEAR"
      },
      {
        labelName: "Application Type",
        labelKey: "TL_COMMON_TABLE_COL_APP_TYPE",
        options: {
          filter: false,
          customBodyRender: value => (
            <span>
              {getLocaleLabels(value,value)}
            </span>
          )
        }
      },
      {
        labelName: "Status",
        labelKey: "TL_COMMON_TABLE_COL_STATUS",
        options: {
          filter: false,
          customBodyRender: value => (
            <span
              style={value.includes("APPROVED") ? { color: "green" } : { color: "red" }}
            >
              {getLocaleLabels(value,value)}
            </span>
          )
        }
      },
      {
        labelName: "tenantId",
        labelKey: "tenantId",
        options: {
          display: false
        }
      },
      {
        labelName: "status1",
        labelKey: "status1",
        options: {
          display: false
        }
      },

    ],
    title: {
      labelName: "Search Results for Trade License Applications",
      labelKey: "TL_HOME_SEARCH_RESULTS_TABLE_HEADING"
    },
    rows : "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
      }
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
  switch (rowData[7]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
        rowData[8]
      }`;
      break;
    default:
      window.location.href = `search-preview?applicationNumber=${
        rowData[0]
      }&tenantId=${rowData[8]}`;
      break;
  }
};
