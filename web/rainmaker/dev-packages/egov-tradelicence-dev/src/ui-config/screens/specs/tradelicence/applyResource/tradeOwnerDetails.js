import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getTextField,
  getSelectField,
  getCommonContainer,
  getDateField,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  getDetailsForOwner,
  getTodaysDateInYMD,
  getRadioGroupWithLabel
} from "../../utils";
import { prepareFinalObject as pFO } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getRadioButton } from "egov-ui-framework/ui-config/screens/specs/utils";
import "./index.css";

export const getOwnerMobNoField = getTextField({
  label: {
    labelName: "Mobile No.",
    labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
  },
  props:{
    className:"applicant-details-error"
  },
  placeholder: {
    labelName: "Enter Mobile No.",
    labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_PLACEHOLDER"
  },
  required: true,
  pattern: getPattern("MobileNo"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
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
  title: {
    value: "Please search owner profile linked to the mobile no.",
    key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
  },
  infoIcon: "info_circle"
});

export const getOwnerGenderField = getSelectField({
  label: {
    labelName: "Gender",
    labelKey: "TL_NEW_OWNER_DETAILS_GENDER_LABEL"
  },
  placeholder: {
    labelName: "Select Gender",
    labelKey: "TL_NEW_OWNER_DETAILS_GENDER_PLACEHOLDER"
  },
  required: true,
  optionValue: "code",
  optionLabel: "label",
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
  data: [
    {
      code: "MALE",
      label: "COMMON_GENDER_MALE"
    },
    {
      code: "FEMALE",
      label: "COMMON_GENDER_FEMALE"
    },
    {
      code: "OTHERS",
      label: "COMMON_GENDER_TRANSGENDER"
    }
  ]
});

export const getOwnerDOBField = getDateField({
  label: { labelName: "Date of Birth", labelKey: "TL_EMP_APPLICATION_DOB" },
  placeholder: {
    labelName: "Enter Date of Birth",
    labelKey: "TL_NEW_OWNER_DETAILS_DOB_PLACEHOLDER"
  },
  required: true,
  pattern: getPattern("Date"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
  props: {
    inputProps: {
      max: getTodaysDateInYMD()
    }
  }
});

export const getOwnerEmailField = getTextField({
  label: {
    labelName: "Email",
    labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL"
  },
  props:{
    className:"applicant-details-error"
  },
  placeholder: {
    labelName: "Enter Email",
    labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_PLACEHOLDER"
  },
  pattern: getPattern("Email"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId"
});

export const getFatherNameField = getTextField({
  label: {
    labelName: "Father/Spouse Name",
    labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
  },
  props:{
    className:"applicant-details-error"
  },
  placeholder: {
    labelName: "Enter Father/Spouse Name",
    labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_PLACEHOLDER"
  },
  required: true,
  pattern: getPattern("Name"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
});
export const getRelationshipRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 12,
    md: 6
  },
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].relationship",
  props: {
    label: {
      name: "Relationship",
      key: "TL_COMMON_RELATIONSHIP_LABEL"
    },
    buttons: [
      {
        labelName: "Father",
        labelKey: "COMMON_RELATION_FATHER",
        value: "FATHER"
      },
      {
        label: "Husband",
        labelKey: "COMMON_RELATION_HUSBAND",
        value: "HUSBAND"
      }
    ],
    jsonPath:"Licenses[0].tradeLicenseDetail.owners[0].relationship",
    required: true
  },
  required: true,
  type: "array"
};

export const OwnerInfoCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: getCommonSubHeader(
        {
          labelName: "Owner Information",
          labelKey: "TL_NEW_OWNER_DETAILS_HEADER_OWNER_INFO"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      tradeUnitCardContainerOwnerInfo: getCommonContainer({
        getOwnerMobNoField: getTextField({
          label: {
            labelName: "Mobile No.",
            labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
          },
          props:{
            className:"applicant-details-error"
          },
          placeholder: {
            labelName: "Enter Mobile No.",
            labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("MobileNo"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
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
          title: {
            value: "Please search owner profile linked to the mobile no.",
            key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
          },
          infoIcon: "info_circle"
        }),
        ownerName: getTextField({
          label: {
            labelName: "Name",
            labelKey: "TL_NEW_OWNER_DETAILS_NAME_LABEL"
          },
          props:{
            className:"applicant-details-error"
          },
          placeholder: {
            labelName: "Enter Name",
            labelKey: "TL_NEW_OWNER_DETAILS_NAME_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Name"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name"
        }),
        getFatherNameField: getTextField({
          label: {
            labelName: "Father/Spouse Name",
            labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
          },
          props:{
            className:"applicant-details-error"
          },
          placeholder: {
            labelName: "Enter Father/Spouse Name",
            labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Name"),
          jsonPath:
            "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
        }),
        getRelationshipRadioButton: {
          uiFramework: "custom-containers",
          componentPath: "RadioGroupContainer",
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].relationship",
          props: {
            label: {
              name: "Relationship",
              key: "TL_COMMON_RELATIONSHIP_LABEL"
            },
            buttons: [
              {
                labelName: "Father",
                labelKey: "COMMON_RELATION_FATHER",
                value: "FATHER"
              },
              {
                label: "Husband",
                labelKey: "COMMON_RELATION_HUSBAND",
                value: "HUSBAND"
              }
            ],
            jsonPath:
              "Licenses[0].tradeLicenseDetail.owners[0].relationship",
            required: true
          },
          required: true,
          type: "array"
        },
        getOwnerGenderField: getSelectField({
          label: {
            labelName: "Gender",
            labelKey: "TL_NEW_OWNER_DETAILS_GENDER_LABEL"
          },
          placeholder: {
            labelName: "Select Gender",
            labelKey: "TL_NEW_OWNER_DETAILS_GENDER_PLACEHOLDER"
          },
          required: true,
          optionValue: "code",
          optionLabel: "label",
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
          data: [
            {
              code: "MALE",
              label: "COMMON_GENDER_MALE"
            },
            {
              code: "FEMALE",
              label: "COMMON_GENDER_FEMALE"
            },
            {
              code: "OTHERS",
              label: "COMMON_GENDER_TRANSGENDER"
            }
          ]
        }),
        ownerDOB: {
          ...getDateField({
            label: {
              labelName: "Date of Birth",
              labelKey: "TL_EMP_APPLICATION_DOB"
            },
            placeholder: {
              labelName: "Enter Date of Birth",
              labelKey: "TL_NEW_OWNER_DETAILS_DOB_PLACEHOLDER"
            },
            required: true,
            pattern: getPattern("Date"),
            isDOB: true,
            errorMessage: "TL_DOB_ERROR_MESSAGE",
            jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
            props: {
              inputProps: {
                max: getTodaysDateInYMD()
              }
            }
          })
        },
        getOwnerEmailField: getTextField({
          label: {
            labelName: "Email",
            labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL"
          },
          props:{
            className:"applicant-details-error"
          },
          placeholder: {
            labelName: "Enter Email",
            labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_PLACEHOLDER"
          },
          pattern: getPattern("Email"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId"
        }),
        ownerPAN: getTextField({
          label: {
            labelName: "PAN No.",
            labelKey: "TL_NEW_OWNER_DETAILS_PAN_LABEL"
          },
          props:{
            className:"applicant-details-error"
          },
          placeholder: {
            labelName: "Enter Owner's PAN No.",
            labelKey: "TL_NEW_OWNER_DETAILS_PAN_PLACEHOLDER"
          },
          pattern: getPattern("PAN"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].pan"
        }),
        ownerAddress: getTextField({
          label: {
            labelName: "Correspondence Address",
            labelKey: "TL_NEW_OWNER_DETAILS_ADDR_LABEL"
          },
          props:{
            className:"applicant-details-error"
          },
          placeholder: {
            labelName: "Enter Correspondence Address",
            labelKey: "TL_NEW_OWNER_DETAILS_ADDR_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Address"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
        }),
        OwnerSpecialCategory: getSelectField({
          label: {
            labelName: "Special Owner Category",
            labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_LABEL"
          },
          placeholder: {
            labelName: "Select Special Owner Category",
            labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_PLACEHOLDER"
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
          sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          }
        })
      })
    }),
    items: [],
    addItemLabel: {
      labelName: "ADD OWNER",
      labelKey: "TL_NEW_OWNER_DETAILS_ADD_OWN"
    },
    headerName: "Owner Information",
    headerJsonPath:
      "children.cardContent.children.header.children.Owner Information.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.owners",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeUnitCardContainer.children"
  },

  type: "array"
};

export const ownerInfoInstitutional = {
  ...getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Owner Information",
        labelKey: "TL_NEW_OWNER_DETAILS_HEADER_OWNER_INFO"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    tradeUnitCardContainerInstitutional: getCommonContainer({
      getOwnerMobNoField: getTextField({
        label: {
          labelName: "Mobile No.",
          labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("MobileNo"),
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
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
        title: {
          value: "Please search owner profile linked to the mobile no.",
          key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
        },
        infoIcon: "info_circle"
      }),
      offTelephone: getTextField({
        label: {
          labelName: "Official Telephone No.",
          labelKey: "TL_NEW_OWNER_PHONE_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Official Telephone No.",
          labelKey: "TL_NEW_OWNER_PHONE_PLACEHOLDER"
        },
        pattern: /^[0-9]{10,11}$/i,
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].altContactNumber"
      }),

      authPerson: getTextField({
        label: {
          labelName: "Name of Authorised Person",
          labelKey: "TL_NEW_OWNER_AUTH_PER_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Name of Authorised Person",
          labelKey: "TL_NEW_OWNER_AUTH_PER_PLACEHOLDER"
        },
        pattern: getPattern("Name"),
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name"
      }),

      designation: getTextField({
        label: {
          labelName: "Designation",
          labelKey: "TL_NEW_OWNER_DESIG_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Designation",
          labelKey: "TL_NEW_OWNER_DESIG_PLACEHOLDER"
        },
        pattern: getPattern("Name"),
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.designation"
      }),
      getFatherNameField: getTextField({
        label: {
          labelName: "Father/Spouse Name",
          labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Father/Spouse Name",
          labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name"),
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
      }),
      getRelationshipRadioButton: {
        uiFramework: "custom-containers",
        componentPath: "RadioGroupContainer",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].relationship",
        props: {
          label: {
            name: "Relationship",
            key: "TL_COMMON_RELATIONSHIP_LABEL"
          },
          buttons: [
            {
              labelName: "Father",
              labelKey: "COMMON_RELATION_FATHER",
              value: "FATHER"
            },
            {
              label: "Husband",
              labelKey: "COMMON_RELATION_HUSBAND",
              value: "HUSBAND"
            }
          ],
          jsonPath:
            "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].relationship",
          required: true
        },
        required: true,
        type: "array"
      },
      getOwnerGenderField: getSelectField({
        label: {
          labelName: "Gender",
          labelKey: "TL_NEW_OWNER_DETAILS_GENDER_LABEL"
        },
        placeholder: {
          labelName: "Select Gender",
          labelKey: "TL_NEW_OWNER_DETAILS_GENDER_PLACEHOLDER"
        },
        required: true,
        optionValue: "code",
        optionLabel: "label",
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
        data: [
          {
            code: "MALE",
            label: "COMMON_GENDER_MALE"
          },
          {
            code: "FEMALE",
            label: "COMMON_GENDER_FEMALE"
          },
          {
            code: "OTHERS",
            label: "COMMON_GENDER_TRANSGENDER"
          }
        ]
      }),
      ownerDOB: {
        ...getDateField({
          label: {
            labelName: "Date of Birth",
            labelKey: "TL_EMP_APPLICATION_DOB"
          },
          placeholder: {
            labelName: "Enter Date of Birth",
            labelKey: "TL_NEW_OWNER_DETAILS_DOB_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Date"),
          isDOB: true,
          errorMessage: "TL_DOB_ERROR_MESSAGE",
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      getOwnerEmailField: getTextField({
        label: {
          labelName: "Email",
          labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Email",
          labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_PLACEHOLDER"
        },
        pattern: getPattern("Email"),
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId"
      }),
      ownerAddress: getTextField({
        label: {
          labelName: "Official Corrospondence Address",
          labelKey: "TL_NEW_OWNER_OFF_ADDR_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Official Corrospondence Address",
          labelKey: "TL_NEW_OWNER_OFF_ADDR_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Address"),
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
      })
    })
  }),
  visible: false
};

export const tradeOwnerDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Trade Owner Details",
      labelKey: "TL_NEW_OWNER_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  ownershipType: getCommonContainer({
    ownership: {
      ...getSelectField({
        label: {
          labelName: "Type of ownership",
          labelKey: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Type of Ownership",
          labelKey: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_PLACEHOLDER"
        },
        jsonPath: "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory",
        required: true,
        localePrefix: {
          moduleName: "common-masters",
          masterName: "OwnerShipCategory"
        },
        sourceJsonPath:
          "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed"
      }),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          dispatch(
            pFO(
              "applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed",
              get(
                state.screenConfiguration.preparedFinalObject,
                `applyScreenMdmsData.common-masters.OwnerShipCategory.${action.value}`,
                []
              )
            )
          );
          if (action.value === "INDIVIDUAL") {
            if (
              get(
                state.screenConfiguration.preparedFinalObject,
                "Licenses[0].tradeLicenseDetail.institution"
              )
            ) {
              dispatch(pFO("Licenses[0].tradeLicenseDetail.institution", null));
            }
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional",
                "visible",
                false
              )
            );
          } else {
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
                "visible",
                false
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional",
                "visible",
                true
              )
            );
            dispatch(
              pFO("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", "")
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    subOwnership: {
      ...getSelectField({
        label: {
          labelName: "Type of sub-ownership",
          labelKey: "TL_TYPE_OF_SUB_OWNERSHIP"
        },
        placeholder: {
          labelName: "Select Type of sub ownership",
          labelKey: "TL_TYPE_OF_SUB_OWNERSHIP_PLACEHOLDER"
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
        required: true,
        localePrefix: {
          moduleName: "common-masters",
          masterName: "OwnerShipCategory"
        },
        sourceJsonPath:
          "applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed"
      }),
      beforeFieldChange: (action, state, dispatch) => {
        if (action.value === "INDIVIDUAL.SINGLEOWNER") {
          const ownerInfoCards = get(
            state.screenConfiguration.screenConfig.apply, //hardcoded to apply screen
            "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items"
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
              "props.hasAddItem",
              false
            )
          );
          if (ownerInfoCards && ownerInfoCards.length > 1) {
            const singleCard = ownerInfoCards.slice(0, 1); //get the first element if multiple cards present

            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
                "props.items",
                singleCard
              )
            );
            dispatch(
              pFO(
                "Licenses[0].tradeLicenseDetail.owners",
                get(
                  state.screenConfiguration.preparedFinalObject,
                  "Licenses[0].tradeLicenseDetail.owners"
                ).slice(0, 1)
              )
            );
          }
        }

        if (action.value === "INDIVIDUAL.MULTIPLEOWNERS") {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
              "props.hasAddItem",
              true
            )
          );
        }
      }
    },
    
  },
  {style:getQueryArg(window.location.href, "action") === "EDITRENEWAL"? {"pointer-events":"none"}:{}}
  ),
  
  OwnerInfoCard,
  ownerInfoInstitutional
});
