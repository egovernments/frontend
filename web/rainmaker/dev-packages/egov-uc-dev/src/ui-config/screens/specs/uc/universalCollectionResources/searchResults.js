import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { sortByEpoch, getEpochForDate } from "../../utils";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";
import { generateReciept } from "../../utils/recieptPdf";
import {
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";
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
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    // data: [],
    columns: {
      [get(textToLocalMapping, "Receipt No.")]: {
        format: rowData => {
          return (
            <span
              style={{
                color: "#FE7A51",
                cursor: "pointer",
                textDecoration: "underline"
              }}
              onClick={() => generateReciept(rowData)}
            >
              {rowData[get(textToLocalMapping, "Receipt No.")]}
            </span>
            // <span style="cursor:pointer">pointer</span>
          );
        }
      },
      [get(textToLocalMapping, "Payee Name")]: {},
      [get(textToLocalMapping, "Service Type")]: {},
      [get(textToLocalMapping, "Date")]: {},
      [get(textToLocalMapping, "Amount[INR]")]: {},
      [get(textToLocalMapping, "Status")]: {}
    },
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
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

const onRowClick = rowData => {
  switch (rowData[get(textToLocalMapping, "")]) {
    default:
      return `/uc/search`;
  }
};
