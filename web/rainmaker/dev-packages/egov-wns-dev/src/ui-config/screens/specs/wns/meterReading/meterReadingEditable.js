import {
    getCommonCard,
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getDateField,
    getLabel,
    convertDateToEpoch
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { createMeterReading } from "../../../../../ui-utils/commons"
import {
    getQueryArg
} from "egov-ui-framework/ui-utils/commons";

const saveData = (state, dispatch) => {

    const isCurrentMeterValid = validateFields(
        "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children",
        state,
        dispatch,
        "meter-reading"
    );
    const isDateValid = validateFields(
        "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children",
        state,
        dispatch,
        "meter-reading"
    );

    let data = get(state, "screenConfiguration.preparedFinalObject.metereading");
    if (!(data)) {
        dispatch(
            toggleSnackbar(
                true,
                {
                    labelName: "Please fill valid fields to start search",
                    labelKey: "ERR_FILL_VALID_FIELDS"
                },
                "warning"
            )
        );

    } else {
        if (!data.meterStatus) {
            data.meterStatus = get(state, "screenConfiguration.preparedFinalObject.meterMdmsData.tenant.tenants[0].name");
        }
        if (!data.currentReadingDate) {
            data.currentReadingDate = new Date().getTime()
        }
        data.connectionNo = getQueryArg(window.location.href, "connectionNos")
        set(data,
            "currentReadingDate",
            convertDateToEpoch(data.currentReadingDate, "dayend")
        );
        data.lastReading = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");
        data.billingPeriod = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.billingPeriod");
        if (get(state, "screenConfiguration.preparedFinalObject.consumptionDetails[0].lastReadingDate")) {
            data.lastReadingDate = get(state, "screenConfiguration.preparedFinalObject.consumptionDetails[0].lastReadingDate");
        } else {
            data.lastReadingDate = 0
        }
        data.currentReading = parseInt(data.currentReading)
        console.log(data)
        createMeterReading(dispatch, data)
    }
}




export const meterReadingEditable =
{
    uiFramework: "custom-atoms",
    moduleName: "egov-wns",
    componentPath: "Div",
    visible: false,
    props: {
        style: {
            margin: '7px'
        }
    },
    children: {
        card: getCommonCard({
            firstContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'

                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                        })
                    },
                },
                billingCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),
            secondContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL"
                        })
                    },
                },
                status:
                {
                    ...getSelectField({
                        placeholder: {
                            labelKey: "WS_SELECT_METER_STATUS_PLACEHOLDER"
                        },
                        labelPrefix: {
                            moduleName: "TENANT",
                            masterName: "TENANTS"
                        },
                        props: {
                            value: "",
                        },
                        sourceJsonPath: "meterMdmsData.tenant.tenants",
                        jsonPath: "metereading.meterStatus",
                        gridDefination: {
                            xs: 12,
                            sm: 3
                        },
                        required: false,
                        errorMessage: "ERR_INVALID_BILLING_PERIOD",
                    }),
                    afterFieldChange: async (action, state, dispatch) => {
                        let status = get(state, "screenConfiguration.preparedFinalObject.metereading.meterStatus");
                        if (status !== 'Working') {
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "disabled",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "disabled",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                                    "visible",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    true
                                )
                            );
                        } else {
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                                    "visible",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    false
                                )
                            );
                        }

                    }
                },


                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),
            thirdContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_LABEL"
                        })
                    },
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),
            lastReadingContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_DATE_LABEL"
                        })
                    },
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),
            fourthContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL"
                        })
                    },
                },
                currentReading:
                {
                    ...getTextField({
                        placeholder: {
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_PLACEHOLDER"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 3
                        },
                        required: true,
                        pattern: /^[0-9]*$/i,
                        // errorMessage: "ERR_INVALID_CONSUMER_NO",
                        jsonPath: "metereading.currentReading"
                    }),
                    afterFieldChange: async (action, state, dispatch) => {
                        let lastReading = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");
                        let currentReading = get(state, "screenConfiguration.preparedFinalObject.metereading.currentReading");
                        let consumption
                        if (lastReading === 0) {
                            consumption = currentReading
                        } else {
                            consumption = currentReading - lastReading;
                        }
                        dispatch(
                            handleField(
                                "meter-reading",
                                "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                                "labelName",
                                consumption
                            )
                        );
                    }
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),
            fifthContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                        })
                    },
                },
                currentReadingDate: getDateField({
                    placeholder: {
                        labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    required: true,
                    pattern: getPattern("Date"),
                    // errorMessage: "ERR_INVALID_CONSUMER_NO",
                    jsonPath: "metereading.currentReadingDate"
                }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),
            sixthContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL"
                        })
                    },
                },
                secCont:
                {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    visible: true,
                    gridDefination: {
                        xs: 12,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                thirdCont:
                    getTextField({
                        placeholder: {
                            labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_READING_PLACEHOLDER"
                        },
                        gridDefination: {
                            xs: 12,
                            sm: 3
                        },
                        visible: false,
                        required: true,
                        pattern: /^[0-9]*$/i,
                        // errorMessage: "ERR_INVALID_CONSUMER_NO",
                        jsonPath: "metereading.consumption"
                    }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 12,
                        sm: 7
                    }
                }

            }),

            button: getCommonContainer({

                buttonContainer: getCommonContainer({
                    firstCont: {
                        uiFramework: "custom-atoms",
                        componentPath: "Div",
                        gridDefination: {
                            xs: 12,
                            sm: 3
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
                                color: "#FE7A51",
                                borderColor: "#FE7A51",
                                width: "150px",
                                height: "40px",
                                margin: "15px 0px",
                                float: "left"
                            }
                        },
                        children: {
                            buttonLabel: getLabel({
                                labelKey: "WS_COMMON_BUTTON_SAVE"
                            })
                        },
                        onClickDefination: {
                            action: "condition",
                            callBack: saveData
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
        })
    }

}



