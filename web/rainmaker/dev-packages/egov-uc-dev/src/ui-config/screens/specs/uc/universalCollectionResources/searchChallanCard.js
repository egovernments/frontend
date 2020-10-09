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
  import { searchChallanApiCall } from "./function";
  import {
    handleScreenConfigurationFieldChange as handleField,
    prepareFinalObject
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import get from "lodash/get";
  import { getTodaysDateInYMD } from "egov-ui-framework/ui-utils/commons";


  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  const resetFields = (state, dispatch) => {
   
      dispatch(
        handleField(
          "searchChallan",
          "components.div.children.SearchChallanCard.children.cardContent.children.searchContainer.children.serviceType",
          "props.value",
          ""
        )
      );
    dispatch(
      handleField(
        "searchChallan",
        "components.div.children.SearchChallanCard.children.cardContent.children.searchContainer.children.mobileNumber",
        "props.value",
        ""
      )
    );
   
   
    dispatch(
      handleField(
        "searchChallan",
        "components.div.children.SearchChallanCard.children.cardContent.children.searchContainer.children.challanNo",
        "props.value",
        ""
      )
    );
  };
  
  export const SearchChallanCard = getCommonCard({
    header: getCommonHeader({
      labelName: "Search Challan",
      labelKey: "ACTION_TEST_CHALLAN_SEARCH"
    }),
   
    searchContainer: getCommonContainer({
    
      challanNo: getTextField({
        label: {
          labelName: "Challan Number.",
          labelKey: "UC_CHALLAN_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Challan No.",
          labelKey: "UC_CHALLAN_NO_LABEL_PLACEHOLDER"
        },
        required: false,
        visible: true,
        jsonPath: "challanSearchScreen.challanNo",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      serviceType: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-uc",
        componentPath: "AutosuggestContainer",
        visible: true,
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
          jsonPath:"challanSearchScreen.businessServiceSelected",
        },
        jsonPath:"challanSearchScreen.businessServiceSelected",
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
            ((selectedCategory.child &&
            selectedCategory.child.length > 0) ?
            selectedCategory.child.map(item => item.code) : selectedCategory.code);
          dispatch(
            prepareFinalObject("challanSearchScreen.businessServices", serviceTypes)
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
        jsonPath: "challanSearchScreen.mobileNumber"
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
        jsonPath: "challanSearchScreen.fromDate",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
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
        jsonPath: "challanSearchScreen.toDate",
        props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          },
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
   
  
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
            searchChallanApiCall(state, dispatch);
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
  