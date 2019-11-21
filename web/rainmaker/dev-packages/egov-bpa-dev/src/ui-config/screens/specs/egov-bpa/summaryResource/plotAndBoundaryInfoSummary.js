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

export const  plotAndBoundaryInfoSummary = getCommonGrayCard({
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
                    labelName: "Plot & Boundary Details",
                    labelKey: "Plot & Boundary Details"
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
                        gotoApplyWithStep(state, dispatch, 3);
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
                        labelName: "Boundary Details",
                        labelKey: "Boundary Details"
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
                boundaryDetailsConatiner: getCommonContainer({
                    circle: getLabelWithValue(
                        {
                            labelName: "Circle",
                            labelKey: "Circle"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.boundarydetails.circle",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    revenueward: getLabelWithValue(
                        {
                            labelName: "revenueward",
                            labelKey: "revenueward"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.boundarydetails.revenueward"
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
                        labelName: "Details Of Plot",
                        labelKey: "Details Of Plot"
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
                detailsOfPlotContainer: getCommonContainer({

                    plotArea: getLabelWithValue(
                        {
                            labelName: "Plot Area",
                            labelKey: "Plot Area"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.plotarea",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    kathaNumber: getLabelWithValue(
                        {
                            labelName: "Khata No.",
                            labelKey: "Khata No."
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.kathanumber",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    holdingNumber: getLabelWithValue(
                        {
                            labelName: "Holding No.",
                            labelKey: "Holding No."
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.holdingnumber",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    plotNo: getLabelWithValue(
                        {
                            labelName: "Plot No(MSP)",
                            labelKey: "Plot No(MSP)"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.plotnumber",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    cityTown: getLabelWithValue(
                        {
                            labelName: "cityTown",
                            labelKey: "cityTown"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.citytown",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    landRegDetails: getLabelWithValue(
                        {
                            labelName: "Land Registration Details",
                            labelKey: "Land Registration Details"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.landregdetails",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    whetherGovOrQuasi: getLabelWithValue(
                        {
                            labelName: "Whether Government or Quasi Government",
                            labelKey: "Whether Government or Quasi Government"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.govorquasi",
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
    }
});
