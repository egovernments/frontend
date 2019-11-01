import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const getOwner = () => {
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
                        labelName: "Owner Details",
                        labelKey: "Owner Details" //TL_COMMON_OWN_DETAILS
                    })
                },

            }
        },
        ownerCardContainer: getCommonContainer({
            ownerName: {
                ...getLabelWithValue(
                    {
                        labelName: "Name",
                        labelKey: "Name"
                    }
                )
            },
            CorrespondenceAddress: {
                ...getLabelWithValue(
                    {
                        labelName: "CorrespondenceAddress",
                        labelKey: "CorrespondenceAddress"
                    })
            },

        })
    });
};
