import { fetchData } from "./meterReading/functions";
import { getCommonHeader, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader(
  {
    labelName: "My Connections",
    labelKey: "My Connections"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-connections",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        header: header,
        newApplicationButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 12,
            align: "right"
          },
          visible: true,
          props: {
            variant: "contained",
            color: "primary",
            style: {
              color: "white",
              borderRadius: "2px",
              width: "250px",
              height: "48px"
            }
          },
          children: {
            plusIconInsideButton: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "add",
                style: {
                  fontSize: "24px"
                }
              }
            },
            buttonLabel: getLabel({
              labelName: "ADD METER READING",
              labelKey: "ADD METER READING"
            })
          },
        },
        applicationsCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-wns",
          componentPath: "MeterReading"
        }
      }
    }
  }
};

export default screenConfig;
