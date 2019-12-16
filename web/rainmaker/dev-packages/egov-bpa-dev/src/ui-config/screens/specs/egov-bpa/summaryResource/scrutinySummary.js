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

const getHeader = label => {
    return {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-bpa",
      componentPath: "DividerWithLabel",
      props: {
        className: "hr-generic-divider-label",
        labelProps: {},
        dividerProps: {},
        label
      },
      type: "array"
    };
  };

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
                    labelKey: "BPA_SCRUNITY_SUMMARY"
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
                        labelKey: "BPA_SUMMARY_EDIT"
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
    buildingPlanScrutinyApplicationDetails: getHeader({
        labelName: "Building Plan Scrutiny Application Details",
        labelKey: "BPA_APPLICATION_SCRUNITY_DETAILS_TITLE"
    }),
    break1: getBreak(),
    cardOne: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                buildingPlanScrutinyDetailsContainer: getCommonContainer({
                    buildingplanscrutinyapplicationnumber: getLabelWithValue(
                        {
                            labelName: "Building permit application Number",
                            labelKey: "BPA_APPLICATION_BUILDING_PERMIT_NO_LABEL"
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
                            labelKey: "BPA_APPLICATION_UPLOAD_DIAGRAM_LABEL"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.planscrutinydetails.diagram"
                        }
                    ),
                    scrutinyreport: getLabelWithValue(
                        {
                            labelName: "Scrutiny Report",
                            labelKey: "BPA_APPLICATION_SCRUNITY_REPORT_LABEL"
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
    BlockWiseOccupancyAndUsageDetails: getHeader({
        labelName: "Block wise occupancy /sub occupancy and usage details",
        labelKey: "BPA_APPLICATION_BLOCK_WISE_OCCUPANCY_SUB_OCCUPANCY_USAGE_TITLE"
    }),
    break1: getBreak(),
    cardTwo: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                blockWiseOccupancyAndUsageDetailscontainer: getCommonContainer({

                    buildingplanscrutinyapplicationnumber: getLabelWithValue(
                        {
                            labelName: "Residential",
                            labelKey: "BPA_APPLICATION_RESIDENTIAL_LABEL"
                        },
                        {
                            jsonPath: "bpa.summary.residential",
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
            sourceJsonPath: "BPAs[0].BPADetails.blockwiseusagedetails",
            prefixSourceJsonPath:
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
    DemolitionDetails: getHeader({
        labelName: "Demolition Details",
        labelKey: "BPA_APP_DETAILS_DEMOLITION_DETAILS_LABEL"
    }),
    break1: getBreak(),
    cardThree: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                demolitionDetailsContainer: getCommonContainer({
                    demolitionArea: getLabelWithValue(
                        {
                            labelName: "Demolition Area",
                            labelKey: "BPA_APPLICATION_DEMOLITION_AREA_LABEL"
                        },
                        {
                            jsonPath: "BPA.scrutinyDetails.planDetail.planInformation.demolitionArea",
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
            sourceJsonPath: "BPAs[0].BPADetails",
            prefixSourceJsonPath:
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
});
