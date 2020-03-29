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
      getTextToLocalMapping("Application No"),
      {
        name : getTextToLocalMapping("From District"),
        options:{
          filter: false,
          customBodyRender: value => (
            <span>
               {getLocaleLabels(value,`TRADELICENSE_DISTRICT_${value}`)}
            </span>
          )

        }
      },
      {
        name : getTextToLocalMapping("To District"),
        options:{
          filter: false,
          customBodyRender: value => (
            <span>
               {getLocaleLabels(value,`TRADELICENSE_DISTRICT_${value}`)}
            </span>
          )

        }
      },
      getTextToLocalMapping("Name"),
      {
        name : getTextToLocalMapping("e-Pass Category"),
        options:{
          filter: false,
          customBodyRender: value => (
            <span>
               {getLocaleLabels(value,`TRADELICENSE_TRADETYPE_${value}`)}
            </span>
          )

        }
      },
      // getTextToLocalMapping("To District"),
      // getTextToLocalMapping("Status"),
      {
        name: "tenantId",
        options: {
          display: false
        }
      },
      {
        name:"status1",
        options: {
          display: false
        }
      },

    ],
    title: getTextToLocalMapping(
      "Search Results for Trade License Applications"
    ),
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
  switch (rowData[8]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
        rowData[5]
      }`;
      break;
    default:
      window.location.href = `search-preview?applicationNumber=${
        rowData[0]
      }&tenantId=${rowData[5]}`;
      break;
  }
};
