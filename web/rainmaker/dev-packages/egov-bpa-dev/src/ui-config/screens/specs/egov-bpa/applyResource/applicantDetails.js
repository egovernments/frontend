import {
    getBreak,
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonTitle,
    getSelectField,
    getTextField,
    getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getDetailsForOwner } from "../../utils";
import get from "lodash/get";

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
                labelName: "Owner Information",
                labelKey: "Owner Information"
            },
            {
                style: {
                    marginBottom: 18
                }
            }
        ),
        applicantCard: getCommonContainer({
            applicantName: getTextField({
                label: {
                    labelName: "Owner Name",
                    labelKey: "Owner Name"
                },
                placeholder: {
                    labelName: "Enter Owner Name",
                    labelKey: "Enter Owner Name"
                },
                required: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name",
                jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].name",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            applicantAddress: getTextField({
                label: {
                    labelName: "Owners Communication Address",
                    labelKey: "Owners Communication Address"
                },
                placeholder: {
                    labelName: "Enter Owner sCommunication Address",
                    labelKey: "Enter Owners Communication Address"
                },
                required: true,
                pattern: getPattern("Address"),
                errorMessage: "Invalid Address",
                jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].correspondenceAddress",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            mobileNumber: getTextField({
                label: {
                    labelName: "Mobile Number",
                    labelKey: "Mobile Number"
                },
                placeholder: {
                    labelName: "Enter Mobile Number",
                    labelKey: "Mobile Number"
                },
                required: true,
                title: {
                    value: "Please search profile linked to the mobile no.",
                    key: "NOC_APPLICANT_MOBILE_NO_TOOLTIP_MESSAGE"
                },
                infoIcon: "info_circle",
                pattern: getPattern("MobileNo"),
                errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
                jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].mobileNumber",
                iconObj: {
                    iconName: "search",
                    position: "end",
                    color: "#FE7A51",
                    onClickDefination: {
                        action: "condition",
                        callBack: (state, dispatch, fieldInfo) => {
                            getDetailsForOwner(state, dispatch, fieldInfo);
                        }
                    }
                },
                // props: {
                //   style: {
                //     maxWidth: "450px"
                //   }
                // },
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            applicantEmail: getTextField({
                label: {
                    labelName: "eMail ID",
                    labelKey: "eMail ID"
                },
                placeholder: {
                    labelName: "Enter eMail ID",
                    labelKey: "eMail ID"
                },
                pattern: getPattern("Email"),
                errorMessage: "Invalid Email",
                jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].emailId",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                }
            }),
            genderRadioGroup: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 6
                },
                jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].gender",
                props: {
                    label: { name: "Gender", key: "NOC_GENDER_LABEL" },
                    buttons: [
                        {
                            labelName: "Male",
                            labelKey: "NOC_GENDER_MALE_RADIOBUTTON",
                            value: "MALE"
                        },
                        {
                            labelName: "FEMALE",
                            labelKey: "NOC_GENDER_FEMALE_RADIOBUTTON",
                            value: "FEMALE"
                        },
                        {
                            labelName: "Transgender",
                            labelKey: "NOC_GENDER_TRANSGENDER_RADIOBUTTON",
                            value: "TRANSGENDER"
                        }
                    ],
                    jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].gender"
                },
                type: "array"
            },
            primaryOwner: {
                uiFramework: "custom-containers-local",
                componentPath: "CheckboxContainer",
                jsonPath: "BPAs[0].BPADetails.applicantDetails.owners[0].primaryOwner",
                props: {
                    // style: {
                    //     display: 'none'
                    // },
                    content: 'Is Primary Owner ?'
                },
                type: "array"
            },
        })
    });
};

export const applicantDetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Owner Details",
            labelKey: "Owner Details"
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
                        labelName: "Owner Type",
                        labelKey: "Owner Type"
                    },
                    placeholder: {
                        labelName: "Select Applicant Type",
                        labelKey: "NOC_APPLICANT_TYPE_PLACEHOLDER"
                    },
                    jsonPath: "BPAs[0].BPADetails.applicantDetails.ownerShipMajorType",
                    localePrefix: {
                        moduleName: "common-masters",
                        masterName: "OwnerShipCategory"
                    },
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
                        labelName: "Type of Owner - Subtype",
                        labelKey: "Type of Owner - Subtype"
                    },
                    placeholder: {
                        labelName: "Select Owner - Subtype",
                        labelKey: "Select Owner - Subtype"
                    },
                    jsonPath: "BPAs[0].BPADetails.applicantDetails.ownerShipType",
                    localePrefix: {
                        moduleName: "common-masters",
                        masterName: "OwnerShipCategory"
                    },
                    required: true,
                    gridDefination: {
                        xs: 12,
                        sm: 12,
                        md: 6
                    }
                }),
                beforeFieldChange: (action, state, dispatch) => {
                    let singleApplicantContainerJsonPath =
                        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer";
                    let multipleApplicantContainerJsonPath =
                        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer";
                    let primaryOwnerJsonPath =
                        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children.primaryOwner";

                    if (action.value.includes("SINGLEOWNER")) {
                        showComponent(dispatch, singleApplicantContainerJsonPath, true);
                        showComponent(dispatch, multipleApplicantContainerJsonPath, false);
                        showComponent(dispatch, primaryOwnerJsonPath, false);

                    } else if (action.value.includes("MULTIPLEOWNERS")) {
                        showComponent(dispatch, singleApplicantContainerJsonPath, false);
                        showComponent(dispatch, multipleApplicantContainerJsonPath, true);
                        showComponent(dispatch, primaryOwnerJsonPath, true);
                    } else {
                        showComponent(dispatch, singleApplicantContainerJsonPath, false);
                        showComponent(dispatch, multipleApplicantContainerJsonPath, false);
                    }
                }
            }
        }),
        singleApplicantContainer: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            children: {
                individualApplicantInfo: commonApplicantInformation()
            }
        },
        multipleApplicantContainer: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                style: {
                    display: "none"
                }
            },
            children: {
                multipleApplicantInfo: {
                    uiFramework: "custom-containers",
                    componentPath: "MultiItem",
                    props: {
                        scheama: commonApplicantInformation(),
                        items: [],
                        addItemLabel: {
                            labelName: "Add Owner",
                            labelKey: "Add Owner"
                        },
                        sourceJsonPath: "BPAs[0].BPADetails.applicantDetails.owners",
                        prefixSourceJsonPath: "children.cardContent.children.applicantCard.children"
                    },
                    type: "array"
                }
            }
        }
    })
});
