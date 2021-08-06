import {
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getCommonCard,
    getCommonTitle,
    getCommonParagraph,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { propertyApplicationSearch, applicationSearch } from "./functions";
  import { citizenResetFields } from "./mutation-methods";

 
  
  const citizenSearchTabs = 
      getCommonCard({
        subHeader: getCommonTitle({
          labelName: "Search Application",
          labelKey: "SEARCH_APPLICATION"
        }),
      
        subParagraph: getCommonParagraph({
          labelName: "Provide at least one non-mandatory parameter to search for an application",
          labelKey: "PT_HOME_SEARCH_RESULTS_DESC"
        }),
        appNumberContainer: getCommonContainer({
          ulbCity: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-pt",
            componentPath: "AutosuggestContainer",
            props: {
              label: {
                labelName: "ULB/City",
                labelKey: "PT_SEARCH_ULB_CITY"
              },
              placeholder: {
                labelName: "Select ULB/City",
                labelKey: "PT_SEARCH_ULB_CITY_PLACEHOLDER"
              },
              localePrefix: {
                moduleName: "TENANT",
                masterName: "TENANTS"
              },
              jsonPath: "propertySearchScreen.tenantId",
              sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
              className: "autocomplete-dropdown",
              labelsFromLocalisation: true,
              //required: true,
              disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
              isClearable: true
            },
            disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          // required: true,
            jsonPath: "pASearchScreen.tenantId",
            gridDefination: {
              xs: 12,
              sm: 4
            },
          beforeFieldChange: async (action, state, dispatch) => {
         /*    let tenant = action.value;
           
            dispatch(
              handleField(
                  "propertySearch",
                  "components.div.children.searchPropertyDetails.children.cardContent.children.iulbCityContainer.children.propertyTaxUniqueId.props.iconObj",
                  "label",
                  ""
              )
            ); 
            if(process.env.REACT_APP_NAME === "Citizen" && action.value){             
           
      
              let tenants = state.common.cities && state.common.cities;
      
              let filterTenant = tenants && tenants.filter(m=>m.key===action.value);
      
              let tenantUniqueId = filterTenant && filterTenant[0] && filterTenant[0].city && filterTenant[0].city.code;
      
               tenantUniqueId = "PT-"+tenantUniqueId+"-";
      
               dispatch(
                handleField(
                    "propertySearch",
                    "components.div.children.searchPropertyDetails.children.cardContent.children.iulbCityContainer.children.propertyTaxUniqueId.props.iconObj",
                    "label",
                    tenantUniqueId
                )
              ); 
      
            }
            else if(process.env.REACT_APP_NAME === "Employee"){
              let tenants = state.common.cities && state.common.cities;
      
              let filterTenant = tenants && tenants.filter(m=>m.key===getTenantId());
      
              let tenantUniqueId = filterTenant && filterTenant[0] && filterTenant[0].city && filterTenant[0].city.code;
      
              tenantUniqueId = "PT-"+tenantUniqueId+"-";
      
               dispatch(
                handleField(
                    "propertySearch",
                    "components.div.children.searchPropertyDetails.children.cardContent.children.iulbCityContainer.children.propertyTaxUniqueId.props.iconObj",
                    "label",
                    tenantUniqueId
                )
              );     
            }
            dispatch(fetchLocalizationLabel(getLocale(), action.value, action.value)); */
       
          }
          },
          
          appNumberContainer: getCommonContainer({
            propertyTaxApplicationNo: getTextField({
            label: {
              labelName: "Application No",
              labelKey: "PT_PROPERTY_APPLICATION_NO"
            },
            placeholder: {
              labelName: "Enter Application No",
              labelKey: "PT_PROPERTY_APPLICATION_NO_PLACEHOLDER"
            },
            gridDefination: {
              xs: 12,
              sm: 4,
      
            },
            required: false,
            pattern: /^[a-zA-Z0-9-]*$/i,
            errorMessage: "ERR_INVALID_APPLICATION_NO",
            jsonPath: "pASearchScreen.acknowledgementIds"
          }),
          ORButton: getLabel({
            labelName: "ORButton",
            labelKey: "OR"
          }), 
          applicationPropertyTaxUniqueId: getTextField({
            label: {
              labelName: "Property Tax Unique Id",
              labelKey: "PT_APP_PROPERTY_UNIQUE_ID"
            },
            placeholder: {
              labelName: "Enter Property Tax Unique Id",
              labelKey: "PT_APP_PROPERTY_UNIQUE_ID_PLACEHOLDER"
            },
            gridDefination: {
              xs: 12,
              sm: 4,
      
            },
            required: false,
            pattern: /^[a-zA-Z0-9-]*$/i,
            errorMessage: "ERR_INVALID_PROPERTY_ID",
            jsonPath: "pASearchScreen.ids"
          }),
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
                  color: "black",
                  borderColor: "black",
                  width: "220px",
                  height: "48px",
                  margin: "8px",
                  float: "right"
                }
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Reset",
                  labelKey: "PT_HOME_RESET_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: citizenResetFields
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
                  labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: applicationSearch
              }
            }
          })
        })
  });
  
  export default citizenSearchTabs;
  