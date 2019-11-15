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
                            labelKey: "WS_COMMON_SERV_DETAIL"
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
                        labelKey: "WS_SERV_DETAIL_SERV_TYPE"
                    }
                )
            },
            propertyUsage: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_PROP_USE_TYPE"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                    },
                )
            },
            connectionType: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_CONN_TYPE"
                    })
            },

            meterId: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_METER_ID"
                    },
                )
            },
            currentMeter: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_LAST_METER_READ"
                    },
                )
            },
            meterReadingStatus: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_METER_STAT"
                    },
                )
            },
            lastMeterReading: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_LAST_METER_READ"
                    },
                )
            },
            meterStatus: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_METER_STAT"
                    },
                )
            },
            consumption: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_SERV_DETAIL_CONSUMP"
                    },
                )
            }
        })

    })
}