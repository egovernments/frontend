import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  getFileUrl,
  getQueryArg,
  getTransformedLocale,
  setBusinessServiceDataToLocalStorage
} from "egov-ui-framework/ui-utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { getAppSearchResults } from "../../../../ui-utils/commons";
import { requiredDocumentsData } from "../utils/index";
import generatePdf from "../utils/generatePdfForBpa";
// import { citizenFooter } from "./searchResource/citizenFooter";
import { documentAndNocSummary } from "./summaryResource/documentAndNocSummary";
import { scrutinySummary } from "./summaryResource/scrutinySummary";
import { httpRequest, edcrHttpRequest } from "../../../../ui-utils/api";
import { permitConditions } from "../egov-bpa/summaryResource/permitConditions";
import { permitListSummary } from "../egov-bpa/summaryResource/permitListSummary";
import { permitOrderNoDownload, downloadFeeReceipt, revocationPdfDownload } from "../utils/index";
import "../egov-bpa/applyResource/index.css";
import "../egov-bpa/applyResource/index.scss";
import { getUserInfo, getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const titlebar = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    leftContainerH:getCommonContainer({
      header: getCommonHeader({
        labelName: "Task Details",
        labelKey: "NOC_TASK_DETAILS_HEADER"
      }),
      applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "ApplicationNoContainer",
        props: {
          number: ""
        }
      }
    }),
    rightContainerH: getCommonContainer({
      footNote : {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "NoteAtom",
        props: {
          labelName: "This licensee is valid for <xx> Year(s)",
          labelKey: ["BPA_LICENSE_VALID_LABEL"],
        },
        visible: false
      }
    })
  }
}

const titlebar2 = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  // visible: false,
  props: {
    style: { textAlign: "right", display: "flex" }
  },
  children: {
    permitNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "PermitNumber",
      gridDefination: {},
      props: {}
    },
    rightContainer:getCommonContainer({
      downloadMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: {labelName : "DOWNLOAD" , labelKey :"TL_DOWNLOAD"},
            leftIcon: "cloud_download",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color : "#FE7A51", marginRight : 10 }, className: "tl-download-button" },
            menu: []
          }
        }
      },
      printMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: {labelName : "PRINT" , labelKey :"TL_PRINT"},
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color : "#FE7A51" }, className: "tl-download-button" },            
            menu: []
          }
        }
      }
    })
  }
}

const setSearchResponse = async (
  state,
  dispatch,
  applicationNumber,
  tenantId, action
) => {
  const response = await getAppSearchResults([
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "applicationNos", value: applicationNumber }
  ])
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    setSearchResponse(state, dispatch, applicationNumber, tenantId, action);

    const queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessServices", value: "BPA" }
    ];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);
    
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css bpa-searchpview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
                md: 6
              },
              ...titlebar
            },
            header2: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 6,
                md: 6,
                align: "right"
              },
              children: {
                  titlebar2
                    }
            }
          }
        },
        
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: true,
          props: {
            dataPath: "BPA",
            moduleName: "BPA",
            updateUrl: "/bpa-services/v1/bpa/_update"
          }
        },
        sendToArchPickerDialog :{
          componentPath: "Dialog",
          props: {
            open: false,
            maxWidth: "md"
          },
          children: {
            dialogContent: {
              componentPath: "DialogContent",
              props: {
                classes: {
                  root: "city-picker-dialog-style"
                }
              },
              children: {
                popup: getCommonContainer({
                  header: getCommonHeader({
                    labelName: "Forward Application",
                    labelKey: "BPA_FORWARD_APPLICATION_HEADER"
                  }),
                  cityPicker: getCommonContainer({
                    cityDropdown: {
                      uiFramework: "custom-molecules-local",
                      moduleName: "egov-bpa",
                      componentPath: "ActionDialog",
                      required: true,
                      gridDefination: {
                        xs: 12,
                        sm: 12
                      },
                      props: {}
                    },
                  })
                })
              }
            }
          }
        },
        body: getCommonCard({
          basicSummary: basicSummary,
          scrutinySummary:scrutinySummary,
          documentAndNocSummary: documentAndNocSummary
        }),
        // citizenFooter: process.env.REACT_APP_NAME === "Citizen" ? citizenFooter : {}
      }
    }
  }
};

export default screenConfig;
