import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { loginDetailsCard } from "./loginResource/loginDetails";
import { loginFooter } from "./loginResource/loginFooter";
import { prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-framework/ui-utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import commonConfig from "config/common.js";
import get from "lodash/get";
import set from "lodash/set";

const header = getCommonHeader({
  labelName: "Login",
  labelKey: "CORE_COMMON_LOGIN"
});
const tenantId = getTenantId();

const getData = async (action, state, dispatch) => {
  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        }
      ]
    }
  };

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const login = {
  uiFramework: "material-ui",
  name: "login",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "login"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            }
          }
        },
        loginDetailsCard,
        loginFooter
      }
    }
  }
};

export default login;
