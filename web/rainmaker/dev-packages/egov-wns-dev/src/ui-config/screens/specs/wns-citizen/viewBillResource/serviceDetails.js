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
                            labelKey: "WS_COMMON_SERV_DETAIL" // TL_NEW_TRADE_DETAILS_HEADER_ACC
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
                        labelKey: "WS_SERV_DETAIL_SERV_TYPE"
                    }
                )
            },
            propertyUsage: {
                ...getLabelWithValue(
                    {
                        labelName: "Property Usage Type",
                        labelKey: "WS_SERV_DETAIL_PROP_USE_TYPE"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                    },
                )
            },
            connectionType: {
                ...getLabelWithValue(
                    {
                        labelName: "Connection Type",
                        labelKey: "WS_SERV_DETAIL_CONN_TYPE"
                    })
            },

            meterId: {
                ...getLabelWithValue(
                    {
                        labelName: "Meter ID",
                        labelKey: "WS_SERV_DETAIL_METER_ID"
                    },
                )
            },
            currentMeter: {
                ...getLabelWithValue(
                    {
                        labelName: "Current Meter Reading",
                        labelKey: "WS_SERV_DETAIL_LAST_METER_READ"
                    },
                )
            },
            meterReadingStatus: {
                ...getLabelWithValue(
                    {
                        labelName: "Meter Reading Status",
                        labelKey: "WS_SERV_DETAIL_METER_STAT"
                    },
                )
            },
            lastMeterReading: {
                ...getLabelWithValue(
                    {
                        labelName: "Last Meter Reading",
                        labelKey: "WS_SERV_DETAIL_LAST_METER_READ"
                    },
                )
            },
            meterStatus: {
                ...getLabelWithValue(
                    {
                        labelName: "Meter Status",
                        labelKey: "WS_SERV_DETAIL_METER_STAT"
                    },
                )
            },
            consumption: {
                ...getLabelWithValue(
                    {
                        labelName: "Consumption",
                        labelKey: "WS_SERV_DETAIL_CONSUMP"
                    },
                )
            }
        })

    })
}