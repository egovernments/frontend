import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getCheckBoxwithLabel,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabelWithValue
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
                    labelName: "Building permit application Number",
                    labelKey: "Building permit application Number"
                },
                placeholder: {
                    labelName: "Building permit application Number",
                    labelKey: "Building permit application Number"
                },
                required: true,
                jsonPath: "BPAs[0].BPADetails.planscrutinydetails.appnum"
            })
        },
        uploadedfile: {
            ...getTextField({
                label: {
                    labelName: "Uploaded Diagram",
                    labelKey: "Uploaded Diagram"
                },
                placeholder: {
                    labelName: "Uploaded Diagram",
                    labelKey: "Uploaded Diagram"
                },
                required: true,
                // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.planscrutinydetails.diagram"
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
                // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.planscrutinydetails.report"
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
    blockWiseOccupancyAndUsageDetailscontainer: getCommonGrayCard({
        header: getCommonSubHeader(
            {
                labelName: "Block 1",
                labelKey: "Block 1"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),
        blockWiseContainer: getCommonContainer({
            buildingplanscrutinyapplicationnumber: {
                uiFramework: "custom-containers-local",
                moduleName: "egov-bpa",
                componentPath: "AutosuggestContainer",
                jsonPath: "Employee[0].user.roles",
                required: true,
                props: {
                    style: {
                        width: "100%",
                        cursor: "pointer"
                    },
                    label: { labelName: "Residential", labelKey: "Residential" },
                    placeholder: {
                        labelName: "Select Occupancy",
                        labelKey: "Occupancy"
                    },
                    jsonPath: "BPAs[0].BPADetails.blockwiseusagedetails.appnum",
                    // sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
                    labelsFromLocalisation: false,
                    suggestions: [],
                    fullwidth: true,
                    required: true,
                    inputLabelProps: {
                        shrink: true
                    },
                    isMulti: true,
                    labelName: "name",
                    valueName: "code",
                    data: [

                        {
                            code: "Ground Floor",
                            name: "Ground Floor"
                        },
                        {
                            code: "First Floor",
                            name: "First User"
                        },
                        {
                            code: "Second Floor",
                            name: "Second Floor"
                        }]
                },
                gridDefination: {
                    xs: 12,
                    sm: 6
                }
            },
        })
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
                    labelName: "Demolition Area",
                    labelKey: "Demolition Area"
                },
                placeholder: {
                    labelName: "Enter Demolition Area",
                    labelKey: "Enter Demolition Area"
                },
                // pattern: getPattern("Name") || null,
                jsonPath: "BPAs[0].BPADetails.demolitiondetails.area"
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
//             // pattern: getPattern("Date"),
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
                            labelName: "Floor description",
                            labelKey: "Floor description"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.proposedBuildingDetails.floordesription",
                            callBack: value => {
                                return 1 //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    level: getLabelWithValue(
                        {
                            labelName: "Level",
                            labelKey: "Level"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.proposedBuildingDetails.level",
                            callBack: value => {
                                return value //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
                            }
                        }
                    ),
                    occupancy: getLabelWithValue(
                        {
                            labelName: "Occupancy",
                            labelKey: "Occupancy"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.occupancy"
                        }
                    ),
                    builduparea: getLabelWithValue(
                        {
                            labelName: "Build Area",
                            labelKey: "Build Area"
                        },
                        {
                            jsonPath: "BPAs[0].BPADetails.basicdetails.buildarea"
                        }
                    ),
                    floorarea: getLabelWithValue(
                        {
                            labelName: "Floor Area",
                            labelKey: "Floor Area"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.fllorarea"
                        }
                    ),
                    carpetarea: getLabelWithValue(
                        {
                            labelName: "Carpet Area",
                            labelKey: "Carpet Area"
                        },
                        {
                            jsonPath:
                                "BPAs[0].BPADetails.basicdetails.carpetarea"
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