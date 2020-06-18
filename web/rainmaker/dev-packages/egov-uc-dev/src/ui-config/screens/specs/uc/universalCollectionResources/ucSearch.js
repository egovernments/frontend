import {
  getCommonCard,
  getTextField,
  getCommonContainer,
  getPattern,
  getLabel,
  getDateField,
  getCommonHeader,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { searchApiCall } from "./function";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const resetFields = (state, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.receiptNumber",
      "props.value",
      ""
    )
  );
  get(
    state.screenConfiguration,
    "preparedFinalObject.searchScreen.businessServices",
    null
  ) &&
    dispatch(
      handleField(
        "search",
        "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.serviceType",
        "props.value",
        ""
      )
    );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.mobileNumber",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.toDate",
      "props.value",
      ""
    )
  );
};

export const UCSearchCard = getCommonCard({
  header: getCommonHeader({
    labelName: "Search Receipt",
    labelKey: "UC_SEARCH_COMMON_HEADER"
  }),
  subheader: getCommonSubHeader({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "UC_SEARCH_COMMON_SUB_HEADER"
  }),
  searchContainer: getCommonContainer({
    receiptNumber: getTextField({
      label: {
        labelName: "Receipt Number.",
        labelKey: "UC_RECEPIT_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Receipt No.",
        labelKey: "UC_ENTER_RECEPIT_NO_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.receiptNumbers",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    serviceType: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-uc",
      componentPath: "AutosuggestContainer",
      props: {
        className: "autocomplete-dropdown",
        label: {
          labelName: "Service Category",
          labelKey: "UC_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select Service Category",
          labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },
        required: false,
        isClearable: true,
        labelsFromLocalisation: true,
        sourceJsonPath: "applyScreenMdmsData.serviceCategories",
      },
      jsonPath: "searchScreenMdmsData.businessServiceSelected",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      beforeFieldChange: async (action, state, dispatch) => {
        const serviceCategory = get(
          state.screenConfiguration,
          "preparedFinalObject.applyScreenMdmsData.serviceCategories"
        );
        const selectedCategory = serviceCategory.find(
          item => item.code === action.value
        );
        const serviceTypes =
          selectedCategory &&
          selectedCategory.child &&
          selectedCategory.child.map(item => item.code);
        dispatch(
          prepareFinalObject("searchScreen.businessServices", serviceTypes)
        );
        return action;
      }
    },
    mobileNumber: getTextField({
      label: {
        labelName: "Mobile No.",
        labelKey: "UC_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile NO.",
        labelKey: "UC_MOBILE_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: getPattern("MobileNo"),
      errorMessage: "Invalid Mobile No..",
      jsonPath: "searchScreen.mobileNumber"
    }),

    fromDate: getDateField({
      label: {
        labelName: "From Date",
        labelKey: "UC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter From Date",
        labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
      },
      required: false,
      visible: false,
      pattern: getPattern("Date"),
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    toDate: getDateField({
      label: {
        labelName: "To Date",
        labelKey: "UC_TO_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter From Date",
        labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
      },
      visible: false,
      required: false,
      pattern: getPattern("Date"),
      jsonPath: "searchScreen.toDate",

      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  }),

  buttonContainer: getCommonContainer({
    firstCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    resetButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 3
        // align: "center"
      },
      props: {
        variant: "outlined",
        style: {
          color: "#FE7A51",
          // backgroundColor: "#FE7A51",
          border: "#FE7A51 solid 1px",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "80%" : "100%",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "RESET",
          labelKey: "UC_RESET_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: resetFields
      }
    },

    searchButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 3
        // align: "center"
      },
      props: {
        variant: "contained",
        style: {
          color: "white",
          backgroundColor: "#696969",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "80%" : "100%",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "SEARCH",
          labelKey: "UC_SEARCH_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          searchApiCall(state, dispatch);
        }
      }
    },

    lastCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    }
  })
},{
  style: {overflow: "visible"}
});
