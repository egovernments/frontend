import {
    getCommonCard,
    getCommonGrayCard,
    getCommonContainer,
    getCommonTitle,
    getCommonSubHeader,
    getLabel,
  getLabelWithValue,
    getPattern,
    getSelectField,
    getTextField,
    getDateField    
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {
    getDetailsForOwner,
    getTodaysDateInYMD,
  } from "../../utils";

  export const transferorSummary = getCommonGrayCard({
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
            labelName: "Transferor Details",
            labelKey: "PT_MUTATION_TRANSFEROR_DETAILS"
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
              labelKey: "PT_MUTATION_TRANSFEROR_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              gotoApplyWithStep(state, dispatch, 0);
            }
          }
        }
      }
    },
    body: getCommonContainer({
      transferorName: getLabelWithValue(
        {
          labelName: "Name",
          labelKey: "PT_MUTATION_TRANSFEROR_NAME"
        },
        {
          jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType"
          // callBack: value => {
          //   return value.split(".")[0];
          // }
        }
      ),
      guardianName: getLabelWithValue(
        {
          labelName: "Guardian's Name",
          labelKey: "PT_MUTATION_TRANSFEROR_GUARDIAN_NAME"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      ),
      transferorGender: getLabelWithValue(
        {
          labelName: "Gender",
          labelKey: "PT_MUTATION_TRANSFEROR_GENDER"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      ),
      transferorDOB: getLabelWithValue(
        {
          labelName: "Date Of Birth",
          labelKey: "PT_MUTATION_TRANSFEROR_DOB"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      ),
      transferorMobile: getLabelWithValue(
        {
          labelName: "Mobile No.",
          labelKey: "PT_MUTATION_TRANSFEROR_MOBILE"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      ),
      transferorEmail: getLabelWithValue(
        {
          labelName: "Email",
          labelKey: "PT_MUTATION_TRANSFEROR_EMAIL"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      ),
      transferorSpecialCategory: getLabelWithValue(
        {
          labelName: "Special Category",
          labelKey: "PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      ),
      transferorCorrespondenceAddress: getLabelWithValue(
        {
          labelName: "Correspondence Address",
          labelKey: "PT_MUTATION_TRANSFEROR_CORRESPONDENCE_ADDRESS"
        },
        {
          jsonPath: "FireNOCs[0].provisionFireNOCNumber"
          // callBack: value => {
          //   return value.split(".")[1];
          // }
        }
      )
    })
  });

export const transfereeDetails = getCommonCard(
    {
      header: getCommonTitle(
        {
          labelName: "Transferee Details",
          labelKey: "PT_MUTATION_TRANSFEREE_DETAILS"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
  
      transfereeDetailsContainer: getCommonContainer({
        transfereeName: getTextField({
          label: {
            labelName: "Transferee Name",
            labelKey: "PT_MUTATION_TRANSFEREE_NAME"
          },
          placeholder: {
            labelName: "Enter Name",
            labelKey: "PT_MUTATION_TRANSFEREE_NAME_PLACEHOLDER"
          },
          props:{
            className:"applicant-details-error"
          },
          pattern: getPattern("Name"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          required: true,
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId"
        }),
        getGenderRadioButton : {
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
                name: "Gender",
                key: "PT_MUTATION_TRANSFEREE_GENDER"
              },
              buttons: [
                {
                  labelName: "Male",
                  labelKey: "PT_MUTATION_MALE_GENDER",
                  value: "MALE"
                },
                {
                  label: "Female",
                  labelKey: "PT_MUTATION_FEMALE_GENDER",
                  value: "FEMALE"
                },
                {
                    label: "Transgender",
                    labelKey: "PT_MUTATION_TRANSGENDER_GENDER",
                    value: "TRANSGENDER"
                  }
              ],
              jsonPath:"Licenses[0].tradeLicenseDetail.owners[0].relationship",
              required: true
            },
            required: true,
            type: "array"
          },
          getTransfereeMobNoField: getTextField({
            label: {
              labelName: "Mobile No.",
              labelKey: "PT_MUTATION_TRANSFEREE_MOBILE"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Mobile No.",
              labelKey: "PT_MUTATION_TRANSFEREE_MOB_NO_PLACEHOLDER"
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
          getTransfereeEmailField: getTextField({
            label: {
              labelName: "Email",
              labelKey: "PT_MUTATION_TRANSFEREE_EMAIL"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Email",
              labelKey: "PT_MUTATION_TRANSFEREE_EMAIL_PLACEHOLDER"
            },
            pattern: getPattern("Email"),
            jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId"
          }),
          getTransfereeGuardianNameField: getTextField({
            label: {
              labelName: "Guardian's Name",
              labelKey: "PT_MUTATION_TRANSFEREE_GUARDIAN_NAME"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Guardian's Name",
              labelKey: "PT_MUTATION_TRANSFEREE_GUARDIAN_NAME_PLACEHOLDER"
            },
            pattern: getPattern("Name"),
            jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId"
          }),
          getRelationshipWithGuardianField: getSelectField({
            label: {
              labelName: "Relationship With Guardian",
              labelKey: "PT_MUTATION_TRANSFEREE_RELATIONSHIP_WITH_GUARDIAN"
            },
            placeholder: {
              labelName: "Select Relationship",
              labelKey: "PT_MUTATION_TRANSFEREE_RELATIONSHIP_WITH_GUARDIAN_PLACEHOLDER"
            },
            required: true,
            optionValue: "code",
            optionLabel: "label",
            jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
            data: [
              {
                code: "Father",
                label: "PT_MUTATION_TRANSFEREE_FATHER_RELATIONSHIP"
              },
              {
                code: "Husband",
                label: "PT_MUTATION_TRANSFEREE_HUSBAND_RELATIONSHIP"
              }
            ]
          }),
          SpecialApplicantCategory: getSelectField({
            label: {
              labelName: "Special Applicant Category",
              labelKey: "PT_MUTATION_SPECIAL_APPLICANT_CATEGORY"
            },
            placeholder: {
              labelName: "Select Special Applicant Category",
              labelKey: "PT_MUTATION_SPECIAL_APPLICANT_CATEGORY_PLACEHOLDER"
            },
            jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
            sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
            localePrefix: {
              moduleName: "common-masters",
              masterName: "OwnerType"
            }
          }),
          correspondeceAddress: getTextField({
            label: {
              labelName: "Correspondence Address",
              labelKey: "PT_MUTATION_CORRESPONDENCE_ADDRESS"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Correspondence Address",
              labelKey: "PT_MUTATION_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
            },
            required: true,
            pattern: getPattern("Address"),
         //   jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
          })
        })
      });

      export const mutationDetails = getCommonCard(
        {
          header: getCommonTitle(
            {
              labelName: "Mutation Details",
              labelKey: "PT_MUTATION_DETAILS"
            },
            {
              style: {
                marginBottom: 18
              }
            }
          ),
          mutationDetailsContainer: getCommonContainer({ 
            getMutationPendingRadioButton : {
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
                  name: "Is Mutation Pending in Court?",
                  key: "PT_MUTATION_COURT_PENDING_OR_NOT"
                },
                buttons: [
                  {
                    labelName: "Yes",
                    labelKey: "PT_MUTATION_PENDING_YES",
                    value: "YES"
                  },
                  {
                    label: "No",
                    labelKey: "PT_MUTATION_PENDING_NO",
                    value: "NO"
                  }
                ],
               // jsonPath:"Licenses[0].tradeLicenseDetail.owners[0].relationship",
                required: true
              },
              required: true,
              type: "array"
            },

            getMutationStateAcquisitionRadioButton : {
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
                  name: "Is Property or Part of Property under State/Central Government Acquisition? ",
                  key: "PT_MUTATION_STATE_ACQUISITION"
                },
                buttons: [
                  {
                    labelName: "Yes",
                    labelKey: "PT_MUTATION_STATE_ACQUISITION_YES",
                    value: "YES"
                  },
                  {
                    label: "No",
                    labelKey: "PT_MUTATION_STATE_ACQUISITION_NO",
                    value: "NO"
                  }
                ],
                //jsonPath:"Licenses[0].tradeLicenseDetail.owners[0].relationship",
                required: true
              },
              required: true,
              type: "array"
            },

            courtCaseDetails: getTextField({
              label: {
                labelName: "Details of Court Case",
                labelKey: "PT_MUTATION_COURT_CASE_DETAILS"
              },
              props:{
                className:"applicant-details-error"
              },
              placeholder: {
                labelName: "Enter Details of Court Case",
                labelKey: "PT_MUTATION_COURT_CASE_DETAILS_PLACEHOLDER"
              },
              pattern: getPattern("Address"),
      //        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
            }),
            govtAcquisitionDetails: getTextField({
              label: {
                labelName: "Details of Government Acquisition",
                labelKey: "PT_MUTATION_GOVT_ACQUISITION_DETAILS"
              },
              props:{
                className:"applicant-details-error"
              },
              placeholder: {
                labelName: "Enter Details of Govt Acquisition",
                labelKey: "PT_MUTATION_GOVT_ACQUISITION_DETAILS_PLACEHOLDER"
              },
              pattern: getPattern("Address"),
           //   jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
            }),

          })
        });

        export const registrationDetails = getCommonCard(
          {
            header: getCommonTitle(
              {
                labelName: "Registration Details",
                labelKey: "PT_MUTATION_REGISTRATION_DETAILS"
              },
              {
                style: {
                  marginBottom: 18
                }
              }
            ),
            registrationDetailsContainer: getCommonContainer({ 
              transferReason: getSelectField({
                label: {
                  labelName: "Reason For Transfer",
                  labelKey: "PT_MUTATION_TRANSFER_REASON"
                },
                placeholder: {
                  labelName: "Select Reason for Transfer",
                  labelKey: "PT_MUTATION_TRANSFER_REASON_PLACEHOLDER"
                },
                required:true,
                jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
                sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
                localePrefix: {
                  moduleName: "common-masters",
                  masterName: "OwnerType"
                }
              }),
              documentNumber: getTextField({
                label: {
                  labelName: "Document No.",
                  labelKey: "PT_MUTATION_DOCUMENT_NO"
                },
                props:{
                  className:"applicant-details-error"
                },
                placeholder: {
                  labelName: "Enter Document No.",
                  labelKey: "PT_MUTATION_DOCUMENT_NO_PLACEHOLDER"
                },
                required:true,
                pattern: getPattern("Address"),
          //      jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
              }),
                documentIssueDateField :getDateField({
                label: { labelName: "Document Issue Date", labelKey: "PT_MUTATION_DOCUMENT_ISSUE_DATE" },
                placeholder: {
                  labelName: "Enter Document No.",
                  labelKey: "PT_MUTATION_DOCUMENT_ISSUE_DATE_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Date"),
                jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
                // props: {
                //   inputProps: {
                //     max: getTodaysDateInYMD()
                //   }
                // }
              }),
              documentValue: getTextField({
                label: {
                  labelName: "Document Value",
                  labelKey: "PT_MUTATION_DOCUMENT_VALUE"
                },
                props:{
                  className:"applicant-details-error"
                },
                placeholder: {
                  labelName: "Enter Document Value",
                  labelKey: "PT_MUTATION_DOCUMENT_VALUE_PLACEHOLDER"
                },
                required:true,
                pattern: getPattern("Address"),
           //     jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
              }),
              remarks: getTextField({
                label: {
                  labelName: "Remarks",
                  labelKey: "PT_MUTATION_REMARKS"
                },
                props:{
                  className:"applicant-details-error"
                },
                placeholder: {
                  labelName: "Enter Remarks if any",
                  labelKey: "PT_MUTATION_REMARKS"
                },
                pattern: getPattern("Address"),
               // jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
              }),
            })
          }) ; 