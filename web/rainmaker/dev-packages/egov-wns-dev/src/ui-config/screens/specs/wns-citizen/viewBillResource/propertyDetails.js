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
                        labelKey: "Property Details" //TL_COMMON_OWN_DETAILS
                    })
                },

            }
        },
        propertyCardContainer: getCommonContainer({
            propertyCity: {
                ...getLabelWithValue(
                    {
                        labelName: "City",
                        labelKey: "City"
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
                        labelKey: "Door / House No"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                    },
                )
            },
            propertyBuilding: {
                ...getLabelWithValue(
                    {
                        labelName: "Building / Company Name",
                        labelKey: "Building / Company Name"
                    })
            },

            propertyStreet: {
                ...getLabelWithValue(
                    {
                        labelName: "Street Name",
                        labelKey: "Street Name"
                    },
                )
            },
            propertyMohalla: {
                ...getLabelWithValue(
                    {
                        labelName: "Mohalla",
                        labelKey: "Mohalla"
                    },
                )
            },
            propertyPincode: {
                ...getLabelWithValue(
                    {
                        labelName: "Pincode",
                        labelKey: "Pincode"
                    },
                )
            }
        })
    });
};
