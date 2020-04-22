import { getLocaleLabels, getTransformedLocalStorgaeLabels } from "egov-ui-framework/ui-utils/commons";
import React from "react";
import store from "ui-redux/store";
import { getEpochForDate, getTextToLocalMapping, sortByEpoch } from "../../utils";

export const searchPropertyTable = {
  uiFramework: "custom-molecules",
  moduleName:"egov-pt",
  componentPath: "Table",
  visible: false,
  props: {
    className: "propertyTab",
    columns: [
      getTextToLocalMapping("Unique Property Id"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Address"),
      {
        name: getTextToLocalMapping("Action"),
        options: {
          filter: false,
          customBodyRender: (value,data) =>{
          return(
             <span style={{ color: "red", cursor: "pointer" }} onClick={() => { getSelect(data)}}>
              {value}
            </span>
          )
        }
        }
      },
      {
        name: "tenantId",
        options: {
          display: false
        }
      }
    ],
    title: getTextToLocalMapping("Search Results for Properties"),
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

const getSelect=data=>{
  window.location.href=`/employee/wns/apply?propertyId=${data.rowData[0]}&tenantId=${data.rowData[4]}`
}
