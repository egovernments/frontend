import { fetchData, fieldChange, clearFilter } from "./citizenSearchResource/citizenFunctions";
import { getCommonHeader, getSelectField, getCommonContainer, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  sortByEpoch,
  getEpochForDate,
  getBpaTextToLocalMapping
} from "../utils";


const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "TL_MY_APPLICATIONS"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications-stakeholder",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch, true, true);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        filterCard: getCommonContainer({
          applicationType: {
            ...getSelectField({
              label: {
                labelName: "Application Type",
                labelKey: "SELECT_APPLICATION_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select Application Type",
                labelKey: "APPLICATION_TYPE_PLACEHOLDER"
              },
              jsonPath: "filterData[0].applicationType",
              props: {
                style: { marginLeft: "20px" }
              },
              data: [
                {
                  code: "BPA Apply",
                  label: "BPA"
                },
                {
                  code: "Stake Holder",
                  label: "Stakeholder"
                }
              ],
              gridDefination: {
                xs: 12,
                sm: 3
              }
            }),
            afterFieldChange: (action, state, dispatch) => {
              fieldChange(action, state, dispatch);
            }
          },
          serviceType: {
            ...getSelectField({
              label: {
                labelName: "Service Type",
                labelKey: "SELECT_SERVICE_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select Service Type",
                labelKey: "SERVICE_TYPE_PLACEHOLDER"
              },
              optionLabel: "name",
              sourceJsonPath: "applyScreenMdmsData.BPA.ServiceType",
              jsonPath: "filterData[0].serviceType",
              props: {
                style: { marginLeft: "20px" },
                disabled: true
              },
              gridDefination: {
                xs: 12,
                sm: 3
              }
            }),
            afterFieldChange: (action, state, dispatch) => {
              fieldChange(action, state, dispatch);
            }
          },
          Status: {
            ...getSelectField({
              label: {
                labelName: "Status",
                labelKey: "SELECT_STATUS_LABEL"
              },
              optionLabel: "name",
              placeholder: {
                labelName: "Select Status",
                labelKey: "APP_STATUS_PLACEHOLDER"
              },
              jsonPath: "filterData[0].Status",
              data: [{ code: "PENDINGPAYMENT" }, { code: "PENDINGDOCVERIFICATION" }, { code: "REJECTED" }, { code: "PENDINGAPPROVAL" }, { code: "APPROVED" }, { code: "INITIATED" }, { code: "CITIZEN_APPROVAL_INPROCESS" }, { code: "INPROGRESS" }, { code: "PENDING_FEE" }, { code: "DOC_VERIFICATION_INPROGRESS" }, { code: "FIELDINSPECTION_INPROGRESS" }, { code: "NOC_VERIFICATION_INPROGRESS" }, { code: "APPROVAL_INPROGRESS" }, { code: "PERMIT REVOCATION" }, { code: "PENDING_APPL_FEE" }, { code: "PENDING_SANC_FEE_PAYMENT" }, { code: "CITIZEN_ACTION_PENDING_AT_DOC_VERIF" }, { code: "CITIZEN_ACTION_PENDING_AT_FI_VERIF" }, { code: "CITIZEN_ACTION_PENDING_AT_NOC_VERIF" }],
              props: {
                style: { marginLeft: "20px" }
              },
              gridDefination: {
                xs: 12,
                sm: 3
              }
            }),
            afterFieldChange: (action, state, dispatch) => {
              fieldChange(action, state, dispatch);
            }
          },
          clearBtn: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 3
              // align: "center"
            },
            props: {
              variant: "contained",
              style: {
                color: "white",
                margin: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                borderRadius: "2px",
                width: "220px",
                height: "48px"
              }
            },
            children: {
              buttonLabel: getLabel({
                labelName: "Clear Filter",
                labelKey: "Clear Filter"
              })
            },
            onClickDefination: {
              action: "condition",
              callBack: clearFilter
            }
          }
        }),
        applicationsCard: {
          uiFramework: "custom-molecules",
          name: "search-applications-stakeholder",
          // moduleName: "egov-tradelicence",
          componentPath: "Table",
          props: {
            columns: [
              getBpaTextToLocalMapping("Application No"),
              getBpaTextToLocalMapping("Owner Name"),
              getBpaTextToLocalMapping("Application Date"),
              getBpaTextToLocalMapping("Status"),
              // {
              //   name: getBpaTextToLocalMapping("Status"),
              //   options: {
              //     filter: false,
              //     customBodyRender: value => (
              //       <span
              //         style={
              //           value === "APPROVED" ? { color: "green" } : { color: "red" }
              //         }
              //       >
              //         {getBpaTextToLocalMapping(value)}
              //       </span>
              //     )
              //   }
              // },
              {
                name: "tenantId",
                options: {
                  display: false
                }
              }
            ],
            title: getBpaTextToLocalMapping("Search Results for BPA Applications"),
            // jsonPath: "searchResults",
            options: {
              filter: false,
              download: false,
              responsive: "stacked",
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
        }
      }
    }
  }
};

const onRowClick = rowData => {
  const state = rowData[3];
  const applicationNumber = rowData[0];
  const tenantId = rowData[4];
  switch (state) {
    case "INITIATED":
      window.location.href = `/egov-bpa/apply?applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
      break;
    default:
      window.location.href = `/egov-bpa/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
      break;
  }
};

export default screenConfig;
