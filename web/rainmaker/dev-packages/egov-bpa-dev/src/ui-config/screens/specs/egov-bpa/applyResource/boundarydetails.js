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
    getCommonSubHeader

} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getDetailsForOwner } from "../../utils";
import get from "lodash/get";

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

const showComponent = (dispatch, componentJsonPath, display) => {
    let displayProps = display ? {} : { display: "none" };
    dispatch(
        handleField("apply", componentJsonPath, "props.style", displayProps)
    );
};

const commonApplicantInformation = () => {
    return getCommonGrayCard({
        header: getCommonSubHeader(
            {
                labelName: "Applicant Information",
                labelKey: "NOC_APPLICANT_INFORMATION_SUBHEADER"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),
        applicantCard: getCommonContainer({
            floorDescription: getSelectField({
                label: {
                    labelName: "Floor Description",
                    labelKey: "Floor Description"
                },
                placeholder: {
                    labelName: "Select Floor Description",
                    labelKey: "Floor Description"
                },
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].ownerType",
                // data: [
                //   {
                //     code: "A"
                //   },
                //   {
                //     code: "B"
                //   }
                // ],
                localePrefix: {
                    moduleName: "common-masters",
                    masterName: "OwnerType"
                },
                sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),

            level: getTextField({
                label: {
                    labelName: "Level",
                    labelKey: "Level"
                },
                placeholder: {
                    labelName: "Enter Level",
                    labelKey: "Enter Level"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
                // props: {
                //   style: {
                //     maxWidth: "400px"
                //   }
                // },
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),

            occupancy: getSelectField({
                label: {
                    labelName: "Occupancy/Sub Occupancy",
                    labelKey: "Occupancy/Sub Occupancy"
                },
                placeholder: {
                    labelName: "Select Occupancy/Sub Occupancy",
                    labelKey: "Occupancy/Sub Occupancy"
                },
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].ownerType",
                // data: [
                //   {
                //     code: "A"
                //   },
                //   {
                //     code: "B"
                //   }
                // ],
                localePrefix: {
                    moduleName: "common-masters",
                    masterName: "OwnerType"
                },
                sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),


            buildArea: getTextField({
                label: {
                    labelName: "Build Area(Sq.m)",
                    labelKey: "Build Area(Sq.m)"
                },
                placeholder: {
                    labelName: "Enter Build Area(Sq.m)",
                    labelKey: "Enter Build Area(Sq.m)"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
                // props: {
                //   style: {
                //     maxWidth: "400px"
                //   }
                // },
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),

            floorArea: getTextField({
                label: {
                    labelName: "Floor Area(Sq.m)",
                    labelKey: "Floor Area(Sq.m)"
                },
                placeholder: {
                    labelName: "Enter Floor Area(Sq.m)",
                    labelKey: "Enter Floor Area(Sq.m)"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
                // props: {
                //   style: {
                //     maxWidth: "400px"
                //   }
                // },
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),

            carpetArea: getTextField({
                label: {
                    labelName: "Carpet Area(Sq.m)",
                    labelKey: "Carpet Area(Sq.m)"
                },
                placeholder: {
                    labelName: "Enter Carpet Area(Sq.m)",
                    labelKey: "Enter Carpet Area(Sq.m)"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
                // props: {
                //   style: {
                //     maxWidth: "400px"
                //   }
                // },
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),

        })
    });
};

const institutionInformation = () => {
    return getCommonGrayCard({
        header: getCommonSubHeader(
            {
                labelName: "Applicant Information",
                labelKey: "NOC_APPLICANT_INFORMATION_SUBHEADER"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),
        applicantCard: getCommonContainer({
            institutionName: getTextField({
                label: {
                    labelName: "Name of Institution",
                    labelKey: "NOC_INSTITUTION_LABEL"
                },
                placeholder: {
                    labelName: "Enter Name of Institution",
                    labelKey: "NOC_ENTER_INSTITUTION_PLACEHOLDER"
                },
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                required: true,
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionName",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            telephoneNumber: getTextField({
                label: {
                    labelName: "Official Telephone No.",
                    labelKey: "NOC_TELEPHONE_NUMBER_LABEL"
                },
                placeholder: {
                    labelName: "Enter Official Telephone No.",
                    labelKey: "NOC_ENTER_TELEPHONE_NUMBER_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("MobileNo"),
                errorMessage: "Invalid Number",
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.telephoneNumber",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            authorisedPerson: getTextField({
                label: {
                    labelName: "Name of Authorized Person",
                    labelKey: "NOC_AUTHORIZED_PERSON_LABEL"
                },
                placeholder: {
                    labelName: "Enter Name of Authorized Person",
                    labelKey: "NOC_ENTER_AUTHORIZED_PERSON_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            designation: getTextField({
                label: {
                    labelName: "Designation in Institution",
                    labelKey: "NOC_INSTITUTION_DESIGNATION_LABEL"
                },
                placeholder: {
                    labelName: "Enter designation of Institution",
                    labelKey: "NOC_ENTER_INSTITUTION_DESIGNATION_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Designation Name",
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionDesignation",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            authorizedPersonMobile: getTextField({
                label: {
                    labelName: "Mobile No. of Authorized Person",
                    labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
                },
                placeholder: {
                    labelName: "Enter Mobile No. of Authorized Person",
                    labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("MobileNo"),
                errorMessage: "Invalid MobileNo.",

                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            authorizedPersonEmail: getTextField({
                label: {
                    labelName: "Email of Authorized Person",
                    labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
                },
                placeholder: {
                    labelName: "Enter Email of Authorized Person",
                    labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_PLACEHOLDER"
                },
                pattern: getPattern("Email"),
                errorMessage: "Invalid Email",
                required: true,
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            officialCorrespondenceAddress: getTextField({
                label: {
                    labelName: "Official Correspondence Address",
                    labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
                },
                placeholder: {
                    labelName: "Enter Official Correspondence Address ",
                    labelKey: "NOC_ENTER_OFFICIAL_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Address"),
                errorMessage: "Invalid Address",
                jsonPath:
                    "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            })
        })
    });
};

export const proposedBuildingDetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Buildup and Carpet Area Details",
            labelKey: "Buildup and Carpet Area Details"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    break: getBreak(),
    applicantTypeContainer: getCommonContainer({
        applicantTypeSelection: getCommonContainer({
            applicantType: {
                ...getSelectField({
                    label: {
                        labelName: "Applicant Type",
                        labelKey: "NOC_APPLICANT_TYPE_LABEL"
                    },
                    placeholder: {
                        labelName: "Select Applicant Type",
                        labelKey: "NOC_APPLICANT_TYPE_PLACEHOLDER"
                    },
                    jsonPath:
                        "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType",
                    localePrefix: {
                        moduleName: "common-masters",
                        masterName: "OwnerShipCategory"
                    },
                    // data: [
                    //   {
                    //     code: "Individual"
                    //   },
                    //   {
                    //     code: "Multiple"
                    //   },
                    //   {
                    //     code: "Institutional-Private"
                    //   }
                    // ],
                    required: true,
                    sourceJsonPath: "applyScreenMdmsData.DropdownsData.OwnershipCategory",
                    gridDefination: {
                        xs: 12,
                        sm: 12,
                        md: 6
                    }
                }),
                beforeFieldChange: (action, state, dispatch) => {
                    let path = action.componentJsonpath.replace(
                        /.applicantType$/,
                        ".applicantSubType"
                    );
                    let applicantType = get(
                        state,
                        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
                        []
                    );
                    let applicantSubType = applicantType.filter(item => {
                        return item.active && item.code.startsWith(action.value);
                    });
                    dispatch(handleField("apply", path, "props.data", applicantSubType));
                }
            },
            applicantSubType: {
                ...getSelectField({
                    label: {
                        labelName: "Type of Applicant - Subtype",
                        labelKey: "NOC_APPLICANT_SUBTYPE_LABEL"
                    },
                    placeholder: {
                        labelName: "Select Applicant Subtype",
                        labelKey: "NOC_APPLICANT_SUBTYPE_PLACEHOLDER"
                    },
                    jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
                    localePrefix: {
                        moduleName: "common-masters",
                        masterName: "OwnerShipCategory"
                    },
                    // data: [
                    //   {
                    //     code: "Private Company"
                    //   }
                    // ],
                    // props: {
                    //   style: {
                    //     display: "none"
                    //   }
                    // },
                    required: true,
                    gridDefination: {
                        xs: 12,
                        sm: 12,
                        md: 6
                    }
                })
            }
        })
    })
});
