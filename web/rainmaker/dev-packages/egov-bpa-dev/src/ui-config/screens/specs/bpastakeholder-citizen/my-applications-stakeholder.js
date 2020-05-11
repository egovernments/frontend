import { fetchData, fieldChange, clearFilter } from "./citizenSearchResource/citizenFunctions";
import { getCommonHeader, getSelectField, getCommonContainer, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  sortByEpoch,
  getEpochForDate,
  getBpaTextToLocalMapping
} from "../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";


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
    fetchData(action, state, dispatch, false, true);
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
                labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select Application Type",
                labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_PLACEHOLDER"
              },
              jsonPath: "filterData[0].applicationType",
              props: {
                style: { marginLeft: "20px" }
              },
              data: [
                {
                  code: getBpaTextToLocalMapping("BPA_APPLY_SERVICE"),
                  label: "BPA"
                },
                {
                  code: getBpaTextToLocalMapping("BPAREG_SERVICE"),
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
                labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select Service Type",
                labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_PLACEHOLDER"
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
          applicationStatus : {
            ...getSelectField({
              label: {
                labelName: "Status",
                labelKey: "BPA_STATUS_LABEL"
              },
              optionLabel: "name",
              placeholder: {
                labelName: "Select Status",
                labelKey: "BPA_STATUS_PLACEHOLDER"
              },
              jsonPath: "filterData[0]." + [getBpaTextToLocalMapping("BPA_COL_APP_STATUS")],
              data: [{ code: getBpaTextToLocalMapping("PENDINGPAYMENT") }, { code: getBpaTextToLocalMapping("REJECTED") }, { code: getBpaTextToLocalMapping("APPROVED") }, { code: getBpaTextToLocalMapping("INITIATED") }, { code: getBpaTextToLocalMapping("CITIZEN_APPROVAL_INPROCESS") }, { code: getBpaTextToLocalMapping("INPROGRESS") }, { code: getBpaTextToLocalMapping("PENDING_FEE") }, { code: getBpaTextToLocalMapping("DOC_VERIFICATION_INPROGRESS") }, { code: getBpaTextToLocalMapping("FIELDINSPECTION_INPROGRESS") }, { code: getBpaTextToLocalMapping("NOC_VERIFICATION_INPROGRESS") }, { code: getBpaTextToLocalMapping("APPROVAL_INPROGRESS") }, { code: getBpaTextToLocalMapping("PENDING_APPL_FEE") }, { code: getBpaTextToLocalMapping("PENDING_SANC_FEE_PAYMENT") }, { code: getBpaTextToLocalMapping("CITIZEN_ACTION_PENDING_AT_DOC_VERIF") }, { code: getBpaTextToLocalMapping("CITIZEN_ACTION_PENDING_AT_FI_VERIF") }, { code: getBpaTextToLocalMapping("CITIZEN_ACTION_PENDING_AT_NOC_VERIF") }],
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
              getBpaTextToLocalMapping("BPA_COL_MODULE_SERVICE"),
              getBpaTextToLocalMapping("BPA_COL_ASSIGNEDTO"),
              getBpaTextToLocalMapping("BPA_COMMON_SLA"),
              getBpaTextToLocalMapping("BPA_COL_APP_STATUS"),
              {
                name: "tenantId",
                options: {
                  display: false
                }
              },
              {
                name: "serviceType",
                options: {
                  display: false
                }
              },
              {
                name: "type",
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
  const environment = process.env.NODE_ENV === "production" ? "citizen" : "";
  if (rowData[6] === "BPAREG") {
    switch (rowData[4]) {
      case "INITIATED":
        window.location.href = `${environment}/bpastakeholder/apply?applicationNumber=${rowData[0]}&tenantId=${rowData[5]}`;
        break;
      default:
        window.location.href = `${environment}/bpastakeholder/search-preview?applicationNumber=${rowData[0]}&tenantId=${rowData[5]}`;
    }
  } else {
    switch (rowData[4]) {
      case "Initiated":
      window.location.href = `${environment}/egov-bpa/apply?applicationNumber=${rowData[0]}&tenantId=${rowData[5]}`;
        break;
      default:
      window.location.href = `${environment}/egov-bpa/search-preview?applicationNumber=${rowData[0]}&tenantId=${rowData[5]}&type=${rowData[7]}`
    }
  }
};

export default screenConfig;
