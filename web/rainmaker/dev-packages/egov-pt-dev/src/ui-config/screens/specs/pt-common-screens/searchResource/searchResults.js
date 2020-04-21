import { getLocaleLabels, getTransformedLocalStorgaeLabels } from "egov-ui-framework/ui-utils/commons";
// import { setRoute } from "egov-ui-kit/redux/app/actions";
import { getApplicationType,setRoute } from "egov-ui-kit/utils/commons";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";
import React from "react";
import store from "ui-redux/store";
import { getEpochForDate, getTextToLocalMapping, sortByEpoch } from "../../utils";

export const searchPropertyTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "propertyTab",
    // data: [],
    columns: [
      getTextToLocalMapping("Unique Property Id"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Address"),
      {
        name: getTextToLocalMapping("Action"),
        options: {
          filter: false,
          customBodyRender: (data) => (
            <span
              style={
                { color: "#337ab7", cursor: "pointer", textDecoration: "underline" }
              }
              onClick={() => {
                getSelect(data)
              }}
            >
              {value.propertyId}
            </span>
            // <div className="linkStyle" style={{ textTransform: 'uppercase',color:"red" }} onClick={() => getSelect(data)}>
            //     <a>Select</a>
            //     </div>
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
    title: getTextToLocalMapping("Search Results for Properties"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index, dispatch) => {
      //   onPropertyTabClick(row, dispatch);
      // }
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
  console.log("===>data",data)
}



// const onPropertyTabClick = (rowData, dispatch) => {
//   switch (rowData[5]) {
//     case "INITIATED":
//       window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
//         rowData[6]
//         }`;
//       break;
//     default:
//       // window.location.href = `search-preview?applicationNumber=${
//       // window.location.pathname=`property-tax/property/${rowData[0]}/${rowData[6]}`;
//       navigate(propertyInformationScreenLink(rowData[0].props.children,rowData[6]));
//       //   rowData[0]
//       // }&tenantId=${rowData[6]}`; 
//       break;
//   }
// };



// const navigate=(url)=>{
//   // store.dispatch(setRoute(url));
//   setRoute(url);
// }

// const propertyInformationScreenLink=(propertyId,tenantId)=>{
//   if(process.env.REACT_APP_NAME == "Citizen"){
//     return `/property-tax/my-properties/property/${propertyId}/${tenantId}`;
//   }else{
//     return `/property-tax/property/${propertyId}/${tenantId}`;
//   }
// }