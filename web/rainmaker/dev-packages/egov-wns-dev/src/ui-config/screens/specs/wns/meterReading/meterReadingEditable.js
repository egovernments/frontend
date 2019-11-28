import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getCommonParagraph,
    getPattern,
    getDateField,
    getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchApiCall } from "./functions";

export const meterReadingEditable = getCommonCard({
    appTradeAndMobNumContainer: getCommonContainer({
        city: getSelectField({
            label: {
                labelKey: "WS_PROP_DETAIL_CITY"
            },
            placeholder: {
                labelKey: "WS_PROP_DETAIL_CITY_PLACEHOLDER"
            },
            localePrefix: {
                moduleName: "WF",
                masterName: "FIRENOC"
            },
            jsonPath: "searchScreen.status",
            sourceJsonPath: "applyScreenMdmsData.searchScreen.status",
            required: false,
            gridDefination: {
                xs: 12,
                sm: 4
            }
        }),
        boundaryType: getSelectField({
            label: {
                labelName: "Boundary Type",
                labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            placeholder: {
                labelName: "Select Boundary Type",
                labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            required: false,
            pattern: /^[a-zA-Z0-9-]*$/i,
            errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
            jsonPath: "searchScreen.licenseNumber"
        }),
        applicationNo: getTextField({
            label: {
                labelKey: "WS_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            placeholder: {
                labelKey: "WS_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            required: false,
            pattern: /^[0-9]*$/i,
            // errorMessage: "ERR_INVALID_CONSUMER_NO",
            // jsonPath: "searchScreen.applicationNumber"
        }),

        ownerMobNo: getTextField({
            label: {
                labelKey: "WS_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
            },
            placeholder: {
                labelKey: "WS_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            // required: true,
            errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
            jsonPath: "searchScreen.billingYear"
        }),
    //     billingPeriod: getSelectField({
    //         label: {
    //             labelKey: "WS_HOME_SEARCH_RESULTS_APP_STATUS_LABEL"
    //         },
    //         placeholder: {
    //             labelKey: "WS_HOME_SEARCH_RESULTS_APP_STATUS_PLACEHOLDER"
    //         },
    //         required: false,
    //         localePrefix: {
    //             moduleName: "WF",
    //             masterName: "NEWTL"
    //         },
    //         jsonPath: "searchScreen.status",
    //         sourceJsonPath: "applyScreenMdmsData.searchScreen.status",
    //         gridDefination: {
    //             xs: 12,
    //             sm: 4
    //         },
    //         // required: true,
    //         errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
    //         jsonPath: "searchScreen.billingPeriod"
    //     }),

    //     fromDate: getDateField({
    //         label: { labelName: "From Date", labelKey: "WS_COMMON_FROM_DATE_LABEL" },
    //         placeholder: {
    //             labelName: "Select From Date",
    //             labelKey: "WS_FROM_DATE_PLACEHOLDER"
    //         },
    //         jsonPath: "searchScreen.fromDate",
    //         gridDefination: {
    //             xs: 12,
    //             sm: 4
    //         },
    //         // required: true,
    //         errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
    //         jsonPath: "searchScreen.billingPeriodValue"
    //     }),

    //     toDate: getDateField({
    //         label: { labelName: "To Date", labelKey: "WS_COMMON_TO_DATE_LABEL" },
    //         placeholder: {
    //             labelName: "Select to Date",
    //             labelKey: "WS_COMMON_TO_DATE_PLACEHOLDER"
    //         },
    //         jsonPath: "searchScreen.toDate",
    //         gridDefination: {
    //             xs: 12,
    //             sm: 4
    //         },
    //         pattern: getPattern("Date"),
    //         errorMessage: "ERR_INVALID_DATE",
    //         required: false
    //     })
    }),

    button: getCommonContainer({
        // firstCont: {

        buttonContainer: getCommonContainer({
            firstCont: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                gridDefination: {
                    xs: 12,
                    sm: 4
                }
            },
            searchButton: {
                componentPath: "Button",
                gridDefination: {
                    xs: 12,
                    sm: 4
                },
                props: {
                    variant: "outlined",
                    style: {
                        color: "white",

                        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                        borderRadius: "2px",
                        width: "80%",
                        height: "48px"
                    }
                },
                children: {
                    buttonLabel: getLabel({
                        labelKey: "WS_COMMON_BUTTON_SAVE"
                    })
                },
                onClickDefination: {
                    action: "condition",
                    callBack: searchApiCall
                }
            },
            lastCont: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                gridDefination: {
                    xs: 12,
                    sm: 4
                }
            }
        })
    })
});
