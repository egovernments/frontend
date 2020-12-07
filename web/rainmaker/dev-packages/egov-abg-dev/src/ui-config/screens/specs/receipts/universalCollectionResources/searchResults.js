import React from "react";
import {
  sortByEpoch,
  getEpochForDate
} from "../../utils";
import {download} from "egov-common/ui-utils/commons"
import { setRoute } from "egov-ui-kit/utils/commons";

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [

      {
        labelName: "Receipt No.",
        labelKey: "CR_COMMON_TABLE_COL_RECEIPT_NO",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div onClick={value => {
                const receiptQueryString = [
                  { key: "receiptNumbers", value:  tableMeta.rowData[0]},
                  { key: "tenantId", value: tableMeta.rowData[7] }
                ]
                // download(receiptQueryString , "download" ,tableMeta.rowData[6]) ;
              }}>
              {value}
            </div>
          )
        }
      },
     
      {
        labelName: "Date",
        labelKey: "CR_COMMON_TABLE_COL_DATE"
      },
      {
        labelName: "Consumer code",
        labelKey: "CR_COMMON_TABLE_CONSUMERCODE"
      },
      {
        labelName: "Payee Name",
        labelKey: "CR_COMMON_TABLE_COL_PAYEE_NAME"
      },
      {
        labelName: "Service Type",
        labelKey: "CR_SERVICE_TYPE_LABEL"
      },
      {
        labelName: "Status",
        labelKey: "CR_COMMON_TABLE_COL_STATUS"
      },
      {
        labelName: "Action",
        labelKey: "CR_COMMON_TABLE_ACTION",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div onClick={value => {
                setRoute(`/receipts/viewReceipt?receiptNumbers=${tableMeta.rowData[0]}&tenantId=${tableMeta.rowData[8]}&businessService=${tableMeta.rowData[9]}`);
              }}>
              {value}
            </div>
          )
        }
      },
      {
        labelName: "Receipt Key",
        labelKey: "RECEIPT_KEY",
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
        labelName: "SERVICE TYPE",
        labelKey: "SERVICE_TYPE",
        options: {
          display: false
        }
      },
      
    ],
    title: {
      labelKey: "COMMON_TABLE_SEARCH_RESULT_RECIEPT",
      labelName: "Search Results for Receipt",
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
    },
    customSortColumn: {
      column: "Date",
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
