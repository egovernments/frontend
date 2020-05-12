import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import React from "react";
import { getEpochForDate, getTextToLocalMapping, sortByEpoch } from "../../utils";

const url = getQueryArg(
  window.location.href,
  "redirectUrl"
);

export const searchPropertyTable = {
  uiFramework: "custom-molecules",
  moduleName:"egov-pt",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
       name: getTextToLocalMapping("Unique Property Id"),  
       options: {
        filter: false,
        customBodyRender: (value) =>{
        return(
           <span style={{ color: "black",cursor: "auto" }}>
            {value}
          </span>
        )
      }
      }
    },
     
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Address"),
      {
        name: getTextToLocalMapping("Action"),
        options: {
          filter: false,
          customBodyRender: (value,data) =>{
            let styleSelect = {}
                styleSelect.color = "red"
                styleSelect.cursor= (data.rowData[3] !== "INACTIVE")?"pointer":"initial";
          return(
             <span style={styleSelect} onClick={() => { getSelect(data)}}>
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
  if(data.rowData[3] === 'INACTIVE'){
    return false;
  }

  if(process.env.REACT_APP_NAME == "Citizen"){
    window.location.href=`/citizen${url}?propertyId=${data.rowData[0]}&tenantId=${data.rowData[4]}`
  }else{
    window.location.href=`/employee${url}?propertyId=${data.rowData[0]}&tenantId=${data.rowData[4]}`
  }
}
