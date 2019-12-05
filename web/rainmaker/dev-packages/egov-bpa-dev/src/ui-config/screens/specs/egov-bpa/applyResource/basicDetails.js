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
import { getScrutinyDetails } from "../../utils";

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
    scrutinynumber: getTextField({
      label: {
        labelName: "Building plan scrutiny number",
        labelKey: "Building plan scrutiny number"
      },
      placeholder: {
        labelName: "Enter Scrutiny Number",
        labelKey: "Enter Scrutiny Number"
      },
      // required: true,
      title: {
        value: "Please search scrutiny details linked to the scrutiny number",
        key: "Please search scrutiny details linked to the scrutiny number"
      },
      infoIcon: "info_circle",
      pattern: "^[a-zA-Z0-9]*$",
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "BPAs[0].BPADetails.basicdetails.scrutinynumber",
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch, fieldInfo) => {
            getScrutinyDetails(state, dispatch, fieldInfo);
          }
        }
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    occupancy: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "AutosuggestContainer",
      jsonPath: "BPAs[0].BPADetails.basicdetails.occupancy",
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        isDisabled: "true",
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
        value: [
          {
            value: "Occupancy Type 1",
            label: "Occupany Type 1"
          },
          {
            value: "Occupancy Type 2",
            label: "Occupancy Type 2"
          }
        ],
        data: mockJosnRoles
        // error: "ERR_DEFAULT_INPUT_FIELD_MSG",
        // disable: true
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
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
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
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
        jsonPath: "BPAs[0].BPADetails.scrutinyDetails.planDetail.applicationDate",
        props: {
          defaultValue: getTodaysDateInYMD(),
          // value: getTodaysDateInYMD(),
          // inputProps: {
          //   max: getTodaysDateInYMD()
          // },
          // disabled: 'true'
          // InputProps : {
          //   readOnly: true,
          // },
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    applicationFee: {
      ...getTextField({
        label: {
          labelName: "Application Fee",
          labelKey: "Application Fee"
        },
        jsonPath: "BPAs[0].BPADetails.basicdetails.appfee",
        value: 1000,
        props: {
          value: 100,
          disabled: true
          // InputProps : {
          //   readOnly: true,
          // },
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
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
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    }
  })
});
