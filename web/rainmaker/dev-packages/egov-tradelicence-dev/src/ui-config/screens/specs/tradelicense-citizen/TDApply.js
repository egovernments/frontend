import { fetchData } from "./TradeLink/TradeLink";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader(
  {
    labelKey: "How to apply & pay Trade License"
    
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
  
  
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "TDApply",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        // className: "common-div-css"
      },
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-tradelicence",
          componentPath: "TDTradeApply",
        }
      }
    }
  }
};

export default screenConfig;
