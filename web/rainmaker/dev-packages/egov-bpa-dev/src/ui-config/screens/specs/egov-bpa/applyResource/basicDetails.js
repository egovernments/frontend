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
  
  export const basicDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Basic Details",
        labelKey: "Basic Details"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    basicDetailsContainer: getCommonContainer({
      scrutinynumber: {
        ...getTextField({
          label: {
            labelName: "Building Plan Scrutiny Number",
            labelKey: "Building Plan Scrutiny Number"
          },
          placeholder: {
            labelName: "Enter Scrutiny Number",
            labelKey: "Enter Scrutiny Number"
          },
          required: true,
          // pattern: getPattern("Name") || null,
          jsonPath: "Employee[0].user.name"
        })
      },

      occupancy: {
        ...getSelectField({
          label: {
            labelName: "Occupancy",
            labelKey: "Occupancy"
          },
          placeholder: {
            labelName: "Select Occupancy",
            labelKey: "Occupancy"
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
  
  
      applicationtype: {
        ...getSelectField({
          label: {
            labelName: "Application type",
            labelKey: "Application type"
          },
          placeholder: {
            labelName: "Select Occupancy",
            labelKey: "Occupancy"
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
          },
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        })
      },
      dummyDiv2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true
        }
      },
      regularization: {
        ...getCheckBoxwithLabel(
          {
            labelName: "Is Application For Regularization ?",
            labelKey: "Is Application For Regularization ?"
          },
          {
            style: {
              //marginBottom: 18
            }
          }),
      },
  
      dummyDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true
        }
      },
  
      servicetype: {
        ...getSelectField({
          label: {
            labelName: "Service type",
            labelKey: "Service type"
          },
          placeholder: {
            labelName: "Select Service",
            labelKey: "Service"
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

      dummyDiv3: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true
        }
      },

      applicationdate: {
        ...getDateField({
          label: {
            labelName: "Application Date",
            labelKey: "Application Date"
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
  
  
      scrutinyfee: {
        ...getTextField({
          label: {
            labelName: "Scrutiny Fee",
            labelKey: "Scrutiny Fee"
          },
          // placeholder: {
          //   labelName: "Enter Corrospondence Address",
          //   labelKey: "HR_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
          // },
          jsonPath: "Employee[0].user.correspondenceAddress"
        })
      },
  
      remarks: {
        ...getTextField({
          label: {
            labelName: "Remarks",
            labelKey: "Remarks"
          },
          // placeholder: {
          //   labelName: "Enter Corrospondence Address",
          //   labelKey: "HR_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
          // },
          jsonPath: "Employee[0].user.correspondenceAddress"
        })
      }
  
    })
  });
  
  export const professionalDetails = getCommonCard(
    {
      header: getCommonTitle(
        {
          labelName: "Professional Details",
          labelKey: "HR_PROFESSIONAL_DETAILS_FORM_HEADER"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      employeeDetailsContainer: getCommonContainer({
        employeeId: {
          ...getTextField({
            label: {
              labelName: "Employee ID",
              labelKey: "HR_EMPLOYEE_ID_LABEL"
            },
            placeholder: {
              labelName: "Enter Employee ID",
              labelKey: "HR_EMPLOYEE_ID_PLACEHOLDER"
            },
            pattern: /^[a-zA-Z0-9-_]*$/i,
            jsonPath: "Employee[0].code"
          })
        },
        dateOfAppointment: {
          ...getDateField({
            label: {
              labelName: "Date of Appointment",
              labelKey: "HR_APPOINTMENT_DATE_LABEL"
            },
            placeholder: {
              labelName: "Enter Date of Appointment",
              labelKey: "HR_APPOINTMENT_DATE_PLACEHOLDER"
            },
            pattern: getPattern("Date"),
            jsonPath: "Employee[0].dateOfAppointment"
          })
        },
        employmentType: {
          ...getSelectField({
            label: {
              labelName: "Employement Type",
              labelKey: "HR_EMPLOYMENT_TYPE_LABEL"
            },
            placeholder: {
              labelName: "Select Employment Type",
              labelKey: "HR_EMPLOYMENT_TYPE_PLACEHOLDER"
            },
            required: true,
            jsonPath: "Employee[0].employeeType",
            sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeType",
            props: {
              optionLabel: "status",
              optionValue: "code"
              // hasLocalization: false,
              // jsonPath: "Employee[0].employeeType"
            },
            localePrefix: {
              moduleName: "egov-hrms",
              masterName: "EmployeeType"
            }
          })
        },
        status: {
          ...getSelectField({
            label: { labelName: "Status", labelKey: "HR_STATUS_LABEL" },
            placeholder: {
              labelName: "Select Status",
              labelKey: "HR_STATUS_PLACEHOLDER"
            },
            required: true,
            jsonPath: "Employee[0].employeeStatus",
            sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeStatus",
            props: {
              optionLabel: "status",
              optionValue: "code",
              disabled: true,
              value: "EMPLOYED"
              // hasLocalization: false,
              // jsonPath: "Employee[0].employeeStatus"
            },
            localePrefix: {
              moduleName: "egov-hrms",
              masterName: "EmployeeStatus"
            }
          })
        },
        // role: {
        //   ...getSelectField({
        //     label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
        //     placeholder: {
        //       labelName: "Select Role",
        //       labelKey: "HR_ROLE_PLACEHOLDER"
        //     },
        //     required: true,
        //     jsonPath: "Employee[0].user.roles",
        //     sourceJsonPath: "createScreenMdmsData.ACCESSCONTROL-ROLES.roles"
        //   })
        // },
        role: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-hrms",
          componentPath: "AutosuggestContainer",
          jsonPath: "Employee[0].user.roles",
          required: true,
          props: {
            style: {
              width: "100%",
              cursor: "pointer"
            },
            label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
            placeholder: {
              labelName: "Select Role",
              labelKey: "HR_ROLE_PLACEHOLDER"
            },
            jsonPath: "Employee[0].user.roles",
            sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
            labelsFromLocalisation: false,
            suggestions: [],
            fullwidth: true,
            required: true,
            inputLabelProps: {
              shrink: true
            },
            isMulti: true,
            labelName: "name",
            valueName: "code"
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      })
    },
    {
      style: { overflow: "visible" }
    }
  );
  