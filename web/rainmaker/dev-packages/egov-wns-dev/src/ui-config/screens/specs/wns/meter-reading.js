import { fetchData } from "./meterReading/functions";
import { getCommonHeader, getLabel, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getCommonCard,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
let enable = false;

const header = getCommonContainer({
  header: getCommonHeader({
    labelKey: "WS_CONSUMPTION_DETAILS_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "ConsumerNoContainer",
    props: {
      number: "WS-2018-PB-246464"
    }
  },
  classes: {
    root: "common-header-cont"
  }

});

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
              labelKey: "WS_CONSUMPTION_DETAILS_BUTTON_METER_READING"
            })
          },
          onClickDefination: {
            action: "page_change",
            callBack: addMeterReading
          }
        },
        viewOne: {
          visible: enable,
          uiFramework: "custom-molecules-local",
          moduleName: "egov-wns",
          componentPath: "MeterReadingEditable"
        },
        applicationsCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-wns",
          componentPath: "MeterReading"
        },
        // demo
      }
    }
  }
};

const visiblitiy = false;

export const addMeterReading = (isEditable = true) => {
  debugger
  // console.log(isEditable);
  // enable = isEditable;
  // debugger
  // console.log('hi');
  // console.log(state);
  // visiblitiy = true;
}
export const demo = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Employee",
    labelKey: "HR_HOME_SEARCH_RESULTS_HEADING"
  }),
  // subParagraph: getCommonParagraph({
  //   labelName: "Provide at least one parameter to search for an application",
  //   labelKey: "HR_HOME_SEARCH_RESULTS_DESC"
  // }),
});

export default screenConfig;
