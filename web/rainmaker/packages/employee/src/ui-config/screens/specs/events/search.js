import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchResults, searchApiCall } from "./searchResults";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { ulbFilter } from "../utils";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const pageResetAndChange = (state, dispatch) => {
  dispatch(prepareFinalObject("events", []));
  dispatch(setRoute("/events/create"));
};

const header = getCommonHeader({
  labelName: "EVENTS",
  labelKey: "EVENTS_EVENTS_HEADER",
});
const eventsSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    searchApiCall(state, dispatch);
    const tenantId = getTenantId();
    let props = get(action.screenConfig, "components.div.children.cityFilter.children.cardContent.children.container.children.ulb.props", {});
    props.value = tenantId;
    props.disabled = true;
    set(action.screenConfig, "components.div.children.cityFilter.children.cardContent.children.container.children.ulb.props", props);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
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
              },
              ...header,
            },
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right",
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px",
                },
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px",
                    },
                  },
                },

                buttonLabel: getLabel({
                  labelName: "CREATE NEW EVENT",
                  labelKey: "CREATE_NEW_EVENTE_BUTTON_LABEL",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  pageResetAndChange(state, dispatch);
                },
              },
            },
          },
        },
        cityFilter: ulbFilter,
        breakAfterSearch: getBreak(),
        searchResults: searchResults(),
      },
    },
  },
};

export default eventsSearchAndResult;
