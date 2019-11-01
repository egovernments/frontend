import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";


export const getService = () => {
    return getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    },
                    ...getCommonSubHeader(
                        {
                            labelName: "Service Details",
                            labelKey: "Service Details" // TL_NEW_TRADE_DETAILS_HEADER_ACC
                        },
                        {
                            style: {
                                marginBottom: 18
                            }
                        }
                    ),
                }
            },
        },
        serviceCardContainer: getCommonContainer({
            serviceType: {
                ...getLabelWithValue(
                    {
                        labelName: "Service Type",
                        labelKey: "Service Type"
                    }
                )
            },
            propertyUsage: {
                ...getLabelWithValue(
                    {
                        labelName: "Property Usage Type",
                        labelKey: "Property Usage Type"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                    },
                )
            },
            connectionType: {
                ...getLabelWithValue(
                    {
                        labelName: "Connection Type",
                        labelKey: "Connection Type"
                    })
            },

            meterId: {
                ...getLabelWithValue(
                    {
                        labelName: "Meter ID",
                        labelKey: "Meter ID"
                    },
                )
            },
            currentMeter: {
                ...getLabelWithValue(
                    {
                        labelName: "Current Meter Reading",
                        labelKey: "Current Meter Reading"
                    },
                )
            },
            meterReadingStatus: {
                ...getLabelWithValue(
                    {
                        labelName: "Meter Reading Status",
                        labelKey: "Meter Reading Status"
                    },
                )
            },
            lastMeterReading: {
                ...getLabelWithValue(
                    {
                        labelName: "Last Meter Reading",
                        labelKey: "Last Meter Reading"
                    },
                )
            },
            meterStatus: {
                ...getLabelWithValue(
                    {
                        labelName: "Meter Status",
                        labelKey: "Meter Status"
                    },
                )
            },
            consumption: {
                ...getLabelWithValue(
                    {
                        labelName: "Consumption",
                        labelKey: "Consumption"
                    },
                )
            }
        })

    })
}