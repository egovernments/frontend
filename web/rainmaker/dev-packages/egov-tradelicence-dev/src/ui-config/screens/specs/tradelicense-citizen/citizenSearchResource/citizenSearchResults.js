import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { textToLocalMapping } from "./citizenFunctions";
import { sortByEpoch, getEpochForDate } from "../../utils";

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: true,
  // moduleName: "egov-tradelicence",
  props: {
    data: [],
    columns: {
      [get(textToLocalMapping, "Application No")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              {rowData[get(textToLocalMapping, "Application No")]}
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "License No")]: {},
      [get(textToLocalMapping, "Trade Name")]: {},
      [get(textToLocalMapping, "Owner Name")]: {},
      [get(textToLocalMapping, "Application Date")]: {},
      [get(textToLocalMapping, "Status")]: {
        format: rowData => {
          let value = rowData[get(textToLocalMapping, "Status")];
          let color = "";
          if (value.indexOf(get(textToLocalMapping, "APPROVED")) !== -1) {
            color = "green";
          } else {
            color = "red";
          }
          return (
            <span
              style={{
                color: color,
                fontSize: "14px",
                fontWeight: 400
              }}
            >
              {value}
            </span>
          );
        }
      }
    },
    title: get(textToLocalMapping, "MY_APPLICATIONS"),
    options: {
      filter: false,
      download: false,
      responsive: "scroll",
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
  switch (rowData[get(textToLocalMapping, "Status")]) {
    case get(textToLocalMapping, "APPLIED"):
    case get(textToLocalMapping, "PENDINGPAYMENT"):
      return `/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "APPROVED"):
      return `/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;

    case get(textToLocalMapping, "PAID"):
    case get(textToLocalMapping, "PENDINGAPPROVAL"):
    case get(textToLocalMapping, "FIELDINSPECTION"):
      return `/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "CANCELLED"):
      return `/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "INITIATED"):
      return `/tradelicense-citizen/apply?applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "REJECTED"):
      return `/tradelicence/search-preview?status=rejected&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    default:
      return `/tradelicense-citizen/home`;
  }
};
