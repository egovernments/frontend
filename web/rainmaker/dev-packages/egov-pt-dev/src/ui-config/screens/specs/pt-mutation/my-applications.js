import { fetchData } from "./searchResource/citizenSearchFunctions";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "PT_MUTATION_MY_APPLICATIONS"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            applicationName:{
              label: "PT_MUTATION_APPLICATION_NO",
              jsonPath: "fireNOCDetails.applicationNumber"
            },
            applicationNumber: {
              label: "PT_MUTATION_PID",
              jsonPath: "fireNOCDetails.applicantDetails.owners[0].name"
            },
            ownerName: {
              label: "PT_MUTATION_APPLICATION_TYPE",
              jsonPath: "fireNOCDetails.buildings[0].name"
            }, moduleNumber: {
              label: "PT_MUTATION_CREATION_DATE",
              jsonPath: "fireNOCDetails.buildings[0].name"
            },
            status: {
              label: "PT_MUTATION_STATUS",
              jsonPath: "fireNOCDetails.status"
            },
            moduleName: "PT-MUTATION",
            statusPrefix: "WF_FIRENOC_"
          }
        }
      }
    }
  }
};


export default screenConfig;
