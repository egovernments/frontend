import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

export const applicantSummary = getCommonGrayCard({
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
          labelName: "Owner Info",
          labelKey: "Owner Info"
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
            gotoApplyWithStep(state, dispatch, 2);
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
        applicantContainer: getCommonContainer({
          mobileNo: getLabelWithValue(
            {
              labelName: "Mobile No.",
              labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
            },
            {
              jsonPath:
                "BPA.owners[0].mobileNumber"
            }
          ),
          applicantName: getLabelWithValue(
            {
              labelName: "Name",
              labelKey: "NOC_APPLICANT_NAME_LABEL"
            },
            {
              jsonPath: "BPA.owners[0].name"
            }
          ),
          applicantGender: getLabelWithValue(
            {
              labelName: "Gender",
              labelKey: "NOC_GENDER_LABEL"
            },
            {
              jsonPath: "BPA.owners[0].gender"
            }
          ),
          applicantFatherHusbandName: getLabelWithValue(
            {
              labelName: "Father/Husband's Name",
              labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"
            },
            {
              jsonPath:
                "BPA.owners[0].fatherOrHusbandName"
            }
          ),
          applicantRelation: getLabelWithValue(
            {
              labelName: "Relationship",
              labelKey: "NOC_APPLICANT_RELATIONSHIP_LABEL"
            },
            {
              jsonPath:
                "BPA.owners[0].relationship"
            }
          ),
          applicantDob: getLabelWithValue(
            {
              labelName: "Date of Birth",
              labelKey: "NOC_APPLICANT_DOB_LABEL"
            },
            {
              jsonPath: "BPA.owners[0].dob",
              callBack: value => {
                return convertEpochToDate(value);
              }
            }
          ),
          applicantEmail: getLabelWithValue(
            {
              labelName: "Email",
              labelKey: "NOC_APPLICANT_EMAIL_LABEL"
            },
            {
              jsonPath: "BPA.owners[0].emailId"
            }
          ),
          applicantPan: getLabelWithValue(
            {
              labelName: "PAN",
              labelKey: "NOC_APPLICANT_PAN_LABEL"
            },
            {
              jsonPath: "BPA.owners[0].pan"
            }
          ),
          applicantAddress: getLabelWithValue(
            {
              labelName: "Correspondence Address",
              labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
            },
            {
              jsonPath:
                "BPA.owners[0].correspondenceAddress"
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "BPA.owners",
      prefixSourceJsonPath:
        "children.cardContent.children.applicantContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});

export const institutionSummary = getCommonGrayCard({
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
          labelName: "Institution Details",
          labelKey: "NOC_INSTITUTION_DETAILS_HEADER"
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
            gotoApplyWithStep(state, dispatch, 2);
          }
        }
      }
    }
  },
  body: getCommonContainer({
    institutionType: getLabelWithValue(
      {
        labelName: "Institution Type",
        labelKey: "NOC_INSTITUTION_TYPE_LABEL"
      },
      {
        jsonPath: "BPA.ownerShipType",
        callBack: value => {
          return `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(
            value
          )}`;
        }
      }
    ),
    institutionName: getLabelWithValue(
      {
        labelName: "Name of Institution",
        labelKey: "NOC_NAME_OF_INSTITUTION_LABEL"
      },
      {
        jsonPath:
          "BPA.additionalDetail.institutionName"
      }
    ),
    telephoneNumber: getLabelWithValue(
      {
        labelName: "Official Telephone No.",
        labelKey: "NOC_OFFICIAL_TELEPHONE_LABEL"
      },
      {
        jsonPath:
          "BPA.additionalDetail.telephoneNumber"
      }
    ),
    authorizedPersonName: getLabelWithValue(
      {
        labelName: "Name of Authorized Person",
        labelKey: "NOC_AUTHORIZED_PERSON_NAME_LABEL"
      },
      {
        jsonPath: "BPA.owners[0].name"
      }
    ),
    designation: getLabelWithValue(
      {
        labelName: "Designation in Institution",
        labelKey: "NOC_DESIGNATION_LABEL"
      },
      {
        jsonPath:
          "BPA.additionalDetail.institutionDesignation"
      }
    ),
    mobileNumber: getLabelWithValue(
      {
        labelName: "Mobile No. of Authorized Person",
        labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
      },
      {
        jsonPath: "BPA.owners[0].mobileNumber"
      }
    ),
    authorizedEmail: getLabelWithValue(
      {
        labelName: "Email of Authorized Person",
        labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
      },
      {
        jsonPath: "BPA.owners[0].emailId"
      }
    ),
    officialAddress: getLabelWithValue(
      {
        labelName: "Official Correspondence Address",
        labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
      },
      {
        jsonPath:
          "BPA.owners[0].correspondenceAddress"
      }
    )
  })
});
