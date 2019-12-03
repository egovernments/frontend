import { fetchData } from "./meterReading/functions";
import { getCommonHeader, getLabel, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
    getCommonCard,
    getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
    
    getQueryArg
  } from "egov-ui-framework/ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { meterReadingEditable } from "./meterReading/meterReadingEditable";

const addMeterReading = (state, dispatch) => {
    showHideCard(true, dispatch)
};

const queryValueAN = getQueryArg(window.location.href, "connectionNos");
console.log('123',queryValueAN)
const showHideCard = (booleanHideOrShow, dispatch) => {
    dispatch(
        handleField(
            "meter-reading",
            "components.div.children.viewOne",
            "visible",
            booleanHideOrShow
        )
    );
}
const header = getCommonContainer({
    header: getCommonHeader({
        labelKey: "WS_CONSUMPTION_DETAILS_HEADER"
    }),
    applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-wns",
        componentPath: "ConsumerNoContainer",
        props: {
            number: queryValueAN
        }
    },

    classes: {
        root: "common-header-cont"
    }

});

const screenConfig = {
    uiFramework: "material-ui",
    name: "meter-reading",
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
                id: "meter-reading"
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
                    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
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
                        }),
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: addMeterReading
                    }
                },
                viewOne: {
                    visible: false,
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "MeterReadingEditable"
                },
                applicationsCard: {
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "MeterReading"
                },
                // meterReadingEditable,
            },
        }
    }
};

const demo = getCommonCard({
    subHeader: getCommonTitle({
        labelName: "Search Employee",
        labelKey: "HR_HOME_SEARCH_RESULTS_HEADING"
    }),
});

export default screenConfig;