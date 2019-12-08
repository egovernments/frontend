import React from "react";
import { sortByEpoch, getEpochForDate, getTextToLocalMapping } from "../../utils";
import { Link } from "react-router-dom"

export const searchResults = {
  uiFramework: "custom-molecules",
  moduleName: "egov-wns",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        name: getTextToLocalMapping("Service"),
        options: {
          filter: false,
          customBodyRender: value => (
            <span style={{ color: '#000000' }}>
              {value}
            </span>
          )
        }
      },

      // {
      //   name: getTextToLocalMapping("Application No"),
      //   options: {
      //     filter: false,
      //     customBodyRender: value => (
      //       <Link to="connection-details">
      //         {value}
      //       </Link>
      //     )
      //   }
      // },
      getTextToLocalMapping("Consumer No"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Address"),
      getTextToLocalMapping("Status"),
      getTextToLocalMapping("Due"),
      getTextToLocalMapping("Due Date"),
      {
        name: getTextToLocalMapping(" "),
        options: {
          filter: false,
          customBodyRender: (value, data) => (
            <Link to={`/wns/viewBill?connectionNumber=${data.rowData[1]}&tanentId=${data.rowData[8]}`} style={{ color: '#fe7a51', textTransform: 'uppercase' }}>
              Pay now
            </Link>
          )
        }
      },
      {
        name: "tenantId",
        options: {
          display: false
        }
      }
    ],
    title: getTextToLocalMapping(
      "Search Results for Water & Sewerage Connections"
    ),
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