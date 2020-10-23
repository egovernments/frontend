import {
    getCommonCard,
    getTextField,
    
    getCommonContainer,
    getPattern,
   
    getCommonTitle,
    getSelectField
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import { getQueryArg , getTodaysDateInYMD , getTLTenantId  } from "egov-ui-framework/ui-utils/commons";

  import {updateMdmsDropDowns} from "../lams-utils/utils"


import PropTypes from "prop-types";

  const getClasses = () =>{
    return PropTypes.object.isRequired;
  }
  const handleFileUpload = () =>{
    alert("handlingFileUpload");
  }
  const onButtonClick = () =>{
    alert("Button clicked");
  }
  const tradeCategoryChange = () =>{
    alert("Trade Category Change");
  }
  const tradeTypeChange = () =>{
    alert("Trade Type changed");
  }
  const tradeSubTypeChange = () =>{
    alert("In trade sub type change");
  }
  const cbChanged = () => {
    //alert("Cant Board Changed");
  }
  const locationChanged = () =>{
    //alert(locationChanged);
  }
  export const newApplicationDetailsCard = getCommonCard(
      {
        header: getCommonTitle(
            {
              labelName: "Lease Details",
              labelKey: "LAMS_LEASE_DETAILS"
            },
            {
              style: {
                marginBottom: 18
              }
            }
          ),
          cantonmentBoard: {
            uiFramework: "custom-containers-local",
              moduleName: "egov-lams",
              componentPath: "AutosuggestContainer",
              jsonPath: "Lease[0].tenantId",
              sourceJsonPath: "allTenants",
               props:{
                className: "autocomplete-dropdown",
                suggestions: [],
                disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
                label: {
                  labelName: "Cantonment Boards",
                  labelKey: "LAMS_CB_LABEL"
                },
                placeholder: {
                  labelName: "Cantonment Board",
                  labelKey: "CB_PLACEHOLDER"
                },
                required: true,
                jsonPath: "Lease[0].tenantId",
                sourceJsonPath: "allTenants",
                inputLabelProps: {
                  shrink: true
                },
                onClickHandler: cbChanged
              },
              gridDefination: {
                xs: 12,
                sm: 6
              },
              required: true
          },
          location: {
            uiFramework: "custom-containers-local",
              moduleName: "egov-lams",
              componentPath: "AutosuggestContainer",
              jsonPath: "Lease[0].location",
              sourceJsonPath: "allTenants",
               props:{
                className: "autocomplete-dropdown",
                suggestions: [],
                disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
                label: {
                  labelName: "Location",
                  labelKey: "LAMS_LOCATION_LABEL"
                },
                placeholder: {
                  labelName: "Cantonment Board",
                  labelKey: "LAMS_LOCATION_PLACEHOLDER"
                },
                required: true,
                jsonPath: "Lease[0].location",
                sourceJsonPath: "lamsLocation",
                inputLabelProps: {
                  shrink: true
                },
                onClickHandler: locationChanged
              },
              gridDefination: {
                xs: 12,
                sm: 6
              },
              required: true
          },
          LeaseSurveyNo: {
            uiFramework: "custom-containers",
            componentPath: "AutosuggestContainer",
            jsonPath: "Lease[0].surveyNumber",
            required: true,
            props: {
              style: {
                width: "100%",
                cursor: "pointer"
              },
              hasZindex:true,
              label: {
                labelName: "Survey Number",
                labelKey: "LAMS_SURVEYNO_LABEL"
              },
              placeholder: {
                labelName: "Select Survey Number",
                labelKey: "LAMS_SURVEYNO_PLACEHOLDER"
              },
              jsonPath: "Lease[0].surveyNumber",
              sourceJsonPath: "lamsSurveyNumber",
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
              sm: 6
            }
          }, 
          LeaseAsPerGLR2: getTextField({
            label: {
              labelName: "Lease as per GLR",
              labelKey: "LAMS_ASPERGLR_LABEL"
            },
            placeholder: {
              labelName: "Select Survey Number",
              labelKey: "LAMS_ASPERGLR_PLACEHOLDER"
            },
  
            required: true,
            visible: true,
            pattern: getPattern("Name"),
            errorMessage: "",
            jsonPath: "Lease[0].LeaseAsPerGLR2"
          }),
          
          leaseDetailsContainer : getCommonContainer({
            checkBox:{
              required: true,
              uiFramework: "custom-atoms-local",
              moduleName: "egov-lams",
              componentPath: "Checkbox",
              props: {
                content: "For this property"
              },
              jsonPath: "Lease[0].forThisProperty",
            }
        },        
        ) 
      },
      {
        style: {
          overflow: "visible"
        }
      }
  )