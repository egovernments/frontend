import { getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { createConnection } from '../createResources/createConnection';
import { searchConnection } from './searchConnection';

export const showSearches = getCommonContainer({
  showSearchScreens: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-nod",
    componentPath: "CustomTabContainer",
    props: {
      tabs: [
        {
          tabButton: { labelName: "CREATE CONNECTION",label: "Create Connection" },
          tabContent: { createConnection }
         },
         {
          tabButton: { labelName: "SEARCH CONNECTION", label: "Search Connection"},
          tabContent: { searchConnection }
         }
        
      ],
      tabIndex : 0
    },
    type: "array"
  }
});
