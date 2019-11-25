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
import { getTodaysDateInYMD } from "../../utils";
import { mockJosnRoles } from "../mockJson";
console.log(mockJosnRoles, "details of roles");
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
        // pattern: '^[a-zA-Z0-9]*$',
        jsonPath: "BPAs[0].BPADetails.basicdetails.scrutinynumber"
      })
    },
    occupancy: {
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
        label: { labelName: "Occupancy", labelKey: "Occupancy" },
        placeholder: {
          labelName: "Select Occupancy",
          labelKey: "Occupancy"
        },
        jsonPath: "BPAs[0].BPADetails.basicdetails.occupancy",
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
        valueName: "code",
        value :[
          {
            value: "Occupancy Type 1",
            label: "Occupany Type 1"
          },
          {
            value: "Occupancy Type 2",
            label: "Occupancy Type 2"
          }
        ],
        data: mockJosnRoles,
        // error: "ERR_DEFAULT_INPUT_FIELD_MSG",
        disable : true
      },
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    applicationtype: {
      ...getSelectField({
        label: {
          labelName: "Application type",
          labelKey: "Application type"
        },
        placeholder: {
          labelName: "Select Application type",
          labelKey: "Select Application type"
        },
        required: true,
        jsonPath: "BPAs[0].BPADetails.basicdetails.apptype",
        props: {
          className: "hr-generic-selectfield",
          data: [
            {
              value: "App Type 1",
              label: "App Type 1"
            },
            {
              value: "App Type 2",
              label: "App Type 2"
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
    servicetype: {
      ...getSelectField({
        label: {
          labelName: "Service type",
          labelKey: "Service type"
        },
        placeholder: {
          labelName: "Select service type",
          labelKey: "Service type"
        },
        required: true,
        jsonPath: "BPAs[0].BPADetails.basicdetails.servicetype",
        props: {
          className: "hr-generic-selectfield",
          data: [
            {
              value: "service type 1",
              label: "service type 1"
            },
            {
              value: "service type 2",
              label: "service type 2"
            }
          ],
          optionValue: "value",
          optionLabel: "label"
        }
      })
    },
    applicationdate: {
      ...getDateField({
        label: {
          labelName: "Application Date",
          labelKey: "Application Date"
        },
        required: true,
        // pattern: getPattern("Date"),
        jsonPath: "BPAs[0].BPADetails.basicdetails.appdate",
        value: getTodaysDateInYMD(),
        props: {
          inputProps: {
            max: getTodaysDateInYMD()
          },
          // defaultValue : getTodaysDateInYMD()
        }
      })
    },
    applicationFee: {
      ...getTextField({
        label: {
          labelName: "Application Fee",
          labelKey: "Application Fee"
        },
        // placeholder: {
        //   labelName: "Enter Corrospondence Address",
        //   labelKey: "HR_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        // },
        jsonPath: "BPAs[0].BPADetails.basicdetails.appfee",
        value: 1000,
        props: {
          value: 100,
          disabled: true,
          // InputProps : {
          //   readOnly: true,
          // },
        }
      })
    },
    remarks: {
      ...getTextField({
        label: {
          labelName: "Remarks",
          labelKey: "Remarks"
        },
        placeholder: {
          labelName: "Enter Remarks Here",
          labelKey: "Enter Remarks Here"
        },
        jsonPath: "BPAs[0].BPADetails.basicdetails.remarks",
        props: {
          multiline: true,
          rows: "4"
        }
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
          // pattern: /^[a-zA-Z0-9-_]*$/i,
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
          // // pattern: getPattern("Date"),
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
      }
    })
  },
  {
    style: { overflow: "visible" }
  }
);
