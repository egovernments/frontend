import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCommonApplyFooter } from "../../utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import "./index.css";

export const freezeConnDetailsFooter = getCommonApplyFooter("BOTTOM",{
  takeAction: {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "FreezeAction",
    props: {      
    	connectionNumber:getQueryArg(window.location.href, "connectionNumber"),
    	tenantId: getQueryArg(window.location.href, "tenantId")  
    }
  }
});