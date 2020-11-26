import {
    getCommonCard,
    getTextField,
    
    getCommonContainer,
    getPattern,
   
    getCommonTitle,
    getSelectField,
    getCommonParagraph
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import { getQueryArg , getTodaysDateInYMD , getTLTenantId  } from "egov-ui-framework/ui-utils/commons";

  import {updateMdmsDropDowns} from "../lams-utils/utils"
  import {documentList} from "../lams-common/documentList";

import PropTypes from "prop-types";

  const getClasses = () =>{
    return PropTypes.object.isRequired;
  }
  const handleFileUpload = () =>{
  }
  const onButtonClick = () =>{
  }
  const tradeCategoryChange = () =>{
  }
  const tradeTypeChange = () =>{
  }
  const tradeSubTypeChange = () =>{
  }
  const cbChanged = () => {
  }
  const locationChanged = () =>{
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
          last4Digits: getSelectField({
            label: {
              labelName: "Last 4 digits",
              labelKey: "TL_CARD_LAST_DIGITS_LABEL"
            },
            placeholder: {
              labelName: "Enter Last 4 digits of the card",
              labelKey: "TL_PAYMENT_LABEL_LAST_DIGITS"
            },
            required: true,
            data: [
              {
                code: "Owner",
                label: "TL_PAYMENT_BY_OWNER"
              },
              {
                code: "Test",
                label: "TL_PAYMENT_BY_TEST2"
              },
              {
                code: "Test2",
                label: "TL_TEST5"
              }
            ],
            jsonPath: "Lease[0].owner",
            autoSelect: true
          }),
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
          cantonmentBoard2: {
            uiFramework: "custom-containers",//"custom-containers-local",
              //moduleName: "egov-lams",
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
          serviceType: {
            uiFramework: "custom-containers",        
            componentPath: "AutosuggestContainer",
            jsonPath: "Challan[0].serviceType",
            gridDefination: {
              xs: 12,
              sm: 6
            },
            required: true,
            props: {
              style: {
                width: "100%",
                cursor: "pointer"
              },
              label: {
                labelName: "Service Type",
                labelKey: "UC_SERVICE_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select service Type",
                labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
              },
              localePrefix: {
                masterName: "BusinessService",
                moduleName: "BillingService"
              },
              
              visible: true,
              jsonPath: "Challan[0].serviceType",
              sourceJsonPath: "allTenants",
              labelsFromLocalisation: true,
              suggestions: [],
              fullwidth: true,
              inputLabelProps: {
                shrink: true
              }
            },
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
          lesseAsPerGLR2: getTextField({
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
            jsonPath: "Lease[0].lesseAsPerGLR2"
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
  );

  export const newApplicationDocumentsCard = getCommonCard(
    {
      header: getCommonTitle(
          {
            labelName: "Lease Documents",
            labelKey: "LAMS_LEASE_DOCUMENTS"
          },
          {
            style: {
              marginBottom: 18
            }
          }
        ),
        paragraph: getCommonParagraph({
          labelName:
            "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
          labelKey: "LAMS_UPLOAD_DOCS_SUBHEADER"
        }),
        documentList
    },
    {
      style: {
        overflow: "visible"
      }
    }
);