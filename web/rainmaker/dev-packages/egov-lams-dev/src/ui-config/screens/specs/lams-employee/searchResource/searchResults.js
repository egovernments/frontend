import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import { getLocaleLabels, getStatusKey} from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        labelName: "Application No",
        labelKey: "LAMS_TABLE_COL_APP_NO",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => (
              <a href="javascript:void(0)" onClick={() => onRowClick(tableMeta.rowData)}>{value}</a>
          )
        }
      },
      {
        labelName: "Applicant Name",
        labelKey: "LAMS_TABLE_COL_APPLCNT_NAME"
      },
      {
        labelName: "Application Date",
        labelKey: "LAMS_TABLE_COL_APP_DATE"
      },
      {
        labelName: "Application Type",
        labelKey: "LAMS_TABLE_COL_APP_TYPE",
        options: {
          filter: false,
          customBodyRender: value => (
            <span>
              {getLocaleLabels(value,value)}
            </span>
          )
        }
      },
      {
        labelName: "Status",
        labelKey: "LAMS_TABLE_COL_STATUS",
        options: {
          filter: false,
          customBodyRender: value => (
            <LabelContainer
              style={
                value.includes("APPROVED") ? { color: "green" } : { color: "red" }
              }
              labelKey={"SEARCH_"+getStatusKey(value).labelKey}
              labelName={"SEARCH_"+getStatusKey(value).labelName}
            />
          )
        }
      },
      {
        labelName: "Tenant Id",
        labelKey: "TENANT_ID",
        options: {
          display: false,
          viewColumns  :false
        }
      },
      {
        labelName: "Status",
        labelKey: "TL_COMMON_TABLE_COL_STATUS",
        options: {
          display: false,
          viewColumns  :false
        }
      },

    ],
    title: {
      labelName: "Search Results for Lease Renewal Applications",
      labelKey: "LAMS_SEARCH_RESULTS_TABLE_HEADING"
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
  switch (rowData[7]) {
    // case "INITIATED":
    //   window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
    //     rowData[6]
    //   }`;
    //   break;
    default:
      window.location.href = `../lams-common/search-preview?applicationNumber=${rowData[0]}&tenantId=${rowData[5]}`;
      //setRoute(`/lams-common/search-preview?applicationNumber=${rowData[0]}&tenantId=${rowData[5]}`);
      break;
      //setRoute(`/lams-common/search-preview?applicationNumber=${rowData[0]}&tenantId=${rowData[6]}`);
      //break;
      
      
  }
};
