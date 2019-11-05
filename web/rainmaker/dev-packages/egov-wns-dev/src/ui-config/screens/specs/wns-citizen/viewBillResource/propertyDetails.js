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
                        labelName: "Property Details",
                        labelKey: "WS_COMMON_PROP_DETAIL" //TL_COMMON_OWN_DETAILS
                    })
                },

            }
        },
        propertyCardContainer: getCommonContainer({
            propertyCity: {
                ...getLabelWithValue(
                    {
                        labelName: "City",
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
                        labelName: "Door / House No",
                        labelKey: "WS_PROP_DETAIL_DHNO"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                    },
                )
            },
            propertyBuilding: {
                ...getLabelWithValue(
                    {
                        labelName: "Building / Company Name",
                        labelKey: "WS_PROP_DETAIL_BUILD_COMP_NAME"
                    })
            },

            propertyStreet: {
                ...getLabelWithValue(
                    {
                        labelName: "Street Name",
                        labelKey: "WS_PROP_DETAIL_STREET_NAME"
                    },
                )
            },
            propertyMohalla: {
                ...getLabelWithValue(
                    {
                        labelName: "Mohalla",
                        labelKey: "WS_PROP_DETAIL_MOHALLA"
                    },
                )
            },
            propertyPincode: {
                ...getLabelWithValue(
                    {
                        labelName: "Pincode",
                        labelKey: "WS_PROP_DETAIL_PINCODE"
                    },
                )
            }
        })
    });
};
