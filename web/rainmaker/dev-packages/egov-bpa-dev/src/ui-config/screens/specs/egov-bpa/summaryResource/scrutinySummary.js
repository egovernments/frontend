import {
    getBreak,
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel,
    getLabelWithValue,
    convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

export const scrutinySummary = getCommonGrayCard({
    header: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
            style: { marginBottom: "10px" }
        },
        children: {
            header: {
                gridDefination: {
                    xs: 8
                },
                ...getCommonSubHeader({
                    labelName: "Scrutiny Details",
                    labelKey: "Scrutiny Details"
                })
            },
            editSection: {
                componentPath: "Button",
                props: {
                    color: "primary",
                    style: {
                        marginTop: "-10px",
                        marginRight: "-18px"
                    }
                },
                gridDefination: {
                    xs: 4,
                    align: "right"
                },
                children: {
                    editIcon: {
                        uiFramework: "custom-atoms",
                        componentPath: "Icon",
                        props: {
                            iconName: "edit"
                        }
                    },
                    buttonLabel: getLabel({
                        labelName: "Edit",
                        labelKey: "NOC_SUMMARY_EDIT"
                    })
                },
                onClickDefination: {
                    action: "condition",
                    callBack: (state, dispatch) => {
                        gotoApplyWithStep(state, dispatch, 1);
                    }
                }
            }
        }
    },
    cardOne: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                header: {
                    gridDefination: {
                        xs: 8
                    },
                    ...getCommonSubHeader({
                        labelName: "Building Plan Scrutiny Application Details",
                        labelKey: "Building Plan Scrutiny Application Details"
                    }),
                    props: {
                        style: {
                            marginBottom: "10px",
                            // fontWeight : "bold",
                            fontSize: "20px",
                            color: 'black'
                        }
                    },
                },
                buildingPlanScrutinyDetailsContainer: getCommonContainer({
                    buildingplanscrutinyapplicationnumber: getLabelWithValue(
                        {
                            labelName: "Building permit application Number",
                            labelKey: "Building permit application Number"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.planscrutinydetails.appnum",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    uploadedfile: getLabelWithValue(
                        {
                            labelName: "Uploaded Diagram",
                            labelKey: "Uploaded Diagram"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.planscrutinydetails.diagram"
                        }
                    ),
                    scrutinyreport: getLabelWithValue(
                        {
                            labelName: "Scrutiny Report",
                            labelKey: "Scrutiny Report"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.planscrutinydetails.report"
                        }
                    )
                })
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
            prefixSourceJsonPath:
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
    cardTwo: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                header: {
                    gridDefination: {
                        xs: 8
                    },
                    ...getCommonSubHeader({
                        labelName: "Block wise occupancy/sub occupancy and usage details",
                        labelKey: "Block wise occupancy/sub occupancy and usage details"
                    }),
                    props: {
                        style: {
                            marginBottom: "10px",
                            // fontWeight : "bold",
                            fontSize: "20px",
                            color: 'black'
                        }
                    },
                },
                blockWiseOccupancyAndUsageDetailscontainer: getCommonContainer({

                    buildingplanscrutinyapplicationnumber: getLabelWithValue(
                        {
                            labelName: "Building permit application Number",
                            labelKey: "Building permit application Number"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.blockwiseusagedetails.appnum",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    )
                })
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
            prefixSourceJsonPath:
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
    cardThree: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                header: {
                    gridDefination: {
                        xs: 8
                    },
                    ...getCommonSubHeader({
                        labelName: "Demolition Details",
                        labelKey: "Demolition Details"
                    }),
                    props: {
                        style: {
                            marginBottom: "10px",
                            // fontWeight : "bold",
                            fontSize: "20px",
                            color: 'black'
                        }
                    },
                },
                demolitionDetailsContainer: getCommonContainer({
                    demolitionArea: getLabelWithValue(
                        {
                            labelName: "Demolition Area",
                            labelKey: "Demolition Area"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.demolitiondetails.area",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    )
                })
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
            prefixSourceJsonPath:
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
});
