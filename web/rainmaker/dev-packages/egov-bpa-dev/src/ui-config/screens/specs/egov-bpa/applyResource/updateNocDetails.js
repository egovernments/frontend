import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getCheckBoxwithLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
// import { getTodaysDateInYMD } from "../utils";

export const buildingPlanScrutinyDetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Building Plan Scrutiny Application Details",
            labelKey: "Building Plan Scrutiny Application Details"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    buildingPlanScrutinyDetailsContainer: getCommonContainer({
        buildingplanscrutinyapplicationnumber: {
            ...getTextField({
                label: {
                    labelName: "Building Plan Scrutiny Application Number",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                placeholder: {
                    labelName: "Building Plan Scrutiny Application Number",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                required: true,
                jsonPath: "Employee[0].user.name"
            })
        },
        buildingplanscrutinyapplicationdate: {
            ...getDateField({
                label: {
                    labelName: "Building Plan Scrutiny Application Date",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                placeholder: {
                    labelName: "Building Plan Scrutiny Application Number",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                required: true,
                pattern: getPattern("Date"),
                jsonPath: "Employee[0].user.dob",
                props: {
                    inputProps: {
                        // max: getTodaysDateInYMD()
                    }
                }
            })
        },
        uploadedfile: {
            ...getTextField({
                label: {
                    labelName: "Uploaded File",
                    labelKey: "Uploaded File"
                },
                placeholder: {
                    labelName: "Uploaded File",
                    labelKey: "Uploaded File"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.fatherOrHusbandName"
            })
        },
        scrutinyreport: {
            ...getTextField({
                label: {
                    labelName: "Scrutiny Report",
                    labelKey: "Scrutiny Report"
                },
                placeholder: {
                    labelName: "Scrutiny Report",
                    labelKey: "Scrutiny Report"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.fatherOrHusbandName"
            })
        }
    })
});

export const blockWiseOccupancyAndUsageDetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Block wise occupancy/sub occupancy and usage details",
            labelKey: "Block wise occupancy/sub occupancy and usage details"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    blockWiseOccupancyAndUsageDetailscontainer: getCommonContainer({
        buildingplanscrutinyapplicationnumber: {
            ...getSelectField({
                label: {
                    labelName: "Residential",
                    labelKey: "Residential"
                },
                placeholder: {
                    labelName: "Select Residential",
                    labelKey: "Residential"
                },
                required: true,
                jsonPath: "Employee[0].user.gender",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "MALE",
                            label: "COMMON_GENDER_MALE"
                        },
                        {
                            value: "FEMALE",
                            label: "COMMON_GENDER_FEMALE"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        },
    })
});

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
                jsonPath: "Employee[0].user.gender",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "MALE",
                            label: "COMMON_GENDER_MALE"
                        },
                        {
                            value: "FEMALE",
                            label: "COMMON_GENDER_FEMALE"
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
                jsonPath: "Employee[0].user.gender",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "MALE",
                            label: "COMMON_GENDER_MALE"
                        },
                        {
                            value: "FEMALE",
                            label: "COMMON_GENDER_FEMALE"
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
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        plotAreaInSqM: {
            ...getTextField({
                label: {
                    labelName: "Plot Area(in Sq.Mtrs)",
                    labelKey: "Plot Area(in Sq.Mtrs)"
                },
                placeholder: {
                    labelName: "Select",
                    labelKey: "Select"
                },
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        reSurvey: {
            ...getTextField({
                label: {
                    labelName: "Re-Survey/Plot No(CS)",
                    labelKey: "Re-Survey/Plot No(CS)"
                },
                placeholder: {
                    labelName: "Re-Survey/Plot No(CS)",
                    labelKey: "Re-Survey/Plot No(CS)"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        natureOfOwnership: {
            ...getTextField({
                label: {
                    labelName: "Nature Of OwnerShip",
                    labelKey: "Nature Of OwnerShip"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        kathaNumber: {
            ...getTextField({
                label: {
                    labelName: "Khata No.",
                    labelKey: "Khata No."
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        holdingNumber: {
            ...getTextField({
                label: {
                    labelName: "Holding No.",
                    labelKey: "Holding No."
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        landMark: {
            ...getTextField({
                label: {
                    labelName: "Landmark",
                    labelKey: "Landmark"
                },
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        address1: {
            ...getTextField({
                label: {
                    labelName: "Address 1",
                    labelKey: "Address 1"
                },
                pattern: getPattern("Address"),
                jsonPath: "Employee[0].user.correspondenceAddress"
            })
        },
        address2: {
            ...getTextField({
                label: {
                    labelName: "Address 2",
                    labelKey: "Address 2"
                },
                pattern: getPattern("Address"),
                jsonPath: "Employee[0].user.correspondenceAddress"
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
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        plotNo: {
            ...getTextField({
                label: {
                    labelName: "Plot No(MSP)",
                    labelKey: "Plot No(MSP)"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        townPlaningScheme: {
            ...getSelectField({
                label: {
                    labelName: "Town Planing Scheme",
                    labelKey: "Town Planing Scheme"
                },
                placeholder: {
                    labelName: "Select",
                    labelKey: "Select"
                },
                required: true,
                jsonPath: "Employee[0].user.gender",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "MALE",
                            label: "COMMON_GENDER_MALE"
                        },
                        {
                            value: "FEMALE",
                            label: "COMMON_GENDER_FEMALE"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        },
        proposedLandUse: {
            ...getSelectField({
                label: {
                    labelName: "Proposed land use",
                    labelKey: "Proposed land use"
                },
                placeholder: {
                    labelName: "Select",
                    labelKey: "Select"
                },
                required: true,
                jsonPath: "Employee[0].user.gender",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "MALE",
                            label: "COMMON_GENDER_MALE"
                        },
                        {
                            value: "FEMALE",
                            label: "COMMON_GENDER_FEMALE"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        },
        previousOwnerDetails: {
            ...getTextField({
                label: {
                    labelName: "Previous Owner Details",
                    labelKey: "Previous Owner Details"
                },
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        landRegDetails: {
            ...getTextField({
                label: {
                    labelName: "Land Registration Details",
                    labelKey: "Land Registration Details"
                },
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        anualExpectedExpenditure: {
            ...getTextField({
                label: {
                    labelName: "Annual Expected Expenditure (As per Labor cess guidelines)",
                    labelKey: "Annual Expected Expenditure (As per Labor cess guidelines)"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        },
        charitableTrustBuilding: {
            ...getCheckBoxwithLabel(
                {
                    labelName: "Charitable trust Building",
                    labelKey: "Charitable trust Building"
                },
                {
                    style: {
                        //marginBottom: 18
                    }
                },
            ),
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
        },
        affordablehousingScheme: {
            ...getCheckBoxwithLabel(
                {
                    labelName: "Affordable housing scheme",
                    labelKey: "Affordable housing scheme"
                },
                {
                    style: {
                        //marginBottom: 18
                    }
                }),
        },
        whetherGovOrQuasi: {
            ...getSelectField({
                label: {
                    labelName: "Whether Government or Quasi Government",
                    labelKey: "Whether Government or Quasi Government"
                },
                jsonPath: "Employee[0].user.gender",
                props: {
                    className: "hr-generic-selectfield",
                    data: [
                        {
                            value: "MALE",
                            label: "COMMON_GENDER_MALE"
                        },
                        {
                            value: "FEMALE",
                            label: "COMMON_GENDER_FEMALE"
                        }
                    ],
                    optionValue: "value",
                    optionLabel: "label"
                }
            })
        }
    })
});