import { getCommonCard, getCommonContainer, getCommonParagraph, getCommonTitle, getDateField, getLabel, getPattern, getSelectField, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchApiCall } from "./functions";



const resetFields = (state, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.NOCNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.ownerMobNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.newProvisionalType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.citySearch",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.toDate",
      "props.value",
      ""
    )
  );

};

export const NOCApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search NOC Application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_DESC"
  }),
  appNOCAndMobNumContainer: getCommonContainer({
    applicationNo: getTextField({
      label: {
        labelName: "Application No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Application No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.applicationNumber"
    }),
    NOCNo: getTextField({
      label: {
        labelName: "NOC No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter NOC No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.fireNOCNumber"
    }),
    ownerMobNo: getTextField({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
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
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
    })
  }),
  appStatusAndToFromDateContainer: getCommonContainer({
    applicationNo: getSelectField({
      label: {
        labelName: "Application status",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Application Status",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "FIRENOC"
      },
      jsonPath: "searchScreen.status",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.status",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }

    }),

    fromDate: getDateField({
      label: {
        labelName: "From Date",
        labelKey: "NOC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "From Date",
        labelKey: "NOC_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false
    }),




    newProvisionalType: getSelectField({
      label: {
        labelName: "NOC Type",
        labelKey: "NOC_TYPE_LABEL"
        },
        placeholder: {
        labelName: "Select Application Type",
        labelKey: "NOC_APPLICATION_TYPE_PLACEHOLDER"
        },

      data: [
        {
          code: "NEW",
          label: "NOC_TYPE_NEW_RADIOBUTTON"
        },
        {
          code: "PROVISIONAL",
          label: "NOC_TYPE_PROVISIONAL_RADIOBUTTON"
        }
      ],
      // jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
      jsonPath: "searchScreen.fireNOCType",
      // sourceJsonPath: "applyScreenMdmsData.searchScreen.fireNOCType",
      gridDefination: {
        xs: 12,
        sm: 4
      }

    }),


    citySearch: getSelectField({
      label: {
        labelName: "City",
        labelKey: "NOC_PROPERTY_CITY_LABEL"
      },
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      placeholder: {
        labelName: "Select City",
        labelKey: "NOC_PROPERTY_CITY_PLACEHOLDER"
      },
      sourceJsonPath: "applyScreenMdmsData.searchScreen.tenantData",
      jsonPath: "searchScreen.city",

      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    



  }),

  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
        // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            borderColor: "#FE7A51",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "NOC_HOME_SEARCH_RESET_BUTTON"
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
          sm: 6
        // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      }
    })
  })
});