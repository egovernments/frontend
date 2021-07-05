import React from "react";

import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
const header = getCommonHeader(
  {
    labelName: "STR Module",
    labelKey: "PT_CANT_STR_MODULE"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const propertyCostDetails = {
    uiFramework: "material-ui",
    name: "propertyCostDetails",
    components:{
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
                children: {
                  header: header,
                  howitWoorksDiv:{
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-pt",
                    componentPath: "PropertyCostDetail",
                    props: {
                      className: "common-div-css"
                    }
                  }
            }
          }
    }  
}
export default propertyCostDetails;