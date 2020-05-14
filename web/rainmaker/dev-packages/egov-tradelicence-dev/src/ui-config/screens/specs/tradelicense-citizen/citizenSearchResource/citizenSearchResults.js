import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { textToLocalMapping } from "./citizenFunctions";
import { sortByEpoch, getEpochForDate,getTextToLocalMapping } from "../../utils";

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: true,
  // moduleName: "egov-tradelicence",
  props: {
    data: [],
    columns: [
      getTextToLocalMapping("Application No"), 
      getTextToLocalMapping("License No"),
      getTextToLocalMapping("Trade Name"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Application Date"),
      getTextToLocalMapping("Status"),
      // {
      //   name: getTextToLocalMapping("Status"),
      //   options: {
      //     filter: false,
      //     customBodyRender: value => (

      //       <span
      //         style={
      //           value === "APPROVED" ? { color: "green" } : { color: "red" }
      //         }
      //       >
      //         {getTextToLocalMapping(value)}
      //       </span>
      //     )
      //   }
      // },
      {
        name: "tenantId",
        options: {
          display: false
        }
      }],
      title: getTextToLocalMapping("MY_APPLICATIONS"),
    options: {
      filter: false,
      download: false,
      responsive: "scroll",
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

// const onRowClick = rowData => {
//   switch (rowData[get(textToLocalMapping, "Status")]) {
//     case get(textToLocalMapping, "APPLIED"):
//     case get(textToLocalMapping, "PENDINGPAYMENT"):
//       return `/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
//         rowData[get(textToLocalMapping, "Application No")]
//       }&tenantId=${rowData["tenantId"]}`;
//     case get(textToLocalMapping, "APPROVED"):
//       return `/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
//         rowData[get(textToLocalMapping, "Application No")]
//       }&tenantId=${rowData["tenantId"]}`;

//     case get(textToLocalMapping, "PAID"):
//     case get(textToLocalMapping, "PENDINGAPPROVAL"):
//     case get(textToLocalMapping, "FIELDINSPECTION"):
//       return `/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
//         rowData[get(textToLocalMapping, "Application No")]
//       }&tenantId=${rowData["tenantId"]}`;
//     case get(textToLocalMapping, "CANCELLED"):
//       return `/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
//         rowData[get(textToLocalMapping, "Application No")]
//       }&tenantId=${rowData["tenantId"]}`;
//     case get(textToLocalMapping, "INITIATED"):
//       return `/tradelicense-citizen/apply?applicationNumber=${
//         rowData[get(textToLocalMapping, "Application No")]
//       }&tenantId=${rowData["tenantId"]}`;
//     case get(textToLocalMapping, "REJECTED"):
//       return `/tradelicence/search-preview?status=rejected&role=approver&applicationNumber=${
//         rowData[get(textToLocalMapping, "Application No")]
//       }&tenantId=${rowData["tenantId"]}`;
//     default:
//       return `/tradelicense-citizen/home`;
//   }
// };


const onRowClick = rowData => {
  switch (rowData[5]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
        rowData[6]
      }`;
      break;
    default:

    let curl = window.location.href;
    console.log(curl,"curl")
    let url = curl.replace ("tradelicense-citizen/home" ,"tradelicence");
    console.log(url,"url")

      window.location.href = `${url}/search-preview?applicationNumber=${
        rowData[0]
      }&tenantId=${rowData[6]}`;
      break;
  }
};
