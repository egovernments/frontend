import { getCommonCard, getTextField, getBreak, getLogo, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";

import { getLabel, validateFields } from "egov-ui-framework/ui-config/screens/specs/utils";

import { loginRequest } from "egov-ui-framework/ui-utils/api";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { authenticated } from "egov-ui-framework/ui-redux/auth/actions";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";



export const loginDetailsCard = getCommonCard(
  {
    searchContainer: getCommonContainer(
      {

        stateImage: getLogo({


          props: {
            type: "text",
            style: {
            },

          },
          gridDefination: {
            xs: 12,
            sm: 12,
          }

        }),
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
          jsonPath: "login.username",
          props: {
            type: "text",
            style: {
              align: "center",
            },
          },
          gridDefination: {
            xs: 12,
            sm: 12,
          }
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
          props: {
            type: "password",
            style: {

            }
          },
          gridDefination: {
            xs: 12,
            sm: 12,
          }

        }),

        city: {
          uiFramework: "custom-containers",
          componentPath: "AutosuggestContainer",
          jsonPath: "login.tenantId",
          required: true,
          props: {
            style: {
              width: "120%",
              cursor: "pointer",

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
          },
          gridDefination: {
            xs: 12,
            sm: 12,
          }
        },
        loginButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              height: '48px',
              borderRadius: 2,
              transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
              top: 0,
              backgroundColor: 'rgb(254, 122, 81)',
              color: 'rgb(255, 255, 255)',
              position: 'relative',
              opacity: 1,
              fontSize: 14,
              letterSpacing: 0,
              textTransform: 'uppercase',
              fontWeight: 500,
              margin: '0px',
              userSelect: 'none',
              width: '80%',
            }
          },

          children: {
            downloadReceiptButtonLabel: getLabel({
              labelName: "Login",
              labelKey: "CORE_COMMON_LOGIN"
            }),

          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              login(state, dispatch);
            }
          }
        },

      },
      {
        style: {
          overflow: "visible",
          justifyContent: 'center',
          alignItems: 'center',



        },


      }
    )
  },
  {
    style: {
      overflow: "visible",
      width: "35%",
      margin: "0 30%",
      align:"center"



    }
  }
);

const login = async (state, dispatch) => {
  const isFormValid = validateFields(
    "components.div.children.loginDetailsCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "login"
  );
  if (isFormValid) {
    dispatch(toggleSpinner())
    try {
      let formResponse = await loginRequest(
        state.screenConfiguration.preparedFinalObject.login.username,
        state.screenConfiguration.preparedFinalObject.login.password,
        "",
        "password",
        state.screenConfiguration.preparedFinalObject.login.tenantId,
        "EMPLOYEE"
      );
      dispatch(authenticated(formResponse));
      dispatch(setRoute("search"))
      dispatch(toggleSpinner())
    } catch (e) {
      console.log(e);
      dispatch(toggleSpinner())
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Invalid Credentials!",
            labelKey: "Invalid Credentials!"
          },
          "error"
        )
      );
    } finally {}

  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill the required fields.",
          labelKey: "UC_REQUIRED_FIELDS_ERROR_MSG"
        },
        "error"
      )
    );
  }
};