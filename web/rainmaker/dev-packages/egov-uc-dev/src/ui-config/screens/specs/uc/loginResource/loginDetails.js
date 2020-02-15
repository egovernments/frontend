import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer
  // getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const loginDetailsCard = getCommonCard(
  {
    searchContainer: getCommonContainer(
      {
        userName: getTextField({
          label: {
            labelName: "Username",
            labelKey: "CORE_LOGIN_USERNAME"
          },
          placeholder: {
            labelName: "Enter Username",
            labelKey: "CORE_LOGIN_USERNAME_PLACEHOLDER"
          },
          required: true,
          visible: true,
          pattern: "^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$",
          errorMessage: "CORE_COMMON_USERNAME_INVALIDMSG",
          jsonPath: "login.username"
        }),
        password: getTextField({
          label: {
            labelName: "Password",
            labelKey: "CORE_LOGIN_PASSWORD"
          },
          placeholder: {
            labelName: "Enter password",
            labelKey: "CORE_LOGIN_PASSWORD_PLACEHOLDER"
          },
          required: true,
          visible: true,
          pattern: "^([a-zA-Z0-9@])+$",
          errorMessage: "CORE_LOGIN_PASSWORD_ERRORMSG",
          jsonPath: "login.password",
          props:{
            type:"password"
          }
        }),
        city:{
          uiFramework: "custom-containers",
          componentPath: "AutosuggestContainer",
          jsonPath: "login.tenantId",
          required: true,
          props: {
            style: {
              width: "100%",
              cursor: "pointer"
            },
            label: {
              labelName: "City",
              labelKey: "CORE_COMMON_CITY"
            },
            placeholder: {
              labelName: "Select City",
              labelKey: "CORE_COMMON_CITY_PLACEHOLDER"
            },
            sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
            labelsFromLocalisation: true,
            suggestions: [],
            fullwidth: true,
            required: true,
            inputLabelProps: {
              shrink: true
            }
            // className: "tradelicense-mohalla-apply"
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      },
      {
        style: {
          overflow: "visible"
        }
      }
    )
  },
  {
    style: {
      overflow: "visible"
    }
  }
);
