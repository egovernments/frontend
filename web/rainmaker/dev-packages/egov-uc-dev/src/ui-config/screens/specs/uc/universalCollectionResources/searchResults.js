import React from "react";
import {
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "ui-utils/commons";

import {getLocalization} from "ui-utils/localStorageUtils";

import {getTextToLocalMapping,sortByEpoch,getEpochForDate} from "../../utils/index";

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};

export const textToLocalMapping = {
  "Receipt No.": getLocaleLabels(
    "Receipt No",
    "UC_COMMON_TABLE_COL_RECEIPT_NO",
    getTransformedLocalStorgaeLabels()
  ),
  "Payee Name": getLocaleLabels(
    "Consumer Name",
    "UC_COMMON_TABLE_COL_PAYEE_NAME",
    getTransformedLocalStorgaeLabels()
  ),
  "Service Type": getLocaleLabels(
    "Service Category",
    "UC_SERVICE_TYPE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  Date: getLocaleLabels(
    "Receipt Date",
    "UC_COMMON_TABLE_COL_DATE",
    getTransformedLocalStorgaeLabels()
  ),
  "Amount[INR]": getLocaleLabels(
    "Amount Paid[INR]",
    "UC_COMMON_TABLE_COL_AMOUNT",
    getTransformedLocalStorgaeLabels()
  ),

  Status: getLocaleLabels(
    "Status",
    "UC_COMMON_TABLE_COL_STATUS",
    getTransformedLocalStorgaeLabels()
  )

  //Download button
};

export const searchResults = {
  uiFramework: "custom-molecules-local",
  componentPath: "Table",
  moduleName:"egov-uc",
  visible: false,
  props: {
    columns: [

      {
        name : getTextToLocalMapping("Receipt No."),
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div onClick={value => {
                const receiptQueryString = [
                  { key: "receiptNumbers", value:  tableMeta.rowData[0]},
                  { key: "tenantId", value: tableMeta.rowData[7] }
                ]
              //  download(receiptQueryString , "download" ,tableMeta.rowData[6]) ;
              }}>
              {value}
            </div>
          )
        }
      },

      
      getTextToLocalMapping("Payee Name"),
      getTextToLocalMapping("Service Type"),
      getTextToLocalMapping("Date"),
      getTextToLocalMapping("Amount[INR]"),
      getTextToLocalMapping("Status"),
      {
        name: "receiptKey",
        options: {
          display: false
        }
      },
      {
        name: "tenantId",
        options: {
          display: false
        }
      }
    ],
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
