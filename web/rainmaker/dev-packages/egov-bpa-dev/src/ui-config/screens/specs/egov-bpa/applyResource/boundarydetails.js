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
                    labelName: "Select Circle",
                    labelKey: "Select Circle"
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
                    labelName: "Select Revenue Ward",
                    labelKey: "Select Revenue Ward"
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
                    labelName: "Enter Plot Area",
                    labelKey: "Enter Plot Area"
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
                placeholder: {
                    labelName: "Enter Khata No.",
                    labelKey: "Enter Khata No."
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
                placeholder: {
                    labelName: "Enter Holding No.",
                    labelKey: "Enter Holding No."
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
                placeholder: {
                    labelName: "Enter Plot No(MSP)",
                    labelKey: "Enter Plot No(MSP)"
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
                    labelKey: "City/Town"
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
                placeholder: {
                    labelName: "Enter Land Registration Details",
                    labelKey: "Enter Land Registration Details"
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
                placeholder: {
                    labelName: "Select Government",
                    labelKey: "Select Government"
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