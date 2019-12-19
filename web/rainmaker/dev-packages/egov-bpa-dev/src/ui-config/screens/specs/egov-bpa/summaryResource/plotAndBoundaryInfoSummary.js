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
                    labelKey: "BPA_BOUNDARY_SUMMARY"
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
                        gotoApplyWithStep(state, dispatch, 3);
                    }
                }
            }
        }
    },
    boundaryDetails: getHeader({
        labelName: "Boundary Details",
        labelKey: "BPA_BOUNDARY_DETAILS_TITLE"
    }),
    break1: getBreak(),
    cardOne: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                boundaryDetailsConatiner: getCommonContainer({
                    circle: getLabelWithValue(
                        {
                            labelName: "Circle",
                            labelKey: "BPA_BOUNDARY_CIRCLE_LABEL"
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
                            labelName: "Revenue Ward",
                            labelKey: "BPA_BOUNDARY_REVENUE_WARD_LABEL"
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
            sourceJsonPath: "BPAs[0].BPADetails.boundarydetails",
            prefixSourceJsonPath:
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
    DetailsOfPlot: getHeader({
        labelName: "Details Of Plot",
        labelKey: "BPA_BOUNDARY_PLOT_DETAILS_TITLE"
    }),
    break1: getBreak(),
    cardTwo: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: getCommonGrayCard({
                detailsOfPlotContainer: getCommonContainer({

                    plotArea: getLabelWithValue(
                        {
                            labelName: "Plot Area",
                            labelKey: "BPA_BOUNDARY_PLOT_AREA_LABEL"
                        },
                        {
                            jsonPath: "srutinyDetails.planDetail.plot.area"
                        }
                    ),
                    kathaNumber: getLabelWithValue(
                        {
                            labelName: "Khata No.",
                            labelKey: "BPA_BOUNDARY_KHATA_NO_LABEL"
                        },
                        {
                            jsonPath: "srutinyDetails.planDetail.planInformation.khataNo"
                        }
                    ),
                    holdingNumber: getLabelWithValue(
                        {
                            labelName: "Holding No.",
                            labelKey: "BPA_BOUNDARY_HOLDING_NO_LABEL"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.holdingnumber"
                        }
                    ),
                    plotNo: getLabelWithValue(
                        {
                            labelName: "Plot No(MSP)",
                            labelKey: "BPA_BOUNDARY_PLOT_NO_LABEL"
                        },
                        {
                            jsonPath: "srutinyDetails.planDetail.planInformation.plotNo"
                        }
                    ),
                    cityTown: getLabelWithValue(
                        {
                            labelName: "City/Town",
                            labelKey: "BPA_BOUNDARY_CITY_TOWN_LABEL"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.citytown.label"
                        }
                    ),
                    landRegDetails: getLabelWithValue(
                        {
                            labelName: "Land Registration Details",
                            labelKey: "BPA_BOUNDARY_LAND_REG_DETAIL_LABEL"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.landregdetails"
                        }
                    ),
                    whetherGovOrQuasi: getLabelWithValue(
                        {
                            labelName: "Whether Government or Quasi Government",
                            labelKey: "BPA_BOUNDARY_GOVT_QUASI_LABEL"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.plotdetails.govorquasi"
                        }
                    )
                })
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "srutinyDetails.planDetail",
            prefixSourceJsonPath: 
                "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    }
});
