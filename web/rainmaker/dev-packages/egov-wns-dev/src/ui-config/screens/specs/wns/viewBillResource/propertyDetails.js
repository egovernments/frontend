import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const getProperty = () => {
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
                    ...getCommonSubHeader({
                        labelKey: "WS_COMMON_PROP_DETAIL" //TL_COMMON_OWN_DETAILS
                    })
                },

            }
        },
        propertyCardContainer: getCommonContainer({
            propertyCity: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_PROP_DETAIL_CITY"
                    }
                    // {
                    //     jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
                    //     localePrefix: {
                    //         moduleName: "common-masters",
                    //         masterName: "OwnerShipCategory"
                    //     },
                    //     callBack: value :{
                    //         return value.split(".")[0];
                    //     }
                    // }
                )
            },
            propertyDoorNo: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_PROP_DETAIL_DHNO"
                    },
                )
            },
            propertyBuilding: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_PROP_DETAIL_BUILD_COMP_NAME"
                    })
            },

            propertyStreet: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_PROP_DETAIL_STREET_NAME"
                    },
                )
            },
            propertyMohalla: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_PROP_DETAIL_MOHALLA"
                    },
                )
            },
            propertyPincode: {
                ...getLabelWithValue(
                    {
                        labelKey: "WS_PROP_DETAIL_PINCODE"
                    },
                )
            }
        })
    });
};
