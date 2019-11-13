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

export const demolitiondetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Demolition Details",
            labelKey: "Demolition Details"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    demolitionDetailsContainer: getCommonContainer({
        demolitionArea: {
            ...getTextField({
                label: {
                    labelName: "Demolition Area(m2)",
                    labelKey: "Demolition Area(m2)"
                },
                placeholder: {
                    labelName: "Enter Employee Name",
                    labelKey: "HR_NAME_PLACEHOLDER"
                },
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.name"
            })
        }
    })
});



//   export const professionalDetails = getCommonCard(
//     {
//       header: getCommonTitle(
//         {
//           labelName: "Professional Details",
//           labelKey: "HR_PROFESSIONAL_DETAILS_FORM_HEADER"
//         },
//         {
//           style: {
//             marginBottom: 18
//           }
//         }
//       ),
//       employeeDetailsContainer: getCommonContainer({
//         employeeId: {
//           ...getTextField({
//             label: {
//               labelName: "Employee ID",
//               labelKey: "HR_EMPLOYEE_ID_LABEL"
//             },
//             placeholder: {
//               labelName: "Enter Employee ID",
//               labelKey: "HR_EMPLOYEE_ID_PLACEHOLDER"
//             },
//             pattern: /^[a-zA-Z0-9-_]*$/i,
//             jsonPath: "Employee[0].code"
//           })
//         },
//         dateOfAppointment: {
//           ...getDateField({
//             label: {
//               labelName: "Date of Appointment",
//               labelKey: "HR_APPOINTMENT_DATE_LABEL"
//             },
//             placeholder: {
//               labelName: "Enter Date of Appointment",
//               labelKey: "HR_APPOINTMENT_DATE_PLACEHOLDER"
//             },
//             pattern: getPattern("Date"),
//             jsonPath: "Employee[0].dateOfAppointment"
//           })
//         },
//         employmentType: {
//           ...getSelectField({
//             label: {
//               labelName: "Employement Type",
//               labelKey: "HR_EMPLOYMENT_TYPE_LABEL"
//             },
//             placeholder: {
//               labelName: "Select Employment Type",
//               labelKey: "HR_EMPLOYMENT_TYPE_PLACEHOLDER"
//             },
//             required: true,
//             jsonPath: "Employee[0].employeeType",
//             sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeType",
//             props: {
//               optionLabel: "status",
//               optionValue: "code"
//               // hasLocalization: false,
//               // jsonPath: "Employee[0].employeeType"
//             },
//             localePrefix: {
//               moduleName: "egov-hrms",
//               masterName: "EmployeeType"
//             }
//           })
//         },
//         status: {
//           ...getSelectField({
//             label: { labelName: "Status", labelKey: "HR_STATUS_LABEL" },
//             placeholder: {
//               labelName: "Select Status",
//               labelKey: "HR_STATUS_PLACEHOLDER"
//             },
//             required: true,
//             jsonPath: "Employee[0].employeeStatus",
//             sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeStatus",
//             props: {
//               optionLabel: "status",
//               optionValue: "code",
//               disabled: true,
//               value: "EMPLOYED"
//               // hasLocalization: false,
//               // jsonPath: "Employee[0].employeeStatus"
//             },
//             localePrefix: {
//               moduleName: "egov-hrms",
//               masterName: "EmployeeStatus"
//             }
//           })
//         },
//         // role: {
//         //   ...getSelectField({
//         //     label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
//         //     placeholder: {
//         //       labelName: "Select Role",
//         //       labelKey: "HR_ROLE_PLACEHOLDER"
//         //     },
//         //     required: true,
//         //     jsonPath: "Employee[0].user.roles",
//         //     sourceJsonPath: "createScreenMdmsData.ACCESSCONTROL-ROLES.roles"
//         //   })
//         // },
//         role: {
//           uiFramework: "custom-containers-local",
//           moduleName: "egov-hrms",
//           componentPath: "AutosuggestContainer",
//           jsonPath: "Employee[0].user.roles",
//           required: true,
//           props: {
//             style: {
//               width: "100%",
//               cursor: "pointer"
//             },
//             label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
//             placeholder: {
//               labelName: "Select Role",
//               labelKey: "HR_ROLE_PLACEHOLDER"
//             },
//             jsonPath: "Employee[0].user.roles",
//             sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
//             labelsFromLocalisation: false,
//             suggestions: [],
//             fullwidth: true,
//             required: true,
//             inputLabelProps: {
//               shrink: true
//             },
//             isMulti: true,
//             labelName: "name",
//             valueName: "code"
//           },
//           gridDefination: {
//             xs: 12,
//             sm: 6
//           }
//         }
//       })
//     },
//     {
//       style: { overflow: "visible" }
//     }
//   );
