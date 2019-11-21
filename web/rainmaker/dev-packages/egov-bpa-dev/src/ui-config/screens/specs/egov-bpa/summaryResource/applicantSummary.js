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
          applicantName: getLabelWithValue(
            {
              labelName: "Name",
              labelKey: "NOC_APPLICANT_NAME_LABEL"
            },
            {
              jsonPath:
                "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
              // callBack: value => {
              //   return value.split(".")[1];
              // }
            }
          ),
          applicantAddress: getLabelWithValue(
            {
              labelName: "Owners Communication Address",
              labelKey: "Owners Communication Address"
            },
            {
              jsonPath:
                "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
              // callBack: value => {
              //   return value.split(".")[1];
              // }
            }
          ),
          mobileNo: getLabelWithValue(
            {
              labelName: "Mobile No.",
              labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
            },
            {
              jsonPath:
                "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber"
              // callBack: value => {
              //   return value.split(".")[0];
              // }
            }
          ),
          applicantEmail: getLabelWithValue(
            {
              labelName: "Email",
              labelKey: "NOC_APPLICANT_EMAIL_LABEL"
            },
            {
              jsonPath:
                "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
            }
          ),
          applicantGender: getLabelWithValue(
            {
              labelName: "Gender",
              labelKey: "NOC_GENDER_LABEL"
            },
            {
              jsonPath:
                "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender"
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
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
        callBack: value => {
          return `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
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
          "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionName"
      }
    ),
    telephoneNumber: getLabelWithValue(
      {
        labelName: "Official Telephone No.",
        labelKey: "NOC_OFFICIAL_TELEPHONE_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.telephoneNumber"
      }
    ),
    authorizedPersonName: getLabelWithValue(
      {
        labelName: "Name of Authorized Person",
        labelKey: "NOC_AUTHORIZED_PERSON_NAME_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
      }
    ),
    designation: getLabelWithValue(
      {
        labelName: "Designation in Institution",
        labelKey: "NOC_DESIGNATION_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionDesignation"
      }
    ),
    mobileNumber: getLabelWithValue(
      {
        labelName: "Mobile No. of Authorized Person",
        labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber"
      }
    ),
    authorizedEmail: getLabelWithValue(
      {
        labelName: "Email of Authorized Person",
        labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
      }
    ),
    officialAddress: getLabelWithValue(
      {
        labelName: "Official Correspondence Address",
        labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress"
      }
    )
  })
});
