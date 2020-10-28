import React from "react";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import { download, downloadBill } from "egov-common/ui-utils/commons";
import {  getLocaleLabels} from "egov-ui-framework/ui-utils/commons";

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        labelName: "Bill No.",
        labelKey: "BILL_COMMON_SERVICE_TYPE",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <a href="javascript:void(0)"
              onClick={() => {
                console.log('CLICKED');
                // downloadBill(tableMeta.rowData[1], tableMeta.rowData[10], tableMeta.rowData[9],tableMeta.rowData[12]);
              }}
            >
              {value}
            </a>
          )
        }
      },
      {
        labelName: "Consumer Code",
        labelKey: "BILL_COMMON_APPLICATION_NO",

      },
      {
        labelName: "Consumer Code",
        labelKey: "PAYMENT_COMMON_CONSUMER_CODE",

      },
      {
        labelName: "Consumer Name",
        labelKey: "BILL_COMMON_TABLE_COL_CONSUMER_NAME"
      },
      {
        labelName: "Consumer Name",
        labelKey: "BILL_COMMON_TABLE_CONSUMER_ADDRESS"
      },
      // {
      //   labelName: "Bill Date",
      //   labelKey: "BILL_COMMON_TABLE_CONSUMER_ADDRESS"
      // },
      // {
      //   labelName: "Bill Amount(Rs)",
      //   labelKey: "BILL_COMMON_TABLE_COL_STATUS"
      // },
      {
        labelName: "Status",
        labelKey: "BILL_COMMON_TABLE_COL_STATUS",
        options:{
          filter: false,
          customBodyRender: value => (
            <span>
               {getLocaleLabels(value.toUpperCase(),value.toUpperCase())}
            </span>
          )

        }
      },
      // {
      //   labelName: "Action",
      //   labelKey: "BILL_COMMON_TABLE_COL_ACTION",
      //   options: {
      //     filter: false,
      //     customBodyRender: (value, tableMeta) => value === "PAY" ? (tableMeta.rowData[4] > 0 ? getActionButton(value, tableMeta):(tableMeta.rowData[4] <= 0 && tableMeta.rowData[13] ? getActionButton(value, tableMeta) : "")) : getActionButton(value, tableMeta)
      //   }
      // },
      {
        labelKey: "BUSINESS_SERVICE",
        labelName: "Business Service",
        options: {
          display: false
        }
      },
      {
        labelKey: "RECEIPT_KEY",
        labelName: "Receipt Key",
        options: {
          display: false
        }
      },
      {
        labelName: "Bill Key",
        labelKey: "BILL_KEY",
        options: {
          display: false
        }
      },
      {
        labelName: "Tenant Id",
        labelKey: "TENANT_ID",
        options: {
          display: false
        }
      },
      {
        labelName: "Bill Id",
        labelKey: "BILL_ID",
        options: {
          display: false
        }
      },
      {
        labelName: "Bill Search Url",
        labelKey: "BILL_SEARCH_URL",
        options: {
          display: false
        }
      },
      {
        labelName: "Advance Payment",
        labelKey: "ADVANCE_PAYMENT",
        options: {
          display: false
        }
      }
    ],
    title: {
      labelName: "Search Results for Bill",
      labelKey: "BILL_SEARCH_TABLE_HEADER"
    },
    rows : "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Bill Date",
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

const getActionButton = (value, tableMeta) => {
  return (
    <a href="javascript:void(0)"
      style={{
        color: "#FE7A51",
        cursor: "pointer"
      }}
      onClick={value => {
        const appName =
          process.env.REACT_APP_NAME === "Citizen"
            ? "citizen"
            : "employee";
        if (tableMeta.rowData[5] === "PAID") {
          const receiptQueryString = [
            { key: "billIds", value: tableMeta.rowData[11] },
            { key: "tenantId", value: tableMeta.rowData[10] }
          ];
          download(receiptQueryString , "download" ,tableMeta.rowData[8]);
        } else {
          const url =
            process.env.NODE_ENV === "development"
              ? `/egov-common/pay?consumerCode=${
                  tableMeta.rowData[1]
                }&tenantId=${tableMeta.rowData[10]}&businessService=${
                  tableMeta.rowData[7]
                }`
              : `/${appName}/egov-common/pay?consumerCode=${
                  tableMeta.rowData[1]
                }&tenantId=${tableMeta.rowData[10]}&businessService=${
                  tableMeta.rowData[7]
                }`;
          document.location.href = `${document.location.origin}${url}`;
        }
      }}
    >
      {getLocaleLabels(value,value)}
    </a>
  )
}