import { getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { wnsApplication } from './employeeApplication';
import { searchApplications } from './searchApplications';
import { billGenerate } from './billGenerate';

export const showSearches = getCommonContainer({
  showSearchScreens: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "CustomTabContainer",
    props: {
      tabs: [
        {
          tabButton: { labelName: "SEARCH CONNECTIONS", labelKey: "WS_SEARCH_CONNECTIONS" },
          tabContent: { wnsApplication }
        },
        {
          tabButton: { labelName: "SEARCH APPLICATIONS", labelKey: "WS_SEARCH_APPLICATIONS" },
          tabContent: { searchApplications }
        },
        {
          tabButton: { labelName: "BILL GENERATE", labelKey: "WS_SEARCH_BILL" },
          tabContent: { billGenerate }
        }
      ],
      tabIndex : 0
    },
    type: "array"
  }
});
