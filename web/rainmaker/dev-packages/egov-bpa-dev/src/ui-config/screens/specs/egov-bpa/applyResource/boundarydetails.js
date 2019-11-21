import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getCheckBoxwithLabel,
    getBreak,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel,
    getLabelWithValue,
    convertEpochToDate

} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getDetailsForOwner } from "../../utils";
import get from "lodash/get";
import { gotoApplyWithStep } from "../../utils/index";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

export const boundaryDetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Boundary Details",
            labelKey: "Boundary Details"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    boundaryDetailsConatiner: getCommonContainer({
        circle: {
            ...getSelectField({
                label: {
                    labelName: "Circle",
                    labelKey: "Circle"
                },
                placeholder: {
                    labelName: "Select",
                    labelKey: "Select"
                },
                required: true,
                jsonPath: "BPAs[0].BPADetails.boundarydetails.circle",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "Circle 1",
                            label: "Circle 1"
                        },
                        {
                            value: "Circle 2",
                            label: "Circle 2"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        },
        revenueward: {
            ...getSelectField({
                label: {
                    labelName: "Revenue Ward",
                    labelKey: "Revenue Ward"
                },
                placeholder: {
                    labelName: "Select",
                    labelKey: "Select"
                },
                required: true,
                jsonPath: "BPAs[0].BPADetails.boundarydetails.revenueward",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "Ward 1",
                            label: "Ward 1"
                        },
                        {
                            value: "Ward 2",
                            label: "Ward 2"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        },
    })
});

export const detailsofplot = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Details Of Plot",
            labelKey: "Details Of Plot"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    detailsOfPlotContainer: getCommonContainer({
        plotArea: {
            ...getTextField({
                label: {
                    labelName: "Plot Area",
                    labelKey: "Plot Area"
                },
                placeholder: {
                    labelName: "Select",
                    labelKey: "Select"
                },
                required: true,
                // // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.plotdetails.plotarea"
            })
        },
        kathaNumber: {
            ...getTextField({
                label: {
                    labelName: "Khata No.",
                    labelKey: "Khata No."
                },
                required: true,
                // // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.plotdetails.kathanumber"
            })
        },
        holdingNumber: {
            ...getTextField({
                label: {
                    labelName: "Holding No.",
                    labelKey: "Holding No."
                },
                required: true,
                // // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.plotdetails.holdingnumber"
            })
        },
        plotNo: {
            ...getTextField({
                label: {
                    labelName: "Plot No(MSP)",
                    labelKey: "Plot No(MSP)"
                },
                required: true,
                // // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.plotdetails.plotnumber"
            })
        },
        cityTown: {
            ...getTextField({
                label: {
                    labelName: "City/Town",
                    labelKey: "HR_NAME_LABEL"
                },
                placeholder: {
                    labelName: "Enter city/town Name",
                    labelKey: "Enter city/town Name"
                },
                required: true,
                // // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.plotdetails.citytown"
            })
        },
        landRegDetails: {
            ...getTextField({
                label: {
                    labelName: "Land Registration Details",
                    labelKey: "Land Registration Details"
                },
                // // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.plotdetails.landregdetails"
            })
        },
        whetherGovOrQuasi: {
            ...getSelectField({
                label: {
                    labelName: "Whether Government or Quasi Government",
                    labelKey: "Whether Government or Quasi Government"
                },
                jsonPath: "BPAs[0].BPADetails.plotdetails.govorquasi",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "Governments",
                            label: "Governments"
                        },
                        {
                            value: "Quasi government",
                            label: "Quasi government"
                        },
                        {
                            value: "Not applicable",
                            label: "Not applicable"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        }
    })
});

export const proposedBuildingDetails = getCommonGrayCard({
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
                    labelName: "Proposed Building Details",
                    labelKey: "Proposed Building Details"
                })
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
                        labelName: "Buildup and Carpet Area Details",
                        labelKey: "Buildup and Carpet Area Details"
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
                buildupAndCarpetContainer: getCommonContainer({
                    floordescription: getLabelWithValue(
                        {
                            labelName: "Scrutiny Number",
                            labelKey: "Scrutiny Number"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.basicdetails.scrutinynumber",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    level: getLabelWithValue(
                        {
                            labelName: "occupancy",
                            labelKey: "occupancy"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.occupancy",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    occupancy: getLabelWithValue(
                        {
                            labelName: "Application Type",
                            labelKey: "Application Type"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.apptype"
                        }
                    ),
                    builduparea: getLabelWithValue(
                        {
                            labelName: "Service Type",
                            labelKey: "Service Type"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.basicdetails.servicetype"
                        }
                    ),
                    floorarea: getLabelWithValue(
                        {
                            labelName: "Application Date",
                            labelKey: "Application Date"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.appdate"
                        }
                    ),
                    carpetarea: getLabelWithValue(
                        {
                            labelName: "Application Fee",
                            labelKey: "Application Fee"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.appfee"
                        }
                    )
                }
                )
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
            prefixSourceJsonPath:
                "children.cardContent.children.basicDetailsContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    },
    totalBuildUpAreaDetailsContainer: getCommonContainer({
        totalBuildupArea: {
            ...getTextField({
                label: {
                    labelName: "Total Buildup Area (sq.mtrs)",
                    labelKey: "Total Buildup Area (sq.mtrs)"
                },
                placeholder: {
                    labelName: "Total Buildup Area (sq.mtrs)",
                    labelKey: "Total Buildup Area (sq.mtrs)"
                },
                required: true,
                jsonPath: "BPAs[0].BPADetails.totalbuildupareadetails.totalbuilduparea"
            })
        },
        numOfFloors: {
            ...getTextField({
                label: {
                    labelName: "Number Of Floors",
                    labelKey: "Number Of Floors"
                },
                placeholder: {
                    labelName: "Number Of Floors",
                    labelKey: "Number Of Floors"
                },
                required: true,
                // pattern: getPattern("Date"),
                jsonPath: "BPAs[0].BPADetails.totalbuildupareadetails.numoffloors"
            })
        },
        highFromGroundLevel: {
            ...getTextField({
                label: {
                    labelName: "High From Ground Level From Mumty (In Mtrs)",
                    labelKey: "High From Ground Level From Mumty (In Mtrs)"
                },
                placeholder: {
                    labelName: "High From Ground Level From Mumty (In Mtrs)",
                    labelKey: "High From Ground Level From Mumty (In Mtrs)"
                },
                required: true,
                // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.totalbuildupareadetails.highfromgroundlevel"
            })
        }
    })
});